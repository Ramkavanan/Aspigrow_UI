angular.module('aspigrow.signupService', [
])

.factory('signupService', ['$window', '$http', 'ApiConstants', function ($window, $http, ApiConstants) {
	var service = {
		
		signup : function (formData) {
			return $http.post(ApiConstants.BaseUrl + 'user/signup', formData);
		}
		
	};

	return service;
}])

;
