esmfamil.classy.controller({
  name: 'friendsCtrl',
  inject: ['people', 'games', 'self'],
  init: function() {
    return this.$.people = this.people;
  },
  invite: function(id) {
    this.people[id].game = this.$.game;
    return this.people.$save(id);
  },
  newGame: function() {
    return this.games.$add(self).then((function(_this) {
      return function(ref) {
        return _this.$.game = ref.name();
      };
    })(this));
  },
  acceptInvite: function() {
    var game;
    game = this.people[self].game;
    this.games[game][self].score = 0;
    return this.games.$save(game);
  }
});

//# sourceMappingURL=friends.js.map
