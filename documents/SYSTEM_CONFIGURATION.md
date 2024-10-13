## システム構成
AWS環境にて実装を行う 

※ただしコストによっては代替サービスの利用を検討
※本来ならNGだがコスト抑止のためpublicセグに実装する
1. システム構成は以下の通り。
  - コード管理は githubで行う
  - フロントエンドは、amplifyを利用
  - バックエンドは、fargateを採用してexpressサーバを起動
  - データベースはaurora(postgres)を採用

![](system.svg)
