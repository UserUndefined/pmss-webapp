function UsersController() {
  'ngInject';

  // ViewModel
  var vm = this;

  function initialise(){
    vm.users = [];
  }

  initialise();
}

export default {
  name: 'UsersController',
  fn: UsersController
};
