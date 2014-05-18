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
        _this.myself.admin = false;
        return _this.$state.go('game');
      };
    })(this));
  },
  newGame: function() {
    var man;
    man = {};
    man[this.myself.id] = {
      started: false,
      round: 1
    };
    return this.games.$add(man).then((function(_this) {
      return function(ref) {
        _this.myself.game = ref.name();
        _this.myself.admin = true;
        _this.myself.round = 1;
        _this.players.$child(_this.myself.id).$update({
          game: _this.myself.game
        });
        return _this.$state.go('friends.invite');
      };
    })(this));
  }
});

esmfamil.classy.controller({
  name: 'friendsInviteCtrl',
  inject: ['$scope', '$state', 'myself', 'games', 'players'],
  init: function() {
    this.$.players = this.players;
    return this.$.myself = this.myself;
  },
  invite: function(id) {
    var player;
    player = {};
    player[id] = {
      started: false,
      round: 1
    };
    this.games.$child(this.myself.game).$update(player);
    return this.players.$child(id).$update({
      game: this.myself.game
    });
  }
});

esmfamil.filter('onlineFriends', function() {
  return function(players, friends) {
    var id, player, _results;
    if (friends == null) {
      friends = [];
    }
    _results = [];
    for (id in players) {
      player = players[id];
      if ((player.game == null) && __indexOf.call(friends, id) >= 0) {
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
    var id, player, _results;
    _results = [];
    for (id in players) {
      player = players[id];
      if (__indexOf.call(game.$getIndex(), id) >= 0 && id !== myself.id) {
        _results.push(player);
      }
    }
    return _results;
  };
});

//# sourceMappingURL=friends.js.map
