let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

let positionHead = { x: 0, y: 0 };
let positionTail = []; 

for (let i = 0; i < 9; i++) {
	positionTail.push({ x: 0, y: 0 });
}

const moveHead = (dir, i) => {
	switch (dir) {
		case 'U': positionHead.y += 1; break;
		case 'D': positionHead.y -= 1; break;
		case 'L': positionHead.x -= 1; break;
		case 'R': positionHead.x += 1; break;
	}

	for (let i = 0; i < 9; i++) {
		moveTail(i);

		if (i === 8) {
			visited.add(`${positionTail[i].x},${positionTail[i].y}`);
		}
	}
}

const moveTail = (i) => {
	let referencePosition = { x: 0, y: 0 };

	let tempPosition = { ...positionTail[i] };
	
	if (i > 0) {
		referencePosition.x = positionTail[i - 1].x;
		referencePosition.y = positionTail[i - 1].y;
	} else {
		referencePosition.x = positionHead.x;
		referencePosition.y = positionHead.y;
	}

	let differenceX = Math.abs(referencePosition.x - tempPosition.x);
	let differenceY = Math.abs(referencePosition.y - tempPosition.y);

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

	positionTail[i].x = tempPosition.x;
	positionTail[i].y = tempPosition.y;
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
