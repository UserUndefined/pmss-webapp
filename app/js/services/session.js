function SessionService(jwtHelper) {
  'ngInject';

   const service = {};

  service.create = function (accessToken, idToken, refreshToken) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    const username = getUsername(idToken);
    this.userName = username;
    const role = getRole(idToken);
    this.userRole = role;
  };

  service.destroy = function () {
    this.accessToken = null;
    this.idToken = null;
    this.refreshToken = null;
    this.userName = null;
    this.userRole = null;
  };

  service.getUser = function () {
    return {
      accessToken: this.accessToken,
      idToken: this.idToken,
      refreshToken: this.refreshToken,
      userName: this.userName,
      userRole: this.userRole
    }
  };

  service.isValid = function () {
    return !!(this.userName && this.userName !== '');
  };

  function getRole(token){
    var role = '';
    const tokenPayload = jwtHelper.decodeToken(token);
    if (tokenPayload['cognito:groups'] && tokenPayload['cognito:groups'].length > 0){
      role = tokenPayload['cognito:groups'][0];
    }
    return role;
  }

  function getUsername(token){
    var username = '';
    const tokenPayload = jwtHelper.decodeToken(token);
    if (tokenPayload['cognito:username']){
      username = tokenPayload['cognito:username'];
    }
    return username;
  }

  return service;

}

export default {
  name: 'SessionService',
  fn: SessionService
};
