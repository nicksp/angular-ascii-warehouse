import angular from 'angular';

// Config modules
import constants from './app.constants';
import config from './app.config';

// Core modules
import asciiShopAds from './ads/ads.module';
import asciiShopUtils from './utils/utils.module';
import asciiShopWarehouse from './warehouse/warehouse.module';

// Create and bootstrap application
const requires = [
  asciiShopUtils,
  asciiShopAds,
  asciiShopWarehouse
];

angular.module('asciiShop', requires);

angular.module('asciiShop')
  .constant('AppSettings', constants)
  .config(['$locationProvider', config]);
