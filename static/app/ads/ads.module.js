import angular from 'angular';

import adsService from './ads.service';

export default angular
  .module('asciiShop.ads', [])
  .factory('adsService', ['$sce', 'Utils', 'AppSettings', adsService])
  .name;
