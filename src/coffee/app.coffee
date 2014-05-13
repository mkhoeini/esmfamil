esmfamil = angular.module 'esmfamil', ['firebase', 'classy']

esmfamil.classy.controller

  name: 'loginCtrl'

  inject: ['$scope', 'loginService']

  init: ->

  login: (provider) ->
    login = @loginService(provider)
    login.login().then =>
      @$.logged_in = true
      login.friends().then (friends) =>
        @$.friends = friends

  logout: ->
    @auth.$logout()
    @$rootScope.$on("$firebaseSimpleLogin:logout", (e, user) =>
      @$.friends = []
      @$.logged_in = false
    )


esmfamil.factory 'loginService', ($http, $q, $rootScope, $firebaseSimpleLogin) ->
  ref = new Firebase "https://fiery-fire-2012.firebaseio.com/"
  auth = $firebaseSimpleLogin ref
  service = {}
  (provider) ->
    switch provider
      when 'google' then service['google'] ?= new GoogleService auth, $rootScope, $http, $q

class LoginService
  constructor: (@auth, rootScope, @http, @q) ->
    rootScope.$on "$firebaseSimpleLogin:login", @_onLogin.bind @
    @logged_in_promise = @q.defer()

  _onLogin: (e, user) ->
    @user = user
    @logged_in_promise.resolve true
    @logged_in = true

  login: ->
    @_login() unless @logged_in
    @logged_in_promise.promise

  friends: ->
    @_friends()

class GoogleService extends LoginService
  _base_url: 'https://www.googleapis.com/'
  _scopes: ['auth/plus.me', 'auth/plus.login']

  _login: ->
    @auth.$login 'google',
      scope: [@_base_url+scope for scope in @_scopes].join ' '

  _friends: ->
    deferred = @q.defer()
    @http.get('https://www.googleapis.com/plus/v1/people/me/people/visible',
      headers:
        Authorization: 'Bearer ' + @user.accessToken
    ).success (data) => deferred.resolve data.items
    deferred.promise
