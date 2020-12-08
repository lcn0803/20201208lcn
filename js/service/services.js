angular.module('services', ['ionic'])

    .factory('MyFactory', function ($http, $q, $rootScope, $ionicLoading, $state, $cordovaCamera, $ionicPopup,
    		ionicDatePicker,ionicTimePicker) {
        var factory = {};
        
        /**
         * HTTP请求交互公共方法(带加载提示)
         * @param endpoint 请求URL
         * @param method GET或者POST
         * @param headers headers信息，默认null
         * @param params POST请求请求体params参数
         * @param load_text 加载提示语，不传会有默认值
         */
        factory.getHttpRequest = function (endpoint, method, headers, params, load_text) {
        	
        	//校验拦截处理
        	
//        	endpoint = endpoint.replace(/\#/g,"%23");
//        	endpoint = endpoint.replace(/\=/g,"%3D");
//        	endpoint = endpoint.replace(/\+/g,"%2B");
//        	endpoint = endpoint.replace(/\&/g,"%26");
        	
        	//处理numPerPage参数,改为取默认值
        	if(endpoint.indexOf("numPerPage") > 0 || endpoint.indexOf("pageNum") > 0){
        		endpoint = endpoint.replace(/numPerPage/g,"numPerPageNotUsed");
        		endpoint = endpoint + "&numPerPage=" + g_params_NumPerPage();
	    	}
        	
        	//请求加默认系统参数
        	if(endpoint.indexOf("?") > 0){
        		endpoint = endpoint + "&_grqch="+g_getLoginName()+"&_zjhm="+g_getLoginIdno()+"&_orgno="+g_getOrgno();
        	}else{
        		endpoint = endpoint + "?_grqch="+g_getLoginName()+"&_zjhm="+g_getLoginIdno()+"&_orgno="+g_getOrgno();;
        	}
        	
            var defer = $q.defer();
            if (method == 'GET') {
            	$rootScope.showLoading(load_text);
                $http({
                    url: endpoint,
                    method: "GET",
                    languageColumn: "name_eu",
                    //headers: headers,
                    //params: params,
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
            	if(!params){
            		//若为null，则改为空对象，否则后台某些转换可能报错
            		params = {defaultMeg:"注意调用getHttpRequest方法，没有传入任何请求对象"};
            	}
                $http({
                    url: endpoint,
                    method: method,
                    //headers: headers,
                    languageColumn: "name_eu",
                    data: params,
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
		 * @param otherUrlWithoutPageNum 请求路径，不需要包含pageNum、numPerPage参数
		 * @param listNameInHtml html页面中循环list的名字
		 * @param ifRefresh 是否刷新
		 * @param ifFromPullRefresh 是否下拉动作触发刷新
	     */
        factory.loadMore = function (otherUrlWithoutPageNum, listNameInHtml, ifRefresh, ifFromPullRefresh) {
	    	console.log("MyFactory===开始===是否刷新："+ifRefresh+"是否下拉动作触发刷新:"+ifFromPullRefresh);
	    	if(!otherUrlWithoutPageNum){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：otherUrlWithoutPageNum不能为空!');
	    		return false;
	    	}else if(otherUrlWithoutPageNum.indexOf("pageNum") > 0){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：请求路径中不能包含pageNum字段!');
	    		return false;
	    	}else if(otherUrlWithoutPageNum.indexOf("numPerPage") > 0){
	    		$rootScope.mttAlert('调用公共加载更多函数错误：请求路径中不能包含numPerPage字段!');
	    		return false;
	    	}
	    	if(!$rootScope.pageNum || ifRefresh){
	    		$rootScope.pageNum = 1;
	    	}
	    	console.log("MyFactory=准备$http");
	    	if($rootScope.pageNum > 1 || !ifFromPullRefresh){//加载更多或者直接调用刷新（非下拉触发）
	    		$rootScope.showLoading();
	    	}
	    	var req_url = baseurl + otherUrlWithoutPageNum + "&pageNum=" + $rootScope.pageNum + "&numPerPage=" + g_params_NumPerPage() + "&_grqch="+g_getLoginName()+"&_zjhm="+g_getLoginIdno()+"&_orgno="+g_getOrgno();
	    	req_url=req_url.replace(/\#/g,"%23");
//	    	req_url=req_url.replace(/\=/g,"%3D");
//	    	req_url=req_url.replace(/\+/g,"%2B");
//	    	req_url=req_url.replace(/\&/g,"%26");
	    	$http({
	    		method: 'GET',
	    		url: req_url
//	    		url: baseurl + otherUrlWithoutPageNum + "&pageNum=" + $rootScope.pageNum + "&numPerPage=" + g_params_NumPerPage() + "&_grqch="+g_getLoginName()+"&_zjhm="+g_getLoginIdno(),
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
	    	}else if(31 == templateId){//存量房交易备案
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(101 == templateId){//存量房网签合同PDF（已备案）
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(102 == templateId){//存量房网签合同-经济机构PDF（已备案）
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(600 == templateId){//商品期房买卖网签【已备案】
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
	    		return true;
	    	}else if(601 == templateId){//商品现房买卖网签【已备案】
	    		PDFparameter = {"template":{"id":""+templateId+"","queryParameter":"id:"+paramsObj.ywbh+"","pageType":"A4"}};
	    		reqObject = {parameter:JSON.stringify(PDFparameter),email:receivEmail,id:paramsObj.ywbh,baseUrlPathIn:baseurl_in,baseUrlPathOut:baseurl,templateId:templateId,sender_name:$rootScope._param_wtf,app_name:$rootScope._param_appname};
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
    
    
    .service('contractservice', function ($http, $ionicLoading) {

        this.hander = function (handermap) {
            return {
                'grqch': handermap.grqch,
                'zjlb': handermap.zjlb,
                'zjhm': handermap.zjhm
            }
        }
        this.saleuser = function (people) {
            var sales = [];
            var sale = {};
            angular.forEach(people, function (p, index, array) {

                sale = {
                    'grqch': p.ps_name,
                    'zjlb': p.ps_idcard,
                    'zjhm': p.ps_idcardno,
                    'grlb': p.ps_type,
                    'sshy': '',
                    'fzjg': ''
                };
                sales.push(sale);

            });
            return sales;
        }
        this.buildinfo = function (house) {
            var buildinfo = {};
            angular.forEach(house, function (h, index, array) {
                buildinfo = {
                    'xzqhdm': 140100,
                    'ljx': h.bd_cat_street,
                    'xq': h.bd_cat_project,
                    'lh': h.bd_code_planning_security_ci,
                    'zcs': h.bd_floors
                };
            });
            return buildinfo;
        }
        this.houseinfo = function (house) {
            var houseinfo = {};
            angular.forEach(house, function (h, index, array) {
                houseinfo = {
                    'hh': 140100,
                    'qsc': h.hs_startfloor,
                    'zhzhc': h.hs_endfloor,
                    'mylc': h.hs_startfloor,
                    'dy': h.hs_code_unit,
                    'fh': h.hs_code_planning_security_ci,
                    'zl': h.hs_location,
                    'jzjg': h.hs_structure,
                    'ghyt': h.hs_planning_use,
                    'jzmj': h.hs_buildarea,
                    'tnjzmj': h.hs_usearea,
                    'ftjzmj': h.hs_publicarea,
                    'dxbfjzmj': '',
                    'qtjzmj': '',
                    'ftxs': '',
                    'gytdmj': '',
                    'fttdmj': '',
                    'dydtmj': '',
                    'zhl': '',
                    'chx': '',
                    'jsh': '',
                    'shm': '',
                };
            });
            return houseinfo;
        }
        this.contractinfo = function (ysxkzh, saleuser, buyuser, house, jsydpzs, gcghxkz, tdsyqz, sgxkz, xmjyxkz) {

            console.info("封装数据开始...");
            console.info(buyuser);
            var cmrqch = "";
            var cmryyzzzch = "";
            angular.forEach(saleuser, function (s, index, array) {
                cmrqch = cmrqch + s.grqch;
                cmryyzzzch = cmryyzzzch + s.zjhm;
            });
            var msrqch = "";
            var msrxm = "";
            var msrzjlb = "";
            var msrzjhm = "";
            angular.forEach(buyuser, function (b, index, array) {
                msrqch = msrqch + b.grqch;
                msrxm = msrxm + b.grqch;
                msrzjlb = msrzjlb + b.zjlb;
                msrzjhm = msrzjhm + b.zjhm;
            });
            var djz = "";
            var zhuang_zuo = "";
            var djdy = "";
            var danyuan_ceng = "";
            var fh = "";
            var fwyt = "";
            var jzjg = "";
            var myc = "";
            var zcs = "";
            var jzmj = "";
            var tnmj = "";
            var ftmj = "";
            angular.forEach(house, function (h, index, array) {
                djz = h.bd_code_planning_security_ci;
                zhuang_zuo = h.bd_code_planning_security_ci;
                djdy = h.hs_code_unit;
                danyuan_ceng = h.hs_startfloor;
                fh = h.hs_code_planning_security_ci;
                fwyt = h.hs_planning_use;
                jzjg = h.hs_structure;
                myc = h.hs_startfloor;
                zcs = h.hs_endfloor;
                jzmj = h.hs_buildarea;
                tnmj = h.hs_publicarea;
                ftmj = h.hs_usearea;
            });

            var cmrqdtdfs = "";
            var tdsyzhlb = "";
            var tdsyzhm = "";
            var tdmj = "";
            var tdghyt = "";
            var tdsynx_start_year = "";
            var tdsynx_start_month = "";
            var tdsynx_start_day = "";
            var tdsynx_end_year = "";
            var tdsynx_end_month = "";
            var tdsynx_end_day = "";

            angular.forEach(tdsyqz, function (t, index, array) {

                cmrqdtdfs = t.tdsyqqdfs;
                tdsyzhlb = t.qzlx;
                tdsyzhm = t.zsbh;
                tdmj = t.syqmj1;
                tdghyt = t.tdpzyt1;
                tdsynx_start_year = (t.syqqsrq1).substring(0, 4);
                tdsynx_start_month = (t.syqqsrq1).substring(5, 7);
                tdsynx_start_day = (t.syqqsrq1).substring(8, 10);
                tdsynx_end_year = (t.syqzzrq1).substring(0, 4);
                tdsynx_end_month = (t.syqzzrq1).substring(5, 7);
                tdsynx_end_day = (t.syqzzrq1).substring(8, 10);
            });
            var zdzl = "";
            angular.forEach(jsydpzs, function (j, index, array) {
                zdzl = j.qx || '' + j.jd || '' + j.ymph || '';
            });

            var jsgcghxkzh = "";
            angular.forEach(gcghxkz, function (q, index, array) {
                jsgcghxkzh = q.gcghxkzh;
            });

            var sgxkzh = "";
            angular.forEach(sgxkzh, function (s, index, array) {
                jsgcghxkzh = s.sgxkzh;
            });

            var contractinfo = {
                'cmrqch': cmrqch,
                'cmryyzzzch': cmryyzzzch,

                'msrqch': msrqch,
                'msrxm': msrxm,
                'msrgj': '中国',
                'msrzjlb': msrzjlb,
                'msrzjhm': msrzjhm,
                'msrlx': '本人',

                //房屋
                'fwlx': '预售商品房',
                'ysspfpzjg': '',
                'spfysxkzh': decodeURIComponent(ysxkzh), //商品房预售许可证号
                'djz': djz,
                'zhuang_zuo': zhuang_zuo,
                'djdy': djdy,
                'danyuan_ceng': danyuan_ceng,
                'fh': fh,
                'fwyt': fwyt,
                'jzjg': jzjg,
                'myc': myc,
                'zcs': zcs,
                //:house[0].hs_endfloor,
                'dscs': '', //地上总层数
                'dxcs': '', //地下总层数
                'ytys': '', //阳台样式
                'jzmjdjlb': '',
                'jzmj': jzmj,
                'tnmj': tnmj,
                'ftmj': ftmj,

                //土地
                'cmrqdtdfs': cmrqdtdfs,
                'zdzl': zdzl,
                'zdbh': '',
                'tdsyzhlb': tdsyzhlb,
                'tdsyzhm': tdsyzhm,
                'tdmj': tdmj,
                'tdghyt': tdghyt,
                'tdsynx_start_year': tdsynx_start_year,
                'tdsynx_start_month': tdsynx_start_month,
                'tdsynx_start_day': tdsynx_start_day,
                'tdsynx_end_year': tdsynx_end_year,
                'tdsynx_end_month': tdsynx_end_month,
                'tdsynx_end_day': tdsynx_end_day,
                'jsgcghxkzh': jsgcghxkzh,
                'sgxkzh': sgxkzh
            }
            return contractinfo;
        }

    })
