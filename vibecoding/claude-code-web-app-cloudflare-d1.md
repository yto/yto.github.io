# Claude CodeでDB付きWebアプリを作ってCloudflareで公開するバイブコーディングハンズオン

<p class="subtitle">Cloudflare Pages + Pages Functions + D1 実践ガイド</p>

このハンズオンを始める前に、[Cloudflareで「みんなで使える」Webアプリを作るための基礎知識](cloudflare-architecture-guide.html)を必ず読んでおいてください。また、[GitHub初心者ガイド](github-guide-first-step.html)と[Cloudflare Pagesハンズオン](claude-code-web-app-cloudflare-pages.html)も完了しておいてください。

---

## このハンズオンで作るもの

**匿名一行掲示板**を作ります。

- 名前の入力不要。書き込むだけで投稿できます
- 書き込んだ人には自動的に「会員1号」「会員2号」と番号が割り振られます
- 同じブラウザから書き込むと、次回以降も同じ会員番号が使われます
- みんなの投稿を一覧表示します

このハンズオンで学ぶこと：

- Cloudflare D1（データベース）の作成と設定
- Cloudflare Pages Functions（バックエンドAPI）の実装
- Claude Codeとのデータベース設計の進め方
- GitHub Actionsを使ったD1マイグレーションの自動化

新たに登場するもの：

| 名前 | 役割 |
|---|---|
| Cloudflare D1 | データベース（SQLite） |
| Cloudflare Pages Functions | バックエンドAPI |
| wrangler.toml | プロジェクト設定ファイル |
| マイグレーション | データベースのテーブル定義ファイル |
| GitHub Actions | D1マイグレーションの自動実行 |
| Wrangler | ローカル開発ツール（オプション） |

### 「Claude Codeに全部作って」ではダメなの？

「Cloudflare Pages + D1で匿名一行掲示板を作って」とClaude Codeに一言伝えるだけでも、コードはほぼ完成します。ではなぜ手順を追うのか。

理由は2つあります。

1つ目は、**Claude Codeが代わりにできない手作業があるから**です。CloudflareダッシュボードでのD1バインディングの設定、GitHub SecretsへのAPI Token登録など、ブラウザ上でのクリック操作はClaude Codeには頼めません。「次に何をすればいい？」とその都度Claude Codeに聞きながら進める方法もありますが、それだと全体像がわからないまま「言われた通りにクリックしている」状態になりがちです。何のためにこの設定をしているのかが見えないまま進むのは、トラブルが起きたときに特につらい。

2つ目は、**何か起きたときに対処できるようになるから**です。一発生成だとコードは動いても「どこに何があるか」わからないまま。エラーが出たとき・機能を変えたいときに手が止まります。手順を追うと構造が頭に入り、Claude Codeへの依頼も的確になります。

---

## 1. プロジェクトの準備

### 1-1. GitHubリポジトリを作る

前回のハンズオンと同じ手順で、新しいリポジトリを作成します。

1. GitHubで新しいリポジトリを作成（例：`bbs`）
2. ローカルにクローン
3. Claude Codeで開く

### 1-2. Cloudflare Pagesと連携する

前回のハンズオンと同じ手順で、Cloudflare PagesとGitHubリポジトリを連携します。

1. Cloudflareダッシュボード → Workers & Pages → Create
2. Pages → Connect to Git
3. 作成したリポジトリを選択して連携
4. Build settings：ビルドコマンドは空欄、出力ディレクトリは `/`

### 1-3. wrangler.tomlを作る

`wrangler.toml`はプロジェクトの設定ファイルです。D1データベースの接続情報などを書きます。Claude Codeに依頼します：

```
wrangler.tomlを作成してください。
プロジェクト名はbbs、D1データベースのbinding名はDB、
database_nameはbbsとしてください。
database_idはあとで記入するのでxxxxxxとしておいてください。
```

作成されるwrangler.tomlのイメージ：

```toml
name = "bbs"
compatibility_date = "2024-04-05"
pages_build_output_dir = "."

[[d1_databases]]
binding = "DB"
database_name = "bbs"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

> `database_id`はあとでCloudflareダッシュボードで確認して記入します。

---

## 2. データベース設計をClaude Codeに相談する

データを保存するには、どんなデータをどんな形で保存するかを設計する必要があります。これをClaude Codeと一緒に考えます。

### 2-1. 仕様をClaude Codeに伝える

Claude Codeに以下のように伝えます：

```
匿名一行掲示板を作ります。仕様は以下のとおりです。

- ユーザーはブラウザのlocalStorageに保存したUUIDで識別する（画面には表示しない）
- 初めて投稿したときに会員番号が払い出される（1, 2, 3...の連番）
- 画面には「会員1号」「会員2号」と表示する
- 投稿内容は1行のテキスト

このアプリに必要なデータベースのテーブル設計を提案してください。
```

### 2-2. スキーマを確認する

> スキーマとは、データベースの構造定義のことです。どんなテーブルがあり、それぞれどんな列（カラム）を持つかを定めたものです。建物で言えば「設計図」にあたります。

Claude Codeからテーブル設計の提案が来ます。おそらく以下のような2テーブル構成が提案されます：

- **membersテーブル**：UUIDと会員番号の対応を管理
- **postsテーブル**：投稿内容を管理

内容を確認して、疑問があればClaude Codeに質問します。「なぜ2つに分けるの？」「このカラムは何のため？」など、気になることは何でも聞いてみましょう。

### 2-3. マイグレーションファイルを作ってもらう

設計が固まったら、SQLファイルを作ってもらいます：

```
このスキーマでマイグレーションファイルを作成してください。
ファイルはmigrations/0001_init.sqlに保存してください。
```

> マイグレーションとは、データベースのテーブル定義をファイルとして管理する仕組みです。どのテーブルをいつ作ったかが記録に残ります。

---

## 3. D1データベースを作る

### 3-1. Cloudflareダッシュボードで作成

1. Cloudflareダッシュボード → Storage & Databases → D1 SQL Database
2. Create → データベース名に `bbs` と入力して作成
3. 作成後に表示される **Database ID** をコピーする

### 3-2. database_idをwrangler.tomlに記入

`wrangler.toml`の`database_id`の`xxxxxxxx...`を、コピーしたDatabase IDで書き換えます。

### 3-3. Cloudflare PagesダッシュボードでD1バインディングを設定する

GitHubからの自動デプロイでPages FunctionsがD1を使えるようにするため、Cloudflare PagesのダッシュボードにもD1の設定を追加します。

1. Cloudflareダッシュボード → 作成したPagesプロジェクト → Settings → Functions
2. D1 database bindings → Add binding
3. Variable name: `DB`、D1 database: `bbs` を選択して保存

> wrangler.tomlの設定はローカル開発（オプション章）で使います。本番のデプロイにはダッシュボードの設定が必要です。

---

## 4. Pages FunctionsでAPIを作る

### 4-1. functionsディレクトリの構造

`functions/api/posts.js`というファイルを作ります。URLの`/api/posts`へのリクエストをこのファイルが処理します。

```
bbs/
├── index.html
├── wrangler.toml
├── migrations/
│   └── 0001_init.sql
└── functions/
    └── api/
        └── posts.js
```

### 4-2. Claude Codeに実装を依頼する

```
以下の仕様でfunctions/api/posts.jsを作成してください。

GET /api/posts
- postsとmembersをJOINして投稿一覧を返す
- 返すフィールド：member_number、message、created_at
- 新しい順に最大100件

POST /api/posts
- リクエストボディ：{ uuid, message }
- uuidがmembersテーブルになければ新規登録（member_numberは現在の最大値+1）
- postsテーブルに投稿を保存
- D1のbinding名はDB
```

> Pages FunctionsはCloudflare Workers上で動くため、Node.jsとは一部APIが異なります。Claude Codeはこれを考慮してコードを書いてくれます。

---

## 5. フロントエンドを作る

### 5-1. Claude Codeに実装を依頼する

```
匿名一行掲示板のフロントエンドをindex.htmlとして作成してください。

仕様：
- ページ表示時にlocalStorageからUUIDを取得。なければUUIDを生成して保存する
- 投稿フォーム：1行テキスト入力と送信ボタン
- 投稿送信時はPOST /api/postsにfetchで送信（{ uuid, message }）
- 投稿一覧はGET /api/postsで取得して表示
- 一覧の各行に「会員N号」「投稿内容」「投稿日時」を表示
- 投稿後に一覧を更新する
```

デザインの好みがあれば追加で伝えます：

```
シンプルで読みやすいデザインにしてください。
スマートフォンでも使いやすいようにしてください。
```

---

## 6. GitHubにpushして本番デプロイ・動作確認

### 6-1. Cloudflare API Tokenを取得する

GitHub ActionsがD1のマイグレーションを実行できるよう、CloudflareのAPI Tokenを取得します。

1. Cloudflareダッシュボード → My Profile → API Tokens
2. Create Token → Custom Token
3. 以下の権限を設定：
   - Account > D1 > Edit
4. Continue to Summary → Create Token
5. 表示されたトークンをコピー（この画面を閉じると二度と表示されません）

**Account IDの確認：**

Cloudflareダッシュボードの右サイドバーに表示されています。

### 6-2. GitHubにSecretを登録する

1. GitHubリポジトリ → Settings → Secrets and variables → Actions
2. New repository secret で以下を2つ登録：
   - `CLOUDFLARE_API_TOKEN`：取得したAPI Token
   - `CLOUDFLARE_ACCOUNT_ID`：Account ID

### 6-3. ワークフローファイルを作る

Claude Codeに依頼します：

```
.github/workflows/migrate.ymlを作成してください。
mainブランチへのpush時にwrangler d1 migrations applyを実行して、
bbsデータベースにマイグレーションを適用してください。
SecretsはCLOUDFLARE_API_TOKENとCLOUDFLARE_ACCOUNT_IDを使います。
```

### 6-4. pushしてデプロイ・確認

```bash
git add .
git commit -m "add bulletin board"
git push
```

以下の順で確認します：

1. GitHubの **Actions** タブ → マイグレーションが成功しているか確認
2. Cloudflareダッシュボード → Pagesプロジェクト → デプロイ完了を確認
3. 本番URLにアクセスして投稿・表示を確認

> マイグレーションが失敗した場合はActionsのログを確認します。API TokenやSecretsの設定ミスが多いので見直してみてください。

---

## 7. 【オプション】ローカルで動かして確認する

本番にpushする前に手元で確認したい場合はWranglerを使います。Wranglerの導入でつまずいた場合はこのセクションをスキップして、pushして本番で確認する方法で進めて問題ありません。

### 7-1. Wranglerのインストール

Node.jsがインストールされていることを確認します：

```bash
node -v
```

Wranglerをインストールします：

```bash
npm install -g wrangler
```

Cloudflareにログインします：

```bash
wrangler login
```

ブラウザが開くのでCloudflareアカウントでログインします。

### 7-2. ローカルD1へのマイグレーション実行

```bash
wrangler d1 migrations apply bbs --local
```

### 7-3. 起動・確認

```bash
wrangler pages dev .
```

ブラウザで `http://localhost:8788` を開いて動作確認します。

---

## 8. まとめ

このハンズオンで作ったものを振り返ります：

| 役割 | 実装 |
|---|---|
| フロントエンド | index.html（画面・UUID管理） |
| バックエンドAPI | functions/api/posts.js |
| データベース | Cloudflare D1（membersテーブル・postsテーブル） |
| デプロイ | GitHub → Cloudflare Pages（自動） |
| DBマイグレーション | GitHub Actions（自動） |

次にできること：

- 投稿の削除機能を追加する
- 返信機能をつける
- デザインをカスタマイズする
- 認証機能を追加してログイン制にする

---

2026-05-02 (last updated: 2026-05-02)　タツヲ ([yto](https://x.com/yto))
