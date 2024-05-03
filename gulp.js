import gulp from 'gulp';
import sass from 'gulp-sass';
import imagemin from 'gulp-imagemin';
import terser from 'gulp-terser';

export function compilaSass() {
    return gulp.src('./src/styles/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
}

export function comprimeImagens() {
    return gulp.src('./src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'));
}

export function comprimeJavascript() {
    return gulp.src('./src/scripts/**/*.js')
        .pipe(terser())
        .pipe(gulp.dest('./dist/js'));
}

export function watchTasks() {
    gulp.watch('./src/styles/**/*.scss', compilaSass);
    gulp.watch('./src/images/**/*', comprimeImagens);
    gulp.watch('./src/scripts/**/*.js', comprimeJavascript);
}

export default gulp.parallel(compilaSass, comprimeImagens, comprimeJavascript, watchTasks);
