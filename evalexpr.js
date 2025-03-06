require('./symbols')

const evalExpr = (expr, env) => {
	// primitives evalue to themselves
	if (['number', 'boolean'].includes(typeof expr)) return expr

	// symbols evaluate to their value in the environment
	if (typeof expr === 'symbol') return env(expr)

	// mathematical primitives
	if (expr[0] === inc) return evalExpr(expr[1], env) + 1
	if (expr[0] === dec) return evalExpr(expr[1], env) - 1

	// definition
	if (expr[0] === define) return evalDefine(expr, env)

	// [eq a b] - equality
	if (expr[0] === eq) return evalExpr(expr[1], env) === evalExpr(expr[2], env)

	// [add a b] - addition
	if (expr[0] === add) return evalExpr(expr[1], env) + evalExpr(expr[2], env)

	// [mul a b] - multiplication
	if (expr[0] === mul) return evalExpr(expr[1], env) * evalExpr(expr[2], env)

	// [when cond cons alt] - if statement
	if (expr[0] === when) return evalWhen(expr, env)

	// [λ, [a], body]
	if (expr[0] === λ) return evalLambda(expr, env)

	// [f x]
	return apply(expr, env)
}

const evalDefine = ([_define, definitions, body], env) => {
	const newEnv = definitions.reduce((env, [symbol, definition]) => {
		return b => {
			if (b === symbol) return evalExpr(definition, env)
			return env(b)
		}
	}, env)

	return evalExpr(body, newEnv)
}

const evalWhen = ([_when, cond, cons, alt], env) => {
	if (evalExpr(cond, env)) {
		return evalExpr(cons, env)
	} else {
		return evalExpr(alt, env)
	}
}

const evalLambda = ([_λ, [a], body], env) => {
	return arg => evalExpr(body, b => {
		if (a === b) return arg
		return env(b)
	})
}

const apply = (expr, env) => {
	const [operator, operand] = expr
	return evalExpr(operator, env)(evalExpr(operand, env))
}


const defaultEnv = () => {
	throw new Error('unbound')
}

const evaluate = term => evalExpr(term, defaultEnv)

module.exports = evaluate
