var esmfamil,
  __slice = [].slice;

esmfamil = angular.module('esmfamil', ['firebase', 'classy', 'ui.router']);

esmfamil.config(function($stateProvider, $urlRouterProvider) {
  var loadStates;
  $urlRouterProvider.otherwise('/login');
  loadStates = function() {
    var ctrl, path, state, states, template, _i, _len, _results;
    states = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    _results = [];
    for (_i = 0, _len = states.length; _i < _len; _i++) {
      state = states[_i];
      path = state.replace(/\./g, '/');
      template = state.replace(/\./g, '_');
      template = '/' + template + '.html';
      ctrl = state.replace(/\.(.)/g, function(m, c) {
        return c.toUpperCase();
      });
      ctrl += 'Ctrl';
      _results.push($stateProvider.state(state, {
        url: '/' + path,
        controller: ctrl,
        templateUrl: template
      }));
    }
    return _results;
  };
  return loadStates('login', 'friends', 'friends.newgame', 'friends.invited', 'friends.invite', 'game', 'results');
});

//# sourceMappingURL=app.js.map
