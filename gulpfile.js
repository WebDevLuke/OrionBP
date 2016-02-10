/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

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

// Copy Files Wrapper Function
function gulpCopy(file, destination){
	gulp.start("copy");
};

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

/*
|--------------------------------------------------------------------
|  GULP PRODUCTION FUNCTIONS
|--------------------------------------------------------------------
*/

// WATCH FUNCTION
gulp.task("watch", function() {
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
});

// BUILD FUNCTION
gulp.task('default',function() {
	// Image MIN
	gulp.start("images");
	// Copy File
	gulp.start("copy");
	// SASS
	gulp.start("sass");
});