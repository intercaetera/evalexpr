const evaluate = require('../evalexpr')

// Double a list of [1, 2, 3].
const program = 
	[define, [
		[double, [λ, [a], [mul, a, 2]]],
		[ys, [list, 1, 2, 3, 4, 5]],
		[map, [λ, [fn, xs],
			[when, [isNil, xs],
				[list],
				[cons, [fn, [car, xs]], [recur, fn, [cdr, xs]]]
			]]]
	], 
		[map, double, ys]]

const result = evaluate(program)
console.log(result)

