
esmfamil.classy.controller
  name: 'friendsCtrl'

esmfamil.classy.controller
  name: 'friendsNewgameCtrl'

  inject: ['$scope', 'myself', 'games']

  init: ->
    @$.a = true

  newGame: ->
    @games.$add(@self)
      .then (ref) =>
        @self.game = ref.name()

esmfamil.classy.controller
  name: 'friendsInvitedCtrl'

  inject: ['$scope', 'myself', 'games']

  acceptInvite: ->
    game = @people[self].game
    @games[game][self].score = 0
    @games.$save game

esmfamil.classy.controller
  name: 'friendsInviteCtrl'

  inject: ['$scope', 'myself', 'games']

  invite: (id) ->
    @people[id].game = @$.game
    @people.$save id

