/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

// Required for all tasks
var gulp = require('gulp');
// Required for SASS tags
var sass = require('gulp-sass');
// Minifies images
var imagemin = require('gulp-imagemin');
// Used to prevent minifying of unchanged images
var cache = require('gulp-cache');
// Used to concat core js file
var concat = require('gulp-concat');
// Used to minify JS
var uglify = require('gulp-uglify');
// Used to rename CSS and JS depending if minified
var rename = require("gulp-rename");
// Used to add conditional functionality
var gulpif = require('gulp-if');
// Used to allow SASS to require JSON data
var sassport = require('gulp-sassport');
// Used to create synchronous build tasks
var runSequence = require('run-sequence');
// Used to convert ES2015 to accepted JS
var babel = require("gulp-babel");
// Used to convert Jade to HTML
var jade = require('gulp-jade');
// Used to pipe JSON data into Jade
var data = require('gulp-data');
// Used to delete folders during build process
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
|  DELETE DIST FOLDER
|--------------------------------------------------------------------
*/

gulp.task('deleteDist', function(){
	return del('dist/');
});

/*
|--------------------------------------------------------------------
|  JADE
|--------------------------------------------------------------------
*/

// Filter in JSON data
gulp.task('html', function() {
  return gulp.src('./dev/jade/*.jade')
    .pipe(data(function(file){
     		return require('./dev/data/info.json');
     }))
    .pipe(jade())
    .pipe(gulp.dest('dist/'));
});

/*
|--------------------------------------------------------------------
|  SASS
|--------------------------------------------------------------------
*/

gulp.task('sass', function () {
	return gulp.src('dev/sass/**/*.scss')
	.pipe(gulpif(minify, sassport({outputStyle: 'compressed'}), sassport({outputStyle: 'expanded'}) ))
    	.pipe(gulpif(minify, rename("style.min.css")))
	.on('error', sass.logError)
	.pipe(gulp.dest('./dist/css/'));
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
		//'./dev/js/partials/vendor/*.js',
		//'./dev/js/partials/polyfills/*.js',
		'./dev/js/partials/modules/breakpoints.js',
		'./dev/js/global.js'
	])
	.pipe(babel())
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

	// Copy all data files
	gulp.src('./dev/data/*.json')
	.pipe(gulp.dest('./dist/data/'));

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
	// HTML
	gulp.watch('dev/*.html',['html']);
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
		["html", "images", "sass", "js", "copy"]
	);
});