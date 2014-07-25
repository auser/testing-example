angular.module('myApp', [])
.service('WeatherService', function($http) {
  this.getWeather = function(q) {
    var url = "http://api.openweathermap.org/data/2.5/"+
            "forecast/daily?mode=json" +
            "&units=imperial&cnt=1" +
            "&q="
    return $http({
      method: 'JSONP',
      url: url + q,
      params: {
        callback: 'JSON_CALLBACK'
      }
    }).then(function(data, status) {
      return data.data;
    });
  };
})
.controller('HomeController', function($scope, WeatherService) {
  $scope.city = "San Francisco, CA";
  WeatherService.getWeather($scope.city)
  .then(function(data) {
    $scope.weather = data.list[0];
  })
});
