esmfamil.classy.controller
  name: 'reviewCtrl'

  inject: ['$scope', '$timeout', '$state', 'setOnUs', 'setOnPerson',
           'myself', 'games', 'players', 'setOnPlayers']

  init: ->
    @$.players = @players
    @$.game = @games.$child @myself.game
    @$.data = @$.game.$child @myself.id
    @$.review = @$.data.$child('review')

    @_startReview() if @myself.admin

  accept: (pid, v = true) ->
    @setOnUs "review.fields.#{pid}.acceptable", v

  watch:
    'review.title': (v) ->
      return unless v? and @$.review.fields?
      for pid of @$.review.fields
        @accept pid

    'review.finished': (v) ->
      @$state.go 'results' if v

  _startReview: ->
    @$.game.$on 'loaded', =>
      @_review (f for f of @$.data.fields)...

  _review: (field, fields...) ->
    review = {}
    review.title = field
    review.fields = {}
    review.time = 5

    console.log @$.game
    for participant in @$.game.$getIndex()
      input = @$.game.$child(participant)
        .$child('fields').$child(field).value
      review.fields[participant] = input: input
      review.time += 1.5

    review.time = Math.floor review.time

    @setOnPlayers review: review

    if fields.length > 0
      @_tick @_nextReview.bind(@, fields...)
    else
      @_tick @_reviewFinished.bind(@)

  _nextReview: ->
    @_calcScores()
    @_review arguments...

  _tick: (next) ->
    if @$.review.time <= 0
      next()
      return

    @setOnPlayers
      review:
        time: @$.review.time - 1

    @$timeout @_tick.bind(@, next), 1000

  _reviewFinished: ->
    @_calcScores()
    @setOnPlayers
      review:
        finished: true

  _calcScores: ->
    results = {}
    for person in @$.game.$getIndex()
      review_fields = @$.game[person].review.fields
      for reviewd_person, review of review_fields
        results[reviewd_person] ?= 0
        results[reviewd_person] += if review.acceptable then 1 else -1

    values =
      for pid, result of results when result >= 0
        @$.game[pid].fields[@$.review.title].value

    unique = (v) ->
      values.indexOf(v) == values.lastIndexOf(v)

    for pid, result of results when result >= 0
      person = @$.game.$child pid
      field = person.fields[@$.review.title].value
      score = person.score?['r'+@myself.round] || 0
      @setOnPerson pid, "score.r#{@myself.round}",
        score + 5 + 5*unique(field)

