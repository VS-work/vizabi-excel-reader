const path = require('path');

module.exports = (env) => ({
    entry: {
        'vizabi-excel-reader': './src/index.ts'
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].js',
        libraryTarget: 'commonjs'
    }
});
