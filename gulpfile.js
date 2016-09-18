// npm install --save-dev gulp-install
// npm intall gulp-sass --save-dev
// npm install --save-dev gulp-autoprefixer
// npm install gulp-sourcemaps --save-dev
// npm intall gulp-minify-css --save-dev
// npm intall gulp-concat --save-dev
// npm install --save-dev gulp-imagemin
// npm install --save-dev main-bower-files



var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    mainBowerFiles = require('main-bower-files'),
    inputScss = 'sass/**/*.scss',
    outputCss = 'css/',
    inputImages = 'images/*',
    outputImages = 'images',
    sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

// iTerm "gulp" - autocompile scss to css
gulp.task('default', ['watch']);
// iTerm "gulp watch" - autocompile scss to css
gulp.task('watch', ['sass', 'imagemin'], function(){
    gulp
        .watch(inputScss, ['sass']);
});
// iTerm "gulp sass" - compile scss to css
gulp.task('sass', function(){
    return gulp
         .src(inputScss)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(outputCss))
});
// iTerm "gulp imagemin" - image optimising
gulp.task('imagemin', function () {
    return gulp.src(inputImages)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(outputImages));
});

// iTerm "gulp mainfiles"
gulp.task('mainfiles', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('src'))
});