const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassdoc = require('sassdoc');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const child = require('child_process');
const browserSync = require('browser-sync').create();

const babel = require('gulp-babel');

// variables
const input = './_assets/scss/styles.scss';
const output = './_assets/css';
const sassWatch = './_assets/scss/**/*.scss';

const sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

const autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

const sassdocOptions = {
  dest: './sassdoc'
};

const jsFiles = [
  './_assets/bower_components/jquery/dist/jquery.js',
  './_assets/bower_components/what-input/dist/what-input.js',
  './_assets/bower_components/foundation-sites/dist/js/foundation.js',
  './_assets/bower_components/cookie-notice-js/dist/cookie.notice.js',
  './_assets/bower_components/slick-carousel/slick/slick.js',
  './_assets/js/instagram.js',
  './_assets/js/scripts.js'
];
const jsDest = './_assets/js';
const jsWatch = [
  './_assets/js/instagram.js',
  './_assets/js/scripts.js'
];

const cssFiles = [
  './_assets/bower_components/foundation-sites/dist/css/foundation.css',
  './_assets/bower_components/slick-carousel/slick/slick.css',
  './_assets/bower_components/slick-carousel/slick/slick-theme.css',
  './_assets/fonts/kit-marvinbernd-aca6aee2/css/embedded-woff.css',
  './_assets/css/styles.css'
];
const cssDest = './_assets/css';

// tasks
gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest(output))
    .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src(cssFiles)
    .pipe(concat('app.css'))
    .pipe(gulp.dest(cssDest))
    .pipe(rename('app.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(cssDest));
});

gulp.task('scripts', function() {
  return gulp.src(jsFiles)
    .pipe(babel({ignore: ['./_assets/bower_components/what-input/dist/what-input.js']}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('app.min.js'))

    .pipe(gulp.dest(jsDest));
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('browserSync', () => {
  browserSync.init({
    port: 4000,
    ui: {
      port: 4001
    },
    server: {
      baseDir: '_site/'
    }
  });
});

gulp.task('watch:css', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(sassWatch, ['sass', 'css'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      browserSync.reload();
    });
});

gulp.task('watch:js', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch(jsWatch, ['scripts'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      browserSync.reload();
    });
});

gulp.task('default', ['jekyll', 'sass', 'css', 'scripts', 'browserSync', 'watch:css', 'watch:js']);
