angular.module('aspigrow.forgotpassword', [
	'security.authentication',
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.forgotpassword', {
		url: '/forgotpassword',
		templateUrl: 'forgotpassword/forgotpassword.tpl.html',
		controller: 'ForgotPasswordCtrl',
		data: {
			pageTitle: 'Forgot Password',
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('ForgotPasswordCtrl', function ($window, $scope, AuthenticationService) {
	$window.console.log('In ForgotPasswordCtrl');
	
	$scope.submitted = false;
	$scope.checking = false;
	$scope.sent = false;
	$scope.credentials = {};
	
	$scope.sendPasswordToEmail = function () {
		$scope.submitted = true;
		$scope.checking = true;
		$scope.sent = false;
		AuthenticationService.forgotPassword({ username: $scope.credentials.username })
			.then(function (isEmailSent) {
				$scope.checking = false;
				if (isEmailSent) {
					$scope.sent = true;
					return;
				}
				$scope.sent = false;
			}, function (response) {
				$scope.checking = false;
			});
	};
})

;
