const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');
const { Authenticator } = require('cognito-at-edge');
const ssm = new SSMClient();

const systemCode = process.env.SYSTEM_CODE;
const systemEnv = process.env.SYSTEM_ENV;

async function getParameter(name, decrypt = true) {
  const command = new GetParameterCommand({
    Name: name,
    WithDecryption: decrypt,
  });

  const result = await ssm.send(command);
  return result.Parameter.Value;
}

exports.handler = async (request) => {
  const region = await getParameter(`param-${systemCode}-${systemEnv}-region`);
  const userPoolId = await getParameter(`param-${systemCode}-${systemEnv}-user-pool-id`);
  const userPoolAppId = await getParameter(`param-${systemCode}-${systemEnv}-user-pool-app-id`);
  const userPoolDomain = await getParameter(`param-${systemCode}-${systemEnv}-user-pool-domain`);

  const authenticator = new Authenticator({
    region,
    userPoolId,
    userPoolAppId,
    userPoolDomain,
    cookiePath: '/',
  });

  return authenticator.handle(request);
};