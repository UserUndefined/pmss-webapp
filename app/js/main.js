import angular from 'angular';
require ('angular-jwt');
require ('angular-animate');
require ('angular-aria');
require ('angular-material');
require ('angularjs-toaster');
require ('aws-sdk');
require ('angular-material-data-table');

// angular modules
import constants from './constants';
import onConfig  from './on_config';
import onRun     from './on_run';
import 'angular-ui-router';
import 'ngstorage';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

// create and bootstrap application
const requires = [
  'ui.router',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives',
  'ngStorage',
  'angular-jwt',
  'toaster',
  'ngMaterial',
  'md.data.table'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(onConfig);

angular.module('app').run(onRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});
