/**
 * 存量房网签模块
 */
angular.module('controller_clfwq', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

//待签房屋查询
.controller('clfwqDqfwCxController',function($rootScope,$scope,$state,$http,MyFactoryNew){
	var bdcqzh = "";
	var syqrmc = "";
	
	var init = function(){
		if($rootScope._app_roleno == PUBLIC_JS_44_YBCZY && 44 == $rootScope._app_orgtypeno){
			$("#syqrmc").removeAttr("disabled");
		}else{
			$("#syqrmc").attr("disabled","disabled");
			$rootScope.dqfw_syqrmc = g_getLoginName();
		}
	}
	init();
	//重置
    $scope.clear = function(){
    	if($rootScope._app_roleno == PUBLIC_JS_44_YBCZY && 44 == $rootScope._app_orgtypeno){
    		$("#syqrmc").val("");
    		$rootScope.dqfw_syqrmc = "";
    	}
		$("#bdcqzh").val("");
		$rootScope.dqfw_bdcqzh = "";
    }
    //查询
    $scope.search = function(){
    	bdcqzh = $("#bdcqzh").val().trim();
    	syqrmc = $("#syqrmc").val().trim();
    	if(!bdcqzh || !syqrmc){
    		$rootScope.mttAlert("输入框不能为空!");
            return false;
    	}
    	bdcqzh = bdcqzh.replace(/（/g,"(");
    	bdcqzh = bdcqzh.replace(/）/g,")");
    	
    	$rootScope.dqfw_bdcqzh = bdcqzh;
    	$rootScope.dqfw_syqrmc = syqrmc;
    	$state.go('dqfw_list');
    }
})

//待签房屋列表
.controller('clfwqDqfwListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	var bdcqzh = $rootScope.dqfw_bdcqzh;
	var syqrmc = $rootScope.dqfw_syqrmc;
	
	//待签房屋list页面
	$scope.getDqfw = function(){
		var requestBody = {_module:'TT',_method:'clfwq_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc,pageNum:1};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/queryPageJsonWithRB', 'POST', null, requestBody).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactoryNew.listHtmlInitAndGoto(data, 'clfwq_dqfwList', 'dqfw_list');
			}else if(data && data._page && data._page.count == 1){
				$rootScope.clfwq_dqfwList = data._page.results;
				$rootScope.dqfw = data._page.results[0];
				$state.go('dqfw_detail',{bdcqzh:bdcqzh,syqrmc:syqrmc});
			}else if (data && data._page && data._page.count == 0){
				MyFactoryNew.listHtmlInitAndGoto(data, 'clfwq_dqfwList', 'dqfw_list');
			}else{
				if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}
			}
	    })
	}
	$scope.getDqfw();
	
	$scope.goDetailHtml = function(dbalObject) {
		if(dbalObject){
			$rootScope.dqfw = dbalObject;
			$state.go('dqfw_detail',{bdcqzh:bdcqzh,syqrmc:syqrmc});
		}else{
			$rootScope.mttAlert('待签房屋详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'clfwq_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"clfwq_dqfwList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'clfwq_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"clfwq_dqfwList",false);
	}
})

//待签房屋详细信息
.controller('clfwqDqfwDetailController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	var bdcqzh = $stateParams.bdcqzh;
	var syqrmc = $stateParams.syqrmc;
	$scope.quxiao = function(){
	        $scope.popover.hide();
	    };
	$scope.banli = function() {
		var requestBody = {_module:'TT',_method:'clfwq_submitDqfw',bdcqzh:bdcqzh,syqrmc:syqrmc,type:$rootScope._app_roleno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('clfwq_list');
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

//存量房网签-列表页面
.controller('clfwqListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus,sortid,realtypeid){
		//这个逻辑注意下
		if((!mastatus || mastatus == 1648210) && ((realtypeid == 1648021 && (sortid == 1||sortid == 4||sortid == '1,5'||sortid == '1,8'||sortid == '4,5'||sortid == '4,8')) 
												||(realtypeid == 1648022 && $rootScope._app_roleno == PUBLIC_JS_44_YBCZY))){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'clfwq_list'});
	};

	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'clfwq_getClfwqListByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"clfwq_clfwqList",true,ifFromPullRefresh);
	}
	
	$scope.doRefresh();
	
	//加载更多
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'clfwq_getClfwqListByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"clfwq_clfwqList",false);
	}
	//详细
	$scope.xx = function(id,sortid) {
		$rootScope.goRouteForBack("clfwq_detail",{id:id,sortid:sortid},null);
	}
	//下载PDF
    $scope.downPDF= function(ywbh,realtypeid) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	if(realtypeid == 1648022){
    		MyFactoryNew.downPDF(99,paramsObj);
    	}else{
    		MyFactoryNew.downPDF(100,paramsObj);
    	}
    }
    
	//二维码                    
    $scope.creQRCode = function(ywbh,realtypeid){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	if(realtypeid == 1648022){
    		MyFactoryNew.showPdfQRCode(99,paramsObj,"clfwq_list");
    	}else{
    		MyFactoryNew.showPdfQRCode(100,paramsObj,"clfwq_list");
    	}
    }
	
	//提交或回退
	$scope.tj= function(id,flowid,businessID,stanID,realTypeID,svalue,sortid,if_qianzi) {
		//签字校验
		if(svalue == 1 && sortid == "1,5" && if_qianzi < 2){
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGH_QIANZI_2);
			return false;
		}else if(svalue == 1 && if_qianzi < 1){
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGH_QIANZI_1);
			return false;
		}
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
		var requestBody = {_module:'TT',_method:'clfwq_delete',id:id};
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

//存量房网签-详细页面
.controller('clfwqDetailController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew,MyFactory){
	
	var id = $stateParams.id;
	var sortid = $stateParams.sortid;
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
		g_dateSelect('#jiaoFuDate', 0, null);
		g_dateSelect('#jiaoFuDate_zj', 0, null);
		if($("#htRefresh").hasClass("actived")){
			$scope.xx();
		}
	})
	
	//判断是否为只读模式
	function isDisabled(){
		$(".ifEdit").attr("disabled","disabled");
		$(".ifShouRangFangEdit").attr("disabled","disabled");
		$(".ifEdit.clflxdh").removeClass("lxdhLength");
		$scope.if_show_piPeiButton = false;
		$scope.jfinfo = true;
		$scope.yfinfo = true;
		$scope.jfdate = true;
		if(realtypeid == 1648022){
			$("#ht_zxjy").hide();
			$("#ht_jjht").show();
		}else{
			$("#ht_zxjy").show();
			$("#ht_jjht").hide();
		}
		if(realtypeid == 1648021 && bastatus == 0 && mastatus == 1648210 && (sortid == 1 || sortid == 4) && g_getRoleno() != PUBLIC_JS_GLY){
			$scope.if_show_baocunButton = true;
			$scope.if_show_piPeiButton = true;
			$(".ifEdit.clflxdh").addClass("lxdhLength");
			$scope.if_show_ht2baocunButton = true;
			$scope.if_show_ht3baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
			$scope.jfinfo = false;
			$scope.jfdate = false;
			sfzj_fkfs_select_change();
		}else if((realtypeid == 1648021 && bastatus == 0 && mastatus == 1648210 && (sortid == '1,5' || sortid == '1,8' || sortid == '4,5' || sortid == '4,8'))||(realtypeid == 1648022 && bastatus == 0 && mastatus == 1648210 && $rootScope._app_roleno == PUBLIC_JS_44_YBCZY)){
			$scope.if_show_baocunButton = true;
			$scope.if_show_piPeiButton = true;
			$(".ifEdit.clflxdh").addClass("lxdhLength");
			$scope.if_show_ht2baocunButton = true;
			$scope.if_show_ht3baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
			$(".ifShouRangFangEdit").removeAttr("disabled");
			$scope.jfinfo = false;
			$scope.yfinfo = false;
			$scope.jfdate = false;
			sfzj_fkfs_select_change();
		}else if(realtypeid == 1648021 && bastatus == 0 && mastatus == 1648213 && (sortid == 5 || sortid == 8) && g_getRoleno() != PUBLIC_JS_GLY){
			$scope.if_show_ht2baocunButton = true;
			$(".ifShouRangFangEdit").removeAttr("disabled");
			$scope.yfinfo = false;
		}
		
		if($scope.ywDetails.yewu.BASTATUS == -1){
			$("#qklhtls").show();
			$("#htRefresh").hide();
		}else{
			$("#qklhtls").hide();
			$("#htRefresh").show();
		}
	}
	
	var MAX_RN = 0;
	
	//详细map查询
	$scope.xx = function(){
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'clfwq_getClfwqDetail',id:id};
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
					data.shourangfang[0] = {"SORTID" : " "};
				}
				if(data.fangwu.length == 0){
					data.fangwu[0] = {"FWZL" : " "};
				}						
				$scope.ywDetails = data;
				MAX_RN = data.shourangfang.length;
				$("#gyfs").attr("value",data.yewu.GYFS);
				$("#fkfs").attr("value",data.yewu.FKFS);
				$("#htlx").attr("value",data.yewu.HTLX);
				$("#sfjxzjjg").attr("value",data.yewu.SFJXZJJG);
				
				$("#dbjg").attr("value",data.yewu.GUARANTORNO);
				$("#disjgyh").attr("value",data.yewu.JGYH);
				$("#disjghm").attr("value",data.yewu.JGHM);
				$("#disjgzh").attr("value",data.yewu.JGZH);
				
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				stanid =   data.yewu.STANID;
				realtypeid = data.yewu.REALTYPEID;
				$scope.zj_sfjxzjjg = data.yewu.SFJXZJJG;
				isDisabled();
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })
	}
	$scope.xx();
	
	//区块链合同历史预处理
	$scope.openQklhtls = function(){
		//办结有效时，没区块链交易码的老数据，自动触发一下
		if($scope.ywDetails.yewu.BASTATUS == -1 && $scope.ywDetails.yewu.ISVALID == -1 && !$scope.ywDetails.yewu.QKLJYM){
			MyFactory.getHttpRequest( baseurl + '/qklWithRB/writeToQklByYwbh?ywbh='+$scope.ywDetails.yewu.ID, 'GET', null, null).then(function (data) {
				if(data && data == "000000"){
					$rootScope.p_getQklHistoryListByMap($scope.ywDetails.yewu.HTBH+"");
					//加模拟的交易码防止造成成功调用
					$scope.ywDetails.yewu.QKLJYM = "000000";
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else if(data){
					$rootScope.mttAlert(data);
				}else{
					$rootScope.mttAlert('老数据写区块链失败！');
				}
	        })
		}else{
			$rootScope.p_getQklHistoryListByMap($scope.ywDetails.yewu.HTBH+"");
		}
	}
	
	//增加买受方
	$scope.jiaHang = function(){
		$scope.ywDetails.shourangfang[$scope.ywDetails.shourangfang.length] = {"SORTID" : " ",RN:MAX_RN+1};
		MAX_RN = MAX_RN+1;
	}
	
	//删除
	$scope.delete_srf = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.shourangfang.length; i++) {
	        if ($scope.ywDetails.shourangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		
		var seqid = $scope.ywDetails.shourangfang[i].SEQID;
		
		if(!seqid){
			g_clfwq_removeArray($scope.ywDetails.shourangfang,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteClfwqMsr',seqid:seqid};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					g_clfwq_removeArray($scope.ywDetails.shourangfang,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	var sfzj_fkfs_select_change = function(){
		if("否" == $("#sfjxzjjg").val()){
			$("#dbjg").attr("value","");
			$("#disjgyh").attr("value","");
			$("#disjghm").attr("value","");
			$("#disjgzh").attr("value","");
			$("#disjgyh").attr("disabled","disabled");
			$("#dbjg").attr("disabled","disabled");
		}else if("是" == $("#sfjxzjjg").val() && "一次性付款" == $("#fkfs").val()){
			$("#dbjg").removeAttr("disabled");
			$("#disjgyh").removeAttr("disabled");
		}else{
			$("#dbjg").removeAttr("disabled");
			$("#disjgyh").removeAttr("disabled");
		}
	}
	//一次性付款
	$("#fkfs").change(function(){
		if(!$("#sfjxzjjg").val()){
			$rootScope.mttAlert("请先选择是否进行资金监管！");
			$("#fkfs").attr("value","");
			return false;
		}
	})
	//资金监管
	$("#sfjxzjjg").change(function(){
		sfzj_fkfs_select_change();
	})
	
	//监管银行信息
	$("#disjgyh").change(function(){
		$("#disjghm").attr("value",$("#disjgyh").val());
		$("#disjgzh").attr("value",$("#disjgyh").val());
	})
	
	
	//业务保存
	$scope.save_yw = function(){
		var id = $scope.ywDetails.yewu.ID;
		var gyfs = $("#gyfs").val();
		var fkfs = $("#fkfs").val();
		var htlx = $("#htlx").val();
		var sfjxzjjg = $("#sfjxzjjg").val();
		var cjje = $scope.ywDetails.yewu.CJJE;
		var jgje = $scope.ywDetails.yewu.JGJE;
		
		var dbjg = $("#dbjg").val();
		var jgyh = $("#disjgyh").val();
		var jghm = $("#disjghm").val();
		var jgzh = $("#disjgzh").val();
		
		var description = $scope.ywDetails.yewu.BZ;
		
		var requestBody = {_module:'TT',_method:'saveClfwqYwInfo',id:id,description:description,gyfs:gyfs,fkfs:fkfs,htlx:htlx,sfjxzjjg:sfjxzjjg,cjje:cjje,jgje:jgje,dbjg:dbjg,jgyh:jgyh,jghm:jghm,jgzh:jgzh};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.zj_sfjxzjjg = sfjxzjjg;
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
		var id=$scope.ywDetails.yewu.ID;
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
	
	$scope.piPei = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.shourangfang.length; i++) {
	        if ($scope.ywDetails.shourangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		
		var phoneno=$scope.ywDetails.shourangfang[index].LXDH;
		//电话号码的合法性
		if(!REphone.test(phoneno)){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'isZhuCeInAPP',phoneno:phoneno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails.shourangfang[index].QLRXZ=data.content.QLRXZ;
				$scope.ywDetails.shourangfang[index].ZJLB=data.content.ZJLB;
				$scope.ywDetails.shourangfang[index].ZJHM=data.content.ZJHM;
				$scope.ywDetails.shourangfang[index].QLRMC=data.content.QLRMC;
				$scope.ywDetails.shourangfang[index].LXDZ=data.content.LXDZ;
				$scope.ywDetails.shourangfang[index].QLRXH=data.content.QLRXH;
				
				$rootScope.mttAlert("匹配成功！");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//保存或更新受让方
	$scope.save_peopleAddPhone_srf = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.shourangfang.length; i++) {
	        if ($scope.ywDetails.shourangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		
		var id=$scope.ywDetails.yewu.ID;
		var stanid = $scope.ywDetails.yewu.STANID;
		var qlrlb_ru = $scope.ywDetails.shourangfang[index].SORTID;
		var dwgr = $scope.ywDetails.shourangfang[index].GR;
		var qlrmc = $scope.ywDetails.shourangfang[index].QLRMC;
		var address=$scope.ywDetails.shourangfang[index].LXDZ;
        var phoneno=$scope.ywDetails.shourangfang[index].LXDH;
        var qlrxh=$scope.ywDetails.shourangfang[index].QLRXH;
		var gyfe = $scope.ywDetails.shourangfang[index].GYFE;
		var seqid = $scope.ywDetails.shourangfang[index].SEQID;
		var gyfs = $("#gyfs").val();
		var flog = true;
		
		if(!gyfs){
			$rootScope.mttAlert("请先维护详细中业务页签内容！");
			return false;
		}
		
		if(!qlrmc){
			$rootScope.mttAlert("请输入联系电话，进行匹配操作！");
			return false;
		}
		
		if(!$.trim(qlrlb_ru)){
			$rootScope.mttAlert("请选择权利人类别！");
			return false;
		}
		
		if(!dwgr){
			$rootScope.mttAlert("请选择单位个人！");
			return false;
		}
		
		if(!phoneno){
			$rootScope.mttAlert("请输入联系电话！");
			return false;
		}
		
		if(!address){
			$rootScope.mttAlert("请输入联系地址！");
			return false;
		}
		
		if(1 == gyfs){
			flog = false;
		}else if(1 != gyfs && gyfe){
			flog = false;
		}
		if(flog){
			$rootScope.mttAlert("请输入共有份额！");
			return false;
		}
		
		var requestBody = {_module:'TT',_method:'saveClfwqSrf',id:id,stanid:stanid,qlrlb_ru:qlrlb_ru,dwgr:dwgr,qlrmc:qlrmc,
				address:address,phoneno:phoneno,qlrxh:qlrxh,gyfe:gyfe,seqid:seqid,gyfs:gyfs};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!seqid){
				$scope.ywDetails.shourangfang[index].SEQID = data.content;
			}
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
		var id=$scope.ywDetails.yewu.ID;
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
	
	//合同第二条保存
	$scope.save_ht2 = function(){
		var id=$scope.ywDetails.yewu.ID;
		var jfkhh = $("#jfkhh").val();
		var jfkhhhm = $("#jfkhhhm").val();
		var jfkhm = $("#jfkhm").val();
		var jfkhzh = $("#jfkhzh").val();
		
		var yfkhh = $("#yfkhh").val();
		var yfkhhhm = $("#yfkhhhm").val();
		var yfkhm = $("#yfkhm").val();
		var yfkhzh = $("#yfkhzh").val();
		var requestBody = {_module:'TT',_method:'saveClfwqht2',id:id,jfkhh:jfkhh,jfkhhhm:jfkhhhm,jfkhm:jfkhm,jfkhzh:jfkhzh,yfkhh:yfkhh,yfkhhhm:yfkhhhm,yfkhm:yfkhm,yfkhzh:yfkhzh,sortid:sortid,realtypeid:realtypeid,type:$rootScope._app_roleno};
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
	
	//合同第三条保存
	$scope.save_ht3 = function(){
		var id=$scope.ywDetails.yewu.ID;
		var jkqx=null;
		if(realtypeid == 1648022){
			jkqx=$("#jiaoFuDate_zj").val();
		}else{
			jkqx=$("#jiaoFuDate").val();
		}
		var requestBody = {_module:'TT',_method:'saveClfwqht3',id:id,jkqx:jkqx};
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
