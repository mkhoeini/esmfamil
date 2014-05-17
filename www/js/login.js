esmfamil.classy.controller({
  name: 'loginCtrl',
  inject: ['$scope', 'loginSvc', 'myself', '$state'],
  init: function() {
    return this.$.myself = this.myself;
  },
  watch: {
    '{object}myself': function(val) {
      console.log(val);
      if ((val != null ? val.name : void 0) != null) {
        return this.$state.go('friends.newgame');
      }
    }
  },
  login: function(provider) {
    return this.loginSvc(provider);
  }
});

//# sourceMappingURL=login.js.map
