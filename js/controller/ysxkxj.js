angular.module('controller_ysxjxj', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 预售许可新建模块
 */

//待选楼栋-列表页面
.controller('ysxkxjDxldListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	if(typeof $stateParams.id == "number" && $stateParams.id > 0){
		$scope.if_addLD = true;
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
	
	var listName = "ysxkxj_dxldList";
	
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
		
        var requestBody = {_module:'TT',_method:'ysxkxj_submitDbal',orgno:g_getOrgno(),ldids:ldids};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('ysxkxj_ysxk_list');
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
		
        var requestBody = {_module:'TT',_method:'ysxkxj_ldAdd',id:$stateParams.id,ldids:ldids};
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
 		var requestBody = {_module:'TT',_method:'ysxkxj_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'ysxkxj_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//预售许可新建及其审核-列表界面
.controller('ysxkxjYsxkListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "ysxkxj_ysxkList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 1611010){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'ysxkxj_ysxk_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'ysxkxj_getYsxkListByPage',roleno:g_getRoleno(),orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'ysxkxj_getYsxkListByPage',roleno:g_getRoleno(),orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
 		$rootScope.goRouteForBack("ysxkxj_ysxk_detail",{id:id},null);
 	}	
	
	//下载申请表
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(46,paramsObj);
    }
    //预览申请表
	$scope.showPDFImg= function(ywbh) {
		var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(46,paramsObj);
	}
	//申请表二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(46,paramsObj,"ysxkxj_ysxk_list");
    }
	
	//草拟提交
	$scope.caoniTJ = function(obj,svalue) {
		if(obj.checkAppPicsEnough){
			if(obj.IF_YWCOL_NOTNULL == 0){
				$rootScope.mttAlert("业务详细中预售房性质、预售范围等信息不能为空！");
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
 		var requestBody = {_module:'TT',_method:'ysxkxj_delYsxkxj',id:id};
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

//预售许可详细
.controller('ysxkxjYsxkDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
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
		for(var i=0; i<MAX_RN; i++){
			dateTime(i);
		}
	});
	//调用日期控件
	function dateTime(num){
		g_dateSelect('#SYQQSRQ'+num, null, null);
		g_dateSelect('#SYQZZRQ'+num, null, null);
		g_dateSelect('#FZRQ'+num, null, null);
		g_dateSelect('#FZRQ2'+num, null, null);
		g_dateSelect('#KGRQ'+num, null, null);
		g_dateSelect('#JGRQ'+num, null, null);
		g_dateSelect('#FZRQ3'+num, null, null);
		g_dateSelect('#FZRQ4'+num, null, null);
		g_dateSelect('#FZRQ5'+num, null, null);
	}
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		
		if(bastatus == 0 && mastatus == 1611010 && g_getRoleno() != PUBLIC_JS_GLY){
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	var MAX_RN = 0;
	//业务详细maps查询
	$scope.xx = function() {
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'ysxkxj_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data.zdsyqz.length == 0){
					data.zdsyqz[0] = {"STREET" :  ""};
				}
				if(data.gcghxkz.length == 0){
					data.gcghxkz[0] = {"CERTNO" :  ""};
				}
				if(data.sgxkz.length == 0){
					data.sgxkz[0] = {"SCHEDUAL" :  ""};
				}
				if(data.jsydghxkz.length == 0){
					data.jsydghxkz[0] = {"PROJECTNAME" :  ""};
				}
				if(data.jsydpzs.length == 0){
					data.jsydpzs[0] = {"DOORNO" :  ""};
				}
				$scope.ywDetails = data;
				MAX_RN = data.zdsyqz.length;
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
	
	//增加宗地使用权证
	$scope.addZd = function(){
		$scope.ywDetails.zdsyqz[$scope.ywDetails.zdsyqz.length] = {"STREET" : "",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	//增加工程规划许可证
	$scope.addGcgh = function(){
		$scope.ywDetails.gcghxkz[$scope.ywDetails.gcghxkz.length] = {"CERTNO" : "",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	//增加施工许可证
	$scope.addSgxk = function(){
		$scope.ywDetails.sgxkz[$scope.ywDetails.sgxkz.length] = {"SCHEDUAL" : "",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	//增加建设用地规划许可证
	$scope.addJsyd = function(){
		$scope.ywDetails.jsydghxkz[$scope.ywDetails.jsydghxkz.length] = {"PROJECTNAME" : "",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	//增加建设用地批准书
	$scope.addPzs = function(){
		$scope.ywDetails.jsydpzs[$scope.ywDetails.jsydpzs.length] = {"DOORNO" : "",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	//删除宗地使用权证
	$scope.del_zdsyqz = function(obj){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.zdsyqz[i].MARK;
		if(!mark){
			g_clfwq_removeArray($scope.ywDetails.zdsyqz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteZdsyqzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.zdsyqz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除工程规划许可证
	$scope.del_gcghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.gcghxkz.length; i++) {
	        if ($scope.ywDetails.gcghxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.gcghxkz[i].MARK;
		if(!mark){
			g_clfwq_removeArray($scope.ywDetails.gcghxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteGcghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.gcghxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	
	//删除施工许可证
	$scope.del_sgxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.sgxkz.length; i++) {
	        if ($scope.ywDetails.sgxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.sgxkz[i].MARK;
		if(!mark){
			g_clfwq_removeArray($scope.ywDetails.sgxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteSgxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.sgxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地规划许可证
	$scope.del_jsydghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydghxkz.length; i++) {
	        if ($scope.ywDetails.jsydghxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydghxkz[i].MARK;
		if(!mark){
			g_clfwq_removeArray($scope.ywDetails.jsydghxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.jsydghxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地批准书
	$scope.del_jsydpzs = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydpzs.length; i++) {
	        if ($scope.ywDetails.jsydpzs[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydpzs[i].MARK;
		if(!mark){
			g_clfwq_removeArray($scope.ywDetails.jsydpzs,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydpzsInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.jsydpzs,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//业务更新保存
	$scope.yw_upd = function(){
		var obj = $scope.ywDetails.yewu;
		var PRESALEUSE = obj.PRESALEUSE;
		if(g_checkIsNull(obj.PRESALEUSE) || g_checkIsNull(obj.PRESALESCOPE) || g_checkIsNull(obj.PRESALEOBJECT)){
			$rootScope.mttAlert("预售房性质、预售范围、预售对象不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'ysxkxj_updYsxkxj',id:obj.ID,ysfxz:obj.PRESALEUSE,ysfw:obj.PRESALESCOPE,ysdx:obj.PRESALEOBJECT,bz:obj.BZ};
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
	
	//跳转楼盘表
	$scope.goLPB = function() {
		$rootScope.goRouteForBack("lpb",{id:id,if_oper_room:$scope.if_show_baocunButton},{id:id});
	}
	
	//跳转-楼栋选择（添加）页面
	$scope.goLdAdd = function() {
		$state.go('ysxkxj_dxld_list',{id:id,backURL:'ysxkxj_ysxk_detail'});
	}
	
	//楼栋删除
	$scope.ld_del = function(index){
		var ldid = $scope.ywDetails.ld[index].BUILDID;
		var requestBody = {_module:'TT',_method:'ysxkxj_ldDel',id:$scope.ywDetails.yewu.ID,ldid:ldid};
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
	//宗地使用权证信息保存
	$scope.save_zdsyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var id=$scope.ywDetails.yewu.ID;
		var certno=$scope.ywDetails.zdsyqz[index].CERTNO;
		if(g_checkIsNull(certno)){
			$rootScope.mttAlert("请输入土地证号！");
			return false;
		}
		var district = $scope.ywDetails.zdsyqz[index].REGIONID;
		if(g_checkIsNull(district)){
			$rootScope.mttAlert("请选择区县信息！");
			return false;
		}
		var street = $scope.ywDetails.zdsyqz[index].STREET;
		if(g_checkIsNull(street)){
			$rootScope.mttAlert("请输入街道信息！");
			return false;
		}
		var doorno = $scope.ywDetails.zdsyqz[index].DOORNO;
		if(!doorno){
			$rootScope.mttAlert("请输入门牌号信息！");
			return false;
		}
        var usecerttype=$scope.ywDetails.zdsyqz[index].USECERTTYPE;
        if(!usecerttype){
			$rootScope.mttAlert("请选择权证类型！");
			return false;
		}
        var landuse1=$scope.ywDetails.zdsyqz[index].LANDUSE1;
        if(!landuse1){
			$rootScope.mttAlert("请选择土地批准用途！");
			return false;
		}
		var buildarea = $scope.ywDetails.zdsyqz[index].BUILDAREA;
		if(!buildarea){
			$rootScope.mttAlert("请输入使用权面积！");
			return false;
		}
		var landusetype = $scope.ywDetails.zdsyqz[index].LANDUSETYPE;
		 if(!landusetype){
				$rootScope.mttAlert("请选择使用权取得方式！");
				return false;
			}
		var mark = $scope.ywDetails.zdsyqz[index].MARK;
		var syqqsrq=$("#SYQQSRQ"+index).val();
		var syqzzrq=$("#SYQZZRQ"+index).val();
		var fzrq=$("#FZRQ"+index).val();
		if(g_checkIsNull(fzrq)){
			$rootScope.mttAlert("发证日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveZdsyqzInfo',id:id,district:district,street:street,doorno:doorno,certno:certno,
				usecerttype:usecerttype,landuse1:landuse1,buildarea:buildarea,landusetype:landusetype,mark:mark,usestartdate:syqqsrq,landuseenddate1:syqzzrq,getcertdate:fzrq,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.zdsyqz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	

	//工程规划许可信息保存
	$scope.save_gcghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.gcghxkz.length; i++) {
	        if ($scope.ywDetails.gcghxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.gcghxkz[index].CERTNO;
		if(g_checkIsNull(certno)){
			$rootScope.mttAlert("请输入证号信息！");
			return false;
		}
		var buildarea = $scope.ywDetails.gcghxkz[index].BUILDAREA;
		if(!buildarea){
			$rootScope.mttAlert("请输入建筑面积！");
			return false;
		}
		var cubageratio=$scope.ywDetails.gcghxkz[index].CUBAGERATIO;
		var greenratio=$scope.ywDetails.gcghxkz[index].GREENRATIO;
		var housearea=$scope.ywDetails.gcghxkz[index].HOUSEAREA;
		var businessarea=$scope.ywDetails.gcghxkz[index].BUSINESSAREA;
		var officearea=$scope.ywDetails.gcghxkz[index].OFFICEAREA;
		var otherarea=$scope.ywDetails.gcghxkz[index].OTHERAREA;
		var mark = $scope.ywDetails.gcghxkz[index].MARK;
		var getcertdate=$("#FZRQ2"+index).val();
		if(g_checkIsNull(getcertdate)){
			$rootScope.mttAlert("发证日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveGcghxkInfo',id:id,certno:certno,buildarea:buildarea,cubageratio:cubageratio,greenratio:greenratio,
				housearea:housearea,businessarea:businessarea,officearea:officearea,otherarea:otherarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.gcghxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//施工许可证信息保存
	$scope.save_sgxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.sgxkz.length; i++) {
	        if ($scope.ywDetails.sgxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.sgxkz[index].CERTNO;
		if(g_checkIsNull(certno)){
			$rootScope.mttAlert("请输入证号信息！");
			return false;
		}
		var schedual=$scope.ywDetails.sgxkz[index].SCHEDUAL;
		if(g_checkIsNull(schedual)){
			$rootScope.mttAlert("请输入施工进度！");
			return false;
		}
		var conscertarea=$scope.ywDetails.sgxkz[index].CONSCERTAREA;
		if(g_checkIsNull(conscertarea)){
			$rootScope.mttAlert("请输入建筑面积！");
			return false;
		}
		
		var mark = $scope.ywDetails.sgxkz[index].MARK;
		var startdatetime=$("#KGRQ"+index).val();
		if(g_checkIsNull(startdatetime)){
			$rootScope.mttAlert("开工日期不能为空！");
			return false;
		}
		var closedatetime=$("#JGRQ"+index).val();
		if(g_checkIsNull(closedatetime)){
			$rootScope.mttAlert("竣工日期不能为空！");
			return false;
		}
		var getcertdate=$("#FZRQ3"+index).val();
		if(g_checkIsNull(getcertdate)){
			$rootScope.mttAlert("发证日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveSgxkInfo',id:id,certno:certno,schedual:schedual,conscertarea:conscertarea,startdatetime:startdatetime,
				closedatetime:closedatetime,getcertdate:getcertdate,mark:mark,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.sgxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//建设用地规划许可证信息保存
	$scope.save_jsydghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydghxkz.length; i++) {
	        if ($scope.ywDetails.jsydghxkz[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.jsydghxkz[index].CERTNO;
		if(g_checkIsNull(certno)){
			$rootScope.mttAlert("请输入证号信息！");
			return false;
		}
		var projectname = $scope.ywDetails.jsydghxkz[index].PROJECTNAME;
		if(g_checkIsNull(projectname)){
			$rootScope.mttAlert("请输入项目名称信息！");
			return false;
		}
		var district=$scope.ywDetails.jsydghxkz[index].REGIONID;
		if(g_checkIsNull(district)){
			$rootScope.mttAlert("请选择区县信息！");
			return false;
		}
		var street=$scope.ywDetails.jsydghxkz[index].STREET;
		if(!street){
			$rootScope.mttAlert("请输入街道信息！");
			return false;
		}
		var doorno=$scope.ywDetails.jsydghxkz[index].DOORNO;
		if(!doorno){
			$rootScope.mttAlert("请输入门牌号信息！");
			return false;
		}
		var buildarea=$scope.ywDetails.jsydghxkz[index].BUILDAREA;
		if(!buildarea){
			$rootScope.mttAlert("请输入建筑规模面积！");
			return false;
		}
		var landarea=$scope.ywDetails.jsydghxkz[index].LANDAREA;
		if(!landarea){
			$rootScope.mttAlert("请输入用地面积！");
			return false;
		}
		var mark = $scope.ywDetails.jsydghxkz[index].MARK;
		var getcertdate=$("#FZRQ4"+index).val();
		if(g_checkIsNull(getcertdate)){
			$rootScope.mttAlert("发证日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveJsydghxkInfo',id:id,certno:certno,projectname:projectname,district:district,street:street,
				doorno:doorno,buildarea:buildarea,landarea:landarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.jsydghxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//建设用地批准书信息保存
	$scope.save_jsydpzs = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydpzs.length; i++) {
	        if ($scope.ywDetails.jsydpzs[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.jsydpzs[index].CERTNO;
		if(g_checkIsNull(certno)){
			$rootScope.mttAlert("请输入证号信息！");
			return false;
		}
		var district=$scope.ywDetails.jsydpzs[index].REGIONID;
		if(g_checkIsNull(district)){
			$rootScope.mttAlert("请选择区县信息！");
			return false;
		}
		var street=$scope.ywDetails.jsydpzs[index].STREET;
		if(g_checkIsNull(street)){
			$rootScope.mttAlert("请输入街道信息！");
			return false;
		}
		var doorno=$scope.ywDetails.jsydpzs[index].DOORNO;
		if(g_checkIsNull(doorno)){
			$rootScope.mttAlert("请输入门牌号信息！");
			return false;
		}
		var buildarea=$scope.ywDetails.jsydpzs[index].BUILDAREA;
		if(!buildarea){
			$rootScope.mttAlert("请输入建筑面积！");
			return false;
		}
		var mark = $scope.ywDetails.jsydpzs[index].MARK;
		var getcertdate=$("#FZRQ5"+index).val();
		if(g_checkIsNull(getcertdate)){
			$rootScope.mttAlert("发证日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveJsydpzsInfo',id:id,certno:certno,district:district,street:street,
				doorno:doorno,buildarea:buildarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.jsydpzs[index].MARK = data.content;
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