esmfamil = angular.module 'esmfamil', ['firebase', 'classy', 'ui.router']

esmfamil.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise '/login'

  loadStates = (states...) ->
    for state in states
      $stateProvider.state state,
        url: '/' + state
        controller: state + 'Ctrl'
        templateUrl: "/#{state}.html"

  loadStates 'login', 'friends', 'game', 'results'
