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

.controller('QuestionarieController', function ($window, $scope, $state, AuthenticationService) {
	$window.console.log('In QuestionarieController');
	

})

;
