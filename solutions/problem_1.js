// Part a

// using a class so that new instances can be made for tests
var PseudoArray = function() {
  this.length = 0;
};

PseudoArray.prototype = {

  pop: function() {
    var lastIndex = Math.max(0, this.length - 1);
    var value = this[lastIndex];
    if (!this.length) return;
    delete this[lastIndex];
    this.length = lastIndex;
    return value;
  },

  push: function() {
    var args = Array.prototype.slice.call(arguments);
    for (var i = 0; i < args.length; i++) {
      this.length += 1;
      this[this.length - 1] = args[i];
    }
    return this.length;
  },

  join: function(separator) {
    var string = '';
    separator = separator || ',';
    if (!this.length) return '';
    for (var i = 0; i < this.length; i++) {
      if (this.length - 1 === i) {
        return string + this[i];
      }
      string += this[i] + separator;
    }
  }
};

function assert(claim, message) {
  if (!claim) {
    console.error(message);
  }
}

// Part b
var arrayB = new PseudoArray();
arrayB.length = 0;
arrayB.push('c');
arrayB.push('b');
arrayB.push('a');
arrayB.pop();
assert(arrayB.join('a') === 'cab', 'test 1');

// Part c
var arrayC = new PseudoArray();
assert(arrayC.join(arrayC.push(arrayC.push('a'))) === 'a21', 'test 2');

