// read input.txt
let fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map((string) => string.split(' '));

// filter out any items that do not contain 2 strings
input = input.filter((item) => item.length === 2);

// Helper function to calculate the score of a single game
const selectWinner = (p1c, p2c) => {
	const p1 = ["A", "B", "C"];
	const p2 = ["X", "Y", "Z"];

	let choice = p2.indexOf(p2c) + 1;

	const x = p1.indexOf(p1c);
	const y = p2.indexOf(p2c);

	// If the choice ends up a draw, the player receives 3 points + the choice
	if (x === y) {
		return choice + 3;
	}

	// If the choice is a win, the player receives 6 points + the choice
	// If the choice is a loss, the player receives 0 points + the choice
	if (mod(x - y, 3) < 2) {
		return choice + 0;
	} else {
		return choice + 6;
	}
}

// Helper function to calculate the modulo of a negative number
function mod(n, m) {
	return (n % m) < 0 ? (n % m) + m : (n % m);
}

let score = input
	.map((game) => selectWinner(game[0], game[1]))
	.reduce((a, b) => a + b);

console.log(score);
