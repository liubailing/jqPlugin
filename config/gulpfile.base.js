/* = Gulp组件
-------------------------------------------------------------- */
// 引入gulp
var gulp 		= require('gulp'),						// 基础库
	gutil 		= require('gulp-util');

// 引入我们的gulp组件
var cleanCSS 	= require('gulp-clean-css'),
	uglify 		= require('gulp-uglify'),				// JS文件压缩
	autoprefixer= require('gulp-autoprefixer'),
	changed 	= require('gulp-changed'),				// 只操作有过修改的文件
	concat 		= require("gulp-concat"), 				// 文件合并
	browserSync = require('browser-sync');		// 网页自动刷新（服务器控制客户端同步刷新）


/* = 全局设置
-------------------------------------------------------------- */
var baseSrc = {
	html	: 'src/base/*.html',
	css		: ['node_modules/bootstrap/dist/css/bootstrap.css', 'node_modules/bootstrap/dist/css/bootstrap-theme.css'],
	js		: ['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js']
};

var baseDest = {
	tsc		: 'src/js',
	html	: 'dist/base/html',
	css		: 'dist/base/css',
	js		: 'dist/base/js'
};

//基础依赖的JS、Css	
gulp.task('t', function () {
	console.log('this is test!');
});


//vender 
// 拷贝
gulp.task('vendor',function(){
    return gulp.src('src/vendor/**/*')
        .pipe(gulp.dest('dist/vendor'))
		.pipe(browserSync.stream());
});

//基础依赖的JS、Css	
gulp.task('cssVendor', function () {
	return gulp.src(baseSrc.css)
		.pipe(cleanCSS()) // 指明源文件路径、并进行文件匹配（编译风格：简洁格式）
		.on('error', function (err) {
			console.error('Error!', err.message); // 显示错误信息
		})
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('vendor.min.css'))
		//.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(baseDest.css)); // 输出路径
	//.pipe(browserSync.stream());
});

// JS文件压缩&重命名
gulp.task('jsVendor', function () {
	return gulp.src(baseSrc.js) // 指明源文件路径、并进行文件匹配，排除 .min.js 后缀的文件			
		//.pipe(sourcemaps.init()) // 执行sourcemaps
		//.pipe(babel())
		.pipe(uglify()) // 使用uglify进行压缩
		.pipe(concat('vendor.min.js')) // 对应匹配的文件
		//.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(baseDest.js)); // 输出路径
	//.pipe(browserSync.stream());
});

// HTML处理
gulp.task('htmlVendor', function () {
	return gulp.src(baseSrc.html)
		.pipe(changed(baseDest.html))
		.pipe(gulp.dest(baseDest.html));
});



// 发布基本文件
gulp.task('del.base', function () { // 开始任务前会先执行[clean]任务
	return gulp.start(
		'cssVendor', 
		'jsVendor',
		'htmlVendor'
	
	); // 等[clean]任务执行完毕后再执行其他任务
});

// 发布基本文件
gulp.task('base', function () { // 开始任务前会先执行[clean]任务

	//copyfile("\\src\\verdor","\\dist\\verdor");
	return gulp.start(
		'cssVendor', 
		'jsVendor',
		'htmlVendor',
		'vendor'
	
	); // 等[clean]任务执行完毕后再执行其他任务
});


/* = 帮助提示( Help )
-------------------------------------------------------------- */
gulp.task('help', function () {
	console.log('----------------- 开发环境 -----------------');
	console.log('gulp default			开发环境（默认任务）');
	console.log('gulp html				HTML处理');
	console.log('gulp sass				样式处理');
	console.log('gulp script			JS文件压缩&重命名');
	console.log('gulp images			图片压缩');
	console.log('gulp concat			文件合并');
	console.log('---------------- 发布环境 -----------------');
	console.log('gulp release			打包发布');
	console.log('gulp clean				清理文件');
	console.log('gulp sassRelease		样式处理');
	console.log('gulp scriptRelease		脚本压缩&重命名');
	console.log('---------------------------------------------');
});