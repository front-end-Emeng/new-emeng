var appController = angular.module('appController', []);
appController.controller('appcontroller', function($scope, $http,$state, $stateParams,$timeout,$location) {
	  $scope.getHome = function() {
		     $http({
		        method: 'post',
		        url: '..///main',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		    
		        }).then(function successCallback(response) {
		             // 赋值
		                $scope.dynamicList=response.data.dynamicList;
		                $scope.headlineList=response.data.headlineList;
		                $scope.linkList=response.data.linkList;
		                $scope.meeting=response.data.meeting;
/*		                $scope.navigationList=response.data.navigationList;
*/		                $scope.newestPassageList=response.data.newestPassageList;
		                $scope.postList=response.data.postList;
		            }, function errorCallback(response) {

		               
		        });
		    };  
		    $scope.getHome();
});



//导航栏
appController.controller('navigationCtr', function($scope, $http,$state, $stateParams,$timeout,$location) {
	  $scope.getnavigation = function() {
		     $http({
		        method: 'post',
		        url: '..///main',
		         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
		         transformRequest: function(obj) {  
		           var str = [];  
		           for(var p in obj){  
		             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
		           }  
		           return str.join("&");  
		         } 
		    
		        }).then(function successCallback(response) {
		             // 赋值
		                $scope.navigationList=response.data.navigationList; 
		            }, function errorCallback(response) {

		              
		        });
		    };  
		    $scope.getnavigation();
});





appController.filter('htmlContent', function($sce) {
  return function(input){
    return $sce.trustAsHtml(input);
  }
});

appController.filter('reverse', function() { //可以注入依赖
    return function(text) {
        return new Date(text).toLocaleDateString();
    }
});
appController.filter('reverse2', function() { //可以注入依赖
    return function(text) {
        return new Date(text).toLocaleString();
    }
});
appController.controller('registerCtrl', function($scope, $http,$state, $stateParams){
    $scope.newuser = {
        username:'',
        mail:'',
        phone:'',
        job_id:'',
        password: '',
        school_id:'0',
        state:'',
    };
$scope.password2='';
    $scope.showAllErr=false;
    $scope.inputcode;
    $scope.code;
    $scope.allschool;
    $scope.inputcode;
    $scope.codeErr=false;
    $scope.rundom='';

    //获取验证码 ../image/getRandNum
    //
     $scope.getcode = function() {
//           $http({
//            method: 'post',
//            url: '../image/getRandNum',
//            }).then(function successCallback(response) {
//            	alert('123');
//                   $scope.rundom=response.data;
//                }, function errorCallback(response) {
//                    console.log('请求验证码失败');
//            });  
        };
    $scope.getcode();

    //验证验证码 ../image/validateRandNum
    $scope.checkcode = function() {
           $http({
            method: 'post',
            url: '../image/validateRandNum',
            data:{
                value:$scope.inputcode,
            },
            }).then(function successCallback(response) {               
                   $scope.codeErr=response.data;
                }, function errorCallback(response) {
                    $scope.codeErr=true;
                    alert("1"+$scope.codeErr);
                    console.log('验证验证码失败');
                    return $scope.codeErr;
            });  
        };
    //获取学校  ../getSchools
      $http({
            method: 'post',
            url: '../getSchools',
            }).then(function successCallback(response) {               
                   $scope.allschool=response.data;
                }, function errorCallback(response) {
                    console.log('请求学校失败');
            });


    // //获取地区  ../getAllLocation


    //注册postnewuser

  $scope.postnewuser = function() {
            if($scope.myForm.$valid){
                    $http({
                    method: 'post',
                    url: '../addUser',
                    data:{
                        user:$scope.newuser,
                        roleId:2,
                    },
                    }).then(function successCallback(response) {               
                           $scope.massage=response.data;
                           alert($scope.massage);
                           if (massage==0) {
                               //提示成功提交，等待审核
                           }else{
                              //提示提交失败失败原因
                           }
                        }, function errorCallback(response) {
                            console.log('注册请求失败');
                    });  
               
        };
}
     $scope.save = function() {
            $scope.showAllErr= $scope.myForm.$invalid; //当内容不合法时，显示内容
            if($scope.myForm.$valid){
                    $http({
                    method: 'post',
                    url: '../image/validateRandNum',
                    data:{
                        value:$scope.inputcode,
                    },
                    }).then(function successCallback(response) {               
                           $scope.codeErr=response.data;
                           if ( $scope.codeErr) {
                                return 0;
                            }else{
                                $scope.postnewuser();
                             }
                        }, function errorCallback(response) {
                            $scope.codeErr=true;
                            console.log('验证验证码失败');
                            $scope.postnewuser();//******
                          
                    });  
               
               } else{

                $scope.showAllErr= $scope.myForm.$invalid; //当内容不合法时，显示内容

               }
        };
});




appController.controller('loginCtrl', function($scope, $http,$state, $stateParams){
    $scope.loginUser = {
        username:'',
        password: '',
    };

    $scope.showAllErr=false;
    $scope.inputcode;
    $scope.code;
    $scope.codeErr=false;


    //获取验证码 ../image/getRandNum
    //
     $scope.getcode = function() {
           $http({
            method: 'post',
            url: '../image/getRandNum',
            }).then(function successCallback(response) {               
                   $scope.code=response.data;
                }, function errorCallback(response) {
                    console.log('请求验证码失败');
            });  
        };
    $scope.getcode();
      //登陆请求
  $scope.login = function() {
            if($scope.loginForm.$valid){
                    $http({
                    method: 'post',
                    url: '../login',
                    data:{
                        user:$scope.loginUser,
                    },
                    }).then(function successCallback(response) {               
                           $scope.massage=response.data;
                           alert($scope.massage);
                           if (massage==0) {
                               //提示成功提交，登陆成功
                               // 跳转到首页
                           }else{
                              //提示提交失败失败原因
                           }
                        }, function errorCallback(response) {
                            console.log('注册请求失败');
                    });  
        };
}

    //验证验证码 ../image/validateRandNum
    $scope.checkcode = function() {
           $http({
            method: 'post',
            url: '../image/validateRandNum',
            data:{
                value:$scope.inputcode,
            },
            }).then(function successCallback(response) {               
                   $scope.codeErr=response.data;
                }, function errorCallback(response) {
                    $scope.codeErr=true;
                    alert("1"+$scope.codeErr);
                    console.log('验证验证码失败');
                    return $scope.codeErr;
            });  
        };
  
     $scope.save= function() {
        // alert('123');
            $scope.showAllErr= $scope.loginForm.$invalid; //当内容不合法时，显示内容不合法
            if($scope.loginForm.$valid){
                    $http({
                    method: 'post',
                    url: '../image/validateRandNum',
                    data:{
                        value:$scope.inputcode,
                    },
                    }).then(function successCallback(response) {               
                           $scope.codeErr=response.data;
                           if ( $scope.codeErr==true) {
                                return 0;
                            }else{
                                $scope.login();
                             }
                        }, function errorCallback(response) {
                            $scope.codeErr=true;
                            console.log('验证验证码失败');
                            $scope.login();
                          
                    });  
               
               } else{

                $scope.showAllErr= $scope.loginForm.$invalid; //当内容不合法时，显示内容

               }
        };
});









// 名师页面
appController.controller('teacherlistCtrl', function($scope, $http,$state, $stateParams,$timeout,$location) {
    //初始化分页数据变量
    $scope.typeName=[  '名师风采',       '名师新论',       '教坛新秀',       '新秀论坛'];
    $scope.urlName=[   'elegant',        'newtheory',      'rookie',         'forum'];
    //对应接口
    $scope.listRequest=['../teacher/getAllTeacherByPage','../passage/passagelist','../teacher/getAllTeacherByPage','../passage/passagelist','../teacher/passagelist'];
    $scope.detailRequest=['../teacher/selectByPrimaryKey','../passage/main','../teacher/selectByPrimaryKey','../passage/main','../passage/main'];
    $scope.Map={
          elegant:0,
        newtheory:1,
           rookie:2,
            forum:3,
    };
    //根据$stateParams，标志红色背景
    $scope.$watch('$stateParams', function(newValue, oldValue, scope) {
                $("[active]").children('a').toggleClass('active',false);
                $("[active]").children('a').eq($scope.Map[$stateParams.taptype]).toggleClass('active',true);
            }, true);

    //分页插件数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };

    //初始化请求的类型的页面数据
      $scope.page={
            requstarray:[1,1,1,1,1],
            totalRecord:[0,0,0,0,0],
            currentPage:[1,1,1,1,1],
            pageSize:[6,11,6,11,11],
            totalPage:[0,0,0,0,0],
            currentindex:0,
            data:[[],[],[],[],[],[]],
        } 

    // 当前文章
    $scope.detaildata=[];
    //热点推荐列表
    $scope.recommendListdata=[];
    //相关文论列表
    $scope.relativelistdata=[]; 

    // 当前位置数据
    $scope.current={
        related:false,
        teacherName:'某某某',//根据文章作者
    }

    //获取名师列表：
    $scope.getTeacherData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest[$scope.page.currentindex],
        data: { 
            currentPage: $scope.page.requstarray[$scope.page.currentindex],
            pageSize:$scope.page.pageSize[$scope.page.currentindex],
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
     
    
        }).then(function successCallback(response) {
             // 赋值
               $scope.page.data[$scope.page.currentindex]=response.data.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.totalPage,
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],
               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {

                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };

 //获取文章列表：
    $scope.getPagingData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest[$scope.page.currentindex],
        data: {
               passageType:25,
               pageSize:$scope.page.pageSize[$scope.page.currentindex],
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {

               $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage,               
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],

               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };

        });
    };

$scope.getTeacherdetail = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest[$scope.Map[$stateParams.taptype]],
        data: {
                  id:$stateParams.articleid,
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
               $scope.detaildata=response.data;
               // $scope.relativelistdata=response.data;
               $scope.current.teacherName=response.data.name;
               // $scope.recommendListdata=response.data.recommendList;
            }, function errorCallback(response) {
                console.log('请求失败');
            $scope.detaildata='';
            $scope.relativelistdata=[]; 
            $scope.current.teacherName="";
        });
    };

 $scope.getPassagedetail = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest[$scope.Map[$stateParams.taptype]],
        data: {
                passageId:$stateParams.articleid,
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
               $scope.detaildata=response.data.passageMainList;
               $scope.current.teacherName=response.data.passageMainList[1].titile;
               $scope.recommendListdata=response.data.recommendList;
            }, function errorCallback(response) {
                console.log('请求失败');
                $scope.detaildata=[];
        });
    };
    // 相关文论列表
    // 先获得autor
    $scope.getTeacherRelated = function() {
      $http({
            method: 'post',
            url: '../teacher/passagelist',
            data: {
                      author:$scope.current.teacherName,
                      pageSize:$scope.page.pageSize[$scope.page.currentindex],
                      pageNum:$scope.page.requstarray[$scope.page.currentindex],
               } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
            }).then(function successCallback(response) {
               $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage,              
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],

               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
                alert('请求分页失败');
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };

        });
    };

//也要获取作者名字
 $scope.getTeacherRelatedDetail = function() {
  $http({
        method: 'post',
        url: '../passage/main',
        data: {
                passageId:$stateParams.relatedid,
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
               $scope.detaildata=response.data.passageMainList;
               $scope.recommendListdata=response.data.recommendList;
               $scope.current.teacherName=response.data.passageMainList[1].author;
               $scope.recommendListdata=response.data.recommendList;
            }, function errorCallback(response) {
                console.log('请求失败');
                $scope.detaildata=[];
        });
    };
});



//权威发布
appController.controller('authoritylistCtrl', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量
    $scope.typeName=[  '经典作家',         '领导讲话',        '厅部文件',       '通知报告'];
    $scope.urlName=[    'author',          'speach',          'document',       'inform'];
    $scope.listRequest='../passage/passagelist';
    $scope.detailRequest='../passage/main';
    $scope.Map={
          author:0,
          speach:1,
        document:2,
          inform:3,
    };
    $scope.$watch('$stateParams', function(newValue, oldValue, scope) {
                $("[active]").children('a').toggleClass('active',false);
                $("[active]").children('a').eq($scope.Map[$stateParams.taptype]).toggleClass('active',true);
            }, true);


        //初始化请求的类型的页面数据
      $scope.page={
            requstarray:[1,1,1,1],
            totalRecord:[0,0,0,0],
            currentPage:[1,1,1,1],
            pageSize:[11,11,11,11],
            totalPage:[0,0,0,0],
            currentindex:0,
            passageType:[4,5,6,7],
            data:[[],[],[],[],[]],
        } 
    //设置分页的数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };
    // 当前正文
    $scope.detaildata=[];
    //热点列表
    $scope.recommendListdata=[];
    
 //获取文章列表：
    $scope.getPagingData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest,
        data: {
               passageType:$scope.page.passageType[$scope.page.currentindex],
               pageSize:$scope.page.pageSize[$scope.page.currentindex],
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
        }).then(function successCallback(response) {
              $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage, 
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],

               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };

 $scope.getPassagedetail = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest,
        data: {
               passageId:$stateParams.articleid,
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
                $scope.detaildata=response.data.passageMainList;
               $scope.recommendListdata=response.data.recommendList;
            }, function errorCallback(response) {
                console.log('请求失败');
                 $scope.detaildata=[];
        });
    };

});





//马院头条
appController.controller('horseCtrl', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量
  $scope.typeName=[  ' 改革动态',         '学科建设',        '评估排行',       '科研前沿'];
  $scope.urlName=[    'reform',          'constrution',          'range',       'science'];
  $scope.listRequest='../passage/passagelist';
  $scope.detailRequest='../passage/main';
  $scope.Map={
		 reform:0,
        constrution:1,
        range:2,
      science:3,
  };
  $scope.$watch('$stateParams', function(newValue, oldValue, scope) {
              $("[active]").children('a').toggleClass('active',false);
              $("[active]").children('a').eq($scope.Map[$stateParams.taptype]).toggleClass('active',true);
          }, true);


      //初始化请求的类型的页面数据
    $scope.page={
          requstarray:[1,1,1,1],
          totalRecord:[0,0,0,0],
          currentPage:[1,1,1,1],
          pageSize:[11,11,11,11],
          totalPage:[0,0,0,0],
          currentindex:0,
          passageType:[8,9,10,11],
          data:[[],[],[],[],[]],
      } 
  //设置分页的数据
  $scope.pagingOptions = {
      totalRecord:0,
      currentPage: 0,
      totalPage:0,
  };
  // 当前正文
  $scope.detaildata=[];
  //热点列表
  $scope.recommendListdata=[];
  
//获取文章列表：
  $scope.getPagingData = function() {
   $http({
      method: 'post',
      url: $scope.listRequest,
      data: {
             passageType:$scope.page.passageType[$scope.page.currentindex],
             pageSize:$scope.page.pageSize[$scope.page.currentindex],
             pageNum: $scope.page.requstarray[$scope.page.currentindex],
         } ,
       headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
       transformRequest: function(obj) {  
         var str = [];  
         for(var p in obj){  
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
         }  
         return str.join("&");  
       }  
      }).then(function successCallback(response) {
    	  
            $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
             $scope.recommendListdata=response.data.recommendList;//
             $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
             $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage, 
             $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],

             //传给分页插件
             $scope.pagingOptions = {
                  totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                  currentPage: $scope.page.requstarray[$scope.page.currentindex],
                  totalPage:   $scope.page.totalPage[$scope.page.currentindex],
              };
          }, function errorCallback(response) {
              $scope.pagingOptions = {
                  totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                  currentPage: $scope.page.currentPage[$scope.page.currentindex],
                  totalPage:   $scope.page.totalPage[$scope.page.currentindex],
              };
      });
  };

$scope.getPassagedetail = function() {
$http({
      method: 'post',
      url: $scope.detailRequest,
      data: {
             passageId:$stateParams.articleid,
         } ,
       headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
       transformRequest: function(obj) {  
         var str = [];  
         for(var p in obj){  
           str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
         }  
         return str.join("&");  
       } 
      }).then(function successCallback(response) {               
              $scope.detaildata=response.data.passageMainList;
             $scope.recommendListdata=response.data.recommendList;
          }, function errorCallback(response) {
              console.log('请求失败');
               $scope.detaildata=[];
      });
  };

});


//普通单层页面：链接->单列表->文章详细
appController.controller('passage', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量
    $scope.typeName=[  '最新资讯',         '热点推荐',        '思政动态',       '马院头条'];
    $scope.urlName=[    'latestnews',          'recommend',          'IPstate',       'headline'];
    $scope.listRequest='../passage/passagelist';
    $scope.detailRequest='../passage/main';
    $scope.Map={
          latestnews:0,
          recommend:1,
        IPstate:2,
          headline:3,
    };

        //初始化请求的类型的页面数据
    $scope.page={
          requstarray:[1,1,1,1],
          totalRecord:[0,0,0,0],
          currentPage:[1,1,1,1],
          pageSize:[11,11,11,11],
          totalPage:[0,0,0,0],
          currentindex:0,
          passageType:[1,12,2,3],
          data:[[],[],[],[],[]],
      } 
    //设置分页的数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };

    // 当前列表
    $scope.detaildata=[];
    //热点列表
    $scope.recommendListdata=[];
    // $scope.guessListdata=[];
   
 //获取文章列表：
    $scope.getPagingData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest,
        data: {
               passageType:$scope.page.passageType[$scope.page.currentindex],
               pageSize:$scope.page.pageSize[$scope.page.currentindex],
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
        }).then(function successCallback(response) {
               $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage,                $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],

               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };
               // passageType:$scope.page.passageType[$scope.page.currentindex],

 $scope.getPassagedetail = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest,
        data: {
               passageId:$stateParams.articleid,
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
                $scope.detaildata=response.data.passageMainList;
               $scope.recommendListdata=response.data.recommendList;
            }, function errorCallback(response) {
                console.log('请求失败');
                 $scope.detaildata='';
        });
    };

});


// onlinelesson
appController.controller('onlinelesson', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量  
    $scope.listRequest='../videoPage';
        //初始化请求的类型的页面数据
    $scope.page={
          requstarray:[1],
          totalRecord:0,
          currentPage:1,
          pageSize:9,
          totalPage:0,
          currentindex:0,
      } 
    //设置分页的数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };
    // 当前列表
    $scope.detaildata=[];
    //热点列表
    $scope.recommendListdata=[];   
 //获取文章列表： 
   $scope.getPagingData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest,
        data: {
               pageSize:$scope.page.pageSize,
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
        }).then(function successCallback(response) {
               $scope.detaildata=response.data.videoList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.totalPage,
               $scope.page.currentPage=$scope.page.requstarray[$scope.page.currentindex],
               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord,
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage,
                };
            }, function errorCallback(response) {
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord,
                    currentPage: $scope.page.currentPage,
                    totalPage:   $scope.page.totalPage,
                };
        });
    };   
    $scope.getPagingData();
});





//meeting
appController.controller('meeting', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量  
$scope.listRequest='videoPage';
 $scope.detailRequest='videoPage';

 $scope.page={
       requstarray:[1],
       totalRecord:0,
       currentPage:1,
       pageSize:9,
       totalPage:0,
       currentindex:0,
            data:[],
   } 
 //设置分页的数据
 $scope.pagingOptions = {
     totalRecord:0,
     currentPage: 0,
     totalPage:0,
 };
 // 当前列表
 $scope.detaildata=[];
 //热点列表
 $scope.recommentListdata=[];   
//获取文章列表： 
$scope.getPagingData = function() {
  $http({
     method: 'post',
     url: $scope.listRequest,
     data: {
            pageSize:$scope.page.pageSize,
            pageNum: $scope.page.requstarray[$scope.page.currentindex],
        }  
     }).then(function successCallback(response) {
            $scope.page.data=response.data.videoList;//
            $scope.page.totalRecord[$scope.page.currentindex]=response.data.totalRecord,
            $scope.page.totalPage[$scope.page.currentindex]=response.data.totalPage,
            $scope.page.currentPage=$scope.page.requstarray[$scope.page.currentindex],
            //传给分页插件
            $scope.pagingOptions = {
                 totalRecord: $scope.page.totalRecord,
                 currentPage: $scope.page.requstarray[$scope.page.currentindex],
                 totalPage:   $scope.page.totalPage,
             };
         }, function errorCallback(response) {
             $scope.pagingOptions = {
                 totalRecord: $scope.page.totalRecord,
                 currentPage: $scope.page.currentPage,
                 totalPage:   $scope.page.totalPage,
             };
     });
 };   
 $scope.getPagingData();

  $scope.getPassagedetail = function() {
   $http({
         method: 'post',
         url: $scope.detailRequest,
         data: {
                id:$stateParams.articalid,
            } ,
         }).then(function successCallback(response) {               
                $scope.detaildata=response.data.passage;
                $scope.recommentlistdata=response.data.recommendList;
             }, function errorCallback(response) {
                 console.log('请求失败');
                  $scope.detaildata='';
         });
     };

//attent
$scope.attent = function() {
                 $http({
                 method: 'post',
                 url: '../addUser',
                 data:{
                     user:$scope.newuser,
                     roleId:2,
                 },
                 }).then(function successCallback(response) {               
                        $scope.massage=response.data;
                        alert($scope.massage);
                        if (massage==0) {
                            //提示成功提交，等待审核
                        }else{
                           //提示提交失败失败原因
                        }
                     }, function errorCallback(response) {
                         console.log('注册请求失败');
                 });  
		}

});





//  我有话说 
appController.controller('saying', function($scope, $http,$state, $stateParams,$timeout) {
//初始化分页数据变量
    $scope.typeName=[  '热帖榜',         '实时更新',        '编辑发帖'];
    $scope.urlName=[    'hotPost',          'update',          'post'];
    $scope.listRequest=['../userpostPageVist', '../userpostPage', '../postinsert'];
    $scope.detailRequest='../userpostsePK';
    $scope.Map={
          hotPost:0,
          update:1,
            post:2    
        };
    $scope.$watch('$stateParams', function(newValue, oldValue, scope) {
                $("[active]").children('a').toggleClass('active',false);
                $("[active]").children('a').eq($scope.Map[$stateParams.taptype]).toggleClass('active',true);
            }, true);

     $scope.page={
          requstarray:[1,1,1],
          totalRecord:[0,0,0],
          currentPage:[1,1,1],
          pageSize:[11,11,1],
          totalPage:[0,0,0],
          currentindex:0,
          data:[[],[],[]],
      } 

    //设置分页的数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };

    // 当前列表
    $scope.detaildata=[];

 //获取文章列表：
    $scope.getPagingData = function() {
     $http({
        method: 'post',
        url: $scope.listRequest[$scope.page.currentindex],
        data: {
               pageSize:$scope.page.pageSize[$scope.page.currentindex],
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
           } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
        }).then(function successCallback(response) {
               $scope.page.data[$scope.page.currentindex]=response.data.postList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.totalPage,
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],
                //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };

 $scope.getPassagedetail = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest,
        data: {
               id:$stateParams.articleid,
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
               $scope.detaildata=response.data.postWithBLOBs;
            }, function errorCallback(response) {
                console.log('请求失败');
                 $scope.detaildata=[];
        });
    };


//用户插入论坛信息，页面绑定
 $scope.upputsaying = function() {
  $http({
        method: 'post',
        url: $scope.detailRequest[$scope.Map[$stateParams.taptype]],
        data: {
               title:'',//??？？
               context:'',
               release_time:'',//获取当前时间
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
              alert(response.data.massage);
            }, function errorCallback(response) {
                console.log('请求失败');
        });
    };
    //点赞,，页面绑定
$scope.upputsaying = function() {
  $http({
        method: 'post',
        url: '../post_like',
        data: {
               post_id:$stateParams.articleid,
           },
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
        }).then(function successCallback(response) {               
                console.log('点赞成功');
            }, function errorCallback(response) {
                console.log('请求失败');
        });
    };
});




 // 课程资源
appController.controller('lesson', function($scope, $http,$state, $stateParams,$timeout,$location) {
//初始化分页数据变量
    $scope.bookName=[  '基础', '概论', '原理', '纲要'];
    $scope.bookUrl=[    'foundation',    'generality',       'principle',       'essential'];
    $scope.passageTypeName=[    '理论剖析',  '案例资源',   '视频资源',   '推荐教案'  ,'参考资料', '精品课件'];
    $scope.passageTypeUrl=[    'theories',    'cases',       'vidios',   'schemes' ,'references' ,'courseware']; 
    $scope.getCatalogueUrl=[    '../1/chapter', '../2/chapter',  '../3/chapter',   '../4/chapter' ]; 
    $scope.pageSize=11;
    $scope.Map={
          foundation:0,
          generality:1,
            principle:2,
          essential:3,
          theories:0,
          cases:1,
          vidios:2,
          schemes:3,
          references:4,
          courseware:5,
    };
    //当前位置数据
    $scope.current={
        ifCata:'',//章节|阅读书目
    };
    $scope.$watch('$stateParams', function(newValue, oldValue, scope) {
                $("[active]").children('a').toggleClass('active',false);
                $("[active]").children('a').eq($scope.Map[$stateParams.bookName]).toggleClass('active',true);
                if($location.url().indexOf("catalogue") > 0 ){
                    $scope.current.ifCata='catalogue';
                } else if($location.url().indexOf("booklist") > 0 ){
                    $scope.current.ifCata='booklist';
                }else{
                    $scope.current.ifCata='';
                }
            }, true);

    //设置分页的数据
    $scope.pagingOptions = {
        totalRecord:0,
        currentPage: 0,
        totalPage:0,
    };

     //初始化请求的类型的页面数据
    $scope.page={
          requstarray:[1,1,1,1,1,1,1],
          totalRecord:[0,0,0,0,0,0,0],
          currentPage:[1,1,1,1,1,1,1],
          totalPage:[0,0,0,0,0,0,0],
          currentindex:0,
          passageType:[17,19,22,20,18,21,23],
          data:[[],[],[],[],[],[],[]],
      } 

    // // 定义列表
    // 书本列表
    $scope.booklistdata=[];
    //章节列表
    $scope.chapterListdata=[];
    //阅读书目列表
    $scope.readbookListdata=[];
    //精品在线列表
    $scope.boutiqueListdata=[];   
    // //passage通用列表
    // $scope.detaillistdata=[];    
    // passage通用文章详细
    $scope.detaildata=[];
    // //热点列表
    $scope.recommendListdata=[];
   //章节后的模块
       $scope.chapterDetail={
          theories:[],
          cases:[],
          vidios:[],
          schemes:[],
          references:[],
          courseware:[],
    };
    //获取书本列表请求
    $scope.getLessonList = function() {
         $http({
            method: 'post',
            url: "../lesson",
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
            }).then(function successCallback(response) {
                   $scope.booklistdata=response.data.lessonList;
                   $scope.recommendListdata=response.data.recommendList;
                   console.log($scope.booklistdata);
                }, function errorCallback(response) {
            });
        };


    //获取目录请求
    $scope.getCatalogueData = function() {
         $http({
            method: 'post',
            url: $scope.getCatalogueUrl[$scope.Map[$stateParams.bookName]],
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
            }).then(function successCallback(response) {
                   $scope.chapterListdata=response.data.chapterList;
                   $scope.readbookListdata=response.data.readPassageList;
                   $scope.boutiqueListdata=response.data.qualityOnlinePassageList;
                }, function errorCallback(response) {
            });
        };

     // 章节后的模块
     $scope.getChapterData = function() {
         $http({
            method: 'post',
            url: "../"+($scope.Map[$stateParams.bookName]+1)+"/"+$stateParams.chapter+"/block",
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         } 
            }).then(function successCallback(response) {
                 $scope.chapterDetail={
                      theories:response.data.theoryAnalyseList,
                      cases:response.data.caseResourceList,
                      vidios:response.data.onlineVedioList,
                      schemes:response.data.recommendResourcesList,
                      references:response.data.referenceResourcesList,
                      courseware:response.data.PPTSourcesList,
                };
                }, function errorCallback(response) {
                    //请求失败后清空，避免张冠李戴
                       $scope.chapterDetail={
                              theories:[],
                              cases:[],
                              vidios:[],
                              schemes:[],
                              references:[],
                              courseware:[],
                        };
            });
        };

  //获取章节下某文章类型请求
  ///{lessonId}/{chapterId}/blockpassagelist
    $scope.getPassageListData = function() {
         $http({
            method: 'post',
            url: "../"+($scope.Map[$stateParams.bookName]+1)+"/"+$stateParams.chapter+"/blockpassagelist",
            data: {
                passageType:$scope.page.passageType[$scope.page.currentindex],
                pageNum: $scope.page.requstarray[$scope.page.currentindex],
                pageSize:$scope.pageSize,//***
               } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
           }).then(function successCallback(response) {
     
               $scope.page.data[$scope.page.currentindex]=response.data.pagingResult.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.pagingResult.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.pagingResult.totalPage, 
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],
               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
               //传给分页插件
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };

  //获取章节下某文章类型下某文章详细请求
    $scope.getPassagedetailData = function() {
         $http({
            method: 'post',
            url: "../lesson/chapter/lessonpassage",
            data: {
                      passageId:$stateParams.articleid,
               } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
            }).then(function successCallback(response) {
            	console.log(response);
               $scope.detaildata=response.data.passage;
               $scope.recommendListdata=response.data.recommendList;

            }, function errorCallback(response) {
                console.log('请求失败');
                 $scope.detaildata=[];
            });
        };

    //获取阅读书目列表
    $scope.getBooklisrData = function() {
         $http({
            method: 'post',
            url: "../passage/passagelist",
            data: {
               passageType:$scope.page.passageType[$scope.page.currentindex],
               pageSize:$scope.pageSize,
               pageNum: $scope.page.requstarray[$scope.page.currentindex],
               } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
            }).then(function successCallback(response) {
               $scope.page.data[$scope.page.currentindex]=response.data.passagePage.dataList;//
               $scope.recommendListdata=response.data.recommendList;//
               $scope.page.totalRecord[$scope.page.currentindex]=response.data.passagePage.totalRecord,
               $scope.page.totalPage[$scope.page.currentindex]=response.data.passagePage.totalPage, 
               $scope.page.currentPage[$scope.page.currentindex]=$scope.page.requstarray[$scope.page.currentindex],
               //传给分页插件
               $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.requstarray[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
            }, function errorCallback(response) {
               //传给分页插件
                $scope.pagingOptions = {
                    totalRecord: $scope.page.totalRecord[$scope.page.currentindex],
                    currentPage: $scope.page.currentPage[$scope.page.currentindex],
                    totalPage:   $scope.page.totalPage[$scope.page.currentindex],
                };
        });
    };


    //获取阅读书目下某书本详细
    $scope.getBookdetailData = function() {
         $http({
            method: 'post',
            url: "../passage/main",
            data: {
                   passageId:$stateParams.articleid,
               } ,
         headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
         transformRequest: function(obj) {  
           var str = [];  
           for(var p in obj){  
             str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
           }  
           return str.join("&");  
         }  
            }).then(function successCallback(response) {
                $scope.detaildata=response.data.passageMainList;
               $scope.recommendListdata=response.data.recommendList;

            }, function errorCallback(response) {
                console.log('请求失败');
                 $scope.detaildata=[];
            });
        };
});
//首页
//注册
//登陆
//单页面：学校
//单页面：links
//会议论坛