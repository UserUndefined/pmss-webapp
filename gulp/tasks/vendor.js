import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('vendor', function() {

  return gulp.src(config.vendor.src)
    .pipe(changed(config.vendor.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.vendor.dest))
    .pipe(browserSync.stream());

});
