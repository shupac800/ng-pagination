var app = angular.module("pag-test", ["ngRoute"]).controller("pagCtrl", foo);

function foo($scope,$route) {
  var howMany = 3;
  $scope.page = 1;

  var arr = [ {lname: "Anderson", docket: "012345"},
              {lname: "Bailey", docket: "012574"},
            	{lname: "Collins", docket: "012573"},
            	{lname: "Diedrich", docket: "012141"},
              {lname: "Elkington", docket: "234781"},
              {lname: "Farnell", docket: "057544"},
              {lname: "Guthrie", docket: "123145"},
              {lname: "Holmes", docket: "098441"} ];

  arr.sort(function(a, b) {
    return b.docket - a.docket;
  });
  // redo this map after every sort
  arr = arr.map(function(a,index) {let b=a;b.index=index;return b});

  var numPages = Math.floor(arr.length / howMany) + 1;

  // http://stackoverflow.com/questions/3746725/create-a-javascript-array-containing-1-n
  $scope.pages = Array.apply(null, {length: numPages}).map(Number.call, Number).map(n => n + 1);
  
  $scope.rows = arr;

  $scope.firstIndex = ($scope.page - 1) * howMany;

  $scope.myFilter = function() {
    return function(i) {
      return (i.index >= $scope.firstIndex) &&
             (i.index < $scope.firstIndex + howMany);
    }
  }

  $scope.goToPage = function(p) {
    $scope.page = p + 1;
    $scope.firstIndex = ($scope.page - 1) * howMany;
    $route.reload();
  }

  $scope.dynamicOrderFunction = function() {
    return "-docket";
  }
}