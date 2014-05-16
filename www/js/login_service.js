var FacebookService, GoogleService, LoginService,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

esmfamil.factory('loginSvc', function($http, $q, $rootScope, $firebaseSimpleLogin) {
  var auth, ref, service;
  ref = new Firebase("https://fiery-fire-2012.firebaseio.com/");
  auth = $firebaseSimpleLogin(ref);
  service = {};
  return function(provider) {
    switch (provider) {
      case 'google':
        return service['google'] != null ? service['google'] : service['google'] = new GoogleService(auth, $rootScope, $http, $q);
      case 'facebook':
        return service['facebook'] != null ? service['facebook'] : service['facebook'] = new FacebookService(auth, $rootScope, $http, $q);
    }
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
    this.logged_in_promise.resolve(true);
    return this.logged_in = true;
  };

  LoginService.prototype.login = function() {
    if (!this.logged_in) {
      this._login();
    }
    return this.logged_in_promise.promise;
  };

  LoginService.prototype.friends = function() {
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
        return deferred.resolve(data.items);
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
        var item, _i, _len, _ref;
        _ref = data.data;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          item.displayName = item.name;
          item.image = {};
          item.image['url'] = _this._base_url + item.id + '/picture?type=square';
        }
        return deferred.resolve(data.data);
      };
    })(this));
    return deferred.promise;
  };

  return FacebookService;

})(LoginService);

//# sourceMappingURL=login_service.js.map
