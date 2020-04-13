var gulp = require('gulp');
var git = require('gulp-git');
var fs = require('fs');
// including plugins gulp-minify-html
var minifyHtml = require("gulp-minify-html");
// including plugins gulp-uglify
var uglify = require("gulp-uglify");
// including plugins gulp-sass
var sass = require("gulp-sass");
// including plugins gulp-image
// var image = require('gulp-image');

// task build html
gulp.task('build-html', function() {
  return gulp.src('./src/*.html') // path to your files html
    .pipe(minifyHtml())
    .pipe(gulp.dest('./dist'));
});

// task scss to css
gulp.task('build-scss', function() {
  return gulp.src('./src/scss/*.scss') // path to your file
    .pipe(sass())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(gulp.src('./src/scss/lib/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest('./dist/assets/css/lib'))
});

// task javascript
gulp.task('build-js', function() {
  return gulp.src('./src/javaScript/*.js') // path to js
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/javascript'))
    .pipe(gulp.src('./src/javaScript/lib/*.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/javascript/lib'));
});

// task image
gulp.task('build-image', function() {
  gulp.src('./src/images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('create-new-tag', function(done) {
  var version = getPackageJsonVersion();
  git.tag(version, 'Created Tag for version: ' + version, function(error) {
    if (error) {
      return done(error);
    }
    git.push('origin', 'master', {
      args: '--tags'
    }, done);
  });

  function getPackageJsonVersion() {
    // We parse the json file instead of using require because require caches
    // multiple calls so the version number won't be updated
    return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
  };
});

gulp.task('release', gulp.series(
  'build-html',
  'build-js',
  'build-scss',
  'build-image'
));
