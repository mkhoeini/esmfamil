
esmfamil.classy.controller
  name: 'resultsCtrl'

  inject: ['$scope', '$state', 'myself', 'setOnPlayers', 'games', 'players']

  init: ->
    @$.game = @games.$child @myself.game
    @$.data = @$.game.$child @myself.id
    @$.players = @players
    @$.rounds = [1..@$.data.round]
    @$.admin = @myself.admin

  replay: ->
    @myself.round += 1
    @setOnPlayers
      done: false
      started: true
      fields: {}
      round: @myself.round

  watch:
    'data.started': (v) ->
      @$state.go 'game' if v

