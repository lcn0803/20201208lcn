angular.module('controller_pzspqx', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 配置审批权限
 */

//业务审批员
.controller('ywspyController',function($rootScope,$scope,$state,$stateParams,$http,MyFactoryNew){
	
	$scope.ywspqx = function(role,roleName){
		$rootScope.ywspRole = role;
		$rootScope.ywspRoleName = roleName;
		$rootScope.goRouteForBack("spyhyw",null,null);
	}
})

//业务审批员
.controller('spyhywController',function($rootScope,$scope,$state,$stateParams,$http,MyFactoryNew){
	
	$scope.doRefresh = function(){
		var requestBody = {_module:'TT',_method:'pzspqx_initYwspQx',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				var rel = data.content;
				for (var i=0;i<rel.length;i++){
					$("#xz"+rel[i].BASEACTIVITYID).addClass('checked');
					$("#xz"+rel[i].BASEACTIVITYID).prev().addClass('ywczColor');
				}
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	$scope.doRefresh();
	
	$scope.selyw = function(obj) {
		if($("#xz"+obj.SJZDBCZ).hasClass("checked")){
			var requestBody = {_module:'TT',_method:'pzspqx_delYwspQx',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole,baseactivityid:obj.SJZDBCZ,baseactivityname:obj.SJZDXSZ};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$("#xz"+obj.SJZDBCZ).removeClass('checked');
					$("#xz"+obj.SJZDBCZ).prev().removeClass('ywczColor');
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}else{
			var requestBody = {_module:'TT',_method:'pzspqx_addYwspQx',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole,baseactivityid:obj.SJZDBCZ,baseactivityname:obj.SJZDXSZ};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$("#xz"+obj.SJZDBCZ).addClass('checked');
					$("#xz"+obj.SJZDBCZ).prev().addClass('ywczColor');
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	
	$scope.selbz = function(obj){
		if($("#xz"+obj.SJZDBCZ).hasClass("checked")){
			$rootScope.ywspYwdlNo = obj.SJZDBCZ;
			$rootScope.ywspYwdlName = obj.SJZDXSZ;
			$rootScope.goRouteForBack("spyhywhbz",null,null);
		}else{
			$rootScope.mttAlert("请先给当前角色配置操作此业务的权限！");
		}
	}
})
	
//审批员,业务信息与步骤
.controller('spyhywhbzController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	$scope.doRefresh = function(){
		var requestBody = {_module:'TT',_method:'pzspqx_initQxBz',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole,baseactivityid:$rootScope.ywspYwdlNo};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				var rel = data.content.flowBzList;
				for (var i=0;i<rel.length;i++){
					var arr = rel[i];
					var lc = "<div class='title'><h3><span>"+arr[0].FLOWNAME+"</span></h3></div>" +
							"<p class='tips' style='padding: 10px 10px 0px;'>&nbsp;&nbsp;&nbsp;&nbsp;此流程适用的业务细类有："+arr[0].REALTYPENAME+"</p>";
					for(var j=0;j<arr.length;j++){
						var bz = "<div class='data'><label class=''>"+arr[j].BUSINESSNAME+"</label>" +
								"<span id='xz-"+arr[j].FLOWID+"-"+arr[j].BUSINESSID+"-"+arr[j].BUSINESSNAME +"' class='gou' >√</span></div>";
						lc+=bz;
					}
					$("#ztObject").append(lc);
				}
				
				var lcjd = data.content.jsjdList;
				for (var i=0;i<lcjd.length;i++){
					$("#xz-"+lcjd[i].FLOWID+"-"+lcjd[i].BUSINESSID+"-"+lcjd[i].BUSINESSNAME).addClass('checked');
					$("#xz-"+lcjd[i].FLOWID+"-"+lcjd[i].BUSINESSID+"-"+lcjd[i].BUSINESSNAME).prev().addClass('ywczColor');
				}
				
				$(".gou").on('click', function() {
					var idno = $(this).attr("id");
					var flowid = idno.split("-")[1];
					var businessid = idno.split("-")[2];
					var businessname = idno.split("-")[3];
					if ($(this).hasClass("checked")){
						var requestBody = {_module:'TT',_method:'pzspqx_delYwspBz',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole,flowid:flowid,businessid:businessid};
						MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
							if(data && data.type && data.type=="success"){
								$("#xz-"+flowid+"-"+businessid+"-"+businessname).removeClass('checked');
								$("#xz-"+flowid+"-"+businessid+"-"+businessname).prev().removeClass('ywczColor');
							}else if(data && data.type && data.type=="error"){
								$rootScope.mttAlert(data.content);
							}else{
								$rootScope.mttAlert(PUBLIC_OPER_ERROR);
							}
				        })
					}else{
						var requestBody = {_module:'TT',_method:'pzspqx_addYwspBz',currentRole:$rootScope._app_roleno,role:$rootScope.ywspRole,flowid:flowid,businessid:businessid,businessname:businessname};
						MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
							if(data && data.type && data.type=="success"){
								$("#xz-"+flowid+"-"+businessid+"-"+businessname).addClass('checked');
								$("#xz-"+flowid+"-"+businessid+"-"+businessname).prev().addClass('ywczColor');
							}else if(data && data.type && data.type=="error"){
								$rootScope.mttAlert(data.content);
							}else{
								$rootScope.mttAlert(PUBLIC_OPER_ERROR);
							}
				        })
					}
					
				});
				
				
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	$scope.doRefresh();
})
