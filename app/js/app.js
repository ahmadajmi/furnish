(function() {
  'use strict';

  var app = angular.module('Profile', []);

  app.controller('ProfileController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.url = $location.absUrl();
    $http.get('data/profile.json').success(function(data) {
      $scope.profile = data;
    });
  }]);

  app.controller('ProfileReviews', ['$scope', '$http', function($scope, $http) {
    $http.get('data/reviews.json').success(function(data) {
      $scope.reviews = data;
    });
  }]);

  app.controller('PhotosController', ['$scope', '$http', function($scope, $http) {
    $http.get('data/photos.json').success(function(data) {
      $scope.photos = data;
    });
  }]);

  app.controller('NetworkController', ['$scope', '$http', function($scope, $http) {
    $http.get('data/network.json').success(function(data) {
      $scope.network = data;
    });
  }]);

  app.controller('TabController', ['$scope', function($scope) {
    $scope.tab = 1;

    $scope.setTab = function(selectedTab) {
      $scope.tab = selectedTab;
    };

    $scope.isSet = function(tab) {
      return $scope.tab === tab;
    };
  }]);

  app.directive('profileCard', function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: '../templates/profile-card.html'
    };
  });

  app.directive('reviewPanel', function() {
    return {
      restrict: 'EA',
      replace: true,
      templateUrl: '../templates/review-panel.html'
    };
  });

  app.directive('reviewRating', function() {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: '../templates/review-rating.html',
      scope: {
        ratingValue: '=ratingValue',
        ratingMax: '=ratingMax'
      },
      link: function(scope, element, attr) {
        scope.stars = [];
        for (var i = 0; i < scope.ratingMax; i++) {
          scope.stars.push({
            'star--active': i < scope.ratingValue
          });
        }
      }
    };
  });

  app.directive('trustButton', function() {
    return {
      restrict: 'EA',
      templateUrl: '../templates/trust-button.html',
      link: function(scope, element, attr) {

        scope.buttonText = !scope.profile.trusted ? "Trust" : "Trusted";

        scope.trust = function() {
          if (!scope.profile.trusted) {
            scope.profile.trusters += 1;
            scope.profile.trusted = true;
            scope.buttonText = "Trusted";
          } else {
            scope.profile.trusters -= 1;
            scope.profile.trusted = false;
            scope.buttonText = "Trust";
          }
        };
      }
    };
  });

  app.filter('getFirstName', function() {
    return function(input) {
      return input.split(' ')[0];
    };
  });

})();
