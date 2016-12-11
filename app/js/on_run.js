//function OnRun($rootScope, AppSettings, $location) {
function OnRun($rootScope, AppSettings) {
  'ngInject';

  //$rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in
    //var restrictedPage = $location.path() !== '/login';
    //var loggedIn = authService.hasValidToken();
    //if (restrictedPage && !loggedIn) {
    //  $location.path('/login');
    //} else if (!restrictedPage && loggedIn){
    //  $location.path('/');
    //}
  //});

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

}

export default OnRun;
