var __slice = [].slice;

esmfamil.classy.controller({
  name: 'reviewCtrl',
  inject: ['$scope', '$timeout', '$state', 'myself', 'games', 'players', 'setOnPlayers'],
  init: function() {
    this.$.players = this.players;
    this.$.game = this.games.$child(this.myself.game);
    this.$.data = this.$.game.$child(this.myself.id);
    this.$.data.$child('review').$bind(this.$, 'review');
    if (this.myself.admin) {
      return this._startReview();
    }
  },
  watch: {
    'review.title': function() {
      var pid;
      for (pid in review.fields) {
        review.fields[pid].acceptable = true;
      }
      return delete review.fields[this.myself.id];
    }
  },
  _startReview: function() {
    var f;
    return this._review.apply(this, (function() {
      var _results;
      _results = [];
      for (f in this.$.data.fields) {
        _results.push(f);
      }
      return _results;
    }).call(this));
  },
  _review: function() {
    var field, fields, input, participant, requiredTime, review, _i, _len, _ref, _ref1;
    field = arguments[0], fields = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    if (this.$.review.title != null) {
      this._calcScores();
    }
    review = {};
    review.title = field;
    review.fields = {};
    review.time = 5;
    _ref = this.$.game.$getIndex();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      participant = _ref[_i];
      input = this.$.game[participant].fields[field].value;
      review.fields[participant].input = input;
      review.time += 1.5;
    }
    review.time = Math.floor(review.time);
    this.setOnPlayers({
      review: review
    });
    this._tick();
    requiredTime = review.time;
    if (fields.length > 0) {
      return this.$timeout((_ref1 = this._review).bind.apply(_ref1, [this].concat(__slice.call(fields))), requiredTime);
    } else {
      return this.$timeout(this._reviewFinished, requiredTime);
    }
  },
  _tick: function() {
    if (!(this.$.review.time > 0)) {
      return;
    }
    this.setOnPlayers({
      review: {
        time: this.$.review.time - 1
      }
    });
    return this.$timeout(this._tick.bind(this), 1000);
  },
  _reviewFinished: function() {
    return this.$state.go('results');
  },
  _calcScores: function() {
    var field, person, pid, r, result, results, review, reviewd_person, score, unique, values, _i, _len, _ref, _ref1, _results;
    results = {};
    _ref = this.$.game.getIndex();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      person = _ref[_i];
      review = this.$.game[person].review.fields;
      for (reviewd_person in review) {
        r = review[reviewd_person];
        if (results[reviewd_person] == null) {
          results[reviewd_person] = 0;
        }
        if (r.acceptable != null) {
          results[reviewd_person] += (_ref1 = r.acceptable) != null ? _ref1 : {
            1: -1
          };
        }
      }
    }
    values = (function() {
      var _results;
      _results = [];
      for (pid in results) {
        result = results[pid];
        if (result >= 0) {
          _results.push(this.$.game[pid].fields[this.$.review.title].value);
        }
      }
      return _results;
    }).call(this);
    unique = function(v) {
      return values.indexOf(v) === values.lastIndexOf(v);
    };
    _results = [];
    for (pid in results) {
      result = results[pid];
      if (!(result >= 0)) {
        continue;
      }
      person = this.$.game.$child(pid);
      field = person.fields[this.$.review.title].value;
      score = (person.score || {})[this.myself.round] || 0;
      _results.push(person.$child('score').$child(this.myself.round).$set(score + 5 + 5 * unique(field)));
    }
    return _results;
  }
});

//# sourceMappingURL=review.js.map
