angular.module('service.QuestionaryService', [
	'ui.router'
])

.factory('QuestionaryService', function ($window, $http, $q, ApiConstants, Security, $state) {
	var service = {};

	service.getQuestionariesByContact = function (contactId) {
		console.log('daat ---- ',contactId);
		var reqeust = $http({
			method: 'GET',
			url: ApiConstants.BaseUrl + 'quesHeader/questionaries/'+contactId,
			headers: { 'Content-Type': 'application/json',
				   'Accept':'application/json' }
		});

		return reqeust.then(function (response) {
			console.log('Reposne Came '+response.data);
			if (response.status === 200) {
				console.log('Came inside');
				return response.data;
			}
			return null;
		}, function (response) {
			return null;
		});
	};

	return service;
})

;
