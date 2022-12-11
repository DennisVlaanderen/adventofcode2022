let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

input = input.map((instruction) => {
	return instruction.split(' ')
});

const ranges = (i) => (i % 40) - 20 === 0;
let X = 1; // the register that holds the current value
let C = 1; // the current cycle
let result = 0; 

input.forEach((instruction) => {
	let [command, value] = instruction;
	if (command === 'addx') {
		result += ranges(C) ? C * X : 0;
		C++;
		result += ranges(C) ? C * X : 0;
		X += parseInt(value);
		C++;
	} else {
		result += ranges(C) ? C * X : 0;
		C++;
	}
})

console.log(result);
