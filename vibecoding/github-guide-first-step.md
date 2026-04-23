# GitHub 初心者ガイド

> 厳密には違う部分もあるけど、わかりやすさ優先で解説します。

---

## 1. GitHubとは

**ゴール：** 自分のWebページをGitHub Pagesで公開し、更新していけるようになること。

GitHubは「変更履歴ごと保存できるネット上のフォルダ」のようなもの。  
ローカル（Mac内）で作業して、リモート（GitHub）に保存するのが基本スタイル。

Macのデスクトップに「確定申告」「旅行写真」「ブログネタ」など用途別フォルダを作るように、GitHub上でもタスクごとに専用フォルダ（= **リポジトリ**）を作って管理する。

主な機能：履歴管理 / 複数人での共同作業 / ブランチ（作業コピー） / GitHub Pages（Web公開）

---

## 2. Webブラウザだけで登録・作成・公開する

この章はターミナル不要。ブラウザだけでアカウント登録からWebサイト公開まで行う。

### 2-1. GitHubアカウントを作る

1. [github.com](https://github.com) にアクセスして `Sign up` をクリック
2. Googleアカウントで登録する場合は `Continue with Google` を選択
3. ユーザー名を設定して登録完了

> ユーザー名はURLに使われる（`github.com/ユーザー名`）。後から変更できるが、外部に共有したURLが変わってしまうので最初から決めておくと良い。

### 2-2. リポジトリを作る

ログイン後、右上の `+` ボタン → `New repository` をクリック。

| 項目 | 設定内容 |
|---|---|
| Repository name | `my-first-site` にしてください |
| Description | 任意（空でもOK） |
| Public / Private | 今回は Public（公開）を選ぶ |
| Add a README file | 今回はチェックしない（後のgit clone操作でエラーになるのを防ぐため） |

`Create repository` ボタンを押せばリポジトリ完成。

### 2-3. index.html をWeb上で作成・保存する

リポジトリのトップページで `Add file` → `Create new file` をクリック。

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

3. 右上の `Commit changes...` ボタンをクリック
4. コミットメッセージ（例：「最初のページを追加」／空でもよい）を入力して `Commit changes`

リポジトリのトップページに `index.html` が表示されていれば完了。

---

### 2-4. GitHub Pages で公開する

GitHubのリポジトリをそのままWebサイトとして無料で公開できる機能。  
レンタルサーバーを契約しなくても、URLが発行されて誰でもアクセスできる状態になる。

1. リポジトリの `Settings` を開く
2. 左メニューの `Pages` を選択
3. Source を `Deploy from a branch` に設定
4. Branch を `main`、Folder を `/ (root)` にして `Save`
5. Pages設定画面の上部にURLが表示される（`https://ユーザー名.github.io/my-first-site/`）。反映まで数分かかるので、しばらく待ってからアクセスして確認する。

**注意点：**

- エントリーポイントは `index.html` という名前のファイルが基本。ないと404エラーになる
- 設定後、反映まで数分かかることがある
- リポジトリがPrivateでもURLは公開される（センシティブな情報を含めないよう注意）
- あくまで**静的サイト**（HTML/CSS/JSのみ）が対象。サーバー側の処理が必要なものは別途対応が必要

> ポートフォリオや静的なブログの公開によく使われる。

---

## 3. Terminalで操作する

ここからはMacのターミナルを使ってGitを操作する。GitとGitHubは別物で、Gitはローカル（Mac内）で動く変更管理ツール、GitHubはその記録を置いておくクラウドサービス。  
ターミナルを開くには `Command + Space` → "Terminal" と入力。

### 3-1. 事前準備：Gitのインストール確認

まずGitが使える状態か確認する。

```bash
git --version
# git version 2.x.x と表示されればOK
```

入っていない場合は、Xcodeのコマンドラインツールをインストールするか、[git-scm.com](https://git-scm.com/) からインストールする。

初回だけ、自分の名前とメールアドレスを登録しておく（commitの記録に使われる）。  
本名・本物のメールアドレスでなくてもOK。最初のうちはニックネームや適当なメールアドレスで構わない。

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 3-2. クローン（初回だけ）

GitHubのリポジトリをMacに丸ごとコピーすること。最初の1回だけ行う。

GitHubのリポジトリページで `Code` ボタン → `HTTPS` タブのURLをコピーして使う。

```bash
# 任意の場所に移動（例：デスクトップ）
cd ~/Desktop

# リポジトリをクローン（↑でコピーしたURLを使う）
git clone https://github.com/ユーザー名/my-first-site.git

# クローンされたフォルダに移動
cd my-first-site
```

> `cd` はフォルダを移動するコマンド。ターミナルでの作業は「今どのフォルダにいるか」が重要。今現在いるフォルダを確認するには `pwd` コマンド。

### 3-3. ローカルで編集してリモートにアップする

基本の開発フロー。ファイルを編集したら3ステップでGitHubに反映する。

```
ファイルを編集 → git add → git commit → git push
```

| コマンド | 意味 |
|---|---|
| `git add` | 「これをセーブ対象にする」宣言。複数ファイルを変更していても、一部だけ選べる。 |
| `git commit` | 「この状態をセーブする」。セーブポイントに名前をつけるイメージ。 |
| `git push` | セーブポイントをGitHubにアップロード。 |

**commitはゲームのセーブポイント**

ゲームで「ここまで進んだら一度セーブしておこう」とするように、gitでも「ここまでの変更をセーブポイントとして残しておく」のがcommit。セーブポイントに名前をつけておける（= コミットメッセージ）ので、後から「あの時点に戻りたい」というときに目印になる。

**なぜ add → commit の2段階？**  
変更が複数あっても、まとめてセーブしたいものだけ選べるようにするため。

```bash
# 状態確認（どのファイルが変更されているか確認できる）
git status

# 特定のファイルをセーブ対象に追加
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

> `git status` でいつでも「今どんな状態か」を確認できる。迷ったらまずこれを打つと良い。

> 初回 `git push -u origin main` のとき、自動でブラウザが開く。GitHubにログインして「Authorize」を押せばOK。以降は `git push` だけでよい。

### 3-4. GitHubサイト上の変更をローカルに反映する

GitHubのWebサイト上で直接ファイルを編集することもできる。その変更をMac側に取り込むには：

```bash
git pull
```

> `clone` は「初回の丸ごとコピー」、`pull` は「すでにある状態で最新を取り込む」と使い分ける。

---

## 4. 補足

### ブランチ

本番ファイルを直接触らず、コピーして作業してからOKなら合流させる仕組み。

```
main（本番・完成版）→ ブランチを作る（コピー）→ 作業・テスト → merge（合流）
```

```
main
├── feature ブランチ（新機能を試す）
└── fix ブランチ（バグ修正用）
```

GitHubの画面上でブランチを合流させる操作を **Pull Request（PR）** と呼ぶ。

### コンフリクト

同じファイルを複数人（または複数Mac）が別々に編集してアップしようとすると、どちらを正とするか判断できなくなる。これがコンフリクト。

発生しやすいケース：

- 複数人が同じファイルを編集した
- 自宅Macと会社Macで作業した
- WebとMacを使い分けた

mergeのときに起きやすい。解決する仕組みはあるが、`git pull` を習慣づけてこまめに最新状態にしておくことで防ぎやすくなる。

### .gitignore

「GitHubにアップしたくないファイル」を除外リストとして書いておくファイル。

対象の例：パスワード・APIキー / node_modules（大量の依存ファイル）/ `.DS_Store`（macOSが自動生成する不要ファイル）

```bash
# .gitignore ファイルをターミナルで作成する例
echo ".DS_Store" >> .gitignore
echo "node_modules/" >> .gitignore
```

うっかり秘密情報を公開してしまうのを防ぐ。プロジェクト作成時に設定しておくのが基本。  
macOSでは `.DS_Store` が頻繁に生成されるので、最初から除外しておくと良い。

---
2026-04-23 タツヲ ([yto](https://x.com/yto))
