let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here
input = input.map((line) => line.split(''));

let output = input.map((line) => line.map((cell) => 0));

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		output[i][j] = getScenicScore(j, i, input, input[i][j]);
	}
}

// find the highest value in the forest
output = output.map((row) => {
	return row.reduce((a, b) => {
		return Math.max(a, b);
	}, 0);
}).reduce((a, b) => {
	return Math.max(a, b);
}, 0);

console.log(output);

function getScenicScore(x, y, grid, current) {
	return visibleLeft(x, y, grid, current)
		* visibleRight(x, y, grid, current)
		* visibleUp(x, y, grid, current)
		* visibleDown(x, y, grid, current);
}

function visibleLeft(x, y, grid, current) {

	for (let i = x - 1; i >= 0; i--) {
		if (grid[y][i] >= current || i === 0) {
			return isNaN(Math.abs(i - x)) ? 0 : Math.abs(i - x);
		}
	}
	return 0;
}

function visibleRight(x, y, grid, current) {
	for (let i = x + 1; i < grid[y].length; i++) {
		if (grid[y][i] >= current || i === grid[y].length - 1) {
			return isNaN(Math.abs(i - x)) ? 0 : Math.abs(i - x);
		}
	}
	return 0;
}

function visibleUp(x, y, grid, current) {
	for (let i = y - 1; i >= 0; i--) {
		if (grid[i][x] >= current || i === 0) {
			return isNaN(Math.abs(i - y)) ? 0 : Math.abs(i - y);
		}
	}
	return 0;
}

function visibleDown(x, y, grid, current) {
	for (let i = y + 1; i < grid[0].length; i++) {
		if (grid[i][x] >= current || i === grid[0].length - 1) {
			return isNaN(Math.abs(i - y)) ? 0 : Math.abs(i - y);
		}
	}
	return 0;
}
