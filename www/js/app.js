var esmfamil;

esmfamil = angular.module('esmfamil', ['firebase', 'classy']);

esmfamil.classy.controller({
  name: 'loginCtrl',
  inject: ['$scope', '$http', '$rootScope', '$firebase', '$firebaseSimpleLogin'],
  init: function() {
    this.ref = new Firebase("https://fiery-fire-2012.firebaseio.com/");
    this.$.auth = this.$firebaseSimpleLogin(this.ref);
    return this.$rootScope.$on("$firebaseSimpleLogin:login", this._onLogin);
  },
  _onLogin: function(e, user) {
    this.$.logged_in = true;
    switch (user.provider) {
      case 'google':
        return this.googleFriendSetter(user);
    }
  },
  googleLogin: function() {
    return this.$.auth.$login('google', {
      scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login'
    });
  },
  googleFriendSetter: function(user) {
    return this.$http.get('https://www.googleapis.com/plus/v1/people/me/people/visible', {
      headers: {
        'Authorization': 'Bearer ' + user.accessToken
      }
    }).success((function(_this) {
      return function(data) {
        return _this.$.friends = data.items;
      };
    })(this));
  },
  logout: function() {
    this.$.auth.$logout();
    return this.$rootScope.$on("$firebaseSimpleLogin:logout", (function(_this) {
      return function(e, user) {
        _this.$.friends = [];
        return _this.$.logged_in = false;
      };
    })(this));
  }
});

//# sourceMappingURL=app.js.map
