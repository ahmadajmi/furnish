'use strict';

var app = angular.module('Trust', [])
  .controller('profileController', ['$scope', '$http', function($scope, $http) {

    $http.get('data/profile.json').success(function(data){
      $scope.profile = data;
    })
    .error(function(err){
      console.log(err);
    });

  }])

  .controller('reviewsController', ['$scope', function($scope) {
    $scope.reviews = [
    {name: 'Ahmad Ajmi', 'body': 'this is a good book', done:false},
    {name: 'Eiad Ajmi', 'body': 'this is a good book', done:false},
    {name: 'Aml Ajmi', 'body': 'this is a good book', done:false}
    ];
  }]);

