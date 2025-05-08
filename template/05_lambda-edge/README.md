# 05_lambda-edge

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

## 05_lambda-edge

### CloudFormation実行

```bash
aws cloudformation create-stack --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-lambda-edge --template-body file://template/05_lambda-edge/05_lambda-edge.yml --parameters ParameterKey=SystemCode,ParameterValue=$SYSTEM_CODE ParameterKey=SystemEnv,ParameterValue=$SYSTEM_ENV --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM --region us-east-1
aws cloudformation wait stack-create-complete --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-lambda-edge --region us-east-1

```

### Lambda edge デプロイ

Lambda@Edgeをデプロイします

#### ディレクトリ移動

```bash
cd template/05_lambda-edge/src

```

#### コード置換

```bash
export COGNITO_OUTPUTS=$(aws cloudformation describe-stacks --stack-name stack-$SYSTEM_CODE-$SYSTEM_ENV-cognito --query "Stacks[0].Outputs" --output json --region us-east-1)

export COGNITO_USER_POOL_ID=$(echo "$COGNITO_OUTPUTS" | jq -r '.[] | select(.OutputKey=="CognitoUserPoolId") | .OutputValue')
export COGNITO_USER_POOL_APP_ID=$(echo "$COGNITO_OUTPUTS" | jq -r '.[] | select(.OutputKey=="CognitoUserPoolAppId") | .OutputValue')
export COGNITO_USER_POOL_DOMAIN=$(echo "$COGNITO_OUTPUTS" | jq -r '.[] | select(.OutputKey=="CognitoUserPoolDomain") | .OutputValue')

# コードを置換
sed -i \
 -e "s|{{CognitoUserPoolId}}|${COGNITO_USER_POOL_ID}|g" \
 -e "s|{{CognitoUserPoolAppId}}|${COGNITO_USER_POOL_APP_ID}|g" \
 -e "s|{{CognitoUserPoolDomain}}|${COGNITO_USER_POOL_DOMAIN}|g" \
./index.js

```

#### コードzip化

```bash
npm install cognito-at-edge
zip -r ../cognito-at-edge.zip ./*

```

#### ファイルアップロード

```bash
aws lambda update-function-code --function-name lmd-$SYSTEM_CODE-$SYSTEM_ENV-auth --zip-file fileb://cognito-at-edge.zip --region us-east-1

```

#### Lambdaバージョン発行

```bash
export LAMBDA_ARN=$(aws lambda publish-version --function-name lmd-$SYSTEM_CODE-$SYSTEM_ENV-auth --region us-east-1 --query 'FunctionArn' --output text)

```

#### CloudFront更新

```bash
aws cloudfront get-distribution-config --id $(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='cloudfront-${SYSTEM_CODE}-${SYSTEM_ENV}'].Id" --output text) > config.json

```

#### CloudFront新設定値作成　

```bash
export ETAG=$(jq -r '.ETag' config.json)
jq --arg arn "$LAMBDA_ARN" '
  .DistributionConfig
  | .DefaultCacheBehavior.LambdaFunctionAssociations = {
      Quantity: 1,
      Items: [
        {
          EventType: "viewer-request",
          IncludeBody: false,
          LambdaFunctionARN: $arn
        }
      ]
    }
' config.json > updated-config.json
```

#### CloudFront設定更新

```bash
aws cloudfront update-distribution --id $(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='cloudfront-${SYSTEM_CODE}-${SYSTEM_ENV}'].Id" --output text) --if-match "$ETAG" --distribution-config file://updated-config.json

```