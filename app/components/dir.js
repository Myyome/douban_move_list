(function (angular) {
	/**
	* dir Module
	*
	* Description
	*/
	angular.module('dir', [])
	.directive('toogleActive', ['$location',function($location){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				$scope.location=$location;
				$scope.$watch('location.path()',function (now) {
					var aLink=iElm.children().attr('href');
					var type=aLink.replace(/#(\/.+?)\/\d+/,'$1');
					if(now.startsWith(type)){
						iElm.parent().children().removeClass('active');
						iElm.addClass('active');
					}
					else{
						iElm.removeClass('active');
					}
				});
				/*iElm.on('click',function () {
					iElm.parent().children().removeClass('active');
					iElm.addClass('active');
				});*/
			}
		};
	}]);
})(angular)