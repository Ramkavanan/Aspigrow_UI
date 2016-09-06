describe('AppCtrl', function() {
	describe('isCurrentUrl', function() {
		var AppCtrl, $location, $scope;

		beforeEach(module('aspigrow'));

		beforeEach(inject(function($controller, _$location_, $rootScope) {
			$location = _$location_;
			$scope = $rootScope.$new();
			AppCtrl = $controller('AppCtrl', { $location: $location, $scope: $scope });
		}));

		it('Should pass a dummy test', inject(function() {
			expect(AppCtrl).toBeTruthy();
		}));
	});
});
