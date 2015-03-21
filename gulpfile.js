var gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

gulp.task('develop', ['test'], function(){
    gulp.watch('./server/**/*.js', ['test']);
});

gulp.task('test', function(){
   return gulp.src('./spec/**/*.js')
       .pipe(jasmine());
});
