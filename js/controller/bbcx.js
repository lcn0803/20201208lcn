/**
 * 报表查询
 */
angular.module('controller_bbcx', ['ionic', 'highcharts-ng', 'ngCordova', 'services','services-2.0'])


/**
 * 住建部日报报表
 */
.controller('bbcxZjbrbbbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelect('#CXRQ', null, null);
	$("#CXRQ").val(new Date().format('yyyy-MM-dd'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("700_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 住建部月报报表
 */
.controller('bbcxZjbybbbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', null, null);
	$("#CXRQ").val(new Date().format('yyyy-MM'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbybbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbybbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("701_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 住建部日报月表
 */
.controller('bbcxZjbrbybController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', 'month');
	$("#CXRQ").val(new Date().format('yyyy-MM'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("722_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 住建部日报各区县月表
 */
.controller('bbcxZjbrbgqxybController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', 'month');
	$("#CXRQ").val(new Date().format('yyyy-MM'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbgqxybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbrbgqxybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("723_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 住建部月报年表
 */
.controller('bbcxZjbybnbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', 'year');
	$("#CXRQ").val(new Date().format('yyyy'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbybnbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZjbybnbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("706_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 区县日报报表
 */
.controller('bbcxQxrbbbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	$scope.selectObj = {itemObj:""};
	
	var listName = "bbcxList";
	g_dateSelect('#CXRQ', null, null);
	$("#CXRQ").val(new Date().format('yyyy-MM-dd'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getQxrbbbListByPage',cxrq:cxrq,qxdm:$scope.selectObj.itemObj.SJZDBCZ,qxmc:$scope.selectObj.itemObj.SJZDXSZ};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getQxrbbbListByPage',cxrq:cxrq,qxdm:$scope.selectObj.itemObj.SJZDBCZ,qxmc:$scope.selectObj.itemObj.SJZDXSZ};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("707_cxrq:'"+cxrq+"'_qxmc:'"+$scope.selectObj.itemObj.SJZDXSZ+"'");
    }
	
})


/**
 * 区县月报报表
 */
.controller('bbcxQxybbbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	$scope.selectObj = {itemObj:""};
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', 'month');
	$("#CXRQ").val(new Date().format('yyyy-MM'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getQxybbbListByPage',cxrq:cxrq,qxdm:$scope.selectObj.itemObj.SJZDBCZ,qxmc:$scope.selectObj.itemObj.SJZDXSZ};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getQxybbbListByPage',cxrq:cxrq,qxdm:$scope.selectObj.itemObj.SJZDBCZ,qxmc:$scope.selectObj.itemObj.SJZDXSZ};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("705_cxrq:'"+cxrq+"'_qxmc:'"+$scope.selectObj.itemObj.SJZDXSZ+"'");
    }
	
})

/**
 * 主城区及区县日报月表
 */
.controller('bbcxZcqjqxrbybController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelectType('#CXRQ', 'month');
	$("#CXRQ").val(new Date().format('yyyy-MM'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZcqjqxrbybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZcqjqxrbybListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("702_cxrq:'"+cxrq+"'");
    }
	
})

/**
 * 主城区及区县日报报表
 */
.controller('bbcxZcqjqxrbbbController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	var listName = "bbcxList";
	g_dateSelect('#CXRQ', null, null);
	$("#CXRQ").val(new Date().format('yyyy-MM-dd'));
	var cxrq = null;
	$rootScope[listName] = null;
	$rootScope.isListData = null;
	
	//查询
	$scope.query = function() {
		
		$rootScope[listName] = null;
		$scope.doRefresh();
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		cxrq = $("#CXRQ").val();
 		var requestBody = {_module:'TT',_method:'bbcx_getZcqjqxrbbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'bbcx_getZcqjqxrbbbListByPage',cxrq:cxrq};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
	
	//下载
    $scope.downExcel= function() {
    	MyFactoryNew.downExcel("703_cxrq:'"+cxrq+"'");
    }
	
})

