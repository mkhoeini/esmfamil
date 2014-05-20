var persian_letters,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

persian_letters = ['ج', 'ث', 'ت', 'پ', 'ب', 'الف', 'ر', 'ذ', 'د', 'خ', 'ح', 'چ', 'ض', 'ص', 'ش', 'س', 'ژ', 'ز', 'ق', 'ف', 'غ', 'ع', 'ظ', 'ط', 'و', 'ن', 'م', 'ل', 'گ', 'ک', 'ی', 'ه'];

esmfamil.classy.controller({
  name: 'gameCtrl',
  inject: ['$scope', '$timeout', 'myself', '$state', 'games', 'players', 'setOnPlayers'],
  init: function() {
    this.$.players = this.players;
    this.$.game = this.games.$child(this.myself.game);
    this.$.data = this.$.game.$child(this.myself.id);
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
    },
    '{object}fields': function(v) {
      var field, name, _results;
      this.$.allFilled = true;
      _results = [];
      for (name in v) {
        field = v[name];
        if (field.value.trim() === '') {
          _results.push(this.$.allFilled = false);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  },
  start: function() {
    var random_letter;
    random_letter = persian_letters[Math.floor(Math.random() * 32)];
    this.myself.letter = random_letter;
    this.setOnPlayers({
      started: true,
      done: false,
      letter: random_letter,
      round: this.myself.round
    });
    this.myself.time = 180;
    this.myself.started = true;
    return this._tick();
  },
  _tick: function() {
    if (!this.myself.started) {
      return;
    }
    this.myself.time -= 1;
    if (this.myself.time <= 0) {
      this.done();
    }
    this.setOnPlayers({
      time: this.myself.time
    });
    return this.$timeout(this._tick.bind(this), 1000);
  },
  done: function() {
    return this.setOnPlayers({
      done: true
    });
  },
  stop: function() {
    this.myself.started = false;
    this.$.started = false;
    this.$.data.$child('fields').$set(this.$.fields);
    return this.$state.go('review');
  }
});

esmfamil.filter('currentlyPlaying', function() {
  return function(players, game) {
    var id, player, _i, _len, _results;
    _results = [];
    for (player = _i = 0, _len = players.length; _i < _len; player = ++_i) {
      id = players[player];
      if (__indexOf.call(game.$getIndex(), id) >= 0 && player.started) {
        _results.push(player);
      }
    }
    return _results;
  };
});

//# sourceMappingURL=game.js.map
