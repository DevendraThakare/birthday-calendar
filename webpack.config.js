import path from "path";
import webpack from "webpack";
import config from "./config";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const srcDir = path.resolve(__dirname, "src");
const cdn = config.cdnPath;

const aliases = [
  "actions",
  "components",
  "containers",
  "constants",
  "helpers",
  "reducers",
  "store",
  "styles",
  "utils",
  "routes"
].reduce((acc, dir) => {
  acc[dir] = path.join(srcDir, dir);
  return acc;
}, {});

const webpackConfig = {
  entry: {
    app: [`${srcDir}/app.js`]
  },
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: `${cdn}/`
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
            sourceMap: true
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              includePaths: [path.join(srcDir, "styles")]
            }
          }
        ]
      },
      {
        test: /\.font\.(js|json)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "fontgen-loader",
            options: {
              embed: true,
            }
          }
        ]
        // use: ['css-loader', 'sass-loader', 'fontgen-loader']
        // use:[{
        //   loader: "style-loader!css-loader!fontgen-loader"
        // }]
        // use : ExtractTextPlugin.extract({
        //   fallback: "style-loader",
        //   use: ['css-loader', 'sass-loader', 'fontgen-loader']
        // })
      }
    ]
  },
  // plugins: [
  //   new ExtractTextPlugin("styles.css"),
  // ],
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
    alias: aliases,
    modules: ["node_modules"],
    mainFields: ["main", "web"]
  },
  stats: {
    colors: true
  },
  devtool: "source-map"
};

export default webpackConfig;
