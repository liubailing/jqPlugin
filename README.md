##  gulp project

Gulp 开发插件qLMS

## 使用方法

### 基础环境准备

### 安装nodejs和npm

本项目使用nodejs v10.5.0版本调试通过。

- Windows系统，请到<https://nodejs.org>下载安装包安装；
- Linux系统，请按照<https://nodejs.org/en/download/package-manager/>的指导安装。

安装nodejs后，npm会一起装好。安装完成后请使用以下命令确认版本：

```sh
node --version
# 10.5.0

npm -v
# 6.1.0
```

### 安装yarn 

本项目使用yarn作为包管理工具，取代nodejs自带的npm，它比npm更好用。二者区别，请自行了解。yarn要全局安装。

```sh
cnpm install -g yarn
```

有了yarn以后，我们接下来所有的nodejs包都通过yarn安装。

创建一个项目并初始化

```sh
mkdir xxx
cd 
yarn init
```

安装gulp

```sh
yarn add gulp -g
```

### 运行本示例项目

```sh
git clone https://github.com/liubailing/jqLMS.git
cd jqLMS
# 下载依赖包
yarn
# 启动debug任务，这会监视js、html、css、images的变动，触发自动化任务并刷新浏览器
gulp 
```

接下来等待yarn安装各种依赖项目。待上述命令成功完成后，工程目录下会出现一个`node_modules`的新目录，这就是yarn根据package.json来生成的。

### 本项目文件描述

|名称|说明|版本管理|
|--|--|---|
|gulpfile.js |gulp的配置文件。|Y|
| package.json| yarn（或npm）的配置文件|Y|
|yarn.lock| yarn用来保存各个软件包版本的文件，用于保持不同开发者所使用的版本的一致性|Y|
|README.md|本项目的说明文件，即本文件|Y|
|.gitignore|git要忽略的文件配置|Y|
|src|开发源文件|Y|
|dist|经gulp自动化任务后产生的发布文件|N|
|node_modules|yarn从npmjs.com上自动下载的依赖包|N|

## 本项目用到的主要gulp插件及说明

|英文名称|描述|网址|
|---|--|--|
|gulp-babel|es2015|
|gulp-sass|CSS预处理/Sass编译|<https://www.npmjs.com/package/gulp-sass>|
|gulp-jshint|Js代码问题检查|<https://www.npmjs.com/package/gulp-jshint>|
|gulp-uglify|JS文件压缩|<https://github.com/terinjokes/gulp-uglify>|
|gulp-autoprefixer|使用Autoprefixer来补全浏览器兼容的css|<https://github.com/postcss/autoprefixer>|
|gulp-imagemin|imagemin 图片压缩|
|gulp-rename|文件重命名|
|gulp-sourcemaps|来源地图，|<https://github.com/gulp-sourcemaps/gulp-sourcemaps>|
|gulp-changed| 只操作有过修改的文件|
|gulp-concat|js文件合并|<https://www.npmjs.com/package/gulp-concat>|
|del|删除文件/文件夹|<https://www.npmjs.com/package/del>|
|gulp-clean-css|css优化|
|gulp-clean|文件清理|
|gulp-util|gulp常用的工具库|<https://www.npmjs.com/package/gulp-util> |
|browser-sync| 网页自动刷新（服务器控制客户端同步刷新）|<http://www.browsersync.io/>|

## 如何使用本示例

yarn (或者 cnpm install)

开始调试 

1、del .\dist\（可忽略）

2、gulp release

3、gulp

coding 走起！
```
