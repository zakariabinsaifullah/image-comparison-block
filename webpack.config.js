const path = require('path');
const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const { getWebpackEntryPoints } = require('@wordpress/scripts/utils/config');

const wordpressEntryPoints = getWebpackEntryPoints(); // Get the default WordPress entry points

const allEntryPoints = {
    ...wordpressEntryPoints, // Use the default WordPress entry points
    'admin/admin': path.resolve(process.cwd(), 'src', 'admin', 'index.js')
};

module.exports = {
    ...defaultConfig,
    entry: allEntryPoints,
    output: {
        filename: '[name].js',
        path: path.resolve(process.cwd(), 'build')
    }
};
