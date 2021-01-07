module.exports = {
    entry: './src/index.ts',
    output: {
        filename: './src/index.js'
    },
    resolve: {
        extensions: ['.ts', '.mjs', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: 'ts-loader'}
        ]
    },
    optimization: {
        minimize: false
    },
}

