# かんじフレンズ iPhone / iPad アプリ（Capacitor）

公開サイト（このリポジトリの直下）を そのまま アプリに入れたものです。フォントもアプリの中に入るので、ネットなしで動き、外のサーバーには つながりません。

## Mac でのビルド手順
1. Xcode（App Store から無料）と Node.js（https://nodejs.org の LTS）を入れる。
2. このフォルダーで `npm install` → `npm run sync`（サイトを www/ にコピーし、フォントを入れて、iOS プロジェクトに反映）。
3. `npm run open` で Xcode が開く。左の「App」→ Signing & Capabilities で Team に自分の Apple Developer アカウントを えらぶ。
4. Bundle Identifier は `io.github.mamiariumioss.kanjifriends`（App Store Connect でアプリを作るときも同じものを使う）。
5. 上のメニュー Product → Archive → Distribute App → App Store Connect でアップロード。

サイトを直したら、もういちど `npm run sync` をしてから Archive します。バージョンは Xcode の General → Version / Build で上げます。
