function DataService($http, AppSettings, SessionService) {
  'ngInject';

  const service = {};
  const BASE_URL = AppSettings.apiUrl;

  service.getDevelopments = function(callback) {
    return getRequest('', {}, callback);
  };

  function getRequest(url, params, callback) {
    let requestUrl = BASE_URL + '/' + url;
    angular.forEach(params, function(value, key){
      requestUrl = requestUrl + '&' + key + '=' + value;
    });
    $http({
      'url': requestUrl,
      'method': 'GET',
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': SessionService.getUser().sessionId
      },
      'cache': false
    }).then(function(response){
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
