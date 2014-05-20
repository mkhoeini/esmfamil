esmfamil.classy.controller({
  name: 'resultsCtrl',
  inject: ['$scope', '$state', 'myself', 'setOnPlayers', 'games', 'players'],
  init: function() {
    var _i, _ref, _results;
    this.$.game = this.games.$child(this.myself.game);
    this.$.data = this.$.game.$child(this.myself.id);
    this.$.players = this.players;
    this.$.rounds = (function() {
      _results = [];
      for (var _i = 1, _ref = this.$.data.round; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
    return this.$.admin = this.myself.admin;
  },
  replay: function() {
    this.myself.round += 1;
    return this.setOnPlayers({
      done: false,
      started: true,
      fields: {},
      round: this.myself.round
    });
  },
  watch: {
    'data.started': function(v) {
      if (v) {
        return this.$state.go('game');
      }
    }
  }
});

//# sourceMappingURL=results.js.map
