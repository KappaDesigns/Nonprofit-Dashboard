class Stack {
	constructor() {
		this.a = [];
		this.length = 0;
	}

	push(e) {
		this.a.push(e);
		this.length++;
	}

	pop() {
		let e = this.a[this.length - 1];
		this.a.splice(this.length - 1, 1);
		this.length --;
		return e;
	}

	isEmpty() {
		return this.length == 0;
	}

	peek() {
		return this.a[this.length - 1];
	}
}

module.exports = Stack;
