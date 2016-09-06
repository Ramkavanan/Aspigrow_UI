angular.module('aspigrow.login', [
	'security.authentication',
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.login', {
		url: '/login',
		templateUrl: 'login/login.tpl.html',
		controller: 'LoginCtrl',
		data: {
			pageTitle: 'Login',
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('LoginCtrl', function ($window, $scope, $state, AuthenticationService) {
	$window.console.log('In LoginCtrl');
	
	$scope.loginFailed = false;
	$scope.credentials = {};
	
	$scope.doLogin = function () {
		AuthenticationService.login($scope.credentials.username, $scope.credentials.password)
			.then(function (isLoggedIn) {
				$window.console.log('User logged in - ' + isLoggedIn);
				if (isLoggedIn) {
					$state.go(AuthenticationService.homePage());
				}
				$scope.loginFailed = true;
			}, function () {
				$scope.loginFailed = true;
		});
	};
	$scope.goSignup = function() {
		// Place to go for redirect
	};
})

;
