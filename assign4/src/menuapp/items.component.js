(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menuapp/templates/items-component.template.html',
  bindings: {
    itemsx: '<',      // array of menu items to be passed into this component
    categNamex: '<'
  }
});

})();
