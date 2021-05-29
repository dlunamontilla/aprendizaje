const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './app/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    mode: "production"
};

module.exports = config;