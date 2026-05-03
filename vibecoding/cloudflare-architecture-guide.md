# Cloudflareで「みんなで使える」Webアプリを作るための基礎知識

<p class="subtitle">Pages + Pages Functions + D1 構成ガイド</p>

チャット機能やランキング機能など、「データを保存・共有する」Webアプリを個人で作りたい場合、ネット上にデータベースが必要になります。友達や同僚みんなが使えるWebアプリには、誰かが入力したデータをサーバー側で保存し、ほかの人からも見られるような仕組みが欠かせないからです。

この文書では、そのようなWebアプリを個人・小規模で作るためにおすすめの構成を紹介します。構成の全体像と、それぞれの役割を理解することが目的です。実際の設定手順や導入方法は、別途[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)で説明します。

この文書を読む前に、[GitHub初心者ガイド](github-guide-first-step.html)と[Cloudflare Pagesハンズオン](claude-code-web-app-cloudflare-pages.html)を読んでおくことをおすすめします。


## 1. 推奨構成：Pages + Pages Functions + D1

Pages・Pages Functions・D1はいずれもCloudflareのサービスです。この3つの組み合わせが、個人・小規模でDBを使うWebアプリを作るのにシンプルで扱いやすい構成です。

### 3つの役割

Webアプリは「フロントエンド」「バックエンド」「データベース」の3つの役割に分けて作るのが基本です。レストランに例えるとわかりやすいです。

<a href="images/cf-arc-restaurant.jpg" target="_blank"><img src="images/cf-arc-restaurant.jpg" alt="cf-arc-restaurant.jpg" width="400"></a>

| レストランの例 | Webアプリの役割 | Cloudflareのサービス |
|---|---|---|
| 客席・メニュー・フロアスタッフ（お客さんが見て触り、注文を仲介する） | フロントエンド（画面・UI） | Cloudflare Pages |
| キッチン・料理人（注文を受けて料理を作る） | 内部API（バックエンド相当） | Cloudflare Pages Functions |
| 冷蔵庫・食材庫（材料を保管する場所） | データベース（データ保存） | Cloudflare D1 |

お客さん（ユーザー）はフロアスタッフ（フロントエンド）を通じて注文します。注文は料理人（バックエンド）が受け取り、冷蔵庫（データベース）から必要な食材（データ）を取り出して料理を作ります。できあがった料理はフロアスタッフによってお客さんに届けられます。お客さんが冷蔵庫を直接触ることはありません——これがセキュリティと役割分担を実現している設計です。

> Pages Functionsは「バックエンド的な役割」を担いますが、独立したサーバーが別に存在するわけではありません。Pages（フロントエンド）の中に処理が同居しているイメージです。フロントとAPIが一体化しているのがこの構成の特徴です。ワンオペ営業の小規模飲食店のようなものです。

### 処理の流れ

ブラウザからのアクセスは以下の順番で処理されます：

1. ユーザーがブラウザでURLにアクセス
2. Cloudflare PagesがHTML/CSS/JSを返す（画面表示）
3. 画面からAPIリクエストがCloudflare Pages Functionsへ送られる
4. Cloudflare Pages FunctionsがD1データベースを参照・更新して結果を返す



## 2. 自動デプロイの仕組み：GitHub Actions

GitHubへpushするだけで、データベースの更新（D1マイグレーション）からフロントエンド・Pages Functionsのデプロイ（本番環境への公開・反映）までが自動で実行されます。3つの役割をまとめて一度に本番反映できるのが、この構成の大きな利点です。


## 3. セットアップと開発に使うツール：Wrangler

WranglerはCloudflareが公式に提供するCLIツール（コマンドラインツール）です。Pages Functions・D1・Pagesすべてに対応しており、ターミナルからコマンドを打って操作します。Cloudflare専用のツールで、AWS CLI（Amazon）やFirebase CLI（Google）と同じ位置づけです。

Wranglerはプロジェクトの最初から使います。セットアップ時にはCloudflareへのログインと、D1データベースの作成に使います。開発中は、ローカルでWebアプリの動作を確認したり、データベースを直接操作するときなどに利用します。


## 4. 開発の流れ

GitHub + Cloudflareの構成が整うと、以下のサイクルで開発が進みます：

1. Claude Codeにコードを書いてもらう
2. ローカルで動作確認する（任意）
3. GitHubにpush
4. GitHub Actionsが自動でデプロイ
5. 本番環境（`https://アプリ名.pages.dev`）で動作確認
6. 修正があればまたClaude Codeに依頼 → push

この流れを理解したら、次は[ハンズオン資料](claude-code-web-app-cloudflare-d1.html)で実際に手を動かしてみましょう。

---

2026-05-02 (last updated: 2026-05-03)　タツヲ ([yto](https://x.com/yto))

