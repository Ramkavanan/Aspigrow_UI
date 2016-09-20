angular.module('aspigrow.questionarie', [
	'ui.router'
])

.config(function ($stateProvider) {
	$stateProvider.state('aspigrow.questionarie', {
		url: '/questionarie',
		templateUrl: 'questionarie/questionarie.tpl.html',
		controller: 'QuestionarieController',
		data: {
			roles: [ 'Anonymous' ]
		}
	});
})

.controller('QuestionarieController', function ($window, $scope, $state, QuestionaryService, $rootScope) {
	$window.console.log('In QuestionarieController');
	console.log('Data management i nquestionaries ', $rootScope.currentUser.contact.ContId);
	var contactId = $rootScope.currentUser.contact.ContId;
	if(contactId === undefined || contactId == null || contactId.length <= 0 ) {
		alert("There is no questionaries found for the current user");
	} else {
		QuestionaryService.getQuestionariesByContact($rootScope.currentUser.contact.ContId )
			.then(function (quesnatriesHeader) {
					console.log('Questioanries --- ', quesnatriesHeader);
				}
			); 	
	}
})

;
