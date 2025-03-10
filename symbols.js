const symbols = [
	'λ',

	// script symbols
	'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
	'xs', 'ys',
	'fn','factorial',
	'map', 'double',

	// evaluator symbols
	'quote',
	'define',
	'recur',
	'when',
]

const createSymbol = name => {
	globalThis[name] = Symbol(name)
}

symbols.forEach(createSymbol)
