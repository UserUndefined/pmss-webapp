function AuthService(SessionService, AppSettings, $rootScope, jwtHelper) {
  'ngInject';

  const poolData = {
    UserPoolId: AppSettings.IDENTITY.userPoolId,
    ClientId: AppSettings.IDENTITY.clientId
  };

  var cognitoUser;

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

    const userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        const token = result.idToken.jwtToken;
        SessionService.create(token, username, 'admin');
        localStorage.setItem('pmssUser', JSON.stringify(SessionService.getUser()));
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
        AWS.config.region = AppSettings.IDENTITY.awsRegion;
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: AppSettings.IDENTITY.awsRegion + ':' + AppSettings.IDENTITY.identityPoolId,
          Logins: {'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_5MHtkIKtT': result.getIdToken().getJwtToken()}
        });
        return callback(null, '');
      },
      onFailure: function (err) {
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
        return callback(err);
      }
    });
  };

  service.refresh = function(callback) {
    AWS.config.credentials.refresh(function(error, session) {
      if (error) {
        console.error(error);
        return callback(error);
      } else {
        console.log('Successfully logged!');
        console.log(session);
        return callback(null, session);
      }
    });
/*
    cognitoUser.refreshSession('eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.vC842Gw7AdJJtfQkJlm6z9NyHguZsRLPFS8IkR4y895cye88ywL1q9CUP11Li3DfAwEWBEKfNXU0zUIOKrJmuxLgSdByAlHgb9TMtOJkFwheN-XxXDSLim77UdUhImLdtyW41hlPKLUgTTmsmVnT2xuUSsNwp91SFFUh5iBMYVDCHbimRSwjB7QtOrAaL599-6ecfod1KYfsRU2-B3OF5ycb9X7-sBtP91jhLBLWXzZvBrmQOnkTomNxrjRBky4IqlSln1fKtbipSpPf_ntRzaWCLRQDwVH8z2WbB2fMBXxoz-jhrgMT5vykCxR63L37fqTtG_e7vcig9QRsl1DTkQ.rYcWKCIKpNSAWZOQ.i3n8ZiZutQ3wS3TfVa_lAvGftrIso0uH1BdcPWXmdibPRXYqruRgfti6xkvSTNNbP_U57mTMkmBPd2_DR_HuRw9uX0mBFClVayTbcQWrMraHIHBrZQp_6Hy3tNAxbJNSlA3m2ZsUQs1TWFfeSRR9xIaPYu8bkCOcYxWG5jAEbdwL7dblaosNMraAcF-uWQfzA2dUuKNlVtIVR48VVzvXBJbePxNElGxxu-lJAp4TZd_s0FcYP_1ZMk3kSoEzkV_RcXMrr2O_wKF0IBgn3Jz-1X33jj-msReUXRgAKcnIkGdqakXNlwX0_-z0GiEjFilVDNKDGCKypWbP7Re4iAXZ1YJjx2HcUBiqpMkiiBTUlXrbNysO128j7OgZz5PKx9wR0GzpGGJGO99m7053u1gQIbv96CXDwxu4SLc5nXKDqppHn6WBfF6n7bJHcfdhwzQ9RW_YWyIW9n9O-TAnIz1Unb-GP0Cf9-qlu_uajdaMRwABSvJcHnBov-dB1ztZp3BqILj3wTzkc5neD-5I5CGY39PRFl7FOy6EcQukAttCDEijxlU2_CkJK8WjoD4KzqHSRCYv2erEClC8YgeFTqZJ8_X84zahrNI1WFccWpBeSvPPJZ9qVXfp5piZVOqhJdBk3WNtsr7zGuoQP7zqsIW9Go-V9E6ZXYYQnDCLNUs4Od9k33Kzl-eIRvcJwamH5T6wgQeNLdXlH-ZAobZxzDdQqp2M5A6QOeCsk_QXK5BNqDDgREeoEsMjLz1f8XfHC3NWG8HESDvPDycxJjAf4AHqFIipTZdCNLpjC9aq4e-yhpjXcJDIFnTOeRCAJ2D1fzexb6LmJ_aN10DzIjMs9zI1ry1XQ7Xtr4GNr4VWDA1HLfp32-imeH3FyE-I0bTQSlS9m_TwdK6AD_-8LmlFze9Wxw86mE_6INQUgLqCAPpj_AG8jud3TjhOTVTlpe4dL1Gy7vgDz_IM4R5EqzRER2yxleNBrVIBn-Nr7sUhlAvZ3dlz38fPUY6caTfYKCeRqFGTqFD2Xxlozspmx3S0JDj1ZBv6XxrpnfIhU4iT6hzGYRhGGRvH6fNzjTfRPfuOrTmOKaGj-bb0eAB3oeGVoeY-8hqKnb9-MdzkTF9NWSVwERLR0nQ6l9yxL59a_f9P5WYd6oL-FsTT.GBCLS_gWS1A9GLERd82-kw', function(err, session) {
      if (err) {
        console.error(err);
        return;
      }
      console.log(session);
      console.log(tokens);
    });
*/
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
