angular.module('socialapp', ['ionic', 'socialapp.controllers', 'ngOpenFB'])

.run(function($ionicPlatform, $openFB, $state) {
  $ionicPlatform.ready(function() {
    $openFB.init({appId: '842372649241714', tokenStore: window.localStorage})
    $openFB.isLoggedIn().then(function(loginStatus) {
      if (loginStatus.status === 'connected') {
        $state.go('tab.home')
      }
    }) 

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })


  $urlRouterProvider.otherwise('/login');

});
