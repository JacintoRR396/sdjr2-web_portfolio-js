const { src, dest, watch, series } = require('gulp');

// Generic
const rename = require('gulp-rename');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Javascript
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Paths
const pathOriginCSS = 'src/scss/app.scss';
const pathTagetCSS = 'build/css';

const pathOriginJS = 'src/js/**/*.js';
const pathTagetJS = 'build/js';

const pathOriginImages = 'src/images/**/*';
const pathTargetImages = 'build/img';

// Functions
function css( done ) {
    src(pathOriginCSS)
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        // .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( postcss([ autoprefixer() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest(pathTagetCSS) )

    done();
}

function js( done ) {
    src(pathOriginJS)
        .pipe( babel() )
        .pipe( dest(pathTagetJS) )
        .pipe( uglify() )
        .pipe( rename({ extname: '.min.js' }) )
        .pipe( dest(pathTagetJS) );
    done();
}

function images() {
    return src(pathOriginImages)
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest(pathTargetImages) )
}
function imgVersionWebp() {
    const opciones = {
        quality: 50
    }
    return src(pathOriginImages + '.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest(pathTargetImages) )
}
function imgVersionAvif() {
    const opciones = {
        quality: 50
    }
    return src(pathOriginImages + '.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest(pathTargetImages))
}

function dev() {
    watch( 'src/images/**/*', images );
    watch( 'src/scss/base/*.scss', css );
    watch( 'src/scss/design/*.scss', css );
    watch( 'src/js/**/*.js', js );
}

// Exports
exports.css = css;
exports.js = js;
exports.images = images;
exports.vWebp = imgVersionWebp;
exports.vAvif = imgVersionAvif;
exports.dev = dev;

/* exports.default = series( images, imgVersionWebp, css, js, dev ); */
exports.default = series( css, js, dev );
/* exports.default = series( css ); */