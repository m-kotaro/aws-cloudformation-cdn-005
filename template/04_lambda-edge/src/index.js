const { Authenticator } = require('cognito-at-edge');

const authenticator = new Authenticator({
  // Replace these parameter values with those of your own environment
  region: 'us-east-1', // user pool region
  userPoolId: '{{CognitoUserPoolId}}', // user pool ID
  userPoolAppId: '{{CognitoUserPoolAppId}}', // user pool app client ID
  userPoolDomain: '{{CognitoUserPoolDomain}}', // user pool domain
  cookiePath: '/',
});

exports.handler = async (request) => authenticator.handle(request);
