const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = ['dist'];

// the clean options to use
let cleanOptions = {
    root: path.resolve(__dirname),
    // exclude: ['shared.js'],
    verbose: true,
    dry: false,
};

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    devtool: 'source-map',// 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: 'production',
    entry: {
        'index': './index.ts',
    },
    output: {
        filename: '[name].js',// 生成的fiename需要与package.json中的main一致
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tslint.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            // 指定特定的ts编译配置，为了区分脚本的ts配置
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    // 依赖宿主环境
    externals: {
        "react": {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    plugins: [new CleanWebpackPlugin()],
};