function DataService($http, AppSettings) {
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
        'Authorization': 'eyJraWQiOiJVdkxrTUhwVTBTWGV6WmlVMTlKTmo4UHd1Y1ErU1JsVGsxXC84TGdoQlFTVT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhODVhNWYwNC1mZmQyLTRiOTktYTk3ZC05NzYyN2I5YWNkMzgiLCJhdWQiOiIybWczNjh1c2RoNnFsNTQ2M2NxdG9yYXRmcCIsImNvZ25pdG86Z3JvdXBzIjpbInBtc3NBZG1pbkdyb3VwIl0sImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTQ4MzMxNTU2NiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmV1LXdlc3QtMS5hbWF6b25hd3MuY29tXC9ldS13ZXN0LTFfNU1IdGtJS3RUIiwiY29nbml0bzp1c2VybmFtZSI6InRlc3RVc2VyIiwiZXhwIjoxNDgzMzE5MTY2LCJpYXQiOjE0ODMzMTU1NjcsImVtYWlsIjoiY3Jpc3Rvdi5pZ29yMkBnbWFpbC5jb20ifQ.LGc3kGfR6M77K-n0UDa4V6S5NoWbT6288cuRuICz5W3X6ArlNQJ3Vir2_MwNPAr4HfF3wZv9YVg-twT3P81GCtayxLX0H_lWAysF_SoyaXeilT9fbdzOSfydqDYLom54gt3GUbBPwAWlntKHaRa8uZ1tI8Gem0CcrBqun0V3XZuybqZoaRlGV2ueMHkmaCs8fp7hCO_lLIVuBNQ1imnrGnb46tpHA2dX7wNuNl1WQ1E5HiOYxpEBbvMCfuFAlqvQNG6vZCtXkSgU3esLTs_p189N-IJC8YRhkkwV7IWFHK6qBlgQJN6g0wXi69dJg4MMwQ9X5_bGsn5C1RxUSPoyBA'
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
