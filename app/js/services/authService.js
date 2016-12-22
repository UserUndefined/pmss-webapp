function AuthService() {
  'ngInject';

  const poolData = {
    UserPoolId: 'eu-west-1_5MHtkIKtT',
    ClientId: '2mg368usdh6ql5463cqtoratfp'
  };
  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  var userData = {
    Username: 'testUser',
    Pool: userPool
  };
  AWSCognito.config.region = 'eu-west-1';
  // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
  AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});
  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  const service = {};

  service.login = function(username, password, callback) {
    console.log('login called');
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log('idToken + ' + result.idToken.jwtToken);
        const token = result.idToken.jwtToken;
        localStorage.setItem('token', token);
        return callback(null, '');
      },

      onFailure: function (err) {
        alert(err);
        return callback(err);
      }
    });
  };

  service.logout = function() {
    localStorage.removeItem('token');
  };

  service.hasValidToken = function() {
    const userToken = localStorage.getItem('token');
    if (!userToken) {
      return false;
    } else {
      //return !jwtHelper.isTokenExpired(userToken);
      return true;
    }
  };

  service.getUserFromToken = function() {
    let token = localStorage.getItem('token');
    let user = {};
    if (typeof token !== 'undefined') {
      user = 'testUser';
    }
    return user;
  };

  return service;

}

export default {
  name: 'AuthService',
  fn: AuthService
};
