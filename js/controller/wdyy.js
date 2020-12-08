/**
 * 我的预约模块
 */
angular.module('controller_wdyy', ['ionic', 'highcharts-ng', 'ngCordova', 'services'])


/**
 * 我的预约
 */
.controller('wdyyController',function($rootScope,$scope,$state,MyFactory){
	$scope.woyaoyuyue = function(){
		$state.go("wdyy_detail",{id:false,backUrl:'wdyy'});
	}
})

/**
 * 我的预约-列表
 */
.controller('wdyyListController',function($rootScope,$scope,$state,MyFactory){
	
	//我的预约list页面
	$scope.getWdlsyy = function() {
		//交互获得我的预约list
		MyFactory.getHttpRequest( baseurl + '/bitsroad/queryPageJson?_module=TT&_method=getWdyyListByPage&pageNum=1', 'GET', null, null).then(function (data) {
			if (data && data._page && data._page.count > 1){
				MyFactory.listHtmlInitAndGoto(data, 'wdyy_list', 'wdyy_list');
			}else if(data && data._page && data._page.count == 1){
				var id = data._page.results[0].ID;
				$state.go("wdyy_detail",{id:id,backUrl:'wdyy'});
			}else if (data && data._page && data._page.count == 0){
				MyFactory.listHtmlInitAndGoto(data, 'wdyy_list', 'wdyy_list');
			}else{
				if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}
			}
	    })
	}
	
	$scope.getWdlsyy();
	
	//刷新
	$scope.doRefresh= function(ifFromPullRefresh) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=getWdyyListByPage","wdyy_list",true,ifFromPullRefresh);
	}
	
	//加载更多
	$scope.loadMore= function(listName) {
		MyFactory.loadMore("/bitsroad/queryPageJson?_module=TT&_method=getWdyyListByPage","wdyy_list",false);
	}
    
	//详细
	$scope.xx = function(id) {
		$state.go("wdyy_detail",{id:id,backUrl:'wdyy_list'});
	}
})

/**
 * 我的预约-详细
 */
.controller('wdyyDetailController',function($rootScope,$scope,$state,$stateParams,MyFactory){
	var ywid = null;
	var htbh = "";
	var sqrxm = "";
	var zjlb = "";
	var szjhm = "";
	var lxdh = "";
	var yyrq = "";
	var yysd = "";
	var yyywlb = "";
	//电话
	var REphone=/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
	//身份证
	var REjmsfz=/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
	//军官证
	var REjgz=/南字第(\d{8})号|北字第(\d{8})号|沈字第(\d{8})号|兰字第(\d{8})号|成字第(\d{8})号|济字第(\d{8})号|广字第(\d{8})号|海字第(\d{8})号|空字第(\d{8})号|参字第(\d{8})号|政字第(\d{8})号|后字第(\d{8})号|装字第(\d{8})号/;
	//护照
	var REhz=/^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g|E|e]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/;
	//香港居民身份证
	var RExgjmsfz=/([A-Za-z](\d{6})\(\d\))|(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)/;
	//澳门居民身份证
	var REamjmsfz=/^[1|5|7][0-9]{6}\([0-9Aa]\)/;
	//台胞证
	var REtbz=/\d{10}\(B\)/;
	//日期
	var REyyrq=/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	var isyuyue;
	var iskong;
	var isIDhefa;
	var isphonehefa;
	var isrqhefa;
	
	//保存于预约对页面内容的校验
	$scope.ggjiaoyan = function(){
		isyuyue = true;
		iskong = true;
		isIDhefa = true;
		isphonehefa = true;
		isrqhefa = true;
		htbh =  $("#htbh").val().trim();
		sqrxm =  $("#sqrxm").val().trim();
		yyywlb =  $("#yyywlb").val().trim();
		zjlb =  $("#zjlb").val().trim();
		szjhm =  $("#szjhm").val().trim();
		lxdh =  $("#lxdh").val().trim();
		yyrq =  $("#yyrq").val().trim();
		yysd =  $("#yysd").val().trim();
		//必填项验证
		if(!htbh || !sqrxm || !zjlb || !szjhm || !lxdh || !yyrq || !yysd){
			iskong = false;
			isyuyue = false;
		}
		//验证证件号码的合法性   
		if(("居民身份证"==zjlb && ( szjhm.length != 15 && szjhm.length != 18) ) || ("军官证"==zjlb && !REjgz.test(szjhm)) || ("护照"==zjlb && !REhz.test(szjhm))
			|| ("香港居民身份证"==zjlb && !RExgjmsfz.test(szjhm)) || ("澳门居民身份证"==zjlb && !REamjmsfz.test(szjhm)) || ("台胞证"==zjlb && !REtbz.test(szjhm))){
			isIDhefa = false;
			isyuyue = false;
		}
		//电话号码的合法性
		if(!REphone.test(lxdh)){
			isphonehefa = false;
			isyuyue = false;
		}
		//校验预约日期格式
		if(!REyyrq.test(yyrq)){
			isrqhefa = false;
			isyuyue = false;
		}
	}
	//图片编辑查看页面
	$scope.goEdit = function(){
		var id = $scope.id;
		if($scope.mastatus == 1699010){
			$rootScope.if_oper = true
			$rootScope.titleName = "证照编辑";
		}else{
			$rootScope.if_oper = false;
			$rootScope.titleName = "证照查看";
		}
		$state.go('editPics',{id:id,backURL:'wdyy_detail'});
	};
	
	//保存页面信息,显示拍照及预约按钮
	$scope.saveInfo = function(){
		$scope.ggjiaoyan();
		if(isyuyue){
			//发请求,生成新业务序号,校验合同号对应否
			MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=savewdyy&&yyywlb='+yyywlb+'&&htbh='+htbh+'&&sqrxm='+sqrxm+'&&zjlb='+zjlb+'&&szjhm='+szjhm+'&&lxdh='+lxdh+'&&yyrq='+yyrq+'&&yysd='+yysd, 'POST', null, null).then(function (data) {
				if(data && data.type && data.type == "success"){
					$rootScope.mttAlert("信息保存成功，请继续上传身份证正反面等其他照片！",function() {
						$scope.initData(data.content.ID);
					});
				}else if(data && data.type && data.type == "error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}else if(!iskong){
			$rootScope.mttAlert("操作失败：您有必填项未填写！");
		}else if(!isIDhefa){
			$rootScope.mttAlert("操作失败：证件号码不合法，请更改！");
		}else if(!isphonehefa){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
		}else if(!isrqhefa){
			$rootScope.mttAlert("操作失败：预约日期请按照提示格式填写！");
		}
	}
	
	$scope.shanchu = function(){
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=delWdyy&id='+$scope.id, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type == "success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$rootScope.wdyyDetail_id = null;
					$state.go($stateParams.backUrl);
				});
			}else if(data && data.type && data.type == "error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})		
	}
	
	//我的预约提交，即草拟提交
	$scope.yuyue = function(checkAppPicsEnough){
		$scope.ggjiaoyan();
		if(isyuyue && $scope.checkAppPicsEnough){
			MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=updateWdyy&&yyywlb='+yyywlb+'&&htbh='+htbh+'&&sqrxm='+sqrxm+'&&zjlb='+zjlb+'&&szjhm='+szjhm+'&&lxdh='+lxdh+'&&yyrq='+yyrq+'&&yysd='+yysd+'&&id='+$scope.id, 'POST', null, null).then(function (data) {
				if(data && data.type && data.type == "success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
						$scope.initData($scope.id);
					});
				}else if(data && data.type && data.type == "error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}else if(!iskong){
			$rootScope.mttAlert("操作失败：您有必填项未填写！");
		}else if(!isIDhefa){
			$rootScope.mttAlert("操作失败：证件号码不合法，请更改！");
		}else if(!isphonehefa){
			$rootScope.mttAlert("操作失败：联系电话不合法，请更改！");
		}else if(!isrqhefa){
			$rootScope.mttAlert("操作失败：预约日期请按照提示格式填写！");
		}else{
			$rootScope.mttAlert(PUBLIC_ERROR_NOTENOUGHPICS);
		}
	}
	
	//提交或回退
	$scope.tj= function(_id,flowid,businessID,stanID,realTypeID,svalue) {
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=elevatorFlowNextOrBack&&id='+_id+'&&flowid='+flowid+'&&businessID='+businessID+'&&stanID='+stanID+'&&realTypeID='+realTypeID+'&&svalue='+svalue, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$scope.initData();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
			
        })
	}
	
	//TODO---------初始化
	$scope.initData = function(ywid){
		$rootScope.wdyyDetail_BackUrl = $stateParams.backUrl;
		if(ywid){
			$stateParams.id = ywid;
		}
		if($stateParams.id){
			MyFactory.getHttpRequest( baseurl + '/bitsroad/queryRecordJson?_module=TT&_method=getWdyyDetail&&id='+$stateParams.id, 'GET', null, null).then(function (data) {
				if(data && data._result){
					$scope.id = data._result.ID;
					$scope.ywbz = data._result.YWBZ;
					$scope.mastatus = data._result.MASTATUS;
					$scope.slsj = data._result.SLSJ;
					$scope.zyyy = data._result.ZYYY == -1?"是":"否";
					$scope.bhyyyy = data._result.BHYYYY;
					$scope.sfbj = data._result.SFBJ == -1?"是":"否";
					$scope.bjsj = data._result.BJSJ;
					$scope.checkAppPicsEnough = data._result.checkAppPicsEnough;
					
					$("#yyywlb").attr("value", data._result.YYYWLB);
					$("#htbh").attr("value", data._result.HTBH);
					$("#sqrxm").attr("value", data._result.SQRXM);
					$("#zjlb").attr("value", data._result.ZJLB);
					$("#szjhm").attr("value", data._result.ZJHM);
					$("#lxdh").attr("value", data._result.LXDH);
					$("#yyrq").attr("value", data._result.YYRQ);
					$("#yysd").attr("value", data._result.YYSD);
					$rootScope.$broadcast('scroll.refreshComplete');
					if($scope.mastatus == 1699010){
						g_dateSelect('#yyrq', 0, null);
						$("#yysd").off("click").on("click", function(){
							MyFactory.openTimePicker("yysd",$("#yysd").val())
						});
						$(".ifEdit").removeAttr("disabled");
					}else{
						$(".ifEdit").attr("disabled","disabled");
					}
					
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}else{
			$("#sqrxm").attr("value", g_getLoginName());
			$("#szjhm").attr("value", g_getLoginIdno());
			$("#lxdh").attr("value", g_getLoginPhoneno());
			g_dateSelect('#yyrq', 0, null);
			$("#yysd").off("click").on("click", function(){
				MyFactory.openTimePicker("yysd",$("#yysd").val())
			});
		}
	}
	
	$scope.initData();
})
