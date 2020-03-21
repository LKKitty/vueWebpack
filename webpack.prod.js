let {smart} = require('webpack-merge')
let base = require('./webpack.base.js')
const TerserJSPlugin = require('terser-webpack-plugin');//js压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩
module.exports=smart(base,{
    mode:'production', // 开发环境 development 生产环境production
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
})