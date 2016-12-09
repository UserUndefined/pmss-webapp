function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'ExampleCtrl as home',
      templateUrl: 'home.html',
      title: 'Home'
    })
    .state('Test', {
      url: '/test',
      controller: 'TestController as test',
      templateUrl: 'test.html',
      title: 'Test'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
