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

const screepsTask = () =>
  src("dist/*.js").pipe(
    screeps({
      token: process.env.SCREEPS_API_KEY,
      branch: argv.branch || "dev",
    })
  )

exports.default = series(cleanTask, buildTask)
exports.screeps = series(cleanTask, buildTask, screepsTask)
exports.clean = cleanTask
