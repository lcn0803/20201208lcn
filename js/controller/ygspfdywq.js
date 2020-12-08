angular.module('controller_ygspfdywq', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 预购商品房抵押网签模块
 */

//预购商品房抵押网签-预告登记-列表页面
.controller('ygspfdywqdqListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,MyFactoryNew){
	
	//待办案例list页面
	$scope.getDbal = function() {
		//交互获得案例数据源list
		var requestBody = {_module:'TT',_method:'ygspfdywq_getYgdjListByPage',pageNum:1};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/queryPageJsonWithRB', 'POST', null, requestBody).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactoryNew.listHtmlInitAndGoto(data, 'ygspfdywq_dqList', 'ygspfdywq_dq_list');
			}else if(data && data._page && data._page.count == 1){
				var id = data._page.results[0].YWBH;
				$rootScope.ygspfdywq_dqList = data._page.results;
				$rootScope.dbal = data._page.results[0];
				$state.go('ygspfdywq_dq_detail');
			}else if (data && data._page && data._page.count == 0){
				MyFactoryNew.listHtmlInitAndGoto(data, 'ygspfdywq_dqList', 'ygspfdywq_dq_list');
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
			$state.go('ygspfdywq_dq_detail');
		}else{
			$rootScope.mttAlert('获取待办案例详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'ygspfdywq_getYgdjListByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"ygspfdywq_dqList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'ygspfdywq_getYgdjListByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"ygspfdywq_dqList",false);
	}
})

//预购商品房抵押网签-预告登记-详细信息
.controller('ygspfdywqDqDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	$scope.banli = function() {
		var id = $scope.dbal.YWBH;
		var requestBody = {_module:'TT',_method:'ygspfdywq_submitYgdj',id:id+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('ygspfdywq_wq_list');
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

//预购商品房抵押网签-抵押网签-列表页面
.controller('ygspfdyWqListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "ygspfdywq_wqList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus ==1617017){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'ygspfdywq_wq_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'ygspfdywq_getDywqListByPage'};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'ygspfdywq_getDywqListByPage'};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
 		$rootScope.goRouteForBack("ygspfdywq_wq_detail",{id:id},null);
 	}     
 	
    //下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(120,paramsObj);
    }
	
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(120,paramsObj,"ygspfdywq_wq_list");
    } 	
 	
	//草拟提交
	$scope.caoniTJ = function(checkAppPicsEnough,id,flowid,businessID,stanID,realTypeID,svalue,if_yw6col_null,sortid,if_qianzi) {
		if(checkAppPicsEnough){
			if(if_yw6col_null == 0){
				$rootScope.mttAlert("业务详细中贷款类别、被担保主债权数额等信息不能为空！");
			}else{
				//签字校验
				if(svalue == 1 && sortid == 2 && if_qianzi < 1){
					$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGH_QIANZI_1);
					return false;
				}
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
 		var requestBody = {_module:'TT',_method:'ggdywq_delDywq',id:id};
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

//预购商品房抵押网签-抵押网签--业务详细查看或保存---多个页签页面
.controller('ygspfdyWqDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){

	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var realtypeid = null;
	//电话
	var REphone=/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
	
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
		isDisabled();
		g_dateSelect('#riqi', 0, null);
		if($("#htRefresh").hasClass("acitve")){
			$("#hetong").show();
			$scope.xx();
		}
	})
	
	function removeZwrArray(_arr, _obj) {
	    var length = _arr.length;
	    for (var i = 0; i < length; i++) {
	        if (_arr[i].RN2 == _obj.RN2) {
	            if (i == 0) {
	                _arr.shift(); //删除并返回数组的第一个元素
	                return _arr;
	            }
	            else if (i == length - 1) {
	                _arr.pop();  //删除并返回数组的最后一个元素
	                return _arr;
	            }
	            else {
	                _arr.splice(i, 1); //删除下标为i的元素
	                return _arr;
	            }
	        }
	    }
	}

	//贷款类别
	$scope.dkSelectChange =function(){
		$("#dklb").attr("value",$("#dklb").val());
		$("#dklb").attr("value",$("#dklb").val());
	}

	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		$(".ifEdit2").attr("disabled","disabled");
		$(".ifEdit.clflxdh").removeClass("lxdhLength");
		if(bastatus == 0 && mastatus == 1617017 && g_getRoleno() != PUBLIC_JS_GLY){
			$scope.if_show_baocunButton = true;
			$scope.if_show_piPeiButton = true;
			$scope.if_show_ht1baocunButton=true;
			$scope.if_show_ht2baocunButton=true;
			$scope.if_show_ht3baocunButton=true;
			$scope.yw_ysba = true;
			g_dateSelect('#ZWLXQX1', null, null);
			g_dateSelect('#ZWLXQX2', null, null);
			$(".ifEdit").removeAttr("disabled");
			$(".ifEdit2").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	
	var MAX_RN=0;
	var MAX_RN2=0;
	//业务详细maps查询
	$scope.xx = function() {
		
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'ggdywq_getDywqDetail',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
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
				if(data.zhaiwuren.length == 0){
					data.zhaiwuren[0] = {"QLRLB" : " "};
				}
				if(data.fangwu.length == 0){
					data.fangwu[0] = {"FWZL" : " "};
				}
				$scope.ywDetails = data;
				$("#ZWLXQX1").attr("value",data.zwlxqx1);
				$("#ZWLXQX2").attr("value",data.zwlxqx2);
				MAX_RN = data.zhuanrangfang.length;
				MAX_RN2 = data.zhaiwuren.length;
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				stanid =   data.yewu.STANID;
				realtypeid = data.yewu.REALTYPEID;	
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
	
	//增加抵押权人
	$scope.addDyqr = function(){
		
		$scope.ywDetails.zhuanrangfang[$scope.ywDetails.zhuanrangfang.length] = {"QLRLB" : " ",RN:MAX_RN+1};
		MAX_RN=MAX_RN+1;
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
		$rootScope.goRouteForBack("pubZwrxx",{id:$stateParams.id,qlrxh:qlrxh,dwgr:dwgr,backURL:'ygdywq_detail',if_cz:$scope.if_show_baocunButton},{id:$stateParams.id});
	}
	//增加债务人
	$scope.addZwr = function(){
		
		$scope.ywDetails.zhaiwuren[$scope.ywDetails.zhaiwuren.length] = {"QLRLB" : " ",RN2:MAX_RN2+1};
		MAX_RN2=MAX_RN2+1;
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
	
	//删除债务人
	$scope.deleteZwr = function(ng_obj){
		var delObj = g_ngrepeat_get($scope.ywDetails.zhaiwuren,ng_obj.$$hashKey);
		if(!delObj.SEQID){
			g_ngrepeat_removeArray($scope.ywDetails.zhaiwuren,ng_obj.$$hashKey);
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
	 				g_ngrepeat_removeArray($scope.ywDetails.zhaiwuren,ng_obj.$$hashKey);
	            }else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};	
	//保存或更新抵押权人的信息
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
	    
		var requestBody = {_module:'TT',_method:'saveYgspfDywqDyqrxx',id:id,qlrlb:qlrlb,qlrxh:qlrxh,lxdz:lxdz,lxdh:lxdh,stanid:stanid,dwgr:dwgr,seqid:seqid};
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
   
	$scope.piPei = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.zhaiwuren.length; i++) {
	        if ($scope.ywDetails.zhaiwuren[i].RN2 == obj.RN2) {
	        	index = i;
	        	break;
	        }
	    }
		
		var phoneno=$scope.ywDetails.zhaiwuren[index].LXDH;
		//电话号码的合法性
		if(!REphone.test(phoneno)){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'isZhuCeInAPP',phoneno:phoneno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails.zhaiwuren[index].QLRXZ=data.content.QLRXZ;
				$scope.ywDetails.zhaiwuren[index].ZJLB=data.content.ZJLB;
				$scope.ywDetails.zhaiwuren[index].ZJHM=data.content.ZJHM;
				$scope.ywDetails.zhaiwuren[index].QLRMC=data.content.QLRMC;
				$scope.ywDetails.zhaiwuren[index].LXDZ=data.content.LXDZ;
				$scope.ywDetails.zhaiwuren[index].QLRXH=data.content.QLRXH;
				
				$rootScope.mttAlert("匹配成功！");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}

   //保存或更新债务人信息
	$scope.saveZwrInfo = function($event,ng_obj){
		var bigDivId = $($event.target).attr("bigDivId");
		if(g_checkNullByClass($rootScope,bigDivId,"notNull")){
    		return false;
    	}
		var id = $scope.ywDetails.yewu.YWBH;
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
	//预购商品房抵押网签业务信息保存	
	$scope.save_yw = function(){
		
		var id=$scope.ywDetails.yewu.YWBH;
		var pgjz=$scope.ywDetails.yewu.PGJZ;
		if(g_checkIsNull(pgjz)){
			$rootScope.mttAlert("评估价值不能为空！");
			return false;
		}
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
		var dbfw=$scope.ywDetails.yewu.DBFW;
		if(g_checkIsNull(dbfw)){
			$rootScope.mttAlert("担保范围不能为空！");
			return false;
		}
		var bdbzqse=$scope.ywDetails.yewu.BDBZQSE;
		if(g_checkIsNull(bdbzqse)){
			$rootScope.mttAlert("被担保主债权数额不能为空！");
			return false;
		}
		var zwlxqx1=$("#ZWLXQX1").val();
		var zwlxqx2=$("#ZWLXQX2").val();
		//校验日期格式
		if(g_checkIsNull(zwlxqx1)){
			$rootScope.mttAlert("债务履行期限不能为空！");
			return false;
		}
		if(g_checkIsNull(zwlxqx2)){
			$rootScope.mttAlert("债务履行期限不能为空！");
			return false;
		}
		var zwlxqx=zwlxqx1+'至'+zwlxqx2;
		var description=$scope.ywDetails.yewu.BZ;
		
		var requestBody = {_module:'TT',_method:'ggsavedyWqYwxx',id:id,description:description,pgjz:pgjz,dklb:dklb,dyhth:dyhth,dbfw:dbfw,bdbzqse:bdbzqse,zwlxqx:zwlxqx};
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
	//预购商品房抵押网签合同第一条信息保存
	$scope.save_ht1=function(){
		var id=$scope.ywDetails.yewu.YWBH;
		var bdbzqse=$scope.ywDetails.ygdyhetong.zzqxq.ZZEANDBZ;
		if(g_checkIsNull(bdbzqse)){
			$rootScope.mttAlert("被担保主债权金额不能为空！");
			return false;
		}
		var zwlxqx=$scope.ywDetails.ygdyhetong.zzqxq.ZWLXQX;
		if(g_checkIsNull(zwlxqx)){
			$rootScope.mttAlert("债务履行期限不能为空！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveYgspfdywqht1',id:id,bdbzqse:bdbzqse,zwlxqx:zwlxqx};
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
	//预购商品房抵押网签合同第二条信息保存
	$scope.save_ht2=function(){
		var id=$scope.ywDetails.yewu.YWBH;
		var re = /^[0-9]+.?[0-9]*/;
		var bdbzqse=$scope.ywDetails.ygdyhetong.dyxq.ZZQJE;
		if (!re.test(bdbzqse)) { 
			$rootScope.mttAlert("被担保主债权金额请输入数值类型！");
			return false;
		}
		if(g_checkIsNull(bdbzqse)){
			$rootScope.mttAlert("被担保主债权金额不能为空！");
			return false;
		}
		var pgjz=$scope.ywDetails.ygdyhetong.dyxq.FHJZ;
		if (!re.test(pgjz)) { 
			$rootScope.mttAlert("抵押房屋价值请输入数值类型！");
			return false;
		}
		if(g_checkIsNull(pgjz)){
			$rootScope.mttAlert("抵押房屋价值不能为空！");
			return false;
		}
		var dbfw=$scope.ywDetails.ygdyhetong.dyxq.DBFW;
		if(g_checkIsNull(dbfw)){
			$rootScope.mttAlert("担保范围不能为空！");
			return false;
		}
		//var bz=$scope.ywDetails.ygdyhetong.dyxq.BZ;
		
		var requestBody = {_module:'TT',_method:'ggsaveDywqht2',id:id,bdbzqse:bdbzqse,pgjz:pgjz,dbfw:dbfw};
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