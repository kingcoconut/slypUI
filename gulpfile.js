var gulp = require('gulp');

// node file system
var fs = require('fs');


// Include Our Plugins
var util      = require('gulp-util'),
  jshint      = require('gulp-jshint'),
  compass     = require('gulp-compass'),
  rename      = require('gulp-rename'),
  clean       = require('gulp-clean'),
  swig        = require('gulp-swig'),
  livereload  = require('gulp-livereload'),
  include     = require('gulp-include'),
  runSequence = require('run-sequence'),
  concat      = require('gulp-concat'),
  uglify      = require('gulp-uglify'),
  minify      = require('gulp-minify-css'),
  template    = require('gulp-template');
  // coffee      = require('gulp-coffee');



// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('theme', function() {
    return gulp.src(['./app/theme/styles/**/*'])
      .pipe(gulp.dest('./public/' + ASSETS_PATH + "styles/"));
});

gulp.task('config', function() {
  configFile = fs.readFileSync('./app/config.json', 'utf8');
  configs = JSON.parse(configFile);
  return gulp.src('./app/templates/config.html')
        .pipe(template(configs[ENVIRONMENT]))
        .pipe(rename("config.js"))
        .pipe(gulp.dest('./app/scripts/'));
});

gulp.task('scripts', function() {
  return gulp.src([
      './app/scripts/**/*'
    ])
    // .pipe(coffee({bare:true}))
    .pipe(gulp.dest('./public/' + ASSETS_PATH + "scripts/"));
});

// Concatenate & Minify JS
gulp.task('scripts_min', function() {
  return gulp.src([
      './app/scripts/**/*'
    ])
    .pipe(uglify().on("error", function(message){return;}))
    .pipe(gulp.dest('./public/' + ASSETS_PATH + "scripts/"));
});

gulp.task('img', function(){
  return gulp.src('./app/images/**/*.*')
    .pipe(gulp.dest('./public/' + ASSETS_PATH + 'images'));
});

gulp.task('css', function(){
  return gulp.src('./app/styles/theme-mods.css')
    .pipe(gulp.dest('./public/' + ASSETS_PATH + 'styles'));
});

gulp.task('compass', function() {
  require('fs').writeFile('./app/styles/_asset_variables.scss', "$assets_path : '" + ASSETS_PATH + "';")
  return gulp.src('./app/styles/application.scss')
    .pipe(compass({
      sourcemap: true,
      sass: './app/styles/',
      css: './public/' + ASSETS_PATH + "/styles/"
    }));
});

gulp.task('fonts', function(){
  return gulp.src('./app/fonts/**/*.*')
    .pipe(gulp.dest('./public/' + ASSETS_PATH + 'fonts'));
});

// Compile Templates
gulp.task('index', function(){
  gulp.src(['./app/templates/index.html'])
    .pipe(swig({
      defaults: {
        cache: false,
        locals: {
          asset_path: ASSETS_PATH,
          environment: ENVIRONMENT,
        }
      },
      setup: function(swig){
        swig.setFilter("assetPath", assetPath);
      }
    }))
    .pipe(gulp.dest('./public/'))
    .pipe(gulp.dest('./public/' + ASSETS_PATH));
});

// Clean build
gulp.task('clean', function() {
  return gulp.src([
      './public/assets',
      './public/index.html',
    ])
    .pipe(clean({force: true}));
});

// Watch Files For Changes
gulp.task('watch', function() {
  livereload.listen();

  gulp.watch('./app/scripts/**/*.js', ['lint', 'scripts']);
  gulp.watch(['./app/templates/**/*.html'], ['index']);
  gulp.watch(['./app/styles/**/*'], ['css', 'compass']);
  gulp.watch(['./app/images/**/*'], ['img']);
});

gulp.task('default', function(){
  ENVIRONMENT = "development";
  ASSETS_PATH = 'assets/';
  runSequence('clean', 'img', 'config', ['scripts', 'theme', 'css', 'compass', 'fonts'], 'index', 'watch');
});

gulp.task('cdn', function(){
  if(typeof process.argv.slice(4)[0] == 'undefined'){
    console.log('\n\n###################################');
    console.log("Please specify a deployment environment");
    console.log("\teg. gulp cdn -a beta");
    console.log('###################################\n\n');
    return;
  }
  ENVIRONMENT = process.argv.slice(4)[0];
  ASSETS_PATH = "assets/" + Date.now() + '/';
  runSequence('img', 'config', ['scripts', 'theme', 'css', 'compass', 'fonts'], 'index');
});

assetPath = function (input) {
  return "/" + ASSETS_PATH + input;
};