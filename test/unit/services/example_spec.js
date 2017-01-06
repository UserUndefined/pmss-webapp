describe('Unit: ExampleService', function() {

  let service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject((ExampleService) => {
      service = ExampleService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });
});
