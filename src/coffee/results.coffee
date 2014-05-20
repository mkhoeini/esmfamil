
esmfamil.classy.controller
  name: 'resultsCtrl'

  inject: ['$scope', 'myself', 'games', 'players']

  init: ->
    @$.game = @games[@myself.game]
    @$.players = @players
    @$.rounds = [1..@$.game[@myself.id].round]

