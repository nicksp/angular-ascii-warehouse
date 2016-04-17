import WarehouseContentCtrl from './warehouse-content.controller';

const warehouseContent = {
  templateUrl: 'app/warehouse/content/content.html',
  controller: ['productsService', 'adsService', WarehouseContentCtrl],
  controllerAs: 'warehouseContent'
};

export default warehouseContent;
