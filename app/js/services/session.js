function SessionService() {
  'ngInject';

   const service = {};

  service.create = function (sessionId, userName, userRole) {
    this.sessionId = sessionId;
    this.userName = userName;
    this.userRole = userRole;
  };

  service.destroy = function () {
    this.sessionId = null;
    this.userName = null;
    this.userRole = null;
  };

  service.getUser = function () {
    return {
      sessionId: this.sessionId,
      userName: this.userName,
      userRole: this.userRole
    }
  };

  return service;

}

export default {
  name: 'SessionService',
  fn: SessionService
};
