// read input.txt
let fs = require('fs');

let input = fs.readFileSync('input.txt', 'utf8').split('\r\n').map((string) => string.split(' '));

// filter out any items that do not contain 2 strings
input = input.filter((item) => item.length === 2);

// Helper function to calculate the score of a single game
// Results: X = loss, Y = draw, Z = win
const selectWinner = (p1c, result) => {
	const p1 = ["A", "B", "C"];

	let choice = 0;

	if (result === 'Z') 
		choice = p1[mod(p1.indexOf(p1c) + 1, 3)];
	else if (result === 'Y')
		choice = p1[mod(p1.indexOf(p1c), 3)];
	if (result === 'X')
		choice = p1[mod(p1.indexOf(p1c) - 1, 3)];
	
	let score = p1.indexOf(choice) + 1;

	// If the choice ends up a draw, the player receives 3 points + the choice
	if (result === 'Y') {
		return score + 3;
	}

	// If the choice is a win, the player receives 6 points + the choice
	// If the choice is a loss, the player receives 0 points + the choice
	if (result === 'X') {
		return score + 0;
	} else {
		return score + 6;
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
