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
var sassport = require('gulp-sassport');
const del = require('del');

/*
|--------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------
*/

// If minify is true then css & js will be minified
// This is in case the code needs to be maintained by a less-technical developer
var minify = false;

/*
|--------------------------------------------------------------------
|  FUNCTIONS
|--------------------------------------------------------------------
*/

// Delete DIST folder
gulp.task('deleteDist', function(){
	del('dist/');
});

// Delete DIST folder
gulp.task('deleteTemp', ['sass'], function(){
	del('dev/js/configs/temp/');
});

// SASS w. SASSPort
gulp.task('sass', function () {
	// Concat configs into temp file for export
	gulp.src([
		'./dev/js/configs/breakpoints.js',
		'./dev/js/configs/export.js'
	])
	.pipe(concat('export-temp.js'))
	.pipe(gulp.dest('./dev/js/configs/temp'))
	// Run standard SASS job
	gulp.src('dev/sass/**/*.scss')
	// Replaced breakpoints.js with concat fine
    	.pipe(gulpif(minify, sassport(['dev/js/configs/temp/export-temp.js'],{outputStyle:'compressed'}), sassport(['dev/js/configs/temp/export-temp.js'],{outputStyle:'expanded'})))
    	.pipe(gulpif(minify, rename("style.min.css")))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/css/'))
	// Clean up temp export file
	gulp.start("deleteTemp");
});

// Image MIN & with CACHE to stop repeat compressed images
gulp.task('images', function(){
	return gulp.src('dev/img/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({optimizationLevel: 3, progressive: true})))
	.pipe(gulp.dest('dist/img/'))
});

// Copy Misc Files Task
gulp.task('copy', function() {

	// Copy all non-directory files
	gulp.src('dev/*.+(xml|txt|json)')
	.pipe(gulp.dest('dist/'));

	// Copy specified folders and contents
    	gulp.src('*/+(fonts)/**', {base:"./dev/"})
      .pipe(gulp.dest('dist/'));

	// Copy HTACCESS file seperately as it wouldn't play nice
	gulp.src('dev/.htaccess')
	.pipe(gulp.dest('dist/'));
});

// Combine JS and minify
gulp.task('js', function() {
	return gulp.src([
		'./dev/js/vendor/*.js',
		'./dev/js/polyfills/*.js',
		'./dev/js/configs/breakpoints.js',
		'./dev/js/global.js'
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
	// Watch for Breakpoint JS changes and compile SASS
	gulp.watch('dev/js/configs/breakpoints.js',['sass']);
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
	// JS
	gulp.watch('dev/js/**/*.js',['js']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	// Delete Dist Folder
	gulp.start("deleteDist");
	// Images
	gulp.start("images");
	// SASS
	gulp.start("sass");
	// JS
	gulp.start("js");
	// Copy Files
	gulp.start("copy");
});