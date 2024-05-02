const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const terser = require('gulp-terser');

async function comprimeImagens() {
    const imagemin = (await import('gulp-imagemin')).default;
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

function compilaSass() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

function comprimeJavascript() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./dist/js'));
}

function watchTasks() {
    gulp.watch('./src/styles/**/*.scss', compilaSass);
    gulp.watch('./src/images/**/*', comprimeImagens);
    gulp.watch('./src/scripts/**/*.js', comprimeJavascript);
}

exports.compilaSass = compilaSass;
exports.comprimeImagens = comprimeImagens;
exports.comprimeJavascript = comprimeJavascript;
exports.watch = watchTasks;

exports.default = gulp.parallel(compilaSass, comprimeImagens, comprimeJavascript, watchTasks);


