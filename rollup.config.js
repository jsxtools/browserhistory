import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'

const isBrowser = true

const output = isBrowser
	? [
		{ file: 'browser.js', format: 'esm', sourcemap: false, strict: false, name: 'BrowserHistory' },
		{ file: 'browser.mjs', format: 'esm', sourcemap: false, strict: false, name: 'BrowserHistory' }
	]
: [
	{ file: 'index.js', format: 'cjs', sourcemap: true, strict: false },
	{ file: 'index.mjs', format: 'esm', sourcemap: true, strict: false }
]

export default {
	input: 'src/index.js',
	output: output,
	plugins: [
		babel({
			presets: [
				['@babel/env', { modules: false, targets: { node: 8 } }]
			]
		}),
		terser()
	]
}
