import AWS from 'aws-sdk'
import * as dotenv from 'dotenv'
dotenv.config()

import { str, envsafe } from 'envsafe';


const ENV = envsafe({
  AWS_ACCESS_KEY_ID: str(),
  AWS_SECRET_ACCESS_KEY: str(),
  AWS_COGNITO_USER_POOL_ID: str(),
  AWS_COGNITO_REGION: str(),
})

const accessKeyId = ENV.AWS_ACCESS_KEY_ID
const secretAccessKey = ENV.AWS_SECRET_ACCESS_KEY
const userPoolId = ENV.AWS_COGNITO_USER_POOL_ID
const cognitoRegion = ENV.AWS_COGNITO_REGION

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: cognitoRegion
})


const cognito = new AWS.CognitoIdentityServiceProvider({
	// apiVersion: '2016-06-18'
});


(async() => {
	try {
		const users = await cognito.adminGetUser({
      UserPoolId: userPoolId,
      Username: '' // Input registered user name here. 
		}).promise();
		console.log(JSON.stringify(users, null, 4));
	}
	catch (err: unknown) {
    if(!(err instanceof Error)) return
    console.log(err);
	}
})();
