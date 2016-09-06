angular.module('security.authorization', [
	'security.authentication',
	'ui.router',
])

.factory('AuthorizationService', function ($window, $http, $q, $state, $rootScope, ApiConstants, Security, AuthenticationService) {
	var service = {
		authorizedState: false
	};

	$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
		$window.console.log(event);
		$state.go(AuthenticationService.homePage());
	});

	service.checkAuthorized = function (state) {
		var deferred = $q.defer();
		var authorized = false;
		
		AuthenticationService.requestCurrentUser()
			.then(function (user) {
				angular.forEach(state.data.roles, function (role) {
					if (service.getRoles(user).indexOf(role) !== -1) {
						authorized = true;
					}
				});

				if (authorized) {
					deferred.resolve(true);
				} else {
					deferred.resolve($q.reject('Not Authorized'));
				}
			}, function () {
				if (state.data.roles.indexOf('Anonymous')) {
					deferred.resolve(true);
				} else {
					deferred.resolve($q.reject('Not Authorized'));
				}
			});

		return deferred.promise;
	};

	service.getRoles = function (user) {
		var roles = [ 'Anonymous' ];

		user = user || AuthenticationService.currentUser;
		if (user !== null && user.roles.length > 0) {
			roles = user.roles;
		}

		return roles;
	};

	service.hasRole = function (role) {
		return (AuthenticationService.isAuthenticated() && AuthenticationService.currentUser.roles.indexOf(role) !== -1);
	};

	service.isAnonymous = function () {
		return !AuthenticationService.isAuthenticated();
	};

	return service;
})

;
