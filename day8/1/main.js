let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

input = input.map((line) => line.split(''));

let output = input.map((line) => line.map((cell) => false));

for (let i = 0; i < input.length; i++) {
	for (let j = 0; j < input[i].length; j++) {
		output[i][j] = isVisible(j, i, input, input[i][j]);
	}
}

// count the positive booleans
output = output.reduce((acc, row) => {
	return acc + row.reduce((acc, cell) => {
		return acc + (cell ? 1 : 0);
	}, 0);
}, 0);

console.log(output);

function isVisible(x, y, grid, current) {
	return visibleLeft(x, y, grid, current)
		|| visibleRight(x, y, grid, current)
		|| visibleUp(x, y, grid, current)
		|| visibleDown(x, y, grid, current);
}

function visibleLeft(x, y, grid, current) {
	for (let i = x - 1; i >= 0; i--) {
		if (grid[y][i] >= current) {
			return false;
		}
	}
	return true;
}

function visibleRight(x, y, grid, current) {
	for (let i = x + 1; i < grid[y].length; i++) {
		if (grid[y][i] >= current) {
			return false;
		}
	}
	return true;
}

function visibleUp(x, y, grid, current) {
	for (let i = y - 1; i >= 0; i--) {
		if (grid[i][x] >= current) {
			return false;
		}
	}
	return true;
}

function visibleDown(x, y, grid, current) {
	for (let i = y + 1; i < grid[0].length; i++) {
		if (grid[i][x] >= current) {
			return false;
		}
	}
	return true;
}
