var esmfamil,
  __slice = [].slice;

esmfamil = angular.module('esmfamil', ['firebase', 'classy', 'ui.router']);

esmfamil.config(function($stateProvider, $urlRouterProvider) {
  var loadStates;
  $urlRouterProvider.otherwise('/login');
  loadStates = function() {
    var state, states, _i, _len, _results;
    states = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = states.length; _i < _len; _i++) {
      state = states[_i];
      _results.push($stateProvider.state(state, {
        url: '/' + state,
        controller: state + 'Ctrl',
        templateUrl: "/" + state + ".html"
      }));
    }
    return _results;
  };
  return loadStates('login', 'friends', 'game', 'results');
});

esmfamil.classy.controller({
  name: 'loginCtrl',
  inject: ['$scope', 'loginService'],
  init: function() {},
  login: function(provider) {
    var login;
    login = this.loginService(provider);
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

esmfamil.classy.controller({
  name: 'friendsCtrl'
});

esmfamil.classy.controller({
  name: 'gameCtrl'
});

esmfamil.classy.controller({
  name: 'resultsCtrl'
});

//# sourceMappingURL=app.js.map
