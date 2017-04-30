var gulp = require("gulp"),
	minifycss = require("gulp-minify-css"),
	uglify = require('gulp-uglify');
gulp.task('minifycss', function() {
	gulp.src('css/*.css') //压缩的文件
		.pipe(minifycss()) //执行压缩
		.pipe(gulp.dest("dist/css")); //输出文件夹
});
gulp.task('uglify', function() {
	gulp.src('js/*.js') //压缩的文件
		.pipe(uglify())
		.pipe(gulp.dest("dist/js")); //输出文件夹
});
gulp.task("default",["minifycss","uglify"])