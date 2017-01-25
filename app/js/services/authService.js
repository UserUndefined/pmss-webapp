function AuthService(SessionService, AppSettings, $rootScope) {
  'ngInject';

  const service = {};
  var userPool;

  function initialise(){
    AWSCognito.config.region = AppSettings.IDENTITY.awsRegion;
    // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    AWSCognito.config.update({accessKeyId: 'anything', secretAccessKey: 'anything'});
    const poolData = {
      UserPoolId : AppSettings.IDENTITY.userPoolId,
      ClientId : AppSettings.IDENTITY.clientId
    };
    userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
  }

  service.login = function(username, password, callback) {
    const authenticationData = {
      Username: username,
      Password: password
    };
    const authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    var cognitoUser = getCognitoUser(username);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        SessionService.create(result.accessToken.jwtToken, result.idToken.jwtToken, result.refreshToken.token);
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
        return callback(null, '');
      },
      onFailure: function (err) {
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
        return callback(err);
      }
    });
  };

  service.checkUserSession = function(callback) {
    //Get the current user from local storage and and instantiate a cognitoUser
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      //If the user exists and not expired, then we can use cognitoUser.getSession to get the current session.
      cognitoUser.getSession(function(err, session) {
        if (err) {
          this.logout();
          return callback(err);
        }
        SessionService.create(session.accessToken.jwtToken, session.idToken.jwtToken, session.refreshToken.jwtToken);
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
        return callback(null);
      });
    } else {
      return callback('Invalid user session.');
    }
  };

  service.isAuthenticated = function(){
    return !!SessionService.userName;
  };

  function getCognitoUser(username) {
    var cognitoUser = null;
    const userData = {
      Username : username || SessionService.userName,
      Pool : userPool
    };
    try{
      cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    }
    catch(err){
      //unable to create a user from the session
      console.log(err);
    }
    return cognitoUser;
  };

  service.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authorizedRoles.indexOf(SessionService.userRole) !== -1);
  };

  service.logout = function() {
    let cognitoUser = userPool.getCurrentUser();
    if(cognitoUser != null) {
      cognitoUser.signOut();
    }
    SessionService.destroy();
    $rootScope.$broadcast(AppSettings.AUTH_EVENTS.logoutSuccess);
  };

  initialise();

  return service;

}

export default {
  name: 'AuthService',
  fn: AuthService
};
