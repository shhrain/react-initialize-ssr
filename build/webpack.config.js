const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')

module.exports ={
    // 应用入口
    entry: {
      app: path.join(__dirname, '../src/app.js')  // app.js作为打包的入口
    },
    // 输出目录
    output: {
      filename: '[name].[hash].js',  //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
      path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
      publicPath: 'public' // 静态资源文件引用时的路径（加在引用静态资源前面的）
    },
    // 配置loader
    module: {
        rules: [
        {
            test: /.jsx$/, //使用loader的目标文件。这里是.jsx
            loader: 'babel-loader'
        },
        {
            test: /.(js)$/, //使用loader的目标文件。这里是.js
            loader: 'babel-loader',
            exclude: [
            path.join(__dirname, '../node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
            ]
        }
        ]
    },
    plugins: [
        // 生成一个html页面，同时在webpack编译的时候。把我们所生成的entry都注入到这个html页面中,路径都是根据我们output配置的来走的。
        new HTMLPlugin(
            {
                template: path.join(__dirname, '../src/main.html')
            }
        )   
      ]
}
