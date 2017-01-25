(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['categInfo'];
function ItemsController(categInfo) {
  var ctrl = this;
  ctrl.items = categInfo.menu_items;
  ctrl.categName = categInfo.category.name;
}

})();
