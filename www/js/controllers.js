angular.module('socialapp.controllers', ['ngOpenFB'])

.controller('LoginCtrl', function($scope, $state, $openFB) {



  $scope.fbLogin = function(){
    $openFB.login({scope: 'email,public_profile'})
    .then(function (response) {
      if (response.status === 'connected') {
        $state.go('tab.home')
      } else {
        console.log(JSON.stringify(response))
        console.log("Algo de errado aconteceu.")
      }
    });
  }
})

.controller('HomeCtrl', function($scope, $openFB) {
  $scope.user = {}

  $openFB.api({path: '/me'})
  .then(function(response) {
    angular.extend($scope.user, response);
  }, function(err) {
    console.log(JSON.stringify(err))
  });

  $openFB.api({
    path: '/me/picture',    
    params: {
      redirect: false,
      height: 64,
      width: 64
    }
  }).then(function(response) {
    angular.extend($scope.user, {picture: response.data.url});
    console.log(JSON.stringify($scope.user))
  }, function(err) {
    console.log(JSON.stringify(err))
  });

})


