const assert = require('assert')
const evaluate = require('../evalexpr')

// Create a function with 2 arguments, return the second one and decrement it by 1.
const program = 
	[[[λ, [x],
		[λ, [y],
			[dec, y]]], 7], 5]

const result = evaluate(program)
console.log(result)
assert(result === 4)

