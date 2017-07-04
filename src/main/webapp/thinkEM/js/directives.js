var appDirective = angular.module("appDirective", ['appController']);
//文末省略号
appDirective.directive("dot", function() {
    return {
        restrick:'A',
        link:function (scope,element,attrs) {
            scope.$watch('element', function(newValue, oldValue, scope) {
               element.dotdotdot(); 
            }, true);
            }
        }
});

// appDirective.directive("active", function() {
//     return {
//         restrick:'E',
//          link:function (scope,element,attrs,teacherlistCtrl) {
//             // alert(scope.pagingOptions);
//             }
//         }
// });

//分页插件指令
appDirective.directive("pageset", function() {
    return {
        restrick:'E',
        link:function (scope,element,attrs) {
        var ms = {
            init:function(obj,args){
                return (function(){
                    ms.fillHtml(obj,args);
                    ms.bindEvent(obj,args);
                })();
            },
            init2:function(obj,args){
                return (function(){
                    ms.fillHtml(obj,args);
                })();
            },
            //填充html
            fillHtml:function(obj,args){
                return (function(){
                    obj.empty();
                    //填充信息
                    obj.append("<p>共"+args.listCount+"条&nbsp;第"+args.current+"页/共"+args.pageCount+"页&nbsp;跳转到<input class='selectPageInput' name='indexS'  type='text'>页&nbsp;<a href='javascript:;' class='selectPage'>&nbsp;跳转&nbsp;</a> </p>")
                    //上一页
                    if(args.current > 1){
                        obj.append('<span>【<a href="javascript:;" class="prevPage">上一页</a>】</span>');
                    }else{
                        obj.remove('.prevPage');
                        obj.append('<span >【<a href="javascript:;" class="disabled">上一页</a>】</span>');
                    }
                    //中间页码
                    if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
                        obj.append('<span>【<a href="javascript:;" class="tcdNumber">'+1+'</a>】</span>');
                    }
                    if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
                        obj.append('<span> . . . </span>');
                    }
                    var start = args.current -2,end = args.current+2;
                    if((start > 1 && args.current < 4)||args.current == 1){
                        end++;
                    }
                    if(args.current > args.pageCount-4 && args.current >= args.pageCount){
                        start--;
                    }
                    for (;start <= end; start++) {
                        if(start <= args.pageCount && start >= 1){
                            if(start != args.current){
                                obj.append('<span>【<a href="javascript:;" class="tcdNumber">'+ start +'</a>】</span>');
                            }else{
                                obj.append('<span class="current">'+ start +'</span>');
                            }
                        }
                    }
                    if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
                        obj.append('<span> . . . </span>');
                    }
                    if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
                        obj.append(' <span>【<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>】</span>');
                    }
                    //下一页
                    if(args.current < args.pageCount){
                        obj.append('<span>【<a href="javascript:;" class="nextPage">下一页</a>】</span>');
                    }else{
                        obj.remove('.nextPage');
                        obj.append('<span>【<a href="javascript:;" class="disabled">下一页</a>】</span>');
                    }
                })();
            },
            //绑定事件
            bindEvent:function(obj,args){
                return (function(){
                    // obj.off("click");
                    obj.on("click","a.tcdNumber",function(even){
                        scope.page.requstarray[scope.page.currentindex] = parseInt($(this).text());
                        scope.$apply(obj.attr("pageset"));
                        even.stopPropagation();
                    });
                    //上一页
                    obj.on("click","a.prevPage",function(){
                        scope.page.requstarray[scope.page.currentindex] = parseInt(obj.children("span.current").text())-1;
                        scope.$apply(obj.attr("pageset"));
                    });
                    //下一页
                    obj.on("click","a.nextPage",function(){
                         scope.page.requstarray[scope.page.currentindex] = parseInt(obj.children("span.current").text())+1;
                        scope.$apply(obj.attr("pageset"));

                    });
                    //输入跳转
                    obj.on("click","a.selectPage",function(){
                        var current = parseInt($(".selectPageInput").val());
                        if ((current<=scope.pagingOptions.totalPage)&&(current>=1)&&(current!=scope.pagingOptions.currentPage)) {
                            scope.page.requstarray[scope.page.currentindex]=current;
                            scope.$apply(obj.attr("pageset"));
                        }else {
                                alert('输入超出范围或已是当前页');
                                if(typeof(args.backFn)=="function"){
                                        args.backFn("你的输入有误");
                            }
                        }
                    });

                })();
            }
        }
            $.fn.createPage = function(options){
                var args = $.extend({
                    listCount : 100,
                    pageCount : 10,
                    current : 1,
                    backFn : function(){}
                },options);
                ms.init(this,args);
            };
             $.fn.createPage2 = function(options){
                var args = $.extend({
                    listCount : 100,
                    pageCount : 10,
                    current : 1,
                    backFn : function(){}
                },options);
                ms.init2(this,args);
            };
            element.createPage({
                    listCount:scope.pagingOptions.totalRecord,
                    pageCount:scope.pagingOptions.totalPage,
                    current:scope.pagingOptions.currentPage,
                });
            scope.$watch('pagingOptions', function(newValue, oldValue, scope) {
                   element.createPage2({
                    listCount:scope.pagingOptions.totalRecord,
                    pageCount:scope.pagingOptions.totalPage,
                    current:scope.pagingOptions.currentPage,
                });
            }, true);
            }
        }
});

			