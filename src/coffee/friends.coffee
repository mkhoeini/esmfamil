
esmfamil.classy.controller
  name: 'friendsCtrl'

esmfamil.classy.controller
  name: 'friendsNewgameCtrl'

  inject: ['$scope', '$state', 'myself', 'games', 'players']

  init: ->

  newGame: ->
    man = {}
    man[@myself.id] = @myself
    @games.$add(man)
      .then (ref) =>
        @myself.game = ref.name()
        @players.$child(@myself.id).$update
          game: @myself.game
        @$state.go 'friends.invite'

esmfamil.classy.controller
  name: 'friendsInvitedCtrl'

  inject: ['$scope', 'myself', 'games']

  acceptInvite: ->
    game = @people[self].game
    @games[game][self].score = 0
    @games.$save game

esmfamil.classy.controller
  name: 'friendsInviteCtrl'

  inject: ['$scope', 'myself', 'games', 'players']

  init: ->
    @$.friends =
      f for f in @players when not f.game? and f.id in @myself.friends

  invite: (id) ->
    @people[id].game = @$.game
    @people.$save id

