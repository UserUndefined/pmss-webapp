function AuthService($localStorage) {
  'ngInject';

  const service = {};

  function urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw 'Illegal base64url string!';
    }
    return window.atob(output);
  }

  service.login = function(callback) {
    $localStorage.token = 'ABCDEFG12345';
    return callback(null, '');
    //return new Promise((resolve, reject) => {
      //$http.get('apiPath').success((data) => {
      //  resolve(data);
      //}).error((err, status) => {
      //  reject(err, status);
      //});
    //});
  };

  service.logout = function() {
    delete $localStorage.token;
    return;
  };

  service.getUserFromToken = function() {
    let token = $localStorage.token;
    let user = {};
    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];
      user = JSON.parse(urlBase64Decode(encoded));
    }
    return user;
  };

  return service;

}

export default {
  name: 'AuthService',
  fn: AuthService
};
