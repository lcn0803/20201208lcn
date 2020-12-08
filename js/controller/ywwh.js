angular.module('controller_ywwh', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 业务维护
 */

//可操作业务-列表页面
.controller('ywwhListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "ywwhList";
	
	if($rootScope.queryObject && ($rootScope.queryObject.id || $rootScope.queryObject.ywxl)){
		
	}else{
		$rootScope.queryObject = {id:"",ywxl:""};
	}
	
	//清除查询输入
	$scope.clearInput = function(){
		$rootScope.queryObject = {id:"",ywxl:""};
	};
	
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		$rootScope.titleName = "证照查看";
		$rootScope.if_oper = false;
		$state.go('editPics',{id:id,backURL:'ywwh_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'ywwh_getYwListByPage',id:$rootScope.queryObject.id,ywxl:$rootScope.queryObject.ywxl};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'ywwh_getYwListByPage',id:$rootScope.queryObject.id,ywxl:$rootScope.queryObject.ywxl};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
    
 	if(g_getRoleno() == PUBLIC_JS_GLY){
 		if(!$rootScope.ywwhYwxlList){
 			//加载已定义的所有业务细类-下拉列表：
 			var requestBody = {_module:'TT',_method:'ywwh_getAllYwxlByOnline'};
 			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
 				if(data && data.ywxlList){
 					$rootScope.ywwhYwxlList = data.ywxlList;
 					$scope.doRefresh();
 				}else if(data && data.type && data.type=="error"){
 					$rootScope.mttAlert(data.content);
 				}else{
 					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
 				}
 	        })
 		}else{
 			$scope.doRefresh();
 		}
 	}
 	
 	//详细（注意：下拉框展示业务细类，但是跳转依据对应的业务大类来进行跳转，因为大类基本不变，细类大概率会添加新的）
	$scope.xx = function(obj) {
		var id = obj.ID;
		var ywdlid = obj.YWDLID;
		var curUrl = "ywwh_list";
		
		//(ywdlid == "161006" || ywdlid == "161007"){//无权利期楼盘新建、无权利现楼盘新建
		if(ywdlid == "1610040"){//合同模板管理
			$rootScope.goRouteForBack("htmbgl_mbgl_detail",{id:id},null);
		}else if(ywdlid == "161011" || ywdlid == "161017" || ywdlid == "161061" || ywdlid == "161064"){//单位类注册
			$rootScope.goRouteForBack("dwzc_dwzc_detail",{id:id},null);
		}else if(ywdlid == "161101"){//预售许可
			$rootScope.goRouteForBack("ysxkxj_ysxk_detail",{id:id},null);
		}else if(ywdlid == "161201"){//预售登记备案新建－导入【预售合同备案】
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},null);
		}else if(ywdlid == "161701"){//预购商品房抵押签约新建
			$rootScope.goRouteForBack("ygspfdywq_wq_detail",{id:id},null);
		}else if(ywdlid == "161703"){//在建工程抵押签约新建
			$rootScope.goRouteForBack("zjgcdywq_dywq_detail",{id:id},null);
		}else if(ywdlid == "161801"){//预购商品房抵押备案新建 
			$rootScope.goRouteForBack("ygspfdyba_jyba_detail",{id:id},null);
		}else if(ywdlid == "161803"){//在建工程抵押备案新建
			$rootScope.goRouteForBack("zjgcdyba_jyba_detail",{id:id},null);
		}else if(ywdlid == "161901"){//一般抵押签约新建
			$rootScope.goRouteForBack("ybdywq_dywq_detail",{id:id},null);
		}else if(ywdlid == "162001"){//一般抵押备案新建
			$rootScope.goRouteForBack("ybdyba_jyba_detail",{id:id},null);
		}else if(ywdlid == "162101"){//初始登记【现售备案】
			$rootScope.goRouteForBack("xsba_xsba_detail",{id:id},null);
		}else if(ywdlid == "162281"){//存量房交易备案
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},null);
		}else if(ywdlid == "162280"){//商品房交易备案
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},null);
		}else if(ywdlid == "163801"){//期房签约新建【商品期房买卖网签】
			$rootScope.goRouteForBack("spfwq_detail",{id:id},null);
		}else if(ywdlid == "163901"){//最高额抵押签约新建
			$rootScope.goRouteForBack("zgedywq_dywq_detail",{id:id},null);
		}else if(ywdlid == "164001"){//最高额抵押备案新建
			$rootScope.goRouteForBack("zgedyba_jyba_detail",{id:id},null);
		}else if(ywdlid == "164801"){//现房签约新建【商品现房买卖网签】
			$rootScope.goRouteForBack("spxfwq_detail",{id:id},null);
		}else if(ywdlid == "164802"){//存量房签约新建
			$rootScope.goRouteForBack("clfwq_detail",{id:id},null);
		}else if(ywdlid == "167601"){//房源核验
			$rootScope.goRouteForBack("fyhy_detail",{id:id},null);
		}else{
			$rootScope.mttAlert("操作失败：未配置处理的业务类型，请联系管理员进行处理！");
		}
 	}	
	
	//提交或回退
	$scope.tj= function(obj,svalue) {
		var requestBody = g_getRBObj_tjht(obj.ID,obj.FLOWID,obj.MASTATUS,obj.STANID,obj.REALTYPEID,svalue);
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
 		var requestBody = {_module:'TT',_method:'ywwh_delFromZB',id:id};
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
