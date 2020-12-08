angular.module('services-2.0', ['ionic'])

    .factory('MyFactoryNew', function ($http, $q, $rootScope, $ionicLoading, $state, $cordovaCamera, $ionicPopup,
    		ionicDatePicker,ionicTimePicker,$cordovaFileOpener2,$cordovaFileTransfer,$timeout) {
        var factory = {};
        
        /**
         * 版本更新
         * @param content 提示语
         */
        factory.showUpdateConfirm =function(content){
            var confirmPopup = $ionicPopup.confirm({   
                 title: '版本升级',
                 template: content, 
                 cancelText: '取消',
                 okText: '升级'
              });
            confirmPopup.then(function(res){
                if(res){
                     $ionicLoading.show({
                        template: "已经下载：0%"        
                     });
                     var url = baseurl+apkPath;
                     var targetPath = cordova.file.externalDataDirectory+apkName;  
                     var trustHosts = true
                     var options = {};
                     $cordovaFileTransfer.download(url,targetPath,options,trustHosts).then(function(result){
                         $cordovaFileOpener2.open(targetPath,'application/vnd.android.package-archive').then(function(){

                         },function(){

                         })
                         $ionicLoading.hide();
                       },function(err){
                    	   $ionicLoading.hide();
                    	   $rootScope.mttAlert('更新升级失败，请联系管理员!');
                       },function(progress){
                           $timeout(function(){
                               var downloadProgress = (progress.loaded / progress.total) * 100;
                                 $ionicLoading.show({
                                       template: "已经下载：" + Math.floor(downloadProgress) + "%"
                                 });
                                 if (downloadProgress > 99) {
                                       $ionicLoading.hide();
                                 }
                           })
                       });
               }else{

               }
           })
        }        
        
        /**
         * HTTP请求交互公共方法(带加载提示)
         * @param endpoint 请求URL
         * @param method GET或者POST
         * @param headers headers信息，默认null
         * @param paramsObj 请求体paramsObj参数对象
         * @param load_text 加载提示语，不传会有默认值
         */
        factory.getHttpRequest = function (endpoint, method, headers, paramsObj, load_text) {
        	
        	//校验拦截处理
        	
//        	endpoint = endpoint.replace(/\#/g,"%23");
//        	endpoint = endpoint.replace(/\=/g,"%3D");
//        	endpoint = endpoint.replace(/\+/g,"%2B");
//        	endpoint = endpoint.replace(/\&/g,"%26");
        	
            var defer = $q.defer();
            console.log(endpoint);
            if(endpoint.indexOf("?") > 0){
            	$rootScope.mttAlert("请求中不能在URL中加参数！");
        		return false;
        	}else if(endpoint.indexOf("export") < 0 && endpoint.indexOf("WithRB") < 0 && endpoint.indexOf("addSingle") < 0 && endpoint.indexOf("ttuser") < 0 && endpoint.indexOf("appimg") < 0 && endpoint.indexOf("appVideo") < 0 ){
	    		$rootScope.mttAlert('调用getHttpRequest错误：otherUrl不再接受非WithRB请求!');
    			return false;
	    	}
            if (method == 'GET') {
            	if(method == 'GET' && paramsObj){
            		console.log(endpoint);
            		$rootScope.mttAlert("GET请求不能发送RB！");
            		return false;
            	}
            	$rootScope.showLoading(load_text);
                $http({
                    url: endpoint,
                    method: "GET",
                    languageColumn: "name_eu",
                    //headers: headers,
                }).success(function (data) {
                	$rootScope.hideLoading();
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                	$rootScope.hideLoading();
                	$rootScope.mttAlert(PUBLIC_ERROR_NETWORK);
                    defer.reject(data);
                });
            } else {
            	$rootScope.showLoading(load_text);
            	if(!paramsObj){
            		//若为null，则改为空对象，否则后台某些转换可能报错
            		$rootScope.mttAlert("注意调用getHttpRequest方法，没有传入任何请求对象，就应该用GET");
            		return false;
            	}
            	
            	if(paramsObj){
            		paramsObj.numPerPage = g_params_NumPerPage();
            		paramsObj._grqch = g_getLoginName();
            		paramsObj._zjhm = g_getLoginIdno();
            		paramsObj._orgno = g_getOrgno();
            	}
            	
                $http({
                    url: endpoint,
                    method: "POST",
                    //headers: headers,
                    languageColumn: "name_eu",
                    data: paramsObj,
                }).success(function (data) {
                	$rootScope.hideLoading();
                    defer.resolve(data);
                }).error(function (data, status, headers, config) {
                	$rootScope.hideLoading();
                	$rootScope.mttAlert(PUBLIC_ERROR_NETWORK);
                    defer.reject(data);
                });
            }
            return defer.promise;
        };
        
	    /**
		 * @param otherUrl 请求路径，不能拼接参数
		 * @param paramsObj 请求体
		 * @param listNameInHtml html页面中循环list的名字
		 * @param ifRefresh 是否刷新
		 * @param ifFromPullRefresh 是否下拉动作触发刷新
	     */
        factory.loadMore = function (otherUrl, paramsObj, listNameInHtml, ifRefresh, ifFromPullRefresh) {
	    	console.log("MyFactory===开始===是否刷新："+ifRefresh+"是否下拉动作触发刷新:"+ifFromPullRefresh);
	    	if(!otherUrl){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：otherUrl不能为空!');
	    		return false;
	    	}else if(otherUrl.indexOf("?") > 0){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：请求路径中不能拼接请求参数!');
	    		return false;
	    	}else if(!g_checkIsJson(paramsObj)){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：paramsObj不是JSON对象!');
	    		return false;
	    	}else if(otherUrl.indexOf("WithRB") < 0){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：otherUrl不再接受非WithRB类请求!');
    			return false;
	    	}
	    	if(!$rootScope.pageNum || ifRefresh){
	    		$rootScope.pageNum = 1;
	    	}
	    	console.log("MyFactory=准备$http,请求体="+JSON.stringify(paramsObj));
	    	if($rootScope.pageNum > 1 || !ifFromPullRefresh){//加载更多或者直接调用刷新（非下拉触发）
	    		$rootScope.showLoading();
	    	}

	    	for(var key in paramsObj){
//	    		console.log("key="+key);
	    		var paramValue = paramsObj[key];
//	    		console.log("值的数据类型"+(typeof paramValue));
	    		if(typeof paramValue == 'string'){
	    			paramValue=paramValue.replace(/\#/g,"%23");
//		    	req_url=req_url.replace(/\=/g,"%3D");
//		    	req_url=req_url.replace(/\+/g,"%2B");
//		    	req_url=req_url.replace(/\&/g,"%26");
	    		}
	    		paramsObj[key] = paramValue;
	    	}
	    	paramsObj.pageNum = $rootScope.pageNum;
	    	if(paramsObj.numPerPage_self){
	    		paramsObj.numPerPage = paramsObj.numPerPage_self;
	    	}else{
	    		paramsObj.numPerPage = g_params_NumPerPage();
	    	}
	    	paramsObj._grqch = g_getLoginName();
	    	paramsObj._zjhm = g_getLoginIdno();
	    	paramsObj._orgno = g_getOrgno();
	    	
	    	$http({
	    		method: 'POST',
	    		url: baseurl + otherUrl,
	    		data: paramsObj
	    	}).success(function(data) {
	    		if($rootScope.pageNum > 1 || !ifFromPullRefresh){//加载更多或者直接调用刷新（非下拉触发）
	    			$rootScope.hideLoading();
	    		}
	    		console.log("MyFactory=已经uccess");
	    		if (data && data._page && data._page.count > 0){
	    			if(ifRefresh){
	    				$rootScope[listNameInHtml] = data._page.results;
	    			}else{
	    				$rootScope[listNameInHtml] = $.merge($rootScope[listNameInHtml],data._page.results);
	    			}
	    			if(data._page.currentPage < data._page.lastPage){
	    				$rootScope.pageNum = data._page.currentPage + 1;
	    				$rootScope.isListData = true;
	    				$rootScope.hasMore = true;
	    			}else{
	    				$rootScope.isListData = true;
	    				$rootScope.hasMore = false;
	    			}
	    		}else if (data && data._page && data._page.count == 0){
	    			$rootScope[listNameInHtml] = data._page.results;
	    			$rootScope.isListData = true;
	    			$rootScope.hasMore = false;
	    			$rootScope.mttAlert('您没有任何列表信息!');
	    		}else{
	    			if(data && data.type && data.type == "error" && data.content){
	    				$rootScope.mttAlert(data.content);
	    			}else{
	    				$rootScope.mttAlert('您没有任何列表信息!')
	    			}
	    		}
	    		if(ifRefresh){
	    			$rootScope.$broadcast('scroll.refreshComplete');
	    		}else{
	    			$rootScope.$broadcast('scroll.infiniteScrollComplete');
	    		}
	    		console.log("MyFactory======结束");
	    	}).error(function() {
	    		if($rootScope.pageNum > 1 || !ifFromPullRefresh){//加载更多或者直接调用刷新（非下拉触发）
	    			$rootScope.hideLoading();
	    		}
	    		$rootScope.mttAlert(PUBLIC_ERROR_NETWORK);
	    	});	    
	    };
        
	    /**
	     * 跳转循环到带刷新和加载更多功能的list页面,通用初始化操作
	     * @param data page类方法查询反馈的数据data
	     * @param listNameInHtml 在循环页面定义的循环list名称
	     * @param gotoListHtmlName 要跳转到的list页面的名称url
	     */
	    factory.listHtmlInitAndGoto = function (data, listNameInHtml, gotoListHtmlName) {
	    	$rootScope[listNameInHtml] = data._page.results;
	    	if(data._page.currentPage < data._page.lastPage){
	    		$rootScope.pageNum = data._page.currentPage + 1;
	    		$rootScope.isListData = true;
	    		$rootScope.hasMore = true;
	    	}else{
	    		$rootScope.isListData = true;
	    		$rootScope.hasMore = false;
	    	}
	    	if(data && data._page && data._page.count == 0){
	    		$rootScope.mttAlert('您没有任何列表信息!')
	    	}
	    	$state.go(gotoListHtmlName);
	    };
	    
	    //TODO------------------------------------PDF相关工程方法
	    
	    var PDFparameter = null;
    	var reqObject = null;
	    var receivEmail = null;
	    
    	function getReqObj(templateId,paramsObj){
    		if(g_checkIsNull(templateId)){
	    		$rootScope.mttAlert("校验失败：参数templateId不能为空！");
	    		return false;
	    	}else if(21 == templateId){//预售合同备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(11 == templateId){//商品房交易备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(32 == templateId){//预购商品房抵押备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(120 == templateId || 121 == templateId){//预购商品房抵押网签、预购商品房抵押网签（已备案）
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(140 == templateId || 141 == templateId){//一般抵押网签、一般抵押网签（已备案）
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(170 == templateId || 171 == templateId){//最高额抵押网签、最高额抵押网签（已备案）
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(37 == templateId){//一般抵押备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(38 == templateId){//最高额抵押备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(31 == templateId){//存量房交易备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(99 == templateId){//存量房网签-经纪机构
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(100 == templateId){//存量房网签
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(46 == templateId){//预售许可新建
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(70 == templateId){//现售备案-现售项目备案证明
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(352 == templateId){//楼盘新建-交易确认书
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(400 == templateId){//商品期房买卖网签
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(401 == templateId){//商品现房买卖网签
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(450 == templateId){//房源核验
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(500 == templateId){//家庭成员社会查询及协助查询
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(530 == templateId){//家庭成员协税查询
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(712 == templateId){//家庭成员信息查询
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,barcodeid:paramsObj.barcodeid,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else{
	    		$rootScope.mttAlert("校验失败：没有找到匹配参数templateId的相关处理程序！");
	    		return false;
	    	}
    	}
    	
	    /**
	     * 弹框输入邮箱并发送PDF到对应邮箱
	     * @param templateId 报表模板ID
	     * @param paramsObj 参数对象
	     */
	    factory.downPDF= function(templateId,paramsObj) {
	    	$rootScope.searchPopup = $ionicPopup.show({
	    		templateUrl:baseurl+'/static/tt/htm/public/emailPop.html',
				title:'邮件发送',
				scope: $rootScope,
				backdropClickToClose:true,
				cssClass:'form-popup',
				animation: 'slide-in-up',
				buttons:[{
							text: '<b>取 消</b>',
							type: 'button-light',
							onTap: function(e) {
								$rootScope.searchPopup.close();
							}
						},
						{
							text: '<b>发 送</b>',
							type: 'button-positive',
							//判断邮箱是否为空
							onTap: function(e) {
									  receivEmail= $("#tishi").val();
									  $("#formtip").html('');
									  var format = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
									  if(receivEmail == ''){
										  $("#formtip").css("color","red");
										  $("#formtip").html("*邮箱不能为空");
										  e.preventDefault();
									  return false;
									  }else if(!format.test(receivEmail)){
										  $("#formtip").css("color","red");
										  $("#formtip").html("*邮箱格式不正确，请重新输入！");
										  e.preventDefault();
									  return false;
									  }
									  if(!getReqObj(templateId,paramsObj)){
								    		return false;
									  }
									  factory.getHttpRequest( baseurl + '/export/ctPdfAndSendEml', 'POST', null, reqObject).then(function (data) {
										  if(data && data.type && data.type=="success"){
											  $rootScope.mttAlert(data.content);
										  }else if(data && data.type && data.type=="error"){
											  $rootScope.mttAlert(data.content);
										  }else{
											  $rootScope.mttAlert(PUBLIC_OPER_ERROR);
										  }
								      })
								}
						}]
			});
	    }
	    
	    /**
	     * 弹框输入邮箱并发送Excel到对应邮箱
	     * @param templateId 报表模板ID
	     * @param paramsObj 参数对象
	     */
	    factory.downExcel= function(excelParameter) {
	    	$rootScope.searchPopup = $ionicPopup.show({
	    		templateUrl:baseurl+'/static/tt/htm/public/emailPop.html',
	    		title:'邮件发送',
	    		scope: $rootScope,
	    		backdropClickToClose:true,
	    		cssClass:'form-popup',
	    		animation: 'slide-in-up',
	    		buttons:[{
	    			text: '<b>取 消</b>',
	    			type: 'button-light',
	    			onTap: function(e) {
	    				$rootScope.searchPopup.close();
	    			}
	    		},
	    		{
	    			text: '<b>发 送</b>',
	    			type: 'button-positive',
	    			//判断邮箱是否为空
	    			onTap: function(e) {
	    				receivEmail= $("#tishi").val();
	    				$("#formtip").html('');
	    				var format = /^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
	    				if(receivEmail == ''){
	    					$("#formtip").css("color","red");
	    					$("#formtip").html("*邮箱不能为空");
	    					e.preventDefault();
	    					return false;
	    				}else if(!format.test(receivEmail)){
	    					$("#formtip").css("color","red");
	    					$("#formtip").html("*邮箱格式不正确，请重新输入！");
	    					e.preventDefault();
	    					return false;
	    				}
	    				if(g_checkIsNull(excelParameter)){
	    		    		$rootScope.mttAlert("校验失败：报表参数excelParameter不能为空！");
	    		    		return false;
	    		    	}
	    				//参数转换
	    				reqObject = {excelParameter:excelParameter,email:receivEmail,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    				factory.getHttpRequest( baseurl + '/export/ctExcelAndSendEml', 'POST', null, reqObject).then(function (data) {
	    					if(data && data.type && data.type=="success"){
	    						$rootScope.mttAlert(data.content);
	    					}else if(data && data.type && data.type=="error"){
	    						$rootScope.mttAlert(data.content);
	    					}else{
	    						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	    					}
	    				})
	    			}
	    		}]
	    	});
	    }
	    
	    /**
	     * 预览PDF
	     * @param templateId 报表模板ID
	     * @param paramsObj 参数对象
	     */
	    factory.showPDFImg= function(templateId,paramsObj) {
	    	if(!getReqObj(templateId,paramsObj)){
	    		return false;
	    	}
	    	factory.getHttpRequest( baseurl + '/export/showPdfImgFromMessage', 'POST', null, reqObject).then(function (data) {
	    		if(data && data.type && data.type=="success"){
					var imgObj = {};
					imgObj.SRC = data.content;
					$rootScope.p_showImgWindow(imgObj);
	    		}else if(data && data.type && data.type=="error"){
	    			$rootScope.mttAlert(data.content);
	    		}else{
	    			$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	    		}
	    	})		
	    }
	    
	    /**
	     * 显示PDF二维码
	     * @param templateId 报表模板ID
	     * @param paramsObj 参数对象
	     * @param _curURL 当前页面的路由
	     */	    
	    factory.showPdfQRCode = function(templateId,paramsObj,_curURL){
			if(!getReqObj(templateId,paramsObj)){
	    		return false;
	    	}
			factory.getHttpRequest( baseurl + '/export/createQRCodePNG', 'POST', null, reqObject).then(function (data) {
				if(data && data.type && data.content && data.type=="success"){
					$rootScope.showQRCode_backURL = _curURL;
					$rootScope.QRCodeArray = data.content;
					$state.go('showQRCode');
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}	
	    
	    /**
	     * 显示家庭成员查询PDF二维码
	     * @param templateId 报表模板ID
	     * @param paramsObj 参数对象
	     * @param _curURL 当前页面的路由
	     */	    
	    factory.showJTCYPdfQRCode = function(templateId,paramsObj,_curURL){
			if(!getReqObj(templateId,paramsObj)){
	    		return false;
	    	}
			factory.getHttpRequest( baseurl + '/export/createJTCYQRCodePNG', 'POST', null, reqObject).then(function (data) {
				if(data && data.type && data.content && data.type=="success"){
					$rootScope.showQRCode_backURL = _curURL;
					$rootScope.QRCodeArray = data.content;
					$state.go('showQRCode');
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	    //TODO------------------------------------PDF相关工程方法
	    
	    /**
	     * 日期选择（有部分BUG，下个月点击有问题）
	     * @param beginDate
	     * @param endDate
	     */
	    factory.openDatePicker= function (beginDate,endDate) {
	    	var datepickerObject = {
	    			titleLabel: 'Select', //可选
	    			closeButtonType: 'button-assertive', //可选
	    			setButtonType: 'button-assertive', //可选
	    			todayButtonType: 'button-assertive', //可选       
	    			inputDate: new Date(), //可选，输入值
	    			sundayFirst: true, //可选,星期一开头
	    			disabledDates: disabledDates, //可选,不可选的日期
	    			weekDaysList: weekDaysList, //可选
	    			monthList: monthList, //可选

	    			templateType: 'popup', //可选i.e.的模式 modal or popup(兼容模式？)
	    			showTodayButton: 'true', //可选
	    			modalHeaderColor: 'bar-positive', //可选
	    			modalFooterColor: 'bar-positive', //可选
	    			from: new Date(1950, 8, 2), //可选
	    			to: new Date(2030, 8, 25), //可选
	    			callback: function(val) { //Mandatory

	    				datePickerCallbacks(val);
	    			},
	    			dateFormat: 'yyyy-MM-dd', //可选
	    			closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
	    		};
	    	
	    	var ipObj1 = {
	        	      callback: function (val) { 
	        	        console.log('点击事件返回值 : ' + val+"【】"+ new Date(val));
	        	        console.log('点击事件返回值 : ' + new Date(val).format('yyyy-MM-dd'));
	        	        return new Date(val).format('yyyy-MM-dd');
	        	      },
	        	      from: beginDate,
	        	      to: endDate,
	        	      inputDate: new Date(),
	        	      mondayFirst: false,
	        	      closeOnSelect: false,
	        	      dateFormat: 'yyyy-MM-dd',
	        	      templateType: 'popup'
	        	    };
	    	ionicDatePicker.openDatePicker(ipObj1);
	    }	    
	    
	    /**
	     * 时间选择
	     * @param showValueItemId 显示具体值的input元素ID
	     * @param initTime 初始化时间，注意格式HH:MM:SS
	     */
	    factory.openTimePicker= function (showValueItemId,initTime) {
	    	if(!initTime){
	    		initTime = 32400;
	    	}else{
	    		initTime = time_to_sec(initTime);
	    	}
	    	
		    var ipOb2 = {
		    	callback: function (val) {
		        if (typeof (val) === 'undefined') {
		        	
		        } else {
		          $("#"+showValueItemId).val(sec_to_time(val));
		        }
		      },
		      inputTime: initTime,//初始化上午9点
		      format: 12,//12或24小时制
		      step: 10,//分钟间隔
		    };
		    ionicTimePicker.openTimePicker(ipOb2);
	    }	    
	    
        return factory;
    })
