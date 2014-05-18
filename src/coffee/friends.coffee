
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
      @$state.go 'friends.invited'

  newGame: ->
    man = {}
    man[@myself.id] = {started: false}
    @games.$add(man)
      .then (ref) =>
        @myself.game = ref.name()
        @players.$child(@myself.id).$update
          game: @myself.game
        @$state.go 'friends.invite'

esmfamil.classy.controller
  name: 'friendsInvitedCtrl'

  inject: ['$scope', 'myself', 'games']

  accept: ->
    @games.$child(@myself.game).$child(@myself.id).$set started: false

esmfamil.classy.controller
  name: 'friendsInviteCtrl'

  inject: ['$scope', 'myself', 'games', 'players']

  init: ->
    @$.players = @players

  invite: (id) ->
    @players.$child(id).$update
      game: @myself.game

esmfamil.filter 'onlineFriends', (myself) ->
  (players) ->
    for id in players.$getIndex() when not players[id].game? and id in myself.friends
      players[id]

esmfamil.filter 'participants', (myself, games) ->
  game = games.$child myself.game
  (players) ->
    for id, player in players.$getIndex() when id in game.$getIndex()
      player
