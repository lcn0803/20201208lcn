
angular.module('controller_zxgl', ['ionic', 'highcharts-ng', 'ngCordova', 'services','services-2.0'])

.controller('zxglController',function($rootScope,$scope,$state,MyFactoryNew){
	$scope.qyblxw = function(){
		var requestBody = {_module:'TT',_method:'zxgl_getQyxx'};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.kfqy){
					$rootScope.mttAlert('获取企业信息失败！');
					return false;
				}
				$rootScope.qyxx = data;
				$state.go("qyblxw_list",{backUrl:'zxgl'});
			}else{
				$rootScope.mttAlert('获取企业信息失败！');
			}
        })	
	}
	$scope.qyhjqk = function(){
		var requestBody = {_module:'TT',_method:'zxgl_getQyxx'};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.kfqy){
					$rootScope.mttAlert('获取企业信息失败！');
					return false;
				}
				$rootScope.qyxx = data;
				$state.go("qyhjqk_list",{backUrl:'zxgl'});
			}else{
				$rootScope.mttAlert('获取企业信息失败！');
			}
        })	
	}
})

/**
 * 征信管理-企业不良信息-列表
 */
.controller('qyblxwListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactory,MyFactoryNew){
	
	if(g_getRoleno() == PUBLIC_JS_GLY){
		
		var listName = "qyblxwList";
		//刷新
	 	$scope.doRefresh= function(ifFromPullRefresh) {
	        var requestBody = {_module:'TT',_method:'zxgl_getQyblxwListByPage',roleno:g_getRoleno()};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
	 	}
	 	//加载更多
	 	$scope.loadMore= function() {
		    var requestBody = {_module:'TT',_method:'zxgl_getQyblxwListByPage',roleno:g_getRoleno()};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
	 	}
	    $scope.doRefresh();
	    
	}else{
		
		 //置空查询历史list
	    $rootScope.isListData = false;
	    $rootScope.qyblxwList = null;
	    var qyxh = "";
	    var qymc = "";
	    var listName = "qyblxwList";
	    $(".chaXun .title").on("click", function(){
	        $(this).siblings().toggle();
	    });

	    //重置
	    $scope.clear = function() {
	        $("#qy_mc").val("");
	    }
	    $scope.doRefresh= function(ifFromPullRefresh) {
	    	var qyxh=$("#qy_mc").val();
	    	var qymc=$("#qy_mc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("查询条件必须输入！");
				return false;
			}
	        var requestBody = {_module:'TT',_method:'zxgl_getQyblxwListByPage',roleno:g_getRoleno(),qyxh:qyxh,qymc:qymc};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
	 	}
	 	//加载更多
	 	$scope.loadMore= function() {
	 		var qyxh=$("#qy_mc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("查询条件必须输入！");
				return false;
			}
		    var requestBody = {_module:'TT',_method:'zxgl_getQyblxwListByPage',roleno:g_getRoleno(),qyxh:qyxh};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
	 	}
	    
	    //查询
	    $scope.search = function() {
			$scope.doRefresh();
	    }
	}
	
    
    //详细
 	$scope.xx = function(id) {
 		$state.go("zj_qyblxx",{id:id,backURL:"qyblxw_list"});
 	}   
 	$scope.addQyblxw=function(){
 		var requestBody = {_module:'TT',_method:'zxgl_getQyxx'};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.kfqy){
					$rootScope.mttAlert('获取企业信息失败！');
					return false;
				}
				$rootScope.qyxx = data;
				$state.go("zj_qyblxx",{backURL:"qyblxw_list"});
			}else{
				$rootScope.mttAlert('获取企业信息失败！');
			}
        })		
 		
 	}
 	//提交或回退
	$scope.qyxxSubmit= function(id,svalue) {
	    var requestBody = {_module:'TT',_method:'zxgl_tjOrht',id:id,svalue:svalue};
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
 	$scope.delQyblxx = function(id) {
        var requestBody = {_module:'TT',_method:'zxgl_delQyblxx',id:id};
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

/**
 * 企业不良信息编辑
 */
.controller('bjqyBLxxController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
   
	var ywzt = null;
	var ywbz = null;
	var id = $stateParams.id;
	$scope.isShow=true;
	
	
	if(angular.isNumber(id)){
		
		//判断是否为只读模式
		function isDisabled(){
			if(g_getRoleno() !=PUBLIC_JS_GLY){
				$(".ifEdit").attr("disabled","disabled");
				$(".ifEdit2").attr("disabled","disabled");
			}else{
				$(".ifEdit").attr("disabled","disabled");
				$(".ifEdit2").attr("disabled","disabled");
				if(ywzt == 0 && ywbz == 0){
					$(".ifEdit").removeAttr("disabled");
					g_dateSelect('#FSSJ', null, null);
					g_dateSelect('#JLSJ', null, null);
					$("textarea.ifEdit").css("background","white");
					$scope.if_show_baocunButton1 = true;
				}
			}
			
		}
		//业务详细maps查询
		$scope.xx = function(id) {
			$scope.ywDetails = null;
			var requestBody = {_module:'TT',_method:'zxgl_getQyblxwDetail',id:$stateParams.id};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data){
					if(!data.blqy){
						$rootScope.mttAlert('获取详细信息失败！');
						return false;
					}
					if(data.blqy.length == 0){
						data.blqy[0] = {"XYLB" :  " "};
	 				}
					$scope.ywDetails = data;
					ywzt = data.blqy.YWZT;
					ywbz = data.blqy.YWBZ;
					$("#cfjg").attr("value",data.blqy.CFJGZ);
					$("#sffb").attr("value",data.blqy.SFFBZ);
					isDisabled();
				}else{
					$rootScope.mttAlert('获取详细信息失败！');
				}
	        })		
		}	
		//默认调用详细方法
		$scope.xx();
		
		//保存修改的企业不良信息存在id保存
		$scope.saveQyblxx = function(){
			var ywbh=$scope.ywDetails.blqy.ID;
			var cfjg=$("#cfjg").val();
			if(cfjg=='未处罚'){
				cfjg=0;
			}else if(cfjg=='已处罚'){
				cfjg=-1;
			}else{
				$rootScope.mttAlert("请选择处罚结果信息！");
				return false;
			}
			var qyxh=$scope.ywDetails.blqy.QYXH;
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("请选择处罚企业名称！");
				return false;
			}
			var xylb=$scope.ywDetails.blqy.XYLB;
			if(g_checkIsNull(xylb)){
				$rootScope.mttAlert("信用类别不能为空！");
				return false;
			}
			var sffb=$("#sffb").val();
			if(sffb=='未发布'){
				sffb=0;
			}else if(sffb=='已发布'){
				sffb=-1;
			}else{
				$rootScope.mttAlert("请选择是否发布！");
				return false;
			}
			var qybljlnr=$scope.ywDetails.blqy.QYBLJLNR;
			if(g_checkIsNull(qybljlnr)){
				$rootScope.mttAlert("企业不良记录内容不能为空！");
				return false;
			}
			var fssj=$("#FSSJ").val();
			var jlsj=$("#JLSJ").val();
			//校验日期格式
			if(g_checkIsNull(fssj)){
				$rootScope.mttAlert("发生时间不能为空！");
				return false;
			}
			if(g_checkIsNull(jlsj)){
				$rootScope.mttAlert("处罚时间不能为空！");
				return false;
			}
			var bzh=$scope.ywDetails.blqy.BZH;
			
			var requestBody = {_module:'TT',_method:'zxgl_saveQyblxwYwWithID',ywbh:ywbh,cfjg:cfjg,xylb:xylb,sffb:sffb,qybljlnr:qybljlnr,fssj:fssj,jlsj:jlsj,bzh:bzh,qyxh:qyxh,appCzz:g_getLoginPhoneno()};
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
	}else{
		$(".ifEdit").removeAttr("disabled");
		$(".ifEdit2").removeAttr("disabled");
		g_dateSelect('#FSSJ', null, null);
		g_dateSelect('#JLSJ', null, null);
		$("textarea.ifEdit").css("background","white");
		$scope.if_show_baocunButton1 = true;
		
		//保存修改的企业不良信息无id保存
		$scope.saveQyblxx = function(){
			var ywbh=$("#ywxh").val();
			var cfjg=$("#cfjg").val();
			if(cfjg=='未处罚'){
				cfjg=0;
			}else if(cfjg=='已处罚'){
				cfjg=-1;
			}else{
				$rootScope.mttAlert("请选择处罚结果信息！");
				return false;
			}
			var qyxh=$("#qymc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("请选择处罚企业名称！");
				return false;
			}
			var xylb=$("#xylb").val();
			if(g_checkIsNull(xylb)){
				$rootScope.mttAlert("信用类别不能为空！");
				return false;
			}
			var sffb=$("#sffb").val();
			if(sffb=='未发布'){
				sffb=0;
			}else if(sffb=='已发布'){
				sffb=-1;
			}else{
				$rootScope.mttAlert("请选择是否发布！");
				return false;
			}
			var qybljlnr=$("#qybljl").val();
			if(g_checkIsNull(qybljlnr)){
				$rootScope.mttAlert("企业不良记录内容不能为空！");
				return false;
			}
			var fssj=$("#FSSJ").val();
			var jlsj=$("#JLSJ").val();
			
			//校验日期格式
			if(g_checkIsNull(fssj)){
				$rootScope.mttAlert("发生时间不能为空！");
				return false;
			}
			if(g_checkIsNull(jlsj)){
				$rootScope.mttAlert("处罚时间不能为空！");
				return false;
			}
			var bzh=$("#beizhu").val();
			var requestBody = {_module:'TT',_method:'zxgl_saveQyblxwYwNoID',ywbh:ywbh,cfjg:cfjg,xylb:xylb,sffb:sffb,qybljlnr:qybljlnr,fssj:fssj,jlsj:jlsj,bzh:bzh,qyxh:qyxh,appCzz:g_getLoginPhoneno()};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$("#ywxh").attr("value",data.content.ID);
					$("#ywbz").attr("value",data.content.YWBZMC);
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR); 
				}
	        })	
		 }
	}
})

/**
 * 征信管理-企业获奖信息-列表
 */
.controller('qyhjqkListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	
	if(g_getRoleno() == PUBLIC_JS_GLY){
		var listName = "qyhjqkList";

		//刷新
	 	$scope.doRefresh= function(ifFromPullRefresh) {
	        var requestBody = {_module:'TT',_method:'zxgl_getQyhjqkListByPage',roleno:g_getRoleno()};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
	 	}
	 	
	 	//加载更多
	 	$scope.loadMore= function() {
		    var requestBody = {_module:'TT',_method:'zxgl_getQyhjqkListByPage',roleno:g_getRoleno()};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
	 	}
	    $scope.doRefresh();
	}else{
		
		 //置空查询历史list
	    $rootScope.isListData = false;
	    $rootScope.qyhjqkList = null;
	    var qyxh = "";
	    var qymc = "";
	    var listName = "qyhjqkList";
	    $(".chaXun .title").on("click", function(){
	        $(this).siblings().toggle();
	    });

	    //重置
	    $scope.clear = function() {
	        $("#qy_mc").val("");
	    }
	    $scope.doRefresh= function(ifFromPullRefresh) {
	    	var qyxh=$("#qy_mc").val();
	    	var qymc=$("#qy_mc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("查询条件必须输入！");
				return false;
			}
	        var requestBody = {_module:'TT',_method:'zxgl_getQyhjqkListByPage',roleno:g_getRoleno(),qyxh:qyxh,qymc:qymc};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
	 	}
	 	//加载更多
	 	$scope.loadMore= function() {
	 		var qyxh=$("#qy_mc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("查询条件必须输入！");
				return false;
			}
		    var requestBody = {_module:'TT',_method:'zxgl_getQyhjqkListByPage',roleno:g_getRoleno(),qyxh:qyxh};
	 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
	 	}
	    
	    //查询
	    $scope.search = function() {
			$scope.doRefresh();
	    }
	}
	
    //详细
 	$scope.xx = function(id) {
 		$state.go("zj_qyhjxx",{id:id,backURL:"qyhjqk_list"});	
 	}   
 	$scope.addQyhjqk=function(){
 		var requestBody = {_module:'TT',_method:'zxgl_getQyxx'};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.kfqy){
					$rootScope.mttAlert('获取企业信息失败！');
					return false;
				}
				$rootScope.qyxx = data;
				$state.go("zj_qyhjxx",{backURL:"qyhjqk_list"});
			}else{
				$rootScope.mttAlert('获取企业信息失败！');
			}
        })	
 	}
 	//提交或回退
	$scope.qyxxSubmit= function(id,svalue) {
	    var requestBody = {_module:'TT',_method:'zxgl_tjOrht',id:id,svalue:svalue};
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
 	$scope.delQyblxx = function(id) {
        var requestBody = {_module:'TT',_method:'zxgl_delQyblxx',id:id};
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

/**
 * 企业获奖信息编辑
 */
.controller('bjqyHJxxController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
   
	var ywzt = null;
	var ywbz = null;
	var id = $stateParams.id;
	$scope.isShow=true;
	
	if(angular.isNumber(id)){
		
		//判断是否为只读模式
		function isDisabled(){
			if(g_getRoleno() !=PUBLIC_JS_GLY){
				$(".ifEdit").attr("disabled","disabled");
				$(".ifEdit2").attr("disabled","disabled");
			}else{
				$(".ifEdit").attr("disabled","disabled");
				$(".ifEdit2").attr("disabled","disabled");
				if(ywzt == 0 && ywbz == 0){
					$(".ifEdit").removeAttr("disabled");
					g_dateSelect('#HJSJ', null, null);
					$("textarea.ifEdit").css("background","white");
					$scope.if_show_baocunButton1 = true;
				}
			}
			
		}
		//业务详细maps查询
		$scope.xx = function(id) {
			$scope.ywDetails = null;
			var requestBody = {_module:'TT',_method:'zxgl_getQyblxwDetail',id:$stateParams.id};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data){
					if(!data.hjqy){
						$rootScope.mttAlert('获取详细信息失败！');
						return false;
					}
					if(data.hjqy.length == 0){
						data.hjqy[0] = {"XYLB" :  " "};
	 				}
					$scope.ywDetails = data;
					ywzt = data.hjqy.YWZT;
					ywbz = data.hjqy.YWBZ;
					$("#sffb").attr("value",data.hjqy.SFFBZ);
					$("#qymc").attr("value",data.hjqy.QYMC);
					isDisabled();
					
				}else{
					$rootScope.mttAlert('获取详细信息失败！');
				}
	        })		
		}	
		//默认调用详细方法
		$scope.xx();
		
		//保存修改的企业获奖信息
		$scope.saveQyhjxx = function(){
			var ywbh=$scope.ywDetails.hjqy.ID;
			var qyxh=$scope.ywDetails.hjqy.QYXH;
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("请选择企业名称！");
				return false;
			}
			var xylb=$scope.ywDetails.hjqy.XYLB;
			if(g_checkIsNull(xylb)){
				$rootScope.mttAlert("信用类别不能为空！");
				return false;
			}
			var sffb=$("#sffb").val();
			if(sffb=='未发布'){
				sffb=0;
			}else if(sffb=='已发布'){
				sffb=-1;
			}else{
				$rootScope.mttAlert("请选择是否发布！");
				return false;
			}
			var hjnr=$scope.ywDetails.hjqy.HJNR;
			if(g_checkIsNull(hjnr)){
				$rootScope.mttAlert("获奖内容不能为空！");
				return false;
			}
			var jlyy=$scope.ywDetails.hjqy.JLYY;
			if(g_checkIsNull(jlyy)){
				$rootScope.mttAlert("奖励原因不能为空！");
				return false;
			}
			var hjsj=$("#HJSJ").val();
			//校验日期格式
			if(g_checkIsNull(hjsj)){
				$rootScope.mttAlert("获奖时间不能为空！");
				return false;
			}
			var bzh=$scope.ywDetails.hjqy.BZH;
			
			var requestBody = {_module:'TT',_method:'zxgl_saveQyhjxxYwWithID',ywbh:ywbh,xylb:xylb,sffb:sffb,hjnr:hjnr,hjsj:hjsj,jlyy:jlyy,bzh:bzh,qyxh:qyxh,appCzz:g_getLoginPhoneno()};
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
	}else{
		$(".ifEdit").removeAttr("disabled");
		$(".ifEdit2").removeAttr("disabled");
		g_dateSelect('#HJSJ', null, null);
		$("textarea.ifEdit").css("background","white");
		$scope.if_show_baocunButton1 = true;
		
		//保存修改的企业获奖信息
		$scope.saveQyhjxx = function(){
			var ywbh=$("#ywxh").val();
			var qyxh=$("#qymc").val();
			if(g_checkIsNull(qyxh)){
				$rootScope.mttAlert("请选择企业名称！");
				return false;
			}
			var xylb=$("#xylb").val();
			if(g_checkIsNull(xylb)){
				$rootScope.mttAlert("信用类别不能为空！");
				return false;
			}
			var sffb=$("#sffb").val();
			if(sffb=='未发布'){
				sffb=0;
			}else if(sffb=='已发布'){
				sffb=-1;
			}else{
				$rootScope.mttAlert("请选择是否发布！");
				return false;
			}
			var hjnr=$("#hjnr").val();
			if(g_checkIsNull(hjnr)){
				$rootScope.mttAlert("获奖内容不能为空！");
				return false;
			}
			var jlyy=$("#jlyy").val();
			if(g_checkIsNull(jlyy)){
				$rootScope.mttAlert("奖励原因不能为空！");
				return false;
			}
			var hjsj=$("#HJSJ").val();
			//校验日期格式
			if(g_checkIsNull(hjsj)){
				$rootScope.mttAlert("获奖时间不能为空！");
				return false;
			}
			var bzh=$("#beizhu").val();
			var requestBody = {_module:'TT',_method:'zxgl_saveQyhjxxYwNoID',ywbh:ywbh,xylb:xylb,sffb:sffb,hjnr:hjnr,hjsj:hjsj,jlyy:jlyy,bzh:bzh,qyxh:qyxh,appCzz:g_getLoginPhoneno()};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$("#ywxh").attr("value",data.content.ID);
					//$("#qymc option[value='"+data.content.QYMC+"']").attr("selected", true);
					$("#ywbz").attr("value",data.content.YWBZMC);
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR); 
				}
	        })	
		 }
	}
})

