(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
  var service = this;

  // Get list of all menu categories from server:
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: ApiBasePath + '/categories.json'
    }).then(function(response){
      // console.log('List of categories:\n', response.data);
      // response.data is an array, each item has these properties: id, short_name, name, special_instructions, url.
      return response.data;
    })
    .catch(function (errorResponse) {
      console.log('An error occurred getting data from the server:', errorResponse.statusText);
      console.log(errorResponse);
    });
  };

  // Get list of all menu items in the given category:
  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      // This way does NOT do URL encoding:
      // url: ApiBasePath + '/menu_items.json?category=' + categoryShortName

      // This way DOES do URL encoding:
      url: ApiBasePath + '/menu_items.json',
      params: {category: categoryShortName}
    }).then(function(response){
      // console.log('Menu items for category ' + categoryShortName + ':\n', response.data);
      // response.data contains menu_items array AND a category object with name and short_name properties.
      return response.data;
    })
    .catch(function (errorResponse) {
      console.log('An error occurred getting data from the server:', errorResponse.statusText);
      console.log(errorResponse);
    });
  };
}

})();
