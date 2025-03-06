const evaluate = require('../evalexpr')

// Testing definitions of variables
const program = 
	[define, [
		[a, 5],
		[b, [inc, a]],
		[fn, [λ, [x], [add, x, 10]]],
	], 
		[fn, b],
	]

const result = evaluate(program)
console.log(result)
