esmfamil.classy.controller({
  name: 'resultsCtrl',
  inject: ['$scope', 'myself', 'games', 'players'],
  init: function() {
    var _i, _ref, _results;
    this.$.game = this.games[this.myself.game];
    this.$.players = this.players;
    return this.$.rounds = (function() {
      _results = [];
      for (var _i = 1, _ref = this.$.game[this.myself.id].round; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--){ _results.push(_i); }
      return _results;
    }).apply(this);
  }
});

//# sourceMappingURL=results.js.map
