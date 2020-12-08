angular.module('controller_org', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 单位注册和审核模块
 */

//单位注册详细
.controller('orgRegListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){

	var listName = "orgReglist";
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'getOrgRefRegListByPage',roleno:g_getRoleno(),czz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'getOrgRefRegListByPage',roleno:g_getRoleno(),czz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh(false);
	
})

//单位注册详细
.controller('orgRegDetailController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	
	$scope.getOrgIn = function(regid) {
		var requestBody = null;
		if(regid && regid != '0'){
			$scope.REGID = regid;
			requestBody = {_module:'TT',_method:'getRegOrginfo',regid:regid,REGCZZ:g_getLoginPhoneno()};
		}else{
			requestBody = {_module:'TT',_method:'getRegOrginfo',regid:"0",REGCZZ:g_getLoginPhoneno()};
		}
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.selfOrgsList){
				$scope.selfOrgsList = data.selfOrgsList;
				$scope.opersList = data.opersList;
				$scope.orgRegPhonesList = data.orgRegPhonesList;
				if($scope.opersList.length == 0){
					var operObj = {ROLENO:'',CZZPHONE:g_getLoginPhoneno()};
					$scope.opersList.push(operObj);
				}
				if($scope.REGID){
					$scope.orgMap = $scope.selfOrgsList[0];
				}
				//清除selfDom
				$(".selfDom").remove();
				$rootScope.$broadcast('scroll.refreshComplete');
				if(data.selfOrgsList.length == 0){
					$rootScope.mttAlert("您不属于任何单位或没有查询到您关联的有效单位信息，没有可以操作的单位下拉列表！");
				}
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	}
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		if ($scope.orgMap && $scope.orgMap.BASTATUS == -1 && g_getRoleno() == PUBLIC_JS_GLY){//办结时管理员可以维护人员
			$(".ifEdit").removeAttr("disabled");
			$("a[class*='addDel']").show();
		}else if(!$scope.REGID){//首次保存前
			$(".firstEdit").removeAttr("disabled");
			$(".ifEdit").attr("disabled","disabled");
			$("a[class*='addDel']").hide();
		}else{
			$(".firstEdit").attr("disabled","disabled");
			$(".ifEdit").attr("disabled","disabled");
			$("a[class*='addDel']").hide();
		}
	});
	
	$scope.getOrgIn($stateParams.id);
	
	//添加操作人员
	$scope.addOper = function() {
		$scope.opersList[$scope.opersList.length] = {"ROLENO" : "",CZZPHONE:""};
	}
	
	//删除操作人员
	$scope.delOper = function(hashKey) {
		g_ngrepeat_removeArray($scope.opersList, hashKey);
	};
	
	//首次保存
	$scope.regOrg = function() {
		
		if(!$scope.orgMap || g_checkIsNull($scope.orgMap.ORGANIZENO)){
			$rootScope.mttAlert("关联注册机构不能为空！");
			return false;
		}
		
		var firstRoleno = $("#selectRoleNo").val();
		var firstCzzphone = $("#ybczy").val();
		if(g_checkIsNull(firstRoleno,'select')){
			$rootScope.mttAlert("角色信息不能为空！");
			return false;
		}
		if(g_checkIsNull(firstCzzphone)){
			$rootScope.mttAlert("操作人员手机号不能为空！");
			return false;
		}		
		var opersList = $scope.opersList;
		
		var requestBody = {_module:'TT',_method:'orgRefReg',orgno:$scope.orgMap.ORGANIZENO,regappczz:g_getLoginPhoneno(),operList:opersList};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
					$scope.getOrgIn(data.content);
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	};
	
	//更新保存
	$scope.updOrg = function(regid) {
		var opersList = $scope.opersList;
		for(i=0; i<opersList.length; i++){
			var operObj = opersList[i];
			if(g_checkIsNull(operObj.ROLENO)){
				$rootScope.mttAlert("角色信息不能为空！");
				exitFlag = true;
				return false;
			}
			if(g_checkIsNull(operObj.CZZPHONE)){
				$rootScope.mttAlert("操作人员手机号不能为空！");
				exitFlag = true;
				return false;
			}
		}
		
		var requestBody = {_module:'TT',_method:'orgRefRegUpdOpers',regid:regid,regappczz:$scope.orgMap.REGCZZ,operList:opersList};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
					$scope.getOrgIn(regid);
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	};	
	
	//删除
	$scope.delOrg = function(id) {
		var requestBody = {_module:'TT',_method:'orgRefRegDel',regid:id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
					$rootScope.backKey();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	};	
	
	//提交或回退
	$scope.tjOrg = function(id,bz,zt,old_bz,old_zt) {
		var requestBody = {_module:'TT',_method:'orgRefRegUpd',regid:id,czz:g_getLoginPhoneno(),bz:bz,zt:zt,old_bz:old_bz,old_zt:old_zt};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
					$scope.getOrgIn(id);
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	};
	
})

//单位注册-本单位人员角色维护
.controller('orgRegBzxOperController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	
	var regid = 1;
	
	$scope.getOrgIn = function() {
		var requestBody = {_module:'TT',_method:'getBzxOpersInfo',regid:regid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				$scope.orgMap = data;
				if(!$scope.orgMap.opersList){
					var opersList = new Array();
					var operObj = {ROLENO:"",CZZPHONE:""};
					opersList.push(operObj);
					$scope.orgMap.opersList = opersList;
				}
				//清除selfDom
				$(".selfDom").remove();
				$rootScope.$broadcast('scroll.refreshComplete');
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	}
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		if ($scope.orgMap.BASTATUS == -1){//办结时才可以修改维护
			$(".ifEdit").removeAttr("disabled");
			$(".ifEdit2").removeAttr("disabled");
			$("a[class*='addDel']").show();
		}else{
			$(".ifEdit").attr("disabled","disabled");
			$("a[class*='addDel']").hide();
		}
	});
	
	$scope.getOrgIn();
	
	var i = 1;
	
	//添加操作人员
	$scope.addOper = function() {
		$scope.orgMap.opersList[$scope.orgMap.opersList.length] = {"ROLENO" : "",CZZPHONE:""};
	}
	
	//删除操作人员
	$scope.delOper = function(hashKey) {
		g_ngrepeat_removeArray($scope.orgMap.opersList, hashKey);
	};
	
	//更新保存
	$scope.updOrg = function(regid) {
		var regczz_flag;
		var opersList = $scope.orgMap.opersList;
		for(i=0; i<opersList.length; i++){
			var operObj = opersList[i];
			if(g_checkIsNull(operObj.ROLENO)){
				$rootScope.mttAlert("角色信息不能为空！");
				exitFlag = true;
				return false;
			}
			if(g_checkIsNull(operObj.CZZPHONE)){
				$rootScope.mttAlert("操作人员手机号不能为空！");
				exitFlag = true;
				return false;
			}
			if($scope.orgMap.REGCZZ == operObj.CZZPHONE){
				regczz_flag = true;
			}
		}
		
		//办结后，可以更改注册维护人，校验也需加上
		if(!regczz_flag && $scope.orgMap.BASTATUS == -1){
			$rootScope.mttAlert("注册维护人必须是该单位移动端操作人员中其中一个！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'orgRefRegUpdOpers',regid:regid,regappczz:$scope.orgMap.REGCZZ,operList:opersList};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
					$scope.getOrgIn(regid);
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })
	};	
	
})
