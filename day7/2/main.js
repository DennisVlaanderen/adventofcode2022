let fs = require('fs');

const CRLF = '\r\n';

let input = fs.readFileSync('input.txt', 'utf8')
	.split(CRLF)
	.filter(string => string.length !== 0)

// start challenge specific code here

class FileNode {
	name;
	size;

	constructor(name, size) {
		this.name = name;
		this.size = size;
	}
}

class DirectoryNode {
	name;
	children;
	files;
	parent;

	constructor(name) {
		this.name = name;
		this.children = [];
		this.files = [];
		this.parent = null;
	}

	getDirectories() {
		return this.children;
	}

	getDirectory(name) {
		return this.children.filter((dir) => dir.name === name)[0];
	}

	addDirectory(name) {
		let dir = new DirectoryNode(name);
		dir.parent = this;
		this.children.push(dir);
	}

	addFile(name, size) {
		let file = new FileNode(name, size);
		this.files.push(file);
	}

	getSize() {
		let size = 0;
		this.files.forEach((file) => {
			size += file.size;
		});
		this.children.forEach((child) => {
			size += child.getSize();
		});
		return size;
	}
}

let root = new DirectoryNode('/');
let currentDir = root;

const childRegex = /^(dir|\d*) (.*)$/gm;
const commandRegex = /^\$ (cd (.*)|ls)$/gm;

input.forEach((line) => {
	let a = line.split(' ');

	if (line.match(childRegex)) {
		if (a[0] === 'dir') {
			let name = a[1];
			currentDir.addDirectory(name);
		} else {
			let size = parseInt(a[0]);
			let name = a[1];
			currentDir.addFile(name, size);
		}
	} else if (line.match(commandRegex)) {
		if (a[1] === 'ls') {
			return;
		}
		let name = a[2];
		if (name === '..') {
			currentDir = currentDir.parent;
		} else if (name === '/') {
			currentDir = root;
		} else {
			currentDir = currentDir.getDirectory(name);
		}
	}
});

const fileSystem = 70000000;
const spaceNeeded = 30000000 - (fileSystem - root.getSize());

let possibleTargets = [];

function findTargets(node) {
	if (node.getSize() >= spaceNeeded) {
		possibleTargets.push(node);
	}
	node.children.forEach((child) => {
		findTargets(child);
	});
}

findTargets(root);

possibleTargets.sort((a, b) => {
	return a.getSize() - b.getSize()
});

console.log(possibleTargets[0].getSize());
