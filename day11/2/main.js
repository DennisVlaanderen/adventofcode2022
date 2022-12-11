// input parsing
let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF + CRLF)
	.filter(string => string.length !== 0)
	.map(string => string.split(CRLF))
	.map((monkeyParams) => {
		return monkeyParams.map((string) => string.replace(/\s{2}/gm, ''))
	});

// start challenge specific code here

const ROUNDS = 10000;

class Monkey {

	inspectCount = 0;
	
	constructor(id, startingItems, operation, test, trueTest, falseTest) {
		this.id = id
		this.startingItems = startingItems;
		this.operation = operation;
		this.test = test;
		this.trueTest = trueTest;
		this.falseTest = falseTest;
	}

	inspect() {
		return this.startingItems.map((item) => {
			this.inspectCount++;
			return this.runOperation(item)
		});
	}

	runOperation(item) {
		// transform the normal operation into a stack operation
		let stack = [...this.operation];
		stack[1] = stack.splice(2, 2, stack[1])[0];
		stack = stack.map((operand) => {
			if (operand === 'old') {
				return item;
			} else if (Number.isInteger(parseInt(operand))) {
				return parseInt(operand);
			}
			return operand;
		});

		// run the operation
		let result = 0;
		switch (stack.pop()) {
			case '+':
				result = (stack.pop() + stack.pop());
				break;
			case '*':
				result = (stack.pop() * stack.pop());
				break;
		}
		return result % mod;
	}
}

let monkeys = [];
let mod = 1;

// create the monkeys based on the input
input.forEach((monkey) => {
	let id = parseInt(monkey[0].split(' ')[1]);
	let startingItems = [...monkey[1].matchAll(/(\d+)/gm)].map(match => parseInt(match[0]));
	let operation = monkey[2].split(' ').slice(-3);
	let test = parseInt(monkey[3].split(' ').slice(-1)[0]);
	let trueTest = parseInt(monkey[4].slice(-1)[0]);
	let falseTest = parseInt(monkey[5].slice(-1)[0]);

	mod *= test;

	monkeys.push(new Monkey(id, startingItems, operation, test, trueTest, falseTest));

});


// run the 20 rounds
for (let i = 0; i < ROUNDS; i++) {
	monkeys.forEach((monkey) => {
		let newLevels = monkey.inspect();

		monkey.startingItems = newLevels;

		while (monkey.startingItems.length > 0) {
			let item = monkey.startingItems.pop();
			item % monkey.test === 0
				?	monkeys[monkey.trueTest].startingItems.push(item)
				: monkeys[monkey.falseTest].startingItems.push(item)
		}
	});
}

// multiply the two highest inspectCount values of the monkeys
let monkeyBusiness = monkeys
	.map((monkey) => monkey.inspectCount)
	.sort((a, b) => b - a)
	.slice(0, 2)
	.reduce((a, b) => a * b, 1);

console.log(monkeyBusiness);
