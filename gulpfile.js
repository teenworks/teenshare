var gulp = require('gulp');

var shell = require('gulp-shell');

gulp.task('server', shell.task('node app.js'));

gulp.task('default', ['server']);

