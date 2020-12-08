/**
 * 资金监管-银行收款模块
 */
angular.module('controller_yhsk', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

//查询
.controller('wyfkCxController',function($rootScope,$scope,$state,$http,MyFactoryNew){
	var clfwqhtbh = "";
	
	//重置
    $scope.clear = function(){
		$("#clfwqhtbh").val("");
		$rootScope.clfwqhtbh = "";
    }
    //查询
    $scope.search = function(){
    	clfwqhtbh = $("#clfwqhtbh").val().trim();
    	if(!clfwqhtbh){
    		$rootScope.mttAlert("输入框不能为空!");
            return false;
    	}
    	clfwqhtbh = clfwqhtbh.replace(/（/g,"(");
    	clfwqhtbh = clfwqhtbh.replace(/）/g,")");
    	
    	$rootScope.clfwqhtbh = clfwqhtbh;
    	$state.go('zjtgxy');
    }
})

//资金监管协议
.controller('zjtgxyController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	var clfwqhtbh = $rootScope.clfwqhtbh;
	
	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zjjg_tgxyByPage',clfwqhtbh:clfwqhtbh};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zitgxyList",true,ifFromPullRefresh);
	}
	
	$scope.doRefresh();
	
	//加载更多
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zjjg_tgxyByPage',clfwqhtbh:clfwqhtbh};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zitgxyList",false);
	}
	
	$scope.wyfk = function(zjtg) {
		if(!zjtg.TRANSNO){
			$rootScope.mttAlert("操作失败：托管协议号没有内容,请联系房管局工作人员进行核实！");
			return false;
		}else if(!zjtg.DBJG){
			$rootScope.mttAlert("操作失败：担保机构没有内容,请联系房管局工作人员进行核实！");
			return false;
		}else if(!zjtg.JGYH){
			$rootScope.mttAlert("操作失败：监管银行没有内容,请联系房管局工作人员进行核实！");
			return false;
		}else if(!zjtg.JGZH){
			$rootScope.mttAlert("操作失败：监管账号没有内容,请联系房管局工作人员进行核实！");
			return false;
		}else if(!zjtg.SELLER){
			$rootScope.mttAlert("操作失败：卖方没有内容,请联系房管局工作人员进行核实！");
			return false;
		}else if(!zjtg.BUYER){
			$rootScope.mttAlert("操作失败：买方没有内容,请联系房管局工作人员进行核实！");
			return false;
		}
		$scope.searchPopup = $ionicPopup.show({
		//TODO
		templateUrl:baseurl+'/static/tt/htm/yhsk/qrPop.html',
		title:'托管信息确认',
		scope: $rootScope,
		backdropClickToClose:true,
		cssClass:'form-popup',
		animation: 'slide-in-up',
		buttons:[{
					text: '<b>取 消</b>',
					type: 'button-light',
					onTap: function(e) {
						$scope.searchPopup.close();
					}
				},
				{
					text: '<b>确 定</b>',
					type: 'button-positive',
					onTap: function(e) {
						var requestBody = {_module:'TT',_method:'zjjg_wyfk',zjtg:zjtg};
						MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
							if(data && data.type && data.type=="success"){
								$rootScope.mttAlert(data.content,function(){
									$state.go('yhsk');
								});
							}else if(data && data.type && data.type=="error"){
								$rootScope.mttAlert(data.content);
							}else{
								$rootScope.mttAlert(PUBLIC_OPER_ERROR);
							}
				        })
					}
				}]
		})
	}
		
})

//资金监管-银行收款
.controller('yhskController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew,MyFactory){

	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zjjg_yhskByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"yhskList",true,ifFromPullRefresh);
	}
	
	$scope.doRefresh();
	
	//加载更多
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zjjg_yhskByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"yhskList",false);
	}
	
	//详细
	$scope.xx = function(clfwqid,sortid) {
		$rootScope.goRouteForBack("clfwq_detail",{id:clfwqid,sortid:sortid},null);
	}
	
	//保存
	$scope.save = function(yhskObj) {
		var requestBody = {_module:'TT',_method:'zjjg_yhsk_save',yhskObj:yhskObj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.doRefresh();
				$rootScope.mttAlert("保存成功,已根据监管方式更新了监管金额,请确认");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR); 
			}
        })
	}
	
	//申请提交
	$scope.sqtj= function(id,mastatus) {
		var requestBody = {_module:'TT',_method:'zjjg_yhsk_sqtj',id:id,mastatus:mastatus};
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
	
	//支付回退
	$scope.zfht= function(yhsk) {
		var requestBody = {yhsk:yhsk,_orgno:g_getOrgno(),_grqch:g_getLoginName(),_zjhm:g_getLoginIdno()};
		MyFactory.getHttpRequest( baseurl + '/bankReceipt/bankReceiptBack', 'POST', null, requestBody).then(function (data) {
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
		var requestBody = {_module:'TT',_method:'zjjg_yhsk_delete',id:id};
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
	
	//支付页面
	$scope.zhifu = function(yhsk){
		$state.go("zfym",{yhsk:yhsk});
	}
	
	//办结
	$scope.banjie = function (yhsk){
		var requestBody = {yhsk:yhsk,_orgno:g_getOrgno(),_grqch:g_getLoginName(),_zjhm:g_getLoginIdno()};
		MyFactory.getHttpRequest( baseurl + '/bankReceipt/bankReceiptDone', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(data.content,function(){
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

//资金监管-支付信息
.controller('zfymController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$http,$ionicPopover,MyFactory,MyFactoryNew){
	
	$scope.zfymnr=$stateParams.yhsk;
	
	function isCaoZuo(queryData){
		$scope.isShow = false;
		if($scope.zfymnr && ($scope.zfymnr.MASTATUS == 3921112) && ($scope.zfymnr.BASTATUS == 0) && ($scope.zfymnr.SORTID == 5)){
			$scope.isShow = true;
		}
		
		if(queryData && queryData.tranAmount){
			if(queryData.tranAmount == $scope.zfymnr.JGJE){
				$scope.isShow = false;
			}
		}
	}
	
	$scope.dorefresh = function(){
		var requestBody = {zfymnr:$scope.zfymnr};
		MyFactory.getHttpRequest( baseurl + '/bankReceipt/queryOrderTrans', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.queryZH = data.content;
				isCaoZuo(data.content);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	$scope.dorefresh();
	$scope.fukuan = function(){
		$scope.searchPopup = $ionicPopup.show({
			templateUrl:baseurl+'/static/tt/htm/yhsk/qrPop.html',
			title:'支付信息确认',
			scope: $rootScope,
			backdropClickToClose:true,
			cssClass:'form-popup',
			animation: 'slide-in-up',
			buttons:[{
						text: '<b>取 消</b>',
						type: 'button-light',
						onTap: function(e) {
							$scope.searchPopup.close();
						}
					},
					{
						text: '<b>确 定</b>',
						type: 'button-positive',
						onTap: function(e) {
							$scope.searchPopup.close();
							if($scope.zfymnr.JGJE){
								$scope.zfymnr.JGJE = returnFloat($scope.zfymnr.JGJE);
							}
							//打开调用APP支付的中间界面
							$rootScope.goOutSpecialURL(baseurl+"/bankReceipt/b2cmobile?CONTRACTNO="+$scope.zfymnr.CONTRACTNO+"&PIPELINENO="+$scope.zfymnr.PIPELINENO+"&JGJE="+$scope.zfymnr.JGJE,{yhsk:$scope.zfymnr});
						}
					}]
			})
	}
	
})
