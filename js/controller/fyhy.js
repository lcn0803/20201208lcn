angular.module('controller_fyhy', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

//待签房屋查询
.controller('fyhyDqfwCxController',function($rootScope,$scope,$state,$http,MyFactoryNew){
	var bdcqzh = "";
	var syqrmc = "";
	
	var init = function(){
		if($rootScope._app_roleno == PUBLIC_JS_44_YBCZY){
			$("#syqrmc").removeAttr("disabled");
		}else{
			$("#syqrmc").attr("disabled","disabled");
			$rootScope.dqfw_syqrmc = g_getLoginName();
		}
	}
	init();
	//重置
    $scope.clear = function(){
    	if($rootScope._app_roleno == PUBLIC_JS_44_YBCZY){
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
    	$state.go('dqfy_list');
    }
})

//待签房屋列表
.controller('fyhyDqfwListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	var bdcqzh = $rootScope.dqfw_bdcqzh;
	var syqrmc = $rootScope.dqfw_syqrmc;
	
	//待签房屋list页面
	$scope.getDqfw = function(){
		var requestBody = {_module:'TT',_method:'fyhy_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc,pageNum:1};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/queryPageJsonWithRB', 'POST', null, requestBody).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactoryNew.listHtmlInitAndGoto(data, 'fyhy_dqfwList', 'dqfy_list');
			}else if(data && data._page && data._page.count == 1){
				$rootScope.fyhy_dqfwList = data._page.results;
				$rootScope.dqfw = data._page.results[0];
				$state.go('dqfy_detail',{bdcqzh:bdcqzh,syqrmc:syqrmc});
			}else if (data && data._page && data._page.count == 0){
				MyFactoryNew.listHtmlInitAndGoto(data, 'fyhy_dqfwList', 'dqfy_list');
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
			$state.go('dqfy_detail',{bdcqzh:bdcqzh,syqrmc:syqrmc});
		}else{
			$rootScope.mttAlert('待签房屋详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'fyhy_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"fyhy_dqfwList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'fyhy_getDqfwListByPage',bdcqzh:bdcqzh,syqrmc:syqrmc};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"fyhy_dqfwList",false);
	}
})

//待签房屋详细信息
.controller('fyhyDqfwDetailController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	var bdcqzh = $stateParams.bdcqzh;
	var syqrmc = $stateParams.syqrmc;
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	$scope.banli = function() {
		var requestBody = {_module:'TT',_method:'fyhy_submitDqfw',bdcqzh:bdcqzh,syqrmc:syqrmc};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('fyhy_list');
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

//房源核验-列表页面
.controller('fyhyListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	var listName = "fyhy_fyhyList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus ==1676010 && g_getRoleno() == PUBLIC_JS_44_YBCZY){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else if(mastatus ==1676010 && g_getRoleno() == PUBLIC_JS_XFZ){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'fyhy_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
        var requestBody = {_module:'TT',_method:'fyhy_getFyhyListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
	    var requestBody = {_module:'TT',_method:'fyhy_getFyhyListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
 	$scope.xx = function(id) {
 		$rootScope.goRouteForBack("fyhy_detail",{id:id},null);
 	}    
 	
 	//下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(450,paramsObj);
    }
	
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(450,paramsObj,"fyhy_list");
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
	$scope.tj= function(id,flowid,businessID,stanID,realTypeID,svalue,opion) {
		    if(g_getRoleno() == PUBLIC_JS_BZX_FYHYYWY){
		    	if(svalue==2 && !opion){
		    		$rootScope.mttAlert("请在详细页面填写退回受理意见！");
		    	}else{
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
		    }else{
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
	     	
	} 	
 	//办结业务
	/*$scope.bj = function(id) {
		var requestBody = {_module:'TT',_method:'fyhy_commitYW',id:id};
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
	}*/
 	//删除
 	$scope.del = function(id) {
        var requestBody = {_module:'TT',_method:'fyhy_delfyhy',id:id};
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
.controller('fyhyDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var realtypeid = null;

	//电话
	var REphone=/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		$(".ifEdit2").attr("disabled","disabled");

		if(bastatus == 0 && mastatus == 1676010 && (g_getRoleno() == PUBLIC_JS_44_YBCZY || g_getRoleno() == PUBLIC_JS_XFZ)){
			$scope.if_show_baocunButton = true;
			$scope.if_show_baocunButton2 = true;
			$scope.if_show_piPeiButton = true;
			$(".ifEdit").removeAttr("disabled");
			$(".ifEdit2").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
			$("textarea.ifEdit2").css("background","white");
		}/*else if(bastatus == 0 && mastatus == 1676019 && g_getRoleno() == PUBLIC_JS_BZX_FYHYYWY){
			$scope.if_show_baocunButton2 = true;
			$(".ifEdit2").removeAttr("disabled");
			$("textarea.ifEdit2").css("background","white");
		}*/
	}
	
	var MAX_RN=0;
	//业务详细maps查询
	$scope.xx = function() {
		var id=$stateParams.id;
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'fyhy_findDetailMap',id:$stateParams.id,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}						
				$scope.ywDetails = data;
				MAX_RN = data.shourangfang.length;
				$("#fwxz").attr("value",data.yewu.SCGFXZ);
				$("#dyzk").attr("value",data.yewu.BDYZK);
				$("#cfzk").attr("value",data.yewu.BCFZK);
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
	
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
		isDisabled();
	})
		
	//增加所有权人
	$scope.addSyqr = function(){
		
		$scope.ywDetails.shourangfang[$scope.ywDetails.shourangfang.length] = {"QLRLB" : " ",RN:MAX_RN+1};
		MAX_RN=MAX_RN+1;
	};
	
	//删除所有权人
	$scope.delete_syqr = function(ywbh,obj){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.shourangfang.length; i++) {
	        if ($scope.ywDetails.shourangfang[i].RN == obj.RN) {
	        	index = i;
	        	break;
	        }
	    }
		var seqid=$scope.ywDetails.shourangfang[index].SEQID;
		
		if(!seqid){
			g_clfwq_removeArray($scope.ywDetails.shourangfang,obj);
		}else{
			var requestBody = {_module:'TT',_method:'fyhy_delSyqrInfo',id:ywbh,seqid:seqid};
	 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
	 			if(data && data.type && data.type=="success"){
	 				$rootScope.mttAlert("删除成功！");
	 				g_clfwq_removeArray($scope.ywDetails.shourangfang,obj);
	 			}else if(data && data.type && data.type=="error"){
	 				$rootScope.mttAlert(data.content);
	 			}else{
	 				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	 			}
	         })
	 	}
	};
	
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
	
	//保存或更新所有权人
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
		var dwgr = $scope.ywDetails.shourangfang[index].DWGR;
		if(dwgr=="个人"){
	    	dwgr=1;
		}
		var qlrlb = $scope.ywDetails.shourangfang[index].SYQRLB;
		var qlrxz = $scope.ywDetails.shourangfang[index].QLRXZ;
		var zjlb = $scope.ywDetails.shourangfang[index].ZJLB;
		var zjhm = $scope.ywDetails.shourangfang[index].ZJHM;
		var qlrmc = $scope.ywDetails.shourangfang[index].QLRMC;
		var lxdz=$scope.ywDetails.shourangfang[index].LXDZ;
        var lxdh=$scope.ywDetails.shourangfang[index].LXDH;
        var qlrxh=$scope.ywDetails.shourangfang[index].QLRXH;
		var gyfe = $scope.ywDetails.shourangfang[index].GYFE;
		var seqid = $scope.ywDetails.shourangfang[index].SEQID;
		
		if(!dwgr){
			$rootScope.mttAlert("请选择单位个人！");
			return false;
		}
		if(!qlrlb){
			$rootScope.mttAlert("请选择权利人类别！");
			return false;
		}
		if(!lxdh){
			$rootScope.mttAlert("请输入联系电话！");
			return false;
		}
		if(!lxdz){
			$rootScope.mttAlert("请输入联系地址！");
			return false;
		}
		if(!gyfe){
			$rootScope.mttAlert("请输入共有份额！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'fyhy_saveSyqr',id:id,stanid:stanid,dwgr:dwgr,qlrmc:qlrmc,
				lxdz:lxdz,lxdh:lxdh,qlrxh:qlrxh,qlrlb:qlrlb,gyfe:gyfe,seqid:seqid};
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
	
	//业务保存
	$scope.save_yw = function(){
		var id=$scope.ywDetails.yewu.ID;
		var realsource=$scope.ywDetails.yewu.FCLY;
		var buildarea=$scope.ywDetails.yewu.BZMJ;
		var landproperty=$scope.ywDetails.yewu.FCXZ;
		var roomproperty=$("#fwxz").val();
		var ismortgage=$("#dyzk").val();
		var isrestrict=$("#cfzk").val();
		var description=$scope.ywDetails.yewu.BZ;
		var opion=$scope.ywDetails.yewu.OPION;
		var requestBody = {_module:'TT',_method:'saveFYHYYwInfo',id:id,realsource:realsource,buildarea:buildarea,landproperty:landproperty,roomproperty:roomproperty,ismortgage:ismortgage,isrestrict:isrestrict,description:description,opion:opion,roleno:g_getRoleno()};
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
	
	//保存或更新人的联系方式和电话-经纪机构
	$scope.save_peopleAddPhone_zrf = function(index){
		var id=$scope.ywDetails.yewu.ID;
		var rightpeopletype=1;
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
	
})