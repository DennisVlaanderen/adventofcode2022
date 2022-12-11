let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

input = input.map((instruction) => {
	return instruction.split(' ')
});

const write = (i, x) => {
	const target = i.length % 40 === x - 1
		|| i.length % 40 === x + 1
		|| i.length % 40 === x;
	
	if (target) {
		i.push('#');
	} else {
		i.push('.');
	}
};
let X = 1; // the register that holds the current value
let C = 1; // the current cycle
let result = []; 

input.forEach((instruction) => {
	let [command, value] = instruction;
	if (command === 'addx') {
		write(result, X);
		C++;
		write(result, X);
		X += parseInt(value);
		C++;
	} else {
		write(result, X);
		C++;
	}
})

for (let i = 0; i < result.length; i += 40) {
	console.log(result.slice(i, i + 40).join(''));
}
