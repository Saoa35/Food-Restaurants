const { src, dest, watch, parallel } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();

function browsersync() {
    browserSync.init({
         server : {
            baseDir: 'app/'
         }
    });
}

function styles() {
    return src('app/scss/style.scss')
    .pipe(scss({outputStyle: 'expanded'}))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(browsersync, watching);