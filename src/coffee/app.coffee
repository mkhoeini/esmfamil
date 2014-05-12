esmfamil = angular.module 'esmfamil', ['firebase', 'classy']

esmfamil.classy.controller

  name: 'loginCtrl'

  inject: ['$scope', '$http', '$rootScope', '$firebase', '$firebaseSimpleLogin']

  init: ->
    @ref = new Firebase "https://fiery-fire-2012.firebaseio.com/"
    @$.auth = @$firebaseSimpleLogin @ref

    @$rootScope.$on "$firebaseSimpleLogin:login", @_onLogin

  _onLogin: (e, user) ->
    @$.logged_in = true
    switch user.provider
      when 'google'
        @googleFriendSetter user

  googleLogin: ->
    @$.auth.$login('google', {
      scope: 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/plus.login'
    })

  googleFriendSetter: (user) ->
    @$http.get('https://www.googleapis.com/plus/v1/people/me/people/visible',
      headers:
        'Authorization': 'Bearer ' + user.accessToken
    ).success (data) =>
      @$.friends = data.items

  logout: ->
    @$.auth.$logout()
    @$rootScope.$on("$firebaseSimpleLogin:logout", (e, user) =>
      @$.friends = []
      @$.logged_in = false
    )
