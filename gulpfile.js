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
var gulpif = require('gulp-if');
const del = require('del');

/*
|--------------------------------------------------------------------
| TO DO
|--------------------------------------------------------------------
*/

/*
- How HTML is handled
*/

/*
|--------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------
*/

// If minify is true then css & js will be minified
// This is in case the code needs to be maintained by a less-technical developer
var minify = true;

/*
|--------------------------------------------------------------------
|  FUNCTIONS
|--------------------------------------------------------------------
*/

// Delete DIST folder
gulp.task('delete', function(){
	del('dist/').then(paths => {
		console.log('Deleted files and folders:\n', paths.join('\n'));
	});
});

// SASS
gulp.task('sass', function () {
	gulp.src('dev/sass/**/*.scss')
    	.pipe(gulpif(minify, sass({outputStyle:'compressed'}), sass({outputStyle:'expanded'})))
	.on('error', sass.logError)
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

// Combine JS and minify
gulp.task('js', function() {
	return gulp.src([
		'./dev/js/vendor/jquery-1.12.0.min.js',
		'./dev/js/vendor/modernizr.js',
		'./dev/js/global.js',
	])
	.pipe(concat('core.js'))
    	.pipe(gulpif(minify, rename("core.min.js"), gulp.dest('./dist/js')))
    	.pipe(gulpif(minify, uglify()))
    	.pipe(gulpif(minify, gulp.dest('./dist/js/')));
});

/*
|--------------------------------------------------------------------
|  PRODUCTION FUNCTIONS
|--------------------------------------------------------------------
*/

// Here we pull everything together into generic watch and build functions

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
	// Delete Dist Folder
	gulp.start("delete");
	// Images
	gulp.start("images");
	// Copy Files
	gulp.start("copy");
	// SASS
	gulp.start("sass");
	// JS
	gulp.start("js");
});