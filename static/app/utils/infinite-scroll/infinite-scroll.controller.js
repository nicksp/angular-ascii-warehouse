import angular from 'angular';

export default function infiniteScrollController($scope, $attrs, $window, Utils) {

  this.$postLink = function () {

    // Cache root elements
    const doc = $window.document;
    const docElement = doc.documentElement;

    // The height of the visible area of a document including
    // the height of the horizontal scrollbar (if present)
    const visibleHeight = docElement.offsetHeight;

    // Number of pixel from the bottom before we fetch next set of products
    const threshold = 200;

    angular.element($window).bind('scroll', Utils.throttle(() => {

      // Exit processing in case we're loading products at the moment or reached the end of catalogue
      if (this.wc.hasReachedEnd || this.wc.isLoading) {
        return false;
      }

      // Total height of all element's content, including non-visible content,
      // accounting for cases where html/body are set to height: 100%
      let scrollableHeight = (docElement && docElement.scrollHeight) || doc.body.scrollHeight;

      // How much the window is scrolled down
      let scrollTop = (docElement && docElement.scrollTop) || doc.body.scrollTop;

      /**
       * Check if we're almost at the bottom of products grid and load more products.
       *
       * Take the top scroll of the window
       * add the window's viewport height (visible window)
       * and check if that >= the height of the overall content (document).
       */
      if (scrollTop + visibleHeight >= scrollableHeight - threshold) {
        $scope.$apply(this.wc[$attrs.action]);
      }
    }, 100));
  };
}
