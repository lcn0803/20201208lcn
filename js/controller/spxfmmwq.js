angular.module('controller_spxfmmwq', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 商品现房买卖网签模块
 */

//楼栋-列表页面
.controller('spxfwqLdListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
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
	
	$scope.golpb = function(buildId){
		$state.go('xf_lpb_one',{'id':'','buildId':buildId,'init_show_qfxf':3,'backURL':'xf_ld_list','ywID':$stateParams.ywID,'ywBackURL':$stateParams.ywBackURL});
	}
	
	var listName = "spxfwq_ld_list";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'spxfwq_getldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'spxfwq_getldListByPage',numPerPage_self:9999,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//楼盘表
//（注意现房、现房业务配置颜色CSS文件中：颜色来自数据库，不同环境可能配置不尽相同）
.controller('xfLpbOneController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
	
	var index_floor = 0;
	$scope.floorList = null;
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		//楼栋选择
		$('.loupanbiao-loudong').off("click").on('click', function(){
			var curItem = $(this);
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				$scope.selectedLd = $scope.lpb.oneLD;
				//联动变更楼层信息
				$scope.floorList = $scope.lpb.oneLD.floorList;
				$scope.selectedFloor = $scope.floorList[0];
				$scope.$apply();
			}
			
		});
		
		//楼层/销售层选择
		$('.loupanbiao-louceng-xiaoshouceng-item').off("click").on('click', function(){
			var curItem = $(this);
			index_floor = curItem.attr("xh");
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				//联动变更选中的楼层信息
				$scope.selectedFloor = $scope.floorList[curItem.attr("xh")];
				//初始化期、现房的图例选中状态为不选中任何
				$('#filter-by-room-status .selected').removeClass("selected");
				$scope.$apply();
			}
		});
		
		//签约
		$('.loupanbiao-louceng-xiaoshouceng-detail .col .colMainInfo .spqfwq_qy').off("click").on('click', function(){
			var curItem = $(this).parent().parent();
			var roomId = curItem.attr("id");
			//分两种有业务编号的和没有业务编号的()   写一起或者分两个请求
			if(typeof $stateParams.ywID == "number" && $stateParams.ywID > 0){
				var requestBody = {_module:'TT',_method:'spxfmmwqSelBldroom',id:$stateParams.ywID,roomId:roomId};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data && data.type && data.type=="success"){
						$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
							$state.go("spxfwq_detail",{'id':$stateParams.ywID});
						});
					}else if(data && data.type && data.type=="error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
					}
				})
			}else{
				var requestBody = {_module:'TT',_method:'submit_Spxfwq',roomId:roomId};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data && data.type && data.type=="success"){
						$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
							$state.go("spxfwq_list");
						});
					}else if(data && data.type && data.type=="error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
					}
				})
			}
		})
		
		//期现房图例选择：目前只有现房
		$('#filter-by-room-status .status').off("click").on('click', function(){
			var curItem = $(this);
			var xh = curItem.attr("xh");
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				$.each($(".roomDiv"), function(i, roomDiv) {
					var room = $.parseJSON($(roomDiv).attr("obj"));
					//当前两种图例，选中哪个图例哪个对象
					var tlObj = null;
					if($scope.init_show_qfxf == 1){//展示现房，则从现房图例中选择
						tlObj = $scope.selectedLd.qftlList[xh];
					}else{
						tlObj = $scope.selectedLd.xftlList[xh];
					}
					var selectedColor = tlObj.COLORCOL;
					var dynamicColor = $(roomDiv).attr("dynamicColor");
					if(room[selectedColor] == -1){//做过该业务的染成，该种业务颜色
						$(roomDiv).removeClass(dynamicColor);
						$(roomDiv).attr("dynamicColor",'status-'+selectedColor);
						$(roomDiv).addClass('status-'+selectedColor);
					}else{//没有做过该业务的染成，初始颜色
						$(roomDiv).removeClass(dynamicColor);
						if($scope.init_show_qfxf == 1){//展示现房，则从现房图例中选择
							$(roomDiv).attr("dynamicColor",'status-'+room.QFCOLOR);
							$(roomDiv).addClass('status-'+room.QFCOLOR);
						}else{
							$(roomDiv).attr("dynamicColor",'status-'+room.XFCOLOR);
							$(roomDiv).addClass('status-'+room.XFCOLOR);
						}
					}
				});
			}
		});
	});	

	$('.filter-room-status-toggle').on('click', function(){
		$('#filter-by-room-status').toggle();
	})	
	
	$ionicPopover.fromTemplateUrl("pop.html", {
		scope: $scope,
		animation: "slide-in-up",
		backdropClickToClose: true
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.showPop = function($event) {
		$scope.popover.show($event);
	};
	$scope.hidePop = function() {
		$scope.popover.hide();
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
	
	//房屋显示信息设置-重置
	$scope.roomInfosReset = function() {
		$(":checkbox").attr("checked", false);
	}
	
	//房屋显示信息设置-全选
	$scope.roomInfosAllCheck = function() {
		$(":checkbox").attr("checked", true);
	}
	
	//房屋显示信息设置-完成设置
	$scope.roomInfosSet = function(ifHidePop) {
		$(":checkbox").each(function(i,item){
			var showClassName = $(item).attr("referClass"); 
			var ifShow = $(item).attr("checked");
			if(ifShow){
				$scope[showClassName] = true;
			}else{
				$scope[showClassName] = false;
			}
		});
		if(ifHidePop){
			$scope.hidePop();
		}
	}
	
	//楼盘表信息初始化或刷新
	$scope.initLpb = function() {
		$scope.lpb = null;
		//默认期现房显示哪个:1现房，3现房
		$scope.init_show_qfxf = $stateParams.init_show_qfxf;
		if((typeof $stateParams.init_show_qfxf) != "number"){
			$scope.init_show_qfxf = 1;
		}
		if($scope.init_show_qfxf != 1 && $scope.init_show_qfxf != 3){
			$rootScope.mttAlert("初始化默认显示期现房参数错误！");
			return false;
		}
		if(typeof $stateParams.ywID == "number" && $stateParams.ywID > 0){
			$scope.selectBldroom = true;
		}
		//初始化某些显示设置
		$('#filter-by-room-status').css("display","none");
		$scope.roomInfosReset();
		$scope.roomInfosSet();
		
		
		var requestBody = {_module:'TT',_method:'init_one_xf_lpb_maps',id:$stateParams.id,buildId:$stateParams.buildId};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.lpb = data.content;
				$scope.selectedLd = $scope.lpb.oneLD;
				$scope.floorList = $scope.lpb.oneLD.floorList;
				$scope.selectedFloor = $scope.floorList[0];
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("获取初始化数据失败！");
			}
        })
	}
	
	//默认调用方法
	$scope.initLpb();
})

//商品现房买卖网签列表
.controller('spxfwqListController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
 	var listName = "spxfwq_list";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'spxfwq_getListByPage'};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'spxfwq_getListByPage'};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
    
    //图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if((!mastatus || mastatus == 1648010) && $rootScope._app_roleno == PUBLIC_JS_SQWTR){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'spxfwq_list'});
	};
    
    //详细
	$scope.xx = function(id) {
 		$rootScope.goRouteForBack("spxfwq_detail",{id:id},null);
 	}
	//合同详细
	$scope.ht = function(ywbh,mastatus){
		$state.go("spxfwqHT",{id:ywbh,mastatus:mastatus});
	}
	//下载合同
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(401,paramsObj);
    }
	//合同二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(401,paramsObj,"spxfwq_list");
    }
	
  //提交或回退
	$scope.tj= function(id,flowid,businessID,stanID,realTypeID,svalue,sortid,if_qianzi) {
		//签字校验
		if(svalue == 1 && (sortid == 5 || sortid == "5,8") && if_qianzi < 1){
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
		var requestBody = {_module:'TT',_method:'spxfwq_delete',id:id};
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

//商品现房买卖网签详细界面
.controller('spxfwqDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
	var id = $stateParams.id;
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
	})
	
	//判断是否为只读模式
	function isDisabled(){
		$(".ifEdit").attr("disabled","disabled");
		$scope.if_show_baocunButton = false;
		$scope.if_show_piPeiButton = false;
		if(realtypeid == 1648011 && bastatus == 0 && mastatus == 1648010 && $rootScope._app_roleno == PUBLIC_JS_SQWTR){
			$scope.if_show_baocunButton = true;
			$scope.if_show_piPeiButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	
	var MAX_RN = 0;
	
	//详细map查询
	$scope.xx = function(){
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'spxfwq_getSpxfwqDetail',id:id};
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
				$scope.ywDetails = data;
				MAX_RN = data.shourangfang.length;
				$("#jjfs").attr("value",data.yewu.JJFS);
				$("#gyfs").attr("value",data.yewu.GYFS);
				$("#fkfs").attr("value",data.yewu.FKFS);
				$("#spfwqhtlx").attr("value",data.yewu.SPFWQHTLX);
				
				$("#disjgyh").attr("value",data.yewu.YSZJJGYH);
				$("#disjgzh").attr("value",data.yewu.YSZJJGZH);
				
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
				stanid =   data.yewu.STANID;
				realtypeid = data.yewu.REALTYPEID;
				
				isDisabled();
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })
	}
	$scope.xx();
	
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
			var requestBody = {_module:'TT',_method:'deleteSpxfwqMsr',seqid:seqid};
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
	
	//监管银行信息
	$("#disjgyh").change(function(){
		$("#disjgzh").attr("value",$("#disjgyh").val());
	})
	
	//业务保存
	$scope.save_yw = function(){
		var id = $scope.ywDetails.yewu.ID;
		var jjfs = $("#jjfs").val();
		var gyfs = $("#gyfs").val();
		var fkfs = $("#fkfs").val();
		var spfwqhtlx = $("#spfwqhtlx").val();
		var cjje = $scope.ywDetails.yewu.CJJE;
		var sfkje = $scope.ywDetails.yewu.SFKJE;
		var description = $scope.ywDetails.yewu.BZ;
		
		if(g_checkIsNull(jjfs)){
			$rootScope.mttAlert("计价方式不能为空！");
			return false;
		}else if(g_checkIsNull(gyfs)){
			$rootScope.mttAlert("共有方式不能为空！");
			return false;
		}else if(g_checkIsNull(cjje)){
			$rootScope.mttAlert("成交总价不能为空！");
			return false;
		}else if(g_checkIsNull(fkfs)){
			$rootScope.mttAlert("付款方式不能为空！");
			return false;
		}else if(g_checkIsNull(sfkje)){
			$rootScope.mttAlert("首付款金额不能为空！");
			return false;
		}else if(g_checkIsNull(spfwqhtlx)){
			$rootScope.mttAlert("合同类型不能为空！");
			return false;
		}else if(sfkje > cjje){
			$rootScope.mttAlert("首付款金额不能大于成交总价！");
			return false;
		}
		
		var requestBody = {_module:'TT',_method:'saveSpxfwqYwInfo',id:id,description:description,jjfs:jjfs,gyfs:gyfs,fkfs:fkfs,spfwqhtlx:spfwqhtlx,cjje:cjje,sfkje:sfkje};
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
				$scope.ywDetails.shourangfang[index].ZIP=data.content.ZIP;
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
		var zip=$scope.ywDetails.shourangfang[index].ZIP;
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
		
		if(!g_checkIsNum(zip) || zip.length>6){
			$rootScope.mttAlert("邮政编码不合法！");
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
		
		var requestBody = {_module:'TT',_method:'saveSpxfwqSrf',id:id,stanid:stanid,qlrlb_ru:qlrlb_ru,dwgr:dwgr,qlrmc:qlrmc,
				address:address,zip:zip,phoneno:phoneno,qlrxh:qlrxh,gyfe:gyfe,seqid:seqid,gyfs:gyfs};
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
	$scope.save_fw = function(hashKey){
		var fwObj = g_ngrepeat_get($scope.ywDetails.fangwu,hashKey);
		var id=$scope.ywDetails.yewu.ID;
		var subno=fwObj.FWXH;
		var stringvalue1=fwObj.FJ;
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
	
	//删除房屋
	$scope.delete_bldroom = function(hashKey){
		var fwObj = g_ngrepeat_get($scope.ywDetails.fangwu,hashKey);
		var id=$scope.ywDetails.yewu.ID;
		var subno=fwObj.FWXH;
		var requestBody = {_module:'TT',_method:'spxfwq_delete_bldroom',id:id,subno:subno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				g_ngrepeat_removeArray($scope.ywDetails.fangwu,hashKey);
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	}
	
	$scope.spfwqSelectBldroom = function(){
		var id=$scope.ywDetails.yewu.ID;
		$state.go("xf_ld_list",{"ywID":id,'ywBackURL':"spxfwq_detail"});
	}
})

//商品现房买卖网签合同详细界面
.controller('spxfwqHTController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
	var id = $stateParams.id;
	var mastatus = $stateParams.mastatus;
	var ht_jjfs = null;
	var ht_fkfs = null;
	
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		isDisabled();
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
	})
	
	//判断是否为只读模式
	function isDisabled(){
		g_dateSelect('#zuLinQiShiRiQi', null, null);
		g_dateSelect('#zuLinZhongZhiRiQi', null, null);
		$scope.if_show_baocunButton = false;
		$scope.if_edit = true;
		if(mastatus == 1648010 && $rootScope._app_roleno == PUBLIC_JS_SQWTR){
			$scope.if_show_baocunButton = true;
			$scope.if_edit = false;
		}
	}
	
	var initHT = function(){
		var requestBody = {_module:'TT',_method:'spxfwq_getSpxfwqHTDetail',id:id,mastatus:mastatus};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				var result = data.content;
				$scope.chumairenss = result.chumairenss;
				$scope.kaifaqiyeweituodailiren = result.kaifaqiyeweituodailiren;
				$scope.hetongchumairenjingjijigou = result.hetongchumairenjingjijigou;
				$scope.hetongmaishouren = result.hetongmaishouren;
				$scope.diyitiao = result.diyitiao;
				$scope.diertiao = result.diertiao;
				$scope.disantiaos = result.disantiaos;
				$scope.disitiao_1 = result.disitiao_1;
				$scope.five_sql = result.five_sql;
				$scope.diwutiao = result.diwutiao;
				$scope.diliutiao_1 = result.diliutiao_1;
				$scope.diliutiao_2 = result.diliutiao_2;
				$scope.diliutiao_3 = result.diliutiao_3;
				$scope.diliutiao_4 = result.diliutiao_4;
				$scope.diliutiao_5 = result.diliutiao_5;
				$scope.diqitiao_1 = result.diqitiao_1;
				$scope.diqitiao_2 = result.diqitiao_2;
				$scope.diqitiao_3 = result.diqitiao_3;
				$scope.diqitiao_4 = result.diqitiao_4;
				$scope.diqitiao_5 = result.diqitiao_5;
				$scope.dibatiao = result.dibatiao;
				$scope.dijiutiao = result.dijiutiao;
				$scope.dishitiao = result.dishitiao;
				$scope.dishitiao_2 = result.dishitiao_2;
				$scope.dishiyitiao = result.dishiyitiao;
				$scope.dishiertiao = result.dishiertiao;
				$scope.dishiliutiao = result.dishiliutiao;
				$scope.dishiqitiao = result.dishiqitiao;
				$scope.dishibatiao = result.dishibatiao;
				$scope.diershitiao = result.diershitiao;
				$scope.diershiyitiao = result.diershiyitiao;
				$scope.diershiertiao = result.diershiertiao;
				$scope.diershisitiao = result.diershisitiao;
				$scope.diershiwu = result.diershiwu;
				$scope.diershiqitiao = result.diershiqitiao;
				$scope.diershijiutiao = result.diershijiutiao;
				$scope.htmb = result.htmb;
				$scope.mastatus = mastatus;
				ht_jjfs = result.diwutiao.JJFS;
				ht_fkfs = result.diwutiao.FKFS;
				isDisabled();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("获取合同详细信息失败！");
			}
			
        })
	}
	initHT();
	
	$scope.tongBu = function(){
		var ctid = $scope.diwutiao.HTMB_ID;
		if(!ctid){
			$rootScope.mttAlert("未找到当前房屋所在楼栋的合同模板，请手动录入！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'spfwq_ht_tongbu',id:id,ctid:ctid,baseactivityid:164801};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				initHT();
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	}
	//第五条
	$scope.save_five = function(){
		var obj = $scope.five_sql;
		obj.RENT1 = $("#zuLinQiShiRiQi").val();
		obj.RENT4 = $("#zuLinZhongZhiRiQi").val();
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_five',id:id,obj:obj};
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
	//第六条
	$scope.save_six = function(){
		var obj = $scope.diwutiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_six',id:id,obj:obj};
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
	//第七条
	$scope.save_seven = function(){
		var obj = $scope.diliutiao_5;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_seven',id:id,obj:obj};
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
	//第八条 TODO
	$scope.save_eight = function(){
		var obj_1 = $scope.diqitiao_1;
		var obj_2 = $scope.diqitiao_2;
		var obj_3 = $scope.diqitiao_3;
		var obj_4 = $scope.diqitiao_4;
		var obj_5 = $scope.diqitiao_5;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_eight',id:id,obj_1:obj_1,obj_2:obj_2,obj_3:obj_3,obj_4:obj_4,obj_5:obj_5,ht_fkfs:ht_fkfs};
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
	//8
	$scope.save_nine = function(){
		var obj = $scope.dibatiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_nine',id:id,obj:obj};
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
	//9
	$scope.save_ten = function(){
		var obj = $scope.dijiutiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_ten',id:id,obj:obj};
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
	//10
	$scope.save_eleven = function(){
		var obj = $scope.dishitiao;
		var obj_2 = $scope.dishitiao_2;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_eleven',id:id,obj:obj,obj_2:obj_2};
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
	//11
	$scope.save_twelve = function(){
		var obj = $scope.dishiyitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_twelve',id:id,obj:obj};
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
	//12
	$scope.save_thirteen = function(){
		var obj = $scope.dishiertiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_thirteen',id:id,obj:obj};
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
	//16
	$scope.save_forteen = function(){
		var obj = $scope.dishiliutiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_forteen',id:id,obj:obj};
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
	//17
	$scope.save_fifteen = function(){
		var obj = $scope.dishiqitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_fifteen',id:id,obj:obj};
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
	//18
	$scope.save_sixteen = function(){
		var obj = $scope.dishibatiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_sixteen',id:id,obj:obj};
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
	//20
	$scope.save_seventeen = function(){
		var obj = $scope.diershitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_seventeen',id:id,obj:obj};
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
	//21
	$scope.save_eighteen = function(){
		var obj = $scope.diershiyitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_eighteen',id:id,obj:obj};
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
	//22
	$scope.save_ninteen = function(){
		var obj = $scope.diershiertiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_ninteen',id:id,obj:obj};
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
	//24
	$scope.save_twenty_one = function(){
		var obj = $scope.diershisitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_twenty_one',id:id,obj:obj};
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
	//25
	$scope.save_twenty_two = function(){
		var obj = $scope.diershiwu;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_twenty_two',id:id,obj:obj};
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
	//27
	$scope.save_twenty_four = function(){
		var obj = $scope.diershiqitiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_twenty_four',id:id,obj:obj};
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
	//29
	$scope.save_twenty_six = function(){
		var obj = $scope.diershijiutiao;
		var requestBody = {_module:'TT',_method:'save_spfwq_ht_twenty_six',id:id,obj:obj};
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