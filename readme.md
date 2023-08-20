# 概要

最低限の機能を備えたシンプルなチャットルームアプリのサンプルです。  
ChatGPTを活用して、工数を削減することを目的とした練習プロジェクトです。  
Clean Architectureに則って実装します。  

## Backend

* Typescript
* Firebase
  * Firebase Authorization
  * Firestore
  * Cloud Functions for Firebase

## setup

1. /.template.env をコピーしたファイル、/.envを作成します。
2. `REQUIRED_NODE_VERSION`、`REGION`に任意の値を記載します。

### server

1. firebaseコンソールから、新規プロジェクトを作成します。
2. 新規プロジェクトのIDを/.envの`PROJECT_ID_PRD`もしくは`PROJECT_ID_DEV`に記載します。
3. firebaseに新規ウェブアプリを登録します。
4. プロジェクトの設定 > サービスアカウント > 新しい秘密鍵を生成
5. /api/src/credential/${env}/serviceAccountKey.jsonに3で生成したファイルを置きます。

### auth

1. firebaseコンソールから、新規プロジェクトを作成します。
2. Authentication > Sign-in method
   1. メールとパスワードを選択します。
3. Templatesタブから送信元、テンプレート言語などを適宜変更します。

## infrastructure

1. credential
   1. gcpプロジェクト > IAMと管理 > サービスアカウント へ移動します。
   2. サービスアカウントを作成
      1. cdktf用であることがわかる名前にします。
      2. cloudRunとcloudStorageを管理できる権限を付与します。
   3. 作成したサービスアカウントをクリック > 詳細 > キー
   4. 鍵を追加 > 新しい鍵を作成 > キーのタイプ: json
   5. /gcp/credential/serviceAccountKey.jsonに生成したファイルを置きます。
2. state管理
   1. gcpプロジェクト > cloud storage
   2. バケットを作成
      1. ${projectID}-cdktf という名前のバケットを作成します。
3. APIの有効化
   1. Cloud Run API
   2. Cloud Storage API
   3. Container Registry API