
esmfamil.value 'firebaseRef', new Firebase "https://fiery-fire-2012.firebaseio.com/"

esmfamil.factory 'people', ($firebase, firebaseRef) ->
  peopleRef = firebaseRef.child 'people'
  $firebase peopleRef

esmfamil.factory 'games', ($firebase, firebaseRef) ->
  gamesRef = firebaseRef.child 'games'
  $firebase gamesRef

