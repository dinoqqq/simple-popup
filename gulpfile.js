var gulp        = require("gulp");
var uglify      = require("gulp-uglify");
var pump        = require("pump");
var cleanCSS    = require("gulp-clean-css");
var rename      = require("gulp-rename");

gulp.task("minify-css", function() {
    return pump([
        gulp.src("src/*.css"),
        cleanCSS(),
        rename({
            suffix: ".min"
        }),
        gulp.dest("dist")
    ]);
});

gulp.task("compress", function (cb) {
  return pump([
        gulp.src("src/*.js"),
        uglify(),
        rename({
            suffix: ".min"
        }),
        gulp.dest("dist")
    ]);
});

gulp.task("default", ["compress", "minify-css"]);


