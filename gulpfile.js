var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var less = require('gulp-less');
var browserSync = require('browser-sync');


//to inject bower_modules in gulpfile.js
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files'),
    es = require('event-stream');


gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/styles/*.less'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(less())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/styles/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
    return gulp.src('src/app/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts/'))
    .pipe(browserSync.reload({stream:true}))
});

//convert less to css
var cssFiles = gulp.src('./src/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('./build'));


// when you day gulp in Git bash following section is executed
gulp.task('default', ['browser-sync', 'inject'], function () {
    gulp.src('./src/**/*.less')
 .pipe(less())
    gulp.watch("src/styles/*.less", ['styles', 'bs-reload']);
    //gulp.watch("./build/styles/*.css", ['styles', 'bs-reload']);
    gulp.watch("src/app/**/*.js", ['scripts', 'bs-reload']);
    gulp.watch("*.html", ['bs-reload']);
    gulp.watch("src/app/**/*.html", ['bs-reload']);
});


//inject your css file to index.html
gulp.task('inject', function () {
    gulp.src('./index.html')
      .pipe(inject(gulp.src(bowerFiles(), { read: false }), { name: 'bower' }))
      .pipe(inject(es.merge(
          cssFiles,
          gulp.src('./src/app/**/*.js', { read: false })
      )))
      .pipe(gulp.dest('./'));
});
