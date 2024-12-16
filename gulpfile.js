const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

function compileSASS(){
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 version', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
        cascade:false,
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('compileSASS', compileSASS)

function gulpJS(){
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('allJS',gulpJS)

function pluginsCSS(){
    return gulp.src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginsCSS',pluginsCSS)

function pluginsJS(){
    return gulp.src(['./js/lib/aos.js','./js/lib/swiper.min.js','./js/lib/axios.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginJS',pluginsJS)

function browser(){
    browserSync.init({
        server:{ 
            baseDir:'./'
        }
    })
}

gulp.task('browser-sync', browser)

function watch(){
    gulp.watch('scss/*.scss', compileSASS)
    gulp.watch('*.html').on('change', browserSync.reload)
    gulp.watch('js/scripts/*.js', gulpJS)
    gulp.watch('js/lib/*.js', pluginsJS)
    gulp.watch('css/lib/*.css', pluginsCSS)
}

gulp.task('watch', watch)

gulp.task('default', gulp.parallel('watch','browser-sync', 'allJS', 'pluginJS', 'pluginsCSS', 'compileSASS'))