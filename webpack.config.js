const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  const basicConfig = {
    mode,
    target: "node",
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [ "source-map-loader" ],
          enforce: "pre"
        },
        {
          test: /\.ts?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.ts', '.js' ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ]
  };

  return webpackMerge(basicConfig, modeConfig(mode));
};
