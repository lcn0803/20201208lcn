/**
 * 物理返回键及业务界面返回箭头功能处理
 */
angular.module('backKey', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

.run(function($rootScope, $ionicPlatform, $state, $stateParams, $ionicHistory, $ionicPopup, $cordovaKeyboard, $timeout, $ionicPopover) {

	/**
	 * 公共跳转路由且目标路由需要返回
	 * @param routerName 目标路由
	 * @param goRouteParamsObj 目标路由请求参数
	 * @param backURLParamsObj 返回当前路由请求参数
	 */
	$rootScope.goRouteForBack = function(routerName,goRouteParamsObj,backURLParamsObj){
		if(!goRouteParamsObj){
			goRouteParamsObj == null;
		}
		if(!backURLParamsObj){
			backURLParamsObj == null;
		}
		var current = $state.current;
		//定义目标页面返回URL：默认为当前页面。
		$rootScope[routerName+"_backURL"] = current.name;
		//定义目标页面返回URL的参数对象
		$rootScope[routerName+"_backURLParams"] = backURLParamsObj;
		//进行跳转
		$state.go(routerName,goRouteParamsObj);
	}	
	
	/**
	 * 来自NTTAPP系统-公共跳转路由且目标路由需要返回
	 * @param routerName 目标路由
	 * @param goRouteParamsObj 目标路由请求参数
	 * @param backRouteName 返回路由
	 */
	$rootScope.goRouteForBack_NTTAPP = function(routerName,goRouteParamsObj,backRouteName){
		window.localStorage.setItem("SYS_NTTAPP_backURL_"+routerName,backRouteName);
		//进行本系统内部跳转
		if(!goRouteParamsObj){
			goRouteParamsObj == null;
		}
		$state.go(routerName,goRouteParamsObj);
	}	
	
	/**
	 * 公共返回键处理
	 */
	$rootScope.backKey = function(){//禁止传参数
		var current = $state.current;
		var stateName = current.name;
		
		//当前页面是否存在系统级NTTAPP全局的返回对象
		if(g_getSYS_NTTAPP_backURL(stateName)){
			if($rootScope.PUBLIC_CLIENT_WECHAT == true){//微信时直接跳转
				var NTTAPP_backURL = $rootScope._param_url_tokenLogin_NTTAPP+"routeName="+g_getSYS_NTTAPP_backURL(stateName)+"&token="+g_getTokenNTTAPP()+"";
				console.log("NTTAPP系统级返回URL="+NTTAPP_backURL);
				//返回前清除登录信息
				window.localStorage.clear();
				window.location.href = NTTAPP_backURL;
			}else{
				$rootScope.mttAlert('请点击上方关闭提示文字，进行返回！')
			}
			return false;
		}		
		
		//当前页面是否有全局的返回对象及其参数
		if($rootScope[stateName+"_backURL"]){
			var root_BackURL = $rootScope[stateName+"_backURL"];
			var root_BackURLParams = $rootScope[stateName+"_backURLParams"];
			console.log("全局的返回对象及其参数="+root_BackURL);
			console.log("全局的返回对象及其参数="+JSON.stringify(root_BackURLParams));
			//返回前置空
			$rootScope[stateName+"_backURL"] = null;
			$rootScope[stateName+"_backURLParams"] = null;
			$state.go(root_BackURL, root_BackURLParams);
			return false;
		}
		
		if(current.backKey_fixed) {//固定类返回
			console.log("固定类返回="+current.backKey_fixed);
			if("fw_list" == stateName){
				$state.go(current.backKey_fixed, {id:$stateParams.ywbh});
			}else if("fw_detail" == stateName){
				$state.go(current.backKey_fixed, {ywbh:$stateParams.ywbh,ldxh:$stateParams.ldxh})
			}else if("zxzx" == stateName){
				$rootScope.zxzx_backKey(current.backKey_fixed);
			}else{
				$state.go(current.backKey_fixed);
			}
//			$state.go(current.backKey_fixed);
		} else if(current.backKey_dynamic) {//动态类返回
			console.log("动态类返回="+current.backKey_dynamic+"【】"+$stateParams[current.backKey_dynamic]);
			$state.go($stateParams[current.backKey_dynamic]);
		} else if(current.backKey_menu) {//业务主菜单返回
			console.log("业务主菜单返回="+current.backKey_menu+"【动态值："+$rootScope["backurl_menu_"+stateName]+"】【默认值："+current.backKey_menu+"】");
			if($rootScope["backurl_menu_"+stateName]){
				$state.go($rootScope["backurl_menu_"+stateName]);
			}else{
				$state.go(current.backKey_menu);
			}
		} else if(current.backKey_checkListNum) {//详细界面按list数量不同返回也不同
			console.log("校验list数量进行不同返回"+current.backKey_checkListNum);
			if($rootScope[current.backKey_checkListNum] && $rootScope[current.backKey_checkListNum].length > 1){
				console.log(current.listRoute);
				$state.go(current.listRoute);
			}else{
				console.log(current.menuRoute);
				$state.go(current.menuRoute);
			}
		} else if(current.backKey_complicated) {//复杂类返回,分不同情况进行处理
			if("editPics" == stateName){//公共拍照界面
				if($stateParams.backURL && $stateParams.backURL == "wdyy_detail"){
		    		$state.go("wdyy_detail",{id:$stateParams.id,backUrl:$rootScope.wdyyDetail_BackUrl});
		    	}else if($stateParams.backURL && $stateParams.backURL == "lpxj_detail"){
		    		$state.go("lpxj_detail",{id:$stateParams.id});
		    	}else{
		    		$state.go($stateParams.backURL);
		    	}
			}else if("showQRCode" == stateName){//公共二维码展示
				$state.go($rootScope.showQRCode_backURL);
			}else if("ywDetailMaps" == stateName){//公共业务详细
				$state.go($stateParams.backURL);
			}else if("yjfk_editPics" == stateName){//意见反馈
				$state.go($stateParams.backURL,{id:$stateParams.id});	
			}else if("yjfk_editVoice" == stateName){//意见反馈编辑视频
				$state.go($stateParams.backURL,{id:$stateParams.id});
			}else if("yjfk_editVideo" == stateName){//意见反馈编辑语音
				$state.go($stateParams.backURL,{id:$stateParams.id});
			}else if("lpb" == stateName){//楼盘表
				$state.go($stateParams.backURL,{id:$stateParams.id});
			}else if("ysxkxj_dxld_list" == stateName || "xsba_dxld_list" == stateName || "zjgcdywq_dxld_list" == stateName || "htmbgl_dxld_list" == stateName){//1.预售许可新建-待选楼栋；2.现售备案-待选楼栋;3.在建工程抵押网签-待选楼栋;4.合同模板管理-待选楼栋
				if(typeof $stateParams.id == "number" && $stateParams.id > 0){
					$state.go($stateParams.backURL,{id:$stateParams.id});
				}else{
					$state.go(current.backKey_when_fixed);
				}
			}else if("lpb_one" == stateName || "xf_lpb_one" == stateName){//单个楼-楼盘表
				$state.go($stateParams.backURL,{'ywID':$stateParams.ywID,'ywBackURL':$stateParams.ywBackURL});
			}else if("ld_list" == stateName || "xf_ld_list" == stateName){//楼群
				if(typeof $stateParams.ywID == "number" && $stateParams.ywID > 0){
					$state.go($stateParams.ywBackURL,{id:$stateParams.ywID});
				}else{
					$state.go(current.backKey_when_fixed);
				}
			}else{
				console.log("未配置返回处理！");
			}
		} else {//其他类
			history.go(-1);
		}
	}	
	
	$ionicPlatform.registerBackButtonAction(function(e) {
		//阻止默认的行为  
		e.preventDefault();
		// 退出提示框  
		function showConfirm() {
			var servicePopup = $ionicPopup.show({
				title: '提示',
				subTitle: '你确定要退出应用吗？',
				scope: $rootScope,
				buttons: [{
						text: '取消',
						type: 'button-clear button-calm',
						onTap: function() {
							return 'cancel';
						}
					},
					{
						text: '确认',
						type: 'button-clear button-calm border-left',
						onTap: function(e) {
							return 'active';
						}
					}
				]
			});
			servicePopup.then(function(res) {
				if(res == 'active') {
					// 退出app  
					ionic.Platform.exitApp();
				}
			});
		}
		// 判断当前路由是否为各个导航栏的首页，是的话则显示退出提示框  
		if($cordovaKeyboard.isVisible()) {
			$cordovaKeyboard.close();
		} else {
			if($state.current.name == 'index') {//根路由
				showConfirm();
			} else {
				$rootScope.backKey();
			}
		}
	}, 101); //101优先级常用于覆盖‘返回上一个页面’的默认行为  	
})