angular.module('controller_lpbcx', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 楼盘表查询模块
 */
//待签房屋查询
.controller('lpbcxController',function($rootScope,$scope,$state,$http,MyFactoryNew){
	var brlocation = "";
	
	//重置
    $scope.clear = function(){
		$("#brlocation").val("");
		$rootScope.dqfw_brlocation = "";
    }
    //查询
    $scope.search = function(){
    	brlocation = $("#brlocation").val().trim();
    	if(!brlocation){
    		$rootScope.mttAlert("输入框不能为空!");
            return false;
    	}
    	brlocation = brlocation.replace(/（/g,"(");
    	brlocation = brlocation.replace(/）/g,")");
    	
    	$rootScope.dqfw_brlocation = brlocation;
    	$state.go('ldxx_list');
    }
})
//楼栋-列表页面
.controller('lpbcxListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	var brlocation = $rootScope.dqfw_brlocation;
	//console.log(brlocation);
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
		$state.go('lpbxx_one',{'id':'','buildId':buildId,'init_show_qfxf':1,'backURL':'ldxx_list','ywID':$stateParams.ywID,'ywBackURL':$stateParams.ywBackURL});
	}
	
	var listName = "lpbcx_list";
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'lpbcx_getldListByPage',numPerPage_self:99,brlocation:brlocation,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'lpbcx_getldListByPage',numPerPage_self:99,brlocation:brlocation,orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//楼盘表
//（注意期房、现房业务配置颜色CSS文件中：颜色来自数据库，不同环境可能配置不尽相同）
.controller('lpbxxOneController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
	
	 //       var index_ld = 0;
	var index_floor = 0;
	//是否可操作房屋
	$scope.if_oper_room = $stateParams.if_oper_room;
	if((typeof $stateParams.if_oper_room) != "boolean"){
		$scope.if_oper_room = false;
	}
	$scope.floorList = null;
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		//楼栋选择
		$('.loupanbiao-loudong').off("click").on('click', function(){
			var curItem = $(this);
//			index_ld = curItem.attr("xh");
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
		

		/*if($scope.if_oper_room){
			//房屋选中或取消
			$('.loupanbiao-louceng-xiaoshouceng-detail .col .colMainInfo').off("click").on('click', function(){
				var curItem = $(this).parent();
				var index_room = curItem.attr("xh");
				var isSelected = 0;
				var fwid = curItem.attr("id");
				if (curItem.hasClass('selected')) {//取消选中
					isSelected = 0;
				}else{//选中
					isSelected = 1;
				}
				var yw = $scope.lpb.yewu;
				var requestBody = {_module:'TT',_method:'lpb_changeFW',ID:yw.ID,pmBldroomID:fwid,isSelected:isSelected+"",pmMainTable:yw.ACTIVETABLENAME,pmStanID:yw.STANID,pmRealTypeID:yw.REALTYPEID};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data && data.type && data.type=="success"){
						curItem.toggleClass('selected');
						$scope.lpb.ldList[index_ld].floorList[index_floor].roomList[index_room].ISSELECTED = isSelected;
						$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					}else if(data && data.type && data.type=="error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
					}
				})
			})
		}*/
		
		//期现房图例选择：目前只有期房
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
					if($scope.init_show_qfxf == 1){//展示期房，则从期房图例中选择
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
						if($scope.init_show_qfxf == 1){//展示期房，则从期房图例中选择
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
		//默认期现房显示哪个:1期房，3现房
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
		
		
		var requestBody = {_module:'TT',_method:'init_lpbcx_maps',id:$stateParams.id,buildId:$stateParams.buildId,roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
		
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
