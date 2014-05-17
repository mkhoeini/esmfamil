esmfamil.value('firebaseRef', new Firebase("https://fiery-fire-2012.firebaseio.com/"));

esmfamil.factory('players', function($firebase, firebaseRef) {
  var playersRef;
  playersRef = firebaseRef.child('players');
  return $firebase(playersRef);
});

esmfamil.factory('games', function($firebase, firebaseRef) {
  var gamesRef;
  gamesRef = firebaseRef.child('games');
  return $firebase(gamesRef);
});

esmfamil.factory('self', function() {
  return {};
});

//# sourceMappingURL=services.js.map
