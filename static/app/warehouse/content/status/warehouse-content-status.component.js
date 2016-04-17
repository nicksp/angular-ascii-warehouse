const warehouseContentStatus = {
  templateUrl: 'app/warehouse/content/status/content-status.html',
  require: {
    wc: '^^warehouseContent' // this directive look for the controller on its parents
  }
};

export default warehouseContentStatus;
