# 04_cognito

## 概要

Cognitoの構築。

---

## 環境変数設定

basic認証用のユーザーとパスワードをここで設定する。

```bash
SYSTEM_CODE=  # Your system code or name (e.g., alice, bob, charlie)
SYSTEM_ENV=   # Your system environment (e.g., dev, stg, prd, 000, 111)

```

---

## 41_cognito

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-cognito --template-body file://template/04_cognito/41_cognito.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV --region us-east-1
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-cognito --region us-east-1

```
