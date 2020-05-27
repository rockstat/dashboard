const webpack = require('webpack');
const path = require('path');
const { readFileSync } = require('fs')
// variables
const isProduction = process.argv.indexOf('-p') >= 0;
const sourcePath = path.join(__dirname, './src');
const outPath = path.join(__dirname, './dist');
const jsyaml = require('js-yaml');

const envName = process.env.NODE_ENV === 'production' ? 'production' : process.env.NODE_ENV || 'development';
const envConfig = jsyaml.load(readFileSync('./env_conf.yml'));
const config = envConfig[envName];

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
// const autoprefixer = require('autoprefixer');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: {
    main: './index.tsx'
  },
  output: {
    path: outPath,
    filename: 'bundle.js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    // Fix webpack's default behavior to not load packages with jsnext:main module
    // (jsnext:main directs not usually distributable es6 format, but es6 sources)
    mainFields: ['module', 'browser', 'main'],
    alias: {
      'app': path.resolve(__dirname, 'src/app/')
    }
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new MiniCssExtractPlugin({
      filename: !isProduction ? '[name].css' : '[name].[hash].css',
      chunkFilename: !isProduction ? '[id].css' : '[id].[hash].css',
      disable: !isProduction,
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: 'assets/index.html'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(envName),
      API_URL_TMPL: JSON.stringify(config.api_url_tmpl),
      API_AUTH: JSON.stringify(config.api_auth),
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {

    rules: [
      // .ts, .tsx
      {
        test: /\.tsx?$/,
        use:
          isProduction ?
            ['ts-loader']
            : [
              {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }, 'ts-loader']
      },
      // css
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          // 'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          // 'sass-loader',
        ],
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.png$/, use: 'url-loader?limit=10000' },
      { test: /\.jpg$/, use: 'file-loader' },

      // {
      //   test: /\.(scss|sass)$/,
      //   exclude: /node_modules/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         query: {
      //           modules: true,
      //           minimize: true,
      //           sourceMap: !isProduction,
      //           importLoaders: 1,
      //           localIdentName: '[local]__[hash:base64:5]'
      //         }
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             autoprefixer()
      //           ],
      //           sourceMap: !isProduction
      //         }
      //       },
      //       // {
      //       //   loader: 'sass-loader',
      //       //   options: {
      //       //     modules: true,
      //       //     importLoaders: 1,
      //       //     localIdentName: '[name]__[local]__[hash:base64:5]'
      //       //   }
      //       // }
      //     ]
      //   })
      // },
    ]
  },
  optimization: {
    // splitChunks: {
    //   name: true,
    //   cacheGroups: {
    //     commons: {
    //       chunks: 'initial',
    //       minChunks: 2
    //     },
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       chunks: 'all',
    //       priority: -10
    //     }
    //   }
    // },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    runtimeChunk: true
  },

  devServer: {
    contentBase: sourcePath,
    open: false,
    hot: true,
    hotOnly: true,
    host: '127.0.0.1',
    port: 8083,
    public: 'app.stat.rock.dev',
    publicPath: 'https://app.stat.rock.dev/',
    // progress: true,
    // colors: true,
    inline: true,
    historyApiFallback: {
      disableDotRule: true
    },
    stats: 'minimal'
  },
  devtool: 'cheap-module-eval-source-map',
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty'
  }
};
