describe('Unit: ExampleService', function() {

  let http, service;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    // mock the service
    angular.mock.inject(($httpBackend, ExampleService) => {
      http = $httpBackend;
      service = ExampleService;
    });
  });

  it('should exist', function() {
    expect(service).toBeDefined();
  });
});
