var gulp 	= require('gulp');
var stylus = require('gulp-stylus');
var watch = require('gulp-watch');
var notify  = require('gulp-notify');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var minifyCss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');

var spritesmith = require('gulp.spritesmith');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var del = require('del');
var vinylPaths = require('vinyl-paths');
var minimist = require('minimist');


gulp.task('webserver', function() {
	gulp.src('./').pipe(webserver({
		host:'0.0.0.0',
		livereload: true,
		directoryListing: true,
		port: 3000
	}));
});

gulp.task('jshint',function(){
	return gulp.src(['javascripts/**/*.js','!javascripts/all*.js','!javascripts/lib/jquery-2.1.3.min.js'])
	.pipe(jshint())
	.pipe(notify(function(file){
		if(file.jshint.success){
			return false
		}
		var errors = file.jshint.results.map(function(data){
			if(data.error){
				return "("+ data.error.line + ":" + data.error.character + ")" + data.error.reason;
			}
		}).join("\n");
		return file.relative + "(" + file.jshint.results.length + " errors)\n" + errors;
	}))
})
gulp.task('concat',function(){
	return gulp.src([
		'javascripts/**/*.js',
		])
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('javascripts/'))
})


gulp.task('stylesheets:page', function() {
  return gulp.src('stylesheets/*.css')
    .pipe(concatCss("style.css"))
		.pipe(minifyCss())
    .pipe(gulp.dest('css/'));
 })

gulp.task('clean:css',["stylesheets:page"],function () {
  return gulp.src('css/')
  .pipe(vinylPaths(del))
});

gulp.task('imagemin',function (){
	return gulp.src('img/item/*.+(jpg|jpeg|png|gif|svg)')
	.pipe(imagemin({
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant({
			quality: '60-80',
			speed: 1
		})]	
	}))
	.pipe(gulp.dest('img/dist/img/item'));
});

gulp.task('watch', function(){
	gulp.watch('javascripts/**/*.js',['jshint','concat']);
	gulp.watch('stylesheets/*.css',['stylesheets:page']);
})

// gulp.task('default', ['imagemin']);
gulp.task('start', ['watch']);

gulp.task('sprite', function () {
  var args = minimist(process.argv.slice(2));
  var imageName = 'icon';

  var spriteData = gulp.src('images/sprite/sprite_src_' + imageName + '/*.png')
  .pipe(spritesmith({
    imgName: 'images/sprite/sprite_'+imageName+'.png',
    cssName: 'sprite-'+imageName+'.styl',
    cssFormat: 'stylus',
    cssVarMap: function (sprite) {
      sprite.name = 'sprite-' + sprite.name;
    }
  }));
  spriteData.img.pipe(gulp.dest('sprite'));
  spriteData.css.pipe(gulp.dest('stylus/foundation/sprite'));
});
