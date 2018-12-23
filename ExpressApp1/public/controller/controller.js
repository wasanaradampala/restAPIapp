var myApp = angular.module('myApp', []);

myApp.controller('AppCtrl', ['$scope', '$http', function ($scope, $http) {
    console.log("Hello World from controller");
    var load = function () {
        $http.get('/api/ninjas').then(function (response) {
            console.log('get');
            $scope.employeelist = response.data;

        });



    }

    load();

    $scope.addEmployee = function () {
        console.log($scope.employee);
        $http.post('/api/ninjas',$scope.employee).then(function (response) {
            console.log('post');
            $scope.employee = null;
            load();
           
        });

    }


    $scope.remove = function (id) {
        console.log(id);
       $http.delete('/api/ninjas/'+id).then(function (response) {
            console.log('delete');
            $scope.employee = null;
            load();

        });
        
    }


    $scope.edit = function (id) {
        console.log(id);
        $http.get('/api/ninjas/' + id).then(function (response) {
            console.log('edit');
           
           $scope.employee = response.data[0];


        });

    }


    $scope.UpdateEmployee = function () {
        var id = $scope.employee.id;
     
        $http.put('/api/ninjas/'+id,$scope.employee).then(function (response) {
            console.log('update');
            $scope.employee = null;
            load();

        });

    }


    
}]);