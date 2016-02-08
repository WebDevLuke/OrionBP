var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

// SASS
gulp.task('sass', function () {
	gulp.src('sass/**/*.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	})
	.on('error', sass.logError))
	.pipe(gulp.dest('./css/'))
});

// Image MIN & with CACHE to stop repeat compressed images
gulp.task('images', function(){
	return gulp.src('img/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({optimizationLevel: 3, progressive: true})))
	.pipe(gulp.dest('img/'))
});

// GULP DEFAULT
gulp.task('default',function() {
	// Image MIN
	gulp.start("images");
	// SASS
	gulp.watch('sass/**/*.scss',['sass']);
});