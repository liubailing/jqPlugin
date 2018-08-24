var strDom ='<div class="modal" id="div_imgMgr" tabindex="-1" role="dialog">\
<div class="modal-dialog" role="document">\
  <div class="modal-content"  style="width:920px">\
    <div class="modal-header">\
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
      <h4 class="modal-title">图片管理</h4>\
    </div>\
    <div class="modal-body">\
    <div class="row"><div class="col-lg-12" id="div_imgNav"></div></div>\
    <div class=""><div class="row"><div class="col-lg-12" id="div_imgCont"></div></div></div>\
    <div class="row"><div class="col-lg-12" id="div_imgPager"></div></div>\
    </div>\
    <div class="modal-footer">\
      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
      <button type="button" class="btn btn-primary">Save changes</button>\
    </div>\
  </div>\
</div>\
</div>';

var TMP_jqImg='\
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


var TMP_jqImg = '<div class="col-md-4">\
<div class="card mb-4 shadow-sm">\
  <img class="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt="Thumbnail [100%x225]" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22226%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20226%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1656aef4f80%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1656aef4f80%22%3E%3Crect%20width%3D%22348%22%20height%3D%22226%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71875%22%20y%3D%22120.678125%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true" style="height: 225px; width: 100%; display: block;">\
  <div class="card-body">\
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>\
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

// var TMP_jqImg='\
// <div class="col-md-3 img-box" id="div_pic{0}" data-picId="{0}">\
//     <div class="card mb-3 shadow-sm">\
//         <a href="#">\
//             <span class="corner btn_imgDel"></span>\
//             <div class="image"><img alt="image" class="img-responsive" src="{1}"></div>\
//             <div class="file-name">{2} <button class="btn btn-outline btn-default btn-xs pull-right">选择</button></div>\
//         </a>\
//     </div>\
// </div>';

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
    var resImg=null;
    'use strict';
    var opts = {
        callback:{
            onPaging:null,//点击分页
            onDelte:null,//点击删除
            onGroup:null,//点击Nav分组
            onCheck:null,//点击选中
        }
    }

    var act = {
        init: function (options) {
            var $this = $(this);
            var id = $this[0].id;
            var opts = opt.init(options);
            var htmlpager = '';
        }, 
        setNav:function(d){
         var c = $.extend(true,opts,d);
            dom.initNav(c);
        },
        setImg:function(d){
           var c = $.extend(true,opts,d);
            dom.initImg(c);
            dom.initPager(c);
        },
        show:function(d){
            $('#div_imgMgr').modal('show');
        },
        hide:function(){$('#div_imgMgr').modal('hide');},
        toggle:function(){
            $('#div_imgMgr').modal('toggle');
        },
        delete:function(id){
            $("#div_imgbox"+id).remove();
        },
        destroy: function (obj) {
           
        }
    }

    function GetParams(){
        var a =  $("#div_imgNav li.nav_level2.active a");
        if(a.length<1){
            a=  $("#div_imgNav li.nav_level1.active a");
        }
         a = a.data();
        a["pageindex"]= $("#div_imgPager .active a").data("page");
        return a;
    }

    var dom={
        initNav:function(data){

            function getClass(c){
                if(c != undefined && c != null){return c;}
                return '';
            }
            var str='',g=data;
            if(g.all != undefined && g.all != null){
                str+='<li role="presentation" class="nav_level1 '+getClass(g.all.class)+'"><a href="#">所有图片</a></li>';
            }

            if(g.my != undefined && g.my != null && g.my.id != null && g.my.id>0){
                str+='<li role="presentation" class="nav_level1 '+getClass(g.my.class)+'"><a href="#" data-userId='+g.my.id+'>我的图片</a></li>';
            }

            if(g.info != undefined && g.info != null && g.info.id != null && g.info.id>0){
                str+='<li role="presentation" class="nav_level1 '+getClass(g.info.class)+'"><a href="#" data-infoId="'+g.info.id+'">信息图片</a></li>';
            }

            if(g.group != undefined && g.group != null && g.group.children != null && g.group.children.length>0){
                var gs =  g.group.children,strG ='',strClass='';
                for(var i=0;i<gs.length;i++){
                    var css =getClass(gs[i].class);
                    strG+='<li class="nav_level2 '+css+'"><a data-groupId="'+gs[i].id+'" href="#">'+gs[i].name+'</a></li>';
                    if(css == "active") strClass = "active";
                }
                str+='<li role="presentation" class="nav_level1 '+strClass+'">\
                <a id="nav_group" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">\
                图片组图片 <span class="caret"></span></a><ul id="menu2" class="dropdown-menu" aria-labelledby="nav_group">'+strG+'</ul></li>';
            }

            if(g.infoGroup != undefined && g.infoGroup != null && g.infoGroup.children != null && g.infoGroup.children.length>0){
                var gs =  g.infoGroup.children,strG='',strClass='';
                for(var i=0;i<gs.length;i++){
                    var css =getClass(gs[i].class);
                    strG+='<li class="nav_level2 '+css+'"><a <a data-infoId="'+g.infoGroup.infoId+'" data-groupId="'+gs[i].id+'" href="#">'+gs[i].name+'</a></li>';
                    if(css == "active") strClass = "active";
                }
                str+='<li role="presentation" class="nav_level1 '+strClass+'">\
                <a id="nav_infoGroup" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">\
                信息图片组图片 <span class="caret"></span></a><ul id="menu2" class="dropdown-menu" aria-labelledby="nav_infoGroup">'+strG+'</ul></li>';
            }
            
             //显示Nav
             $("#div_imgNav").html('<ul class="nav nav-pills" role="tablist">'+str+'</ul>');

             $("#div_imgNav").unbind("click").click(function(e){
                var $obj = $(e.target);
                if (e.target.tagName === "A"&& !$obj.hasClass("dropdown-toggle")) {
                    var $p = $obj.parent();
                    $("#div_imgNav .active").removeClass("active");
                    $obj.parents("li.nav_level1").addClass("active");                    
                    $obj.parents("li.nav_level2").addClass("active");
                    var np = GetParams();
                    np["pageindex"]=1;

                    if(typeof data.callback.onGroup == "function"){
                        data.callback.onGroup(np);
                    }
                    console.log(np);
                    // if (!isNaN(page) && page>0) {
                    //     console.log(page);
                    // }
                }
             });
        },
        initImg:function(data){
            var str ="";
            for(var i =0;i<data.items.length;i++)  {
                str += TMP_jqImg.format(data.items[i].id,data.items[i].url,data.items[i].title); 
            }
            //显示图片
            $("#div_imgCont").html(str);

            $('#div_imgMgr .div_imgBox').hover(function(){
                $(this).addClass("animated pulse");                
                //$(this).find(".btn-default").removeClass("btn-default").addClass("btn-warning");
                $(this).find(".btnCornerDelete").show();
            },function(){                        
                $(this).removeClass("animated pulse");
                //$(this).find(".btn-warning").removeClass("btn-warning").addClass("btn-default");
                $(this).find(".btnCornerDelete").hide()
            })

            $("#div_imgCont").unbind("click").click(function(e){
                var $obj = $(e.target);
                if (e.target.tagName === "SPAN"&& $obj.hasClass("btnCornerDelete")) {
                    var cp= GetParams(),p=$obj.parents(".div_imgBox");                 
                    cp["picid"]=  p.data("picid");
                    if(typeof data.callback.onDelete == "function"){
                        data.callback.onDelete(cp);
                    }
                    console.log(cp);
                  
                } else if (e.target.tagName === "BUTTON") {
                    var cp= GetParams(),p=$obj.parents(".div_imgBox");                 
                    cp["picid"]=   p.data("picid");
                    cp["picurl"] =  p.find("img").prop("src");
                    if(typeof data.callback.onCheck == "function"){
                        data.callback.onCheck(cp);
                    }
                    console.log(cp);
                  
                }
             });

        },
        initPager:function(data){
            if(data.pageIndex>data.pageTotal) data.pageIndex=data.pageTotal;
                  
            var strPage="",tempPage='<li class="{0}"><a class="paging" title="{1}" data-page="{1}" >{2}</a></li>';
            strPage += tempPage.format(data.pageIndex==1?"disabled":"",1,'«');
            if(data.pageIndex>1){
                strPage += tempPage.format(data.pageIndex==1?"disabled":"",data.pageIndex>1?(data.pageIndex-1):1,'‹');
            }

            var arr=[],cur=0;
            if(data.pageIndex<2 || data.pageTotal < 5){
                arr=[0,1,2,3,4];
            }else {
                arr=[-2,-1,0,1,2];
                for(var i=0,k=0;i<5;i++){
                    k++;  if(k>20) break;
                    cur=arr[i]+data.pageIndex;
                    if(cur<=0){
                        arr.push(arr[arr.length-1]+1);
                        arr.splice(0,1);
                        i--;
                        continue;
                    }else if(cur>0 &&  data.pageTotal>5 && cur> data.pageTotal-4+i){
                        console.log(arr[i]-1);
                        arr.splice(0,0,arr[i]-1);
                        arr.splice(5,1) ;
                        i--; 
                        continue;
                    }
                }
            }

            for(var i=0;i<5;i++){
                cur=arr[i]+data.pageIndex;
                if(cur>0 && cur<=data.pageTotal)
                strPage+=tempPage.format(data.pageIndex==cur?"active":"",cur,cur);
            }


            if(data.pageIndex < data.pageTotal ){
                strPage += tempPage.format(data.pageIndex==data.pageTotal-1?"disabled":"",data.pageIndex<data.pageTotal?(data.pageIndex+1):data.pageTotal,'›');
            }
            strPage += tempPage.format(data.pageIndex==data.pageTotal?"disabled":"",data.pageTotal,'»');
            $("#div_imgPager").html('<ul class="pagination">'+strPage+'</ul>');
            $("#div_imgPager").unbind("click").bind("click", function (e) {
                var $obj = $(e.target);
                if (e.target.tagName === "A" && $obj.hasClass("paging")) {
                    var $p = $obj.parent();
                    if ($p.hasClass("disabled")) return;
                    if ($p.hasClass("active")) return;
                    var page = parseInt($obj.attr("data-page"));
                    if (!isNaN(page) && page>0) {
                     var pp= GetParams();
                     pp["pageindex"]=page;

                     if(typeof data.callback.onPaging == "function"){
                        data.callback.onPaging(pp);
                    }
                        console.log(pp);
                    }
                }
            });
        }
    }

    $.fn.jqImgMgr = function (options) {
        if( $('#div_imgMgr').length<1){
            $('body').append(strDom);
        }
        if( $imgMgr == undefined){
            $imgMgr =  $('#div_imgMgr');
        }

        if (options && typeof options === "object") {
            return act.init.call(this, options);
        } else if (options && typeof options === "string") {
            act[options] && act[options].call(this,arguments[1]);
        }
    }

    $.fn.jqImgMgr.Options = {
        
    };

})(jQuery);

