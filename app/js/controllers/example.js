function ExampleCtrl(AuthService, $scope) {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.title = 'AngularJS, Gulp, and Browserify! Written with keyboards and love!';
  vm.number = 1234;

  $scope.refresh = function(){
    AuthService.refresh(function(err){
      if(err){
        console.log(err);
      } else {
        console.log('it worked!');
      }
    });
  }

  $scope.refreshSession = function(){
    AuthService.refreshSession(function(err){
      if(err){
        console.log(err);
      } else {
        console.log('it worked!');
      }
    });
  }

  $scope.getSession = function(){
    AuthService.getSession(function(err){
      if(err){
        console.log(err);
      } else {
        console.log('it worked!');
      }
    });
  }

}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
