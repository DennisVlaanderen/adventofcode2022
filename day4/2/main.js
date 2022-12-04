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

		// extend the range of the elements to fill the gap
		e1 = Array.apply(null, { length: e1[1] - e1[0] + 1 }).map((_, i) => e1[0] + i);
		e2 = Array.apply(null, { length: e2[1] - e2[0] + 1 }).map((_, i) => e2[0] + i);

		// if any element in e1 is in e2, return 1
		return e1.some(num => e2.includes(num)) ? 1 : 0;
		
	}).reduce((acc, val) => acc + val);

console.log(input);
