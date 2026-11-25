import Foundation
import UIKit
import Capacitor
import StoreKit

// かんじフレンズの アプリ内課金（StoreKit 2・買い切り1つ）。JS からは Capacitor.nativePromise("KFStore", ...) で よぶ（pay.js）。
@objc(KFStorePlugin)
public class KFStorePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "KFStorePlugin"
    public let jsName = "KFStore"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProduct", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restore", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "owned", returnType: CAPPluginReturnPromise)
    ]
    private var updates: Task<Void, Never>?

    override public func load() {
        // 「承認と購入」(Ask to Buy) や ほかの端末での 購入も うけとって 完了にする
        updates = Task.detached {
            for await result in Transaction.updates {
                if case .verified(let transaction) = result {
                    await transaction.finish()
                }
            }
        }
    }

    deinit { updates?.cancel() }

    private func productId(_ call: CAPPluginCall) -> String {
        return call.getString("id") ?? "io.github.mamikkokanji.kanjifriends.all"
    }

    private static func isOwned(_ id: String) async -> Bool {
        for await result in Transaction.currentEntitlements {
            if case .verified(let transaction) = result,
               transaction.productID == id,
               transaction.revocationDate == nil {
                return true
            }
        }
        return false
    }

    @objc func getProduct(_ call: CAPPluginCall) {
        let id = productId(call)
        Task {
            do {
                guard let product = try await Product.products(for: [id]).first else {
                    call.reject("not_found")
                    return
                }
                call.resolve(["id": product.id, "price": product.displayPrice, "title": product.displayName])
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        let id = productId(call)
        Task {
            do {
                guard let product = try await Product.products(for: [id]).first else {
                    call.reject("not_found")
                    return
                }
                let result = try await product.purchase()
                switch result {
                case .success(let verification):
                    if case .verified(let transaction) = verification {
                        await transaction.finish()
                        call.resolve(["result": "ok"])
                    } else {
                        call.resolve(["result": "unverified"])
                    }
                case .pending:
                    call.resolve(["result": "pending"])
                case .userCancelled:
                    call.resolve(["result": "cancel"])
                @unknown default:
                    call.resolve(["result": "unknown"])
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }

    @objc func restore(_ call: CAPPluginCall) {
        let id = productId(call)
        Task {
            do {
                try await AppStore.sync()
            } catch {
                call.reject(error.localizedDescription)
                return
            }
            let has = await KFStorePlugin.isOwned(id)
            call.resolve(["owned": has])
        }
    }

    @objc func owned(_ call: CAPPluginCall) {
        let id = productId(call)
        Task {
            let has = await KFStorePlugin.isOwned(id)
            call.resolve(["owned": has])
        }
    }
}

// アプリの 画面。プラグインを ここで 登録する。
class KFBridgeViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(KFStorePlugin())
    }
}
