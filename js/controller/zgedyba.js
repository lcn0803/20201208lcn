﻿﻿angular.module('controller_zgedyba', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

//待办案例-列表页面
.controller('zgedybaDbalListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,MyFactoryNew){

	var xdywValue = $rootScope._app_zgedyba_xdyw;
	//待办案例list页面
	$scope.getDbal = function() {
		//交互获得案例数据源list
        var requestBody = {_module:'TT',_method:'zgedyba_getDbalListByPage',value:xdywValue,pageNum:1};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/queryPageJsonWithRB', 'POST', null, requestBody).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactoryNew.listHtmlInitAndGoto(data, 'zgedyba_dbalList', 'zgedyba_dbal_list');
			}else if(data && data._page && data._page.count == 1){
				var id = data._page.results[0].YWBH;
				$rootScope.zgedyba_dbalList = data._page.results;
				$rootScope.dbal = data._page.results[0];
				$state.go('zgedyba_dbal_detail');
			}else if (data && data._page && data._page.count == 0){
				MyFactoryNew.listHtmlInitAndGoto(data, 'zgedyba_dbalList', 'zgedyba_dbal_list');
				
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
			$state.go('zgedyba_dbal_detail');
		}else{
			$rootScope.mttAlert('获取待办案例详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zgedyba_getDbalListByPage',value:xdywValue};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zgedyba_dbalList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zgedyba_getDbalListByPage',value:xdywValue};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zgedyba_dbalList",false);
	}
	
})	

//待办案例-详细信息
.controller('zgedybaDbalDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	$scope.banli = function() {
		var id = $scope.dbal.YWBH;
		var requestBody = {_module:'TT',_method:'zgedyba_submitDbal',id:id+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('zgedyba_jyba_list');
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

//交易备案-列表页面
.controller('zgedybaJybaListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	var xdywValue = $rootScope._app_zgedyba_xdyw;
    var listName = "zgedyba_jybaList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 1640040){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'zgedyba_jyba_list'});
	};

	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
        var requestBody = {_module:'TT',_method:'zgedyba_getJybaListByPage',value:xdywValue};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
	}
	
	//加载更多
	$scope.loadMore= function() {
		var requestBody = {_module:'TT',_method:'zgedyba_getJybaListByPage',value:xdywValue};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
	}
    
    $scope.doRefresh();

	//详细
	$scope.xx = function(id) {
		$rootScope.goRouteForBack("zgedyba_jyba_detail",{id:id},null);
	}    
    
    //下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	//TODO
    	MyFactoryNew.downPDF(38,paramsObj);
    }
    
    //交易确认书预览
    $scope.showPDFImg= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	//TODO
    	MyFactoryNew.showPDFImg(38,paramsObj);		
    }
	
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	//TODO
    	MyFactoryNew.showPdfQRCode(38,paramsObj,"zgedyba_jyba_list");
    }
	
    //网签已备案合同-下载PDF
    $scope.downPDF_wq= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(171,paramsObj);
    }
	
	//网签已备案合同-二维码                    
    $scope.creQRCode_wq = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(171,paramsObj,"zgedyba_jyba_list");
    }     
    
	//草拟提交
	$scope.caoniTJ = function(checkAppPicsEnough,id,flowid,businessID,stanID,realTypeID,svalue,if_yw6col_null) {
		if(checkAppPicsEnough){
			if(if_yw6col_null == 0 && xdywValue == 1){
				$rootScope.mttAlert("业务详细中贷款类别、被担保主债权数额等信息不能为空！");
			}else{
				$scope.tj(id,flowid,businessID,stanID,realTypeID,svalue);
			}
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
	
	//删除
	$scope.del = function(id) {
    	var requestBody = {_module:'TT',_method:'zgedyba_delJyba',id:id};
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

//业务详细查看或保存---多个页签页面
.controller('zgedybaJybaDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){

	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var realtypeid = null;
	var parentBaseactivityid = null;
	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		$(".ifEdit2").attr("disabled","disabled");
		
		console.log("parentBaseactivityid="+parentBaseactivityid);

		if(bastatus == 0 && mastatus == 1640040 && parentBaseactivityid && g_getRoleno() != PUBLIC_JS_GLY ){//当父类业务大类为【存量房网签】时，六个字段可编写录入，备注可修改
			$scope.if_show_baocunButton = true;
			$scope.yw_clfwq = true;
			$(".ifEdit").removeAttr("disabled");
			$(".ifEdit2").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
			g_dateSelect('#ZWLXQSRQ', null, null);
			g_dateSelect('#ZWLXZZRQ', null, null);
			console.log("11=clfwq_parentBaseactivityid:"+parentBaseactivityid);
		}else if(bastatus == 0 && mastatus == 1640040 && !parentBaseactivityid && g_getRoleno() != PUBLIC_JS_GLY ){//当父类业务大类为【最高额抵押网签】时，只有备注可修改
			$scope.if_show_baocunButton = true;
			$scope.yw_zgedywq = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
			console.log("22=zgedywq_parentBaseactivityid:"+parentBaseactivityid);
		}
	}
	
	var MAX_RN=0;
	//业务详细maps查询
	$scope.xx = function() {
		var xdywValue = $rootScope._app_zgedyba_xdyw;
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'findAllDetailMap',id:$stateParams.id,value:xdywValue};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data ){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data.zhuanrangfang.length == 0){
					data.zhuanrangfang[0] = {"QLRLB" :  " "};
				}
				if(data.shourangfang.length == 0){
					data.shourangfang[0] = {"QLRLB" : " "};
				}
				if(data.fangwu.length == 0){
					data.fangwu[0] = {"FWZL" : " "};
				}						
				$scope.ywDetails = data;
				MAX_RN = data.zhuanrangfang.length;
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				stanid =   data.yewu.STANID;
				realtypeid = data.yewu.REALTYPEID;
				parentBaseactivityid = data.yewu.PARENTBASEACTIVITYID;
				$("#dklb").attr("value",data.yewu.DKLB);
				$scope.isShow=false;
				isDisabled();
				
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })		
	}	
	
	//默认调用详细方法
	$scope.xx();
	
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
		isDisabled();
	})
		
	//增加抵押权人
	$scope.addDyqr = function(){
		
		$scope.ywDetails.zhuanrangfang[$scope.ywDetails.zhuanrangfang.length] = {"QLRLB" : " ",RN:MAX_RN+1};
		MAX_RN=MAX_RN+1;
	};
	
	//删除抵押权人
	$scope.deleteDyqr = function(ywbh,obj){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.zhuanrangfang.length; i++) {
	        if ($scope.ywDetails.zhuanrangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var seqid=$scope.ywDetails.zhuanrangfang[index].SEQID;
		
		if(!seqid){
			g_clfwq_removeArray($scope.ywDetails.zhuanrangfang,obj);
		}else{
			var requestBody = {_module:'TT',_method:'delDyqrInfo',id:ywbh,seqid:seqid};
	 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
	 			if(data && data.type && data.type=="success"){
	 				$rootScope.mttAlert("删除成功！");
	 				g_clfwq_removeArray($scope.ywDetails.zhuanrangfang,obj);
	 			}else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};
	//当先导业务为预售合同备案时保存或更新抵押权人的信息
	$scope.saveDyqrInfo = function(zrf,obj){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.zhuanrangfang.length; i++) {
	        if ($scope.ywDetails.zhuanrangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var seqid=$scope.ywDetails.zhuanrangfang[index].SEQID;
		var sel_obj = zrf.sel_obj
		if(!sel_obj){
			$rootScope.mttAlert("请选择抵押权人！");
			return false;
		}
		
		var id=$scope.ywDetails.yewu.YWBH;
		var qlrlb=zrf.SORTID;
		if(g_checkIsNull(qlrlb)){
	    	$rootScope.mttAlert("权利人类别不能为空！");
	            return false;
	    }
		var qlrxh=sel_obj.QLRXH;
		var lxdz=sel_obj.LXDZ;
	    var lxdh=sel_obj.LXDH;
	    var dwgr=sel_obj.DWGR;
	    if(!lxdz || !lxdh ){
	    	$rootScope.mttAlert("联系电话和地址不能为空！");
	            return false;
	    }
	    if(dwgr=="单位"){
	    	dwgr=2;
		}else{
			dwgr=1;
		}
	    
		var requestBody = {_module:'TT',_method:'saveYgspfDyqrInfo',id:id,qlrlb:qlrlb,qlrxh:qlrxh,lxdz:lxdz,lxdh:lxdh,stanid:stanid,dwgr:dwgr,seqid:seqid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				if(!seqid){
					$scope.ywDetails.zhuanrangfang[index].SEQID=data.content;
				} 
				$rootScope.mttAlert("保存成功!");
				
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
	//业务保存
	$scope.save_yw = function(){
		var id=$scope.ywDetails.yewu.YWBH;
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
	
	//贷款类别
	$scope.dkSelectChange =function(){
		$("#dklb").attr("value",$("#dklb").val());
		$("#dklb").attr("value",$("#dklb").val());
	}
	
	//预购商品房抵押业务保存	
	$scope.save_yw_2 = function(){
		
		var id=$scope.ywDetails.yewu.YWBH;
		var dklb=$("#dklb").val();
		if(g_checkIsNull(dklb)){
			$rootScope.mttAlert("贷款类别不能为空！");
			return false;
		}
		var dyhth=$scope.ywDetails.yewu.DYHTH;
		if(g_checkIsNull(dyhth)){
			$rootScope.mttAlert("抵押合同号不能为空！");
			return false;
		}
		var zgzqse=$scope.ywDetails.yewu.ZGZQSE;
		if(g_checkIsNull(zgzqse)){
			$rootScope.mttAlert("最高债权数额不能为空！");
			return false;
		}
		var dbfw=$scope.ywDetails.yewu.DBFW;
		if(g_checkIsNull(dbfw)){
			$rootScope.mttAlert("担保范围不能为空！");
			return false;
		}
		var description=$scope.ywDetails.yewu.BZ;
		var zwlxqsrq=$("#ZWLXQSRQ").val();
		var zwlxzzrq=$("#ZWLXZZRQ").val();
		
		//校验日期格式
		if(g_checkIsNull(zwlxqsrq)){
			$rootScope.mttAlert("债务履行起始日期不能为空！");
			return false;
		}
		if(g_checkIsNull(zwlxzzrq)){
			$rootScope.mttAlert("债务履行终止日期不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveZgedybaYwInfo',id:id,description:description,dklb:dklb,dyhth:dyhth,dbfw:dbfw,zgzqse:zgzqse,zwlxqsrq:zwlxqsrq,zwlxzzrq:zwlxzzrq};
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
	
	//保存或更新人的联系方式和电话-转让方
	$scope.save_peopleAddPhone_zrf = function(index){
		var id=$scope.ywDetails.yewu.YWBH;
		var rightpeopletype=$scope.ywDetails.zhuanrangfang[index].DWGR;
		if(rightpeopletype=="单位"){
			rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.zhuanrangfang[index].QLRXH;
        var address=$scope.ywDetails.zhuanrangfang[index].LXDZ;
        var phoneno=$scope.ywDetails.zhuanrangfang[index].LXDH;
	var requestBody = g_getRBObj_savePeopleAddPhone(id,rightpeopletype,rightpeopleid,address,phoneno,stanid);
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
	
	//保存或更新人的联系方式和电话-受让方
	$scope.save_peopleAddPhone_srf = function(index){
		var id=$scope.ywDetails.yewu.YWBH;
		var rightpeopletype=$scope.ywDetails.shourangfang[index].DWGR;
		if(rightpeopletype=="单位"){
			rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.shourangfang[index].QLRXH;
        var address=$scope.ywDetails.shourangfang[index].LXDZ;
        var phoneno=$scope.ywDetails.shourangfang[index].LXDH;
	 var requestBody = g_getRBObj_savePeopleAddPhone(id,rightpeopletype,rightpeopleid,address,phoneno,stanid);
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
	
	//房屋保存
	$scope.save_fw = function(index){
		var id=$scope.ywDetails.yewu.YWBH;
		var subno=$scope.ywDetails.fangwu[index].FWXH;
		var stringvalue1=$scope.ywDetails.fangwu[index].FJ;
		var requestBody = {_module:'TT',_method:'saveSw2dFwInfo',id:id,subno:subno,stringvalue1:stringvalue1};
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