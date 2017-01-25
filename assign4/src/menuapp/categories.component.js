(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menuapp/templates/categories-component.template.html',
  bindings: {
    categories: '<'   // array of menu categories to be passed into this component
  }
});

})();
