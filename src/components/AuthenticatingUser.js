import { Amplify, Auth } from "aws-amplify";
import { config } from "../services/config";
import * as AWS from 'aws-sdk';

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.REGION,
        userPoolId: config.USER_POOL_ID,
        userPoolWebClientId: config.APP_CLIENT_ID,
        authenticationFlowType: 'USER_PASSWORD_AUTH',
        identityPoolId: config.IDENTITY_POOL_ID
    }
});

export const AuthenticatingUser = async (username, password) => {

  console.log(username, password);

  try {
    const user = await Auth.signIn(username, password)

  
    console.log('AuthenticatingUser:', user);
    console.log('AuthenticatingUser:', user.getUsername());
    return {
      cognitoUser: user,
      username: user.getUsername(),
    };

  } catch (error) {
    console.log('Error signing in:', error);
    return null;
  }
};



export const getAWSTempCred = async (user) => {
  const cognitoIdentityPool = "cognito-idp." + config.REGION + ".amazonaws.com/" + config.USER_POOL_ID;
  
  console.log('getAWSTempCred:', user);
  AWS.config.credentials = new AWS.CognitoIdentityCredentials(
      {
          IdentityPoolId: config.IDENTITY_POOL_ID,
          Logins: {
              [cognitoIdentityPool]: user.getSignInUserSession().getIdToken().getJwtToken()
          },
      },
      {
          region: config.REGION
      }
  );

  await refreshAWSCredentials();
}

const refreshAWSCredentials = async () => {
  return new Promise((resolve, reject) => {
      AWS.config.credentials.refresh((err) => {
          if (err) {
              reject(err);
          } else {
              resolve();
          }
      });
  });
}


export default AuthenticatingUser;
