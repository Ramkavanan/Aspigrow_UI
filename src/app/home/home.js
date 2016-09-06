angular.module('aspigrow.home', [
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.home', {
		url: '/home',
		templateUrl: 'home/home.tpl.html',
		controller: 'HomeController',
		controllerAs : 'homeCtrl',
		data: {
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('HomeController', function ($window, $scope, $state, AuthenticationService, $mdSidenav) {
	$window.console.log('In HomeCtrl');

})

;
