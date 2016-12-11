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
    .state('Login', {
      url: '/login',
      controller: 'LoginController as vm',
      templateUrl: 'login.html',
      title: 'Login'
    })
    .state('Test', {
      url: '/test',
      controller: 'TestController as test',
      templateUrl: 'test.html',
      title: 'Test'
    })
    .state('Development', {
      url: '/development',
      controller: 'DevelopmentController as development',
      templateUrl: 'development.html',
      title: 'Development'
    })
    .state('Developments', {
      url: '/developments',
      controller: 'DevelopmentsController as vm',
      templateUrl: 'developments.html',
      title: 'Developments'
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
