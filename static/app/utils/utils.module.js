import angular from 'angular';

import Utils from './utils.service';
import money from './money.filter';
import timestamp from './timestamp.filter';
import infiniteScroll from './infinite-scroll/infinite-scroll.component';

export default angular
  .module('asciiShop.utils', [])
  .service('Utils', ['$timeout', Utils])
  .filter('money', money)
  .filter('timestamp', timestamp)
  .component('whenScrollEnds', infiniteScroll)
  .name;
