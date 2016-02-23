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
var runSequence = require('run-sequence');
const del = require('del');

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
|  DELETE DIST FOLDER
|--------------------------------------------------------------------
*/

gulp.task('deleteDist', function(){
	return del('dist/');
});

/*
|--------------------------------------------------------------------
|  SASS
|--------------------------------------------------------------------
*/

// Concat Breakpoints
gulp.task('bpConcat', function () {
	// Concat configs into temp file for export
	return gulp.src([
		'./dev/js/config.js',
		'./dev/js/partials/modules/breakpoints.js',
		'./dev/js/partials/modules/export.js'
	])
	.pipe(concat('export-temp.js'))
	.pipe(gulp.dest('./temp'))
});

gulp.task('sassTasks', function () {
	// Run standard SASS job
	return gulp.src('dev/sass/**/*.scss')
	// Replaced breakpoints.js with concat fine
    	.pipe(gulpif(minify, sassport(['temp/export-temp.js'],{outputStyle:'compressed'}), sassport(['temp/export-temp.js'],{outputStyle:'expanded'})))
    	.pipe(gulpif(minify, rename("style.min.css")))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/css/'));
});

// Delete TEMP folder
gulp.task('deleteTemp', function(){
	return del('temp/');
});

gulp.task('sass',function() {
	runSequence(
		"bpConcat",
		"sassTasks",
		"deleteTemp"
	);
});

/*
|--------------------------------------------------------------------
|  IMAGES
|--------------------------------------------------------------------
*/

// Image MIN & with CACHE to stop repeat compressed images
gulp.task('images', function(){
	return gulp.src('dev/img/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin({optimizationLevel: 3, progressive: true})))
	.pipe(gulp.dest('dist/img/'))
});

/*
|--------------------------------------------------------------------
|  JS
|--------------------------------------------------------------------
*/

// Combine JS and minify
gulp.task('js', function() {
	return gulp.src([
		'./dev/js/partials/vendor/*.js',
		'./dev/js/partials/polyfills/*.js',
		'./dev/js/config.js',
		'./dev/js/partials/modules/breakpoints.js',
		'./dev/js/global.js'
	])
	.pipe(concat('core.js'))
    	.pipe(gulpif(minify, rename("core.min.js"), gulp.dest('./dist/js')))
    	.pipe(gulpif(minify, uglify()))
    	.pipe(gulpif(minify, gulp.dest('./dist/js/')));
});

/*
|--------------------------------------------------------------------
|  MISC
|--------------------------------------------------------------------
*/

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
	gulp.watch('dev/js/partials/breakpoints.js',['sass']);
	// SASS
	gulp.watch('dev/sass/**/*.scss',['sass']);
	// JS
	gulp.watch('dev/js/**/*.js',['js']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	runSequence(
		// Delete Dist Folder
		"deleteDist",	
		// Run other tasks asynchronously 
		["images", "sass", "js", "copy"]
	);
});