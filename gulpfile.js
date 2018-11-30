var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync = require('browser-sync').create(), // Подключаем Browser Sync
    jade = require('gulp-jade'); // Подключаем jade
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    spritesmith = require('gulp.spritesmith'), // Подключаем библиотеку для создания png-спрайтов
    svgstore = require('gulp-svgstore'),//// Подключаем библиотеку для объединения SVG в один файл
    svgmin = require('gulp-svgmin'),//Подключаем библиотеку для минификации SVG
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    sourcemaps = require('gulp-sourcemaps'),//Подключаем плагин, записывающий карту источника в исходный файл
    rimraf = require('rimraf'),//Очищает указанные исходники
    plumber = require('gulp-plumber');//Подключаем плагин, который не останавливает задачи от остановки во время их выполнения при возникновении ошибки

var postcss = require('gulp-postcss'),//Блиотека-парсер стилей для работы с postcss-плагинами
    autoprefixer = require('autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cssnano = require('cssnano'),//postcss-плагин, для минификации CSS кода, идущего на продакшен.
    short = require('postcss-short'),
    stylefmt = require('stylefmt'),
    assets = require('postcss-assets'),
    sorting = require('postcss-sorting'),
    fontmagic = require('postcss-font-magician'),
    fixes = require('postcss-fixes');

/*css-libs*/
gulp.task('css-libs', function () { // Создаем таск css-libs
    var processors = [
        cssnano
    ]
    return gulp.src([
        'app/libs/**/*.css'
    ]) // Берем источник
        .pipe(postcss(processors))// сжымаем
        .pipe(concat('libs.min.css'))// объеденяем в файл
        .pipe(gulp.dest('./public/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.stream({})); // Обновляем CSS на странице при изменении
});

// /*png-sprite*/
// gulp.task('png-sprite', function () {// PNG Sprites
//     var spriteData =
//         gulp.src('app/img/sprites/*.*')// путь, откуда берем картинки для спрайта
//             .pipe(spritesmith({
//                 imgName: 'sprite.png',//имя генерируемой картинки
//                 cssName: '_png-sprite.sass',//имя css файла, который получится на выходе
//                 cssFormat: 'sass',//формат css файла
//                 algorithm: 'binary-tree',//способ сортировки изображений
//                 cssTemplate: 'sass.template.mustache',//функция или путь до mustache шаблона, дающие возможность настроить CSS-файл на выходе
//                 cssVarMap: function (sprite) {//цикл, настраивающий названия CSS переменных
//                     sprite.name = 's-' + sprite.name
//                 }
//             }));
//
//     spriteData.img.pipe(gulp.dest('./public/img/sprites/'));// путь, куда сохраняем картинку
//     spriteData.css.pipe(gulp.dest('app/sass/libs/'));// путь, куда сохраняем стили
// });

/*sass*/
gulp.task('sass', function () { // Создаем таск Sass
    var processors = [// подключаем постпроцессоры в массиве
        assets,
        short,
        fontmagic,
        fixes,
        autoprefixer(['last 5 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'], {
            cascade: true
        }),
        sorting(),
        // cssnano,
        stylefmt
    ];
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename({
            // suffix: ".min",
            extname: ".css"
        }))
        .pipe(sourcemaps.write('.', {sourceRoot: 'css-source'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream({}));
});

/*browser-sync*/
gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync.init({ // Выполняем browserSync
        server: {
            baseDir: './public' // Директория для сервера - app
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        notify: false // Отключаем уведомления
    });
});

/*vendor*/
// gulp.task('vendor', ['clean'], function () {
//     return gulp.src(['app/js-libs/jquery-2.1.3.min.js',
//         'app/js-libs/jquery-ui.min.js',
//         'app/js-libs/bootstrap.min.js',
//         'app/js-libs/jquery.fancybox.js',
//         'app/js-libs/fileinput.js',
//         'app/js-libs/jquery.jscrollpane.min.js',
//         'app/js-libs/jquery.mousewheel.js',
//         'app/js-libs/perfect-scrollbar.jquery.js',
//         'app/js-libs/lightbox.min.js',
//         'app/js-libs/countdown.js',
//         'app/js-libs/map.js',
//         'app/js-libs/validation.js',
//         'app/js-libs/fotorama.js',
//         'app/js-libs/slick.js',
//         'app/js-libs/owl.carousel.min.js'])// Берем все необходимые библиотеки
//         .pipe(plumber())
//         .pipe(concat('vendor.js'))// Собираем их в кучу в новом файле vendor.js
//         .pipe(rename({}))
//         /*.pipe(uglify()) // Сжимаем JS файл*/
//         .pipe(plumber.stop())
//         .pipe(gulp.dest('./public/js'));// Выгружаем в папку js
// });

/*compress*/
gulp.task('compress', ['clean'], function () {// Создаем таск compress
    return gulp.src('app/js/*.js')// Берем все необходимые библиотеки
        .pipe(plumber())
        .pipe(concat('script.js'))// Собираем их в кучу в новом файле script.js
        .pipe(rename({
            // suffix: ".min",// Добавляем суффикс .min
            extname: ".js"// Добавляем окончание .js
        }))
        // .pipe(uglify()) // Сжимаем JS файл
        .pipe(plumber.stop())
        .pipe(gulp.dest('./public/js'))// Выгружаем в папку js
        .pipe(browserSync.stream({}));

});

/*fonts*/
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('./public/fonts'))
        .pipe(browserSync.stream({}));
});

/*clean*/
gulp.task("clean", function (cb) {
    rimraf('./js/script.min.js', cb);
});

/*jade */
gulp.task('jade', function() {
    gulp.src('app/template/pages/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream({}));
});

gulp.task('watch', ['compress', 'jade', 'css-libs', 'img', 'sass', 'fonts'], function () {
    gulp.watch('app/libs/**/*', ['css-libs']); // Наблюдение за папкой libs
    gulp.watch('app/img/**/*', ['img']);// Наблюдение за папкой img
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch(['app/template/**/*.jade'], ['jade']);// Наблюдение за HTML-файлами в папке html
    gulp.watch('app/js/**/*.js', ['compress']); // Наблюдение за js-файлами
    gulp.watch('app/fonts/**/*', ['fonts']); // Наблюдение за js-файлами
});


/*img */
gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./public/img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['watch', 'browser-sync']);

/*
npm i gulp gulp-sass browser-sync gulp-jade gulp-concat gulp-uglifyjs gulp-rename del gulp-imagemin imagemin-pngquant gulp.spritesmith gulp-svgstore gulp-svgmin gulp-cache gulp-sourcemaps rimraf gulp-plumber gulp-postcss autoprefixer cssnano postcss-short stylefmt postcss-assets postcss-sorting postcss-font-magician postcss-fixes --save-dev
*/