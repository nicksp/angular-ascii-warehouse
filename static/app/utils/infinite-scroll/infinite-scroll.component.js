import infiniteScrollController from './infinite-scroll.controller';

const infiniteScroll = {
  require: {
    wc: '^^warehouseContent'
  },
  controller: ['$scope', '$attrs', '$window', 'Utils', infiniteScrollController]
};

export default infiniteScroll;
