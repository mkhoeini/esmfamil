esmfamil.value('firebaseRef', new Firebase("https://fiery-fire-2012.firebaseio.com/"));

esmfamil.factory('people', function($firebase, firebaseRef) {
  var peopleRef;
  peopleRef = firebaseRef.child('people');
  return $firebase(peopleRef);
});

esmfamil.factory('games', function($firebase, firebaseRef) {
  var gamesRef;
  gamesRef = firebaseRef.child('games');
  return $firebase(gamesRef);
});

//# sourceMappingURL=services.js.map
