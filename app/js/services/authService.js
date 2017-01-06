function AuthService(SessionService, AppSettings, $rootScope, jwtHelper) {
  'ngInject';

  const poolData = {
    UserPoolId: AppSettings.IDENTITY.poolId,
    ClientId: AppSettings.IDENTITY.clientId
  };

  //var cognito = new AWS.CognitoIdentityServiceProvider();
  //cognito.config.region = AppSettings.IDENTITY.awsRegion;
  //cognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

  AWSCognito.config.region = AppSettings.IDENTITY.awsRegion;
  // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
  AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});

  const service = {};

  service.login = function(username, password, callback) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);
    //cognito.AuthenticationDetails = authenticationData;

    const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    //const userPool = new AWSCognitoIdentityService  .CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    //const cognitoUser = new cognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const token = result.idToken.jwtToken;
        SessionService.create(token, username, 'admin');
        localStorage.setItem('pmssUser', JSON.stringify(SessionService.getUser()));
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
        return callback(null, '');
      },
      onFailure: function (err) {
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
        return callback(err);
      }
    });
  };

  service.logout = function() {
    localStorage.removeItem('pmssUser');
    SessionService.destroy();
    $rootScope.$broadcast(AppSettings.AUTH_EVENTS.notAuthenticated);
  };

  service.hasValidToken = function() {
    const sessionId = SessionService.sessionId;
    if (!sessionId) {
      return false;
    } else {
      var tokenExpired = true;
      try{
        tokenExpired = !jwtHelper.isTokenExpired(sessionId);
      } catch(err) {
        this.logout();
      }
      return tokenExpired;
    }
  };

  service.isAuthenticated = function () {
    return this.hasValidToken();
  };

  service.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (this.isAuthenticated() && authorizedRoles.indexOf(SessionService.userRole) !== -1);
  };

  service.setCurrentUser = function() {
    let user = JSON.parse(localStorage.getItem('pmssUser'));
    if (!user) {
      SessionService.create('', '', '');
    } else {
      SessionService.create(user.sessionId, user.userName, 'admin');
    }
  };

  return service;

}

export default {
  name: 'AuthService',
  fn: AuthService
};
