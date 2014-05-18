var __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

esmfamil.classy.controller({
  name: 'friendsCtrl'
});

esmfamil.classy.controller({
  name: 'friendsNewgameCtrl',
  inject: ['$scope', '$state', 'myself', 'games', 'players'],
  init: function() {
    return this.players.$child(this.myself.id).$child('game').$on('value', (function(_this) {
      return function(val) {
        var game, _ref;
        game = val != null ? (_ref = val.snapshot) != null ? _ref.value : void 0 : void 0;
        if (!angular.isString(game)) {
          return;
        }
        if (game === _this.myself.game) {
          return;
        }
        _this.myself.game = game;
        return _this.$state.go('friends.invited');
      };
    })(this));
  },
  newGame: function() {
    var man;
    man = {};
    man[this.myself.id] = {
      started: false
    };
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
  accept: function() {
    return this.games.$child(this.myself.game).$child(this.myself.id).$set({
      started: false
    });
  }
});

esmfamil.classy.controller({
  name: 'friendsInviteCtrl',
  inject: ['$scope', 'myself', 'games', 'players'],
  init: function() {
    return this.$.players = this.players;
  },
  invite: function(id) {
    return this.players.$child(id).$update({
      game: this.myself.game
    });
  }
});

esmfamil.filter('onlineFriends', function(myself) {
  return function(players) {
    var id, player, _results;
    _results = [];
    for (id in players) {
      player = players[id];
      if ((player.game == null) && __indexOf.call(myself.friends, id) >= 0) {
        _results.push(player);
      }
    }
    return _results;
  };
});

esmfamil.filter('participants', function(myself, games) {
  var game;
  game = games.$child(myself.game);
  return function(players) {
    var id, player, _i, _len, _ref, _results;
    _ref = players.$getIndex();
    _results = [];
    for (player = _i = 0, _len = _ref.length; _i < _len; player = ++_i) {
      id = _ref[player];
      if (__indexOf.call(game.$getIndex(), id) >= 0) {
        _results.push(player);
      }
    }
    return _results;
  };
});

//# sourceMappingURL=friends.js.map
