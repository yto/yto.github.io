# Claude CodeでWebアプリを作ってgithub pagesで公開するバイブコーディングハンズオン

AIに話しかけてコードを作る「バイブコーディング」でWebアプリを作ります。  
そして、全世界に公開します。  
アカウント作成からWebアプリ公開まで一気にやりきるのが今回のハンズオンの目標です。

Webアプリとは、ブラウザで動くアプリのこと。インストール不要で、URLを開くだけで使えます。

Webアプリには大きく2つのタイプがあります。

- **自分一人が使う（ブラウザ完結型）**：アプリで使うデータをブラウザ内に保存。TODO、メモ帳、パズルゲーム、家計簿、習慣トラッカー、設定保存機能を持つアプリなど。
- **みんなで使う（サーバー連携型）**：データをサーバーに保存。ネット接続が必須。チャット、SNS、掲示板、共同編集ツール、同時参加型ゲーム、ランキング機能を持つアプリなど。

今回のハンズオンでは、**自分一人が使うアプリ**を作ります。データベースの準備が不要なので、今日だけでゼロから公開まで一気にいけます。

## 1. 必要なもの（必須）

- マシン
  - macosが動くPC（macbookなど）
- アプリ（mac）
  - chrome
  - Claude Desktop
- アカウント
  - google アカウント（会場で見られてもよいアカウント名のもの）
  - Claude の有料プラン（Claude Pro でOK）

## 2. まずは練習として github pages でWebサイトを世界へ公開

> 2章・3章の補足: GitHubの操作を詳しく知りたい方は[GitHub初心者ガイド](github-guide-first-step.html)へ

1. macosでchromeを立ちあげて[githubのサイト](https://github.com/)へ行く
2. githubのアカウント作成
   - googleアカウント連携で
3. リポジトリの作成
   - 名前: `my-first-site`
   - Public（講師が確認できるようにするため）
   - README.mdは作らない（後のgit操作でエラーになるのを防ぐため）
4. ファイル(index.html)を作成して、何か書き込む
   - Add file → Create new file → `index.html`
   - とりあえず `Hello World!` などと書き込む
   - こちらをコピペしてもOK: `<html><head><title>TEST</title></head><body>Hello World!</body></html>`
5. github pagesの設定
   - Settings → Pages
   - Source を Deploy from a branch
   - Branch を `main`、Folder を `/ (root)` にして保存（Save）
6. 公開URLを開いて表示確認
   - `https://ユーザー名.github.io/my-first-site/`
   - URLはGitHubのPages設定画面からのコピペ推奨
   - しばらく（1分くらい）かかるかも

## 3. gitのインストールと設定

### 作業場所作成

作業場所（作業ディレクトリ）を作る。ディレクトリとはフォルダのこと。

- Finderで、デスクトップに `claude` という名前のフォルダを作成 (`~/Desktop/claude`)
- またはターミナルを開き、以下のコマンドを実行する
```
mkdir ~/Desktop/claude
```

### ターミナル内で作業場所へ移動

ターミナルを開き、コマンドで作業場所へ移動。
```
cd ~/Desktop/claude
```

### gitのインストール

```
git --version
```

gitが入っていればversionが出る。
入ってなければ「command line developer tools」をインストールするか聞かれるので入れる（Xcode本体は不要で、Command Line ToolsだけでOK）。
以下でも行ける。
```
xcode-select --install
```

### 初期設定

名前とメールはGitHubのデータとして公開される（設定による）。
本名でなくてもOK。メールも適当で構いません。
```
git config --global user.name "Tokumei Taro"
git config --global user.email "oreore@example.com"
```

### リポジトリのclone

githubのサイトでさっき作ったやつをこっちに持ってくる。

```
git clone https://github.com/ユーザー名/my-first-site.git
cd my-first-site
```

## 4. Claude Code でWebアプリを作成

デスクトップ版Claudeアプリを起動。

「Code」(Claude Code) を選択 → 「New session」をクリック → 作業ディレクトリを指定 (`~/Desktop/claude/my-first-site`)

あとはプロンプトを入力して、index.htmlを編集する。

プロンプト例:
- `HTML+JavaScriptでポモドーロタイマーを作って！ 1つのファイルにしてindex.htmlに上書きして。`
- `複利計算機をHTML+JavaScriptで作って！ 構成はHTMLファイル(index.html)が1つ。`

右上のところからプレビューを選ぶと表示される（自動で表示されることも）。

なお、途中いろいろ許可を求めてくるので対応する。

## 5. 作ったWebアプリをgithubにアップして公開する（デプロイ）

ターミナルに戻って以下を順番に実行。
```
git add .
git commit -m "update"
git push
```

初回の `git push` 時に認証が必要で、ブラウザが開いたらそのままログインして許可する。なお、初回は `git push -u origin main` と入力する（2回目以降は `git push` だけでOK）。
1. 「GitHubにログインしてください」的な表示
2. ブラウザが開く
3. GitHubにログイン
4. 許可

> もしターミナルでユーザー名やパスワードを聞かれた場合は、パスワードは使えないので入力せず、講師に声をかけてください。

しばらく（1分くらい）待ってから公開URLにアクセスして確認。

公開URL: `https://ユーザー名.github.io/my-first-site/`

## 6. Webアプリの修正と反映

修正依頼プロンプト例:
- `背景をもっと明るくしてください`
- `数値入力をスライダーにしてください`
- `ボタンの間隔をもっと広げて`
- 参考: [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)

途中いろいろ許可を求めてくるので対応する。

納得したら、githubへのアップを依頼: `変更をgitでコミットしてpushして`

しばらく（1分くらい）待ってから公開URLにアクセスして確認。

このように修正と反映を繰り返して、Webアプリを仕上げよう！

> 最初の1回は手動でpushします（認証のため）。2回目以降はClaudeに「gitでコミットしてpushして」とお願いすると自動で公開されます。

## 7. その先のこと

### リポジトリをPrivateにしたい場合

今回のハンズオンではリポジトリをPublicにしています。Publicだとファイルの中身も変更履歴も誰でも見られる状態になります。HTML+JavaScript+CSSだけのアプリはセキュリティ上の問題は少ないですが、試行錯誤の履歴が見られることに抵抗があれば、リポジトリをPrivate（非公開）に変更できます。

ただし、無料プランではPrivateリポジトリにGitHub Pagesを設定できないため、公開URLが使えなくなります。そのときはCloudflare Pagesなど他のホスティングサービスが選択肢になります。Claude Codeに相談すると手順を教えてくれます。

### みんなで使う（サーバー連携型）アプリを作る場合

チャットやランキングなど、データをサーバーに保存するアプリを作る場合はデータベースが必要です。その場合はGitHub Pagesは使えません。Cloudflare Pagesなど、データベースも扱えるサービスを使う必要があります。詳しくはClaude Codeに相談してください。

また、セキュリティ上の考慮が必要になることもあるため、リポジトリはPrivateにしておくのが安心です。

## 8. 用語

### 基本用語

- Git
  - ファイルの変更履歴を記録・管理する仕組み
  - あくまで「仕組み（ツール）」であってサービスではない
  - Gitで管理するデータを置いて共有するサービスの一つがGitHub
  - 変更履歴はスナップショットやセーブポイント（ゲームの）みたいな感じで保存される
  - コマンド:
    - `git clone https://github.com/ユーザー名/my-first-site.git` — リモート（今回はGitHub）にあるリポジトリを自分のPCにコピーしてくる
    - `git add .` — セーブポイントに含めるファイルを選ぶ。`.` は「全部」という意味
    - `git commit -m "update"` — 変更内容のセーブポイントを作る。`-m` の後に何を変えたかのメモを書く
    - `git push` — 作ったセーブポイントをリモートにアップロードする
- GitHub
  - 履歴が残って、みんなで編集できて、そのまま公開もできるクラウドフォルダ
- バイブコーディング (vibe coding)
  - 雰囲気（バイブ）でAIに指示して作らせる開発スタイル

### Tips

- GitHubへのアップを依頼するとき
  - 短めに `githubにアップ` で
- 返答でファイル更新させない
  - 末尾に `アイディアください` `どうでしょうか` `考え聞かせて` などをつける
  - プランモードでも良いが切り替えが面倒
- バイブコーディングでWebアプリを作るときに便利な用語集
  - [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)

---
2026-04-20 タツヲ ([yto](https://x.com/yto))
