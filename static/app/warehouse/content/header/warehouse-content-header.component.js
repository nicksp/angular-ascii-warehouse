const warehouseContentHeader = {
  templateUrl: 'app/warehouse/content/header/content-header.html',
  require: {
    wc: '^^warehouseContent' // this directive look for the controller on its parents
  }
};

export default warehouseContentHeader;
