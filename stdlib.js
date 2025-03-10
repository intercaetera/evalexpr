const stdlib = {
	inc: x => x + 1,
	dec: x => x - 1,
	add: (x, y) => x + y,
	mul: (x, y) => x * y,
	eq: (x, y) => x === y,
	car: ([x]) => x,
	cdr: ([_x, ...xs]) => xs,
	cons: (x, xs) => ([x, ...xs]),
	list: (...xs) => xs,
	isNil: x => Array.isArray(x) && x.length === 0,
}

const entries = Object.entries(stdlib)

entries.forEach(([name, fn]) => {
	globalThis[name] = fn
})
