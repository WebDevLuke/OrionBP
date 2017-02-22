/*
|--------------------------------------------------------------------
| SET DEPENDENCIES
|--------------------------------------------------------------------
*/

// Required for all tasks
const gulp = require('gulp');
// Required for SASS tags
const sass = require('gulp-sass');
// Adds support for SASS globbing
const sassGlob = require('gulp-sass-glob');
// Minifies images
const imagemin = require('gulp-imagemin');
// Used to minify JS
const uglify = require('gulp-uglify');
// Used to rename CSS and JS depending if minified
const rename = require("gulp-rename");
// Used to add conditional functionality
const gulpif = require('gulp-if');
// Used to allow SASS to require JSON data
const sassport = require('gulp-sassport');
// Used to remove unused CSS styles post compile
const uncss = require('gulp-uncss');
// Used to create synchronous build tasks
const runSequence = require('run-sequence');
// Used to pipe JSON data into Jade
const data = require('gulp-data');
// Used to delete folders during build process
const del = require('del');
// Used to add autoprefixer to SASS task
const autoprefixer = require('gulp-autoprefixer');
// Used to compile JS modules
const browserify = require("browserify");
const source = require('vinyl-source-stream');
const glob = require('glob');
const streamify = require('gulp-streamify');
// Used to generate svg icon system and to minify
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const inject = require('gulp-inject');
// Used to compile nunjacks templates if present
const nunjucks = require('gulp-nunjucks');
// Used to lint SASS
const gulpStylelint = require('gulp-stylelint');

/*
|--------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------
*/

// If minify is true then CSS & JS will be minified
// This is in case the code needs to be maintained by a less-technical developer
const minify = true;

// If lint then CSS will be linted to enforce style guidelines
const lint = true;

/*
|--------------------------------------------------------------------
|  ORION SETUP TASK
|--------------------------------------------------------------------
*/

// Task which you run on project start to setup SASS directory and copy required files from dependancy

/*
Creates SASS directory in /dev and adds the following:
	- main.sample renamed to main
	- component.sample added to components folder
	- Creates rest of folders
*/

/*
|--------------------------------------------------------------------
|  DELETE DIST FOLDER
|--------------------------------------------------------------------
*/

// Delete any existing Dist folder so old files don't contaminate our new build

gulp.task('deleteDist', function(){
	return del('dist/');
});

/*
|--------------------------------------------------------------------
|  SASS
|--------------------------------------------------------------------
*/

// Compile SASS, add autoprefixer and filter out unused CSS styles
// That way we can have unlimited utility classes and only have the ones we're actually using in our compiled CSS file
// We also tell uncss to ignore styles with stateful modifiers as these are typically added into the DOM dynamically which UNCSS is unable to detect
gulp.task('sass', function () {
	return gulp.src('dev/sass/*.scss')
	.pipe(sassGlob())
	.pipe(gulpif(minify, sassport([],{outputStyle: 'compressed', precision: 8}), sassport([], {outputStyle: 'expanded', precision: 8})))
	.pipe(gulpif(minify, rename({ suffix: '.min' })))
	.on('error', sass.logError)
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
		cascade: false
	}))
	.pipe(gulp.dest('./dist/css/'))
});

// A SASS task for debug use. Compiles an unminified stylesheet but uses canon naming structure as per minify variable so no links are broken on the page
gulp.task('sass-debug', function () {
	return gulp.src('dev/sass/*.scss')
	.pipe(sassGlob())
	.pipe(sassport([],{outputStyle: 'expanded', precision: 8}))
	.pipe(gulpif(minify, rename({ suffix: '.min' })))
	.on('error', sass.logError)
	.pipe(autoprefixer({
		browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
		cascade: false
	}))
	.pipe(gulp.dest('./dist/css/'))
});


// Lint SASS Task
gulp.task('sass-lint', function lintCssTask() {
	return gulp.src('dev/sass/**/*.scss')
	.pipe(gulpStylelint({
		reportOutputDir: 'reports/lint',
		reporters: [{
			formatter: 'verbose',
			console: true,
			save: 'report.txt'
		}]
	}));
});

// UNCSS Task
gulp.task('uncss', function () {
	return gulp.src('dist/css/*.css')
	.pipe(uncss({
		html: ['dist/*.html'],
		ignore: [
			/\.is-*/,
			/\.has-*/,
			/\.in-*/	
		]
	}))
	.pipe(gulp.dest('./dist/css/'))
});

// Watch task for SASS. Lints and then runs standard SASS functions. No UNCSS to speed things up..
gulp.task('sass-watch', function(){
	if(lint) {
		runSequence(
			"sass-lint",
			"sass",
			"uncss"
		);
	}
	else {
		runSequence(
			"sass",
			"uncss"
		);		
	}
});

// Create seperate sass build task which lints and then runs standard SASS functions followed by UNCSS
// This will be used on Build task. It won't be used on watch task to speed things up.
gulp.task('sass-build', function(){
	if(lint) {
		runSequence(
			"sass-lint",
			"sass",
			"uncss"
		);
	}
	else {
		runSequence(
			"sass",
			"uncss"
		);		
	}
});

gulp.task('sass-build-debug', function(){
	if(lint) {
		runSequence(
			"sass-lint",
			"sass-debug",
			"uncss"
		);
	}
	else {
		runSequence(
			"sass",
			"uncss"
		);		
	}
});


/*
|--------------------------------------------------------------------
|  IMAGES
|--------------------------------------------------------------------
*/

// Image MIN & with CACHE to stop repeat compressed images
gulp.task('bitmap', function(){
	gulp.src('dev/src/asset/img/*.+(png|jpg|gif)')
	.pipe(imagemin({optimizationLevel: 3, progressive: true}))
	.pipe(gulp.dest('./dist/src/asset/img/'));
});

// Compile all SVG icons into one large svg icon and inject as inline svg into page header
// We can then directly reference these icons without making an extra request
gulp.task('svg', function () {
	var svgs = gulp
		.src('dev/img/**/*.svg')
		.pipe(svgmin(function (file) {
			var prefix = path.basename(file.relative, path.extname(file.relative));
			return {
				plugins: [
					{
						removeDoctype: true
					},
					{
						removeUselessDefs: true
					},
					{
						removeTitle: true
					},
					{
						cleanupIDs: {
							prefix: prefix + '-',
							minify: true
						}
					}
				]
			}
		}))
		.pipe(svgstore({ inlineSvg: true }));

		function fileContents (filePath, file) {
			return file.contents.toString();
		}

		return gulp
		.src('dist/*.html')
		.pipe(inject(svgs, { transform: fileContents }))
		.pipe(gulp.dest('dist/'));
});

gulp.task('images', function(){
	runSequence(
		"bitmap",
		"svg"
	);
});


/*
|--------------------------------------------------------------------
|  JS
|--------------------------------------------------------------------
*/

gulp.task('js-process', function() {
	var files = glob.sync('./dev/js/*.js');
	files.map(function(file) {
		var name = file.replace("./dev/js/", "");
		name = name.replace(".js", "");
		return browserify({entries: file})
		.transform("babelify", {presets: ["es2015"]})
		.bundle()
		.pipe(source(file))
		.pipe(gulpif(minify, rename({ 
			dirname: "",
			basename: name,
			suffix: ".min",
			extname: ".js"
		}), rename({ 
			dirname: "",
			basename: name,
			extname: ".js"
		})))
		.pipe(gulpif(minify, streamify(uglify())))
		.pipe(gulp.dest('./dist/js/'));
	});
});

// Copy Across specific JS files
gulp.task('js-copy', function() {
	// Copy all non-directory files
	gulp.src('dev/js/seperate/*.js')
	.pipe(gulpif(minify, rename({ suffix: '.min' }), gulp.dest('./dist/js/')))
	.pipe(gulpif(minify, uglify()))
	.pipe(gulpif(minify, gulp.dest('./dist/js/')));
});

gulp.task('js', function(){
	runSequence(
		"js-process",
		"js-copy"
	);
});


/*
|--------------------------------------------------------------------
|  HTML
|--------------------------------------------------------------------
*/

gulp.task('html-copy', function() {
	return gulp.src('./dev/html/*.html')
	.pipe(nunjucks.compile())
	.pipe(gulp.dest('dist/'));
});

/*
HTML task need to also run SVG task as SVG task copies master file into html document.
It also needs to run SASS task as new CSS classes may have been used which need to be added to the compiled CSS file
*/

gulp.task('html', function(){
	runSequence(
		"html-copy",
		"svg",
		"sass"
	);
});


/*
|--------------------------------------------------------------------
|  PHP & SQL
|--------------------------------------------------------------------
*/

/* Copy PHP & SQL files across and keep their directory structure intact */
gulp.task("php", function() {
	return gulp.src('./dev/**/*.+(php|sql)')
	.pipe(gulp.dest('dist/'));
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
	// HTML
	gulp.watch('dev/html/**/*.html',['html']);
	// PHP & MYSQL
	gulp.watch('dev/**/*.(php|sql)',['php']);
	// Images
	gulp.watch('dev/img/*.+(png|jpg|gif|svg)',['images']);
	// Watch for Breakpoint JS changes and compile SASS
	gulp.watch('dev/data/breakpoints.json',['sass-watch']);
	// SASS
	// UNCSS doesn't run for watch task to speed things up
	gulp.watch('dev/sass/**/*.scss',['sass-watch']);
	// JS
	gulp.watch('dev/js/**/*.js',['js']);
});

// BUILD FUNCTION
gulp.task('build',function() {
	runSequence(
		// Delete Dist Folder
		"deleteDist",	
		// Run other tasks asynchronously 
		["html", "php", "sass-build", "js", "copy", "images"]
	);
});