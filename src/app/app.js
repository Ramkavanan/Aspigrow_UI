angular.module('aspigrow', [
	'templates-app',
	'templates-common',
	'aspigrow.home',
	'aspigrow.login',
	'aspigrow.forgotpassword',
	'aspigrow.signup',
	'aspigrow.logout',
	'security',
	'service.httprequesttracker',
	'ui.router'
])

.constant('ApiConstants', {
	BaseUrl: 'http://localhost'
})

.config(function myAppConfig ($stateProvider, $urlRouterProvider, $provide) {
	$urlRouterProvider.otherwise('/login');

	$provide.decorator('$state', function ($delegate, $rootScope) {
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			$delegate.next = toState;
			$delegate.toParams = toParams;
		});
		return $delegate;
	});

	$stateProvider.state('aspigrow', {
		abstract: true,
		templateUrl: 'app.tpl.html',
		controller: 'RootCtrl',
		data: {
			pageTitle: 'Aspigrow',
			roles: [ 'Anonymous' ]
		},
		resolve: {
			user: function (AuthorizationService, $q, $state) {
				var deferred = $q.defer();

				AuthorizationService.checkAuthorized($state.next)
					.then(function (authorized) {
						deferred.resolve(authorized);
					}, function (error) {
						deferred.reject(error);
					});

				return deferred.promise;
			}
		}
	});
})

.run(function run () {
})

.controller('AppCtrl', function ($window, $scope, $location, httpRequestTracker) {
	$scope.pageTitle = 'A';
	$window.console.log('In AppCtrl');
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if (angular.isDefined(toState.data.pageTitle)) {
			$scope.pageTitle = toState.data.pageTitle + ' | Aspigrow' ;
		}
	});

	$scope.isLoading = function() {
		return httpRequestTracker.hasPendingRequests();
	};
})

.controller('HeaderCtrl', function ($window, $scope) {
	$window.console.log('In HeaderCtrl');
		$scope.menuItems = [
		{
			state: 'aspigrow.login',
			name: 'Login'
		}
	];

	$scope.goHome = function() {
		$state.go('aspigrow.login');
	};

	$scope.$on('updateMenuItems', function (event, menuItems) {
		$scope.menuItems = menuItems;
	});
})

.controller('FooterCtrl', function ($window, $scope) {
	$window.console.log('In FooterCtrl');
})

.controller('RootCtrl', function ($window, $scope, $rootScope, httpRequestTracker, AuthenticationService) {
	$window.console.log('In RootCtrl');


	$scope.updateMenu = function () {
		var anonymousMenuItems = [
			{
				state: 'aspigrow.login',
				name: 'Login'
			}
		];
		
		var userMenuItems = [
			{
				state: 'aspigrow.logout',
				name: 'Logout'

			}
		];

		var designerMenuItems = [
			{
				state: 'aspigrow.logout',
				name: 'Logout'
			}
		];
		
		
		if (AuthenticationService.currentUser.roles.indexOf('Designer') !== -1) {
			$rootScope.$broadcast('updateMenuItems', designerMenuItems);
		} else if (AuthenticationService.currentUser.roles.indexOf('User') !== -1) {
			$rootScope.$broadcast('updateMenuItems', userMenuItems);
		} else if (AuthenticationService.currentUser.roles.indexOf('Anonymous') !== -1) {
			$rootScope.$broadcast('updateMenuItems', anonymousMenuItems);
		}
	};

	$scope.isLoading = function () {
		return httpRequestTracker.hasPendingRequests();
	};
})

;
