esmfamil = angular.module 'esmfamil', ['firebase', 'classy', 'ui.router']

esmfamil.config ($stateProvider, $urlRouterProvider) ->
  $urlRouterProvider.otherwise '/login'

  loadStates = (states...) ->
    for state in states
      [..., path] = state.split('.')

      template = state.replace /\./g, '_'
      template = '/' + template + '.html'

      ctrl = state.replace /\.(.)/g, (m, c) -> c.toUpperCase()
      ctrl += 'Ctrl'

      $stateProvider.state state,
        url: '/' + path
        controller: ctrl
        templateUrl: template

  loadStates 'login',
             'friends',
             'friends.newgame',
             'friends.invite',
             'game',
             'review',
             'results'
