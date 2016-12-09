import angular from 'angular';

const bulk = require('bulk-require');
const factoriesModule = angular.module('app.factories', []);
const factories = bulk(__dirname, ['./**/!(*index|*.spec).js']);

function declare(factoryMap) {
  Object.keys(factoryMap).forEach((key) => {
    let item = factoryMap[key];

    if (!item) {
      return;
    }

    if (item.fn && typeof item.fn === 'function') {
      factoriesModule.factory(item.name, item.fn);
    } else {
      declare(item);
    }
  });
}

declare(factories);

export default factoriesModule;
