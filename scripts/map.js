const evaluate = require('../evalexpr')

// Double a list of [1, 2, 3].
const program = 
	[define, [
		[double, [λ, [a], [mul, a, 2]]],
		[ys, [cons, 1, [cons, 2, [cons, 3, undefined]]]],
		[map, [λ, [fn, xs],
			[when, [eq, xs, undefined],
				undefined,
				[cons, [fn, [car, xs]], [recur, fn, [cdr, xs]]]
			]]]
	], 
	[map, double, ys]]

const result = evaluate(program)
console.log(result)

