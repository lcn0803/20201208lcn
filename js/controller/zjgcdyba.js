angular.module('controller_zjgcdyba', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 在建工程抵押备案模块
 */

//在建工程抵押备案-待办案例-列表页面
.controller('zjgcdybaDbalListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,MyFactoryNew){
	
	//待办案例list页面
	$scope.getDbal = function() {
		//交互获得案例数据源list
		var requestBody = {_module:'TT',_method:'zjgcdyba_getDbalListByPage',orgno:g_getOrgno(),pageNum:1};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/queryPageJsonWithRB', 'POST', null, requestBody).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactoryNew.listHtmlInitAndGoto(data, 'zjgcdyba_dbalList', 'zjgcdyba_dbal_list');
			}else if(data && data._page && data._page.count == 1){
				var id = data._page.results[0].YWBH;
				$rootScope.zjgcdyba_dbalList = data._page.results;
				$rootScope.dbal = data._page.results[0];
				$state.go('zjgcdyba_dbal_detail');
			}else if (data && data._page && data._page.count == 0){
				MyFactoryNew.listHtmlInitAndGoto(data, 'zjgcdyba_dbalList', 'zjgcdyba_dbal_list');
			}else{
				if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}
			}
	    })
	}	
	
	$scope.getDbal();
	
	$scope.goDetailHtml = function(dbalObject) {
		if(dbalObject){
			$rootScope.dbal = dbalObject;
			$state.go('zjgcdyba_dbal_detail');
		}else{
			$rootScope.mttAlert('获取待办案例详细信息失败!')
		}
	}
	
	$scope.doRefresh= function(ifFromPullRefresh) {
		var requestBody = {_module:'TT',_method:'zjgcdyba_getDbalListByPage',orgno:g_getOrgno()};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zjgcdyba_dbalList",true,ifFromPullRefresh);
	}
	
	$scope.loadMore= function(listName) {
		var requestBody = {_module:'TT',_method:'zjgcdyba_getDbalListByPage',orgno:g_getOrgno()};
		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,"zjgcdyba_dbalList",false);
	}
})
//在建工程抵押备案-待办案例-详细信息
.controller('zjgcdybaDbalDetailController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,MyFactoryNew){
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	$scope.banli = function() {
		var id = $scope.dbal.YWBH;
		var requestBody = {_module:'TT',_method:'zjgcdyba_submitDbal',id:id+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('zjgcdyba_jyba_list');
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
//在建工程抵押备案-交易备案-列表页面
.controller('zjgcdybaJybaListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	var listName = "zjgcdyjyba_jybaList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus ==1618040 && 41 == g_getOrgTypeno()){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'zjgcdyba_jyba_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'zjgcdyba_getJybaListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'zjgcdyba_getJybaListByPage',roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
 		$rootScope.goRouteForBack("zjgcdyba_jyba_detail",{id:id},null);
 	}     
 	
    //下载PDF
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(32,paramsObj);
    }
    
    //交易确认书预览
    $scope.showPDFImg= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(32,paramsObj);		
    }
	
	//二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(32,paramsObj,"zjgcdyba_jyba_list");
    } 	
 	
	//草拟提交
	$scope.caoniTJ = function(checkAppPicsEnough,id,flowid,businessID,stanID,realTypeID,svalue,if_yw6col_null) {
		if(checkAppPicsEnough){
			if(if_yw6col_null == 0){
				$rootScope.mttAlert("业务详细中评估价值、被担保主债权数额等信息不能为空！");
			}else{
				$scope.tj(id,flowid,businessID,stanID,realTypeID,svalue);
			}
		}else{
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGHPICS);
		}
	};
	
	//提交或回退
	$scope.tj= function(id,flowid,businessID,stanID,realTypeID,svalue) {
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
 		var requestBody = {_module:'TT',_method:'zjgcdyba_delJyba',id:id};
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
.controller('zjgcdybaJybaDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){

	var id = null;
	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var realtypeid = null;
	
	$(".classfy label").on("click",function(){
		$(this).addClass("on").siblings().removeClass("on");
	});
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		isDisabled();
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
	})
	function removeArray0(_arr, _obj) {
	    var length = _arr.length;
	    for (var i = 0; i < length; i++) {
	        if (_arr[i].RN1 == _obj.RN1) {
	            if (i == 0) {
	                _arr.shift(); //删除并返回数组的第一个元素
	                return _arr;
	            }
	            else if (i == length - 1) {
	                _arr.pop();  //删除并返回数组的最后一个元素
	                return _arr;
	            }
	            else {
	                _arr.splice(i, 1); //删除下标为i的元素
	                return _arr;
	            }
	        }
	    }
	}
		function removeArray1(_arr, _obj) {
		    var length = _arr.length;
		    for (var i = 0; i < length; i++) {
		        if (_arr[i].RN2 == _obj.RN2) {
		            if (i == 0) {
		                _arr.shift(); //删除并返回数组的第一个元素
		            return _arr;
		        }
		        else if (i == length - 1) {
		            _arr.pop();  //删除并返回数组的最后一个元素
		            return _arr;
		        }
		        else {
		            _arr.splice(i, 1); //删除下标为i的元素
		                return _arr;
		            }
		        }
		    }
		}
		function removeArray2(_arr, _obj) {
		    var length = _arr.length;
		    for (var i = 0; i < length; i++) {
		        if (_arr[i].RN3 == _obj.RN3) {
		            if (i == 0) {
		                _arr.shift(); //删除并返回数组的第一个元素
		                return _arr;
		            }
		            else if (i == length - 1) {
		                _arr.pop();  //删除并返回数组的最后一个元素
		                return _arr;
		            }
		            else {
		                _arr.splice(i, 1); //删除下标为i的元素
		                return _arr;
		            }
		        }
		    }
		}
		function removeArray3(_arr, _obj) {
		    var length = _arr.length;
		    for (var i = 0; i < length; i++) {
		        if (_arr[i].RN4 == _obj.RN4) {
		            if (i == 0) {
		                _arr.shift(); //删除并返回数组的第一个元素
		                return _arr;
		            }
		            else if (i == length - 1) {
		                _arr.pop();  //删除并返回数组的最后一个元素
		                return _arr;
		            }
		            else {
		                _arr.splice(i, 1); //删除下标为i的元素
		                return _arr;
		            }
		        }
		    }
		}
		function removeArray4(_arr, _obj) {
		    var length = _arr.length;
		    for (var i = 0; i < length; i++) {
		        if (_arr[i].RN5 == _obj.RN5) {
		            if (i == 0) {
		                _arr.shift(); //删除并返回数组的第一个元素
		                return _arr;
		            }
		            else if (i == length - 1) {
		                _arr.pop();  //删除并返回数组的最后一个元素
		                return _arr;
		            }
		            else {
		                _arr.splice(i, 1); //删除下标为i的元素
		                return _arr;
		            }
		        }
		    }
		}
		function removeArray5(_arr, _obj) {
		    var length = _arr.length;
		    for (var i = 0; i < length; i++) {
		        if (_arr[i].RN6 == _obj.RN6) {
		            if (i == 0) {
		                _arr.shift(); //删除并返回数组的第一个元素
		                return _arr;
		            }
		            else if (i == length - 1) {
		                _arr.pop();  //删除并返回数组的最后一个元素
		                return _arr;
		            }
		            else {
		                _arr.splice(i, 1); //删除下标为i的元素
		                return _arr;
		            }
		        }
		    }
		}
		$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
			for(var i=0; i<MAX_RN1; i++){
				dateTime(i);
			}
			for(var i=0; i<MAX_RN2; i++){
				dateTime(i);
			}
			for(var i=0; i<MAX_RN3; i++){
				dateTime(i);
			}
			for(var i=0; i<MAX_RN4; i++){
				dateTime(i);
			}
			for(var i=0; i<MAX_RN5; i++){
				dateTime(i);
			}
			for(var i=0; i<MAX_RN6; i++){
				dateTime(i);
			}
		});
		//调用日期控件
		function dateTime(num){
			g_dateSelect('#SYQQSRQ'+num, null, null);
			g_dateSelect('#SYQZZRQ'+num, null, null);
			g_dateSelect('#FZRQ'+num, null, null);
			g_dateSelect('#FZRQ2'+num, null, null);
			g_dateSelect('#KGRQ'+num, null, null);
			g_dateSelect('#JGRQ'+num, null, null);
			g_dateSelect('#FZRQ3'+num, null, null);
			g_dateSelect('#FZRQ4'+num, null, null);
			g_dateSelect('#FZRQ5'+num, null, null);
			g_dateSelect('#FZRQ6'+num, null, null);
			g_dateSelect('#YXQSRQ'+num, null, null);
			g_dateSelect('#YXZZRQ'+num, null, null);
		}
	//判断是否为只读模式
	function isDisabled(){
		
		$(".ifEdit").attr("disabled","disabled");
		
		if(bastatus == 0 && mastatus == 1618040 && 41 == g_getOrgTypeno() ){
			$scope.if_show_baocunButton = true;
			g_dateSelect('#ZWLXQX1', null, null);
			g_dateSelect('#ZWLXQX2', null, null);
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}
	}
	
	var MAX_RN1 = 0;
	var MAX_RN2 = 0;
	var MAX_RN3 = 0;
	var MAX_RN4 = 0;
	var MAX_RN5 = 0;
	var MAX_RN6 = 0;
	//业务详细maps查询
	$scope.xx = function() {
		
		$scope.ywDetails = null;
		var requestBody = {_module:'TT',_method:'zjgcdyba_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				$scope.ywDetails = data;
				$("#ZWLXQX1").attr("value",data.zwlxqx1);
				$("#ZWLXQX2").attr("value",data.zwlxqx2);
				MAX_RN1 = data.zdsyqz.length;
				MAX_RN2 =data.gcghxkz.length;
				MAX_RN3 =data.sgxkz.length;
				MAX_RN4 =data.jsydghxkz.length;
				MAX_RN5 =data.jsydpzs.length;
				MAX_RN6 =data.xmkfjyqz.length;
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
	
	//默认调用详细方法
	$scope.xx();
	

	//增加宗地使用权证
	$scope.addZd = function(){
		$scope.ywDetails.zdsyqz[$scope.ywDetails.zdsyqz.length] = {"STREET" : "",RN1:MAX_RN1+1};
		MAX_RN1 = MAX_RN1+1;
	}
	//增加工程规划许可证
	$scope.addGcgh = function(){
		$scope.ywDetails.gcghxkz[$scope.ywDetails.gcghxkz.length] = {"CERTNO" : "",RN2:MAX_RN2+1};
		MAX_RN2 = MAX_RN2+1;
	}
	//增加施工许可证
	$scope.addSgxk = function(){
		$scope.ywDetails.sgxkz[$scope.ywDetails.sgxkz.length] = {"SCHEDUAL" : "",RN3:MAX_RN3+1};
		MAX_RN3 = MAX_RN3+1;
	}
	//增加建设用地规划许可证
	$scope.addJsyd = function(){
		$scope.ywDetails.jsydghxkz[$scope.ywDetails.jsydghxkz.length] = {"PROJECTNAME" : "",RN4:MAX_RN4+1};
		MAX_RN4 = MAX_RN4+1;
	}
	//增加建设用地批准书
	$scope.addPzs = function(){
		$scope.ywDetails.jsydpzs[$scope.ywDetails.jsydpzs.length] = {"DOORNO" : "",RN5:MAX_RN5+1};
		MAX_RN5 = MAX_RN5+1;
	}
	//增加项目开发经营权证
	$scope.addKFJY = function(){
		$scope.ywDetails.xmkfjyqz[$scope.ywDetails.xmkfjyqz.length] = {"USAGE" : "",RN6:MAX_RN6+1};
		MAX_RN6 = MAX_RN6+1;
	}
	//删除宗地使用权证
	$scope.del_zdsyqz = function(obj){
		var index = 0;
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN1 == obj.RN1) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.zdsyqz[i].MARK;
		if(!mark){
			removeArray0($scope.ywDetails.zdsyqz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteZdsyqzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray0($scope.ywDetails.zdsyqz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除工程规划许可证
	$scope.del_gcghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.gcghxkz.length; i++) {
	        if ($scope.ywDetails.gcghxkz[i].RN2 == obj.RN2) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.gcghxkz[i].MARK;
		if(!mark){
			removeArray1($scope.ywDetails.gcghxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteGcghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray1($scope.ywDetails.gcghxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	
	//删除施工许可证
	$scope.del_sgxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.sgxkz.length; i++) {
	        if ($scope.ywDetails.sgxkz[i].RN3 == obj.RN3) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.sgxkz[i].MARK;
		if(!mark){
			removeArray2($scope.ywDetails.sgxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteSgxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray2($scope.ywDetails.sgxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地规划许可证
	$scope.del_jsydghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydghxkz.length; i++) {
	        if ($scope.ywDetails.jsydghxkz[i].RN4 == obj.RN4) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydghxkz[i].MARK;
		if(!mark){
			removeArray3($scope.ywDetails.jsydghxkz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydghxkzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray3($scope.ywDetails.jsydghxkz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除建设用地批准书
	$scope.del_jsydpzs = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydpzs.length; i++) {
	        if ($scope.ywDetails.jsydpzs[i].RN5 == obj.RN5) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.jsydpzs[i].MARK;
		if(!mark){
			removeArray4($scope.ywDetails.jsydpzs,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteJsydpzsInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray4($scope.ywDetails.jsydpzs,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//删除项目开发经营权证信息
	$scope.del_xmkfjyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.xmkfjyqz.length; i++) {
	        if ($scope.ywDetails.xmkfjyqz[i].RN6 == obj.RN6) {
	        	index = i;
	        	break;
	        }
	    }
		var mark = $scope.ywDetails.xmkfjyqz[i].MARK;
		if(!mark){
			removeArray5($scope.ywDetails.xmkfjyqz,obj);
		}else{
			var requestBody = {_module:'TT',_method:'deleteXmkfjyqzInfo',mark:mark};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					removeArray5($scope.ywDetails.xmkfjyqz,obj);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//跳转楼盘表
	$scope.goLPB = function() {
		var id = $stateParams.id;
		$state.go('lpb',{id:id,backURL:'zjgcdyba_jyba_detail',if_oper_room:$scope.if_show_baocunButton});
	}
	
	//跳转-楼栋选择（添加）页面
	/*$scope.goLdAdd = function() {
		$state.go('zjgcdyba_jyba_list',{id:id,backURL:'zjgcdyba_jyba_detail'});
	}*/
	
	//楼栋删除
	$scope.ld_del = function(index){
		var ldid = $scope.ywDetails.ld[index].BUILDID;
		var requestBody = {_module:'TT',_method:'zjgcdyba_ldDel',id:$scope.ywDetails.yewu.YWBH,ldid:ldid};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ywDetails.ld.splice(index, 1);
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	
	//业务信息保存	
	$scope.save_yw = function(){
		var id=$scope.ywDetails.yewu.YWBH;
		var pgjz=$scope.ywDetails.yewu.PGJZ;
		if(g_checkIsNull(pgjz)){
			$rootScope.mttAlert("评估价值不能为空！");
			return false;
		}
		var qlfw=$scope.ywDetails.yewu.QLFW;
		if(g_checkIsNull(qlfw)){
			$rootScope.mttAlert("权利范围不能为空！");
			return false;
		}
		var currency=$scope.ywDetails.yewu.CURRENCY;
		if(g_checkIsNull(currency)){
			$rootScope.mttAlert("请选择币种类型！");
			return false;
		}
		var dbfw=$scope.ywDetails.yewu.DBFW;
		var hl=$scope.ywDetails.yewu.HL;
		if(g_checkIsNull(hl)){
			$rootScope.mttAlert("汇率不能为空！");
			return false;
		}
		var dyjzmj=$scope.ywDetails.yewu.DYJZMJ;
		var bdbzzqse=$scope.ywDetails.yewu.BDBZZQSE;
		if(g_checkIsNull(bdbzzqse)){
			$rootScope.mttAlert("被担保主债权数额不能为空！");
			return false;
		}
		var zwlxqx1=$("#ZWLXQX1").val();
		var zwlxqx2=$("#ZWLXQX2").val();
		//校验日期格式
		if(g_checkIsNull(zwlxqx1)){
			$rootScope.mttAlert("债务履行期限不能为空！");
			return false;
		}
		if(g_checkIsNull(zwlxqx2)){
			$rootScope.mttAlert("债务履行期限不能为空！");
			return false;
		}
		var zwlxqx=zwlxqx1+'至'+zwlxqx2;
		var description=$scope.ywDetails.yewu.BZ;
		
		var requestBody = {_module:'TT',_method:'saveZjgcdyYwInfo',id:id,pgjz:pgjz,qlfw:qlfw,currency:currency,dbfw:dbfw,hl:hl,
				    dyjzmj:dyjzmj,bdbzzqse:bdbzzqse,zwlxqx:zwlxqx,description:description};
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
		var id=$scope.ywDetails.yewu.YWBH;
		var rightpeopletype=$scope.ywDetails.dyqr[index].DWGR;
		if(rightpeopletype=="单位"){
			rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.dyqr[index].QLRXH;
        var address=$scope.ywDetails.dyqr[index].LXDZ;
        var phoneno=$scope.ywDetails.dyqr[index].LXDH;
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
	
	//保存或更新人的联系方式和电话-受让方
	$scope.save_peopleAddPhone_srf = function(index){
		var id=$scope.ywDetails.yewu.YWBH;
		var rightpeopletype=$scope.ywDetails.dyr[index].DWGR;
		if(rightpeopletype=="单位"){
			rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.dyr[index].QLRXH;
        var address=$scope.ywDetails.dyr[index].LXDZ;
        var phoneno=$scope.ywDetails.dyr[index].LXDH;
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
	//宗地使用权证信息保存
	$scope.save_zdsyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.zdsyqz.length; i++) {
	        if ($scope.ywDetails.zdsyqz[i].RN1 == obj.RN1) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"zdsyqz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno=$scope.ywDetails.zdsyqz[index].CERTNO;
		var district = $scope.ywDetails.zdsyqz[index].REGIONID;
		var street = $scope.ywDetails.zdsyqz[index].STREET;
		var doorno = $scope.ywDetails.zdsyqz[index].DOORNO;
        var usecerttype=$scope.ywDetails.zdsyqz[index].USECERTTYPE;
        var landuse1=$scope.ywDetails.zdsyqz[index].LANDUSE1;
		var buildarea = $scope.ywDetails.zdsyqz[index].BUILDAREA;
		var landusetype = $scope.ywDetails.zdsyqz[index].LANDUSETYPE;
		var mark = $scope.ywDetails.zdsyqz[index].MARK;
		var syqqsrq=$("#SYQQSRQ"+index).val();
		var syqzzrq=$("#SYQZZRQ"+index).val();
		var fzrq=$("#FZRQ"+index).val();
		var requestBody = {_module:'TT',_method:'saveZdsyqzInfo',id:id,district:district,street:street,doorno:doorno,certno:certno,
				usecerttype:usecerttype,landuse1:landuse1,buildarea:buildarea,landusetype:landusetype,mark:mark,usestartdate:syqqsrq,landuseenddate1:syqzzrq,getcertdate:fzrq,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.zdsyqz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	

	//工程规划许可信息保存
	$scope.save_gcghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.gcghxkz.length; i++) {
	        if ($scope.ywDetails.gcghxkz[i].RN2 == obj.RN2) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"gcghxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno= $scope.ywDetails.gcghxkz[index].CERTNO;
		var buildarea = $scope.ywDetails.gcghxkz[index].BUILDAREA;
		var cubageratio=$scope.ywDetails.gcghxkz[index].CUBAGERATIO;
		var greenratio=$scope.ywDetails.gcghxkz[index].GREENRATIO;
		var housearea=$scope.ywDetails.gcghxkz[index].HOUSEAREA;
		var businessarea=$scope.ywDetails.gcghxkz[index].BUSINESSAREA;
		var officearea=$scope.ywDetails.gcghxkz[index].OFFICEAREA;
		var otherarea=$scope.ywDetails.gcghxkz[index].OTHERAREA;
		var mark = $scope.ywDetails.gcghxkz[index].MARK;
		var getcertdate=$("#FZRQ2"+index).val();
		var requestBody = {_module:'TT',_method:'saveGcghxkInfo',id:id,certno:certno,buildarea:buildarea,cubageratio:cubageratio,greenratio:greenratio,
				housearea:housearea,businessarea:businessarea,officearea:officearea,otherarea:otherarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.gcghxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//施工许可证信息保存
	$scope.save_sgxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.sgxkz.length; i++) {
	        if ($scope.ywDetails.sgxkz[i].RN3 == obj.RN3) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"sgxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno= $scope.ywDetails.sgxkz[index].CERTNO;
		var schedual=$scope.ywDetails.sgxkz[index].SCHEDUAL;
		var conscertarea=$scope.ywDetails.sgxkz[index].CONSCERTAREA;
		var mark = $scope.ywDetails.sgxkz[index].MARK;
		var startdatetime=$("#KGRQ"+index).val();
		var closedatetime=$("#JGRQ"+index).val();
		var getcertdate=$("#FZRQ3"+index).val();
		var requestBody = {_module:'TT',_method:'saveSgxkInfo',id:id,certno:certno,schedual:schedual,conscertarea:conscertarea,startdatetime:startdatetime,
				closedatetime:closedatetime,getcertdate:getcertdate,mark:mark,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.sgxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//建设用地规划许可证信息保存
	$scope.save_jsydghxkz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydghxkz.length; i++) {
	        if ($scope.ywDetails.jsydghxkz[i].RN4 == obj.RN4) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"jsydghxkz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno= $scope.ywDetails.jsydghxkz[index].CERTNO;
		var projectname = $scope.ywDetails.jsydghxkz[index].PROJECTNAME;
		var district=$scope.ywDetails.jsydghxkz[index].REGIONID;
		var street=$scope.ywDetails.jsydghxkz[index].STREET;
		var doorno=$scope.ywDetails.jsydghxkz[index].DOORNO;
		var buildarea=$scope.ywDetails.jsydghxkz[index].BUILDAREA;
		var landarea=$scope.ywDetails.jsydghxkz[index].LANDAREA;
		var mark = $scope.ywDetails.jsydghxkz[index].MARK;
		var getcertdate=$("#FZRQ4"+index).val();
		var requestBody = {_module:'TT',_method:'saveJsydghxkInfo',id:id,certno:certno,projectname:projectname,district:district,street:street,
				doorno:doorno,buildarea:buildarea,landarea:landarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.jsydghxkz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	//建设用地批准书信息保存
	$scope.save_jsydpzs = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.jsydpzs.length; i++) {
	        if ($scope.ywDetails.jsydpzs[i].RN5 == obj.RN5) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"jsydpzs_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno= $scope.ywDetails.jsydpzs[index].CERTNO;
		var district=$scope.ywDetails.jsydpzs[index].REGIONID;
		var street=$scope.ywDetails.jsydpzs[index].STREET;
		var doorno=$scope.ywDetails.jsydpzs[index].DOORNO;
		var buildarea=$scope.ywDetails.jsydpzs[index].BUILDAREA;
		var mark = $scope.ywDetails.jsydpzs[index].MARK;
		var getcertdate=$("#FZRQ5"+index).val();
		var requestBody = {_module:'TT',_method:'saveJsydpzsInfo',id:id,certno:certno,district:district,street:street,
				doorno:doorno,buildarea:buildarea,mark:mark,getcertdate:getcertdate,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.jsydpzs[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	
	//项目开发经营权证保存
	$scope.save_xmkfjyqz = function(obj){
		var index = 0
		for (var i = 0; i < $scope.ywDetails.xmkfjyqz.length; i++) {
	        if ($scope.ywDetails.xmkfjyqz[i].RN6 == obj.RN6) {
	        	index = i;
	        	break;
	        }
	    }
		if(g_checkNullByClass($rootScope,"xmkfjyqz_"+index,"ifEdit")){
    		return false;
    	}
		var id=$scope.ywDetails.yewu.YWBH;
		var certno=$scope.ywDetails.xmkfjyqz[index].CERTNO;
		var projectname = $scope.ywDetails.xmkfjyqz[index].PROJECTNAME;
		var district = $scope.ywDetails.xmkfjyqz[index].REGIONID;
		var street = $scope.ywDetails.xmkfjyqz[index].STREET;
		var doorno = $scope.ywDetails.xmkfjyqz[index].DOORNO;
        var investment=$scope.ywDetails.xmkfjyqz[index].INVESTMENT;  
		var buildarea = $scope.ywDetails.xmkfjyqz[index].BUILDAREA;
		var floorarea=$scope.ywDetails.xmkfjyqz[index].FLOORAREA;
		var usage=$scope.ywDetails.xmkfjyqz[index].USAGE;
		var mark = $scope.ywDetails.xmkfjyqz[index].MARK;
		var yxqsrq=$("#YXQSRQ"+index).val();
		var yxzzrq=$("#YXZZRQ"+index).val();
		var fzrq6=$("#FZRQ6"+index).val();
		var requestBody = {_module:'TT',_method:'saveXmkfjyqzInfo',id:id,district:district,street:street,doorno:doorno,certno:certno,projectname:projectname,
				investment:investment,buildarea:buildarea,floorarea:floorarea,usage:usage,mark:mark,startdatetime:yxqsrq,closedatetime:yxzzrq,getcertdate:fzrq6,orgno:g_getOrgno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		if(data && data.type && data.type=="success"){
			if(!mark){
				$scope.ywDetails.xmkfjyqz[index].MARK = data.content;
			}
			$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
		}else if(data && data.type && data.type=="error"){
			$rootScope.mttAlert(data.content);
		}else{
			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		}
        })
	}
	
})