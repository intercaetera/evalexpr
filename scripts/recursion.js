const assert = require('assert')
const evaluate = require('../evalexpr')

// Compute the factorial of the number 6
const program =
	[[[λ, [rec],
	      [λ, [n],
				    [[rec, rec], n]]],
	  [λ, [rec],
		  [λ, [n],
			  [when, [eq, n, 0],
				      1,
						  [mul, n, [[rec, rec], [dec, n]]]]]]], 6]

const result = evaluate(program)

console.log(result)
assert(result === 720)
