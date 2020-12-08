angular.module('controller_htmbgl', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 合同模板管理
 */

//待选楼栋-列表页面
.controller('htmbglDxldListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	$scope.ywObj = {ywxl:""};
	
	if(typeof $stateParams.id == "number" && $stateParams.id > 0){
		$scope.if_addLD = true;
	}else{
		$stateParams.id = 0;
	}
	var selectListMap = {};
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		$('.kg').on('click', function(){
			$(this).parent().parent().parent().find(".showhide").toggle();
		});
		
		$('.showhide').toggle();
		
		$('.gou').on('click', function(){
			if($(this).hasClass("checked")){
				$(this).removeClass('checked');
			}else{
				$(this).addClass('checked');
			}
		});
		
	});
	
    $ionicPopover.fromTemplateUrl("p_showYHXY.html", {
        scope: $scope,
        animation: "slide-in-up",
        backdropClickToClose: true
    }).then(function(popover) {
        $scope.popover = popover;
    });
    
    $scope.showPop = function($event){
    	if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
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
	
	var listName = "dxldList";
	
	$scope.setSelect = function(obj) {
		if(selectListMap[obj.BUILDID]){
			delete selectListMap[obj.BUILDID];
		}else{
			selectListMap[obj.BUILDID] = obj.BUILDID;
		}
	}
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	//办理
	$scope.banli = function() {
		if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
		var ldids = Object.getOwnPropertyNames(selectListMap).toString();
		
        var requestBody = {_module:'TT',_method:'htmbgl_submitDbal',orgno:g_getOrgno(),ldids:ldids,realtypeid:$scope.ywObj.ywxl};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('htmbgl_mbgl_list');
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
	//已有业务，添加楼栋
	$scope.addLD = function() {
		if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
		var ldids = Object.getOwnPropertyNames(selectListMap).toString();
		
        var requestBody = {_module:'TT',_method:'htmbgl_ldAdd',id:$stateParams.id,ldids:ldids};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go($stateParams.backURL,{id:$stateParams.id});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'htmbgl_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno(),id:$stateParams.id};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'htmbgl_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno(),id:$stateParams.id};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//模板管理-列表界面
.controller('htmbglMbglListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "htmbgl_mbglList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 16100400 && 41 == g_getOrgTypeno()){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'htmbgl_mbgl_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'htmbgl_getMbglListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'htmbgl_getMbglListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
 		$rootScope.goRouteForBack("htmbgl_mbgl_detail",{id:id},null);
 	}
	
	//下载
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(x,paramsObj);
    }
    //预览
	$scope.showPDFImg= function(ywbh) {
		var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(x,paramsObj);
	}
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(x,paramsObj,"htmbgl_mbgl_list");
    }
	
	//草拟提交
	$scope.caoniTJ = function(obj,svalue) {
		$scope.tj(obj,svalue);
	};
	
	//提交或回退
	$scope.tj= function(obj,svalue) {
		var requestBody = g_getRBObj_tjht(obj.ID,obj.FLOWID,obj.MASTATUS,obj.STANID,obj.REALTYPEID,svalue);
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
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
 		var requestBody = {_module:'TT',_method:'htmbgl_delHtmbgl',id:id};
 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
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

//模板管理-详细
.controller('htmbglMbglDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var mastatus = null;
	
	$(".classfy label").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		isDisabled();
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
	})
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		
	});
	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		
		if(bastatus == 0 && mastatus == 16100400 && 41 == g_getOrgTypeno()){
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	
	//业务详细maps查询
	$scope.xx = function() {
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'htmbgl_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				$scope.ywDetails = data;
				id = data.yewu.ID;
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				isDisabled();
				
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })		
	}	
	
	//默认调用详细方法
	$scope.xx();
	
	//业务更新保存
	$scope.yw_upd = function(){
		var obj = $scope.ywDetails.yewu;
		if(g_checkNullByClass($rootScope,"ywDetailTabs","notNull")){
    		return false;
    	}
		var requestBody = {_module:'TT',_method:'htmbgl_updHtmbgl',ywObj:obj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//跳转-楼栋选择（添加）页面
	$scope.goLdAdd = function() {
		$state.go('htmbgl_dxld_list',{id:id,backURL:'htmbgl_mbgl_detail'});
	}
	
	//楼栋删除
	$scope.ld_del = function(index){
		var ldid = $scope.ywDetails.ld[index].BUILDID;
		var requestBody = {_module:'TT',_method:'htmbgl_ldDel',id:$scope.ywDetails.yewu.ID,ldid:ldid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails.ld.splice(index, 1);
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//增加空白合同模板
	$scope.htmbAddTemp = function(curLdObj){
		curLdObj.htmbList[curLdObj.htmbList.length] = {"ISDEFAULTFLAG" : 0,BUILDID:curLdObj.BUILDID,ACTIVEID:curLdObj.MAINNO,oldCanUseHtmbSelect:curLdObj.oldCanUseHtmbSelect};
	};
	
	//删除合同模板
	$scope.htmbDel = function(ldObj,delObj){
		if(!delObj.CTID){
			g_ngrepeat_removeArray(ldObj.htmbList,delObj.$$hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'htmb_del',ctid:delObj.CTID};
	 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
	 			if(data && data.type && data.type=="success"){
	 				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
	 				g_ngrepeat_removeArray(ldObj.htmbList,delObj.$$hashKey);
	            }else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};
	
	//保存或更新合同模板
	$scope.htmbSave = function($event,ng_obj,ldObj){
		var bigDivId = $($event.target).attr("bigDivId");
		if(g_checkNullByClass($rootScope,bigDivId,"notNull")){
    		return false;
    	}
		
		if(ng_obj.ISDEFAULTFLAG == -1){
			g_ngrepeat_setOnlyValue(ldObj.htmbList,ng_obj.$$hashKey, "ISDEFAULTFLAG", -1, 0);
		}
		
		var requestBody = {_module:'TT',_method:'htmb_save',id:id,ngObj:ng_obj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(data.content && data.content.CTID){
					ng_obj.CTID=data.content.CTID;
					ng_obj.CONTRACTTEMPLATENAME=data.content.CONTRACTTEMPLATENAME;
				} 
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
})