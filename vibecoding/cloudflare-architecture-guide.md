# Cloudflareで「みんなで使える」Webアプリを作るための基礎知識

<p class="subtitle">Pages + Pages Functions + D1 構成ガイド</p>

チャット機能やランキング機能など、「データを保存・共有する」Webアプリを個人で作りたい場合、ネット上にデータベースが必要になります。友達や同僚みんなが使えるWebアプリには、誰かが入力したデータをサーバー側で保存し、ほかの人からも見られるような仕組みが欠かせないからです。

この文書では、そのようなWebアプリを個人・小規模で作るためにおすすめの構成を紹介します。構成の全体像と、それぞれの役割を理解することが目的です。実際の設定手順や導入方法は、別途ハンズオン資料で説明します。

この文書を読む前に、[GitHub初心者ガイド](github-guide-first-step.html)と[Cloudflare Pagesハンズオン](claude-code-web-app-cloudflare-pages.html)を読んでおくことをおすすめします。


## 1. 推奨構成：Pages + Pages Functions + D1

CloudflareでDBを使う個人・小規模Webアプリを作る場合、Pages + Pages Functions + D1の組み合わせがシンプルで扱いやすい構成です。

### なぜ3つに分かれているのか

Webアプリは「見た目」「処理」「データ」の3つの役割に分けて作るのが基本です。レストランに例えるとわかりやすいです。

| レストランの例 | Webアプリの役割 | Cloudflareのサービス |
|---|---|---|
| 客席・メニュー（お客さんが見て触る場所） | フロントエンド（画面・UI） | Cloudflare Pages |
| キッチン（注文を受けて料理を作る場所） | 内部API（バックエンド相当） | Cloudflare Pages Functions |
| 冷蔵庫・食材庫（材料を保管する場所） | データベース（データ保存） | Cloudflare D1 |

お客さん（ユーザー）は冷蔵庫を直接触りません。キッチン（Pages Functions）を通して料理（データ）が出てきます。これはセキュリティと役割分担のために意図的にそう設計されています。

> Pages Functionsは「バックエンド的な役割」を担いますが、独立したサーバーが別に存在するわけではありません。Pages（フロントエンド）の中に処理が同居しているイメージです。フロントとAPIが一体化しているのがこの構成の特徴です。

### 3つに分ける理由

- **セキュリティ**：データベースをインターネットから直接触れると危険。Pages Functionsを仲介させることで守る
- **役割分担**：画面の担当とデータの担当を分けると管理しやすい
- **柔軟性**：画面だけ変えたい・DBだけ変えたいときに、それぞれ独立して対応できる

> この3層構造（フロントエンド／バックエンド／データベース）はWebアプリ開発では当たり前の考え方です。Cloudflareの Pages + Pages Functions + D1 はその3層をそれぞれ担当するサービスです。

### Cloudflareサービスの対応

具体的にどのサービスが何を担当するかは以下の通りです。

| サービス | 役割 | 扱うもの |
|---|---|---|
| Cloudflare Pages | フロントエンド配信 | HTML / CSS / JavaScript |
| Cloudflare Pages Functions | 内部API（バックエンド相当） | リクエスト処理・DBアクセス |
| Cloudflare D1 | データベース | ユーザーデータ・コンテンツ等 |

### 処理の流れ

ブラウザからのアクセスは以下の順番で処理されます：

1. ユーザーがブラウザでURLにアクセス
2. Cloudflare PagesがHTML/CSS/JSを返す（画面表示）
3. 画面からAPIリクエストがCloudflare Pages Functionsへ送られる
4. Cloudflare Pages FunctionsがD1データベースを参照・更新して結果を返す

> Pages FunctionsはPagesの中に同居しているため、フロントもAPIも同じリポジトリ・同じデプロイで完結します。

### この構成が良い理由

- フロントもAPIも同じPagesリポジトリにまとまるので管理がシンプル
- デプロイもPages一本に統一できる（GitHubにpushするだけで、フロントもAPIも同時に反映）
- Cloudflareは世界中にサーバーを持っているため、ユーザーの近くから素早くページを届けられます
- 個人・小規模開発に最適なシンプルさが特徴


## 2. GitHub Actionsとの連携

GitHubにコードをpushすると、自動的にCloudflareへデプロイされます。Pages + Pages Functionsの構成では、フロントもAPIもまとめてPagesにデプロイされます。

### Cloudflare Pages + Pages Functions：GitHub直接連携

- Cloudflareダッシュボードで「GitHubと連携」を設定
- mainブランチへのpushで自動的にビルド＆デプロイ
- フロント（HTML/CSS/JS）もAPI（Pages Functions）も同時にデプロイされる
- GitHub Actionsの設定ファイル（YAMLファイル）は不要

> UIの調整もAPIの変更も、pushするだけで一度に反映されます。

### D1のデータベース変更：GitHub Actionsを使う

D1のテーブル構造を変更する場合（マイグレーション）だけ、GitHub Actionsを使って自動化します。設定はワークフローファイルと呼ばれる定義ファイルをリポジトリに置くだけです。詳しい設定方法は導入ハンズオン資料を参照してください。

### デプロイ方法まとめ

| 対象 | デプロイ方法 | 必要な設定 |
|---|---|---|
| Cloudflare Pages（HTML等） | GitHub直接連携（自動） | Cloudflareダッシュボードで一度設定 |
| Pages Functions（API） | GitHub直接連携（自動） | Pagesと同時・追加設定不要 |
| D1マイグレーション | GitHub Actions | ワークフローファイルを追加 |


## 3. ローカル開発・確認に必要なツール：Wrangler

GitHub連携によってPages・Pages Functions・D1のデプロイは自動化されています。しかしコードを書きながら「手元で動かして確認する」には、ローカルPC上でPages FunctionsやD1を動かせる環境が必要です。そのために使うのがWrangler（ラングラー）です。

### ローカル確認が必要な場面

以下のような作業をするときに、ローカルでWranglerを使います：

- Pages Functionsの動作を手元で確認したい（本番に上げる前に試したい）
- D1のデータを直接確認・修正したい
- UIとAPIを合わせてローカルで動作確認したい
- Claude Codeと一緒に開発するとき（変更をすぐ手元で確認できる）

### Wranglerとは

WranglerはCloudflareが公式に提供するツールで、Cloudflare専用（他社のクラウドサービスには使えません）です。ローカルで開発・確認し、本番へデプロイするために使います。Pages Functions・D1・Pagesすべてに対応しており、ターミナル（黒い画面）からコマンドを打って操作します。今回の構成ではデプロイはGitHub連携が担うため、主にローカルでの開発・確認に活用します。

ちなみに、どのクラウドサービスにも同様のツールがあります。AWS CLI（Amazon）、Firebase CLI（Google）、Vercel CLI（Vercel）などがその例で、Wranglerはそれらと同じ位置づけのCloudflare版です。


## 4. まとめ

### 開発の流れ

GitHub + Cloudflareの構成が整うと、以下のサイクルで開発が進みます：

1. Claude Codeにコードを書いてもらう
2. GitHubにpush（git push）するだけ
3. Cloudflare Pages・Pages Functions・D1、すべてが自動でデプロイされる
4. ブラウザで動作確認
5. 修正があればまたClaude Codeに依頼 → push

> UIの調整もAPIの変更も、pushするだけで同時に反映されます。Pages + Pages Functionsはまとめて一度にデプロイされるのが強みです。

### ローカルで動作確認したい場合

本番にpushする前に手元で動かして確認したい場合や、D1のデータを直接操作したい場合は、ローカルPCにWranglerをインストールして使います。インストール方法や具体的な使い方は導入ハンズオン資料を参照してください。

- Pages Functionsをローカルで動かして動作確認できる
- D1のデータを直接確認・操作できる

> この構成ではWranglerをデプロイには使いません。あくまで「手元での確認・開発作業」のためのツールです。デプロイはGitHub連携（Pages・Pages Functions）やGitHub Actions（D1マイグレーション）が自動で行います。

### 次のステップへ

pushするだけで本番反映。手元確認にはWrangler。Pages + Pages Functionsでシンプルに。この構成を理解したら、次はハンズオン資料で実際に手を動かしてみましょう。

---

2026-05-02 (last updated: 2026-05-02)　タツヲ ([yto](https://x.com/yto))

