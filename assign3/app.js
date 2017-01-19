(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


function FoundItemsDirective () {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',      // stores array of found items
      onRemove: '&'    // bind to function on parent controller
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'foundItemsDirCtrl',  // Use this name in directive template
    bindToController: true
  };
  return ddo;
}

function FoundItemsDirectiveController() {
  var ctrl = this;
}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var ctrl = this;

  // The search term will be entered in HTML page by user:
  ctrl.searchTerm = '';
  ctrl.found = [];

  ctrl.filterMenuItems = function () {
    // console.log('NarrowItDownController.filterMenuItems:');
    if (ctrl.searchTerm.length < 1) {
      ctrl.found = [];
    } else {
      // console.log('About to call MenuSearchService.getMatchedMenuItems with arg = ' + ctrl.searchTerm);
      // Store the resulting array of objects in a property on the controller instance:
      var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
      promise.then(function(response) {
        // console.log('Returned from MenuSearchService.getMatchedMenuItems() with response:', response);
        ctrl.found = response;
      })
      .catch(function (error) {
        console.log("Error getting menu items: ", error);
      });
    }
    // console.log("End of NarrowItDownController.filterMenuItems");
  }; 

  ctrl.removeMenuItem = function (itemIndex) {
    // console.log('NarrowItDownController.removeMenuItem:');
    ctrl.found.splice(itemIndex, 1);
    // console.log('New nbr of items: ', ctrl.found.length);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService ($http, ApiBasePath) {
  var service = this;

  // Returns a promise to the caller
  service.getMatchedMenuItems = function (searchTerm) {
    // Get list of all menu items from server:
    return $http({
      method: "GET",
      url: ApiBasePath + '/menu_items.json'
    }).then(function(result){
      // Create a list of those items whose description contains the searchTerm,
      // and return it wrapped in a promise.

      // This will be an array of objects:
      var foundItems = [];
      //console.log(result);
      var allItems = result.data.menu_items;

      for (var i = 0; i < allItems.length; i++) {
        if (allItems[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
          var item = {};
          item.name = allItems[i].name;
          item.short_name = allItems[i].short_name;
          item.description = allItems[i].description;
          foundItems.push(item);
        }
      }
      // console.log('Found ' + foundItems.length + ' items.', '1st item: ', foundItems[0]);
      return foundItems;
    });
  };
}

})();
