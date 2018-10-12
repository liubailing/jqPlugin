var TMP_jqImgMgr = '<div id="div_jqImgMgr"></div>\
<div class="modal fade" id="div_imgMgr" tabindex="-1" role="dialog">\
<div class="modal-dialog" role="document" style="width:80%;max-width:unset;">\
  <div class="modal-content">\
    <div class="modal-header">\
      <h4 class="modal-title" style="display: inline-block">图片管理</h4>\
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span>&times;</span></button>\
    </div>\
    <div class="modal-body">\
        <div class="container" style="width:98%;max-width:unset;">\
            <div class="row"><ul class="nav nav-tabs" id="div_imgTabs" role="tablist" style="width:100%"></ul></div>\
            <div class="row" id="div_imgPanel" style="padding-top:15px;padding-bottom:15px;"></div>\
            <div class="row" id="div_imgPager"></div>\
        </div>\
    </div>\
    <div class="modal-footer">\
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
      <button type="button" class="btn btn-primary">Save changes</button>\
    </div>\
  </div>\
</div>\
</div>';

var TMP_jqImgAdd = '\
<div class="col-md-3 div_imgBox" id="div_pic0" data-picId="0">\
    <div class="card mb-3 shadow-sm">\
        <input type="file" id="imgMgrFileUpload" name="imgMgrFileUpload" class="dropify" data-height="210" data-max-file-size="1024K" data-allowed-file-extensions="png jpg jpeg"/>\
        <div class="card-body">\
            <p class="card-text oneline">&nbsp;</p>\
            <div class="d-flex justify-content-between align-items-center" style="padding-top:5px;">\
                <button type="button" class="btn btn-sm btn-primary btn-outline-secondary btn-upload" data-act="upload">上传</button>\
            <small class="text-muted"></small>\
            </div>\
        </div>\
    </div>\
</div>';

var TMP_jqImg = '<div class="col-md-3 div_imgBox" id="div_pic{0}" data-picId="{0}">\
<div class="card mb-3 shadow-sm">\
  <img class="card-img-top" data-src="{1}" alt="" src="{1}" data-holder-rendered="true" style="height: 210px; width: 100%; display: block;">\
  <div class="card-body">\
    <p class="card-text">{2}</p>\
    <div class="d-flex justify-content-between align-items-center">\
      <div class="btn-group">\
        <button type="button" class="btn btn-sm btn-default btn-outline-secondary" data-act="check">选择</button>\
        <button type="button" class="btn btn-sm btn-warning btn-outline-secondary" data-act="delete">删除</button>\
      </div>\
      <small class="text-muted"></small>\
    </div>\
  </div>\
</div>\
</div>';

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
    var $imgMgr = null;
    'use strict';
    var opts = {
        width: "90%",
        picHeight: 210,//px
        tabs: {},
        data: {},
        callback: {
            onPager: null,//点击 onPager 分页
            onTab: null,//点击 onTab 分组
            onCheck: null,//点击选中
            onDelete: null,//点击删除
            onUpload: null //上传，
        }
    }

    var m = {
        set: function (options) {
            var d = $.extend(true, opts, options);
            $imgMgr.data("jqImgMgr", d);
            return d;
        },
        setTab: function (data) {
            var d = $imgMgr.data("jqImgMgr");
            d.tabs = data;
            $imgMgr.data("jqImgMgr", d);
            return d;
        },
        setData: function (data) {
            var d = $imgMgr.data("jqImgMgr");
            d.data = data;
            $imgMgr.data("jqImgMgr", d);
            return d;
        },
        get: function () {
            var d = $imgMgr.data("jqImgMgr");
            return d;
        }
    };

    var c = {
        init: function (options) {
            var $this = $(this);
            var d = m.set(options);

            dom.initTab(d.tabs);
            dom.initImg(d.data);
            dom.initPager(d.data);
            $('#div_imgMgr').modal('show');
        },
        setTab: function (d) {
            dom.initTab(d);
        },
        setImg: function (d) {
            dom.initImg(d);
            dom.initPager(d);
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
        delete: function (id) {
            if (id > 0) {
                $("#div_pic" + id).remove();
            }
        },
        add: function (data) {
            var str = TMP_jqImg.format(data.id, data.url, data.title);
            $("#div_pic0").remove();
            //显示图片
            $("#div_imgPanel").prepend(str);
        },
        destroy: function (obj) {
            $imgMgr.data("jqImgMgr", {});
            $("#div_imgTabs").html("");
            $("#div_imgPanel").html("");
            $("#div_imgPager").html("");
        }
    }

    function GetParams() {
        var a = $("#div_imgTabs a.dropdown-item.active");
        if (a.length < 1) {
            a = $("#div_imgTabs a.nav-link.active");
        }
        var ind = $("#div_imgPager .active a").data("page");
        a = a.data();
        if (typeof a != "object") {
            return {
                pageindex: ind
            }
        };
        a["pageindex"] = ind;

        return a;
    }

    var dom = {
        initTab: function (data) {

            function getClass(c) {
                if (c != undefined && c != null) { return c; }
                return '';
            }
            var str = '', g = data;

            for (var i = 1; i < g.length; i++) {
                var gg = g[i];
                if (typeof gg.children === "object" && gg.children.length > 0) {

                    var gs = gg.children, str2 = '', isAct = '';
                    for (var j = 0; j < gs.length; j++) {
                        var css = getClass(gs[j].class);
                        str2 += ('<li><a class="dropdown-item" href="#div_imgPanel" role="tab" data-toggle="tab" aria-controls="div_imgPanel" data-type="{1}" data-id="{2}" data-childId="{3}" >{4}</a></li>').format(css, gg.type, gg.id, gs[j].id, gs[j].name);
                        if (css == "active") isAct = "active";
                    }

                    str += ('<li role="presentation" class="nav-item dropdown {0}"><a class="nav-link dropdown-toggle {0}" role="dropdown" data-toggle="dropdown" aria-controls="dd_imgChildren{2}">{1}<span class="caret"></span></a><ul class="dropdown-menu" aria-labelledby="dd_imgChildren{2}" id="dd_imgChildren{2}"><li>{3}</li></ul></li>').format(isAct, gg.name, gg.type + gg.id, str2);

                } else {
                    str += ('<li role="presentation" class="nav-item btn_imgTab {0}"><a class="nav-link  {0}" href="#div_imgPanel" role="tab" data-toggle="tab" aria-controls="div_imgPanel" data-type="{1}" data-id="{3}">{2}</a></li>').format(getClass(gg.class), gg.type, gg.name, gg.id);
                }
            }

            //显示Nav
            $("#div_imgTabs").html(str);

            var d = m.get();
            $('#div_imgTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var $obj = $(e.target), $objP = $obj.parents(".dropdown");
                $("#div_imgTabs .active").removeClass("active");

                $obj.addClass("active");
                if ($objP.length > 0) {
                    $objP.addClass("active");
                    $objP.find(".dropdown-toggle").addClass("active");
                }

                if (typeof d.callback.onTab == "function") {
                    var tp = GetParams();
                    d.callback.onTab(tp);
                }
            })
        },
        initImg: function (data) {
            var str = "";
            for (var i = 0; i < data.items.length; i++) {
                str += TMP_jqImg.format(data.items[i].id, data.items[i].url, data.items[i].title);
            }
            //显示图片
            $("#div_imgPanel").html(TMP_jqImgAdd + str);

            $('#div_imgMgr .div_imgBox').hover(function () {
                $(this).addClass("animated pulse");
                //$(this).find(".btn-default").removeClass("btn-default").addClass("btn-warning");
                $(this).find(".btnCornerDelete").show();
            }, function () {
                $(this).removeClass("animated pulse");
                //$(this).find(".btn-warning").removeClass("btn-warning").addClass("btn-default");
                $(this).find(".btnCornerDelete").hide()
            })
            var d = m.get();
            $("#div_imgPanel").unbind("click").click(function (e) {
                var $obj = $(e.target);
                var act = $obj.data("act");
                if (e.target.tagName === "SPAN" && $obj.hasClass("btnCornerDelete")) {
                    var cp = GetParams(), p = $obj.parents(".div_imgBox");
                    cp["picid"] = p.data("picid");
                    if (typeof d.callback.onDelete == "function") {
                        d.callback.onDelete(cp);
                    }
                    //console.log(cp);

                } else if (e.target.tagName === "BUTTON") {

                    var cp = GetParams(), p = $obj.parents(".div_imgBox");
                    cp["picid"] = p.data("picid");
                    cp["picurl"] = p.find("img").prop("src");
                    if (act === "check") {
                        if (typeof d.callback.onCheck == "function") {
                            d.callback.onCheck(cp);
                        } else {
                            console.log("为实现的 onCheck");
                        }
                    } else if (act === "delete") {
                        if (typeof d.callback.onDelete == "function") {
                            d.callback.onDelete(cp);
                        } else {
                            console.log("为实现的 onDelete");
                        }
                    }

                }
            });

            // Basic
            var up = $('#div_imgPanel .dropify').dropify({
                messages: {
                    'default': '点击或拖拽文件到这里',
                    'replace': '点击或拖拽文件到这里来替换文件',
                    'remove': '移除文件',
                    'error': '对不起，你上传的文件太大了'
                }
            });

            up.on("dropify.afterClear", function (event, element) {
                //alert('文件已删除');
            })

            $("#div_imgPanel .btn-upload").click(function () {
                var f = $("#imgMgrFileUpload").val(), fp = GetParams();;
                if (f !== "" && typeof d.callback.onUpload == "function") {
                    d.callback.onUpload(f, fp);
                } else {
                    $("#imgMgrFileUpload").click();
                }
                //console.log();
            })

        },
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
            $("#div_imgPager").html('<ul class="pagination">' + strPage + '</ul>');

            var d = m.get();
            $("#div_imgPager").unbind("click").bind("click", function (e) {
                var $obj = $(e.target);
                if (e.target.tagName === "A" && $obj.hasClass("paging")) {
                    var $p = $obj.parent();
                    if ($p.hasClass("disabled")) return;
                    if ($p.hasClass("active")) return;
                    var page = parseInt($obj.attr("data-page"));
                    if (!isNaN(page) && page > 0) {
                        var pp = GetParams();
                        pp["pageindex"] = page;

                        if (typeof d.callback.onPager == "function") {
                            d.callback.onPager(pp);
                        }
                        console.log(pp);
                    }
                }
            });
        }
    }

    $.fn.jqImgMgr = function (options) {

        if (options && typeof options === "object") {
            $imgMgr = $(this);
            return c.init.call($imgMgr, options);
        } else if (options && typeof options === "string" && c[options]) {
            $imgMgr = $(this);
            return c[options].call($imgMgr, arguments[1]);
        }
    }

})(jQuery);

$(function () {
    if ($('#div_imgMgr').length < 1) {
        $('body').append(TMP_jqImgMgr);
    }
})

