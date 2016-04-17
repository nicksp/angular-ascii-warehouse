export default function productsService($http, Utils, AppSettings) {

  // Public API
  const service = {
    getItems
  };

  return service;

  ////////////

  // Get next set of products
  function getItems(sort, limit, skip) {
    const config = {
      transformResponse: (stream) => {
        return Utils.parseStreamingJSON(stream);
      }
    };

    return $http.get(_getApiUrl(sort, limit, skip), config);
  }

  function _getApiUrl(sort, limit, skip) {
    return AppSettings.apiUrl + `?sort=${sort}&limit=${limit}&skip=${skip}`;
  }
}
