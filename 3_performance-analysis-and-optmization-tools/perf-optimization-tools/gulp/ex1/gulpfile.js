var gulp = require('gulp');
var minify = require('gulp-minify');

// var sassCompile = require('sass-compile');
// var refresh = require('refresh');

var destDir = './public';
gulp.task('default', ['minify-js', 'copyHtml'], function(){
    console.log('Hello gulp is done');

});

gulp.task('watchJS', function () {
    gulp.watch('./dev/*.js', ['minify-js']);

});

gulp.task('minify-js', function () {

    gulp.src('./dev/*.js')
        .pipe(minify())
        .pipe(gulp.dest(destDir));
    console.log('minify is done');
});


gulp.task('copyHtml', function () {
    gulp.src('./dev/*.html').pipe(gulp.dest(destDir));
});

gulp.task('sass-compile', function () {
    console.log('sass');
    return gulp.src('./main.css').pipe(compress());
});

// src()



// dest()
// watch()