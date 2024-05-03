import gulp from 'gulp';
import sassModule from 'gulp-sass';
import dartSass from 'sass';
import imagemin from 'gulp-imagemin';
import terser from 'gulp-terser';

const sass = sassModule(dartSass);

function compilaSass() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

function comprimeImagens() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
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

export {
    compilaSass,
    comprimeImagens,
    comprimeJavascript,
    watchTasks as watch
};

export default gulp.parallel(compilaSass, comprimeImagens, comprimeJavascript, watchTasks);




