angular.module('aspigrow.questionarie', [
	'ui.router'
])
.filter('split', function() {
  return function(input, delimiter) {
    delimiter = delimiter || ',';

    return input.split(delimiter);
  };
})
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
	$scope.init = function() {
		$scope.credentials = {};
		$scope.lineItems = [];
		$scope.header = {};
	};
	console.log('Data management i nquestionaries ', $rootScope.currentUser.contact.ContId);
	var contactId = $rootScope.currentUser.contact.ContId;
	if(contactId === undefined || contactId == null || contactId.length <= 0 ) {
		alert("There is no questionaries found for the current user");
	} else {
		QuestionaryService.getQuestionariesByContact($rootScope.currentUser.contact.ContId )
			.then(function (quesnatriesHeader) {
					console.log('Questioanries --- ', quesnatriesHeader);
					
					console.log('Questioanries line  --- ', quesnatriesHeader[0].questProcessLineItems);
					
					$scope.$evalAsync(function(){ 

					   	 $scope.lineItems = quesnatriesHeader[0].QuestProcessLineItems;
						$scope.header = quesnatriesHeader[0];
	console.log('Line Items --- ',$scope.lineItems);

					});
				}
			); 	
	}
	console.log('Line Items --- ',$scope.lineItems);
	$scope.splitOptions = function(value){
		console.log('slpit value --- ',value);
		console.log('slpit value --- ',value.split(";"));
		return value.split(";");
	};
	$scope.submitAnswer = function() {
		console.log('Scope for header 0----- ', $scope.header);
		QuestionaryService.saveAnswerHeader( $scope.header )
			.then(function (isInserted) {
					if(isInserted) {
						$state.go('aspigrow.home');
					} else {
						alert("Questionaries Submitted  failed . !!! ");
					}
				}
			); 
	};
	$scope.goHome = function() {
		$state.go('aspigrow.home');
	};
})

;
