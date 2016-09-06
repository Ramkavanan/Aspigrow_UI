angular.module('security.interceptor', [
	'ui.router'
])

.factory('securityInterceptor', function ($injector, ApiConstants) {
	return {
		request: function(config) {
			if (config.url.indexOf(ApiConstants.BaseUrl) !== -1) {
				config.withCredentials = true;
			}
			return config;
		},
		responseError: function(response) {
			var state = $injector.get('$state');
			if (response.status === 401) {
				// All pages requests for session. If the person
				// is not authenticated then it creates loop in
				// redirection. So do nothing.
			} else if (response.status === 403) {
				var service = $injector.get('AuthenticationService');
				state.go(service.homePage());
			}
			return response;
		}
	};
})

.config(function ($httpProvider) {
	$httpProvider.interceptors.push('securityInterceptor');
})

;
