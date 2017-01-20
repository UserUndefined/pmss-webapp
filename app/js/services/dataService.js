function DataService($http, AppSettings, SessionService, AuthService) {
  'ngInject';

  const service = {};
  const BASE_URL = AppSettings.apiUrl;

  service.getDevelopments = function(callback) {
    AuthService.checkUserSession(function(err) {
      if (err) {
        return callback('Not authenticated');
      } else {
        return getRequest('', {}, callback);
      }
    });
  };

  function getRequest(url, params, callback) {
    let requestUrl = BASE_URL + '/' + url;
    angular.forEach(params, function(value, key){
      requestUrl = requestUrl + '&' + key + '=' + value;
    });
    $http({
      method: 'GET',
      url: requestUrl,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': SessionService.getUser().idToken
      },
      cache: false
    }).then(function (response) {
      return callback(null, response.data);
    }, function (response) {
      console.log(response);
      return callback(1);
    });
  }

  return service;

}

export default {
  name: 'DataService',
  fn: DataService
};
