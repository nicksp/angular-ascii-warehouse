import angular from 'angular';

import productsService from './warehouse-products.service';

import warehouseContentHeader from './content/header/warehouse-content-header.component';
import warehouseContentStatus from './content/status/warehouse-content-status.component';
import warehouseContent from './content/warehouse-content.component';
import warehouseHeader from './header/warehouse-header.component';
import warehouseProduct from './product/warehouse-product.component';

export default angular
  .module('asciiShop.warehouse', [])
  .component('warehouseContentHeader', warehouseContentHeader)
  .component('warehouseContentStatus', warehouseContentStatus)
  .component('warehouseContent', warehouseContent)
  .component('warehouseHeader', warehouseHeader)
  .component('warehouseProduct', warehouseProduct)
  .factory('productsService', ['$http', 'Utils', 'AppSettings', productsService])
  .name;
