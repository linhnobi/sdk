
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject("tsconfig.json");
var browserify 	= require('browserify');
var tsify 		= require('tsify');
var source 		= require('vinyl-source-stream');
var buffer 		= require('vinyl-buffer');
var concat = require('gulp-concat');
 
// gulp.task('default', function () {

//         // return gulp.src('src/**/*.ts')
//         //     .pipe(concat('all.js'))
//         //     // .pipe(ts({
//         //     //     noImplicitAny: true,
//         //     //     outFile: 'index.js'
//         //     // }))
//         //     .pipe(gulp.dest('built/js'));
//         return gulp.src('src/**/*.ts')
//         .pipe(ts({
//             noImplicitAny: true,
//             outFile: 'output.js'
//         }))
//         .pipe(gulp.dest('built/js'));
// });

// gulp.task('tsProject', function () {
//     return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("dist2"));
//   });

// gulp.task('concat', function() {
//     return gulp.src('dist2/**/*.js')
//             .pipe(concat('all.js'))
//             // .pipe(ts({
//             //     noImplicitAny: true,
//             //     outFile: 'index.js'
//             // }))
//             .pipe(gulp.dest('built/js'));
// });

gulp.task('typescriptIt', function()
{
	return browserify('src/index.ts')
    .plugin(tsify)
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('typescriptIt'));

// var gulp = require('gulp');
// var ts = require('gulp-typescript');

 
// gulp.task('default', function () {
//     return gulp.src('src/**/*.ts')
//         // .pipe(ts({
//         //     noImplicitAny: true,
//         //     outFile: 'index.js'
//         // }))
//         // .bundle()
//         .pipe(source('index.js'))
//         .pipe(buffer())
//         .pipe(gulp.dest('built/js'));
// });

// "clean": "rimraf dist",
//     "start": "npm-run-all clean --parallel watch:build watch:server --print-label",
//     "watch:build": "tsc --watch",
//     "watch:server": "nodemon './dist/index.js' --watch './dist'"