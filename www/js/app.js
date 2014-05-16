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

//# sourceMappingURL=app.js.map
