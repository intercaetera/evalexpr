require('./symbols')

const evalExpr = (expr, env) => {
	// primitives evalue to themselves
	if (['number', 'boolean'].includes(typeof expr)) return expr

	// symbols evaluate to their value in the environment
	if (typeof expr === 'symbol') return env(expr)

	if (expr[0] === quote) return expr[1]
	if (expr[0] === car) return evalExpr(expr[1], env)[0]
	if (expr[0] === cdr) return evalExpr(expr[1], env).slice(1)
	if (expr[0] === define) return evalDefine(expr, env)
	if (expr[0] === eq) return evalExpr(expr[1], env) === evalExpr(expr[2], env)
	if (expr[0] === add) return evalExpr(expr[1], env) + evalExpr(expr[2], env)
	if (expr[0] === mul) return evalExpr(expr[1], env) * evalExpr(expr[2], env)
	if (expr[0] === inc) return evalExpr(expr[1], env) + 1
	if (expr[0] === dec) return evalExpr(expr[1], env) - 1
	if (expr[0] === when) return evalWhen(expr, env)
	if (expr[0] === λ) return evalLambda(expr, env)

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

const evalLambda = ([_λ, params, body], env) => {
	const fn = (...args) => {
		const newEnv = b => {
			const index = params.indexOf(b)
			if (index !== -1) return args[index]
			if (b === recur) return fn
			return env(b)
		}

		return evalExpr(body, newEnv)
	}

	return fn
}

const apply = (expr, env) => {
	const [operator, ...operands] = expr
	const fn = evalExpr(operator, env)
	if (typeof fn !== 'function') throw new Error(`not a function, ${operator.toString()}`)
	const args = operands.map(operand => evalExpr(operand, env))
	return fn(...args)
}


const defaultEnv = a => {
	throw new Error(`unbound, ${a.toString()}`)
}

const evaluate = term => evalExpr(term, defaultEnv)

module.exports = evaluate
