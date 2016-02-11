/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

/*
|--------------------------------------------------------------------
|  GULP FUNCTIONS
|--------------------------------------------------------------------
*/

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

// Copy Misc Files Task
gulp.task('copy', function() {
	// Copy specified folders and contents
    	gulp.src('*/+(fonts)/**', {base:"./dev/"})
        .pipe(gulp.dest('dist/'));

	// Copy all non-directory files
	gulp.src('dev/*.+(xml|txt|json)')
	.pipe(gulp.dest('dist/'));

	// Copy HTACCESS file seperately as it wouldn't play nice
	gulp.src('dev/.htaccess')
	.pipe(gulp.dest('dist/'));
});

// Combine JS
gulp.task('js-combine', function() {
	return gulp.src([
		'./dev/js/vendor/jquery-1.12.0.min.js',
		'./dev/js/vendor/modernizr.js',
		'./dev/js/global.js',
	])
	.pipe(concat('core.js'))
	.pipe(gulp.dest('./dist/js'));
});

// Minify JS
gulp.task('js-min', ['js-combine'], function() {
	gulp.src('./dist/js/core.js')
	.pipe(rename("core.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js/'));
});

// Bring JS tasks together
gulp.task('js', function() {
	gulp.start("js-combine");
	gulp.start("js-min");
});

/*
|--------------------------------------------------------------------
|  GULP PRODUCTION FUNCTIONS
|--------------------------------------------------------------------
*/

// WATCH FUNCTION
gulp.task("watch", function() {
	// Images
	gulp.watch('dev/img/*.+(png|jpg|gif|svg)',['images']);
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
	// JS
	gulp.watch('dev/js/**/*.js',['js']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	// Images
	gulp.start("images");
	// Copy Files
	gulp.start("copy");
	// SASS
	gulp.start("sass");
	// JS
	gulp.start("js");
});