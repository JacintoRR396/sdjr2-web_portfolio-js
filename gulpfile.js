const { src, dest, watch, series } = require('gulp');

// CSS y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

// Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Paths
const pathOriginCSS = 'src/scss/app.scss';
const pathTagetCSS = 'build/css';

const pathOriginImages = 'src/images/**/*';
const pathTargetImages = 'build/img';

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

function imagenes() {
    return src(pathOriginImages)
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest(pathTargetImages) )
}
function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src(pathOriginImages + '.{png,jpg}')
        .pipe( webp( opciones ) )
        .pipe( dest(pathTargetImages) )
}
function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src(pathOriginImages + '.{png,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest(pathTargetImages))
}

function dev() {
    watch( 'src/images/**/*', imagenes );
    watch( 'src/scss/base/*.scss', css );
    watch( 'src/scss/design/*.scss', css );
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;

exports.default = series( imagenes, versionWebp, css, dev );
/* exports.default = series( css ); */