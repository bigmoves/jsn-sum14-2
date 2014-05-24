
var people = {};

people.index = {};

people.meet = function(nameA,nameB) {
  var personA, personB, timesMet;

  // check if the same person
  if (nameA === nameB) return;

  if (!this.index[nameA]) {
    personA = this.index[nameA] = { friends: {} };
  } else {
    personA = this.index[nameA];
  }

  if (!this.index[nameB]) {
    personB = this.index[nameB] = { friends: {} };
  } else {
    personB = this.index[nameB];
  }

  if (!personA.friends[nameB]) {
    personA.friends[nameB] = 1;
    personB.friends[nameA] = 1;
    return 1;
  }

  timesMet = personA.friends[nameB] += 1;
  personB.friends[nameA] += 1;
  return timesMet;
}

people.haveMet = function(nameA,nameB) {
	return !!this.index[nameA].friends[nameB];
}

people.friendsOf = function(name) {
	var person = this.index[name];
  var friends = [];
  if (!person) return;
  for (friend in person.friends) {
    friends.push(friend);
  }
  return friends.sort();
}

// from problem 2
function union(objA, objB) {
  var union = {};
  if (typeof objA !== 'object' || typeof objB !== 'object') return;
  for (var prop in objB) {
    objA[prop] = objA[prop] || objB[prop];
  }
  return objA;
}

people.friendsOfFriendsOf = function(name) {
  var friends = {};
  var friendsOfFriend = {};
  // check if person exists
  if (!this.index[name]) return false;
  // find people who have met name
  for (var person in this.index) {
    if (this.index[person].friends[name]) {
      friends[person] = this.index[person];
    }
  }
  // find friends of friends
  for (var friend in friends) {
    for (var friendOfFriend in friends[friend].friends) {
      friendsOfFriend[friendOfFriend] = this.index[friendOfFriend];
    }
  }
  // remove name from list of friends
  delete friendsOfFriend[name];
  return Object.keys(union(friends, friendsOfFriend)).sort();
}

var assert = {
  ok: function(expected, msg) {
    if (!expected) {
      console.error(msg + ' failed');
    }
  }
};

assert.ok(people.meet('Dan','Ben') === 1, 'test 1');
assert.ok(people.meet('Ben', 'Chad') === 1, 'test 2');
assert.ok(people.index['Dan'].friends['Ben'] = 1, 'test 3');
assert.ok(people.index['Ben'].friends['Dan'] = 1, 'test 4');
assert.ok(people.haveMet('Dan', 'Ben') === true, 'test 5');
assert.ok(people.haveMet('Ben', 'Dan') === true, 'test 6');
assert.ok(people.haveMet('Dan', 'Chad') === false, 'test 7');
assert.ok(people.friendsOf('Dan')[0] === 'Ben', 'test 8');
assert.ok(people.friendsOf('Cris') === undefined, 'test 9');
assert.ok(people.friendsOfFriendsOf('Dan').length === 2, 'test 10')
assert.ok(people.friendsOfFriendsOf('Dan')[0] === 'Ben', 'test 11');
assert.ok(people.friendsOfFriendsOf('Dan')[1] === 'Chad', 'test 12');
