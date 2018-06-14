module.exports = {
    entry: './javascripts/app.js',  //   入口文件
    output: {
         path: __dirname + "/dist", //打包后的文件存放的地方
        filename: 'app.js'    // 输出文件，打包后输出文件的文件名
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,  //不看 node_modules|bower_components 这两个文件夹下的内容
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]


    }
};

// “__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录