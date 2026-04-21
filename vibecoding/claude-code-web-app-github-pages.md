# Claude CodeでWebアプリを作ってgithub pagesで公開するバイブコーディングハンズオン

AIに話しかけてコードを作る「バイブコーディング」でWebアプリを作ります。
そして、全世界に公開します。
アカウント作成からWebアプリ公開まで一気にやりきるのが本セミナーの目標です。

## 必要なもの（必須）

- マシン
  - macosが動くPC（macbookなど）
- アプリ（mac）
  - chrome
  - Claude Desktop
- アカウント
  - google アカウント（会場で見られてもよいアカウント名のもの）
  - Claude の有料プラン（Claude Pro でOK）

## まずは練習として github pages でWebサイトを世界へ公開

- macos で chrome を立ちあげて github のサイトへ行く。
  - https://github.com/
- githubのアカウント作成
  - googleアカウント連携で
- リポジトリの作成
  - 名前：my-first-site
  - Public
  - README.mdは作らない（後のgit操作でエラーになるのを防ぐため）
- ファイル(index.html)を作成して、何か書き込む
  - Add file → Create new file → index.html
  - とりあえず "Hello World!" などと書き込む
- github pagesの設定
  - Settings → Pages
  - Source を Deploy from a branch
  - Branch を main、Folder を / (root) にして保存（Save）
- 公開URLを開いて表示確認
  - '''https://ユーザー名.github.io/my-first-site'''
    - URLはGitHubのPages設定画面からのコピペ推奨
  - しばらく（1分くらい）かかるかも

## gitのインストールと設定

### Finderで作業場所作成

- Finderで、デスクトップに claude という名前のフォルダを作成 ( ~/Desktop/claude ) 
- これが作業場所（作業ディレクトリ）となる
- ディレクトリとはフォルダのこと

### ターミナル内で作業場所へ移動

macosでターミナルを開き、コマンドで作業場所へ移動。
```
cd ~/Desktop/claude
```

### gitのインストール

```
git --version
```
を実行する。

gitが入っていればversionが出る。

入ってなければ「command line developer tools」をインストールするか聞かれるので入れる（Xcode本体は不要で、Command Line ToolsだけでOK）。
以下でも行ける。
```
xcode-select --install
```

### 初期設定

```
git config --global user.name "あなたの名前"
git config --global user.email "あなたのメール"
```

### リポジトリのclone

githubのサイトでさっき作ったやつをこっちに持ってくる。

```
git clone https://github.com/ユーザー名/my-first-site.git
cd my-first-site
```

## Claude Code でWebアプリを作成

デスクトップ版Claudeアプリを起動。

「Code」(Claude Code) を選択 → 「New session」をクリック → 作業ディレクトリを指定 ( ~/Desktop/claude/my-first-site )

あとはプロンプトを入力して、index.htmlを編集する。

プロンプト例
- ```HTML+JavaScriptでポモドーロタイマーを作って！ 1つのファイルにしてindex.htmlに上書きして。```
- ```複利計算機をHTML+JavaScriptで作って！ 構成はHTMLファイル(index.html)が1つ。```

右上のところからプレビューを選ぶと表示される（自動で表示されることも）。

なお、途中いろいろ許可を求めてくるので対応する。

## 作ったWebアプリをgithubにアップして公開する（デプロイ）

ターミナルに戻って以下を順番に実行
```
git add .
git commit -m "update"
git push
```

初回の git push 時に認証が必要です。ブラウザが開いたらそのままログインして許可してください。
- 「GitHubにログインしてください」的な表示
- ブラウザが開く
- GitHub にログイン
- 許可

もしターミナルでユーザー名やパスワードを聞かれた場合は、パスワードは使えないので入力せず、講師に声をかけてください。

しばらく（1分くらい）待ってから公開URLにアクセスして確認。

公開URL: '''https://ユーザー名.github.io/my-first-site'''

## Webアプリの修正と反映

修正依頼プロンプト例
- ```背景をもっと明るくしてください```
- ```数値入力をスライダーにしてください```
- ```ボタンの間隔をもっと広げて```
- 参考: [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)

途中いろいろ許可を求めてくるので対応する。

納得したら、githubへのアップを依頼: ```変更をgitでコミットしてpushして```

しばらく（1分くらい）待ってから公開URLにアクセスして確認。

このように修正と反映を繰り返して、仕上げましょう。

メモ
- 最初の1回は手動でpushします（認証のため）
- 2回目以降はClaudeに「gitでコミットしてpushして」とお願いすると自動で公開されます

## 用語

- 基本用語
  - Git
    - ファイルの変更履歴を記録・管理する仕組み
    - あくまで「仕組み（ツール）」であってサービスではない
    - Gitで管理するデータを置いて共有するサービスの一つがGitHub
  - GitHub
    - 履歴が残って、みんなで編集できて、そのまま公開もできるクラウドフォルダ
  - バイブコーディング(vibe coding)
    - 雰囲気（バイブ）でAIに指示して作らせる開発スタイル
- Tips
  - GitHubへのアップを依頼するとき
    - 短めに ```githubにアップ``` で
  - 返答でファイル更新させない
    - 末尾に```アイディアください``` ```どうでしょうか``` ```考え聞かせて``` などをつける
    - プランモードでも良いが切り替えが面倒
  - バイブコーディングでWebアプリを作るときに便利な用語集
    - [AIへの指示に使えるUI用語集 — 動く実例つき](https://yto.github.io/vibecoding/uiterms.html)


---
2026-04-20 タツヲ ([yto](https://x.com/yto))

