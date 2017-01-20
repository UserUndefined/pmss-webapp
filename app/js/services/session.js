function SessionService() {
  'ngInject';

   const service = {};

  service.create = function (accessToken, idToken, refreshToken, userName, userRole) {
    this.accessToken = accessToken;
    this.idToken = idToken;
    this.refreshToken = refreshToken;
    this.userName = userName;
    this.userRole = userRole;
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

  return service;

}

export default {
  name: 'SessionService',
  fn: SessionService
};
