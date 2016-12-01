import { argv } from 'yargs';
import { SeedConfig } from './seed.config';

export class SeedAdvancedConfig extends SeedConfig {

  constructor() {
    super();

    // Override seed defaults
    this.BOOTSTRAP_DIR = argv['app'] ? (argv['app'] + '/') : '';

    this.APP_TITLE = 'PMSS WebApp';
    this.APP_BASE = ''; // paths must remain relative

    /** Development **/

    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES
    ];

    // Fix up package configuration for libs and @ngrx
    this.SYSTEM_CONFIG['packageConfigPaths'] = [
      `${this.APP_BASE}node_modules/*/package.json`
    ];

    // Fix up paths for libs
    this.SYSTEM_CONFIG.paths[this.BOOTSTRAP_MODULE] = `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`;
    this.SYSTEM_CONFIG.paths['lodash'] = `${this.APP_BASE}node_modules/lodash/index`;

    /** Production **/
    delete this.SYSTEM_BUILDER_CONFIG['packageConfigPaths']; // not all libs are distributed the same

    this.SYSTEM_BUILDER_CONFIG.paths['lodash'] = `node_modules/lodash/index.js`;
  }
}
