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

.controller('HomeController', function ($window, $scope, $state, AuthenticationService) {
	$window.console.log('In HomeCtrl');
	$scope.gotoQuestionaries = function () {
		$state.go('aspigrow.questionarie');
	};

})

;
