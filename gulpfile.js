var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var browserify   = require('gulp-browserify');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

var css_dest = "./app/css/";
var scss_src = "./src/scss/**/*.scss";
var js_src = "./src/js/**/*.js";
var js_dest = "./app/js/";

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(scss_src, ['sass']);
    gulp.watch(js_src, ['scripts']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('scripts', function() {
    gulp.src(js_src)
        .pipe(browserify())
        .pipe(gulp.dest(js_dest))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
// added autoprefixer
gulp.task('sass', function() {
    return gulp.src(scss_src)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['>1%'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css_dest))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
