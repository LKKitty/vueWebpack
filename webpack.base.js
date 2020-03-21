//webpack是node写出来的，要用node语法
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin') //html模板
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清空打包后的文件夹
const VueLoaderPlugin = require('vue-loader/lib/plugin') //vue插件
let MiniCssExtractPlugin = require('mini-css-extract-plugin') //抽离css
module.exports={
  // mode:'production', // 开发环境 development 生产环境production
  entry:'./src/index.js',//入口
  resolve: { //解析
    alias: {
      // 配置别名'vue$'，不然import 'vue'时，webpack找不到
      'vue$': 'vue/dist/vue.esm.js',
      // 这个为src配置别名，非必需，为方便而已
      '@': path.resolve(__dirname, '../src')
    },
    // 在import这些拓展名的文件时，可以省略拓展名
    extensions: ['*', '.js', '.json', '.vue'],
  },
  output:{
    filename:'bundle.js',//打包后的文件名
    path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径
  },
  plugins:[ //数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      filename:'index.html'
    }),
    new CleanWebpackPlugin(),
    //它的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。
    // 例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(
      {
        filename:'main.css'
      }
    )
  ],
  module:{ //模块
    rules:[ // 规则 css-loader 解析@import这种语法的
        // style-loader 负责把css插入到head标签中
        // loader 特点，希望单一
        //loader的用法 单个loader使用字符串
        //多个loader使用数组[]
        //loader的顺序  默认从右往左执行
        //loader还可以写成对象形式
        {
          test: /\.vue$/, //编译.vue文件
          loader: 'vue-loader'
        },
        {
          test:/\.(htm|html)$/i,
          use:'html-withimg-loader'//html中图片路径打包
        },
        {
          test:/\.(png|jpg|gif|jpeg)$/, //在js中引用图片
          use: [{
            loader: "url-loader",
            options: {
              limit: 5 * 1024,
              outputPath: "images/", //打包后的图片文件夹
              esModule: false, // 该项默认为true，改为false即可
              name: "[name]-[hash:4].[ext]" 
            }
          }]
        },
        {
          test:/\.js$/,
          use:{
            loader:'babel-loader',
            options:{ //用babel-loader需要把es6转换成es5
              presets:[
                '@babel/preset-env'
              ],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          },
          exclude:/node_modules/
        },
        {
          test:/\.css$/,
          use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
        },
        {
          test: /\.styl(us)?$/,
          use:[
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'stylus-loader'
          ]
          // loader:'style-loader!css-loader!stylus-loader'
        }
    ]
  }
}