var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

esmfamil.classy.controller({
  name: 'friendsCtrl'
});

esmfamil.classy.controller({
  name: 'friendsNewgameCtrl',
  inject: ['$scope', '$state', 'myself', 'games', 'players'],
  init: function() {},
  newGame: function() {
    var man;
    man = {};
    man[this.myself.id] = this.myself;
    return this.games.$add(man).then((function(_this) {
      return function(ref) {
        _this.myself.game = ref.name();
        _this.players.$child(_this.myself.id).$update({
          game: _this.myself.game
        });
        return _this.$state.go('friends.invite');
      };
    })(this));
  }
});

esmfamil.classy.controller({
  name: 'friendsInvitedCtrl',
  inject: ['$scope', 'myself', 'games'],
  acceptInvite: function() {
    var game;
    game = this.people[self].game;
    this.games[game][self].score = 0;
    return this.games.$save(game);
  }
});

esmfamil.classy.controller({
  name: 'friendsInviteCtrl',
  inject: ['$scope', 'myself', 'games', 'players'],
  init: function() {
    return this.$.players = this.players;
  },
  watch: {
    '{object}players': function(val) {
      this.$.friends = this._getOnlineFriends(val);
      return console.log(this.$.friends);
    }
  },
  _getOnlineFriends: function(friends) {
    var id, _i, _len, _ref, _results;
    _ref = friends.$getIndex();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      if ((friends[id].game == null) && __indexOf.call(this.myself.friends, id) >= 0) {
        _results.push(friends[id]);
      }
    }
    return _results;
  },
  invite: function(id) {
    this.people[id].game = this.$.game;
    return this.people.$save(id);
  }
});

//# sourceMappingURL=friends.js.map
