export default function WarehouseContentController(productsService, adsService) {

  // How many products to show per page
  const productsPerPage = 20;

  // Just for testing purposes, to emulate reaching end of catalogue
  const maxProductPages = 5;

  // Cache context
  const vm = this;

  // To paginate results
  let skip = 0;

  // Next batch of products, pre-fetched in advance
  let prefetchedList = [];

  // List of products
  this.productList = [];

  // Whether or not we are loading products
  this.isLoading = false;

  // If we reached the end of the page
  this.hasReachedEnd = false;

  // Default key to sort products by
  this.sortKey = 'id';

  function _resetState() {
    skip = 0;
    prefetchedList = [];
    vm.productList = [];
    vm.hasReachedEnd = false;
    vm.isLoading = false;
  }

  /**
   * Update the products list with items from the buffer to re-render UI.
   * Apart from that, insert an advertisement after every 20 products.
   */
  function _loadProductsFromBuffer() {
    vm.productList = vm.productList.concat(adsService.preprocess(prefetchedList));
    prefetchedList = [];
  }

  /**
   * Handle changing sort order.
   */
  this.onChangeSortOrder = () => {
    _resetState();
    this.loadProducts();
  };

  /**
   * Get products from API and handle prefetched list of products.
   */
  this.loadProducts = () => {

    this.isLoading = true;

    // Load from the products queue, if it's not empty
    if (prefetchedList.length) {
      _loadProductsFromBuffer();
    }

    // Check if we loaded all the products,
    // by calculating the number of loaded pages
    if ((skip / productsPerPage) >= maxProductPages) {
      this.isLoading = false;
      this.hasReachedEnd = true;
      return false;
    }

    productsService.getItems(this.sortKey, productsPerPage, skip).then(
        (result) => {
          // Stream ends
          if (result.status === 200) {

            // Fetched products array
            const data = result.data;

            this.isLoading = false;

            // Save fetched set of data to the buffer
            prefetchedList = data;

            // On getting the first set of products, on initial page load
            if (!this.productList.length) {
              _loadProductsFromBuffer();

              // Pre-emptively fetch from API the next batch of results in advance
              this.loadProducts();
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('An error occurred while fetching data from API.', error);
        }
    );

    skip += productsPerPage;
  };

  // Initiate first load of first chunk of products
  this.loadProducts();
}
