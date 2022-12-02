// read the input of input.txt
let fs = require('fs');

// create a two dimensional array of the input where a double line break is a new array
let input = fs.readFileSync('input.txt', 'utf8').split('\r\n');

// split the array into multiple arrays where the empty string is the separator
let groups = [];
groups.push(input.splice(0, input.indexOf('')));
while (input.length > 0) {
		input.splice(0, 1);
		groups.push(input.splice(0, input.indexOf('')));
}

// for each group turn the strings into integers
groups.forEach((group, index) => {
		groups[index] = group.map((string) => parseInt(string));
});

// for each group calculate the sum of the integers
groups = groups.map((group) => {
	let sum = 0;
	group.forEach((number) => {
		sum += number;
	});
	return sum;
});

// find the largest 3 sums
let largestSums = groups.sort((a, b) => b - a)
	.splice(0, 3)
	.reduce((a, b) => a + b, 0);

// print the top 3 sums
console.log(largestSums);
