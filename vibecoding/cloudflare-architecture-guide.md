# Cloudflareで「みんなで使える」Webアプリを作るための基礎知識

<p class="subtitle">Pages + Pages Functions + D1 構成ガイド</p>

チャット機能やランキング機能など、「データを保存・共有する」Webアプリを個人で作りたい場合、ネット上にデータベースが必要になります。友達や同僚みんなが使えるWebアプリには、誰かが入力したデータをサーバー側で保存し、ほかの人からも見られるような仕組みが欠かせないからです。

この文書では、そのようなWebアプリを個人・小規模で作るためにおすすめの構成を紹介します。構成の全体像と、それぞれの役割を理解することが目的です。実際の設定手順や導入方法は、別途[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)で説明します。

この文書を読む前に、[GitHub初心者ガイド](github-guide-first-step.html)と[Cloudflare Pagesハンズオン](claude-code-web-app-cloudflare-pages.html)を読んでおくことをおすすめします。


## 1. 推奨構成：Pages + Pages Functions + D1

CloudflareでDBを使う個人・小規模Webアプリを作る場合、Pages + Pages Functions + D1の組み合わせがシンプルで扱いやすい構成です。

### 3つの役割

Webアプリは「見た目（フロントエンド）」「処理（バックエンド）」「データ（データベース）」の3つの役割に分けて作るのが基本です。レストランに例えるとわかりやすいです。

<a href="images/cf-arc-restaurant.jpg" target="_blank"><img src="images/cf-arc-restaurant.jpg" alt="cf-arc-restaurant.jpg" width="400"></a>

| レストランの例 | Webアプリの役割 | Cloudflareのサービス |
|---|---|---|
| 客席・メニュー（お客さんが見て触る場所） | フロントエンド（画面・UI） | Cloudflare Pages |
| キッチン（注文を受けて料理を作る場所） | 内部API（バックエンド相当） | Cloudflare Pages Functions |
| 冷蔵庫・食材庫（材料を保管する場所） | データベース（データ保存） | Cloudflare D1 |

お客さん（ユーザー）はフロアスタッフ（フロントエンド）を通じて注文します。注文はキッチン（バックエンド）が受け取り、冷蔵庫（データベース）から必要な食材（データ）を取り出して料理を作ります。できあがった料理はフロアスタッフによってお客さんに届けられます。お客さんが冷蔵庫を直接触ることはありません——これがセキュリティと役割分担を実現している設計です。

> Pages Functionsは「バックエンド的な役割」を担いますが、独立したサーバーが別に存在するわけではありません。Pages（フロントエンド）の中に処理が同居しているイメージです。フロントとAPIが一体化しているのがこの構成の特徴です。ワンオペ営業の小規模飲食店のようなものです。

### 処理の流れ

ブラウザからのアクセスは以下の順番で処理されます：

1. ユーザーがブラウザでURLにアクセス
2. Cloudflare PagesがHTML/CSS/JSを返す（画面表示）
3. 画面からAPIリクエストがCloudflare Pages Functionsへ送られる
4. Cloudflare Pages FunctionsがD1データベースを参照・更新して結果を返す


## 2. GitHub ActionsによるCI/CDデプロイ

GitHubへpushするだけで、D1マイグレーションからPages・Pages Functionsのデプロイまでが自動で実行されます。

### すべてGitHub Actionsでデプロイする

この構成では、**CloudflareダッシュボードのGit連携機能は使いません**。代わりにリポジトリにワークフローファイル（`.github/workflows/deploy.yml`）を置き、wranglerコマンドでデプロイします。

- mainブランチへのpushでGitHub Actionsが自動実行される
- D1マイグレーション → Pages/Pages Functionsのデプロイの順で実行される
- フロント（HTML/CSS/JS）もAPI（Pages Functions）も同時にデプロイされる

> UIの調整もAPIの変更も、pushするだけで一度に反映されます。

> CloudflareダッシュボードでGit連携を設定すると競合してエラーになるため、連携しないようにします。

### 事前準備（初回のみ）

GitHub ActionsがCloudflareを操作できるよう、以下の準備が必要です：

- CloudflareでAPIトークンを作成する
- GitHubのリポジトリにSecretsとして`CLOUDFLARE_API_TOKEN`と`CLOUDFLARE_ACCOUNT_ID`を登録する

詳しい設定方法は[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)を参照してください。

### デプロイ方法まとめ

| 対象 | デプロイ方法 | 必要な設定 |
|---|---|---|
| Cloudflare Pages（HTML等） | GitHub Actions（自動） | ワークフローファイル・Secrets登録 |
| Pages Functions（API） | GitHub Actions（自動） | Pagesと同時・追加設定不要 |
| D1マイグレーション | GitHub Actions（自動） | 同上 |


## 3. ローカル開発・確認に必要なツール：Wrangler

GitHub連携によってPages・Pages Functions・D1のデプロイは自動化されています。しかしコードを書きながら「手元で動かして確認する」には、ローカルPC上でPages FunctionsやD1を動かせる環境が必要です。そのために使うのがWrangler（ラングラー）です。

### ローカルでWranglerを使う場面

以下のような作業をするときに、ローカルでWranglerを使います：

- D1データベースの新規作成（初期設定時）
- Pages Functionsの動作を手元で確認したい（本番に上げる前に試したい）
- D1のデータを直接確認・修正したい
- UIとAPIを合わせてローカルで動作確認したい
- Claude Codeと一緒に開発するとき（変更をすぐ手元で確認できる）

### Wranglerとは

WranglerはCloudflareが公式に提供するツールで、Cloudflare専用（他社のクラウドサービスには使えません）です。ローカルで開発・確認し、本番へデプロイするために使います。Pages Functions・D1・Pagesすべてに対応しており、ターミナル（黒い画面）からコマンドを打って操作します。今回の構成では、ローカルPCからの手動デプロイには使いませんが、D1データベースの作成（初期設定）やローカル確認に使います。なお、GitHub Actions内でのデプロイ処理もwranglerが実行しています。

ちなみに、どのクラウドサービスにも同様のツールがあります。AWS CLI（Amazon）、Firebase CLI（Google）、Vercel CLI（Vercel）などがその例で、Wranglerはそれらと同じ位置づけのCloudflare版です。


## 4. まとめ

### 開発の流れ

GitHub + Cloudflareの構成が整うと、以下のサイクルで開発が進みます：

1. Claude Codeにコードを書いてもらう
2. GitHubにpush（git push）するだけ
3. GitHub ActionsがD1マイグレーション → Pages/Pages Functionsを自動でデプロイ
4. ブラウザで動作確認
5. 修正があればまたClaude Codeに依頼 → push

> UIの調整もAPIの変更も、pushするだけで同時に反映されます。Pages + Pages Functionsはまとめて一度にデプロイされるのが強みです。

### ローカルで動作確認したい場合

本番にpushする前に手元で動かして確認したい場合や、D1のデータを直接操作したい場合は、ローカルPCにWranglerをインストールして使います。インストール方法や具体的な使い方は[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)を参照してください。

- Pages Functionsをローカルで動かして動作確認できる
- D1のデータを直接確認・操作できる

> ローカルからの手動デプロイにWranglerは使いません。デプロイはすべてGitHub Actionsが自動で行います。Wranglerは初期設定（D1の作成）や手元での確認・開発作業に使います。

### 次のステップへ

pushするだけで本番反映。初期設定・手元確認にはWrangler。GitHub ActionsとPages Functionsでシンプルに。この構成を理解したら、次は[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)で実際に手を動かしてみましょう。

---

2026-05-02 (last updated: 2026-05-02)　タツヲ ([yto](https://x.com/yto))

