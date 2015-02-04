'use strict';

var app = angular.module('Trust', [])
  .controller('profileController', ['$scope', '$http', function($scope, $http) {

    $http.get('data/profile.json').success(function(data) {
      $scope.profile = data;
    })
    .error(function(err){
      console.log(err);
    });

    $scope.trust = function() {
      if (!$scope.profile.trusted) {
        $scope.profile.trusters += 1;
        $scope.profile.trusted = true;
      } else {
        $scope.profile.trusters -= 1;
        $scope.profile.trusted = false;
      }
    };

  }]);

