# GitHub初心者ガイド

技術的に厳密でない部分もあるが、わかりやすさ優先で解説する。

対象はMac（MacBookなど）ユーザーで、Googleアカウントを持っていることが前提。

---

## 1. GitHubとは

GitHubは「変更履歴ごと保存できるネット上のフォルダ」のようなもの。

Macのデスクトップに「確定申告」「旅行写真」「ブログネタ」など用途別フォルダを作るように、GitHub上でもタスクごとに専用フォルダ（= **リポジトリ**）を作って管理する。

### 1-1. GitとGitHubの関係

よく混同されるが、GitとGitHubは別のもの。

**Git** はMacの中で動く変更管理ツール。ファイルの変更履歴をローカルで記録する仕組みで、インターネットがなくても使える。

**GitHub** はその記録を置いておくクラウドサービス。Gitで管理した履歴をネット上にアップロードして保存したり、他の人と共有したりできる。

「GitがツールでGitHubはサービス」という関係。Gitだけでも使えるが、GitHubと組み合わせることでバックアップや共同作業が可能になる。

### 1-2. ローカルとリモート

GitとGitHubを使うとき、ファイルは2拠点で管理される。

- **ローカル**：自分のMacの中。ここで実際にファイルを編集する
- **リモート**：GitHubのサーバー上。ローカルの記録をアップして保存しておく場所

```
ローカル（Mac）  ←→  リモート（GitHub）
```

基本の流れは、ローカルで作業してリモートに送ること（`push`）。必要に応じてリモートの最新状態をローカルに取り込むこと（`pull`）もある。初回だけはリモートのリポジトリをMacに丸ごとコピーする操作（`clone`）から始める。

### 1-3. 変更履歴をすべて記録する

GitHubの中心にあるのは「変更の記録」という考え方。ファイルを変えるたびに「いつ・何を・どう変えたか」が蓄積されていく。

`backup_20240401.zip` のようにファイルを丸ごとコピーして取っておく管理と違い、どのバックアップが何の目的で作られたものか、何を変えた時点のものかが一目でわかる。

### 1-4. チームでも一人でも、複数の環境で使える

複数人が同じプロジェクトを触るとき、GitHubでは「誰が・いつ・何を変えたか」を把握しながら作業が進められる。**ブランチ**（作業用のコピー）を使って並行作業し、確認できたら本体に合流させる流れが基本。

一人で開発する場合でも、複数のPCを使用している状況で同じ仕組みが役立つ。常にローカルを最新状態にすれば、環境の違いを意識せずに作業が継続できる。

### 1-5. エンジニア以外にも使われている

コードを書く人のためのツールというイメージが強いが、テキストを扱う作業全般に使われている。

- **Webデザイナー**：HTMLやCSSのバージョン管理。「デザインを変えたら崩れた」を前の状態に戻せる
- **文章執筆**：Markdownで原稿を管理。変更箇所の差分がひと目でわかるため、修正履歴の確認が楽
- **設定ファイル管理**：アプリやTerminalの設定ファイルをGitHubで管理しておくと、新環境への移行が楽

「テキストベースのファイルであれば何でも」という感覚で使える。

### 1-6. ファイル管理以外にできること

**GitHub Pages**  
リポジトリに置いた静的ファイル（HTMLファイルなど）をそのままWebサイトとして無料で公開できる機能。ポートフォリオ、ドキュメントサイト、静的なブログなどに広く使われている。

**GitHub Actions**  
pushやmergeをきっかけに、自動でスクリプトを動かす仕組み。「変更をpushしたら自動でサイトをビルドしてデプロイ」「毎朝決まった時間に外部データを取得してリポジトリに保存」といったことができる。

## 2. Webブラウザだけで始める

この章はターミナル不要。ブラウザだけでアカウント登録、リポジトリの作成、ファイルの追加まで行う。

### 2-1. GitHubアカウントを作る

1. [github.com](https://github.com) にアクセスして **Sign up for GitHub** をクリック   
<a href="images/github-guide-2-1-a.jpg" target="_blank"><img src="images/github-guide-2-1-a.jpg" alt="github-guide-2-1-a.jpg" width="400"></a>

2. Googleアカウントで登録する場合は **Continue with Google** を選択   
<a href="images/github-guide-2-1-b.jpg" target="_blank"><img src="images/github-guide-2-1-b.jpg" alt="github-guide-2-1-b.jpg" width="400"></a>

3. ユーザー名を設定して登録完了   
<a href="images/github-guide-2-1-c.jpg" target="_blank"><img src="images/github-guide-2-1-c.jpg" alt="github-guide-2-1-c.jpg" width="400"></a>

> ユーザー名はURLに使われる（`github.com/ユーザー名`）。後から変更できるが、外部に共有したURLが変わってしまうので最初から決めておくと良い。

### 2-2. リポジトリを作る

ログイン後、右上の **+** ボタン → **New repository** をクリック。

| 項目 | 設定内容 |
|---|---|
| `Repository name` | `my-first-site` にしてください |
| `Description` | 任意（空でもOK） |
| `Choose visibility` | 初心者は基本的に **Private（非公開）** を選ぶ。GitHub Pages を使う場合は **Public（公開）** を選ぶ。あとから変更することも可能。詳しくは「[リポジトリをPrivateにする](#private)」を参照 |
| `Add README` | **チェックを入れる**（リポジトリの概要を書くファイル。リポジトリのトップページに自動表示される） |

<a href="images/github-guide-2-2-a.jpg" target="_blank"><img src="images/github-guide-2-2-a.jpg" alt="github-guide-2-2-a.jpg" width="400"></a>

**Create repository** ボタンを押せばリポジトリ完成。

<a href="images/github-guide-2-2-b.jpg" target="_blank"><img src="images/github-guide-2-2-b.jpg" alt="github-guide-2-2-b.jpg" width="400"></a>

### 2-3. リポジトリにファイルを追加してみる

リポジトリのトップページで **Add file** → **Create new file** をクリック（画面幅が狭い場合は **Add file** の代わりに **+** と表示される）。

<a href="images/github-guide-2-3-a.jpg" target="_blank"><img src="images/github-guide-2-3-a.jpg" alt="github-guide-2-3-a.jpg" width="400"></a>

1. ファイル名の入力欄に `index.html` と入力
2. エディタ部分に以下を貼り付ける   
```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>My First Page</title>
</head>
<body>
  <p>Hello World!</p>
</body>
</html>
```

3. 右上の **Commit changes...** ボタンをクリック
4. コミットメッセージ（例：「最初のページを追加」／空でもよい）を入力して **Commit changes**   
<a href="images/github-guide-2-3-b.jpg" target="_blank"><img src="images/github-guide-2-3-b.jpg" alt="github-guide-2-3-b.jpg" width="400"></a>

リポジトリのトップページに `index.html` が表示されていれば完了。

<a href="images/github-guide-2-3-c.jpg" target="_blank"><img src="images/github-guide-2-3-c.jpg" alt="github-guide-2-3-c.jpg" width="400"></a>

---

## 3. ターミナルで操作する（Git準備）

ここからはMacのターミナルを使ってGitを操作する。

ターミナルを開くには `Command + Space` → `Terminal` と入力。

まずはGitが使える状態か確認する。
ターミナルで下記のコマンドを実行する。

```bash
git --version
```

`git version 2.x.x` などと表示されれば問題なし。

入っていない場合は「command line developer tools」をインストールするか聞かれるので入れる（Xcode本体は不要で、Command Line ToolsだけでOK）。

<!--

初回だけ、自分の名前とメールアドレスを登録しておく（commitの記録に使われる）。名前とメールはGitHubのデータとして公開される（設定による）ので、本名でなくてもOK。メールは GitHub に登録済みのもの、または GitHub の noreply メールアドレス（[コミットメールアドレスを設定する](https://docs.github.com/ja/account-and-profile/how-tos/email-preferences/setting-your-commit-email-address)）を使う。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
-->

## 4. ターミナルで操作する（SSH設定）

GitHubへの認証にはSSHを使う。
一度設定すれば、その後はパスワードなしで操作できる。

### 4-1. GitHubに登録されているメールアドレスを確認する

GitHub → 右上のアイコン → **Settings** → **Emails**

ここに表示されているメールアドレスを次のステップで使う。Google連携でGitHub登録した場合、GmailアドレスとGitHubに登録されているアドレスが異なる場合があるので必ず確認すること。

### 4-2. SSHキーを生成する

```bash
ssh-keygen -t ed25519 -C "確認したメールアドレス"
```

実行後は **Enter** を3回押すだけでOK。   
アスキーアートっぽいのも出てくるけど大丈夫。

### 4-3. 公開鍵をクリップボードにコピーする

```bash
pbcopy < ~/.ssh/id_ed25519.pub
```

### 4-4. GitHubに登録する

GitHub → **Settings** → **SSH and GPG keys** → **New SSH key**

フォームが開くので以下を入力して **Add SSH key** をクリック。

| フィールド | 入力内容 |
|---|---|
| `Title` | このMacの識別名（例：`MacBook Air`）。何でもOK |
| `Key` | 4-3.でコピーした公開鍵をペースト |

### 4-5. 接続確認

```bash
ssh -T git@github.com
```

`Hi ユーザー名!` と表示されれば成功。


## 5. ターミナルで操作する（クローン）

GitHubのリポジトリをMacに丸ごとコピー（クローン）する。初回だけ行う。

### 5-1. 作業場所を確保する

まずは作業場所（フォルダ）を作成する。例えば、デスクトップの "claude" フォルダ。   
Finderでフォルダを作るか、ターミナルで下記のコマンドを実行する。

```bash
mkdir ~/Desktop/claude
```

> `mkdir` はフォルダを作成するコマンド

ターミナル内で作業場所に移動する。

```bash
cd ~/Desktop/claude
```

> `cd` はフォルダを移動するコマンド

### 5-2. リポジトリをクローンする

GitHubのリポジトリページで **Code** ボタン → **SSH** タブに切り替えて、`git@github.com:ユーザー名/my-first-site.git` という文字列をコピーする。

```bash
git clone ###ここにコピーしたのをペースト###
```

ペーストするとこんな感じになる。これを実行する。

```bash
git clone git@github.com:ユーザー名/my-first-site.git
```
いろいろメッセージがでてきてクローンが完了。   

### 5-3. クローン結果の確認

クローンされたフォルダに移動する。
```bash
cd my-first-site
```

フォルダの中身を見る。   
Finderで **デスクトップ** → **claude** → **my-first-site** フォルダを見るか、ターミナルで下記のコマンドを実行する。

```bash
ls
```

> `ls` は今いるフォルダのファイル一覧を表示するコマンド

`index.html` などのファイルが入っていればクローン成功。
GitHubにあったファイルがそのままMacに降りてきていることが確認できた。


## 6. ターミナルで操作する（コミット）

ローカルで編集したファイルをリモート（GitHub）にアップし、反映されるのを確認する。

### 6-1. 操作手順

- Finderで **デスクトップ** → **claude** → **my-first-site** フォルダを開き、`index.html` をテキストエディタで開く
  - `index.html` を二本指タップ（右クリック）して、**このアプリケーションで開く** → **テキストエディット**
- `Hello World!` の文字を何か別のテキスト（例：`Hi Japan!`）に変えて保存する
- ターミナルで以下を実行する：
```bash
cd ~/Desktop/claude/my-first-site
git add index.html
git commit -m "index.htmlを更新"
git push -u origin main
```
- ブラウザでGitHubのリポジトリページを開き、`index.html` が更新されていることを確認する


### 6-2. 解説

基本の開発フロー。ファイルを編集したら3ステップでGitHubに反映する。

```
ファイルを編集 → git add → git commit → git push
```

| コマンド | 意味 |
|---|---|
| `git add` | 「これを記録対象にする」と宣言。複数ファイルを変更していても、一部だけ選べる。 |
| `git commit` | 「この状態を記録する」。何を変えたかをメッセージとして名前をつけておく。 |
| `git push` | その記録をGitHubにアップロード。 |

commitは「名前のついたバックアップ」のようなもの。いつの・何のための変更かがメッセージとして残るので、単なる日付バックアップと違い、目的の状態をあとから探しやすい。

Git コマンドメモ:

```bash
# 状態確認（迷ったらまずこれ）
git status

# 特定のファイルを記録対象に追加
git add index.html

# すべての変更ファイルをまとめて追加する場合
git add .

# コミット（メッセージは何を変えたかを書く）
git commit -m "トップページのレイアウトを修正"

# 初回だけこのコマンド（以降は git push だけでOKになる）
git push -u origin main

# 2回目以降
git push
```

Claude CodeやCodexなどのAIコーディングツールを使っている場合は、「GitHubにpushして」と依頼するだけでadd・commit・pushの一連の操作をやってもらえる。コマンドを覚えなくても使えるが、各コマンドが何をしているか知っておくと、トラブル時に状況を理解しやすい。

また、GitHubのWebサイト上で直接ファイルを編集することもできる。その変更をMac側に取り込むには下記のコマンドを実行する。

```bash
git pull
```

`clone` は「初回の丸ごとコピー」、`pull` は「すでにある状態で最新を取り込む」と使い分ける。


---

## 7. 補足

### 7-1. GitHub Pages で公開する

1章で紹介したGitHub Pagesを実際に設定する。リポジトリの設定画面から数クリックで完了し、`https://ユーザー名.github.io/リポジトリ名/` の形式でURLが発行される。

1. リポジトリの **Settings** を開く
2. 左メニューの **Pages** を選択
3. `Source` を **Deploy from a branch** に設定
4. `Branch` を `main`、`Folder` を `/ (root)` にして **Save**   
<a href="images/github-guide-2-4-a.jpg" target="_blank"><img src="images/github-guide-2-4-a.jpg" alt="github-guide-2-4-a.jpg" width="400"></a>
5. Pages設定画面の上部にURLが表示される（`https://ユーザー名.github.io/my-first-site/`）。反映まで数分かかるので、しばらく待ってからアクセスして確認する。   
<a href="images/github-guide-2-4-b.jpg" target="_blank"><img src="images/github-guide-2-4-b.jpg" alt="github-guide-2-4-b.jpg" width="400"></a>   
<a href="images/github-guide-2-4-c.jpg" target="_blank"><img src="images/github-guide-2-4-c.jpg" alt="github-guide-2-4-c.jpg" width="400"></a>

注意点：

- 無料版（GitHub Free）はリポジトリが Public でないと GitHub Pages を使えない。Private リポジトリで Pages を有効にするには有料プラン（GitHub Pro 等）が必要
- エントリーポイントは `index.html` という名前のファイルが基本。ないと404エラーになる
- あくまで静的サイト（HTML/CSS/JSなど）が対象。サーバー側の処理が必要なものは別途対応が必要

> ポートフォリオや静的なブログの公開によく使われる。

### 7-2. リポジトリをPrivateにする {#private}

リポジトリをPublic（公開）にしていると、ファイルの中身や変更履歴は誰でも閲覧できる状態になる。
HTML + JavaScript + CSSだけのシンプルなアプリであれば大きな問題になることは少ないが、以下のようなケースではPrivate（非公開）への変更がおすすめ。

- 試行錯誤の履歴を見られたくない
- 意図しないファイルを公開してしまうリスクを避けたい

変更方法：リポジトリの **Settings** → **Danger Zone**（ページ下部） → **Change repository visibility**

ただし、GitHub Free（無料版）のPrivateリポジトリではGitHub Pagesは使えない。PrivateのままGitHub Pagesを使うにはGitHub Pro以上が必要。  
無料のまま非公開で運用したい場合は、Cloudflare Pagesなど別のホスティングサービスが選択肢となる。

### 7-3. ブランチ

本番ファイルを直接触らず、コピーして作業してからOKなら合流させる仕組み。

```
main（本番・完成版）→ ブランチを作る（コピー）→ 作業・テスト → merge（合流）
```

```
main
├── feature ブランチ（新機能を試す）
└── fix ブランチ（バグ修正用）
```

GitHubでは、「このブランチの変更を main に取り込んでください」と依頼する仕組みを **Pull Request（PR）** と呼ぶ。PR を作って確認し、問題なければ merge（合流）する。現場では「プルリク」と略されることが多い。

### 7-4. コンフリクト

同じファイルを複数人（または複数Mac）が別々に編集してアップしようとすると、どちらを正とするか判断できなくなる。これがコンフリクト。

発生しやすいケース：

- 複数人が同じファイルを編集した
- 自宅Macと会社Macで作業した
- WebとMacを使い分けた

mergeのときに起きやすい。解決する仕組みはあるが、`git pull` を習慣づけてこまめに最新状態にしておくことで防ぎやすくなる。

### 7-5. アップしたくないファイルの設定

`.gitignore` は「GitHubにアップしたくないファイル」のリストを書いておくファイル。

対象の例：パスワード・APIキー / `node_modules`（大量の依存ファイル）/ `.DS_Store`（macOSが自動生成する不要ファイル）

```bash
# .gitignore ファイルをターミナルで作成する例
echo ".DS_Store" >> .gitignore
echo "node_modules/" >> .gitignore
```

うっかり秘密情報を公開してしまうのを防ぐ。プロジェクト作成時に設定しておくのが基本。  
ただし、`.gitignore` は「まだGitで管理していないファイル」を除外するためのもの。すでに追加済みのファイルは別途対処が必要なので、最初に設定しておくと混乱しにくい。  
macOSでは `.DS_Store` が頻繁に生成されるので、最初から除外しておくと良い。

---
2026-04-23 (last updated: 2026-05-04)　タツヲ ([yto](https://x.com/yto))
