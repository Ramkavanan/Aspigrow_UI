angular.module('security.authentication', [
	'ui.router'
])

.factory('AuthenticationService', function ($window, $http, $q, ApiConstants, Security, $state) {
	var service = {
		currentUser: null
	};

	service.homePage = function () {
		var state = 'aspigrow.home';
		/*angular.forEach(Security.Roles, function (Role) {
			if (service.currentuser && service.currentuser.roles.indexOf(Role.role) !== -1) {
				state = Role.homeState;
			}
		});*/
		return state;
	};

	service.login = function (data) {
		console.log('daat ---- ',data);
		var reqeust = $http({
			method: 'POST',
			url: ApiConstants.BaseUrl + 'user/login',
			data: data,
			headers: { 'Content-Type': 'application/json',
				   'Accept':'application/json' }
			/**method: 'GET',
			url: ApiConstants.BaseUrl + 'entry-point/test',
			
			headers: { 'Content-Type': 'application/json',
				   'Accept':'application/json' }*/
		});

		return reqeust.then(function (response) {
			console.log('Reposne Came '+response.data);
			if (response.status === 200) {
				/*return service.requestCurrentUser().then(function (response) {
					service.currentUser = response;
					return response;
				}, function (response) {
					return null;
				});*/
				console.log('Came inside');
				return response.data;
			}
			return null;
		}, function (response) {
			return null;
		});
	};

	service.logout = function () {
		return $http.get(ApiConstants.BaseUrl + 'logout').then(function (response) {
			if (response.status === 200) {
				service.currentUser = null;
				return true;
			}
			return false;
		}, function (response) {
			return false;
		});
	};

	service.forgotPassword = function (user) {
		return $http.post(ApiConstants.BaseUrl + 'forgotpassword', user)
			.then(function (response) {
				if (response.status === 200) {
					return true;
				}
				return false;
			});
	};

	service.changePassword = function (passwords) {
		return $http.put(ApiConstants.BaseUrl + '/currentuser/changepassword', passwords)
			.then(function (response) {
				if (response.status === 200) {
					return true;
				}
				return false;
			});
	};

	service.verifyUser = function (params) {
		return $http.get(ApiConstants.BaseUrl + 'verifyuser/' + params.email + '/' + params.hashcode)
			.then(function (response) {
				if (response.status === 200) {
					return response.data;
				}
				return false;
			}, function (response) {
				return false;
			});
	};

	service.setPassword = function (loginParams) {
		return $http.put(ApiConstants.BaseUrl + 'verifyuser/setpassword', loginParams)
			.then(function (response) {
				if (response.status === 200) {
					return true;
				}
				return false;
			}, function (response) {
				return false;
			});
	};

	service.getUserDetails = function () {
		return $http.get(ApiConstants.BaseUrl + 'currentuser/details')
			.then(function (response) {
				if (response.status === 200) {
					return response.data;
				}
				return {};
			});
	};

	service.updateUserDetails = function (userDetails) {
		return $http.put(ApiConstants.BaseUrl + 'currentuser/details/update', userDetails)
			.then(function (response) {
				if (response.status === 200) {
					return true;
				}
				return false;
			});
	};

	service.isAuthenticated = function () {
		return !!service.currentUser;
	};

	service.requestCurrentUser = function () {
		if (service.isAuthenticated()) {
			return $q.when(service.currentUser);
		} else {
			return $http.get(ApiConstants.BaseUrl + 'currentuser').then(function (response) {
			});
		}
	};

	return service;
})

;
