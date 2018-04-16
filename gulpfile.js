const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const sassdoc = require('sassdoc');
const gutil = require('gulp-util');
const child = require('child_process');
const browserSync = require('browser-sync').create();

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

gulp.task('watch', function() {
  return gulp
    // Watch the input folder for change,
    // and run `sass` task when something happens
    .watch([sassWatch, './**/*.html'], ['sass'])
    // When there is a change,
    // log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
      browserSync.reload();
    });
});

gulp.task('default', ['jekyll', 'sass', 'browserSync', 'watch']);
