function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, $compileProvider, AppSettings) {
  'ngInject';

  if (process.env.NODE_ENV === 'production') {
    $compileProvider.debugInfoEnabled(false);
  }

  //$locationProvider.html5Mode({
  //  enabled: true,
  //  requireBase: false
  //});

  $stateProvider
    .state('Home', {
      url: '/',
      controller: 'ExampleCtrl as home',
      templateUrl: 'home.html',
      title: 'Home',
      data: {
        authorizedRoles: [AppSettings.USER_ROLES.admin, AppSettings.USER_ROLES.all]
      }
    })
    .state('Test', {
      url: '/test',
      controller: 'TestController as test',
      templateUrl: 'test.html',
      title: 'Test',
      data: {
        authorizedRoles: [AppSettings.USER_ROLES.admin, AppSettings.USER_ROLES.all]
      }
    })
    .state('Development', {
      url: '/development',
      controller: 'DevelopmentController as development',
      templateUrl: 'development.html',
      title: 'Development',
      data: {
        authorizedRoles: [AppSettings.USER_ROLES.admin, AppSettings.USER_ROLES.all]
      }
    })
    .state('Developments', {
      url: '/developments',
      controller: 'DevelopmentsController as vm',
      templateUrl: 'developments.html',
      title: 'Developments',
      data: {
        authorizedRoles: [AppSettings.USER_ROLES.admin, AppSettings.USER_ROLES.all]
      }
    });

  $urlRouterProvider.otherwise('/');

}

export default OnConfig;
