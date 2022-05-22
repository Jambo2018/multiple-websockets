const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "index.js",
        libraryTarget: 'commonjs',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json']
    },
    devtool: 'source-map', // 打包出的js文件是否生成map文件（方便浏览器调试）
    mode: "production",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], // 最新JS语法后向兼容
                        plugins: ['@babel/plugin-transform-react-jsx'],//JSX编译
                    },
                },
            },
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        transpileOnly: true, // 只进行语法转换, 不进行类型校验, 提高构建速度
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
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
    plugins: [
        new CleanWebpackPlugin()
    ]
}