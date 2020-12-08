angular.module('controller_xsba', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])

/**
 * 现售备案模块
 */

//待选楼栋-列表页面
.controller('xsbaDxldListController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	if(typeof $stateParams.id == "number" && $stateParams.id > 0){
		$scope.if_addLD = true;
	}
	var selectListMap = {};
	
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
	
	var listName = "xsba_dxldList";
	
	$scope.setSelect = function(obj) {
		if(selectListMap[obj.BUILDID]){
			delete selectListMap[obj.BUILDID];
		}else{
			selectListMap[obj.BUILDID] = obj.BUILDID;
		}
	}
	//取消
    $scope.quxiao = function(){
        $scope.popover.hide();
    };
	//办理
	$scope.banli = function() {
		if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
		var ldids = Object.getOwnPropertyNames(selectListMap).toString();
		
        var requestBody = {_module:'TT',_method:'xsba_submitDbal',orgno:g_getOrgno(),ldids:ldids,if_glqf:""+$stateParams.if_glqf};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go('xsba_xsba_list');
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
	//已有业务，添加楼栋
	$scope.addLD = function() {
		if(Object.keys(selectListMap).length == 0){
			$rootScope.mttAlert("请至少选择一个楼栋！");
			return false;
		}
		var ldids = Object.getOwnPropertyNames(selectListMap).toString();
		
        var requestBody = {_module:'TT',_method:'xsba_ldAdd',id:$stateParams.id,ldids:ldids,if_glqf:""+$stateParams.if_glqf};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$state.go($stateParams.backURL,{id:$stateParams.id});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'xsba_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno(),if_glqf:""+$stateParams.if_glqf};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'xsba_getDxldListByPage',numPerPage_self:9999,orgno:g_getOrgno(),if_glqf:""+$stateParams.if_glqf};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
})

//现售备案及其审核-列表界面
.controller('xsbaXsbaListController',function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
	
	var listName = "xsba_xsbaList";
	//图片编辑查看页面
	$scope.goEdit = function(id,mastatus){
		if(mastatus == 1621010){
			$rootScope.titleName = "证照编辑";
			$rootScope.if_oper = true;
		}else{
			$rootScope.titleName = "证照查看";
			$rootScope.if_oper = false;
		}
		$state.go('editPics',{id:id,backURL:'xsba_xsba_list'});
	};

	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'xsba_getXsbaListByPage',roleno:g_getRoleno(),orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'xsba_getXsbaListByPage',roleno:g_getRoleno(),orgno:g_getOrgno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh();
     
 	//详细
	$scope.xx = function(id,mastatus) {
		$rootScope.goRouteForBack("xsba_xsba_detail",{id:id},null);
 	}	
	
	//下载申请表
    $scope.downPDF= function(ywbh) {
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.downPDF(70,paramsObj);
    }
    //预览申请表
	$scope.showPDFImg= function(ywbh) {
		var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPDFImg(70,paramsObj);
	}
	//申请表二维码                    
    $scope.creQRCode = function(ywbh){
    	var paramsObj ={};
    	paramsObj.ywbh = ywbh;
    	MyFactoryNew.showPdfQRCode(70,paramsObj,"xsba_xsba_list");
    }
	
	//草拟提交
	$scope.caoniTJ = function(obj,svalue) {
		if(obj.checkAppPicsEnough){
			if(obj.IF_YWCOL_NOTNULL == 0){
				$rootScope.mttAlert("业务详细中房屋性质、产别、产权来源等信息不能为空！");
			}else{
				$scope.tj(obj,svalue);
			}
		}else{
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGHPICS);
		}
	};
	
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
 		var requestBody = {_module:'TT',_method:'xsba_delXsba',id:id};
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

//现售备案详细
.controller('xsbaXsbaDetailController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){
	var id = null;
	var bastatus = null;
	var mastatus = null;
	
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
		
		if(bastatus == 0 && mastatus == 1621010 && g_getRoleno() != PUBLIC_JS_GLY ){
			$scope.if_show_baocunButton = true;
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
		var requestBody = {_module:'TT',_method:'xsba_detailMaps',id:$stateParams.id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data.zdsyqz.length == 0){
					data.zdsyqz[0] = {"STREET" :  ""};
				}
				if(data.gcghxkz.length == 0){
					data.gcghxkz[0] = {"CERTNO" :  ""};
				}
				if(data.sgxkz.length == 0){
					data.sgxkz[0] = {"SCHEDUAL" :  ""};
				}
				if(data.jsydghxkz.length == 0){
					data.jsydghxkz[0] = {"PROJECTNAME" :  ""};
				}
				if(data.jsydpzs.length == 0){
					data.jsydpzs[0] = {"DOORNO" :  ""};
				}
				if(data.xmkfjyqz.length == 0){
					data.xmkfjyqz[0] = {"USAGE" :  ""};
				}
				$scope.ywDetails = data;
				MAX_RN1 = data.zdsyqz.length;
				MAX_RN2 =data.gcghxkz.length;
				MAX_RN3 =data.sgxkz.length;
				MAX_RN4 =data.jsydghxkz.length;
				MAX_RN5 =data.jsydpzs.length;
				MAX_RN6 =data.xmkfjyqz.length;
				id = data.yewu.ID;
				bastatus = data.yewu.BASTATUS;
				mastatus = data.yewu.MASTATUS;
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
	
	//业务更新保存
	$scope.yw_upd = function(){
		var obj = $scope.ywDetails.yewu;
		if(g_checkNullByClass($rootScope,"ywCard","ifEdit")){
    		return false;
    	}
		var requestBody = {_module:'TT',_method:'xsba_updXsba',id:obj.ID,fwxz:obj.ROOMPROPERTY,gyfs:obj.SHARETYPE,cb:obj.REALTYPE,cqly:obj.REALSOURCE,bz:obj.BZ};
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
	
	//跳转楼盘表
	$scope.goLPB = function() {
		$state.go('lpb',{id:id,backURL:'xsba_xsba_detail',if_oper_room:$scope.if_show_baocunButton,init_show_qfxf:3});
	}
	
	//跳转-楼栋选择（添加）页面
	$scope.goLdAdd = function(if_glqf) {
		$state.go('xsba_dxld_list',{id:id,backURL:'xsba_xsba_detail',if_glqf:if_glqf+""});
	}
	
	//楼栋删除
	$scope.ld_del = function(index){
		var ldid = $scope.ywDetails.ld[index].BUILDID;
		var requestBody = {_module:'TT',_method:'xsba_ldDel',id:$scope.ywDetails.yewu.ID,ldid:ldid};
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
		var id=$scope.ywDetails.yewu.ID;
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
		var id=$scope.ywDetails.yewu.ID;
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
		var id=$scope.ywDetails.yewu.ID;
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
		var id=$scope.ywDetails.yewu.ID;
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
		var id=$scope.ywDetails.yewu.ID;
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
		var id=$scope.ywDetails.yewu.ID;
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