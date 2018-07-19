// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require('path');

module.exports = {
    mode: 'none',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};

// 3.x version 에서 CommonChunksPlugin 이 4.x 에서는 SplitChunksPlugin 으로 바뀜