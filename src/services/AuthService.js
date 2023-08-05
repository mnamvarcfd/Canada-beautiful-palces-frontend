import { Amplify } from "aws-amplify";
import { config } from "./config";
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

class AuthService {

    async getAWSTempCred(user) {
        const cognitoIdentityPool = "cognito-idp." + config.REGION + ".amazonaws.com/" + config.USER_POOL_ID;
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

        await this.refreshAWSCredentials();
    }

    async refreshAWSCredentials() {
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
}

export default AuthService;
