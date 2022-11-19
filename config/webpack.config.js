const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  // Main process
  {
    entry: './src/main/main.ts',
    output: {
      filename: 'main.js',
      path: './dist',
    },
    target: 'electron-main',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    externals: {
      sqlite3: 'commonjs sqlite3'
    },
    mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    watch: !!process.env.WATCH,
  },

  // Renderer process
  {
    entry: './src/renderer/index.tsx',
    output: {
      filename: 'renderer.js',
      path: './dist',
    },
    target: 'web',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    watch: !!process.env.WATCH,
    plugins: [
      new HtmlWebpackPlugin({
        title: 'GoG Galaxy 2.0',
        hash: true,
        template: './public/index.html',
      }),
    ],
  },

  // Preload
  {
    entry: './src/renderer/preload.ts',
    output: {
      filename: 'preload.js',
      path: './dist',
    },
    target: 'electron-preload',
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
      ],
    },
    mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
    devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    watch: !!process.env.WATCH,
  },
];
