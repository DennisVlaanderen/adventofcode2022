let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)
	.reduce((acc, string) => {
		acc += string;
		return acc;
	}, '');

// start challenge specific code here

// find the first character that has three unique characters before it

for (let i = 0; i < input.length; i++) {
	let slice = input.slice(i, i + 4);
	if (new Set(slice).size === 4) {
		console.log(i + 4);
		return;
	}
}
