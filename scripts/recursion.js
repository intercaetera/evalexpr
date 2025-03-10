const assert = require('assert')
const evaluate = require('../evalexpr')

// Compute the factorial of the number 6
const program = 
    [define, [
        [factorial, 
            [λ, [n],
                [when, [eq, n, 0],
                    1,
                    [mul, n, [recur, [dec, n]]]]]],
    ],
        [factorial, 6]]

const result = evaluate(program)

console.log(result)
assert(result === 720)
