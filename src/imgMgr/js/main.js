var TMP_jqImgMgr = '<div class="modal fade" id="div_imgMgr" tabindex="-1" role="dialog">\
<div class="modal-dialog" role="document" style="width:95%;max-width:unset;">\
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

var TMP_jqImg = '\
<div class="col-md-3 div_imgBox" id="div_imgbox{0}" data-picId="{0}">\
    <div class="card mb-3 shadow-sm">\
        <span class="btnCornerDelete"></span>\
        <img class="card-img-top" data-src="{1}" src="{1}" data-holder-rendered="true" style="height: 150px; width: 100%; display: block;">\
        <div class="card-body ">\
            <p class="card-text margin-bottom  oneline">{2}</p>\
            <div class="d-flex justify-content-between align-items-center">\
            <div class="btn-group">\
                <button type="button" act="check" class="btn btn-sm btn-default">选择</button>\
                <button type="button" act="delete" class="btn btn-sm btn-default">删除</button>\
            </div>\
            <small class="text-muted pull-right"></small>\
            </div>\
        </div>\
    </div>\
</div>';


var TMP_jqImg = '<div class="col-md-3 div_imgBox" id="div_pic{0}" data-picId="{0}">\
<div class="card mb-3 shadow-sm">\
  <img class="card-img-top" data-src="{1}" alt="" src="{1}" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">\
  <div class="card-body">\
    <p class="card-text">{2}</p>\
    <div class="d-flex justify-content-between align-items-center">\
      <div class="btn-group">\
        <button type="button" class="btn btn-sm btn-outline-secondary">View</button>\
        <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>\
      </div>\
      <small class="text-muted">9 mins</small>\
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
    var $imgMgr;
    var resImg = null;
    'use strict';
    var opts = {
        callback: {
            onPaging: null,//点击分页
            onDelte: null,//点击删除
            onGroup: null,//点击Nav分组
            onCheck: null,//点击选中
        }
    }

    var act = {
        init: function (options) {
            var $this = $(this);
            var id = $this[0].id;
            var opts = opt.init(options);
            var htmlpager = '';
        },
        setTab: function (d) {
            var c = $.extend(true, opts, d);
            dom.initNav(c);
        },
        setImg: function (d) {
            var c = $.extend(true, opts, d);
            dom.initImg(c);
            dom.initPager(c);
        },
        show: function (d) {
            $('#div_imgMgr').modal('show');
        },
        hide: function () { $('#div_imgMgr').modal('hide'); },
        toggle: function () {
            $('#div_imgMgr').modal('toggle');
        },
        getParams:function(){
            var para = GetParams();
            debugger;
            return  para;
        },
        delete: function (id) {
            $("#div_imgbox" + id).remove();
        },
        destroy: function (obj) {

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

        if (a.infoid > 0 && a.groupid > 0) {
            return {
                type:"infoGroup",
                infoid:a.infoid,
                groupid:a.groupid,
                pageindex: ind
            };
        } else if (a.infoid > 0) {
            return {
                type:"info",
                infoid:a.infoid,
                pageindex: ind
            }
        } else if (a.groupid > 0) {
            return p ={
                type:"group",
                groupid:a.groupid,
                pageindex: ind
            }
        } else if (a.userid > 0) {
            return {
                type:"user",
                userid:a.userid,
                pageindex: ind
            }
        } else {
            return {
                type: "all",
                pageindex: ind
            }
        }
    }

    var dom = {
        initNav: function (data) {

            function getClass(c) {
                if (c != undefined && c != null) { return c; }
                return '';
            }
            var str = '', g = data;
            if (g.all != undefined && g.all != null) {
                str += ('<li role="presentation" class="nav-item {0}"><a class="nav-link {0}" href="#div_imgPanel" id="btn_allTab" role="tab" data-toggle="tab" aria-controls="div_imgPanel">所有图片</a></li>').format(getClass(g.all.class));
            }

            if (g.user != undefined && g.user != null && g.user.id != null && g.user.id > 0) {
                str += ('<li role="presentation" class="nav-item {0}"><a class="nav-link  {0}" href="#div_imgPanel" id="btn_myTab" role="tab" data-toggle="tab" aria-controls="div_imgPanel" data-userId="{1}">我的图片</a></li>').format(getClass(g.all.class), g.user.id);
            }


            if (g.group != undefined && g.group != null && g.group.children != null && g.group.children.length > 0) {
                var gs = g.group.children, str1 = '', isAct = false;
                for (var i = 0; i < gs.length; i++) {
                    var css = getClass(gs[i].class);
                    str1 += ('<li><a class="dropdown-item {0}" href="#div_imgPanel" role="tab" data-toggle="tab" aria-controls="div_imgPanel" data-groupId="{1}">{2}</a></li>').format(css, gs[i].id, gs[i].name);
                    if (css == "active") isAct = "active";
                }
                str += ('<li role="presentation" class="nav-item dropdown {0}"><a class="nav-link dropdown-toggle {0}" id="btn_groupTab" role="dropdown" data-toggle="dropdown" aria-controls="dd_imgGroups">分组组图片<span class="caret"></span></a><ul class="dropdown-menu" aria-labelledby="btn_groupTab" id="dd_imgGroups">{1}</ul></li>').format(isAct, str1);
            }


            if (g.info != undefined && g.info != null && g.info.id != null && g.info.id > 0) {
                //str+='<li role="presentation" class="nav-item nav_level1 '+getClass(g.info.class)+'"><a href="#" data-infoId="'+g.info.id+'">信息图片</a></li>';
                str += ('<li role="presentation" class="nav-item {0}"><a class="nav-link {0}" href="#div_imgPanel" id="btn_infoTab" role="tab" data-toggle="tab" aria-controls="div_imgPanel"  data-infoId="{1}">信息图片</a></li>').format(getClass(g.info.class), g.info.id);
            }



            if (g.infoGroup != undefined && g.infoGroup != null && g.infoGroup.children != null && g.infoGroup.children.length > 0) {
                var gs = g.infoGroup.children, str2 = '', isAct = '';
                for (var i = 0; i < gs.length; i++) {
                    var css = getClass(gs[i].class);
                    //str2 += '<li class="nav-item nav_level2 ' + css + '"><a data-infoId="' + g.infoGroup.infoId + '" data-groupId="' + gs[i].id + '" href="#">' + gs[i].name + '</a></li>';
                    str2 += ('<li><a class="dropdown-item" href="#div_imgPanel" role="tab" data-toggle="tab" aria-controls="div_imgPanel" data-infoId="{1}" data-groupId="{2}" >{2}</a></li>').format(css, g.infoGroup.infoId, gs[i].id, gs[i].name);
                    if (css == "active") isAct = "active";
                }
                str += ('<li role="presentation" class="nav-item dropdown {0}"><a class="nav-link dropdown-toggle {0}" id="btn_infogroupTab" role="dropdown" data-toggle="dropdown" aria-controls="dd_imgInfoGroups">信息-分组图片图片<span class="caret"></span></a><ul class="dropdown-menu" aria-labelledby="btn_infogroupTab" id="dd_imgInfoGroups"><li>{1}</li></ul></li>').format(isAct, str2);;
            }

            //显示Nav
            $("#div_imgTabs").html(str);

            $('#div_imgTabs a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                var $obj = $(e.target), $objP = $obj.parents(".dropdown");
                $("#div_imgTabs .active").removeClass("active");

                $obj.addClass("active");
                if ($objP.length > 0) {
                    $objP.addClass("active");
                    $objP.find(".dropdown-toggle").addClass("active");
                }

                //console.log(e.target); // newly activated tab
                //console.log(e.relatedTarget); // previous active tab
            })
        },
        initImg: function (data) {
            var str = "";
            for (var i = 0; i < data.items.length; i++) {
                str += TMP_jqImg.format(data.items[i].id, data.items[i].url, data.items[i].title);
            }
            //显示图片
            $("#div_imgPanel").html(str);

            $('#div_imgMgr .div_imgBox').hover(function () {
                $(this).addClass("animated pulse");
                //$(this).find(".btn-default").removeClass("btn-default").addClass("btn-warning");
                $(this).find(".btnCornerDelete").show();
            }, function () {
                $(this).removeClass("animated pulse");
                //$(this).find(".btn-warning").removeClass("btn-warning").addClass("btn-default");
                $(this).find(".btnCornerDelete").hide()
            })

            $("#div_imgPanel").unbind("click").click(function (e) {
                var $obj = $(e.target);
                if (e.target.tagName === "SPAN" && $obj.hasClass("btnCornerDelete")) {
                    var cp = GetParams(), p = $obj.parents(".div_imgBox");
                    cp["picid"] = p.data("picid");
                    if (typeof data.callback.onDelete == "function") {
                        data.callback.onDelete(cp);
                    }
                    console.log(cp);

                } else if (e.target.tagName === "BUTTON") {
                    var cp = GetParams(), p = $obj.parents(".div_imgBox");
                    cp["picid"] = p.data("picid");
                    cp["picurl"] = p.find("img").prop("src");
                    if (typeof data.callback.onCheck == "function") {
                        data.callback.onCheck(cp);
                    }
                    console.log(cp);

                }
            });

        },
        initPager: function (data) {
            if (data.pageIndex > data.pageTotal) data.pageIndex = data.pageTotal;

            var strPage = "", tempPage = '<li class="page-item {0}"><a class="page-link paging" title="{1}" data-page="{1}" >{2}</a></li>';
            strPage += tempPage.format(data.pageIndex == 1 ? "disabled" : "", 1, '«');
            if (data.pageIndex > 1) {
                strPage += tempPage.format(data.pageIndex == 1 ? "disabled" : "", data.pageIndex > 1 ? (data.pageIndex - 1) : 1, '‹');
            }

            var arr = [], cur = 0;
            if (data.pageIndex < 2 || data.pageTotal < 5) {
                arr = [0, 1, 2, 3, 4];
            } else {
                arr = [-2, -1, 0, 1, 2];
                for (var i = 0, k = 0; i < 5; i++) {
                    k++; if (k > 20) break;
                    cur = arr[i] + data.pageIndex;
                    if (cur <= 0) {
                        arr.push(arr[arr.length - 1] + 1);
                        arr.splice(0, 1);
                        i--;
                        continue;
                    } else if (cur > 0 && data.pageTotal > 5 && cur > data.pageTotal - 4 + i) {
                        console.log(arr[i] - 1);
                        arr.splice(0, 0, arr[i] - 1);
                        arr.splice(5, 1);
                        i--;
                        continue;
                    }
                }
            }

            for (var i = 0; i < 5; i++) {
                cur = arr[i] + data.pageIndex;
                if (cur > 0 && cur <= data.pageTotal)
                    strPage += tempPage.format(data.pageIndex == cur ? "active" : "", cur, cur);
            }


            if (data.pageIndex < data.pageTotal) {
                strPage += tempPage.format(data.pageIndex == data.pageTotal - 1 ? "disabled" : "", data.pageIndex < data.pageTotal ? (data.pageIndex + 1) : data.pageTotal, '›');
            }
            strPage += tempPage.format(data.pageIndex == data.pageTotal ? "disabled" : "", data.pageTotal, '»');
            $("#div_imgPager").html('<ul class="pagination">' + strPage + '</ul>');
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

                        if (typeof data.callback.onPaging == "function") {
                            data.callback.onPaging(pp);
                        }
                        console.log(pp);
                    }
                }
            });
        }
    }

    $.fn.jqImgMgr = function (options) {
 
     
        if (options && typeof options === "object") {
            return act.init.call(this, options);
        } else if (options && typeof options === "string") {
            if(act[options]) 
                return act[options].call(this, arguments[1]);

             
        }
    }

    $.fn.jqImgMgr.Options = {

    };

    if ($('#div_imgMgr').length < 1) {
        $('body').append(TMP_jqImgMgr);
    }

})(jQuery);

