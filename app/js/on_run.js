function OnRun($rootScope, AppSettings, $location) {
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

  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in
    console.log(current);
    //var restrictedPage = $location.path() !== '/login';
    var restrictedPage = $location.path() !== '/testpage';
    const userToken = localStorage.getItem('token');
    if (restrictedPage && !userToken) {
      $location.path('/login');
    } else if (!restrictedPage && userToken){
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
