const defaultConfig = require( '@wordpress/scripts/config/eslint.config.cjs' );

module.exports = [
	...( Array.isArray( defaultConfig ) ? defaultConfig : [ defaultConfig ] ),
	{
		rules: {
			// @wordpress/* packages are provided by WordPress as script dependencies.
			'import/no-extraneous-dependencies': 'off',
			'import/no-unresolved': [ 'error', { ignore: [ '^@wordpress/' ] } ],
		},
	},
];
