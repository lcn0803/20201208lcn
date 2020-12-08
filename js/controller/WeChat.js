/**
 * 微信相关功能
 */
angular.module('WeChat_JSSDK', ['ionic', 'highcharts-ng', 'ngCordova'])

.run(function($rootScope, $ionicPlatform, $state, $stateParams, $ionicHistory, $ionicPopup, $cordovaKeyboard, $timeout, $ionicPopover, MyFactoryNew) {

	/**
	 * 校验是否微信端并初始化JSSDK
	 */
	$rootScope.WeChat_CheckAndInit = function() {
		
		//校验是否微信客户端：需要优化
		if($rootScope.PUBLIC_CLIENT_WECHAT){
			$rootScope.WeChat_JSSDK_Init();
		}
	}
	
	/**
	 * JSSDK初始化
	 */
	$rootScope.WeChat_JSSDK_Init = function() {
		var requestBody = {"curUrl" : location.href.split('#')[0]};
		MyFactoryNew.getHttpRequest( baseurl + '/WeChatWithRB/JSSDK_init', 'POST', null, requestBody).then(function (data) {
			if(data && data.appId){
				//微信真正配置初始化
			    wx.config({ 
			        debug: $rootScope._params_WeChatJsDebug==-1?true:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。   
			        appId: data.appId, // 必填，公众号的唯一标识
			        timestamp: data.timestamp, // 必填，生成签名的时间戳
			        nonceStr: data.nonceStr, // 必填，生成签名的随机串
			        signature: data.signature,// 必填，签名，见附录1
			        jsApiList: [
			                      'checkJsApi',
			                      'scanQRCode',// 微信扫一扫接口
			                      'startRecord',
			                      'stopRecord',
			                      'onVoiceRecordEnd',
			                      'playVoice',
			                      'uploadVoice'
			                   ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2 
			    }); 
			    wx.error(function(res) {
			    	//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
			    	$rootScope.mttAlert("微信初始化错误："+res.errMsg);
			    });

			    wx.ready(function() {
			    	//判断当前客户端版本是否支持指定JS接口
			       
			    });				
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	};
	
	$rootScope.WeChat_JSSDK_scanQRCode = function(callback) {
		if(callback === undefined || typeof callback != 'function'){
			$rootScope.mttAlert('调用WeChat_JSSDK_scanQRCode错误：必须有回调函数!');
			return false;
		}
		wx.scanQRCode({
			needResult : 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
			scanType : [ "qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
			success : function(res) {
				$rootScope.WeChat_JSSDK_scanQRCode_resultStr = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
				if(callback !== undefined && typeof callback == 'function'){
					callback();
				}
			},
			error : function(){
				$rootScope.mttAlert('微信扫一扫操作处理失败，请尝试重新扫码!');
			}
		});
	};
	
	$rootScope.WeChat_JSSDK_startRecord = function() {
		wx.startRecord({
            success: function(){
                localStorage.rainAllowRecord = 'true';
            },
            cancel: function () {
            	$rootScope.mttAlert('用户拒绝授权录音');
            }
        });
	};
	$rootScope.WeChat_JSSDK_endRecord = function() {
		wx.stopRecord({
	          success: function (res) {
	        	  localId = res.localId;
	          },
	          fail: function (res) {
	        	  $rootScope.mttAlert('微信录音失败:'+JSON.stringify(res));
	          }
	    });
	};
})