# かんじフレンズ iPhone / iPad アプリ（Capacitor）

公開サイト（このリポジトリの直下）を そのまま アプリに入れたものです。フォントもアプリの中に入るので、ネットなしで動き、外のサーバーには つながりません。

## Mac でのビルド手順
1. Xcode（App Store から無料）と Node.js（https://nodejs.org の LTS）を入れる。
2. このフォルダーで `npm install` → `npm run sync`（サイトを www/ にコピーし、フォントを入れて、iOS プロジェクトに反映）。
3. `npm run open` で Xcode が開く。左の「App」→ Signing & Capabilities で Team に自分の Apple Developer アカウントを えらぶ。
4. Bundle Identifier は `io.github.mamikkokanji.kanjifriends`（App Store Connect でアプリを作るときも同じものを使う）。
5. 上のメニュー Product → Archive → Distribute App → App Store Connect でアップロード。

サイトを直したら、もういちど `npm run sync` をしてから Archive します。バージョンは Xcode の General → Version / Build で上げます。

## Android（Google Play）のビルド手順（Windows でも Mac でも できます）
1. Android Studio（https://developer.android.com/studio 無料）と Node.js（LTS）と Python 3 を入れる。
2. このフォルダーで `npm install` → `npm run sync`。
3. `npm run open:android` で Android Studio が開く（はじめは Gradle の準備に数分かかる）。
4. メニュー Build → Generate Signed App Bundle / APK → Android App Bundle → 新しい鍵（Create new…）を作って保存。**この鍵ファイルとパスワードは なくさないように**（更新のたびに使います）。
5. できた app-release.aab を Play Console にアップロード。
- アプリID は `io.github.mamikkokanji.kanjifriends`。バージョンは android/app/build.gradle の versionCode（毎回 1 ずつ上げる）と versionName。

## アプリ内課金（買い切り「ぜんぶ ひらく」）
- 製品ID：`io.github.mamikkokanji.kanjifriends.all`（非消耗型）。App Store Connect で同じIDで作る。
- むりょう：1年生ぜんぶ ＋ 2〜6年生の さいしょの ばしょ。ほかはロック（サイト直下の pay.js）。
- iOS のしくみ：ios/App/App/KFStore.swift（StoreKit 2。getProduct・purchase・restore・owned）。SceneDelegate で KFBridgeViewController を使い、そこでプラグインを登録。
- Android はまだ課金なし（ロックもしない）。Web版は pay.js の WEB_LOCK で きりかえ。
