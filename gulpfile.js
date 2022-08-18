const { src, dest } = require('gulp');
const scss = require('gulp-sass');

function styles() {
    return src('app/scss/style.scss')
    .pipe(scss())
    .pipe(dest('app/css/style.css'))
}

exports.styles = styles;