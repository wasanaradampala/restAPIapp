var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl2', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");
    var load = function () {
        $http.get('/api/user').then(function (response) {
            console.log('get');
            $scope.employeelist = response.data;

        });



    }

    load();

    

}]);