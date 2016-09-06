angular.module('aspigrow.logout', [
	'security.authentication',
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.logout', {
		url: '/logout',
		templateUrl: 'logout/logout.tpl.html',
		controller: 'LogoutCtrl',
		data: {
			pageTitle: 'Logout',
			roles: [ 'Admin', 'User']
		}
	});
})

.controller('LogoutCtrl', function ($window, $scope, $state, AuthenticationService) {
	$window.console.log('In LogoutCtrl');
	
	AuthenticationService.logout()
		.then(function (isLoggedOut) {
			$state.go('aspigrow.login');
		}, function () {
			// do nothing
		});
})

;
