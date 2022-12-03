// read input.txt
let fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8')
	.split('\r\n')
	.map((string) => string.split(' '))
	.filter((array) => array[0] !== '')
	.reduce((acc, array) => {
		acc.push(array[0]);
		return acc;
	});

// Morph the input into an array of arrays
// Each subarray contains three strings of the original input
let temp = [];
for (let i = 0; i < input.length; i += 3) {
	temp.push([input[i], input[i + 1], input[i + 2]]);
}

// Find the character that is all three strings
let result = temp.map((array) => {
	let a = array[0];
	let b = array[1];
	let c = array[2];
	let result = '';

	for (let i in a) {
		if (b.includes(a[i]) && c.includes(a[i])) {
			result = a[i];
			break;
		}		
	}
	return result;
});

input = result.map((char) => char.charCodeAt(0))
	.map((char) => {
		let val = 0;
		char > 96 ? val = char - 96 : val = char - 38;
		return val;
	}).reduce((acc, val) => acc + val);

console.log(input);
