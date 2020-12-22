const { src, dest, series } = require("gulp")
const screeps = require("gulp-screeps")
const clean = require("gulp-clean")
const webpackGulp = require("webpack-stream")
const webpack = require("webpack")
const argv = require("yargs").argv
require("dotenv").config()

const buildTask = () =>
  src("src/main.ts")
    .pipe(webpackGulp(require("./webpack.config.js"), webpack))
    .pipe(dest("dist"))

const cleanTask = () => src("dist", { allowEmpty: true }).pipe(clean())

const screepsConfig = argv.localhost
  ? {
      email: "patsimm",
      password: "test123",
      branch: argv.branch || "dev",
      host: "localhost",
      port: 21025,
    }
  : {
      token: argv.ptr
        ? process.env.SCREEPS_API_KEY_PTR
        : process.env.SCREEPS_API_KEY,
      branch: argv.branch || "dev",
      path: argv.ptr ? "/ptr" : undefined,
    }

const screepsTask = () => src("dist/*.js").pipe(screeps(screepsConfig))

exports.default = series(cleanTask, buildTask)
exports.screeps = series(cleanTask, buildTask, screepsTask)
exports.clean = cleanTask
