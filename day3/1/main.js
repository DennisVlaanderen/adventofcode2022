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

// Split each string into two substrings
// Find the character that is in both substrings
input = input.map((string) => {
	let com1 = string.substring(0, string.length / 2);
	let com2 = string.substring(string.length / 2, string.length);

	return com1.split('')
		.filter((char) => com2.includes(char))
		.reduce((acc, char) => {
				if (!acc.includes(char)) {
					acc.push(char);
				}
				return acc;
			}
		)
});

input = input.map((char) => char.charCodeAt(0))
	.map((char) => {
		let val = 0;
		char > 96 ? val = char - 96 : val = char - 38;
		return val;
	}).reduce((acc, val) => acc + val);

console.log(input);
