
esmfamil.classy.controller
  name: 'friendsCtrl'

  inject: ['people', 'games', 'self']

  init: ->
    @$.people = @people

  invite: (id) ->
    @people[id].game = @$.game
    @people.$save id

  newGame: ->
    @games.$add(self)
      .then (ref) =>
        @$.game = ref.name()

  acceptInvite: ->
    game = @people[self].game
    @games[game][self].score = 0
    @games.$save game

