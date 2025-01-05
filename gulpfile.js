const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const obfuscate = require('gulp-obfuscate');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin')

function compilaSass(){ 
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
};

function comprimeJS(){ 
    return gulp.src('./source/scripts/*.js')
    .pipe(uglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'));
}

function comprimeImagem(){ 
    return gulp.src('./source/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/imgs/'))
}

exports.default = function(){ 
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js',  { ignoreInitial: false }, gulp.series(comprimeJS));
    gulp.watch('./source/imgs/*',        { ignoreInitial: false }, gulp.series(comprimeImagem));
};

//COMENTARIOS
//  A função compilaSass() não precisa do callback pois já tem um RETURN que acessa o gulp. (gulp.src) Essa função está buscando o codigo fonte que estará o arquivo SASS. 
//  .pipe(sass()) faz o encadeamento de função, sem isso não seria possível chamar uma outra função após o gulp.src 
//  .pipe(gulp.dest) manda o arquivo para a pasta designada
//  .pipe(sourcemaps.init()) irá iniciar o sourcempas que adiciona mapas de origem para facilitar a depuração do código.
//  Para iniciar o projeto de forma correta, deve se utilizar o função WATCH. 
//  A VERSÃO ATUAL DO GULP @5.0.0 NAO SUPORTA O IMAGEMIN,  npm install --save-dev gulp@4.0.2. USE ESSE! E A VERSÃO CORRETA DO IMAGEMIN PARA FUNCIONAR AQUI É npm install --save-dev gulp-imagemin@7.1.0. QUE DOR DE CABEÇA DO CAO. 