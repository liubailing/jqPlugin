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

(function ($) {
    var $pager =null;
    'use strict';
    var opts = {
        pageindex: 1,
        pagetotal: 1,
        callback: {
            onPager: null,//点击 onPager 分页
        }
    }

    var m={
        set:function(options){
            var d = $.extend(true, opts, options);
            $pager.data("jqPager", d);
            return d;
        },
        setTab:function(data){
            var d = $pager.data("jqPager");
            d.tabs = data;
            $pager.data("jqPager", d);
            return d;
        },
        setData:function(data){
            var d = $pager.data("jqPager");
            d.data = data;
            $pager.data("jqPager", d);
            return d;
        },
        get:function(){
            var d = $pager.data("jqPager");
            return d;
        }
    };

    var c = {
        init: function (options) {
            var $this = $(this);
            var d = m.set(options);

            dom.initPager(d);
            $('#div_imgMgr').modal('show');
        },
        show: function (d) {
            $('#div_imgMgr').modal('show');
        },
        hide: function () { 
            $('#div_imgMgr').modal('hide'); 
        },
        toggle: function () {
            $('#div_imgMgr').modal('toggle');
        },
        getParams: function () {
            var para = GetParams();
            return para;
        },      
        destroy: function (obj) {
            $pager.data("jqImgMgr", {});
            $("#").html("");
        }
    }

    var dom = {
        initPager: function (data) {
            if (data.pageindex > data.pagetotal) data.pageindex = data.pagetotal;

            var strPage = "", tempPage = '<li class="page-item {0}"><a class="page-link paging" title="{1}" data-page="{1}" >{2}</a></li>';
            strPage += tempPage.format(data.pageindex == 1 ? "disabled" : "", 1, '«');
            if (data.pageindex > 1) {
                strPage += tempPage.format(data.pageindex == 1 ? "disabled" : "", data.pageindex > 1 ? (data.pageindex - 1) : 1, '‹');
            }

            var arr = [], cur = 0;
            if (data.pageindex < 2 || data.pagetotal < 5) {
                arr = [0, 1, 2, 3, 4];
            } else {
                arr = [-2, -1, 0, 1, 2];
                for (var i = 0, k = 0; i < 5; i++) {
                    k++; if (k > 20) break;
                    cur = arr[i] + data.pageindex;
                    if (cur <= 0) {
                        arr.push(arr[arr.length - 1] + 1);
                        arr.splice(0, 1);
                        i--;
                        continue;
                    } else if (cur > 0 && data.pagetotal > 5 && cur > data.pagetotal - 4 + i) {
                        //console.log(arr[i] - 1);
                        arr.splice(0, 0, arr[i] - 1);
                        arr.splice(5, 1);
                        i--;
                        continue;
                    }
                }
            }

            for (var i = 0; i < 5; i++) {
                cur = arr[i] + data.pageindex;
                if (cur > 0 && cur <= data.pagetotal)
                    strPage += tempPage.format(data.pageindex == cur ? "active" : "", cur, cur);
            }


            if (data.pageindex < data.pagetotal) {
                strPage += tempPage.format(data.pageindex == data.pagetotal - 1 ? "disabled" : "", data.pageindex < data.pagetotal ? (data.pageindex + 1) : data.pagetotal, '›');
            }
            strPage += tempPage.format(data.pageindex == data.pagetotal ? "disabled" : "", data.pagetotal, '»');
            $pager.html('<ul class="pagination">' + strPage + '</ul>');

            var d = m.get(); 
            $pager.unbind("click").bind("click", function (e) {
                var $obj = $(e.target);
                if (e.target.tagName === "A" && $obj.hasClass("paging")) {
                    var $p = $obj.parent();
                    if ($p.hasClass("disabled")) return;
                    if ($p.hasClass("active")) return;
                    var page = parseInt($obj.attr("data-page"));
                    if (!isNaN(page) && page > 0) {
                        var pp = {};
                        pp["pageindex"] = page;

                        if (typeof d.callback.onPager == "function") {
                            d.callback.onPager(pp);
                        }
                        //console.log(pp);
                    }
                }
            });
        }
    }

    $.fn.jqPager = function (options) {

        if (options && typeof options === "object") {
            $pager = $(this);
            return c.init.call($pager, options);
        } else if (options && typeof options === "string" && c[options]) {
            $pager = $(this);
            return c[options].call($pager, arguments[1]);
        }
    }

})(jQuery);