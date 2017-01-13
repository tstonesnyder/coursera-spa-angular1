(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 Controller -- Items to buy
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
  var ctrl = this;
  ctrl.items = ShoppingListCheckOffService.getItemsToBuy();

  ctrl.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

// LIST #2 Controller -- Items already bought
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController (ShoppingListCheckOffService) {
  var ctrl = this;
  ctrl.items = ShoppingListCheckOffService.getItemsBought();
}

// Singleton Service that is injected into both controllers so data can be shared
function ShoppingListCheckOffService () {
  var service = this;

  var itemsToBuy = [
    {
      quantity: 10,
      name: 'apples'
    },
    {
      quantity: 3,
      name: 'pears'
    },
    {
      quantity: 20,
      name: 'bananas'
    },
    {
      quantity: 2,
      name: 'oranges'
    },
    {
      quantity: 5,
      name: 'peaches'
    },
  ];
  var itemsBought = [];

  service.buyItem = function (itemIndex) {
    //console.log('buying item:', itemsToBuy[itemIndex]);

    // Add to the Bought list:
    itemsBought.push(itemsToBuy[itemIndex]);

    // Remove from the To Buy list:
    itemsToBuy.splice(itemIndex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getItemsBought = function () {
    return itemsBought;
  };
}

})();
