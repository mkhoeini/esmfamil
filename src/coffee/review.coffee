esmfamil.classy.controller
  name: 'reviewCtrl'

  inject: ['$scope', '$timeout', '$state',
           'myself', 'games', 'players', 'setOnPlayers']

  init: ->
    @$.players = @players
    @$.game = @games.$child @myself.game
    @$.data = @$.game.$child @myself.id
    @$.data.$child('review').$bind @$, 'review'

    @_startReview() if @myself.admin

  watch:
    'review.title': ->
      for pid of review.fields
        review.fields[pid].acceptable = true
      delete review.fields[@myself.id]

  _startReview: ->
    @_review (f for f of @$.data.fields)...

  _review: (field, fields...) ->
    @_calcScores() if @$.review.title?

    review = {}
    review.title = field
    review.fields = {}
    review.time = 5

    for participant in @$.game.$getIndex()
      input = @$.game[participant].fields[field].value
      review.fields[participant].input = input
      review.time += 1.5

    review.time = Math.floor review.time

    @setOnPlayers review: review

    @_tick()

    requiredTime = review.time

    if fields.length > 0
      @$timeout(@_review.bind(@, fields...), requiredTime)
    else
      @$timeout @_reviewFinished, requiredTime

  _tick: ->
    return unless @$.review.time > 0
    @setOnPlayers
      review:
        time: @$.review.time - 1
    @$timeout @_tick.bind(@), 1000

  _reviewFinished: ->
    @$state.go 'results'

  _calcScores: ->
    results = {}
    for person in @$.game.getIndex()
      review = @$.game[person].review.fields
      for reviewd_person, r of review
        results[reviewd_person] ?= 0
        if r.acceptable?
          results[reviewd_person] += r.acceptable ? 1 : -1

    values =
      for pid, result of results when result >= 0
        @$.game[pid].fields[@$.review.title].value

    unique = (v) ->
      values.indexOf(v) == values.lastIndexOf(v)

    for pid, result of results when result >= 0
      person = @$.game.$child pid
      field = person.fields[@$.review.title].value
      score = (person.score || {})[@myself.round] || 0
      person.$child('score').$child(@myself.round).$set(
        score + 5 + 5*unique(field)
      )

