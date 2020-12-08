angular.module('controller_ywsp', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 业务审批
 */

//可操作业务-列表页面
.controller('ywspListController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	var baseactivityid = $stateParams.baseactivityid;
	var listName = "ywspList";
	
	if($rootScope.queryObject && ($rootScope.queryObject.id || $rootScope.queryObject.ywbz)){
		
	}else{
		$rootScope.queryObject = {id:"",ywbz:""};
	}
	
	//清除查询输入
	$scope.clearInput = function(){
		$rootScope.queryObject = {id:"",ywbz:""};
	};
	
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		$rootScope.titleName = "证照查看";
		$rootScope.if_oper = false;
		$rootScope.goRouteForBack("editPics",{id:id},{baseactivityid:baseactivityid});
		$rootScope.queryObject = {id:id,ywbz:""};
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'ywsp_getYwListByPage',role:$rootScope._app_roleno,baseactivityid:baseactivityid,id:$rootScope.queryObject.id,ywbz:$rootScope.queryObject.ywbz};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'ywsp_getYwListByPage',role:$rootScope._app_roleno,baseactivityid:baseactivityid,id:$rootScope.queryObject.id,ywbz:$rootScope.queryObject.ywbz};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
    
 	$scope.doRefresh();
 	
 	//详细
	$scope.xx = function(obj) {
		var id = obj.ID;
		var ywdlid = obj.YWDLID;
		var curUrl = "ywwh_list";
		
		//(ywdlid == "161006" || ywdlid == "161007"){//无权利期楼盘新建、无权利现楼盘新建
		if(ywdlid == "1610040"){//合同模板管理
			$rootScope.goRouteForBack("htmbgl_mbgl_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161011" || ywdlid == "161017" || ywdlid == "161061" || ywdlid == "161064"){//单位类注册
			$rootScope.goRouteForBack("dwzc_dwzc_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161101"){//预售许可
			$rootScope.goRouteForBack("ysxkxj_ysxk_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161201"){//预售登记备案新建－导入【预售合同备案】
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161701"){//预购商品房抵押签约新建
			$rootScope.goRouteForBack("ygspfdywq_wq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161703"){//在建工程抵押签约新建
			$rootScope.goRouteForBack("zjgcdywq_dywq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161801"){//预购商品房抵押备案新建 
			$rootScope.goRouteForBack("ygspfdyba_jyba_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161803"){//在建工程抵押备案新建
			$rootScope.goRouteForBack("zjgcdyba_jyba_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "161901"){//一般抵押签约新建
			$rootScope.goRouteForBack("ybdywq_dywq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "162001"){//一般抵押备案新建
			$rootScope.goRouteForBack("ybdyba_jyba_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "162101"){//初始登记【现售备案】
			$rootScope.goRouteForBack("xsba_xsba_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "162281"){//存量房交易备案
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "162280"){//商品房交易备案
			$rootScope.goRouteForBack("ywDetailMaps",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "163801"){//期房签约新建【商品期房买卖网签】
			$rootScope.goRouteForBack("spfwq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "163901"){//最高额抵押签约新建
			$rootScope.goRouteForBack("zgedywq_dywq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "164001"){//最高额抵押备案新建
			$rootScope.goRouteForBack("zgedyba_jyba_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "164801"){//现房签约新建【商品现房买卖网签】
			$rootScope.goRouteForBack("spxfwq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "164802"){//存量房签约新建
			$rootScope.goRouteForBack("clfwq_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "167601"){//房源核验
			$rootScope.goRouteForBack("fyhy_detail",{id:id},{baseactivityid:baseactivityid});
		}else if(ywdlid == "1699"){//我的预约
			$rootScope.goRouteForBack("wdyy_detail",{id:id},{baseactivityid:baseactivityid});
		}else{
			$rootScope.mttAlert("操作失败：未配置处理的业务类型，请联系管理员进行处理！");
		}
		$rootScope.queryObject = {id:obj.ID,ywbz:""};
 	}
	
	//提交或回退
	$scope.tj= function(obj,svalue) {
		$rootScope.queryObject = {id:obj.ID,ywbz:""};
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
	
	//办结
	$scope.banjie = function(obj){
		$rootScope.queryObject = {id:obj.ID,ywbz:""};
		var requestBody = {_module:'TT',_method:'ywsp_banjie',role:$rootScope._app_roleno,baseactivityid:baseactivityid,id:obj.ID,stanid:obj.STANID};
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
