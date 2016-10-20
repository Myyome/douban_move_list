(function (angular) {
	'use strict';
	
	var myApp=angular.module('in_theaters', ['ngRoute','serveice','ui.bootstrap']);

	myApp.config(['$routeProvider', function($routeProvider) {
  		$routeProvider.when('/:module/:page', {
	    templateUrl: 'comm/view.html',
	    controller: 'inTheatersController'
  });
}])

	myApp.controller('inTheatersController', ['jsonpServer','$route','$routeParams','$scope','$http',function(jsonpServer,$route,$routeParams,$scope,$http) {
		$scope.subjects=[];
		$scope.message='';
		$scope.loading=false;
		$scope.title='Loading.....';
		//$scope.currentPage=parseInt($routeParams.page);
		 $scope.bigCurrentPage = parseInt($routeParams.page);
		var scale=10; //一页显示多少条记录
		var start=($scope.bigCurrentPage-1)*scale;
		jsonpServer.jsonp(
			'https://api.douban.com/v2/movie/'+$routeParams.module,
			{start:start,count:scale,q:$routeParams.q},
			function(data) {
				$scope.title=data.title;
				$scope.subjects=data.subjects;
				$scope.loading=true;
				$scope.totalItems=data.total;
				$scope.page=Math.ceil($scope.totalItems/scale);
				$scope.$apply();
			}
			);

 		$scope.maxSize = 5;

 

  
		$scope.pageChanged=function () {
			console.log('Page changed to: ' + $scope.bigCurrentPage);
				$route.updateParams({page:$scope.bigCurrentPage});

				}
		/*$scope.fanye=function (page) {
			if(page>=1 && page<=$scope.page){
				$route.updateParams({page:page});

			}
				}*/

		/*$http.get('/fa.json').then(function(response) {
			console.log(response)
			if(response.status==200){
				var data=response.data;
   			 	$scope.subjects=data.subjects;
   			 }
   			 else{
   			 	$scope.message='获取数据错误';
   			 }
  }, function(err) {
   	$scope.message='获取数据错误'+err.status;
  });*/
	}]);
})(angular);
