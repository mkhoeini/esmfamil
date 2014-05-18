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
    '$scope', '$timeout', 'myself',
    'games', 'players', 'setOnPlayers'
  ]

  init: ->
    @$.data = @games.$child(@myself.game).$child @myself.id
    @$.data.$child('time').$bind @$, 'time'
    @$.data.$child('letter').$bind @$, 'letter'
    @$.data.$child('started').$bind @$, 'started'

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

  start: ->
    random_letter = persian_letters[Math.floor(Math.random()*32)]
    @myself.letter = random_letter

    @setOnPlayers
      started: yes
      letter: random_letter
      round: @myself.round

    @myself.time = 5
    @myself.started = true
    @_tick()

  _tick: ->
    return unless @myself.started
    @myself.time -= 1
    if @myself.time <= 0
      @setOnPlayers done: true
    @setOnPlayers time: @myself.time
    @$timeout @_tick.bind(@), 1000

  stop: ->
    @myself.started = false
    @$.started = false

