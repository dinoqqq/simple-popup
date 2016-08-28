const gulp          = require("gulp");
const uglify        = require("gulp-uglify");
const pump          = require("pump");
const cleanCSS      = require("gulp-clean-css");
const rename        = require("gulp-rename");
const eslint        = require('gulp-eslint');
const gulpIf        = require('gulp-if');
const runSequence   = require('run-sequence');

function isFixed(file) {
    // Has ESLint fixed the file contents?
    return file.eslint != null && file.eslint.fixed;
}

gulp.task("minify-css", function(cb) {
    pump([
        gulp.src("src/*.css"),
        cleanCSS(),
        rename({
            suffix: ".min"
        }),
        gulp.dest("dist")
    ]);
    cb();
});

gulp.task("compress", function (cb) {
    pump([
        gulp.src("src/*.js"),
        uglify(),
        rename({
            suffix: ".min"
        }),
        gulp.dest("dist"),
    ]);
    cb()
});

gulp.task("eslint", function (cb) {
    pump([
        gulp.src(["src/*.js"]),
        eslint({
            "extends": "eslint:recommended",
            "rules": {
                // enable additional rules
                "indent": ["error", 4],
                "linebreak-style": ["error", "unix"],
                "quotes": ["error", "double"],
                "semi": ["error", "always"],
                "no-trailing-spaces": ["error"],
                "valid-jsdoc": ["error"]
            },
            globals: [
                'jQuery',
                '$'
            ],
            envs: [
                'browser'
            ],
            "fix": true
        }),
        eslint.format(),
        gulpIf(isFixed, gulp.dest('src'))
    ]);
    cb();
});

gulp.task("default", function(done) {
    runSequence("eslint",
        "compress",
        "minify-css",
        done
    );
});


