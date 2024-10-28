# 001_dns

## 概要

GitHub接続のリソースを構築する。

## 構築リソース

 - Route53::HostedZone
 - 

## 構築コマンド

### 環境変数設定

構築用の環境変数を設定

```bash
export CustomParameter001=# custom001
export GitHubOrganizationName=# YOUR_ORGANIZATION_NAME

```

### CloudFormtion実行

```bash
aws cloudformation create-stack \
    --stack-name ${CustomParameter001}-github-connection \
    --template-body file://001_dns/010_hostzone.yml \
    --parameters ParameterKey=CustomParameter001,ParameterValue=$CustomParameter001 \
                 ParameterKey=GitHubOrganizationName,ParameterValue=$GitHubOrganizationName

```
