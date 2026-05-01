# Claude CodeでWebアプリを作ってCloudflare Pagesで公開するバイブコーディングハンズオン

AIに話しかけてコードを作る「バイブコーディング」でWebアプリを作ります。  
そして、全世界に公開します。  
アカウント作成からWebアプリ公開まで一気にやりきるのが今回のハンズオンの目標です。

Webアプリとは、ブラウザで動くアプリのこと。インストール不要で、URLを開くだけで使えます。

今回のハンズオンでは、ブラウザ保存型（まずは自分一人が使うアプリ）を作ります。
シンプルな構成なので、ゼロから公開まで一気に進められます。

## 1. 必要なもの（必須）

- マシン
  - macosが動くPC（macbookなど）
- アプリ（mac）
  - chrome
  - Claude Desktop
- アカウント
  - google アカウント（会場で見られてもよいアカウント名のもの）
  - Claude の有料プラン（Claude Pro でOK）

## 2. GitHub・Gitの準備

GitHubアカウントの作成、リポジトリの作成、Gitインストール、SSH設定、cloneまでは **[GitHub初心者ガイド](github-guide-first-step.html)** を参照してください。

3章以降は以下の状態から進めます。

- GitHubアカウント作成済み
- リポジトリ `my-first-site` 作成済み
- `~/Desktop/claude/my-first-site` に clone 済み

> **リポジトリの公開設定について：** Cloudflare PagesはPrivateリポジトリでも無料で公開できるのが利点ですが、**セミナー中は講師が確認できるようPublicにしておいてください**。セミナー終了後にPrivateへ変更するのがおすすめです。変更方法：リポジトリの `Settings` → `Danger Zone`（ページ下部）→ `Change repository visibility`

## 3. Cloudflare Pagesの設定

### 3-1. Cloudflareアカウントを作る

1. [cloudflare.com/ja-jp](https://www.cloudflare.com/ja-jp/) にアクセスして `無料で始める` をクリック
2. Googleアカウントでサインアップする

### 3-2. Cloudflare PagesとGitHubを連携する

1. ログイン後、左メニューの `Compute` → `Workers & Pages` を選択
2. `Pages` タブ → `Connect to Git` をクリック
3. `GitHub` を選択 → `Connect GitHub` ボタンをクリック
4. GitHubの認証画面が開くので許可する
5. 連携するリポジトリを選択（`my-first-site`）して `Begin setup`

### 3-3. ビルド設定をして初回デプロイ

今回はHTML+JSのみの静的サイトなのでビルド不要。以下の通りに設定する。

| 項目 | 設定内容 |
|---|---|
| Project name | `my-first-site`（任意、URLになる） |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | **空欄のまま** |
| Build output directory | **空欄のまま**（または `/`） |

`Save and Deploy` をクリックすると初回デプロイが始まる。

### 3-4. 公開URLを確認する

デプロイ完了後、`https://プロジェクト名.pages.dev` の形式でURLが発行される。

> 以降はGitHubにpushするたびCloudflare Pagesが自動でデプロイする。ターミナルからデプロイコマンドを叩く必要はない。

## 4. Claude Code でWebアプリを作成

デスクトップ版Claudeアプリを起動。

「Code」(Claude Code) を選択 → 「New session」をクリック → 作業ディレクトリを指定 (`~/Desktop/claude/my-first-site`)

あとはプロンプトを入力して、index.htmlを編集する。

プロンプト例:
- `HTML+JavaScriptでポモドーロタイマーを作って！ 1つのファイルにしてindex.htmlに上書きして。`
- `複利計算機をHTML+JavaScriptで作って！ 構成はHTMLファイル(index.html)が1つ。`

右上のところからプレビューを選ぶと表示される（自動で表示されることも）。

なお、途中いろいろ許可を求めてくるので対応する。

## 5. 作ったWebアプリをアップして公開する（デプロイ）

Claude Codeに依頼する：`変更をgitでコミットしてpushして`

途中、操作の許可を求めてくることがあるので対応する。

GitHubへのpushを検知してCloudflare Pagesが自動でデプロイする。しばらく（1分以内）待ってから公開URLにアクセスして確認。

公開URL: `https://プロジェクト名.pages.dev`

> Cloudflare Pagesのダッシュボードでデプロイの進行状況を確認できる。

## 6. Webアプリの修正と反映

修正依頼プロンプト例:
- `背景をもっと明るくしてください`
- `数値入力をスライダーにしてください`
- `ボタンの間隔をもっと広げて`
- 参考: [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)

途中いろいろ許可を求めてくるので対応する。

納得したら、アップを依頼: `変更をgitでコミットしてpushして`

しばらく待ってから公開URLにアクセスして確認。

このように修正と反映を繰り返して、Webアプリを仕上げよう！

## 7. その先のこと

### 7-1. カスタムドメインを設定する

取得済みの独自ドメイン（例：`myapp.com`）をCloudflare Pagesに設定できる。

Cloudflare Pages のプロジェクト → `Custom domains` → `Set up a custom domain`

ドメインをCloudflareで管理している場合はほぼ自動で設定が完了する。

### 7-2. PWA（スマホアプリのように使えるWebアプリ）にする

作ったWebアプリをPWA（Progressive Web App）にすると、スマートフォンのホーム画面に追加してネイティブアプリのように起動できるようになる。

「manifest.json」と「Service Worker」というファイルを追加するだけで実現できる。Claude Codeに `このWebアプリをPWAにしたい。アクセスのたびにバージョンチェックして更新し、オフラインはキャッシュで動くようにしたい。` と相談してみよう。

### 7-3. みんなで使う（サーバー連携型）アプリを作る

チャットやランキング機能など、データを保存・共有するアプリを作る場合はサーバーやデータベースが必要。
Cloudflare Workers + D1（データベース）や、Vercel、Firebaseなどが選択肢となる。
GitHubでコードを管理するのは同じで、公開先をこれらのプラットフォームへ変える、というイメージ。
詳しくはClaude Codeに相談してみよう。

また、セキュリティ上の考慮が必要になることもあるため、GitHubのリポジトリはPrivateにしておくのが安心。

## 8. Tips

- GitHubへのアップを依頼するとき
  - 短めに `githubにアップ` で
- 返答でファイル更新させない
  - 末尾に `アイディアください` `どうでしょうか` `考え聞かせて` などをつける
  - プランモードでも良いが切り替えが面倒
- バイブコーディングでWebアプリを作るときに便利な用語集
  - [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)

---
2026-05-01 タツヲ ([yto](https://x.com/yto))
