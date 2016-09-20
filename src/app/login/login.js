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

.controller('LoginCtrl', function ($window, $scope, $state, AuthenticationService,$rootScope) {
	$window.console.log('In LoginCtrl');
	
	
	
	$scope.init = function() {
		$scope.credentials = {};
		$scope.loginFailed = false;
	};

	$scope.doLogin = function () {
		console.log($scope.credentials);
		AuthenticationService.login($scope.credentials)
			.then(function (user) {
				$rootScope.currentUser = user;
				$window.console.log('User logged in - ' + user);
				if (user != null) {
					console.log(' Serv;;; ', AuthenticationService.homePage());
					$state.go(AuthenticationService.homePage());
				}
				//alert("Credential mismatch ... ");
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
