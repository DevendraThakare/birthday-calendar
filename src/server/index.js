import path from "path";
import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../../webpack.config.js";
// import fs from "fs";
// import _ from "underscore";
import routes from "./routes";
import config from "../../config"

import bodyParser from 'body-parser'


const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

const isDevelopment = process.env.NODE_ENV !== "production";
const compiler = webpack(webpackConfig);

app.set('views', `${process.cwd()}/src/server/views`)
app.set('view engine', 'ejs')
if (isDevelopment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath
    })
  );
  app.use(webpackHotMiddleware(compiler));
} 
// else {
  //   app.use(express.static(`${process.cwd()}/dist`));
  // }
if (config.cdn_path === '') {
  app.use(express.static(`${process.cwd()}/dist`));
}
app.use("/", routes);

export default app;
