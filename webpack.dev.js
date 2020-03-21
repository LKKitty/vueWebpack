let {smart} = require('webpack-merge')
let base = require('./webpack.base.js')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
module.exports = smart(base,{
    mode:'development',// 开发环境 development 生产环境production
    plugins:[new OpenBrowserPlugin({ url: 'http://localhost:8080'}),]
})