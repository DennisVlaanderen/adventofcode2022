let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

let positionHead = { x: 0, y: 0 };
let positionTail = { x: 0, y: 0 };

const moveHead = (dir, i) => {
	switch (dir) {
		case 'U': positionHead.y += 1; break;
		case 'D': positionHead.y -= 1; break;
		case 'L': positionHead.x -= 1; break;
		case 'R': positionHead.x += 1; break;
	}

	moveTail();

	visited.add(`${positionTail.x},${positionTail.y}`);
}

const moveTail = () => {
	let referencePosition = { x: positionHead.x, y: positionHead.y };
	let tempPosition = { x: positionTail.x, y: positionTail.y };

	let differenceX = Math.abs(referencePosition.x - positionTail.x);
	let differenceY = Math.abs(referencePosition.y - positionTail.y);

	if (differenceX > 1 || differenceY > 1) {
		if (differenceX > 1 && !differenceY) {
			tempPosition.x += referencePosition.x - tempPosition.x > 0 ? 1 : -1;
		} else if (differenceY > 1 && !differenceX) {
			tempPosition.y += referencePosition.y - tempPosition.y > 0 ? 1 : -1;
		} else {
			tempPosition.x += referencePosition.x - tempPosition.x > 0 ? 1 : -1;
			tempPosition.y += referencePosition.y - tempPosition.y > 0 ? 1 : -1;
		}
	}

	positionTail.x = tempPosition.x;
	positionTail.y = tempPosition.y;
}

let visited = new Set(['0,0']);

input.map((line) => line.split(' '))
	.map((move) => {
		let instruction = move[0];
		let steps = parseInt(move[1]);

		for (let n = 0; n < steps; n++) {
			moveHead(instruction, n);
		}
	});

console.log(visited.size);


