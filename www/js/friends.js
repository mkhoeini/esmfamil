esmfamil.classy.controller({
  name: 'friendsCtrl'
});

esmfamil.classy.controller({
  name: 'friendsNewgameCtrl',
  inject: ['$scope', 'myself', 'games'],
  init: function() {
    return this.$.a = true;
  },
  newGame: function() {
    return this.games.$add(this.self).then((function(_this) {
      return function(ref) {
        return _this.self.game = ref.name();
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
  inject: ['$scope', 'myself', 'games'],
  invite: function(id) {
    this.people[id].game = this.$.game;
    return this.people.$save(id);
  }
});

//# sourceMappingURL=friends.js.map
