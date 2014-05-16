esmfamil.classy.controller
  name: 'loginCtrl'

  inject: ['$scope', 'loginSvc', 'people']

  init: ->
    somePeople =
      'hasan@facebook':
        name: 'hassan hassani'
        image: '#'
      'jafar@twitter':
        name: 'jafar yaqubi'
        image: '#'
    for p in somePeople
      @people[p] = somePeople[p]
    @people.$save()

  login: (provider) ->
    login = @loginSvc(provider)
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

