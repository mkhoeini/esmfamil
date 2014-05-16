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

esmfamil.classy.controller

  name: 'loginCtrl'

  inject: ['$scope', 'loginService']

  init: ->

  login: (provider) ->
    login = @loginService(provider)
    login.login().then =>
      @$.logged_in = true
      login.friends().then (friends) =>
        @$.friends = friends

  logout: ->
    @auth.$logout()
    @$rootScope.$on("$firebaseSimpleLogin:logout", (e, user) =>
      @$.friends = []
      @$.logged_in = false
    )


esmfamil.classy.controller
  name: 'friendsCtrl'


esmfamil.classy.controller
  name: 'gameCtrl'


esmfamil.classy.controller
  name: 'resultsCtrl'
