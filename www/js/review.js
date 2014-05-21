var __slice = [].slice;

esmfamil.classy.controller({
  name: 'reviewCtrl',
  inject: ['$scope', '$timeout', '$state', 'setOnUs', 'setOnPerson', 'myself', 'games', 'players', 'setOnPlayers'],
  init: function() {
    this.$.players = this.players;
    this.$.game = this.games.$child(this.myself.game);
    this.$.data = this.$.game.$child(this.myself.id);
    this.$.review = this.$.data.$child('review');
    if (this.myself.admin) {
      return this._startReview();
    }
  },
  accept: function(pid, v) {
    if (v == null) {
      v = true;
    }
    return this.setOnUs("review.fields." + pid + ".acceptable", v);
  },
  watch: {
    'review.title': function(v) {
      var pid, _results;
      if (!((v != null) && (this.$.review.fields != null))) {
        return;
      }
      _results = [];
      for (pid in this.$.review.fields) {
        _results.push(this.accept(pid));
      }
      return _results;
    },
    'review.finished': function(v) {
      if (v) {
        return this.$state.go('results');
      }
    }
  },
  _startReview: function() {
    return this.$.game.$on('loaded', (function(_this) {
      return function() {
        var f;
        return _this._review.apply(_this, (function() {
          var _results;
          _results = [];
          for (f in this.$.data.fields) {
            _results.push(f);
          }
          return _results;
        }).call(_this));
      };
    })(this));
  },
  _review: function() {
    var field, fields, input, participant, review, _i, _len, _ref, _ref1;
    field = arguments[0], fields = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    review = {};
    review.title = field;
    review.fields = {};
    review.time = 5;
    _ref = this.$.game.$getIndex();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      participant = _ref[_i];
      input = this.$.game[participant].fields[field].value;
      review.fields[participant] = {
        input: input
      };
      review.time += 1.5;
    }
    review.time = Math.floor(review.time);
    this.setOnPlayers({
      review: review
    });
    if (fields.length > 0) {
      return this._tick((_ref1 = this._nextReview).bind.apply(_ref1, [this].concat(__slice.call(fields))));
    } else {
      return this._tick(this._reviewFinished.bind(this));
    }
  },
  _nextReview: function() {
    this._calcScores();
    return this._review.apply(this, arguments);
  },
  _tick: function(next) {
    if (this.$.review.time <= 0) {
      next();
      return;
    }
    this.setOnPlayers({
      review: {
        time: this.$.review.time - 1
      }
    });
    return this.$timeout(this._tick.bind(this, next), 1000);
  },
  _reviewFinished: function() {
    this._calcScores();
    return this.setOnPlayers({
      review: {
        finished: true
      }
    });
  },
  _calcScores: function() {
    var field, person, pid, result, results, review, review_fields, reviewd_person, score, unique, values, _i, _len, _ref, _ref1, _results;
    results = {};
    _ref = this.$.game.$getIndex();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      person = _ref[_i];
      review_fields = this.$.game[person].review.fields;
      for (reviewd_person in review_fields) {
        review = review_fields[reviewd_person];
        if (results[reviewd_person] == null) {
          results[reviewd_person] = 0;
        }
        results[reviewd_person] += review.acceptable ? 1 : -1;
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
      score = ((_ref1 = person.score) != null ? _ref1['r' + this.myself.round] : void 0) || 0;
      _results.push(this.setOnPerson(pid, "score.r" + this.myself.round, score + 5 + 5 * unique(field)));
    }
    return _results;
  }
});

//# sourceMappingURL=review.js.map
