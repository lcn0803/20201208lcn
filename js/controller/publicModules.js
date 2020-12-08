/**
 * 公共类模块集合
 */
angular.module('controller_publicModules', ['ionic', 'highcharts-ng', 'ngCordova', 'services','services-2.0'])

/**
 * 其他系统URL接入（目前只有NTTAPP）
 */
.controller('otherSystemAccessController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate,$http,$location,$ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	//本系统接入参数
	var token 		= $location.$$search.token;
	var routeName 	= $location.$$search.routeName;
	var backRouteName 	= $location.$$search.backRouteName;

	
	if((typeof token) != "string"){
		$rootScope.mttAlert("令牌不能为空！");
		return false;
	}

	$scope.appuser={token:token};
	console.log("准备单点登录");
	$rootScope.ifTokenLogin = true;
	MyFactoryNew.getHttpRequest( baseurl + '/ttuser/login', 'POST', null, $scope.appuser, "OFF").then(function (data) {
		console.log("单点登录返回");
		if(data && data.type && data.type=="success"){
			//TODO URL登录成功
			window.localStorage.setItem("firstname",data.content._app_name);
			window.localStorage.setItem("phoneno",data.content._app_phoneno);
			window.localStorage.setItem("idno",data.content._app_idno);
			window.localStorage.setItem("only_see_bitspno",data.content._app_bitspno);
			//令牌登录时，从后端处理后的tokenMap中取数据
			window.localStorage.setItem("orgno",data.content.orgno);
			window.localStorage.setItem("roleno",data.content.roleno);
			window.localStorage.setItem("orgtypeno",data.content.orgtypeno);
			window.localStorage.setItem("token_nttapp",data.content.token_nttapp);//用于令牌接入NTTAPP
			
			$rootScope._app_orgno = g_getOrgno();
			$rootScope._app_orgtypeno = g_getOrgTypeno();
			$rootScope._app_roleno = g_getRoleno();
			$rootScope._app_ywsp_sfxs = false;
			if($rootScope.ywspjsjList && $rootScope.ywspjsjList.length>0){
				for(var i=0;i<$rootScope.ywspjsjList.length;i++){
					if($rootScope._app_roleno==$rootScope.ywspjsjList[i].SJZDBCZ){
						$rootScope._app_ywsp_sfxs = true;
						break;
					}
				}
			}			
			//处理跳转及返回NTTAPP准备
			$rootScope.goRouteForBack_NTTAPP(routeName,null,backRouteName)
			
		}else if(data && data.type && data.type=="error"){
			if(data.content){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("令牌登录失败！");
			}
		}else{
			$rootScope.mttAlert("令牌登录失败！");
		}
    })	
})

/**
 * 冀时办URL接入
 */
.controller('jsbSystemAccessController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate,$http,$location,$ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	//本系统接入参数
	var token 		= $location.$$search.accessLink;
	var routeName 	= $location.$$search.routeName;
	var backRouteName 	= $location.$$search.backRouteName;

	
	if((typeof token) != "string"){
		$rootScope.mttAlert("令牌不能为空！");
		return false;
	}else{
		$http({
	        method: 'GET',
	        url:'http://103.126.126.119:8039/auth/getAccessLinkForUserTmpMsg?C-App-Id=XTZHFWJY_APP_HB_001&appPwd=xTZh08@25w&accessLink='+token,
	        languageColumn: "name_eu",
	    }).success(function (data){
	    	console.log('获取冀时办数据data:',data)
	    	if(data && data['C-Response-Desc']=="success" && data['C-API-Status']=="00" && data['C-Response-Body'] !="null" && data['C-Response-Code']=="000000000000"){
	    	//if(data && data['C-Response-Desc'] && data['C-API-Status'] && data['C-Response-Code']){
	    		console.log("参数获取成功:"+data['C-Response-Body']);	    		
	    		var obj =JSON.parse(data['C-Response-Body']);	    		
	    		var app_name=obj.Truename;
	    		var app_idno=obj.Idcard;
	    		var app_phoneno=obj.Mobile;
	    		var systemtype='jsb';
	    			    		
	    		/*var app_name='张园星';
	    		var app_idno='610323199301076830';
	    		var app_phoneno='15339086930';*/

	    		//$scope.appuser={token:token};
	    		$scope.appuser={token:token,systemtype:systemtype,app_name:app_name,app_idno:app_idno,app_phoneno:app_phoneno};
	    		console.log("准备单点登录");
	    		$rootScope.ifTokenLogin = true;
	    		$rootScope.ifJSBTokenLogin = true;
	    		MyFactoryNew.getHttpRequest( baseurl + '/ttuser/login', 'POST', null, $scope.appuser, "OFF").then(function (data) {
	    			console.log("单点登录返回");
	    			if(data && data.type && data.type=="success"){
	    				//TODO URL登录成功
	    				window.localStorage.setItem("firstname",data.content._app_name);
	    				window.localStorage.setItem("phoneno",data.content._app_phoneno);
	    				window.localStorage.setItem("idno",data.content._app_idno); 
	    				window.localStorage.setItem("only_see_bitspno",data.content._app_bitspno);
	    				//令牌登录时，从后端处理后的tokenMap中取数据
	    				window.localStorage.setItem("orgno",data.content.orgno);
	    				window.localStorage.setItem("roleno",data.content.roleno);
	    				window.localStorage.setItem("orgtypeno",data.content.orgtypeno);
	    				window.localStorage.setItem("token_jsb",token);
	    				
	    				$rootScope._app_orgno = g_getOrgno();
	    				$rootScope._app_orgtypeno = g_getOrgTypeno();
	    				$rootScope._app_roleno = g_getRoleno();
	    				$rootScope._app_ywsp_sfxs = false;
	    				if($rootScope.ywspjsjList && $rootScope.ywspjsjList.length>0){
	    					for(var i=0;i<$rootScope.ywspjsjList.length;i++){
	    						if($rootScope._app_roleno==$rootScope.ywspjsjList[i].SJZDBCZ){
	    							$rootScope._app_ywsp_sfxs = true;
	    							break;
	    						}
	    					}
	    				}			
	    				//处理跳转及返回NTTAPP准备
	    				$rootScope.goRouteForBack_NTTAPP(routeName,null,backRouteName)
	    				var pass_word=data.content.password;
	    				console.log("当前登陆者密码："+pass_word);
	    				/*if(pass_word!=null && pass_word == "jsb123456"){
	    					$rootScope.mttAlert("如需在邢台智慧房屋交易APP登陆操作请使用默认密码【jsb123456】进行登录，登陆后可自行修改默认密码！");
	    				}*/
	    			}else if(data && data.type && data.type=="error"){
	    				if(data.content){
	    					$rootScope.mttAlert(data.content);
	    				}else{
	    					$rootScope.mttAlert("令牌登录失败！");
	    				}
	    			}else{
	    				$rootScope.mttAlert("令牌登录失败！");
	    			}
	    	    })	
	    	}else{
	    		$rootScope.mttAlert("获取数据失败！");
	    	}
	    	
	    })
	}
	
})
/**
 * 在线咨询
 */
.controller('zxzxController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,MyFactoryNew){
    
	var websocket;
	var content = $("#mainUL");
	$(".footer").hide();
	
	$scope.$on('$destroy',function(){
		if(websocket && websocket.readyState && websocket.readyState != 3){//页面销毁时，保证链接一定关闭。
			websocket.close(); //关闭TCP连接
		}
	})  
	
	$scope.connection = function(phoneNo,roleNo,userName){
		var host = $rootScope._param_WssUrl.substr($rootScope._param_WssUrl.lastIndexOf("/")+1);
		//判断当前浏览器是否支持WebSocket
		var socketUrl = "ws://" + host + "/webSocketServer/" + phoneNo + "/" + roleNo + "/" + userName;
		if ('WebSocket' in window) {
			websocket = new WebSocket(socketUrl);
		} else if ('MozWebSocket' in window) {
			websocket = new MozWebSocket(socketUrl);
		}
		
		websocket.onopen = function(evnt) {
			content.append('<li><span>系统提示：链接服务器成功！</span></li>');
			$(".footer").show();
		};
		
		websocket.onmessage = function(evnt) {
			if(evnt.data.indexOf("系统提示") >= 0){
				content.append('<li><span>'+evnt.data+'</span></li>');
			}else{
				content.append('<li><span class="spanleft">'+evnt.data+'</span></li>');
			}
			content.scrollTop(content[0].scrollHeight);
		};
		
		websocket.onerror = function(evnt) {
			content.append('<li><span>"系统提示：链接服务器失败，请退出后重新进入！"</span></li>');
			content.scrollTop(content[0].scrollHeight);
		};
		
		websocket.onclose = function(evnt) {
			content.append('<li><span>系统提示：与服务器断开链接，请退出后重新进入！</span></li>');
			content.scrollTop(content[0].scrollHeight);
			$(".footer").hide();
		}
	}
	
	$rootScope.zxzx_backKey = function(routeName){
		var confirmPopup = $ionicPopup.confirm({
			title: '退出',
			template: '您确认要退出在线咨询?',
			cancelText: '取消',
            okText: '确定'
		});
		confirmPopup.then(function(res) {
			if(res) {
				if(websocket){
					websocket.close(); //关闭TCP连接
				}
				$state.go(routeName);
			};
		})
	}
    
	$scope.send = function(){
   		if (websocket != null) {
			var message = $.trim($("#text").val());
			if (!message) {
				$rootScope.mttAlert('操作失败：不能发送空消息！');
				return false;
			}
			content.append('<li><span class="spanright">'+message+'</span></li>');
			content.scrollTop(content[0].scrollHeight);
			websocket.send(message);
			$("#text").val("");
		} else {
			$rootScope.mttAlert('未与服务器链接.');
		}
	}
	
	$scope.connection(g_getLoginPhoneno(),g_getRoleno(),g_getLoginName());
	
})

/**
 * 跳转外部链接：1.微信端，显示当前页面，提示自带浏览器打开；2.非微信端，自动打开目标URL。
 */
.controller('WeChatToOutTempController',function($rootScope,$scope,$state,$stateParams,MyFactoryNew){
	
	var thisURL = document.location.href;
	
    if (thisURL.indexOf("?outUrl") < 0) {
    	var outUrl = $stateParams.outUrl;
    	if((typeof outUrl) != "string" || !outUrl || outUrl == ""){
    		$rootScope.mttAlert("操作失败：跳转地址不能为空！");
    		return false;
    	}
    	thisURL = thisURL.substr(0,thisURL.lastIndexOf("/")+1);
    	thisURL = thisURL + "WeChatToOutTemp?outUrl=" + outUrl;
    	window.location.href = encodeURI(encodeURI(thisURL));
    }
	
	//当前环境是非微信时，才自动跳转
	if(!$rootScope.PUBLIC_CLIENT_WECHAT){
		var realOutUrl = thisURL.substr(thisURL.lastIndexOf("outUrl="));
		realOutUrl = realOutUrl.substr(realOutUrl.indexOf("=")+1);
		window.location.href = decodeURIComponent(realOutUrl);
	}
})

/**
 * 签名
 */
.controller('qianMingController',function($rootScope,$scope,$state,$stateParams,MyFactoryNew){
	if((typeof $stateParams.baseactivityid) != "number" || (typeof $stateParams.realtypeid) != "number" || (typeof $stateParams.ywbh) != "number"){
		$rootScope.mttAlert("操作失败：业务基类、业务细类、业务编号都不能为空！");
		return false;
	}
	if(!$stateParams.flbhs || $stateParams.flbhs == ""){
		$rootScope.mttAlert("操作失败：分类编号不能为空！");
		return false;
	}
	
	var bastatus = $stateParams.bastatus;
	var baseactivityid = $stateParams.baseactivityid;
	var realtypeid = $stateParams.realtypeid;
	var ywbh = $stateParams.ywbh;
	var zjhm = g_getLoginIdno();
	var if_qianzi = $stateParams.if_qianzi;
	var flbhs = $stateParams.flbhs;
	var tablet;	
	
	//设置第三方代码中初始化的canvas固定高度
	window.self_init_canvas_height = "300";

    $(function (){
    	$("#msg_error").hide();
        tablet = new Tablet("#container",{
        	defaultColor: "#000000",
            otherHtml: $("#temp").html(),
            onInit: function (){
                var that = this,
                container = this.container;
                that.setLineWidth(5);
                $("#mainDiv").css("margin-top",$(".bar-dark").outerHeight(true));
                container.find(".save-canvas-to-img").on("click", function (){
                    //业务编号ywbh 证件号码zjhm 签名路径qmlj 附件类型fjlx 
                	var requestBody = {imgBase64Date:that.getBase64(),ywbh:ywbh,zjhm:zjhm,flbh:$scope.selectObj.itemObj.SJZDBCZ,"imgPurpose":"app_dzqm"};
                	MyFactoryNew.getHttpRequest( baseurl + '/export/saveQianMing', 'POST', null, requestBody).then(function (data) {
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
                });
            }
        });
//        $scope.imgObj = {};
//        $scope.imgObj.SRC = "http://192.168.4.108:8009/dzqm/"+ywbh+"/"+$scope.selectObj.itemObj.SJZDBCZ+".jpg"+"?t="+Math.random();
        $scope.qrllbList = [];
        $scope.selectObj = {itemObj:""};
        //判断是否显示
        if(bastatus == -1){
        	$(".showInfo").hide();
        	$("#msg_error").show();
        	$scope.msgError = "提示：业务办结不能进行签字！";
        }else{
        	if("164802" == baseactivityid){//存量房网签
        		if(flbhs == 1 || flbhs == "1,8"){
        			var obj = {SJZDXSZ:"出卖人",SJZDBCZ:1};
        			$scope.qrllbList.push(obj);
        		}else if(flbhs == 5 || flbhs == "4,5"){
        			var obj = {SJZDXSZ:"买受人",SJZDBCZ:5};
        			$scope.qrllbList.push(obj);
        		}else if(flbhs == 99){
        			var obj = {SJZDXSZ:"经纪人",SJZDBCZ:99};
        			$scope.qrllbList.push(obj);
        		}else if(flbhs == "1,5"){
        			var obj1 = {SJZDXSZ:"出卖人",SJZDBCZ:1};
        			var obj2 = {SJZDXSZ:"买受人",SJZDBCZ:5};
        			$scope.qrllbList.push(obj1);
        			$scope.qrllbList.push(obj2);
        		}else{
        			$(".showInfo").hide();
        			$scope.msgError = "提示：目前支持转让方、受让方、经纪机构-经纪人进行签字，其他权利人类别暂不支持或暂不需要签字。";
                	$("#msg_error").show();
        		}
        		if(flbhs == "1,5" && if_qianzi < 2){
        			$scope.if_qianzi_desc = "未签字或数量不够！";
        		}else if(if_qianzi < 1){
        			$scope.if_qianzi_desc = "未签字！"
        		}else{
        			$scope.if_qianzi_desc = "已签字！";
        		}
        	}else if("163801" == baseactivityid || "164801" == baseactivityid){//商品期房买卖网签、商品现房买卖网签
        		if(flbhs == 5 || flbhs == "5,8"){
        			var obj = {SJZDXSZ:"买受人",SJZDBCZ:5};
        			$scope.qrllbList.push(obj);
        		}else{
        			$(".showInfo").hide();
        			$scope.msgError = "提示：目前支持受让方进行签字，其他权利人类别暂不支持或暂不需要签字。";
                	$("#msg_error").show();
        		}
        		if(if_qianzi < 1){
        			$scope.if_qianzi_desc = "未签字！"
        		}else{
        			$scope.if_qianzi_desc = "已签字！";
        		}
        	}else if("161901" == baseactivityid || "161701" == baseactivityid || "163901" == baseactivityid){//一般抵押网签、预购商品房抵押网签、最高额抵押网签
        		if(flbhs == 2){
        			var obj = {SJZDXSZ:"抵押人",SJZDBCZ:2};
        			$scope.qrllbList.push(obj);
        		}else{
        			$(".showInfo").hide();
        			$scope.msgError = "提示：目前支持抵押人进行签字，其他权利人类别暂不支持或暂不需要签字。";
                	$("#msg_error").show();
        		}
        		if(if_qianzi < 1){
        			$scope.if_qianzi_desc = "未签字！"
        		}else{
        			$scope.if_qianzi_desc = "已签字！";
        		}
        	}else{
        		$(".showInfo").hide();
    			$scope.msgError = "提示：未进行处理的业务类别。";
            	$("#msg_error").show();
        	}
        }
    });
    
})

/**
 * 扫一扫功能
 */
.controller('scanEWMController', function($rootScope,$scope, $state, $http, $ionicSideMenuDelegate, $ionicModal, $cordovaBarcodeScanner, $ionicPopup, MyFactoryNew) {
	
	$scope.htxx={text:'',htbh:'',queryRes:''};
	
	//扫一扫触发-APP端
	$scope.scan_APP = function() {
		$cordovaBarcodeScanner.scan().then(function(barcodeData) {
			if(barcodeData && barcodeData.cancelled == false){//扫描有结果
				if(barcodeData.format == "QR_CODE"){//二维码
					$scope.saoYiSao_deal(barcodeData.text);
				}else{
					$rootScope.mttAlert('操作失败：暂不支持非二维码的结果处理！');
				}
			}else{
				//无提示
			}
		}, function(error) {
			$rootScope.mttAlert("扫一扫功能发生错误："+JSON.stringify(error));
		});
	}
	
	//扫一扫触发-微信端
	$scope.scan_WeChat = function() {
		$rootScope.WeChat_JSSDK_scanQRCode(function(){
			$rootScope.saoYiSao_deal($rootScope.WeChat_JSSDK_scanQRCode_resultStr);
		});
	}
	
	//扫一扫-公共处理扫码结果字符串
	$rootScope.saoYiSao_deal = function(text) {
		$scope.htxx={text:'',htbh:'',queryRes:''};
		$scope.htxx.text = text;
		var scanText = text;
		var htbh = "";
		if(!scanText || (scanText && scanText.length < 6)){
			$rootScope.mttAlert("操作失败：没有扫描或识别到合同编号信息！");
			return false;
		}
		//首先截取合同号
		if(scanText.indexOf("合同编号:") > -1 && scanText.indexOf("是否备案:") > -1 && scanText.indexOf(",") > -1){//1.APP商品期现房两类:【合同编号:xx,是否备案:xxx】
			scanText = scanText.substring(scanText.indexOf(":")+1,scanText.indexOf(","));
		}else if(scanText.indexOf("合同号:") > -1 && scanText.indexOf("业务编号:") > -1 && scanText.indexOf(",") > -1){//2.APP存量房签约两类：【合同号:xxx,业务编号:xxx】
			scanText = scanText.substring(scanText.indexOf(":")+1,scanText.indexOf(","));
		}else if(scanText.indexOf(":") > -1 && scanText.indexOf(",") > -1){//3.TT中本插件识别乱码：实际【合同号:xxx,业务编号:xxx】
			scanText = scanText.substring(scanText.indexOf(":")+1,scanText.indexOf(","));
		}else{
			//原本文字不作处理
		}
		$scope.htxx.htbh = scanText;
		//再进一步判断是否符合格式
		if((/^[0-9YS]+$/.test(scanText) || /^[0-9XS]+$/.test(scanText) || /^[0-9CS]+$/.test(scanText) || /^[0-9DY]+$/.test(scanText)) && scanText.length >= 8){
			htbh = scanText;
		}else{
			$rootScope.mttAlert("操作失败：合同编号不符合规范！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'scanEWM_getHTXX',htbh:htbh};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.QUERYRES){
				$scope.htxx.htbh = htbh;
				$scope.htxx.queryRes = data.QUERYRES;
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})		
	}
	
	$rootScope.WeChat_CheckAndInit();
})

/**
 * 人工实名认证
 */
.controller('rgsmrzController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicPopover,$stateParams,MyFactoryNew){
	
	$scope.AppUser={phoneno:'',name:'',idcard:''};
	
	//认证
	$scope.renzheng = function() {
		
		if(g_checkNullByClass($rootScope,"mainDiv","notNull")){
    		return false;
    	}
		if($scope.AppUser.phoneno.toString().length != 11){
			$rootScope.mttAlert("请输入11位手机号码！");
			return false;
		}
		if(!g_isCardNo($scope.AppUser.idcard)){
			$rootScope.mttAlert("请输入规范的身份证号码！");
			return false;
		}
		
		$scope.AppUser.idcard = $scope.AppUser.idcard.toUpperCase();
		
        var requestBody = {_module:'Mobile',_method:'login2',_model:'AppUser',phoneno:$scope.AppUser.phoneno,name:$scope.AppUser.name,idcard:$scope.AppUser.idcard,rzczzphone:g_getLoginPhoneno()};
        MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/addSingle', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$rootScope.backKey();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })		
	}
	
	//认证信息清除
	$scope.renzhengClear = function() {
		
		if(g_checkNullByClass($rootScope,"mainDiv","notNull")){
    		return false;
    	}
		if($scope.AppUser.phoneno.toString().length != 11){
			$rootScope.mttAlert("请输入11位手机号码！");
			return false;
		}
		if(!g_isCardNo($scope.AppUser.idcard)){
			$rootScope.mttAlert("请输入规范的身份证号码！");
			return false;
		}
		
		$scope.AppUser.idcard = $scope.AppUser.idcard.toUpperCase();
		
		var requestBody = {_module:'Mobile',_method:'rgsmrzClear',_model:'AppUser',phoneno:$scope.AppUser.phoneno,name:$scope.AppUser.name,idcard:$scope.AppUser.idcard,rzqcczzphone:g_getLoginPhoneno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/addSingle', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function() {
					$rootScope.backKey();
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})		
	}
	
})
//债务人详细信息
.controller('pubZwrxxListController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactoryNew){

	var id=$stateParams.id;
	var qlrxh=$stateParams.qlrxh;
	var dwgr=$stateParams.dwgr;
	if(dwgr=="单位"){
    	dwgr=2;
	}else{
		dwgr=1;
	}
	$scope.if_cz = $stateParams.if_cz;
	if((typeof $scope.if_cz) != "boolean"){
		$scope.if_cz = false;
	}
	if($scope.if_cz){
		$("textarea.ifEdit").css("background","white");
	}
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		g_dateSelect('#CSRQ', null, null);
		g_dateSelect('#ZZPZRQ', null, null);
		g_dateSelect('#ZZJZRQ', null, null);
		g_dateSelect('#CLSJ', null, null);
	});
	//刷新
 	$scope.doRefresh= function() {
 		var requestBody = {_module:'TT',_method:'pubZwrxx_getListByPage',id:id,qlrxh:qlrxh,dwgr:dwgr};
 		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.zwrxxList=data.content;
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })	
 	}
 	$scope.doRefresh();
 	
    //债务人信息保存
	$scope.save_zwr = function($event,ng_obj){
		/*var lxdh=ng_obj.PHONENO;
		var lxdz=ng_obj.ADDRESS;*/
		var csrq=$("#CSRQ").val();
		var clsj=$("#CLSJ").val();
		var requestBody = {_module:'TT',_method:'save_zwrxx','saveObj':ng_obj,qlrxh:qlrxh,dwgr:dwgr,id:id,csrq:csrq,clsj:clsj};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
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
//楼盘表
//（注意期房、现房业务配置颜色CSS文件中：颜色来自数据库，不同环境可能配置不尽相同）

.controller('publicLpbController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,$ionicPopover,MyFactoryNew){
	
	var index_ld = 0;
	var index_floor = 0;
	//是否可操作房屋
	$scope.if_oper_room = $stateParams.if_oper_room;
	if((typeof $stateParams.if_oper_room) != "boolean"){
		$scope.if_oper_room = false;
	}
	$scope.floorList = null;
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		//楼栋选择
		$('.loupanbiao-loudong').off("click").on('click', function(){
//			console.log("楼栋index="+$(this).attr("xh"));
			var curItem = $(this);
			index_ld = curItem.attr("xh");
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				$scope.selectedLd = $scope.lpb.ldList[curItem.attr("xh")];
				//联动变更楼层信息
				$scope.floorList = $scope.lpb.ldList[curItem.attr("xh")].floorList;
				$scope.selectedFloor = $scope.floorList[0];
				$scope.$apply();
			}
			
		});
		
		//楼层/销售层选择
		$('.loupanbiao-louceng-xiaoshouceng-item').off("click").on('click', function(){
//			console.log("楼层/销售层index="+$(this).attr("xh"));
			var curItem = $(this);
			index_floor = curItem.attr("xh");
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				//联动变更选中的楼层信息
				$scope.selectedFloor = $scope.floorList[curItem.attr("xh")];
				//初始化期、现房的图例选中状态为不选中任何
				$('#filter-by-room-status .selected').removeClass("selected");
				$scope.$apply();
			}
		});
		
		//
		if($scope.if_oper_room){
			//房屋选中或取消
			$('.loupanbiao-louceng-xiaoshouceng-detail .col .colMainInfo').off("click").on('click', function(){
				var curItem = $(this).parent();
				var index_room = curItem.attr("xh");
				var isSelected = 0;
				var fwid = curItem.attr("id");
				if (curItem.hasClass('selected')) {//取消选中
					isSelected = 0;
				}else{//选中
					isSelected = 1;
				}
				var yw = $scope.lpb.yewu;
				var requestBody = {_module:'TT',_method:'lpb_changeFW',ID:yw.ID,pmBldroomID:fwid,isSelected:isSelected+"",pmMainTable:yw.ACTIVETABLENAME,pmStanID:yw.STANID,pmRealTypeID:yw.REALTYPEID};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data && data.type && data.type=="success"){
						curItem.toggleClass('selected');
						$scope.lpb.ldList[index_ld].floorList[index_floor].roomList[index_room].ISSELECTED = isSelected;
						$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
					}else if(data && data.type && data.type=="error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
					}
				})
			})
		}
		
		//期现房图例选择：目前只有期房
		$('#filter-by-room-status .status').off("click").on('click', function(){
			var curItem = $(this);
			var xh = curItem.attr("xh");
			if (curItem.hasClass('selected')) {
				
			} else{
				curItem.addClass('selected').siblings().removeClass('selected');
				$.each($(".roomDiv"), function(i, roomDiv) {
					var room = $.parseJSON($(roomDiv).attr("obj"));
					//当前两种图例，选中哪个图例哪个对象
					var tlObj = null;
					if($scope.init_show_qfxf == 1){//展示期房，则从期房图例中选择
						tlObj = $scope.selectedLd.qftlList[xh];
					}else{
						tlObj = $scope.selectedLd.xftlList[xh];
					}
					var selectedColor = tlObj.COLORCOL;
					var dynamicColor = $(roomDiv).attr("dynamicColor");
					if(room[selectedColor] == -1){//做过该业务的染成，该种业务颜色
						$(roomDiv).removeClass(dynamicColor);
						$(roomDiv).attr("dynamicColor",'status-'+selectedColor);
						$(roomDiv).addClass('status-'+selectedColor);
					}else{//没有做过该业务的染成，初始颜色
						$(roomDiv).removeClass(dynamicColor);
						if($scope.init_show_qfxf == 1){//展示期房，则从期房图例中选择
							$(roomDiv).attr("dynamicColor",'status-'+room.QFCOLOR);
							$(roomDiv).addClass('status-'+room.QFCOLOR);
						}else{
							$(roomDiv).attr("dynamicColor",'status-'+room.XFCOLOR);
							$(roomDiv).addClass('status-'+room.XFCOLOR);
						}
					}
				});
			}
		});
	});	

	$('.filter-room-status-toggle').on('click', function(){
		$('#filter-by-room-status').toggle();
	})	
	
	$ionicPopover.fromTemplateUrl("pop.html", {
		scope: $scope,
		animation: "slide-in-up",
		backdropClickToClose: true
	}).then(function(popover) {
		$scope.popover = popover;
	});
	$scope.showPop = function($event) {
		$scope.popover.show($event);
	};
	$scope.hidePop = function() {
		$scope.popover.hide();
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
	
	//房屋显示信息设置-重置
	$scope.roomInfosReset = function() {
		$(":checkbox").attr("checked", false);
	}
	
	//房屋显示信息设置-全选
	$scope.roomInfosAllCheck = function() {
		$(":checkbox").attr("checked", true);
	}
	
	//房屋显示信息设置-完成设置
	$scope.roomInfosSet = function(ifHidePop) {
		$(":checkbox").each(function(i,item){
			var showClassName = $(item).attr("referClass"); 
			var ifShow = $(item).attr("checked");
			if(ifShow){
				$scope[showClassName] = true;
			}else{
				$scope[showClassName] = false;
			}
		});
		if(ifHidePop){
			$scope.hidePop();
		}
	}
	
	//期现房切换
	$scope.changeQFXF = function() {
		if(!$scope.init_show_qfxf){
			$rootScope.mttAlert("初始化默认显示期现房参数错误！");
			return false;
		}else if($scope.init_show_qfxf != 1 && $scope.init_show_qfxf != 3){
			$rootScope.mttAlert("初始化默认显示期现房参数错误！");
			return false;
		}
		if($scope.init_show_qfxf == 1){
			$scope.init_show_qfxf = 3;
		}else{
			$scope.init_show_qfxf = 1;
		}
	}
	//楼盘表信息初始化或刷新
	$scope.initLpb = function() {
		$scope.lpb = null;
		//默认期现房显示哪个:1期房，3现房
		$scope.init_show_qfxf = $stateParams.init_show_qfxf;
		if((typeof $stateParams.init_show_qfxf) != "number"){
			$scope.init_show_qfxf = 1;
		}
		if($scope.init_show_qfxf != 1 && $scope.init_show_qfxf != 3){
			$rootScope.mttAlert("初始化默认显示期现房参数错误！");
			return false;
		}
		
		//初始化某些显示设置
		$('#filter-by-room-status').css("display","none");
		$scope.roomInfosReset();
		$scope.roomInfosSet();
		
		
		var requestBody = {_module:'TT',_method:'lpb_getInitMaps',id:$stateParams.id,ldid:$stateParams.ldid};
		if(!$stateParams.id && !$stateParams.ldid){
			$rootScope.mttAlert('业务编号或楼栋编号不能为空！');
			return false;
		}
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data){
				if(!data.ldList){
					$rootScope.mttAlert('获取初始化数据失败！');
					return false;
				}
				$scope.lpb = data;
				$scope.selectedLd = $scope.lpb.ldList[0];
				$scope.floorList = $scope.lpb.ldList[0].floorList;
				$scope.selectedFloor = $scope.floorList[0];
			}else{
				$rootScope.mttAlert('获取初始化数据失败！');
			}
        })		
	}	
	
	//默认调用方法
	$scope.initLpb();
	
})

//业务详细查看或保存---多个页签页面
.controller('ywDetailMapsController', function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$stateParams,MyFactory){

	var bastatus = null;
	var mastatus = null;
	var stanid = null;
	var baseactivityid = null;
	var sortid = null;
	
	//判断是否为只读模式
	function isDisabled(){
		
		$(".yshtba").hide();
		$(".clfFuKuanFangShi").hide();
		
		//字段显示
		if(baseactivityid == 161201){//预售合同备案
			$(".yshtba").show();
		}else if(baseactivityid == 162281){//存量房交易备案-业务-付款方式
			$(".clfFuKuanFangShi").show();
		}
		
		if(baseactivityid == 161201 && bastatus == 0 && mastatus == 1612010 && g_getRoleno() != PUBLIC_JS_GLY){//预售合同备案---草拟步骤
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}else if(baseactivityid == 162280 && bastatus == 0 && mastatus == 1622810 && g_getRoleno() != PUBLIC_JS_GLY){//商品房交易备案---草拟步骤
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}else if(baseactivityid == 162281 && bastatus == 0 && mastatus == 16228110 && (sortid == 5||sortid == 8||sortid == '1,5'||sortid == '1,8'||sortid == '4,5'||sortid == '4,8') && g_getRoleno() != PUBLIC_JS_GLY){//存量房交易备案---草拟步骤
			$scope.if_show_baocunButton = true;
			$(".ifEdit").removeAttr("disabled");
			$("textarea.ifEdit").css("background","white");
		}else{
			$(".ifEdit").attr("disabled","disabled");
		}
	}
	
	//业务详细maps查询
	$scope.xx = function(id) {
		
		$scope.ywDetails = null;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/queryRecordJson?_module=TT&_method=findAllDetailMap&&id=' + $stateParams.id, 'GET', null, null).then(function (data) {
			if(data && data._result){
				if(!data._result.yewu){
					$rootScope.mttAlert('获取详细信息失败！');
					return false;
				}
				if(data._result.zhuanrangfang.length == 0){
					data._result.zhuanrangfang[0] = {"QLRLB" :  " "};
				}
				if(data._result.shourangfang.length == 0){
					data._result.shourangfang[0] = {"QLRLB" : " "};
				}
				if(data._result.fangwu.length == 0){
					data._result.fangwu[0] = {"FWZL" : " "};
				}						
				$scope.ywDetails = data._result;
				bastatus = data._result.yewu.BASTATUS;
				mastatus = data._result.yewu.MASTATUS;
				stanid =   data._result.yewu.STANID;
				baseactivityid = data._result.yewu.BASEACTIVITYID;
				sortid = $stateParams.sortid;
				
				isDisabled();
				
			}else{
				$rootScope.mttAlert('获取详细信息失败！');
			}
        })		
	}	
	
	//默认调用详细方法
	$scope.xx();
	
	$(".tab-cont").css("display", "none").eq(0).css("display", "block");
	$(".tab .tab-item").on("click", function(){
		var index = $(this).index();
		$(this).addClass("actived").siblings().removeClass("actived");
		$(".tab-cont").css("display", "none").eq(index).css("display", "block");
		isDisabled();
	})
	
	//业务保存
	$scope.save_yw = function(){
		var id=$scope.ywDetails.yewu.YWBH;
		var description=$scope.ywDetails.yewu.BZ;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=saveYwInfo&&id='+id+'&&description='+description, 'POST', null, null).then(function (data) {
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
		var rightpeopletype=$scope.ywDetails.zhuanrangfang[index].DWGR;
		if(rightpeopletype=="单位"){
			  rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.zhuanrangfang[index].QLRXH;
        var address=$scope.ywDetails.zhuanrangfang[index].LXDZ;
        var phoneno=$scope.ywDetails.zhuanrangfang[index].LXDH;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=savePeopleAddPhone&&id='+id+'&&rightpeopletype='+rightpeopletype+'&&rightpeopleid='+rightpeopleid+'&&address='+address+'&&phoneno='+phoneno+'&&stanid='+stanid, 'POST', null, null).then(function (data) {
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
		var rightpeopletype=$scope.ywDetails.shourangfang[index].DWGR;
		if(rightpeopletype=="单位"){
			rightpeopletype=2;
		}else{
			rightpeopletype=1;
		}
		var rightpeopleid=$scope.ywDetails.shourangfang[index].QLRXH;
        var address=$scope.ywDetails.shourangfang[index].LXDZ;
        var phoneno=$scope.ywDetails.shourangfang[index].LXDH;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=savePeopleAddPhone&&id='+id+'&&rightpeopletype='+rightpeopletype+'&&rightpeopleid='+rightpeopleid+'&&address='+address+'&&phoneno='+phoneno+'&&stanid='+stanid, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	//房屋保存
	$scope.save_fw = function(index){
		var id=$scope.ywDetails.yewu.YWBH;
		var subno=$scope.ywDetails.fangwu[index].FWXH;
		var stringvalue1=$scope.ywDetails.fangwu[index].FJ;
		MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=saveSw2dFwInfo&&id='+id+'&&subno='+subno+'&&stringvalue1='+stringvalue1, 'POST', null, null).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(PUBLIC_OPER_SUCCESS);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
	    })	
	}
})

/**
 * 公共图片编辑
 */
.controller('publicEditPicsController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){
    
	var id = $stateParams.id;
	
	$scope.getAllImgs = function(ideaid,imgBaseName) {
		var requestBody = {_module:'TT',_method:'findAppImgList',id:id+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			$rootScope.sjzjList = null;
			if(data && data.length > 0 ){
				$rootScope.sjzjList = data;
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_ERROR_QUERYPICS);
			}
        })
	}
	
	$scope.getAllImgs();
	
	//APP端：收缴证件图片-获取数据
	$scope.sjzjImgUp_APP = function(ideaid,imgBaseName) {
		g_takePhoto($rootScope, $scope, $cordovaCamera, function(){
			if($scope.imageData){//拍照功能，返回有数据
				$scope.sjzjImgUp(ideaid,imgBaseName);
			}
		});
	}
	
	//WEB端：收缴证件图片-获取数据
	$scope.sjzjImgUp_WEB = function(curObj) {
		var ideaid = curObj.attributes.self_ideaid.value;
		var imgBaseName = curObj.attributes.self_ideaname.value;
		var inputId = curObj.attributes.id.value;
		g_WEB_dealPhoto($rootScope, $scope, function(){
			if($scope.imageData){//拍照功能，返回有数据
				$scope.sjzjImgUp(ideaid,imgBaseName);
				$("#"+inputId).val('');
			}
		});
	}	
	
	/**
	 * 收缴证件照片上传
	 */
	$scope.sjzjImgUp = function(ideaid,imgBaseName) {
		var imageData = $scope.imageData;
		var imgList = new Array();
		var imgObj ={imgData:imageData,ideaid:ideaid+"",filename:imgBaseName+'.jpg'};
		imgList.push(imgObj);
		//先上传再展示本地
		var requestBody = {_module:'TT',_method:'appImgToSjzjObject',imgList:imgList,id:id+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody,"请稍后,上传中……").then(function (data) {
			if(data && data.type && data.type=="success" && data.content && data.content.reducedImgData){
				var imgno = data.content.imgno;
				imageData = data.content.reducedImgData;
				var imgDom = "<div class='pic-item' id='div_"+imgno+"'><img id="+imgno+" src='data:image/jpeg;base64,"+imageData+"' /><i class='icon ion-close-circled' ></i></div>";
				$("#addPhotos"+ideaid).before(imgDom);
				$("#"+imgno).bind("click",function(){
					var imgObj = {};
					imgObj.CONTENT = imageData;
					$rootScope.p_showImgWindow(imgObj);
				});
				$("#div_"+imgno).find("i").bind("click",function(){
					$scope.delImg(imgno);
				});
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })	
	}	
	
	$scope.delImg = function(imgno) {
		var requestBody = {_module:'TT',_method:'delAppImg',imgno:imgno};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody,"请稍后,删除中……").then(function (data) {
			if(data && data.type && data.type=="success"){
				$("#div_"+imgno).remove();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
    };
    
})