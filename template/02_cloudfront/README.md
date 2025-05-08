# 02_cloudfront

## 概要

CDNの構築。

---

## 環境変数設定

basic認証用のユーザーとパスワードをここで設定する。

```bash
SYSTEM_CODE=  # Your system code or name (e.g., alice, bob, charlie)
SYSTEM_ENV=   # Your system environment (e.g., dev, stg, prd, 000, 111)

```

---

## 21_cloudfront

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-cloudfront --template-body file://template/02_cloudfront/21_cloudfront.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-east-1
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-cloudfront --region us-east-1

```
