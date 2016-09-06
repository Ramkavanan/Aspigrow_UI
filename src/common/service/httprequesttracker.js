angular.module('service.httprequesttracker', [
])

.factory('httpRequestTracker', function ($http) {
	var service = {};

	service.hasPendingRequests = function () {
		return $http.pendingRequests.length > 0;
	};

	return service;
})

;