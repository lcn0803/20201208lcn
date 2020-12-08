angular.module('controller_yshtba', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

//交易备案-列表页面
.controller('yshtbaJybaListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactory){

	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 1612010){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'yshtba_jyba_list'});
	};

	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=yshtba_getJybaListByPage","yshtba_jybaList",true,ifFromPullRefresh);
	}
	
	//加载更多
	$scope.loadMore= function(listName) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=yshtba_getJybaListByPage","yshtba_jybaList",false);
	}
    
    $scope.doRefresh();

	//详细
	$scope.xx = function(id) {
		$rootScope.goRouteForBack("ywDetailMaps",{id:id},null);
	}    
    
    //下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactory.downPDF(21,paramsObj);
    }
    
    //交易确认书预览
    $scope.showPDFImg= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactory.showPDFImg(21,paramsObj);		
    }
	
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactory.showPdfQRCode(21,paramsObj,"yshtba_jyba_list");
    }
    
    //网签已备案合同-下载PDF
    $scope.downPDF_wq= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactory.downPDF(600,paramsObj);
    }
	
	//网签已备案合同-二维码                    
    $scope.creQRCode_wq = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactory.showPdfQRCode(600,paramsObj,"yshtba_jyba_list");
    }
    
	//草拟提交
	$scope.caoniTJ = function(checkAppPicsEnough,id,flowid,businessID,stanID,realTypeID,svalue) {
		if(checkAppPicsEnough){
			$scope.tj(id,flowid,businessID,stanID,realTypeID,svalue);
		}else{
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGHPICS);
		}
	};
	
	//提交或回退
	$scope.tj= function(id,flowid,businessID,stanID,realTypeID,svalue) {
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=elevatorFlowNextOrBack&&id='+id+'&&flowid='+flowid+'&&businessID='+businessID+'&&stanID='+stanID+'&&realTypeID='+realTypeID+'&&svalue='+svalue, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$scope.doRefresh();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}	
	
	//删除
	$scope.del = function(id) {
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=yshtba_delJyba&&id='+id, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$scope.doRefresh();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
})	

//待办案例-列表页面
.controller('yshtbaDbalListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,MyFactory){

	//待办案例list页面
	$scope.getDbal = function() {
		//交互获得案例数据源list
		MyFactory.getHttpRequest( baseurl + '/bitsroad/queryPageJson?_module=TT&_method=yshtba_getDbalListByPage&pageNum=1', 'GET', null, null).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactory.listHtmlInitAndGoto(data, 'yshtba_dbalList', 'yshtba_dbal_list');
			}else if(data && data._page && data._page.count == 1){
				var id = data._page.results[0].ID;
				$rootScope.yshtba_dbalList = data._page.results;
				$rootScope.dbal = data._page.results[0];
				$state.go('yshtba_dbal_detail');
			}else if (data && data._page && data._page.count == 0){
				MyFactory.listHtmlInitAndGoto(data, 'yshtba_dbalList', 'yshtba_dbal_list');
				
			}else{
				if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}
			}
	    })
	}	
	
	$scope.getDbal();
	
	$scope.goDetailHtml = function(dbalObject) {
		if(dbalObject){
			$rootScope.dbal = dbalObject;
			$state.go('yshtba_dbal_detail');
		}else{
			$rootScope.mttAlert('获取待办案例详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=yshtba_getDbalListByPage","yshtba_dbalList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=yshtba_getDbalListByPage","yshtba_dbalList",false);
	}
	
})	

//待办案例-详细信息
.controller('yshtbaDbalDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,MyFactory){
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	$scope.banli = function() {
		var id = $scope.dbal.YWBH;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=yshtba_submitDbal&&id='+id, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('yshtba_jyba_list');
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
    $ionicPopover.fromTemplateUrl("p_showYHXY.html", {
        scope: $scope,
        animation: "slide-in-up",
        backdropClickToClose: true
    }).then(function(popover) {
        $scope.popover = popover;
    });
    
    $scope.showPop = function($event){
    	$scope.JS_CURDATE = new Date();
    	$rootScope.p_getLoginerInfo();
        $scope.popover.show($event);
    };
    
    // 清除浮动框
    $scope.$on("$destroy", function() {
        $scope.popover.remove();
    });
    // 在隐藏浮动框后执行
    $scope.$on("popover.hidden", function() {
        // 执行代码
    });
      // 移除浮动框后执行
    $scope.$on("popover.removed", function() {
        // 执行代码
    });
})
