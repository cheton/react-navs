const path = require('path');

module.exports = {
	title: 'React Navs',
	styleguideDir: 'docs/',
	webpackConfig: require('./webpack.config.js'),
	components: ['src/*.jsx', 'examples/App.js'],
	ribbon: {
		url: 'https://github.com/trendmicro-frontend/react-navs',
		text: 'Fork me on GitHub'
	},
	require: [
		'babel-polyfill',
    	path.join(__dirname, 'node_modules/trendmicro-ui/dist/css/trendmicro-ui.css'),
    	path.join(__dirname, 'node_modules/@trendmicro/react-buttons/dist/react-buttons.css'),
    	path.join(__dirname, 'node_modules/@trendmicro/react-dropdown/dist/react-dropdown.css'),
    	path.join(__dirname, 'dist/react-navs.css')
	],
	theme: {
		maxWidth: 1250
	}
};