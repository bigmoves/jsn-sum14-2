// Part a

function copy(obj) {
  var copy = {};
  for (var prop in obj) {
    copy[prop] = obj[prop];
  }
  return copy;
}

function equal(objA, objB) {
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;
  for (var prop in objB) {
    if (!objA.hasOwnProperty(prop)) return false;
    if (objA[prop] !== objB[prop]) return false;
  }
  return true;
}

function similar(objA, objB) {
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;
  for (var prop in objB) {
    if (!objA.hasOwnProperty(prop)) return false;
  }
  return true;
}

function isObject(obj) {
  return typeof obj === 'object';
}

function union(objA, objB) {
  var union = {};
  if (!isObject(objA) || !isObject(objB)) return;
  for (var prop in objB) {
    objA[prop] = objA[prop] || objB[prop];
  }
  return objA;
}

function intersect(objA, objB) {
  var intersect = {};
  if (!isObject(objA) || !isObject(objB)) return;
  for (var prop in objB) {
    if (!objA.hasOwnProperty(prop)) continue;
    intersect[prop] = objA[prop] && objB[prop];
  }
  return intersect;
}

function subtract(objA, objB) {
  var subtract = {};
  if (!isObject(objA) || !isObject(objB)) return;
  for (var prop in objA) {
    if (objB.hasOwnProperty(prop)) { continue; }
    subtract[prop] = objA[prop];
  }
  return subtract;
}

// Part c

var assert = {
  ok: function(expected, msg) {
    if (!expected) {
      console.log(msg + ' failed');
    }
  },
  equal: function(actual, expected, msg) {
    if (!equal(actual, expected)) {
      console.log(msg + ' failed');
    }
  }
}

// equal tests
assert.ok(equal({a: 1}, {a: 1}) === true, 'test 1');
assert.ok(equal({a: 1}, {a: 0, b: 0}) === false, 'test 2');
assert.ok(equal({}, {}) === true, 'test 3');

// similar tests
assert.ok(similar({a: 1}, {a: 0}) === true, 'test 4');
assert.ok(similar({a: 1}, {b: 0}) === false, 'test 5');

// union tests
assert.equal(union({a: 1, b: 0}, {a: 0, c: 0}), {a: 1, b: 0, c: 0}, 'test 6');
assert.equal(union({a: 1}, {a: 1}), {a: 1}, 'test 7');
assert.equal(union({a: 1}, {}), {a: 1}, 'test 8');
assert.equal(union({},{a: 1}), {a: 1}, 'test 9');
assert.ok(union({}, '') === undefined, 'test 10');

// intersection tests
assert.equal(intersect({a: 1, b: 0}, {a: 1}), {a: 1}, 'test 11');
assert.equal(intersect({a: 1}, {a: 1, a: 1}), {a: 1}, 'test 12');
assert.equal(intersect({a: 1, b: 0}, {a: 0, c: 0}), {a: 0}, 'test 13');
assert.ok(intersect({}, '') === undefined, 'test 14');
assert.ok(intersect('', '') === undefined, 'test 15');

// subtraction tests
assert.equal(subtract({a: 1, b: 0}, {a: 0, c: 0}), {b: 0}, 'test 16');
assert.equal(subtract({a: 1, c: 0}, {a: 0, b: 0}), {c: 0}, 'test 17');
assert.equal(subtract({a: 0}, {b: 0}), {a: 0}, 'test 18');
assert.ok(subtract({}, '') === undefined, 'test 19');
assert.ok(subtract('', '') === undefined, 'test 20');

// Part d
// Union and intersection are not symmetric because the values of the
// way that a properties value is assigned and the order that the
// objects are passed into the function.


