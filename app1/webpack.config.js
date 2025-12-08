const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 8080 // Host 运行在 8080 端口
  },
  output: {
    publicPath: "http://localhost:8080/"
  },
  optimization: {
    splitChunks: {
      // 告诉 Webpack 优化所有类型的 Chunk (同步和异步)
      chunks: "all",
      cacheGroups: {
        reactVendor: {
          // 匹配 node_modules/react 或 node_modules/react-dom
          test: /[\\/]node_modules[\\/](react)[\\/]/,
          name: "react.vendor", // Chunk 名称为 react.vendor
          priority: 30, // 优先级最高，确保优先满足这个组
          reuseExistingChunk: true
        }
        //   // 创建一个名为 'vendors' 的缓存组，专门用于 node_modules
        //   // vendors: {
        //   //   test: /[\\/]node_modules[\\/]/,
        //   //   priority: -10,
        //   //   name: "vendors-app1",
        //   //   // 确保所有 node_modules 依赖都被放入这个组，而不是和 main.js 混在一起
        //   //   enforce: true
        //   // },
        //   // 也可以专门为 lodash 创建一个组，使其文件名更清晰
        // lodash: {
        //   test: /[\\/]node_modules[\\/]lodash[\\/]/,
        //   name: "lodash",
        //   priority: 20, // 优先级更高
        //   reuseExistingChunk: true
        // }
      }
    }
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
      name: "app1_host",
      remotes: {
        // 🚨 关键：本地模块名: 远程应用名@远程入口URL
        remoteApp: "app2_remote@http://localhost:8081/remoteEntry.js"
        // remoteApp: `app2_remote@${EnvironmentDomain[env]}/remoteEntry.js`
      },
      shared: {
        // 共享 React，与 Remote 保持一致
        react: { singleton: true, requiredVersion: "^19.2.1" }
        // "react-dom": { singleton: true, requiredVersion: "^19.2.1" }
        // lodash: {
        //   // 🚨 核心配置 1: 确保只加载一次，防止多个实例
        //   singleton: true,
        //   // 核心配置 2: 声明需要的最低版本
        //   requiredVersion: "^4.17.21",
        //   // 核心配置 3 (可选): 如果 Host 未提供或版本不兼容，Remote 不会自己打包。
        //   // 默认情况下，如果 Host 不兼容，Remote 会 fallback 到自己打包的版本。
        //   // 如果你想让 Remote 完全依赖 Host，可以省略这一项。
        //   eager: true
        // }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
};
