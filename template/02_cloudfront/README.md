# 04_cloudfront

## 概要

CDNの構築。

---

## 環境変数設定

basic認証用のユーザーとパスワードをここで設定する。

```bash
SYSTEM_ENV=  # Your system environment (e.g., dev, stg, prd, 000, 111)
USER=        # Your credential user (e.g., admin@example.com)
PASSWORD=    # Your credential password (e.g., P@ssw0rd123)
```

---

## 41_cloudfront

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-email-uploader-$SYSTEM_ENV-cloudfront --template-body file://template/04_cloudfront/41_cloudfront.yml --parameters ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV ParameterKey=User,ParameterValue=$USER ParameterKey=Password,ParameterValue=$PASSWORD --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-east-1
aws cloudformation wait stack-create-complete --stack-name stack-email-uploader-$SYSTEM_ENV-cloudfront

```
