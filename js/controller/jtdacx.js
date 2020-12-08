angular.module('controller_jtdacx', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 家庭信息查询模块
 */

//家庭信息查询首页
.controller('jtdacxIndexController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){

	/*$scope.jtcyshcx = function(){
		$rootScope.jtcycx_lx = 166501;
		$state.go('jtdacx_list');
	}
	$scope.jtcyxscx = function(){
		$rootScope.jtcycx_lx = 166502;
		$state.go('jtdacx_list');
	}*/
	$scope.jtcyxxcx = function(){
		$rootScope.jtcycx_lx = 166504;
		$state.go('jtdacx_list');
	}
	$scope.jtcyxzcx = function(){
		$rootScope.jtcycx_lx = 166503;
		$state.go('jtdacx_list');
	}
	
})

//家庭档案查询
.controller('jtdacxListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	var listName = "jtdacx_jtdacxList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus ==1665010){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'jtdacx_list'});
	};
	//查询业务新建
    $scope.cx_ywxj=function(){
    	var requestBody = {_module:'TT',_method:'jtdacx_ywxj',realtypeid:$rootScope.jtcycx_lx,phoneno:g_getLoginPhoneno(),roleno:g_getRoleno()};
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
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'jtdacx_getListByPage',realtypeid:$rootScope.jtcycx_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'jtdacx_getListByPage',realtypeid:$rootScope.jtcycx_lx};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
 	//详细
	$scope.xx = function(id) {
		$rootScope.goRouteForBack("jtdacx_detail",{id:id},null);
 	}	
	var ywxl=$rootScope.jtcycx_lx;
	/*var pdfid=null;
	if(ywxl==166501 || ywxl==166503){
		pdfid=500;
	}else{
		pdfid=530;
	}*/
	//下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(712,paramsObj);
    }
    //预览申请表
	$scope.showPDFImg= function(ywbh) {
		var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(712,paramsObj);
	}
	//二维码                    
    $scope.creQRCode = function(ywbh,barcodeid){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	paramsObj.barcodeid = barcodeid;
    	MyFactoryNew.showJTCYPdfQRCode(712,paramsObj,"jtdacx_list");
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
		var requestBody = g_getRBObj_tjht(id,flowid,businessID,stanID,realTypeID,svalue);
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
	//办结业务
	$scope.bj = function(id) {
		var requestBody = {_module:'TT',_method:'jtdacx_commitYW',id:id};
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
 		var requestBody = {_module:'TT',_method:'jtdacx_delDacx',id:id};
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
.controller('jtdacxDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var realtypeid = null;
	var jtcycx_lx=$rootScope.jtcycx_lx;
	//电话
	var REphone=/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
	
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
		$(".ifEdit2").attr("disabled","disabled");

		if(bastatus == 0 && mastatus == 1665010){
			if(jtcycx_lx==166502){
				$scope.if_show_baocunButton4 = true;
			}
			$scope.if_show_baocunButton = true;
			if($rootScope._app_roleno == PUBLIC_JS_BZX_DACXYWY){
				$(".ifEdit2").removeAttr("disabled");
				$scope.if_show_baocunButton2 = true;
				$scope.if_show_piPeiButton = true;
			}
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}

	//业务详细maps查询
	$scope.xx = function() {
		var id=$stateParams.id;
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'jtdacx_findDetailMap',id:$stateParams.id,ywxl:jtcycx_lx};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data.zhuanrangfang.length == 0){
					data.zhuanrangfang[0] = {"CXRMC" :  ""};
				}
				if(data.shourangfang.length == 0){
					data.shourangfang[0] = {"QLRMC" :  ""};
				}
				$scope.ywDetails = data;
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				stanid =   data.yewu.STANID;
				realtypeid = data.yewu.REALTYPEID;
				$scope.isShow=false;
				isDisabled();
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })		
	}	
	
	//默认调用详细方法
	$scope.xx();
	
	//增加家庭成员信息
	$scope.addSyqr = function(){
		
		$scope.ywDetails.shourangfang[$scope.ywDetails.shourangfang.length] = {"SEX" : $scope.ywDetails.shourangfang[0].SEX};
	};
	
	//删除家庭成员信息
	$scope.del_jtcy = function(_id,hashKey){
		var jtcyObj = g_ngrepeat_get($scope.ywDetails.shourangfang,hashKey);
		if(jtcyObj.FID){
			var requestBody = {_module:'TT',_method:'jtcyxx_del',id:_id+"",jtcyObj:jtcyObj,ywxl:jtcycx_lx};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					g_ngrepeat_removeArray($scope.ywDetails.shourangfang,hashKey);
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
			g_ngrepeat_removeArray($scope.ywDetails.shourangfang,hashKey);
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);	
		}
	};
	
	$scope.piPei = function(index){

		var phoneno=$scope.ywDetails.zhuanrangfang[index].LXDH;
		//电话号码的合法性
		if(!REphone.test(phoneno)){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'pipei_CXRXX',phoneno:phoneno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails.zhuanrangfang[index].ZJLB=data.content.ZJLB;
				$scope.ywDetails.zhuanrangfang[index].ZJHM=data.content.ZJHM;
				$scope.ywDetails.zhuanrangfang[index].CXRMC=data.content.QLRMC;
				$scope.ywDetails.zhuanrangfang[index].LXDZ=data.content.LXDZ;
				$scope.ywDetails.zhuanrangfang[index].CXRXH=data.content.QLRXH;
				$rootScope.mttAlert("匹配成功！");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	//保存或更新查询人
	$scope.save_peopleAddPhone_zrf = function(index){

		var id=$scope.ywDetails.yewu.ID;
		var zjlb=$scope.ywDetails.zhuanrangfang[index].ZJLB;
		var zjhm=$scope.ywDetails.zhuanrangfang[index].ZJHM;
        var lxdz=$scope.ywDetails.zhuanrangfang[index].LXDZ;
        var lxdh=$scope.ywDetails.zhuanrangfang[index].LXDH;
        var cxrmc=$scope.ywDetails.zhuanrangfang[index].CXRMC;
        var cxrxh=$scope.ywDetails.zhuanrangfang[index].CXRXH;
		
		if(!zjlb){
			$rootScope.mttAlert("请选择证件类别！");
			return false;
		}
		var re = /^[0-9]+.?[0-9]*/;
		if(!re.test(zjhm)){
			$rootScope.mttAlert("请填写有效的证件号码！");
			return false;
		}
		if(!zjhm){
			$rootScope.mttAlert("请输入证件号码！");
			return false;
		}
		if(!cxrmc){
			$rootScope.mttAlert("请输入查询人名称！");
			return false;
		}
		if(!lxdh){
			$rootScope.mttAlert("请输入联系电话！");
			return false;
		}
		if(!REphone.test(lxdh)){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
			return false;
		}
		if(!lxdz){
			$rootScope.mttAlert("请输入联系地址！");
			return false;
		}
		
		var requestBody = {_module:'TT',_method:'jtdacx_saveCxrxx',id:id,zjlb:zjlb,zjhm:zjhm,
				cxrmc:cxrmc,lxdz:lxdz,lxdh:lxdh,cxrxh:cxrxh};
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
	
	//保存家庭成员信息
	$scope.save_jtcy = function(_id,hashKey,_index){
		if(g_checkNullByClass($rootScope,"jiating_"+_index,"notNull")){
    		return false;
    	}
		var jtcyObj = g_ngrepeat_get($scope.ywDetails.shourangfang,hashKey);
		if(!jtcyObj.ZJLB){
			$rootScope.mttAlert("请选择证件类别！");
			return false;
		}
		if(!jtcyObj.YCXRGX){
			$rootScope.mttAlert("请选择与查询人关系！");
			return false;
		}
		var re = /^[0-9]+.?[0-9]*/;
		if(!re.test(jtcyObj.ZJHM)){
			$rootScope.mttAlert("请填写有效的证件号码！");
			return false;
		}
		if(jtcycx_lx==166502){
			if(!jtcyObj.JYYWBH){
				$rootScope.mttAlert("请填写交易业务编号！");
				return false;
			}else if(!re.test(jtcyObj.JYYWBH)){
				$rootScope.mttAlert("请填写有效的业务编号！");
				return false;
			}
		}
		if(jtcycx_lx==166503){
			var age=GetAge(jtcyObj.ZJHM);
			if(age>=18){
				$rootScope.mttAlert("请输入家庭未满18岁成员身份信息！");
				return false;
			}
		}
		if(jtcycx_lx==166504){
			var age=GetAge(jtcyObj.ZJHM);
			if(age>=18){
				$rootScope.mttAlert("身份证号码请填写家庭未成年人身份证信息！");
				return false;
			}
		}
		var requestBody = {_module:'TT',_method:'jtdacx_insertJTCY',id:_id+"",jtcyObj:jtcyObj,ywxl:jtcycx_lx};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(!jtcyObj.FID){
					jtcyObj.FID = data.content.FID;
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
	
	//业务保存 
	$scope.save_yw = function(){
		var id=$scope.ywDetails.yewu.ID;
		var description=$scope.ywDetails.yewu.BZ;
		var requestBody = {_module:'TT',_method:'saveYwInfo',id:id,description:description};
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
	
})