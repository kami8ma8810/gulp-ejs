const { src, dest, watch, lastRun, series, parallel } = require('gulp');

const fs = require('fs');

// html
const htmlMin = require('gulp-htmlmin');
const prettify = require('gulp-prettify');
const ejs = require('gulp-ejs');
const rename = require('gulp-rename');
const replace = require('gulp-replace'); //余計なテキストを削除

// Sass
const sass = require('gulp-dart-sass');
// const sass = require('sass');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const gcmq = require('gulp-group-css-media-queries');

// JavaScript
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// 画像圧縮
const imageMin = require('gulp-imagemin');
const pngQuant = require('imagemin-pngquant');
const mozJpeg = require('imagemin-mozjpeg');
const svgo = require('gulp-svgo');

// ブラウザ同期
const browserSync = require('browser-sync').create();

// ファイル削除
const clean = require('gulp-clean');
function cleanFiles(done) {
  src(paths.all.dist, { read: false }).pipe(clean());
  done();
}

//パス設定
const paths = {
  all: {
    dist: './dist/',
  },
  html: {
    src: ['./src/ejs/**/*.ejs', '!' + './src/ejs/**/_*.ejs'],
    dist: './dist/',
    watch: './src/ejs/**/*.ejs',
  },
  styles: {
    src: './src/scss/**/*.scss',
    dist: './dist/assets/css/',
    map: './map',
  },
  scripts: {
    src: './src/js/**/*.js',
    dist: './dist/assets/js/',
  },
  images: {
    src: './src/img/**/*.{jpg,jpeg,png,gif,svg}',
    dist: './dist/assets/img/',
  },
};

// ejsコンパイル
const htmlFunc = () => {
  const data = JSON.parse(fs.readFileSync('./data.json'));
  return src(paths.html.src)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(ejs(data)) //ejsをまとめる
    .pipe(
      rename({
        extname: '.html',
      })
    ) //拡張子をhtmlに
    .pipe(
      htmlMin({
        removeComments: false, //コメントを削除
        collapseWhitespace: true, //余白を詰める
        collapseInlineTagWhitespace: true, //inlineのスペース削除
        preserveLineBreaks: true, //タグ間の余白を詰める
      })
    )
    .pipe(
      prettify({
        indent_size: 2,
        indent_with_tabs: true,
      })
    )
    .pipe(replace(/[\s\S]*?(<!DOCTYPE)/, '$1'))
    .pipe(dest(paths.html.dist))
    .pipe(browserSync.stream());
};

// Sassコンパイル
const sassCompile = () => {
  return (
    src(paths.styles.src, {
      sourcemaps: true,
    })
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe(
        sass({
          outputStyle: 'expanded',
        }).on('error', sass.logError)
      )
      .pipe(
        postCss([
          autoprefixer({
            // プロパティのインデントを整形しない
            cascade: false,
            // IE11のgrid対応
            grid: 'autoplace',
          }),
        ])
      )
      //メディアクエリをまとめる
      .pipe(gcmq())
      .pipe(
        dest(paths.styles.dist, {
          sourcemaps: './map',
        })
      )
      .pipe(browserSync.stream())
  );
};

// JavaScriptコンパイル
const jsBabel = () => {
  return (
    src(paths.scripts.src)
      .pipe(
        plumber({
          errorHandler: notify.onError('Error: <%= error.message %>'),
        })
      )
      .pipe(
        // Babel変換
        babel({
          presets: ['@babel/preset-env'],
        })
      )
      .pipe(dest(paths.scripts.dist))
      // JS圧縮
      .pipe(uglify())
      .pipe(dest(paths.scripts.dist))
  );
};

// 画像圧縮
const imagesFunc = () => {
  return src(paths.images.src, {
    since: lastRun(imagesFunc),
  })
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>'),
      })
    )
    .pipe(
      imageMin(
        [
          mozJpeg({
            quality: 80,
          }),
          pngQuant(
            [0.6, 0.8] //画質の最小,最大
          ),
        ],
        {
          verbose: true, //メタ情報削除
        }
      )
    )
    .pipe(
      svgo({
        plugins: [
          {
            removeViewbox: false, //フォトショやイラレで書きだされるviewboxを消さない
          },
          {
            removeMetadata: false,
          },
          {
            convertColors: false,
          },
          {
            removeUnknownsAndDefaults: false,
          },
          {
            convertShapeToPath: false,
          },
          {
            cleanupNumericValues: false,
          },
          {
            collapseGroups: false,
          },
          {
            cleanupIDs: false,
          },
          {
            mergePaths: false,
          },
        ],
      })
    )
    .pipe(dest(paths.images.dist));
};

// ローカルサーバー起動
const browserSyncFunc = (done) => {
  browserSync.init({
    //デフォルトのconnectedのメッセージ非表示
    notify: false,
    server: {
      baseDir: './',
    },
    startPath: './dist/index.html',
    reloadOnRestart: true,
  });
  done();
};

// ブラウザ自動リロード
const browserReloadFunc = (done) => {
  browserSync.reload();
  done();
};

// ファイル監視
const watchFiles = () => {
  watch(paths.html.watch, series(htmlFunc, browserReloadFunc));
  watch(paths.styles.src, series(sassCompile));
  watch(paths.scripts.src, series(jsBabel, browserReloadFunc));
  watch(paths.images.src, series(imagesFunc, browserReloadFunc));
};

// npx gulp実行処理
exports.default = series(
  parallel(htmlFunc, sassCompile, jsBabel, imagesFunc),
  // parallel(htmlFunc, sassCompile, jsBabel),
  parallel(watchFiles, browserSyncFunc)
);

// ファイル削除
