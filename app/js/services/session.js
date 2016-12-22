function SessionService() {
  'ngInject';

   const service = {};

  service.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };

  service.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };

  return service;

}

export default {
  name: 'SessionService',
  fn: SessionService
};
