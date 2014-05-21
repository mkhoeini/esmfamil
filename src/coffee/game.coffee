persian_letters = [
  'ج', 'ث', 'ت', 'پ', 'ب', 'الف',
  'ر', 'ذ', 'د', 'خ', 'ح', 'چ',
  'ض', 'ص', 'ش', 'س', 'ژ', 'ز',
  'ق', 'ف', 'غ', 'ع', 'ظ', 'ط',
  'و', 'ن', 'م', 'ل', 'گ', 'ک',
  'ی', 'ه'
]

esmfamil.classy.controller
  name: 'gameCtrl'

  inject: [
    '$scope', '$timeout', 'myself', '$state',
    'games', 'players', 'setOnUs', 'setOnPlayers'
  ]

  init: ->
    @$.players = @players
    @$.game = @games.$child @myself.game
    @$.data = @$.game.$child @myself.id
    @$.data.$child('time').$bind @$, 'time'
    @$.data.$child('letter').$bind @$, 'letter'
    @$.started = @$.data.$child('started')

    @$.fields =
      'نام':
        value: ''
      'نام خانوادگی':
        value: ''
      'شهر':
        value: ''

    if @myself.admin
      @start()

  watch:
    'data.done': (v) -> @stop() if v
    '{object}fields': (v) ->
      @$.allFilled = true
      for name, field of v
        @$.allFilled = false if field.value.trim() == ''

  start: ->
    random_letter = persian_letters[Math.floor(Math.random()*32)]
    @myself.letter = random_letter

    @setOnPlayers
      started: yes
      done: no
      letter: random_letter
      round: @myself.round

    @myself.time = 180
    @myself.started = true
    @_tick()

  _tick: ->
    return unless @myself.started
    @myself.time -= 1
    if @myself.time <= 0
      @done()
    @setOnPlayers time: @myself.time
    @$timeout @_tick.bind(@), 1000

  done: ->
    @setOnPlayers done: true

  stop: ->
    @myself.started = false
    @setOnUs
      fields: @$.fields
      started: false
      review:
        finished: false
    @$state.go 'review'


esmfamil.filter 'currentlyPlaying', ->
  (players, game) ->
    for id, player in players when id in game.$getIndex() and player.started
      player

