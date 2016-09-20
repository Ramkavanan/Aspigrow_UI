angular.module('aspigrow.home', [
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.home', {
		url: '/home',
		templateUrl: 'home/home.tpl.html',
		controller: 'HomeController',
		data: {
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('HomeController', function ($window, $scope, $state, AuthenticationService, $rootScope) {
	$window.console.log('In HomeCtrl');
console.log('Service user data ',AuthenticationService.currentUser);
console.log('Data management ', $rootScope.currentUser);
	$scope.gotoQuestionaries = function () {
		$state.go('aspigrow.questionarie');
	};

})

;
