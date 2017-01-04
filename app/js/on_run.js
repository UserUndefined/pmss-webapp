function OnRun($rootScope, AppSettings, $location, AuthService) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

  $rootScope.$on('$locationChangeStart', function () {
    // redirect to login page if not logged in
    //var restrictedPage = $location.path() !== '/login';
    var restrictedPage = $location.path() !== '/testpage';
    const userAuthenticated = AuthService.isAuthenticated();
    if (restrictedPage && !userAuthenticated) {
      $location.path('/login');
    } else if (!restrictedPage && userAuthenticated){
      $location.path('/');
    }
  });
/*
 $rootScope.$on('$stateChangeStart', function (event, next) {
 var authorizedRoles = next.data.authorizedRoles;
 if (!AuthService.isAuthorized(authorizedRoles)) {
 event.preventDefault();
 if (AuthService.isAuthenticated()) {
 // user is not allowed
 $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
 } else {
 // user is not logged in
 $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
 }
 }
 });
 */
}

export default OnRun;
