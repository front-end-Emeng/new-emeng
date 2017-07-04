var routerApp = angular.module('myApp', ['ui.router','appDirective','appController','appService']);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run(function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});
   routerApp.config(function($stateProvider, $urlRouterProvider) {  
	$urlRouterProvider.otherwise('/index');  
	$stateProvider 

	//名师页面
	.state('teacher', {  
		url: '/teacher',  
		 views: {
				'':{  templateUrl: 'templates/teacherContent.html', },
				 'hotlist@teacher': {templateUrl: 'templates/hotContent.html' },
			  }
	})    
	 .state('teacher.taptype', {  
		url: '/:taptype',  
		views: {
				 'detail@teacher': { 
				 	templateUrl: function($stateParams){
				 		if ($stateParams.taptype=='elegant'||$stateParams.taptype=='rookie') {
				 			return 'templates/teacherList.html';
				 		}
				 		return 'templates/newsList.html';
				 	},
					controller:  function($scope, $state, $stateParams) {
					    $scope.current.related=false;
					    $scope.page.currentindex=$scope.Map[$stateParams.taptype];
					    // 不同tap对应不同请求
					    if ($stateParams.taptype=='elegant'||$stateParams.taptype=='rookie') {
					 			$scope.getTeacherData();
					 		}else{
					 			$scope.getPagingData();
					 		}
					    },
					},
			  }
	}) 

	 .state('teacher.taptype.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@teacher': {
					templateUrl: function($stateParams){
				 		if ($stateParams.taptype=='elegant'||$stateParams.taptype=='rookie') {
				 			return 'templates/teacherDetail.html';
				 		}
				 		return 'templates/articalT2.html';
				 	},
				 	controller:function($scope, $state, $stateParams) {
				 		 // 不同tap对应不同请求
						    if ($stateParams.taptype=='elegant'||$stateParams.taptype=='rookie') {
						 			$scope.getTeacherdetail();
						 		}else{
						 			$scope.getPassagedetail();
						 		}
					 		$scope.current.related=false;
					    },
				},
				'relatedlist@teacher': {
					// 不同tap对应不同请求
					templateUrl: function($stateParams){
				 		if ($stateParams.taptype=='elegant'||$stateParams.taptype=='rookie') {
				 			return 'templates/teacherrelatedContent.html' ;
				 		}
				 		return 'templates/blank.html';
				 	},
			 },
			}
	}) 

	.state('teacher.taptype.articleid.related', {  
		url: '/related',  
		views: {
				 'detail@teacher': {
					templateUrl: 'templates/teacherrelatedlist.html',
					controller:  function($scope, $state, $stateParams) {
					    $scope.current.related=true;
					    $scope.page.currentindex=4;
					    $scope.page.currentPage[4]=1;
					    $scope.page.requstarray[4]=1;
					    $scope.page.data[4]=[];
					    $scope.getTeacherdetail();
					    $scope.getTeacherRelated();	
					},
				},
				'relatedlist@teacher': {template: '' },
			}
	})
	.state('teacher.taptype.articleid.related.relatedid', {  
		url: '/:relatedid',  
		views: {
				 'detail@teacher': {
					templateUrl: 'templates/articalT2.html',
					controller:  function($scope, $state, $stateParams) {
					    $scope.current.related=true;
					    $scope.getTeacherRelatedDetail();					
					},
				},
				'relatedlist@teacher': {template: ''},
			}
	})  







	 .state('authority', {  
		url: '/authority',  
		views:{
			'':{ templateUrl: 'templates/authorityContent.html',},
			'hotlist@authority': { templateUrl: 'templates/hotContent.html'},
		},
	})  
	 .state('authority.taptype', {  
		url: '/:taptype',  
		views: {
				 'detail@authority': {templateUrl: 'templates/authorityList.html',
					controller: function($scope, $state, $stateParams) {
						 $scope.page.currentindex=$scope.Map[$stateParams.taptype];
					    $scope.getPagingData();					
					},

				},
			}
	}) 
	 .state('authority.taptype.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@authority': {templateUrl: 'templates/articalT2.html',
					controller: function($scope, $state, $stateParams) {
						 $scope.page.currentindex=$scope.Map[$stateParams.taptype];
					    $scope.getPassagedetail();					
					},
				},
			}
	})  

	
	

.state('horse', {  
		url: '/horse',  
		views:{
			'':{ templateUrl: 'templates/horseContent.html',},
			'hotlist@horse': { templateUrl: 'templates/hotContent.html'},
		},
	})  
	 .state('horse.taptype', {  
		url: '/:taptype',  
		views: {
				 'detail@horse': {templateUrl: 'templates/newsList.html',
					controller: function($scope, $state, $stateParams) {
						$scope.page.currentindex=$scope.Map[$stateParams.taptype];
					    $scope.getPagingData();	
					},

				},
			}
	}) 
	 .state('horse.taptype.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@horse': {templateUrl: 'templates/articalT2.html',
					controller: function($scope, $state, $stateParams) {
						  $scope.page.currentindex=$scope.Map[$stateParams.taptype];
					    $scope.getPassagedetail();					
					},
				},
			}
	})  


	.state('passage', {  
		url: '/passage',  
		views: {				
				'':{templateUrl: 'templates/newsContent.html' },
			}
	})  
	.state('passage.taptype', {  
		url: '/:taptype',  
		views: {
				'detail@passage': {
					templateUrl: 'templates/newsList.html' ,
					controller: function($scope, $state, $stateParams) {
						$scope.getPagingData();
					}
			},
				'hotlist@passage': {templateUrl: 'templates/hotContent.html'},
			}
	})  
	 .state('passage.taptype.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@passage': {templateUrl: 'templates/articalT2.html',
				 controller: function($scope, $state, $stateParams) {
						$scope.getPassagedetail();
					}
				},
				 'guess@passage': {templateUrl: 'templates/guessContent.html'},
			}
	})   



//在线课程
.state('onlinelesson', {  
		url: '/onlinelesson',  
		views: {
				'':{templateUrl: 'templates/onlineContent.html', 
			},
				 'hotlist@onlinelesson': {templateUrl: 'templates/hotContent.html'
				},
			}
	})



.state('saying', {  
		url: '/saying',  
		templateUrl: 'templates/sayingContent.html',
	})  
	 .state('saying.taptype', {  
		url: '/:taptype',  
		views: {
				 'detail@saying': { 
					templateUrl:  function($stateParams){return 'templates/'+$stateParams.taptype+'.html';},
					controller:  function($scope, $state, $stateParams) {
					    if ($stateParams.taptype!='post') {
					            $scope.getPagingData();
					    }
					},
				},

			}
	}) 
	 .state('saying.taptype.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@saying': {
					templateUrl: 'templates/sayingDetail.html',
					controller:  function($scope, $state, $stateParams) {
					  $scope.getPassagedetail();
					},
				},
			}
	})   

.state('lesson',{  
		 url: '/lesson',//书本列表
		 views: {
				 '':{
					templateUrl: 'templates/lessonContent.html',
					   controller: function() {
					}
				 },
				 'detail@lesson': {
					templateUrl: 'templates/lessonList.html',
					controller: function($scope, $state, $stateParams) {
						$scope.getLessonList();
					}
				},
				'hotlist@lesson': {
					templateUrl: 'templates/hotContent.html'
				},
			}
	})  
  

 .state('lesson.bookName', {  
	url: '/:bookName',  //目录，阅读书目，精品在线
	views: {
		},
}) 
	 .state('lesson.bookName.catalogue', {  
		url: '/catalogue',  
		views: {
				 'detail@lesson': {
					templateUrl: 'templates/lessonCatalohue.html',
					 controller: function($scope, $state, $stateParams) {
                    	$scope.current.ifCata='catalogue';
                    	 $scope.getCatalogueData();
					},
				},
			},
	}) 
	 .state('lesson.bookName.booklist', {  
		url: '/booklist',  
		views: {
				 'detail@lesson': {
					// templateUrl: 'templates/lessonreadbook.html',
					templateUrl: 'templates/newsList.html',
					 controller: function($scope, $state, $stateParams) {
                        $scope.current.ifCata='booklist';
						  $scope.page.currentindex=6;
                        $scope.getBooklisrData();
					}
				},
			},
	}) 
	.state('lesson.bookName.booklist.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@lesson': {
					// templateUrl: 'templates/lessonreadBookdetail.html',
					templateUrl: 'templates/articalT2.html',
					 controller: function($scope, $state, $stateParams) {
                        $scope.current.ifCata='booklist';
						  $scope.page.currentindex=6;
						   $scope.getBookdetailData();
					}
				},
			},
	}) 
	.state('lesson.bookName.catalogue.chapter', {  
		url: '/:chapter',  
		views: {
				 'detail@lesson': {
					templateUrl: 'templates/lessonCatalohue2.html',
					 controller: function($scope, $state, $stateParams) {
					 	$scope.getChapterData();
					}
				},
			},
	}) 
	.state('lesson.bookName.catalogue.chapter.passageType', {  
		url: '/:passageType',  
		views: {
				 'detail@lesson': {
					templateUrl: 'templates/newsList.html',
					 controller: function($scope, $state, $stateParams) {
					    $scope.page.currentindex=$scope.Map[$stateParams.passageType];
					 	$scope.getPassageListData();
					 	
					 	
					}
				},
			},
	}) 

	.state('lesson.bookName.catalogue.chapter.passageType.articleid', {  
		url: '/:articleid',  
		views: {
				 'detail@lesson': {
					templateUrl: 'templates/articalT1.html',
					 controller: function($scope, $state, $stateParams) {
						 $scope.getPassagedetailData();
					}
				},
			},
	}) 

	.state('meeting', {  
		url: '/meeting',  
		views: {				
				'':{templateUrl: 'templates/guesscontent2.html' },				
				'detail@meeting': {templateUrl: 'templates/newsList.html' ,},
				'hotlist@meeting': {templateUrl: 'templates/hotContent.html'},

			}
	})  
	.state('meeting.articleid', {  
		url: '/:articleid',  
		views: {
				'detail@meeting': {templateUrl: 'templates/articleT3.html' ,
				 controller: function($scope, $state, $stateParams) {
					}
			},
			'guess@meeting': {templateUrl: 'templates/guessContent.html'},
			}
	})  

	.state('school', {  
		url: '/school',  
		views: {				
				'':{templateUrl: 'templates/school.html' },				
			}
	})  
	.state('school.taptype', {  
		url: '/:taptype',  
		views: {
				'detail@school': {templateUrl: 'templates/schoollist.html' ,},
			}
	})  

	.state('links', {  
		url: '/links',  
		views: {				
				'':{templateUrl: 'templates/links.html' },				
			}
	})  
	.state('login', {  
		url: '/login',  
		views: {				
				'':{templateUrl: 'templates/login.html' },				
			}
	})  
	.state('register', {  
		url: '/register',  
		views: {				
				'':{templateUrl: 'templates/register.html' },				
			}
	})  
	.state('index', {
			url: '/index',  
			templateUrl: 'templates/indexNav.html'
	});  
});  




   
