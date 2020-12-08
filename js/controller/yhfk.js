/**
 * 资金监管-银行付款模块
 */
angular.module('controller_yhfk', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])

//查询
.controller('sqfkCxController',function($rootScope,$scope,$state,$http,MyFactoryNew){
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
    	$state.go('fkzjtgxy');
    }
})

//资金监管协议
.controller('fkzjtgxyController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	var clfwqhtbh = $rootScope.clfwqhtbh;
	
	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zjjg_fktgxyByPage',clfwqhtbh:clfwqhtbh};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"fkzitgxyList",true,ifFromPullRefresh);
	}
	
	$scope.doRefresh();
	
	//加载更多
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zjjg_fktgxyByPage',clfwqhtbh:clfwqhtbh};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"fkzitgxyList",false);
	}
	
	$scope.sqfk = function(zjtg) {
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
		}else if(!zjtg.AMOUNT){
			$rootScope.mttAlert("操作失败：监管金额没有内容,请联系房管局工作人员进行核实！");
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
						var requestBody = {_module:'TT',_method:'zjjg_sqfk',zjtg:zjtg};
						MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
							if(data && data.type && data.type=="success"){
								$rootScope.mttAlert(data.content,function(){
									$state.go('yhfk');
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

//资金监管-银行付款
.controller('yhfkController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zjjg_yhfkByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"yhfkList",true,ifFromPullRefresh);
	}
	
	$scope.doRefresh();
	
	//加载更多
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zjjg_yhfkByPage'};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"yhfkList",false);
	}
	
	//详细
	$scope.xx = function(clfwqid,sortid) {
		$rootScope.goRouteForBack("clfwq_detail",{id:clfwqid,sortid:sortid},null);
	}
	
	//删除
	$scope.del = function(id) {
		var requestBody = {_module:'TT',_method:'zjjg_yhfk_delete',id:id};
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
	
	//申请提交
	$scope.sqtj= function(id,mastatus) {
		var requestBody = {_module:'TT',_method:'zjjg_yhfk_sqtj',id:id,mastatus:mastatus};
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
	
	//APP买方审核
	$scope.appShenHe = function(id,mastatus,contractno){
		$scope.searchPopup = $ionicPopup.show({
			templateUrl:baseurl+'/static/tt/htm/yhfk/qrPop.html',
			title:'APP买方审核确认',
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
							var requestBody = {_module:'TT',_method:'zjjg_yhfk_mfsh',id:id,mastatus:mastatus,contractno:contractno};
							MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
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
					}]
			})
	}
	
	//买方审核回退
	$scope.appmfht= function(id,mastatus) {
		var requestBody = {_module:'TT',_method:'zjjg_yhfk_zfht',id:id,mastatus:mastatus};
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
