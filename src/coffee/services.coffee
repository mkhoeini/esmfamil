
esmfamil.value 'firebaseRef', new Firebase "https://fiery-fire-2012.firebaseio.com/"

esmfamil.factory 'players', ($firebase, firebaseRef) ->
  playersRef = firebaseRef.child 'players'
  $firebase playersRef

esmfamil.factory 'games', ($firebase, firebaseRef) ->
  gamesRef = firebaseRef.child 'games'
  $firebase gamesRef

esmfamil.factory 'self', ->
  {}

