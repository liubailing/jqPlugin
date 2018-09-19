/*
 * 字符串format扩展  string.format("yyyy-mm-dd")
 */
!String.prototype.format && (String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
});


var strDom= '<div class="row">\
<div class="col-md-3">\
<div class="panel panel-default">\
    <div class="panel-heading">选择字段</div>\
    <div class="panel-body"></div>\
</div>\
<div class="panel panel-default">\
    <div class="panel-heading">基本信息</div>\
    <div class="panel-body">\
        <div class="form-group">\
            <label class="control-label" for="Title">名称</label>\
            <input type="text" class="form-control required" id="Title" ng-model="Title">\
        </div>\
        <div class="form-group">\
            <label class="control-label" for="NotificationReceiver">通知邮箱</labelng>\
                <textarea class="form-control" id="NotificationReceiver" rows="5"></textarea>\
        </div>\
        <div class="form-group">\
            <label class="control-label" for="Description">描述</label>\
            <textarea class="form-control" id="Description"></textarea>\
        </div>\
    </div>\
    <div class="panel-footer">\
        <a class="btn btn-primary">保存</a>\
        <a class="btn btn-danger">删除</a>\
        <a class="btn btn-default cancel">取消</a>\
    </div>\
</div>\
</div>\
<div class="col-md-6">\
<div class="panel panel-default">\
    <div class="panel-heading">表单</div>\
    <div class="panel-body form-display">\
    </div>\
</div>\
</div>\
<div class="col-md-3">\
<div class="panel panel-default">\
    <div class="panel-heading">字段设置</div>\
    <div class="panel-body">\
        <div class="">\
        </div>\
    </div>\
</div>\
</div>\
</div>';

(function ($) {
    var $form =null;
    'use strict';
    var opts = {
      
    }

    var m={
        set:function(options){
            var d = $.extend(true, opts, options);
            $form.data("jqPager", d);
            return d;
        }       
       
    };

    var c = {
        init: function (options) {
            var $this = $(this);
            var d = m.set(options);
            dom.initDom(d);
        },
        show: function (d) {
        },
        hide: function () { ; 
        },
        getParams: function () {
        },      
        destroy: function (obj) {
        }
    }

    var dom = {
        initDom: function (data) {
            debugger;
           $form.html(strDom);
        }
    }

    $.fn.jqFormGenerator = function (options) {

        if (options && typeof options === "object") {
            $form = $(this);
            return c.init.call($form, options);
        } else if (options && typeof options === "string" && c[options]) {
            $form = $(this);
            return c[options].call($form, arguments[1]);
        }
    }

})(jQuery);