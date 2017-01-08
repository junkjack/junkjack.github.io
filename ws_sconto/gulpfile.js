// Author: Eon!!
var gulp = require("gulp");

// auto require all plugins
// use like plugins.pluginname (like. plugins.sass)
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'browser-sync', 'imagemin-jpeg-recompress', 'imagemin-pngquant', 'sprity'],
	replaceSting: /\bgulp[\-.]/,
	rename: { // Rename/shorten usage for plugin names
		'imagemin-jpeg-recompress': 'imageminJpeg',
		'imagemin-pngquant': 'imageminPng',
		'gulp-if': 'gulpIf'
	}
});

// Browsery Sync
var reload = plugins.browserSync.reload;

// Js
// Concat + Minifiy Js Files and move to vendor folder
var jsFiles = ['assets/js/plugins/*.js'];
var jsDest = 'assets/js/';

gulp.task('js', function () {
	return gulp.src(jsFiles)
		.pipe(plugins.order([
			'jquery.min.js',
			'bootstrap.min.js',
			'jquery.plugin.min.js',
			'jquery.countdown.min',
			'*.js',
		]))
		.pipe(plugins.concat('plugins.js'))
		.pipe(gulp.dest(jsDest))
		.pipe(plugins.rename({ suffix:'.min' }))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(jsDest));
});

// Css
// Concat + Minifiy Css Files and move to vendor folder
var cssFiles = 'assets/css/plugins/*.css';
var cssDest = 'assets/css/';

gulp.task('css', function () {
	return gulp.src(cssFiles)
		.pipe(plugins.order([
			'bootstrap.min.css',
			'*.css'
		]))
		.pipe(plugins.concat('plugins.css'))
		.pipe(gulp.dest(cssDest))
		.pipe(plugins.rename({ suffix:'.min' }))
		.pipe(plugins.cssmin({keepSpecialComments : 0 }))
		.pipe(gulp.dest(cssDest));
});

// Sprites - if you have any problem with sprites
// https://github.com/nodejs/node-gyp#installation 
// https://github.com/nodejs/node-gyp/issues/629
// for error:lwip run - npm install lwip
var iconsSrc = 'assets/images/icons/**/*.{png,jpg}';
var spritesDest = 'assets/images/';
gulp.task('sprites', function() {
	return plugins.sprity.src({
		src: iconsSrc,
		style: 'assets/scss/_sprites.scss',
		processor: 'sass',
		dimension: [ { ratio: 1, dpi: 35 }, { ratio: 2, dpi: 72 } ],
		margin: 0
	})
	.pipe(plugins.gulpIf('*.png', gulp.dest(spritesDest), gulp.dest('assets/sass/')))
	.pipe(reload({ stream: true }));
});

// Sass
var sassFile = 'assets/sass/style.scss';
var sassDest = 'assets/css/';
gulp.task('sass', function () {
	return gulp.src(sassFile)
		.pipe(plugins.sass({outputStyle: 'expanded'})) // expanded - compressed - compact - nested
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 versions', 'ie 9'],
			cascade: false
		}))
		.pipe(gulp.dest(sassDest))
		.pipe(reload({ stream: true }));
});

// Images - Optimize jpeg and png images
gulp.task('imagemin', function () {
	return gulp.src('assets/images/**/*')
	    .pipe(plugins.imageminJpeg({loops: 3})())
	    .pipe(plugins.imageminPng({quality: '65-80', speed: 4})())
	    .pipe(gulp.dest('assets/images'));
});

// call - gulp htmlmin
// Html files minify 
// this will make your html files minified 
// make sure to copy all html files before using this
gulp.task('htmlmin', function () {
  return gulp.src('*.html')
    .pipe(plugins.htmlmin({
    	collapseWhitespace: true,
    	removeComments: true,
    	minifyJS: true, // minify js too
    	minifyCSS: true // minify css too
    }))
    .pipe(gulp.dest(''))
});


gulp.task('sync', ['default'], function () {

	plugins.browserSync({
		proxy: 'localhost/sconto/'
	});

	// watch js files
	gulp.watch(jsFiles, ['js']);
	// watch scss files
	gulp.watch(['assets/sass/*.scss', 'assets/sass/*/*.scss'], ['sass']);
	// watch scss files
	gulp.watch(cssFiles, ['css']);

	// watch icons folder run sprites task after this task sass task will run :P
	gulp.watch(iconsSrc, ['sprites']);

	gulp.watch([
		'*.html',
		'assets/js/main.js'
	]).on('change', reload);
});

// Default Task
gulp.task('default', ['js', 'css', 'sprites', 'sass']);