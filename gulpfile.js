var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// SASS
gulp.task('sass', function () {
	gulp.src('dev/sass/**/*.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	})
	.on('error', sass.logError))
	.pipe(gulp.dest('./dist/css/'))
});

// Image MIN & with CACHE to stop repeat compressed images
gulp.task('images', function(){
	return gulp.src('dev/img/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({optimizationLevel: 3, progressive: true})))
	.pipe(gulp.dest('dist/img/'))
});

// GULP DEFAULT
gulp.task('default',function() {
	// Image MIN
	gulp.start("images");
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
});