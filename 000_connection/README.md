# 000_connection

## 概要

GitHub接続のリソースを構築する。

## 構築リソース

 - CodeStarConnections::Connection


## 構築コマンド

### 環境変数設定

構築用の環境変数を設定

```bash
export CustomParameter001=# custom001

```

```bash
aws cloudformation create-stack \
    --stack-name ${CustomParameter001}-github-connection \
    --template-body file://000_connection/000_github-connection.yml \
    --parameters ParameterKey=CustomParameter001,ParameterValue=$CustomParameter001

```

