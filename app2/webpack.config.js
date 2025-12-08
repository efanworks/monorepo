const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  optimization: {
    splitChunks: {
      // 告诉 Webpack 优化所有类型的 Chunk (同步和异步)
      chunks(chunk) {
        // remoteEntry.js 专用 chunk，不能被拆
        if (chunk.name === "app2_remote") {
          return false;
        }

        return true;
      }
    }
  },
  devServer: {
    port: 8081 // Remote 运行在 8081 端口
    // headers: {
    //   // 允许所有来源的请求访问脚本。
    //   // 在开发环境中，使用 "*" 是最快捷的解决办法。
    //   "Access-Control-Allow-Origin": "*",

    //   // 允许的 HTTP 方法
    //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",

    //   // 允许的头部字段
    //   "Access-Control-Allow-Headers":
    //     "X-Requested-With, content-type, Authorization"
    // }
  },
  output: {
    publicPath: "http://localhost:8081/" // 确保 Webpack 知道资源在哪里加载
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "app2_remote", // 🚨 远程应用的唯一名称
      filename: "remoteEntry.js", // 🚨 远程模块的入口文件名
      exposes: {
        "./Button": "./src/Button.js" // 🚨 暴露 Button 组件，别名为 './Button'
      },
      shared: {
        // 共享 React，确保 Host 和 Remote 使用同一个实例
        react: { singleton: true, requiredVersion: "^19.2.1", import: false }
        // "react-dom": {
        //   singleton: true,
        //   requiredVersion: "^19.2.1",
        //   eager: false
        // }
        // lodash: {
        //   // 🚨 核心配置 1: 确保只加载一次，防止多个实例
        //   singleton: true,
        //   // 核心配置 2: 声明需要的最低版本
        //   requiredVersion: "^4.17.21",
        //   // 核心配置 3 (可选): 如果 Host 未提供或版本不兼容，Remote 不会自己打包。
        //   // 默认情况下，如果 Host 不兼容，Remote 会 fallback 到自己打包的版本。
        //   // 如果你想让 Remote 完全依赖 Host，可以省略这一项。
        // }
      }
    }),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ]
};
