# 001_dns

## 概要

GitHub接続のリソースを構築する。

## 構築リソース

 - Route53::HostedZone
 - CertificateManager::Certificate

## 構築コマンド

### 環境変数設定

構築用の環境変数を設定

```bash
export CustomParameter001=# custom001
export DomainName=# YOUR_DOMAIN_NAME

```

### CloudFormtion実行

#### hostzone

```bash
aws cloudformation create-stack \
    --stack-name ${CustomParameter001}-hostzone \
    --template-body file://001_dns/010_hostzone.yml \
    --parameters ParameterKey=DomainName,ParameterValue=$DomainName \
                 ParameterKey=CustomParameter001,ParameterValue=$CustomParameter001

```

#### acm

```bash
aws cloudformation create-stack \
    --stack-name ${CustomParameter001}-acm \
    --template-body file://001_dns/020_acm.yml \
    --parameters ParameterKey=DomainName,ParameterValue=$DomainName \
                 ParameterKey=CustomParameter001,ParameterValue=$CustomParameter001

```
