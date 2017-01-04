describe('Unit: ApplicationController', function() {

  let ctrl;
  let scope;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(($controller, $rootScope) => {
      scope = $rootScope.$new();
      ctrl = $controller('ApplicationController', {$scope: scope});
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

});
