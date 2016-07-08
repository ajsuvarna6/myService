'use strict';

/**
 * @ngdoc overview
 * @name myServiceApp
 * @description
 * # myServiceApp
 *
 * Main module of the application.
 */
angular
  .module('myServiceApp', [
    'ngAnimate',
    'ngRoute',
    'ngCookies'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        resolve: { loginCheck : checkLogin }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/auth/login.html',
        controller: 'authctrl',
        controllerAs: 'auth'
      })

      .otherwise({
        redirectTo: '/'
      });
  });

var checkLogin=function($q,$http,$location,$cookies){
	var def=$q.defer();
  var token=$cookies.get("token");
  console.log("token:",token);
  if(token!==undefined || token!==null) {
    $http.get('/users/loggedin/'+token)
    .then(function(user){
      console.log(user);
      if(user.data.flag===true) {
        def.resolve();
      }
      else {
        def.reject();
        $cookies.remove("token");
  			$location.path('/login');
      }
  		return def.promise;data
  	})
    .catch(function(err){
      console.log(err);
      $cookies.remove("token");
      $location.path("/login");
    });
    //def.resolve();
  }
	else {
    $location.path("/login");
  }
}
