esmfamil.classy.controller({
  name: 'loginCtrl',
  inject: ['$scope', 'loginSvc', 'people'],
  init: function() {
    var p, somePeople, _i, _len;
    somePeople = {
      'hasan@facebook': {
        name: 'hassan hassani',
        image: '#'
      },
      'jafar@twitter': {
        name: 'jafar yaqubi',
        image: '#'
      }
    };
    for (_i = 0, _len = somePeople.length; _i < _len; _i++) {
      p = somePeople[_i];
      this.people[p] = somePeople[p];
    }
    return this.people.$save();
  },
  login: function(provider) {
    var login;
    login = this.loginSvc(provider);
    return login.login().then((function(_this) {
      return function() {
        _this.$.logged_in = true;
        return login.friends().then(function(friends) {
          return _this.$.friends = friends;
        });
      };
    })(this));
  },
  logout: function() {
    this.auth.$logout();
    return this.$rootScope.$on("$firebaseSimpleLogin:logout", (function(_this) {
      return function(e, user) {
        _this.$.friends = [];
        return _this.$.logged_in = false;
      };
    })(this));
  }
});

//# sourceMappingURL=login.js.map
