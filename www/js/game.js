var persian_letters;

persian_letters = ['ج', 'ث', 'ت', 'پ', 'ب', 'الف', 'ر', 'ذ', 'د', 'خ', 'ح', 'چ', 'ض', 'ص', 'ش', 'س', 'ژ', 'ز', 'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'و', 'ن', 'م', 'ل', 'گ', 'ک', 'ی', 'ه'];

esmfamil.classy.controller({
  name: 'gameCtrl',
  inject: ['$scope', '$timeout', 'myself', 'games', 'players', 'setOnPlayers'],
  init: function() {
    this.$.data = this.games.$child(this.myself.game).$child(this.myself.id);
    this.$.data.$child('time').$bind(this.$, 'time');
    this.$.data.$child('letter').$bind(this.$, 'letter');
    this.$.data.$child('started').$bind(this.$, 'started');
    this.$.fields = {
      'نام': {
        value: ''
      },
      'نام خانوادگی': {
        value: ''
      },
      'شهر': {
        value: ''
      }
    };
    if (this.myself.admin) {
      return this.start();
    }
  },
  watch: {
    'data.done': function(v) {
      if (v) {
        return this.stop();
      }
    }
  },
  start: function() {
    var random_letter;
    random_letter = persian_letters[Math.floor(Math.random() * 32)];
    this.myself.letter = random_letter;
    this.setOnPlayers({
      started: true,
      letter: random_letter,
      round: this.myself.round
    });
    this.myself.time = 5;
    this.myself.started = true;
    return this._tick();
  },
  _tick: function() {
    if (!this.myself.started) {
      return;
    }
    this.myself.time -= 1;
    if (this.myself.time <= 0) {
      this.setOnPlayers({
        done: true
      });
    }
    this.setOnPlayers({
      time: this.myself.time
    });
    return this.$timeout(this._tick.bind(this), 1000);
  },
  stop: function() {
    this.myself.started = false;
    return this.$.started = false;
  }
});

//# sourceMappingURL=game.js.map
