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
   - このハンズオンでは Public（講師が確認できるようにするため）
   - Add a README file にチェックを入れる（リポジトリのトップページに自動表示される説明ファイル）
4. ファイル(index.html)を作成して、何か書き込む
   - Add file → Create new file → `index.html`（画面幅が狭い場合は `Add file` の代わりに `+` と表示される）
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
本名でなくてもOK。メールはGitHubに登録済みのもの、または GitHub の `noreply` メールアドレス（[コミットメールアドレスを設定する](https://docs.github.com/ja/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)）を使うのがおすすめ。
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
git status
git add .
git commit -m "update"
git push -u origin main
```

`git status` で今どんな状態か確認してから進めると安全。

初回の `git push -u origin main` 時には認証が必要。ブラウザが開くこともあるが、表示は環境によって異なる。画面の案内に沿って GitHub にログインできればOK。2回目以降は `git push` だけで進められることが多い。

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

> 最初の1回は手動でpushします（GitHubへのブラウザ認証のため）。2回目以降はClaudeに「gitでコミットしてpushして」とお願いできますが、Claude Code 側の権限設定によっては確認や承認が入ることがあります。

## 7. その先のこと

### リポジトリをPrivateにしたい場合

今回のハンズオンではリポジトリをPublic（公開）に設定しているため、ファイルの中身や変更履歴は誰でも閲覧できる状態になっている。
HTML + JavaScript + CSSだけのシンプルなアプリであれば大きな問題になることは少ないが、以下のようなケースではPrivate（非公開）に変更するのがおすすめ。
- 試行錯誤の履歴を見られたくない
- 意図しないファイルを公開してしまうリスクを避けたい

ただし、GitHub Free（無料版）ではGitHub PagesはPublicリポジトリ向け。PrivateリポジトリのままGitHub Pagesを使うには GitHub Pro 以上が必要。
無料のまま非公開で運用したい場合は、Cloudflare Pagesなど別のホスティングサービスが選択肢となる。
詳しくはClaude Codeに相談されたい。

### みんなで使う（サーバー連携型）アプリを作る場合

チャットやランキング機能など、データを保存・共有するアプリを作る場合はサーバーやデータベースが必要。
Cloudflare、Vercel、Firebaseなどのフルスタック開発プラットフォームが選択肢となる。
GitHubでコードを管理するのは同じで、公開先（ホスティング先）をGitHub Pagesからこれらのプラットフォームへ変える、というイメージ。
詳しくはClaude Codeに相談されたい。   

また、セキュリティ上の考慮が必要になることもあるため、GitHubのリポジトリはPrivateにしておくのが安心。

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
