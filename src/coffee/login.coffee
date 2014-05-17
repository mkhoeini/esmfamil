esmfamil.classy.controller
  name: 'loginCtrl'

  inject: ['$scope', 'loginSvc', 'myself', '$state']

  init: ->
    @$.myself = @myself

  watch:
    '{object}myself': (val) ->
      console.log val
      @$state.go 'friends.newgame' if val?.name?

  login: (provider) ->
    @loginSvc(provider)

