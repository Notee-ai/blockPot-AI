const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',  // Entry point for your app (main JavaScript file)
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output directory for the bundled files
    filename: 'bundle.js',  // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.js$/,  // Apply Babel transpilation to all .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],  // Use Babel presets for modern JavaScript and React JSX
          },
        },
      },
      {
        test: /\.css$/,  // Handle CSS files
        use: ['style-loader', 'css-loader'],  // Inject CSS into the DOM and resolve CSS imports
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve both .js and .jsx extensions
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,  // Set the port for the development server
    open: true,  // Automatically open the browser when the server starts
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',  // HTML template file for your app
    }),
  ],
  mode: 'development',  // Set the mode to development for easier debugging
};
