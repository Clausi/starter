var gulp         = require('gulp');
var browserSync  = require('browser-sync').create();
var browserify   = require('gulp-browserify');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');

var css = "./app/css/";
var scss = "./src/scss/**/*.scss"
var scripts = "./src/js/**/*.js"

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(scss, ['sass']);
    gulp.watch(scripts, ['scripts']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('scripts', function() {
    gulp.src(scripts)
        .pipe(browserify())
        .pipe(gulp.dest('./app/js/'))
        .pipe(browserSync.stream());
});

// Compile sass into CSS & auto-inject into browsers
// added autoprefixer
gulp.task('sass', function() {
    return gulp.src(scss)
        .pipe(sass())
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer({ browsers: ['>1%'] }) ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
