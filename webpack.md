
####  [文档](https://webpack.js.org/concepts/)
如果有关于没有权限的报错，加上sudo 就好了~

##### 初始化项目
在终端进入项目文件夹，执行 `npm init -y`

npm init 用来初始化生成一个新的package.json 文件。
-y 表示yes， 会跳过提问阶段，直接生成一个package.json文件 （-f也可以跳过提问阶段，force）
编辑 package.json

#### 安装 Webpack
1. 本地安装
安装最新版本：
`npm install --save-dev webpack`  
安装指定版本：
`npm install --save-dev webpack@<version>  

  webpack 4+ 版本，还需要安装 CLI
`npm install --save-dev webpack-cli`

本地安装 webpack 后，从 node_modules/.bin/webpack 访问它的 bin 版本。

2. 全局安装（不建议）
`npm install --global webpack`

不推荐全局安装 webpack。这会将项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败。

#### 新建 webpack.config.js

```
module.exports = {
  entry: './javascripts/app.js',    // 入口文件
  output: {
    filename: 'dist/app.js'         // 输出文件
  }
}

```
#### Babel
使用 Babel 将代码转成 ES5 以兼容其他浏览器
根据文档安装babel
`npm install babel-loader babel-core babel-preset-env webpack`

更新 webpack.config.js 如下(文档中都有)并运行 webpack 进行打包。

```
module.exports = {
  entry: './javascripts/app.js',    // 入口文件
  output: {
    filename: 'dist/app.js'         // 输出文件
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
}
```

#### 运行 webpack 命令生成 dist/app.js
全局安装的运行：
`webpack`  
本地安装的运行：
`node_modules/.bin/webpack`
 开发期间可运行 webkpack -w，以便保存代码的同时进行打包。


#### 引入打包后的脚本

```
<script type="module" src="javascripts/app.js"></script>  <!-- 已支持 ES6 模块的浏览器 -->
<script nomodule src="dist/app.js"></script>              <!-- 不支持 ES6 模块的浏览器 -->
```

webpack -p 可以将代码打包并压缩。






