require('./symbols')

const env = () => {
	throw new Error('unbound')
}

const evalExpr = (expr, env) => {
	// primitives evalue to themselves
	if (['number', 'boolean'].includes(typeof expr)) return expr

	if (expr === inc) return x => x + 1
	if (expr === dec) return x => x - 1

	// [eq a b]
	if (expr[0] === eq) return evalExpr(expr[1], env) === evalExpr(expr[2], env)

	// [mul a b]
	if (expr[0] === mul) return evalExpr(expr[1], env) * evalExpr(expr[2], env)

	// [when cond cons alt]
	if (expr[0] === when) {
		const [_, cond, cons, alt] = expr
		if (evalExpr(cond, env)) {
			return evalExpr(cons, env)
		} else {
			return evalExpr(alt, env)
		}
	}

	// x
	if (typeof expr === 'symbol') return env(expr)

	// [λ, [a], body]
	if (expr[0] === λ) {
		const a = expr[1][0]
		const body = expr[2]
		return arg => evalExpr(body, b => {
			if (a === b) return arg
			return env(b)
		})
	}

	// [f x]
	const [operator, operand] = expr
	return evalExpr(operator, env)(evalExpr(operand, env))
}

const evaluate = term => evalExpr(term, env)

module.exports = evaluate
