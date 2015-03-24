"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var clean = require("gulp-clean");
var karma = require("gulp-karma");
var babelify = require("babelify");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var sass = require("gulp-sass");
var browserSync = require("browser-sync");
var jshint = require("gulp-jshint");

var folders = {
    "html": "app/**/*.html",
    "sass": "app/**/*.scss",
    "js": "app/**/*.js",
    "tests": "tests/**/*.js"
};
var jsHintPaths = [
    "client",
    "server",
    "gulp"
];

//BS configuration - http://www.browsersync.io/docs/options/
var bsConfig = {
    ui: {
        port: 35555,
        weinre: {
            port: 35556
        }
    },
    ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
    },
    proxy: "http://localhost:3000",
    logLevel: "warn",
    open: true,
    browser: ["google chrome"]
};

//Creaet the task
gulp.task("browser-sync", function() {
    //Start the browserSync with the provided configuration
    return browserSync(bsConfig, function (err) {
        if (!err) {
            console.info("BrowserSync is ready, UI on port 3000");
        } else {
            console.error(err);
        }
    });
});

gulp.task("bs-reload", function () {
    return browserSync.reload();
});

gulp.task("watch", function(){
    gulp.watch([folders.js, folders.html, folders.sass], ["modules", "html", "sass", "bs-reload", "test"]);
    gulp.watch(folders.tests, ["test"]);
});

gulp.task("build", ["modules", "html", "sass", "bs-reload", "test"]);

gulp.task("clean", function() {
    return gulp.src("dist")
        .pipe(clean());
});

gulp.task("modules", function() {
    browserify({
        entries: "./app/js/main.js",
        debug: true
    })
        .transform(babelify)
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./dist"));
});

gulp.task("sass", function() {
    gulp.src(folders.sass)
        .pipe(sass())
        .pipe(concat("styles.css"))
        .pipe(gulp.dest("./dist"));
});
var mocha = require("gulp-mocha");
var shell = require("gulp-shell");
gulp.task("test", function() {

    var testRunner = shell.task([
        'mocha ./tests/* -c --compilers js:mocha-traceur --report nyan'
    ], {ignoreErrors: true});

    testRunner();

//    browserify({
//        entries: "./tests/module.js",
//        debug: true
//    })
//        .transform(babelify)
//        .bundle()
//        .pipe(source("tmp.js"))
//        .pipe(mocha({reporter: 'nyan'}));
    //return gulp.src('tests/**/*.js', {read: false})
    //    .pipe(browserify({
    //        transform: "babelify"
    //    }))
    //    .pipe(mocha({reporter: 'nyan', compilers: 'js:mocha-traceur'}));
});

gulp.task("html", function() {
    //Copy the files
    return gulp.src(folders.html)
        .pipe(gulp.dest("./dist"));
});

gulp.task("server", function () {
    //Look for a server module and start it
    try {
        require("./server");
    } catch (e) {
        console.error("No server was found.");
    }
});

var srcPaths = ["*.js"];
for (var i=0; i < jsHintPaths.length; i++) {
    srcPaths.push(jsHintPaths[i] + "/**/*.js");
}

gulp.task("jshint:hinting", function() {
    gulp.src(srcPaths)
        .pipe(jshint())
        .pipe(jshint.reporter("jshint-stylish"));
});

gulp.task("jshint", function() {
    gulp.watch([srcPaths], ["jshint:hinting"]);
});

gulp.task("default", ["build", "server", "browser-sync", "watch", "jshint"]);