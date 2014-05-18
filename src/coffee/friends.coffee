
esmfamil.classy.controller
  name: 'friendsCtrl'

esmfamil.classy.controller
  name: 'friendsNewgameCtrl'

  inject: ['$scope', '$state', 'myself', 'games', 'players']

  init: ->
    @players.$child(@myself.id).$child('game').$on 'value', (val) =>
      game = val?.snapshot?.value
      return unless angular.isString game
      return if game == @myself.game
      @myself.game = game
      @myself.admin = false
      @$state.go 'game'

  newGame: ->
    man = {}
    man[@myself.id] =
      started: false
      round: 1

    @games.$add(man)
      .then (ref) =>
        @myself.game = ref.name()
        @myself.admin = yes
        @myself.round = 1
        @players.$child(@myself.id).$update
          game: @myself.game
        @$state.go 'friends.invite'

esmfamil.classy.controller
  name: 'friendsInviteCtrl'

  inject: ['$scope', '$state', 'myself', 'games', 'players']

  init: ->
    @$.players = @players
    @$.myself = @myself

  invite: (id) ->
    player = {}
    player[id] =
      started: false
      round: 1
    @games.$child(@myself.game).$update player
    @players.$child(id).$update game: @myself.game

esmfamil.filter 'onlineFriends', ->
  (players, friends) ->
    friends ?= []
    for id, player of players when not player.game? and id in friends
      player

esmfamil.filter 'participants', (myself, games) ->
  game = games.$child myself.game
  (players) ->
    for id, player of players when id in game.$getIndex() and id != myself.id
      player
