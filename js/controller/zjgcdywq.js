angular.module('controller_zjgcdywq', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 在建工程抵押网签
 */

//待选楼栋-列表页面
.controller('zjgcdywqDxldListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
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
    	if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
    	$scope.JS_CURDATE = new Date();
    	//$scope.JS_CURLOGINERINFO =g_getLoginName();
    	//$rootScope.JS_LOGINNAME =g_getLoginName();
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
		
        var requestBody = {_module:'TT',_method:'zjgcdywq_submitDbal',orgno:g_getOrgno(),ldids:ldids};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('zjgcdywq_dywq_list');
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
		
        var requestBody = {_module:'TT',_method:'zjgcdywq_ldAdd',id:$stateParams.id,ldids:ldids};
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
 		var requestBody = {_module:'TT',_method:'zjgcdywq_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'zjgcdywq_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//抵押网签-列表界面
.controller('zjgcdywqDywqListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "zjgcdywq_dywqList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 1617040 && 41 == g_getOrgTypeno()){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'zjgcdywq_dywq_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'zjgcdywq_getDywqListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'zjgcdywq_getDywqListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
 		$rootScope.goRouteForBack("zjgcdywq_dywq_detail",{id:id},null);
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
    	MyFactoryNew.showPdfQRCode(x,paramsObj,"zjgcdywq_dywq_list");
    }
	
	//草拟提交
	$scope.caoniTJ = function(obj,svalue) {
		if(obj.checkAppPicsEnough){
			if(obj.IF_YWCOL_NOTNULL == 0){
				$rootScope.mttAlert("业务详细中权利范围、评估价值等信息不能为空！");
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
 		var requestBody = {_module:'TT',_method:'zjgcdywq_delZjgcdywq',id:id};
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

//抵押网签-详细
.controller('zjgcdywqDywqDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var mastatus = null;
	var MAX_RN1 = 0;
	var MAX_RN2 = 0;
	var MAX_RN3 = 0;
	var MAX_RN4 = 0;
	var MAX_RN5 = 0;
	var MAX_RN6 = 0;
	
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
		
		for(var i=0; i<MAX_RN1; i++){
			g_dateSelect('#SYQQSRQ'+i, null, null);
			g_dateSelect('#SYQZZRQ'+i, null, null);
			g_dateSelect('#FZRQ'+i, null, null);
		}
		for(var i=0; i<MAX_RN2; i++){
			g_dateSelect('#FZRQ2'+i, null, null);
		}
		for(var i=0; i<MAX_RN3; i++){
			g_dateSelect('#KGRQ'+i, null, null);
			g_dateSelect('#JGRQ'+i, null, null);
			g_dateSelect('#FZRQ3'+i, null, null);
		}
		for(var i=0; i<MAX_RN4; i++){
			g_dateSelect('#FZRQ4'+i, null, null);
		}
		for(var i=0; i<MAX_RN5; i++){
			g_dateSelect('#FZRQ5'+i, null, null);
		}
		for(var i=0; i<MAX_RN6; i++){
			g_dateSelect('#FZRQ6'+i, null, null);
			g_dateSelect('#YXQSRQ'+i, null, null);
			g_dateSelect('#YXZZRQ'+i, null, null);
		}
	});
	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		
		if(bastatus == 0 && mastatus == 1617040 && 41 == g_getOrgTypeno()){
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	var MAX_RN = 0;
	//业务详细maps查询
	$scope.xx = function() {
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'zjgcdywq_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				$scope.ywDetails = data;
				MAX_RN1 = data.zdsyqz.length;
				MAX_RN2 =data.gcghxkz.length;
				MAX_RN3 =data.sgxkz.length;
				MAX_RN4 =data.jsydghxkz.length;
				MAX_RN5 =data.jsydpzs.length;
				MAX_RN6 =data.xmkfjyqz.length;
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
		var requestBody = {_module:'TT',_method:'zjgcdywq_updZjgcdywq',ywObj:obj};
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
		$state.go('lpb',{id:id,backURL:'zjgcdywq_dywq_detail',if_oper_room:$scope.if_show_baocunButton});
	}
	
	//跳转-楼栋选择（添加）页面
	$scope.goLdAdd = function() {
		$state.go('zjgcdywq_dxld_list',{id:id,backURL:'zjgcdywq_dywq_detail'});
	}
	
	//楼栋删除
	$scope.ld_del = function(index){
		var ldid = $scope.ywDetails.ld[index].BUILDID;
		var requestBody = {_module:'TT',_method:'zjgcdywq_ldDel',id:$scope.ywDetails.yewu.ID,ldid:ldid};
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
	
	//增加空白抵押权人
	$scope.addDyqr = function(){
		$scope.ywDetails.dyqrList[$scope.ywDetails.dyqrList.length] = {"QLRLB" : " ",RN:MAX_RN+1};
		MAX_RN=MAX_RN+1;
	};
	
	//保存或更新抵押权人的信息
	$scope.saveDyqrInfo = function($event,ng_obj){
		var bigDivId = $($event.target).attr("bigDivId");
		if(g_checkNullByClass($rootScope,bigDivId,"notNull")){
    		return false;
    	}
		
		var id = $scope.ywDetails.yewu.ID;
		var stanid = $scope.ywDetails.yewu.STANID;
		var sel_obj = ng_obj.sel_obj
		var seqid = ng_obj.SEQID;
		var qlrlb = ng_obj.SORTID;
		var qlrxh = sel_obj.QLRXH;
		var lxdz = sel_obj.LXDZ;
	    var lxdh = sel_obj.LXDH;
	    var dwgr = sel_obj.DWGR;
	    if(dwgr=="单位"){
	    	dwgr=2;
		}else{
			dwgr=1;
		}
	    
		var requestBody = {_module:'TT',_method:'saveYgspfDywqDyqrxx',id:id,qlrlb:qlrlb,qlrxh:qlrxh,lxdz:lxdz,lxdh:lxdh,stanid:stanid,dwgr:dwgr,seqid:seqid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(!seqid){
					ng_obj.SEQID=data.content;
				} 
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}	
	
	//删除抵押权人
	$scope.deleteDyqr = function(ng_obj){
		var delObj = g_ngrepeat_get($scope.ywDetails.dyqrList,ng_obj.$$hashKey);
		if(!delObj.SEQID){
			g_ngrepeat_removeArray($scope.ywDetails.dyqrList,ng_obj.$$hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'delSw2dBySeqid',seqid:delObj.SEQID};
	 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
	 			if(data && data.type && data.type=="success"){
	 				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
	 				g_ngrepeat_removeArray($scope.ywDetails.dyqrList,ng_obj.$$hashKey);
	            }else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};
	
	//按名称查询权利人数据源
    $scope.loadQlr = function($event,ng_obj){
    	var nameInputId = $($event.target).attr("nameInputId");
    	var name = $("#"+nameInputId).val();
    	if(g_checkIsNull(name)){
    		$rootScope.mttAlert("权利人名称不能为空！");
			return false;
    	}
		var requestBody = {_module:'TT',_method:'getQlrList',name:name};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				ng_obj.zwrSelectList = data.content;
				$rootScope.mttAlert("加载成功，请选择需要的权利人信息！");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
    //债务人详细信息
	$scope.zwrxxxx = function ($event,ng_obj) {
		var sel_obj = ng_obj.sel_obj;
		var qlrxh = sel_obj.QLRXH;
		var dwgr = sel_obj.DWGR;
		$rootScope.goRouteForBack("pubZwrxx",{id:$stateParams.id,qlrxh:qlrxh,dwgr:dwgr,backURL:'dywq_detail',if_cz:$scope.if_show_baocunButton},{id:$stateParams.id});
	}
    //增加空白债务人
	$scope.addZwr = function(){
		$scope.ywDetails.zwrList[$scope.ywDetails.zwrList.length] = {"QLRLB" : " ",};
	};
	
	//保存或更新债务人信息
	$scope.saveZwrInfo = function($event,ng_obj){
		var bigDivId = $($event.target).attr("bigDivId");
		if(g_checkNullByClass($rootScope,bigDivId,"notNull")){
    		return false;
    	}
		var id = $scope.ywDetails.yewu.ID;
		var stanid = $scope.ywDetails.yewu.STANID;
		var sel_obj = ng_obj.sel_obj
		var seqid = ng_obj.SEQID;
		var qlrmc = sel_obj.QLRMC;
		var qlrlb = ng_obj.SORTID;
		var dwgr = sel_obj.DWGR;
	    if(dwgr=="单位"){
	    	dwgr=2;
		}else{
			dwgr=1;
		}
	    var qlrxz = sel_obj.QLRXZ;
	    var zjlb = sel_obj.ZJLB;
	    var zjhm = sel_obj.ZJHM;
		var lxdz = sel_obj.LXDZ;
	    var lxdh = sel_obj.LXDH;
	    var qlrxh = sel_obj.QLRXH;
		
	    var requestBody = {_module:'TT',_method:'saveDywqZwr',id:id,stanid:stanid,qlrlb:qlrlb,dwgr:dwgr,qlrmc:qlrmc,
				qlrxz:qlrxz,zjlb:zjlb,zjhm:zjhm,lxdz:lxdz,lxdh:lxdh,qlrxh:qlrxh,gyfe:"",seqid:seqid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!seqid){//首次保存
				ng_obj.SEQID = data.content.SEQID;
			}
			sel_obj.QLRXH = data.content.QLRXH;
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}	
	
	//删除债务人
	$scope.deleteZwr = function(ng_obj){
		var delObj = g_ngrepeat_get($scope.ywDetails.zwrList,ng_obj.$$hashKey);
		if(!delObj.SEQID){
			g_ngrepeat_removeArray($scope.ywDetails.zwrList,ng_obj.$$hashKey);
		}else{
			var sel_obj = delObj.sel_obj;
			var qlrxh = sel_obj.QLRXH;
			var dwgr = sel_obj.DWGR;
			if(dwgr=="单位"){
		    	dwgr=2;
			}else{
				dwgr=1;
			}
			var requestBody = {_module:'TT',_method:'delSw2dBySeqid',seqid:delObj.SEQID,id:$stateParams.id,qlrxh:qlrxh,dwgr:dwgr};
	 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
	 			if(data && data.type && data.type=="success"){
	 				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
	 				g_ngrepeat_removeArray($scope.ywDetails.zwrList,ng_obj.$$hashKey);
	            }else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};	
	
	//增加宗地使用权证
	$scope.addZd = function(){
		$scope.ywDetails.zdsyqz[$scope.ywDetails.zdsyqz.length] = {"STREET" : "",RN1:MAX_RN1+1};
		MAX_RN1 = MAX_RN1+1;
	}
	//增加工程规划许可证
	$scope.addGcgh = function(){
		$scope.ywDetails.gcghxkz[$scope.ywDetails.gcghxkz.length] = {"CERTNO" : "",RN2:MAX_RN2+1};
		MAX_RN2 = MAX_RN2+1;
	}
	//增加施工许可证
	$scope.addSgxk = function(){
		$scope.ywDetails.sgxkz[$scope.ywDetails.sgxkz.length] = {"SCHEDUAL" : "",RN3:MAX_RN3+1};
		MAX_RN3 = MAX_RN3+1;
	}
	//增加建设用地规划许可证
	$scope.addJsyd = function(){
		$scope.ywDetails.jsydghxkz[$scope.ywDetails.jsydghxkz.length] = {"PROJECTNAME" : "",RN4:MAX_RN4+1};
		MAX_RN4 = MAX_RN4+1;
	}
	//增加建设用地批准书
	$scope.addPzs = function(){
		$scope.ywDetails.jsydpzs[$scope.ywDetails.jsydpzs.length] = {"DOORNO" : "",RN5:MAX_RN5+1};
		MAX_RN5 = MAX_RN5+1;
	}
	//增加项目开发经营权证
	$scope.addKFJY = function(){
		$scope.ywDetails.xmkfjyqz[$scope.ywDetails.xmkfjyqz.length] = {"USAGE" : "",RN6:MAX_RN6+1};
		MAX_RN6 = MAX_RN6+1;
	}
	
	//删除宗地使用权证
	$scope.del_zdsyqz = function(obj,hashKey){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN1 == obj.RN1) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.zdsyqz[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.zdsyqz,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteZdsyqzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.zdsyqz,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除工程规划许可证
	$scope.del_gcghxkz = function(obj,hashKey){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.gcghxkz.length; i++) {
	        if ($scope.ywDetails.gcghxkz[i].RN2 == obj.RN2) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.gcghxkz[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.gcghxkz,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteGcghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.gcghxkz,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	
	//删除施工许可证
	$scope.del_sgxkz = function(obj,hashKey){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.sgxkz.length; i++) {
	        if ($scope.ywDetails.sgxkz[i].RN3 == obj.RN3) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.sgxkz[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.sgxkz,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteSgxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.sgxkz,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地规划许可证
	$scope.del_jsydghxkz = function(obj,hashKey){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydghxkz.length; i++) {
	        if ($scope.ywDetails.jsydghxkz[i].RN4 == obj.RN4) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydghxkz[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.jsydghxkz,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.jsydghxkz,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地批准书
	$scope.del_jsydpzs = function(obj,hashKey){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydpzs.length; i++) {
	        if ($scope.ywDetails.jsydpzs[i].RN5 == obj.RN5) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydpzs[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.jsydpzs,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydpzsInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.jsydpzs,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除项目开发经营权证信息
	$scope.del_xmkfjyqz = function(obj,hashKey){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.xmkfjyqz.length; i++) {
	        if ($scope.ywDetails.xmkfjyqz[i].RN6 == obj.RN6) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.xmkfjyqz[i].MARK;
		if(!mark){
			g_ngrepeat_removeArray($scope.ywDetails.xmkfjyqz,hashKey);
		}else{
			var requestBody = {_module:'TT',_method:'deleteXmkfjyqzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_ngrepeat_removeArray($scope.ywDetails.xmkfjyqz,hashKey);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	
	//宗地使用权证信息保存
	$scope.save_zdsyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN1 == obj.RN1) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"zdsyqz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno=$scope.ywDetails.zdsyqz[index].CERTNO;
		var district = $scope.ywDetails.zdsyqz[index].REGIONID;
		var street = $scope.ywDetails.zdsyqz[index].STREET;
		var doorno = $scope.ywDetails.zdsyqz[index].DOORNO;
        var usecerttype=$scope.ywDetails.zdsyqz[index].USECERTTYPE;
        var landuse1=$scope.ywDetails.zdsyqz[index].LANDUSE1;
		var buildarea = $scope.ywDetails.zdsyqz[index].BUILDAREA;
		var landusetype = $scope.ywDetails.zdsyqz[index].LANDUSETYPE;
		var mark = $scope.ywDetails.zdsyqz[index].MARK;
		var syqqsrq=$("#SYQQSRQ"+index).val();
		var syqzzrq=$("#SYQZZRQ"+index).val();
		var fzrq=$("#FZRQ"+index).val();
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
	        if ($scope.ywDetails.gcghxkz[i].RN2 == obj.RN2) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"gcghxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.gcghxkz[index].CERTNO;
		var buildarea = $scope.ywDetails.gcghxkz[index].BUILDAREA;
		var cubageratio=$scope.ywDetails.gcghxkz[index].CUBAGERATIO;
		var greenratio=$scope.ywDetails.gcghxkz[index].GREENRATIO;
		var housearea=$scope.ywDetails.gcghxkz[index].HOUSEAREA;
		var businessarea=$scope.ywDetails.gcghxkz[index].BUSINESSAREA;
		var officearea=$scope.ywDetails.gcghxkz[index].OFFICEAREA;
		var otherarea=$scope.ywDetails.gcghxkz[index].OTHERAREA;
		var mark = $scope.ywDetails.gcghxkz[index].MARK;
		var getcertdate=$("#FZRQ2"+index).val();
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
	        if ($scope.ywDetails.sgxkz[i].RN3 == obj.RN3) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"sgxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.sgxkz[index].CERTNO;
		var schedual=$scope.ywDetails.sgxkz[index].SCHEDUAL;
		var conscertarea=$scope.ywDetails.sgxkz[index].CONSCERTAREA;
		var mark = $scope.ywDetails.sgxkz[index].MARK;
		var startdatetime=$("#KGRQ"+index).val();
		var closedatetime=$("#JGRQ"+index).val();
		var getcertdate=$("#FZRQ3"+index).val();
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
	        if ($scope.ywDetails.jsydghxkz[i].RN4 == obj.RN4) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"jsydghxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.jsydghxkz[index].CERTNO;
		var projectname = $scope.ywDetails.jsydghxkz[index].PROJECTNAME;
		var district=$scope.ywDetails.jsydghxkz[index].REGIONID;
		var street=$scope.ywDetails.jsydghxkz[index].STREET;
		var doorno=$scope.ywDetails.jsydghxkz[index].DOORNO;
		var buildarea=$scope.ywDetails.jsydghxkz[index].BUILDAREA;
		var landarea=$scope.ywDetails.jsydghxkz[index].LANDAREA;
		var mark = $scope.ywDetails.jsydghxkz[index].MARK;
		var getcertdate=$("#FZRQ4"+index).val();
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
	        if ($scope.ywDetails.jsydpzs[i].RN5 == obj.RN5) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"jsydpzs_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno= $scope.ywDetails.jsydpzs[index].CERTNO;
		var district=$scope.ywDetails.jsydpzs[index].REGIONID;
		var street=$scope.ywDetails.jsydpzs[index].STREET;
		var doorno=$scope.ywDetails.jsydpzs[index].DOORNO;
		var buildarea=$scope.ywDetails.jsydpzs[index].BUILDAREA;
		var mark = $scope.ywDetails.jsydpzs[index].MARK;
		var getcertdate=$("#FZRQ5"+index).val();
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
	
	//项目开发经营权证保存
	$scope.save_xmkfjyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.xmkfjyqz.length; i++) {
	        if ($scope.ywDetails.xmkfjyqz[i].RN6 == obj.RN6) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"xmkfjyqz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.ID;
		var certno=$scope.ywDetails.xmkfjyqz[index].CERTNO;
		var projectname = $scope.ywDetails.xmkfjyqz[index].PROJECTNAME;
		var district = $scope.ywDetails.xmkfjyqz[index].REGIONID;
		var street = $scope.ywDetails.xmkfjyqz[index].STREET;
		var doorno = $scope.ywDetails.xmkfjyqz[index].DOORNO;
        var investment=$scope.ywDetails.xmkfjyqz[index].INVESTMENT;  
		var buildarea = $scope.ywDetails.xmkfjyqz[index].BUILDAREA;
		var floorarea=$scope.ywDetails.xmkfjyqz[index].FLOORAREA;
		var usage=$scope.ywDetails.xmkfjyqz[index].USAGE;
		var mark = $scope.ywDetails.xmkfjyqz[index].MARK;
		var yxqsrq=$("#YXQSRQ"+index).val();
		var yxzzrq=$("#YXZZRQ"+index).val();
		var fzrq6=$("#FZRQ6"+index).val();
		var requestBody = {_module:'TT',_method:'saveXmkfjyqzInfo',id:id,district:district,street:street,doorno:doorno,certno:certno,projectname:projectname,
				investment:investment,buildarea:buildarea,floorarea:floorarea,usage:usage,mark:mark,startdatetime:yxqsrq,closedatetime:yxzzrq,getcertdate:fzrq6,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.xmkfjyqz[index].MARK = data.content;
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