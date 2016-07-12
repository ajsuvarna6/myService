'use strict';

/**
 * @ngdoc function
 * @name myServiceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myServiceApp
 */
angular.module('myServiceApp')
  .controller('MainCtrl', function ($scope,userDetail,$cookies) {
    var vm=$scope;
    vm.userStat=userDetail.getuser();
    console.log("user",vm.userStat);
    vm.signout=function(){
        $cookies.remove("token");
        $cookies.remove("userStat");
    }
  });

angular.module('myServiceApp').service('userDetail',function($cookies){
  function getUser(){
    return $cookies.getObject("userStat");
  }
  return {getuser:getUser};
})
