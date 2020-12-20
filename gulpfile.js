const { src, dest, series } = require("gulp")
var ts = require("gulp-typescript")
var screeps = require("gulp-screeps")
var clean = require("gulp-clean")
require("dotenv").config()

const buildTask = () => src("src/*.ts").pipe(ts()).pipe(dest("dist"))

const cleanTask = () => src("dist", { allowEmpty: true }).pipe(clean())

const screepsTask = () =>
  src("dist/*.js").pipe(
    screeps({
      token: process.env.SCREEPS_API_KEY,
      branch: "dev",
    })
  )

  const screepsTaskDefault = () =>
  src("dist/*.js").pipe(
    screeps({
      token: process.env.SCREEPS_API_KEY,
      branch: "default",
    })
  )

exports.default = series(cleanTask, buildTask)
exports.screeps = series(cleanTask, buildTask, screepsTask)
exports.screepsDefault = series(cleanTask, buildTask, screepsTaskDefault)
exports.clean = cleanTask
