angular.module('controller_lpgl', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 楼盘管理模块	
 */
//楼盘新建业务历史列表
.controller('fangWuMianJiController',function($rootScope,$scope,$http,$state,$stateParams,MyFactoryNew){
	$scope.qlpgl = function(){
		if(g_checkLogin()){
			$rootScope.wqllpxj_lx = 1610061;
			$rootScope.wqllpxj_bt = "期";
			$state.go('lpgl');
		}else{
			$state.go("login");
		}
	}
	$scope.xlpgl = function(){
		if(g_checkLogin()){
			$rootScope.wqllpxj_lx = 1610071;
			$rootScope.wqllpxj_bt = "现";
			$state.go('lpgl');
		}else{
			$state.go("login");
		}
	}
})

//楼盘新建业务历史列表
.controller('lplsListController',function($rootScope,$scope,$http,$state,$stateParams,MyFactoryNew){
	
	var listName = "lpxj_lpywList";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'get_lpywls',REALTYPEID:$rootScope.wqllpxj_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'get_lpywls',REALTYPEID:$rootScope.wqllpxj_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
    //详细
	$scope.xx = function(ywbh) {
 		$state.go("lpxj_detail",{id:ywbh});	
 	}
	//下载申请表
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(352,paramsObj);
    }
    //预览申请表
	$scope.showPDFImg= function(ywbh) {
		var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(352,paramsObj);
	}
	//申请表二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(352,paramsObj,"lpls_list");
    }
})

//楼盘新建详细信息
.controller('lpxjDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew,MyFactory){
	var ywbh = $stateParams.id;
	var mastatus = null;
	
	var lpxjInit = function(){
		var requestBody = {_module:'TT',_method:'lpxj_Init',ID:ywbh,REALTYPEID:$rootScope.wqllpxj_lx};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails = data.content;
				if("{}" == JSON.stringify(ywbh)){
					$("textarea.ifEdit").css("background","white");
					$scope.if_show_button = true;
				}else{
					mastatus = data.content.yw.MASTATUS;
					$scope.ID = data.content.yw.ID;
					$scope.REALTYPENAME = data.content.yw.REALTYPENAME;
					$scope.PROJECTNAME = data.content.yw.PROJECTNAME;
					$scope.BUSINESSNAME = data.content.yw.BUSINESSNAME;
					$scope.DESCRIPTION = data.content.yw.DESCRIPTION;
					isDisabled();
				}
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	lpxjInit();
	
	//图片编辑查看页面
	$scope.goEdit = function(id){
		if((mastatus == 1610061||mastatus == 1610071) && $rootScope._app_roleno == PUBLIC_JS_SQWTR){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'lpxj_detail'});
	};
	
	//判断是否为只读模式
	function isDisabled(){
		$scope.sfky = true;
		$scope.if_show_button = false;
		$("textarea.ifEdit").css("background","#f5f5f6");
		if(($rootScope._app_roleno == PUBLIC_JS_SQWTR) && (mastatus == 1610061 || mastatus == 1610071)){
			$scope.sfky = false;
			$scope.if_show_button = true;
			$("textarea.ifEdit").css("background","white");
		}
	}
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		if($scope.if_show_button){
			for(var i=0; i<$scope.ywDetails.ldList.length; i++){
				g_dateSelect('#jgrq_'+i, null, null);
				g_dateSelect('#jfsyrq_'+i, null, null);
			}
		}
	});
	
	$scope.zjld = function(){
		$scope.ywDetails.ldList[$scope.ywDetails.ldList.length] = {"REGIONID":""};
		$rootScope.mttAlert("已增加，请至页面下方查看并填写相关信息！");
	}
	
	$scope.saveld = function(hashKey,_index){
		var ID = $scope.ID;
		var PROJECTNAME = $scope.PROJECTNAME;
		var DESCRIPTION = $scope.DESCRIPTION;
		
		if(g_checkIsNull(PROJECTNAME)){
			$rootScope.mttAlert("项目名称不能为空！");
			return false;
		}else if(g_checkNullByClass($rootScope,"ldxx_"+_index,"notNull")){
    		return false;
    	}
		var ldObj = g_ngrepeat_get($scope.ywDetails.ldList,hashKey);
		ldObj.BUILDYEAR = $("#jgrq_"+_index).val();
		ldObj.DELIVERYDATETIME = $("#jfsyrq_"+_index).val();
		
		if(ldObj.BUILDAREA <= 0 || ldObj.UPAREA < 0 || ldObj.UNDERAREA < 0){
			$rootScope.mttAlert("建筑面积、地上面积或者地下面积填写不合适！");
			return false;
		}else if(ldObj.BUILDAREA != (ldObj.UPAREA + ldObj.UNDERAREA)){
			$rootScope.mttAlert("建筑面积必须等于地上面积与地下面积之和！");
			return false;
		}else if(ldObj.FLOORS <= 0 || ldObj.MAXFLOOR < 0 || ldObj.MINFLOOR < 0){
			$rootScope.mttAlert("总层数、地上楼层或者地下楼层填写不合适！");
			return false;
		}else if(ldObj.FLOORS != (ldObj.MAXFLOOR + ldObj.MINFLOOR)){
			$rootScope.mttAlert("总层数必须等于地上楼层与地下楼层之和！");
			return false;
		}
		
		var requestBody = {_module:'TT',_method:'lpxj_save',ldObj:ldObj,ID:ID,REALTYPEID:$rootScope.wqllpxj_lx,PROJECTNAME:PROJECTNAME,DESCRIPTION:DESCRIPTION};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails = data.content;
				mastatus = data.content.yw.MASTATUS;
				$scope.ID = data.content.yw.ID;
				ywbh =  data.content.yw.ID;
				$scope.REALTYPENAME = data.content.yw.REALTYPENAME;
				$scope.PROJECTNAME = data.content.yw.PROJECTNAME;
				$scope.BUSINESSNAME = data.content.yw.BUSINESSNAME;
				$scope.DESCRIPTION = data.content.yw.DESCRIPTION;
				isDisabled();
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	//房屋
	$scope.jianFang = function (ywbh,ldxh){
		var if_show_fwxj = false;
		if(($rootScope._app_roleno == PUBLIC_JS_SQWTR) && (mastatus == 1610061 || mastatus == 1610071)){
			if_show_fwxj = true;
		}
		$rootScope.faWuLieBaoDetail = if_show_fwxj;
		$state.go('fw_list',{ywbh:ywbh,ldxh:ldxh});
	}
	$scope.lpb = function (){
		var if_oper_room = false;
		var qfxf = 1;
		if(($rootScope._app_roleno == PUBLIC_JS_SQWTR) && (mastatus == 1610061 || mastatus == 1610071)){
			if_oper_room = true;
		}
		if($rootScope.wqllpxj_lx == 1610071){
			qfxf = 3;
		}
		$state.go('lpb',{id:ywbh,backURL:'lpxj_detail',if_oper_room:if_oper_room,init_show_qfxf:qfxf});
	}
	//删除楼栋
	$scope.delete_ld = function(_ywbh,hashKey){
		var ldObj = g_ngrepeat_get($scope.ywDetails.ldList,hashKey);
		if(ldObj.BUILDID){
			var requestBody = {_module:'TT',_method:'lpxj_deleteLD',ID:_ywbh+"",ldObj:ldObj};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					g_ngrepeat_removeArray($scope.ywDetails.ldList,hashKey);
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}else{
			g_ngrepeat_removeArray($scope.ywDetails.ldList,hashKey);
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}
	}
	$scope.delete_ld_null = function(hashKey){
		g_ngrepeat_removeArray($scope.ywDetails.ldList,hashKey);
		$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
	}
	
	//提交或回退
	$scope.tj= function(ID,FLOWID,MASTATUS,STANID,REALTYPEID,svalue) {
		var requestBody = g_getRBObj_tjht(ID,FLOWID,mastatus,STANID,REALTYPEID,svalue);
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					lpxjInit();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	//删除业务
 	$scope.shanchu = function(id) {
 		var requestBody = {_module:'TT',_method:'lpxj_delyw',id:id};
 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
 			if(data && data.type && data.type=="success"){
 				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
 					$state.go('lpgl');
 				});
 			}else if(data && data.type && data.type=="error"){
 				$rootScope.mttAlert(data.content);
 			}else{
 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
 			}
        })
 	}
 	//办结
 	$scope.banjie = function(id,stanid){
 		var requestBody = {_module:'TT',_method:'lpxj_banjie',id:id,stanid:stanid};
 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
 			if(data && data.type && data.type=="success"){
 				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
 					lpxjInit();
 				});
 			}else if(data && data.type && data.type=="error"){
 				$rootScope.mttAlert(data.content);
 			}else{
 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
 			}
        })
 	}
 	
})

//房屋查询列表
.controller('fwListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	var ywbh = $stateParams.ywbh;
	var ldxh = $stateParams.ldxh;
	$scope.ywbh=$stateParams.ywbh;
	$scope.ldxh=$stateParams.ldxh;
	var listName = "fwList";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
        var requestBody = {_module:'TT',_method:'fw_getFWListByPage',id:$stateParams.ywbh,buildid:$stateParams.ldxh,REALTYPEID:$rootScope.wqllpxj_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	//加载更多
 	$scope.loadMore= function() {
	    var requestBody = {_module:'TT',_method:'fw_getFWListByPage',id:$stateParams.ywbh,buildid:$stateParams.ldxh,REALTYPEID:$rootScope.wqllpxj_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
    $scope.doRefresh();
    
    //详细
 	$scope.xx = function(bldroomid) {
 		$state.go("fw_detail",{ywbh:$stateParams.ywbh,ldxh:$stateParams.ldxh,bldroomid:bldroomid});
 	} 
 	//增加房屋
 	$scope.addFW = function(ywbh,ldxh) {
 		$state.go("fw_detail",{ywbh:ywbh,ldxh:ldxh});
 	}
 	
 	//删除房屋信息
 	$scope.del = function(bldroomid) {
        var requestBody = {_module:'TT',_method:'lpgl_delFwxx',ywbh:ywbh,bldroomid:bldroomid};
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

//房屋详细信息
.controller('fwDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	var ywbh = $stateParams.ywbh;
	var ldxh = $stateParams.ldxh;
	var bldroomid = $stateParams.bldroomid;
	if(angular.isNumber(bldroomid)){
		$scope.if_show_button =true;
		//业务详细maps查询
		$scope.xx = function(bldroomid) {
			$scope.fwDetails = null;
			$scope.backURL = $stateParams.backURL;
			var requestBody = {_module:'TT',_method:'fw_getFWDetail',bldroomid:$stateParams.bldroomid};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data){
					if(!data.fwxx){
						$rootScope.mttAlert('获取房屋详细信息失败！');
						return false;
					}
					if(data.fwxx.length == 0){
						data.fwxx[0] = {"PART" :  " "};
	 				}
					$scope.fwDetails = data;

				}else{
					$rootScope.mttAlert('获取房屋详细信息失败！');
				}
	        })		
		}	
		//默认调用详细方法
		$scope.xx();
		
	    $scope.plscfw = function() {
	    	var fw_ljf=$("#fw_ljf").val();
			var jz_mj=$("#JZ_MJ").val();
			if(g_checkIsNull(jz_mj)){
				$rootScope.mttAlert("建筑面积不能为空！");
				return false;
			}
			var xccs=$("#XCCS").val();
			var zrqsc1=$("#ZRQSC1").val();
			if(g_checkIsNull(zrqsc1)){
				$rootScope.mttAlert("自然起始层不能为空！");
				return false;
			}
			var zrqsc2=$("#ZRQSC2").val();
			if(g_checkIsNull(zrqsc2)){
				$rootScope.mttAlert("自然终止层不能为空！");
				return false;
			}
			if(zrqsc1 == 0 || zrqsc2 ==0){
				$rootScope.mttAlert("自然起始层、自然终止层不能为0！");
				return false;
			}
			if(zrqsc1.indexOf("-")==0 && zrqsc2.indexOf("-")==0 && Math.abs(zrqsc1)<Math.abs(zrqsc2)){
				$rootScope.mttAlert("自然起始层不能大于自然终止层！");
				return false;
			}else if(!(zrqsc1.indexOf("-")==0 && zrqsc2.indexOf("-")==0) && zrqsc1>zrqsc2){
				$rootScope.mttAlert("自然起始层不能大于自然终止层！");
				return false;
			}
			var cfxh1=$("#CFXH1").val();
			if(g_checkIsNull(cfxh1)){
				$rootScope.mttAlert("起始层房序号不能为空！");
				return false;
			}
			var cfxh2=$("#CFXH2").val();
			if(g_checkIsNull(cfxh2)){
				$rootScope.mttAlert("终止层房序号不能为空！");
				return false;
			}
			if(cfxh1>cfxh2){
				$rootScope.mttAlert("起始层房序号不能大于终止层房序号！");
				return false;
			}
			
			var requestBody = {_module:'TT',_method:'lpgl_plscfw',bldroomid:$stateParams.bldroomid,ywbh:ywbh,ldxh:ldxh,REALTYPEID:$rootScope.wqllpxj_lx,
					        jz_mj:jz_mj,xccs:xccs,zrqsc1:zrqsc1,zrqsc2:zrqsc2,cfxh1:cfxh1,cfxh2:cfxh2,fw_ljf:fw_ljf};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert("操作成功，返回房屋列表",function() {
						$state.go('fw_list', {ywbh:ywbh, ldxh:ldxh});
					});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		 }
		
		//存在序号保存修改的房屋信息
		$scope.saveFWInfo = function(){
			
			if(g_checkNullByClass($rootScope,"fw_xx","notNull")){
	    		return false;
		    }
			var fwObj = $scope.fwDetails.fwxx;
			var zmj=fwObj.USEAREA+fwObj.PUBLICAREA;
			if(fwObj.BUILDAREA<=0){
				$rootScope.mttAlert("建筑面积必须存在！");
				return false;
			}
			if(zmj !=fwObj.BUILDAREA){
				$rootScope.mttAlert("建筑面积必须等于套内建筑面积和公摊面积之和！");
				return false;
			}
			
			var requestBody = {_module:'TT',_method:'lpxj_saveFwxxWithFWXH',fwObj:fwObj,REALTYPEID:$rootScope.wqllpxj_lx};
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
	}else{
		
		$scope.plscfw = function() {
			var fw_ljf=$("#fw_ljf").val();
			var bldroomid=$("#fwxh").val();
			var jz_mj=$("#JZ_MJ").val();
			if(g_checkIsNull(jz_mj)){
				$rootScope.mttAlert("建筑面积不能为空！");
				return false;
			}
			var xccs=$("#XCCS").val();
			var zrqsc1=$("#ZRQSC1").val();
			if(g_checkIsNull(zrqsc1)){
				$rootScope.mttAlert("自然起始层不能为空！");
				return false;
			}
			var zrqsc2=$("#ZRQSC2").val();
			if(g_checkIsNull(zrqsc2)){
				$rootScope.mttAlert("自然终止层不能为空！");
				return false;
			}
			if(zrqsc1 == 0 || zrqsc2 ==0){
				$rootScope.mttAlert("自然起始层、自然终止层不能为0！");
				return false;
			}
			if(zrqsc1.indexOf("-")==0 && zrqsc2.indexOf("-")==0 && Math.abs(zrqsc1)<Math.abs(zrqsc2)){
				$rootScope.mttAlert("自然起始层不能大于自然终止层！");
				return false;
			}else if(!(zrqsc1.indexOf("-")==0 && zrqsc2.indexOf("-")==0) && zrqsc1>zrqsc2){
				$rootScope.mttAlert("自然起始层不能大于自然终止层！");
				return false;
			}
			var cfxh1=$("#CFXH1").val();
			if(g_checkIsNull(cfxh1)){
				$rootScope.mttAlert("起始层房序号不能为空！");
				return false;
			}
			var cfxh2=$("#CFXH2").val();
			if(g_checkIsNull(cfxh2)){
				$rootScope.mttAlert("终止层房序号不能为空！");
				return false;
			}
			if(cfxh1>cfxh2){
				$rootScope.mttAlert("起始层房序号不能大于终止层房序号！");
				return false;
			}
			
			var requestBody = {_module:'TT',_method:'lpgl_plscfw',bldroomid:bldroomid,ywbh:ywbh,ldxh:ldxh,REALTYPEID:$rootScope.wqllpxj_lx,
					        jz_mj:jz_mj,xccs:xccs,zrqsc1:zrqsc1,zrqsc2:zrqsc2,cfxh1:cfxh1,cfxh2:cfxh2,fw_ljf:fw_ljf};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert("操作成功，返回房屋列表",function() {
						$state.go('fw_list', {ywbh:ywbh, ldxh:ldxh});
					});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })	
		}
		//无序号保存修改的房屋信息
		$scope.saveFWInfo = function(){
			if(g_checkNullByClass($rootScope,"fw_xx","notNull")){
	    		return false;
		    }
			var fwxh=$("#fwxh").val();
			var flooron=$("#zrqsc").val();
			var flooronend=$("#zrzzc").val();
			var buildunit=$("#dy").val();
			var part=$("#sh").val();
			var roomno=$("#cfxh").val();
			var type=$("#hx").val();
			var floorname=$("#xsc").val();
			var designusage=$("#ghyt").val();
			var structure=$("#jzjg").val();
			var buildarea=$("#jzmj").val();
			var usearea=$("#tnjzmj").val();
			var publicarea=$("#gtmj").val();
			var repairlevel=$("#fwzxsp").val();
			var brtype=$("#fwlb").val();
			var createpbrctype=$("#dbfzqk").val();
			var haselevator=$("#sfydt").val();
			if(buildarea<=0){
				$rootScope.mttAlert("建筑面积必须存在！");
				return false;
			}
			if(haselevator=='否'){
				haselevator=0;
			}else if(haselevator=='是'){
				haselevator=-1;
			}else{
				$rootScope.mttAlert("请选择是否有电梯！");
				return false;
			}
			var zmj=parseInt(usearea)+parseInt(publicarea);
			if(zmj !=buildarea){
				$rootScope.mttAlert("建筑面积必须等于套内建筑面积和公摊面积之和！");
				return false;
			}
			
			var requestBody = {_module:'TT',_method:'lpxj_saveFwxxNOFWXH',ywbh:$stateParams.ywbh,ldxh:$stateParams.ldxh,REALTYPEID:$rootScope.wqllpxj_lx,fwxh:fwxh,flooron:flooron,flooronend:flooronend,buildunit:buildunit,part:part,
					roomno:roomno,type:type,floorname:floorname,designusage:designusage,structure:structure,buildarea:buildarea,usearea:usearea,publicarea:publicarea,repairlevel:repairlevel,brtype:brtype,haselevator:haselevator,createpbrctype:createpbrctype};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$("#fwxh").attr("value",data.content.BLDROOMID);
					$("#dbfzqk").attr("value",data.content.CREATEPBRCTYPE);
					$scope.if_show_button = true;
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR); 
				}
	        })	
		 }
	}
	
	$ionicPopover.fromTemplateUrl("pop.html", {
        scope: $scope,
        animation: "slide-in-up",
        backdropClickToClose: true
    }).then(function(popover) {
        $scope.popover = popover;
    });
    
    $scope.showPop = function($event){
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