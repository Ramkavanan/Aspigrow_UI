angular.module('aspigrow.signup', [
	'aspigrow.signupService',
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.signup', {
		url: '/signup',
		templateUrl: 'signup/signup.tpl.html',
		controller: 'SignupCtrl',
		data: {
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('SignupCtrl', function ($window, $scope, $state, $stateParams) {
	$window.console.log('In SignupCtrl');
	$scope.$state = $state;

	$scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
		if (toState.data.userType === 'guest' &&
			toState.name.indexOf('.signup.') !== -1 &&
			fromState.name.indexOf('.signup.') !== -1 &&
			fromState.data.level + 1 !== toState.data.level) {
			event.preventDefault();
		}
	});

})

;
