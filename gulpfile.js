/* = Gulp组件
-------------------------------------------------------------- */
// 引入gulp
var gulp 		= require('gulp'),						// 基础库
	gutil 		= require('gulp-util');

// 引入我们的gulp组件
var sass 		= require('gulp-sass'),					// CSS预处理/Sass编译
	babel 		= require('gulp-babel'),
	ts 			= require('gulp-typescript'),
	uglify 		= require('gulp-uglify'),				// JS文件压缩
	autoprefixer= require('gulp-autoprefixer'),
	imagemin 	= require('gulp-imagemin'),				// imagemin 图片压缩
	pngquant 	= require('imagemin-pngquant'),			// imagemin 深度压缩
	rename 		= require('gulp-rename'),				// 文件重命名
	sourcemaps 	= require('gulp-sourcemaps'),			// 来源地图
	changed 	= require('gulp-changed'),				// 只操作有过修改的文件
	concat 		= require("gulp-concat"), 				// 文件合并
	del 		= require('del'),
	cleanCSS 	= require('gulp-clean-css'),
	clean 		= require('gulp-clean'),				// 文件清理
	//source 		= require('vinyl-source-stream'),
	//tsify 		= require("tsify"),
	minimist 	= require('minimist'),
	browserSync = require('browser-sync');		// 网页自动刷新（服务器控制客户端同步刷新）

	/* = Gulp基础配置
-------------------------------------------------------------- */
	require('./config/gulpfile.base.js');


/* = 全局设置
-------------------------------------------------------------- */
var src = {
	vendor:'src/vendor/**/*',
	html: '',
	img: '',
	css: '',
	js: '',
	data: ''
};

var dest = {
	html: '',
	img: '',
	css: '',
	js: '',
	data: '',
	maps: '',
	files: 'dist/*',
};

/* = 参数设置
-------------------------------------------------------------- */
var minimist = require('minimist');

var evnOpt = {
	string: 'env',
	default: { env: process.env.NODE_ENV || 'production' }
};

var options = minimist(process.argv.slice(2), evnOpt);


/* = 开发环境( Ddevelop Task )
-------------------------------------------------------------- */

// 当前插件路径配置
gulp.task('reset', function () {
	if (options.name == undefined) {
		console.log('----------------- 开发环境错误 -----------------');
		console.log('参数 name 没有赋值，具体命令为：gulp dev --name *** ');
		return false;
	}
	console.log('---当前开发插件---' + options.name);
	if (options.name == undefined) {
		options.name = "test";
	}
	src.html = 'src/' + options.name + '/*.html';
	src.img = 'src/' + options.name + '/img/**/*.*';
	src.css = 'src/' + options.name + '/css/*.css';
	src.js = 'src/' + options.name + '/js/*.js';
	src.data = 'src/' + options.name + '/data.js';

	dest.html = 'dist/jq' + options.name;
	dest.img = 'dist/jq' + options.name;
	dest.css = 'dist/jq' + options.name;
	dest.js = 'dist/jq' + options.name;
	dest.data = 'dist/jq' + options.name;
	dest.maps = 'dist/jq' + options.name + '/maps';
	dest.files = 'dist/jq' + options.name + '/*';
});

// 清理文件
gulp.task('del', ['reset', 'clean'], function (cb) {
	return del([
		dest.files,
		// 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
		//'dist/mobile/**/*',
		// 我们不希望删掉这个文件，所以我们取反这个匹配模式
		//'!dist/mobile/deploy.json'
	], cb);
});

// 清理文件
gulp.task('clean', function () {
	return gulp.src([dest.maps], { read: false }) // 清理maps文件
		.pipe(clean());
});

// 本地服务器
gulp.task('browser-sync', function () {
	browserSync.init({
		server: './dist'
	});
});
gulp.task('browser-reload', function () {
	browserSync.reload();
});

// 监听任务
gulp.task('watch', function () {
	browserSync.init({
		server: './dist'
	});

	console.log('----------------- 开发环境 -----------------');
	gulp.watch(src.vendor, ['vendor', 'browser-reload']);

	gulp.watch(src.html, ['html', 'browser-reload']); 	
	gulp.watch(src.html, ['html', 'browser-reload']); 	// 监听 html
	gulp.watch(src.css, ['css', 'browser-reload']);		// 监听 scss	
	gulp.watch(src.data, ['data', 'browser-reload']);	// 监听 data
	
	gulp.watch(src.js, ['js', 'browser-reload']);		// 监听 js
});

// HTML处理
gulp.task('html', function () {
	return gulp.src(src.html)
		.pipe(changed(dest.html))
		.pipe(gulp.dest(dest.html))
		.pipe(browserSync.stream());
});


// imagemin 图片压缩
gulp.task('images', function () {
	return gulp.src(src.img) // 指明源文件路径，如需匹配指定格式的文件，可以写成 .{png,jpg,gif,svg}
		.pipe(changed(dest.image))
		.pipe(imagemin({
			progressive: true, // 无损压缩JPG图片
			svgoPlugins: [{ removeViewBox: false }], // 不要移除svg的viewbox属性
			use: [pngquant()] // 深度压缩PNG
		}))
		.pipe(gulp.dest(dest.html)); // 输出路径
	//.pipe(browserSync.stream());
});

// 样式处理
gulp.task('sass', function () {
	return sass(src.css, { style: 'compact', sourcemap: true }) // 指明源文件路径、并进行文件匹配（编译风格：简洁格式）
		.on('error', function (err) {
			console.error('Error!', err.message); // 显示错误信息
		})
		.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(dest.css)) // 输出路径
		.pipe(browserSync.stream());
});

// 样式处理
gulp.task('css', function () {
	console.log("当前css路径:" + src.css)
	return gulp.src(src.css)
		.pipe(cleanCSS()) // 指明源文件路径、并进行文件匹配（编译风格：简洁格式）
		.on('error', function (err) {
			console.error('Error!', err.message); // 显示错误信息
		})
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(dest.css)); // 输出路径		
	//.pipe(browserSync.stream());
});

// 脚本压缩&重命名
gulp.task('js', function () {
	console.log("当前js路径:" + src.js)
	return gulp.src(src.js) // 指明源文件路径、并进行文件匹配，排除 .min.js 后缀的文件			
		.pipe(sourcemaps.init()) // 执行sourcemaps
		.pipe(rename({ suffix: '.min' })) // 重命名
		//.pipe(uglify({ preserveComments:'some' })) // 使用uglify进行压缩，并保留部分注释
		.pipe(babel())
		//.pipe(uglify({})) // 使用uglify进行压缩，并保留部分注释		
		.pipe(concat('main.min.js')) // 对应匹配的文件		
		.on('error', function (err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(dest.js)); // 输出路径			
	//.pipe(browserSync.stream());
});

// 模拟数据处理
gulp.task('data', function () {
	console.log("当前js路径:" + src.data)
	return gulp.src(src.data) // 指明源文件路径、并进行文件匹配，排除 .min.js 后缀的文件			
		.pipe(sourcemaps.init()) // 执行sourcemaps
		//.pipe(rename({ suffix: '.min' })) // 重命名
		//.pipe(uglify({ preserveComments:'some' })) // 使用uglify进行压缩，并保留部分注释
		//.pipe(babel())	
		//.pipe(uglify({})) // 使用uglify进行压缩，并保留部分注释		
		.pipe(concat('data.min.js')) // 对应匹配的文件		
		.on('error', function (err) {
			gutil.log(gutil.colors.red('[Error]'), err.toString());
		})
		//.pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
		.pipe(gulp.dest(dest.data)); // 输出路径			
	//.pipe(browserSync.stream());
});



// 默认任务
gulp.task('default', ['reset'], function () {
	return gulp.start(
		'watch'
	); // 等[clean]任务执行完毕后再执行其他任务
});

// 发布测试
gulp.task('dev', ['reset', 'del'], function () { // 开始任务前会先执行[clean]任务
	return gulp.start(
		'base',

		'css',
		'js',
		'data',
		//'images',
		'html'
	); // 等[clean]任务执行完毕后再执行其他任务
});