# 03_cicd

## 概要

cicdの構築。

---

## 環境変数設定

CICDで実装するブランチ名とオーガニゼーションをここで設定する。

```bash
SYSTEM_CODE=        # Your system code or name (e.g., alice, bob, charlie)
SYSTEM_ENV=         # Your system environment (e.g., dev, stg, prd, 000, 111)
BRANCH_NAME=        # Your git branch name (e.g., main, develop, feature-xxx)
FULL_REPOSITORY_ID= # Your full GitHub repository ID (e.g., my-org/my-repo)
```

---

## 31_git-connection

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-git-connection --template-body file://template/03_cicd/31_git-connection.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-git-connection

```

### 接続更新

---

## 32_codebuild

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-codebuild --template-body file://template/03_cicd/32_codebuild.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$BRANCH_NAME --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-codebuild

```

---

## 33_codepipeline

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-codepipeline --template-body file://template/03_cicd/33_codepipeline.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV ParameterKey=BranchName,ParameterValue=$BRANCH_NAME ParameterKey=FullRepositoryId,ParameterValue=$FULL_REPOSITORY_ID --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-codepipeline

```
