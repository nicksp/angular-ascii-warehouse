export default function adsService($sce, Utils, AppSettings) {

  // Advertisement
  let adList = [];

  // Processed list of each next batch of products
  let processedAdList = [];

  // Public API
  const service = {
    preprocess
  };

  return service;

  ////////////

  /**
   * Perform processing of incoming data by injecting an advertisement.
   */
  function preprocess(productList) {
    // Number of products after which we insert an advertisement
    const adPositionBase = 20;

    const productListLength = productList.length;

    // Reset processed items array
    processedAdList = [];

    // Generate ads indexes. Randomize on each run.
    // Since placekitten service has only 17 images, indexed by 0-16,
    // there might be sometimes similar ads
    adList = adList.concat(Utils.getRandomArray(17));

    // Check if we have enough products in each current batch of results to insert an ad
    if (productListLength >= adPositionBase) {

      // Split into chunks of `adPositionBase` products and iterate over each chunk
      for (let i = 0; i < productListLength; i += adPositionBase) {
        let chunksArr = productList.slice(i, i + adPositionBase);
        _processChunk(chunksArr);
      }
      return processedAdList;
    } else {
      return productList;
    }
  }

  /**
   * Work with each chunk of products.
   */
  function _processChunk(chunk) {
    for (let index in chunk) {
      processedAdList.push(chunk[index]);
    }

    // Now push and ad element at the end of the `n` elements' set
    _insertAd();
  }

  function _insertAd () {
    const index = _getAdId();
    // Mark an `ad` html as safe to use for privileged context
    const adBlock = $sce.trustAsHtml(_getAdHtml(index));
    processedAdList.push({ adBlock: adBlock });
  }

  function _getAdId() {
    const min = 0;
    const max = 16;

    let id = 0;

    do {
      id = Utils.getRandomInt(min, max);
    } while (id === adList[adList.length - 1]);

    return id;
  }

  function _getAdHtml(index) {
    return `<img class="ad" src="${AppSettings.adsUrl}?r=${adList[index]}" alt="" />`;
  }
}
