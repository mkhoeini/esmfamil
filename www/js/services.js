var FacebookService, GoogleService, LoginService, firebaseRef,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

firebaseRef = new Firebase("https://fiery-fire-2012.firebaseio.com/");

esmfamil.factory('players', function($firebase) {
  var playersRef;
  playersRef = firebaseRef.child('players');
  return $firebase(playersRef);
});

esmfamil.factory('games', function($firebase) {
  var gamesRef;
  gamesRef = firebaseRef.child('games');
  return $firebase(gamesRef);
});

esmfamil.factory('myself', function() {
  return {};
});

esmfamil.factory('loginSvc', function($http, $q, $rootScope, $firebaseSimpleLogin, myself, players) {
  var auth, svc;
  auth = $firebaseSimpleLogin(firebaseRef);
  svc = null;
  return function(provider) {
    switch (provider) {
      case 'google':
        if (svc == null) {
          svc = new GoogleService(auth, $rootScope, $http, $q);
        }
        break;
      case 'facebook':
        if (svc == null) {
          svc = new FacebookService(auth, $rootScope, $http, $q);
        }
    }
    svc.login().then(function(user) {
      players[user.id] = user;
      angular.copy(user, myself);
      return svc.getFriendList().then(function(friends) {
        return myself.friends = friends;
      });
    });
    return svc;
  };
});

LoginService = (function() {
  function LoginService(auth, rootScope, http, q) {
    this.auth = auth;
    this.http = http;
    this.q = q;
    rootScope.$on("$firebaseSimpleLogin:login", this._onLogin.bind(this));
    this.logged_in_promise = this.q.defer();
  }

  LoginService.prototype._onLogin = function(e, user) {
    this.user = user;
    this.logged_in_promise.resolve(this._processUser(user));
    return this.logged_in = true;
  };

  LoginService.prototype.login = function() {
    if (!this.logged_in) {
      this._login();
    }
    return this.logged_in_promise.promise;
  };

  LoginService.prototype.getFriendList = function() {
    return this._friends();
  };

  return LoginService;

})();

GoogleService = (function(_super) {
  __extends(GoogleService, _super);

  function GoogleService() {
    return GoogleService.__super__.constructor.apply(this, arguments);
  }

  GoogleService.prototype._base_url = 'https://www.googleapis.com/';

  GoogleService.prototype._scopes = ['auth/plus.me', 'auth/plus.login'];

  GoogleService.prototype._processUser = function(user) {
    return {
      id: user.id,
      name: user.displayName,
      picture: user.thirdPartyUserData.picture
    };
  };

  GoogleService.prototype._processFriends = function(friends) {
    var f, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = friends.length; _i < _len; _i++) {
      f = friends[_i];
      _results.push(f.id);
    }
    return _results;
  };

  GoogleService.prototype._login = function() {
    var scope;
    return this.auth.$login('google', {
      scope: [
        (function() {
          var _i, _len, _ref, _results;
          _ref = this._scopes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            scope = _ref[_i];
            _results.push(this._base_url + scope);
          }
          return _results;
        }).call(this)
      ].join(' ')
    });
  };

  GoogleService.prototype._friends = function() {
    var deferred;
    deferred = this.q.defer();
    this.http.get('https://www.googleapis.com/plus/v1/people/me/people/visible', {
      headers: {
        Authorization: 'Bearer ' + this.user.accessToken
      }
    }).success((function(_this) {
      return function(data) {
        return deferred.resolve(_this._processFriends(data.items));
      };
    })(this));
    return deferred.promise;
  };

  return GoogleService;

})(LoginService);

FacebookService = (function(_super) {
  __extends(FacebookService, _super);

  function FacebookService() {
    return FacebookService.__super__.constructor.apply(this, arguments);
  }

  FacebookService.prototype._base_url = 'https://graph.facebook.com/';

  FacebookService.prototype._processUser = function(user) {
    return {
      id: user.id,
      name: user.displayName,
      picture: this._pic_url(user.id)
    };
  };

  FacebookService.prototype._pic_url = function(id) {
    return "" + this._base_url + id + "/picture?type=square";
  };

  FacebookService.prototype._processFriends = function(friends) {
    var f, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = friends.length; _i < _len; _i++) {
      f = friends[_i];
      _results.push(f.id);
    }
    return _results;
  };

  FacebookService.prototype._login = function() {
    return this.auth.$login('facebook', {
      scope: 'public_profile,email,user_friends'
    });
  };

  FacebookService.prototype._friends = function() {
    var deferred;
    deferred = this.q.defer();
    this.http.get(this._base_url + 'me/friends' + '?access_token=' + this.user.accessToken).success((function(_this) {
      return function(data) {
        return deferred.resolve(_this._processFriends(data.data));
      };
    })(this));
    return deferred.promise;
  };

  return FacebookService;

})(LoginService);

//# sourceMappingURL=services.js.map
