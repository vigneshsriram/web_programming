const uuidv1 = require('uuid/v1');
var a = uuidv1();

console.log(a)

var timestamp = Math.floor(Date.now/1000)
console.log(new Date().toString())