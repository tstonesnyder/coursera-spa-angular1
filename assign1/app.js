(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.lunchItems = '';
  $scope.lunchMessage = '';
  $scope.errorClass = '';

  $scope.checkIfTooMuch = function () {
    // Note: Angular will trim extra spaces at start/end of $scope.lunch
    if ($scope.lunchItems === '') {
      $scope.lunchMessage = 'Please enter data first.';
      $scope.errorClass = 'error';
    } else {
      var itemList = $scope.lunchItems.split(',');

      // Don't count empty items:
      var nbrNonBlankItems = 0;
      for (var i = 0; i < itemList.length; i++) {
        if (itemList[i].trim().length > 0) {
          nbrNonBlankItems++;
        }
      }

      // console.log(itemList);
      // console.log(itemList.length, nbrNonBlankItems);
      if (nbrNonBlankItems <= 3) {
        $scope.lunchMessage = 'Enjoy!';
      } else {
        $scope.lunchMessage = 'Too much!';
      }
      $scope.errorClass = 'correct';
    }
  };
}
})();
