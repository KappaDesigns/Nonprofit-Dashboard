class Queue {
	constructor() {
		this.a = [];
		this.length = 0;
	}

	add(e) {
		this.a.push(e);
		this.length ++;
	}

	remove() {
		let e = this.a[0];
		this.a.splice(0, 1);
		this.length --;
		return e;
	}

	isEmpty() {
		return this.length == 0;
	}

	peek() {
		return this.a[0];
	}
}

module.exports = Queue;
