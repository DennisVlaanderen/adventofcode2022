let fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8')
	.split('\r\n')
	.map((string) => string.split(' '))
	.filter((array) => array[0] !== '')
	.reduce((acc, array) => {
		acc.push(array[0]);
		return acc;
	});

input = input.map(string => string.split(','))
	.map(array => {
		let e1 = array[0].split('-').map(num => parseInt(num));
		let e2 = array[1].split('-').map(num => parseInt(num));

		// determine if the range of either element fits in the other
		return (e1[0] >= e2[0] && e1[1] <= e2[1]) // e1 fits in e2
			|| (e2[0] >= e1[0] && e2[1] <= e1[1]) // e2 fits in e1
			? 1
			: 0;
	}).reduce((acc, val) => acc + val);

console.log(input);
