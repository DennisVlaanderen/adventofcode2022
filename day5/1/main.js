let fs = require('fs');

const CRLF = '\r\n';

let stacks = [
	['B', 'L', 'D', 'T', 'W', 'C', 'F', 'M'],
	['N', 'B', 'L'],
	['J', 'C', 'H', 'T', 'L', 'V'],
	['S', 'P', 'J', 'W'],
	['Z', 'S', 'C', 'F', 'T', 'L', 'R'],
	['W', 'D', 'G', 'B', 'H', 'N', 'Z'],
	['F', 'M', 'S', 'P', 'V', 'G', 'C', 'N'],
	['W', 'Q', 'R', 'J', 'F', 'V', 'C', 'Z'],
	['R', 'P', 'M', 'L', 'H']
]

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

input = input.slice(9, input.length)
.map((string) => string.split(' '))
.map((array) => {
	let e1 = parseInt(array[1]);
	let e2 = parseInt(array[3]);
	let e3 = parseInt(array[5]);

	return [e1, e2, e3];
});

input.forEach(([c, s, d]) => {
	for (let i = 0; i < c; i++) {
		stacks[d-1].push(stacks[s-1].pop());
	}
});

const top = stacks.map((stack) => stack[stack.length-1]).join('');

console.log(top);
