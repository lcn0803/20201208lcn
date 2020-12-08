angular.module('controller_lwbgdw', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 开发企业,中介机构,金融机构查询
 */
//开发企业
.controller('kfqy_listController',function($rootScope,$scope,$http,$state,MyFactoryNew){
	
	var listName = "kfqyList";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var dwmc = $("#dwmc").val().trim();
 		if(ifFromPullRefresh){
 			$("#dwmc").val("");
 			dwmc = "";
 		}
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:41,dwmc:dwmc};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:41};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
	//重置
	$scope.clear = function(){
		$("#dwmc").val("");
	}
})

//中介机构
.controller('zjjg_listController',function($rootScope,$scope,$http,$state,MyFactoryNew){
	
	var listName = "zjjgList";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var dwmc = $("#dwmc").val().trim();
 		if(ifFromPullRefresh){
 			$("#dwmc").val("");
 			dwmc = "";
 		}
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:44,dwmc:dwmc};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:44};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
    //重置
	$scope.clear = function(){
		$("#dwmc").val("");
	}
})

//金融机构
.controller('jrjg_listController',function($rootScope,$scope,$http,$state,MyFactoryNew){
	
	var listName = "jrjgList";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var dwmc = $("#dwmc").val().trim();
 		if(ifFromPullRefresh){
 			$("#dwmc").val("");
 			dwmc = "";
 		}
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:43,dwmc:dwmc};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'lwbgdw_ListByPage',type:43};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
    //重置
	$scope.clear = function(){
		$("#dwmc").val("");
	}
})