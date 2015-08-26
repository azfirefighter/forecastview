'use strict';

/**
 * @ngdoc function
 * @name forecastivewApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the forecastivewApp
 */
angular.module('forecastivewApp')
  .controller('MainCtrl', ['$http', '$scope', '$filter', 'moment', function($http, $scope, $filter, moment) {
    var APIkey = 'FORECAST_API_KEY'; // forecast.io API key
		var targetGeo = '32.7099436,-117.1576964'; // latitude, longitude
		var stationURL = 'https://api.forecast.io/forecast/' + APIkey + '/' + targetGeo + '?callback=JSON_CALLBACK';
    var iconArray = [
			{oIcon: 'clear-day',           wIcon: 'wi wi-day-sunny'},
			{oIcon: 'clear-night',         wIcon: 'wi wi-stars'},
			{oIcon: 'rain',                wIcon: 'wi wi-rain'},
			{oIcon: 'snow',                wIcon: 'wi wi-snow'},
			{oIcon: 'sleet',               wIcon: 'wi wi-sleet'},
			{oIcon: 'wind',                wIcon: 'wi wi-cloudy-gusts'},
			{oIcon: 'fog',                 wIcon: 'wi wi-fog'},
			{oIcon: 'cloudy',              wIcon: 'wi wi-cloudy'},
			{oIcon: 'partly-cloudy-day',   wIcon: 'wi wi-day-cloudy'},
			{oIcon: 'partly-cloudy-night', wIcon: 'wi wi-night-cloudy'}
		];
    $http.jsonp(stationURL)
    .success(function(data){
      var dayDay = [], dayDate = [], dayIcon = [], dayMinTemp = [], dayMaxTemp = [], daySummary = [], dayHumidity = [], daySunrise = [], daySunset = [];
      var wRaw = data.daily;
      var searchIcon = $filter('filter')(iconArray, {oIcon: wRaw.icon});
      $scope.todayIcon = searchIcon[0].wIcon;
      $scope.todaySummary = wRaw.summary;
      $scope.forecasts = angular.forEach(wRaw.data, function(dayArray,index){
          dayDay[index] = moment(dayArray.time, 'X').format('ddd');
          dayDate[index] = moment(dayArray.time, 'X').format('MMM D');
          searchIcon = $filter('filter')(iconArray, {oIcon: dayArray.icon});
          dayIcon[index] = searchIcon[0].wIcon;
          dayMinTemp[index] = Math.round(dayArray.temperatureMin);
          dayMaxTemp[index] = Math.round(dayArray.temperatureMax);
          daySummary[index] = dayArray.summary;
          dayHumidity[index] = Math.floor(dayArray.humidity * 100);
          daySunrise[index] =  moment(dayArray.sunriseTime, 'X').format('h:mm a');
          daySunset[index] =  moment(dayArray.sunsetTime, 'X').format('h:mm a');
      });
      $scope.alerts = data.alerts[0].description.replace(/\\n/g,' ');
      console.log($scope.alerts);
      $scope.forecasts.dDay = dayDay;
      $scope.forecasts.dDate = dayDate;
      $scope.forecasts.dIcon = dayIcon;
      $scope.forecasts.dMinTemp = dayMinTemp;
      $scope.forecasts.dMaxTemp = dayMaxTemp;
      $scope.forecasts.dSummary = daySummary;
      $scope.forecasts.dHumidity = dayHumidity;
      $scope.forecasts.dSunrise = daySunrise;
      $scope.forecasts.dSunset = daySunset;
    })
    .error(function(){
      console.log('Problem fetching weather data');
    });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);