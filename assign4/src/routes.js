(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Categories List
  .state('categories', {
    url: '/categories',
    template: '<categories categories="catsCtrl.categories"></categories>',
    controller: 'CategoriesController as catsCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Menu items for a particular category:
  .state('items', {
    url: '/items/{categShortName}',
    template: '<items itemsx="itemsCtrl.items" categ-namex="itemsCtrl.categName"></items>',
    controller: "ItemsController as itemsCtrl",
    resolve: {
      categInfo: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
        return MenuDataService.getItemsForCategory($stateParams.categShortName);
      }]
    }
  });
}

})();
