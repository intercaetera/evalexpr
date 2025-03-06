const symbols = [
	'λ',
	'x', 'y', 'n',
	'rec',
	'dec', 'inc',
	'when',
	'mul',
	'eq',
]

symbols.forEach(symbol => {
	globalThis[symbol] = Symbol(symbol)
})
