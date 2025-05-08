# 01_s3

## 概要

S3の構築。

---

## 環境変数設定

```bash
SYSTEM_CODE=  # Your system code or name (e.g., alice, bob, charlie)
SYSTEM_ENV=   # Your system environment (e.g., dev, stg, prd, 000, 111)

```

---

## 11_s3

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-s3 --template-body file://template/01_s3/11_s3.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-s3

```
