angular.module('controller_dwzc', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 新单位注册模块
 */

//业务新建
.controller('dwzxYwxjDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	//办理
	$scope.banli = function() {
		
        var requestBody = {_module:'TT',_method:'dwzc_ywxj',realtypeid:$scope.realtypeid,content:$scope.content};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('dwzc_dwzc_list');
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
})

//单位新建-列表界面
.controller('dwzcDwzcListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "dwzc_dwzcList";
	//图片编辑查看页面
	$scope.goEdit = function(obj){
		if(!obj.PRE_BUSINESSID){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:obj.ID,backURL:'dwzc_dwzc_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'dwzc_getDwzcListByPage',roleno:g_getRoleno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'dwzc_getDwzcListByPage',roleno:g_getRoleno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id) {
		$rootScope.goRouteForBack("dwzc_dwzc_detail",{id:id},null);
 	}	
	
	//草拟提交
	$scope.caoniTJ = function(obj,svalue) {
		if(obj.checkAppPicsEnough){
			if(obj.DWNUM == 0){
				$rootScope.mttAlert("操作失败：请维护要新增的单位信息！");
			}else{
				$scope.tj(obj,svalue);
			}
		}else{
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGHPICS);
		}
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
 		var requestBody = {_module:'TT',_method:'dwzc_delDwzc',id:id};
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

//单位新建详细
.controller('dwzcDwzcDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var PRE_BUSINESSID = null;
	
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
	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		
		if(bastatus == 0 && PRE_BUSINESSID == null && g_getRoleno() != PUBLIC_JS_GLY){
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}

	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		if($scope.if_show_baocunButton){
			for(var i=0; i<$scope.ywDetails.gr.length; i++){
				g_dateSelect('#BIRTHDAY_'+i, null, null);
			}
		}
	});
	//业务详细maps查询
	$scope.xx = function() {
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'dwzc_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data.dw.length == 0){
					data.dw[0] = {"ORGANIZETYPENO":data.yewu.ORGANIZETYPENO};
				}
				$scope.ywDetails = data;
				id = data.yewu.ID;
				bastatus = data.yewu.BASTATUS;
				PRE_BUSINESSID = data.yewu.PRE_BUSINESSID;
				isDisabled();
				
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })		
	}	
	
	//默认调用详细方法
	$scope.xx();
	
	//增加个人
	$scope.addGr = function(){
		if(!$scope.ywDetails.dw[0].ORGANIZENO){
			$rootScope.mttAlert('操作失败：请先维护单位信息！');
			return false;
		}
		$scope.ywDetails.gr[$scope.ywDetails.gr.length] = {"ORGANIZENO" : $scope.ywDetails.dw[0].ORGANIZENO};
	}
	
	//业务更新保存
	$scope.yw_upd = function(){
		var obj = $scope.ywDetails.yewu;
		if(g_checkNullByClass($rootScope,"ywCard","ifEdit")){
    		return false;
    	}
		var requestBody = {_module:'TT',_method:'dwzc_updDwzc',id:obj.ID,content:obj.CONTENT};
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
	
	//单位保存
	$scope.save_dw = function(_id,hashKey,_index){
		if(g_checkNullByClass($rootScope,"danwei_"+_index,"notNull")){
    		return false;
    	}
		var dwObj = g_ngrepeat_get($scope.ywDetails.dw,hashKey);
		var requestBody = {_module:'TT',_method:'dwzc_insertUpdDw',id:_id+"",dwObj:dwObj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(!dwObj.ORGANIZENO){
					dwObj.ORGANIZENO = data.content.ORGANIZENO;
					dwObj.IDTYPE = data.content.IDTYPE;
				}
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//个人保存
	$scope.save_gr = function(_id,hashKey,_index){
		if(g_checkNullByClass($rootScope,"geren_"+_index,"notNull")){
    		return false;
    	}
		var grObj = g_ngrepeat_get($scope.ywDetails.gr,hashKey);
		grObj.BIRTHDAY = $("#BIRTHDAY_"+_index).val();
		if( grObj.IDTYPE == "居民身份证" && !g_isCardNo(grObj.IDNO)){
			$rootScope.mttAlert(PUBLIC_CHECHERROR_IDCARD);
			return false;
		}
		var requestBody = {_module:'TT',_method:'dwzc_insertUpdGr',id:_id+"",grObj:grObj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(!grObj.PARTICIPANTNO){
					grObj.PARTICIPANTNO = data.content.PARTICIPANTNO;
				}
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS_AND_REFRESH,function() {
					$scope.xx();
 				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//个人删除
	$scope.del_gr = function(_id,hashKey){
		var grObj = g_ngrepeat_get($scope.ywDetails.gr,hashKey);
		if(grObj.PARTICIPANTNO){
			var requestBody = {_module:'TT',_method:'dwzc_delGr',id:_id+"",grObj:grObj};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					g_ngrepeat_removeArray($scope.ywDetails.gr,hashKey);
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS_AND_REFRESH,function() {
						$scope.xx();
	 				});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}else{
			g_ngrepeat_removeArray($scope.ywDetails.gr,hashKey);
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}
	}
	
	//个人-是否法人代表切换
	$scope.setOrCancelFRDB = function(_id,hashKey){
		var grObj = g_ngrepeat_get($scope.ywDetails.gr,hashKey);
		var requestBody = {_module:'TT',_method:'dwzc_setOrCancelFRDB',id:_id+"",curValue:grObj.ISFRDB,PARTICIPANTNO:grObj.PARTICIPANTNO};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				grObj.ISFRDB = data.content;
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS_AND_REFRESH,function() {
					$scope.xx();
 				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
	
	//个人-是否授权委托人切换
	$scope.setOrCancelSQWTR = function(_id,hashKey){
		var grObj = g_ngrepeat_get($scope.ywDetails.gr,hashKey);
		var requestBody = {_module:'TT',_method:'dwzc_setOrCancelSQWTR',id:_id+"",curValue:grObj.ISDELEGATE,PARTICIPANTNO:grObj.PARTICIPANTNO};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				grObj.ISDELEGATE = data.content;
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS_AND_REFRESH,function() {
					$scope.xx();
 				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
})

//单位注册菜单模块
.controller('dwzcmkcdController',function($rootScope,$scope,$http,$state,$stateParams,MyFactoryNew){
	$scope.search = function(){
		var ywspYwdl = $("#ywsp").val();
		if(ywspYwdl){
			ywspYwdl = Number(ywspYwdl);
		}
		if(ywspYwdl && typeof ywspYwdl == "number" && ywspYwdl > 0){
			$rootScope.goywsplistMustLogin(ywspYwdl);
		}else{
			$rootScope.mttAlert("请在下拉框中选择一种要审批的业务！");
		}
	}
})