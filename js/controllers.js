var rentOutData = {
	"houseclassify": null
};
var app = {
	"age": 11
};
//商品房网签对象（包括房子信息和开发商信息）
var fangdetail = {};
//商品房出卖方对象
var chumaifang = {};
//商品房买受方对象
var maishoufang = {};
//商品房房屋对象
var fangwu = new Array();
//二手房买方
var orgpeople={};
//二手房卖方
var mforgpeople={};
//二手房房子对象
var ershoufangwu=new Array();
//抵押选中房源
var bldrooms=new Array();
//抵押人
var dypeople={};
//抵押机构（银行）
var orgorganize={};
//身份证照片
var shenfengzheng="";
//国徽
var guohui="";
//个人照片
var gerenzhao="";
//身份证
var idcard={};

//登录验证对象
var renzheng={};

//实名对比对象
var shiming={};

//备案业务编号
var babh="";

//本地
var baseurl = "http://127.0.0.1:8069";

//测试
//var baseurl ='http://wx2.xtfwapp.com';

//正式
//var baseurl ='http://wx.xtfwapp.com';

var apkName = "new.apk";
var apkPath = "/mtt_file/new.apk";

angular.module('Controllers', ['ionic', 'highcharts-ng', 'ngCordova', 'factorys'])
			
	.controller('IndexController', function($rootScope,$scope, $state, $http, $ionicSideMenuDelegate, $ionicModal, $cordovaBarcodeScanner, testFactory,$ionicPopup,MyFactoryNew) {
		
		if($rootScope._init_success){
			$rootScope.getZcfg();
		}
		
		//弹出开发中……
		$scope.kfz = function(){
			$rootScope.mttAlert('该项功能正在完善中,请等待.....')	
		}
		$scope.person = function() {
			$state.go("xingtai_me");
		}
		//跳往政策法规详情页
		$scope.gozcfginfo = function(id){
			$state.go("zhengce_info",{id:id});
		}
		
		//公共-跳转外部特殊URL
		$rootScope.goOutSpecialURL = function(outUrl,backURLParamsObj){
			//非微信直接跳转
			if(!$rootScope.PUBLIC_CLIENT_WECHAT){
				window.open(outUrl);
			}else{//跳转中间界面
				$rootScope.goRouteForBack("WeChatToOutTemp",{outUrl:outUrl},backURLParamsObj);
			}
		}
	})
	
	//政策法规详情
	
	.controller('zhengceInfoController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$sce){
		//获取id
		//console.log($stateParams.id)
		$http({
			method: 'GET',
			url: baseurl + '/bitsroad/queryRecordJson?_module=Mobile&_method=getPublicityByMap&id='+$stateParams.id,
		}).success(function(data) {
			$scope.infoData = data._result;
			var html = data._result.content.replace(/\/mtt_file\/ueditor\/image\//g, baseurl + '/mtt_file/ueditor/image/');
			$scope.htmlText = function () {
	            return $sce.trustAsHtml(html);
	        };
		}).error(function() {
			$rootScope.mttAlert('网络错误!');
		});
	
	})
	

	
	
	//商品房交易
	.controller('houseshangpingController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval){
		//弹出开发中……
		$scope.kfz = function(){
			$rootScope.mttAlert('该项功能正在完善中,请等待.....')	
		}
		
		$scope.spfwangqian = function() {
			if(g_checkLogin()){
				$state.go('wangqian-one');
			}else{
				$state.go('login');
			}
		}
		
		//交易备案
		$scope.spf_jyba = function() {
			if(g_checkLogin()){
				$state.go('spf_jyba');
			}else{
				$state.go('login');
			}
		}		
	})

	//二手房交易
	.controller('houseershouController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval){
		
			$scope.saleHouse= function(){
		
			if(g_checkLogin()){
				
				$state.go('saleershoufang')
			}else{
				$state.go('login');
			}
				
			
		}
			//二手房网签页面
		$scope.ershufangwangqian=function(){
		
			if(g_checkLogin()){
				$state.go('ershoufangwangqian-one');
			}else{
				
				$state.go('login');
			}
		}
	})
	
	
		//身份认证首页
	.controller('identifyfirstController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval){
		
		$scope.loginperson= function(){
			
			$state.go("idcardPerson");
			
		}
		//退出实名认证
		$rootScope.tcsmyz= function(){
			
			$state.go("login");
			
		}
	})
	

	//身份证正面认证
	.controller("idcardPersonController", function($rootScope,$scope,$state,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera) {
		/*拍摄须知*/
		$ionicModal.fromTemplateUrl('psxz.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_psxz = modal;
		});
		  
		/*正在上传*/
		$ionicModal.fromTemplateUrl('zzsc.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_zzsc = modal;
		});
		
		/*证件不完整*/
		$ionicModal.fromTemplateUrl('error_xianshi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_xianshi = modal;
		});
		
		//认证-人像面-WEB端
		$scope.rzperson_WEB = function(curObj) {
			var inputId = curObj.attributes.id.value;
		    var files = event.target.files,file;
		    if (files && files.length > 0) {
		        file = files[0];
		        var fileReader = new FileReader();
		        fileReader.readAsDataURL(file);
		        fileReader.onload = function(e) {
		            var base64Image = e.target.result;
		            $scope.imageData = base64Image.substring(base64Image.indexOf(',') + 1);
		            if ($scope.imageData) { //拍照功能，返回有数据
		            	$scope.rzperson($scope.imageData);
		                $("#"+inputId).val('');
		            }
		        };
		    }
		}
		
		//认证-人像面-APP端
		$scope.rzperson_APP = function() {
			g_takePhoto($rootScope, $scope, $cordovaCamera, function(){
				if($scope.imageData){//拍照功能，返回有数据
					$scope.rzperson($scope.imageData);
				}
			});
		};
		
		//认证-人像面
		$scope.rzperson = function(imageData) {
			$scope.model_zzsc.show();
			idcard.perplesrc = "data:image/jpeg;base64," + imageData;
			
			var	base64Data = idcard.perplesrc;
			$http({
				method: 'POST',
				url: baseurl + '/certification/front_idcard4base64',
				data: {base64Data:base64Data}
			}).success(function(data) {
				if(data.type=="success"){
					idcard.personname =data.content.cert_name;
					idcard.personpassword=data.content.cert_idcard;
					$scope.model_zzsc.hide();
					$state.go("identifyPersonResult");
				}
				if(data.type=="error"){
					$scope.model_zzsc.hide();
					$scope.model_xianshi.show();
				}
			}).error(function() {
				$rootScope.mttAlert(PUBLIC_ERROR_NETWORK);
			});
		};
		
	})
	
		//身份认正面照认证结果
	.controller('identifyPersonResultController',function($rootScope,$scope,$http,$state,$ionicModal,$ionicPopup,$interval){
		/*拍摄须知*/
		$ionicModal.fromTemplateUrl('psxz.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_psxz = modal;
		});
		  
		/*正在上传*/
		$ionicModal.fromTemplateUrl('zzsc.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_zzsc = modal;
		});
		
		
		
		/*证件不完整*/
		$ionicModal.fromTemplateUrl('error_xianshi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_xianshi = modal;
		});
		$scope.idcard=idcard;
		
		$scope.indentifySeconed= function() {
			
				$state.go("idcardCountry");
			
		}
	})
	
	//身份证反面照认证
	.controller("idcardCountryController", function($rootScope,$scope, $state, $ionicListDelegate, $http, $ionicLoading,$ionicModal,$ionicPopup,$cordovaCamera) {	
		/*拍摄须知*/
		$ionicModal.fromTemplateUrl('psxz.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_psxz = modal;
		});
		  
		/*正在上传*/
		$ionicModal.fromTemplateUrl('zzsc.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_zzsc = modal;
		});
		
	
		
		/*证件不完整*/
		$ionicModal.fromTemplateUrl('error_xianshi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_xianshi = modal;
		});
		
		//认证-国徽面-WEB端
		$scope.rzcountry_WEB = function(curObj) {
			var inputId = curObj.attributes.id.value;
		    var files = event.target.files,file;
		    if (files && files.length > 0) {
		        file = files[0];
		        var fileReader = new FileReader();
		        fileReader.readAsDataURL(file);
		        fileReader.onload = function(e) {
		            var base64Image = e.target.result;
		            $scope.imageData = base64Image.substring(base64Image.indexOf(',') + 1);
		            if ($scope.imageData) { //拍照功能，返回有数据
		            	$scope.rzcountry($scope.imageData);
		                $("#"+inputId).val('');
		            }
		        };
		    }
		}
		
		//认证-国徽面-APP端
		$scope.rzcountry_APP = function() {
			g_takePhoto($rootScope, $scope, $cordovaCamera, function(){
				if($scope.imageData){//拍照功能，返回有数据
					$scope.rzcountry($scope.imageData);
				}
			});
		};		
		
		//认证-国徽面
		$scope.rzcountry = function(imageData) {
			$scope.model_zzsc.show();
			idcard.certificatesrc = "data:image/jpeg;base64," + imageData;
			var base64Data=idcard.certificatesrc;
			$http({
				method: 'POST',
				url: baseurl + '/certification/back_idcard4base64',
				data: {base64Data:base64Data,n_name:idcard.personname,n_idno:idcard.personpassword}
			}).success(function(data) {
				if(data.type=="success"){
					idcard.certificatename=data.content.cert_fzjg;
					idcard.certificatedate=data.content.cert_valid_date;
					$scope.model_zzsc.hide();
					$state.go("idcardCountryResult");
				}
				if(data.type=="error"){
					$scope.model_zzsc.hide();
					$scope.model_xianshi.show();
				}
			}).error(function() {
				$rootScope.mttAlert(PUBLIC_ERROR_NETWORK);
			});

		};
		
			
	})
	
		//身份认反面照认证结果
	.controller('idcardCountryResultController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval,$ionicModal){
		/*拍摄须知*/
		$ionicModal.fromTemplateUrl('psxz.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_psxz = modal;
		});
		  
		/*正在上传*/
		$ionicModal.fromTemplateUrl('zzsc.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_zzsc = modal;
		});
		
		
		
		/*证件不完整*/
		$ionicModal.fromTemplateUrl('error_xianshi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_xianshi = modal;
		});
		$scope.idcard=idcard;
			$scope.videoIdentify= function() {
					$state.go("videoIdentify");
			
		}
	})
	
	
	
	//视频实名认证
	.controller("videoIdentifyController", function($rootScope,$scope, $ionicListDelegate, $http, $ionicLoading,$ionicModal,$ionicPopup,$state,$cordovaCapture,$cordovaFileTransfer) {	
		$scope.people={};
		$scope.people.name=idcard.personname;
		$scope.people.idcard=idcard.personpassword;
		$scope.people.rzczzphone=renzheng.phoneno;
		/*拍摄须知*/
		$ionicModal.fromTemplateUrl('psxz.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_psxz = modal;
		});
		  
		/*正在上传*/
		$ionicModal.fromTemplateUrl('zzsc.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_zzsc = modal;
		});
		/*视频失败*/
		$ionicModal.fromTemplateUrl('error_shuzi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_shuzi = modal;
		});
		
		
		
		/*证件不完整*/
		$ionicModal.fromTemplateUrl('error_xianshi.html', {
		    scope: $scope
		}).then(function(modal) {
		    $scope.model_xianshi = modal;
		});

			$scope.randomnum="";
					$http({
						method: 'GET',
						url: baseurl + '/certification/getRandomNumber',
						languageColumn: "name_eu",
					}).success(function(data) {
						if(data.type=="success"){
							$scope.randomnum=data.content;
						}else{
							$rootScope.mttAlert(data.content);
							
						}
			})
			
			//录制视频-WEB端		
			$scope.videoCaptu_WEB = function(curObj) {
				var inputId = curObj.attributes.id.value;
			    var files = event.target.files;
			    if (files && files.length > 0) {
			        var fileSize = (Math.round(files[0].size / 1024)).toFixed();
			        var realSizeMB = (fileSize / 1024).toFixed(2);
			        console.log("所录视频大小约为：" + realSizeMB + "Mb");
			        if(realSizeMB > 19.99){
			        	$rootScope.mttAlert('视频文件大小超过20兆，请您重新录制视频进行认证，建议时长为3到5秒钟。',function(){
							$state.go("idcardCountryResult");
						});
			        }else{
			        	$scope.model_zzsc.show();
			        	var fileReader = new FileReader();
				        fileReader.readAsDataURL(files[0]);
			        	fileReader.onload = function(e) {
			        		var base64Video = e.target.result;//后台处理数据data:video/mp4;base64,xxx
			        		$http({
			        			method: 'POST',
			        			url: baseurl + '/certification/validate_video4base64',
			        			data: {base64Data:base64Video}
			        		}).success(function(data) {
			        			$scope.model_zzsc.hide();
			        			if(data && data.type=="success"){
			        				$scope.videoCaptu_Login2();
			        			}else{
			        				$rootScope.mttAlert(data.content,function(){
			        					$state.go("idcardCountryResult");
			        				});
			        			}
			        		}).error(function() {
			        			$scope.model_zzsc.hide();
			        			$rootScope.mttAlert('网络错误，准备重新视频认证!',function(){
			        				$state.go("idcardCountryResult");
			        			});
			        		});
			        	};
			        }
			    }
			}
			
			//录制视频-APP端
			$scope.videoCaptu_APP = function() {
			var options = {
				limit: 1,
				duration: 5
			};

			$cordovaCapture.captureVideo(options).then(function(audioData) {
				$scope.model_zzsc.show();
				var i, path, len;
				for(i = 0, len = audioData.length; i < len; i += 1) {
					path = audioData[i].fullPath;
					deviceInfo=$rootScope.deviceInfo;
                    var localPath;
                    if(deviceInfo=='IOS'){
                    	console.log("获取IOS视频路径");
                        localPath = 'file://' + path;
                    }else{
                        console.log("获取Android视频路径");
                        localPath = path;
                    }
					 var formData = new FormData();
					 window.resolveLocalFileSystemURL(localPath, function(fileEntry) {
				          fileEntry.file(function(file) {
				            var reader = new FileReader();
				            reader.onloadend = function(e) {
				               //需要将图片路径转换为二进制流，并且指定类型为图像格式（还有其他格式，如文本格式等等）
				               //这里用了两个files，代表上传两张图片
				              var the_file = new Blob([e.target.result ], { type: "video/mp4" } );
				              formData.append("file", the_file,"video.mp4");
				              //以下是表单参数
					  			$.ajax({
									url: baseurl+ "/certification/validate_video",
									type: 'POST',
									data: formData,
									processData: false,
									contentType: false,
									success: function (response) {
										$scope.model_zzsc.hide();
										if(response.type=="success"){
											$scope.videoCaptu_Login2();
										}else{
											$rootScope.mttAlert(response.content,function(){
												$state.go("idcardCountryResult");
											});
										}
									},
									error: function (response) {
										$scope.model_zzsc.hide();
										$rootScope.mttAlert('网络错误，准备重新视频认证!',function(){
											$state.go("idcardCountryResult");
										});
									}
								});
				              //post form call here
				            };
				            reader.readAsArrayBuffer(file);

				          }, function(e){alert(1);
					          for(var key in e){
					        		alert(key,e[key])
					        	}});
				        }, function(e){alert(2);
				        	for(var key in e){
				        		alert(key,e[key])
				        	}
				        });
					
					
				}
			}, function(err) {
				
			});
		};	
		
		//录制视频-公共登录处理
		$scope.videoCaptu_Login2 = function() {
			$http({
				method: 'POST',
				url:  baseurl+'/ttuser/login2',
				languageColumn: "name_eu",
				data: $scope.people
			}).success(function(data) {
				if(data && data.type && data.type=="success"){
					//TODO-----------------------验证成功
					window.localStorage.setItem("firstname",data.content._app_name);
					window.localStorage.setItem("phoneno",data.content._app_phoneno);
					window.localStorage.setItem("idno",data.content._app_idno);
					window.localStorage.setItem("only_see_bitspno",data.content._app_bitspno);
					window.localStorage.setItem("orgno",data.content._app_orgno);
					window.localStorage.setItem("roleno",PUBLIC_JS_XFZ);
					window.localStorage.setItem("orgtypeno",PUBLIC_ORGTYPENO_QTZZ);
					$rootScope._app_orgtypeno = g_getOrgTypeno();
					$rootScope._app_orgno = g_getOrgno();
					$rootScope._app_roleno = g_getRoleno();
					$state.go("yanzhengchengong");
				}else if (data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content,function() {
						$state.go("idcardCountryResult");
					});
				} else {
					$rootScope.mttAlert("网络错误，准备重新视频认证!",function() {
						$state.go("idcardCountryResult");
					});
				}
			})
		}
		
		})
	
	
	
	
	
	//邢台修改密码第一步
	.controller('changePasswordFirstController',function($rootScope,$scope,$http,$state,$ionicPopup,$interval){
	var	phoneno=window.localStorage.getItem("phoneno");
	$scope.yzm={
		first:"",
		seconed:"",
		third:"",
		four:"",
		five:"",
		six:"",
	}
	$scope.phoneno=phoneno;
	$scope.yzmcontent = "获取验证码";
		$scope.getYzm=function(){
			if($scope.yzmclass == "not but_null") {
				return;
			}
			
			$scope.yzmclass = "but_null";
			$scope.paraevent = true;

			var second = 60,
				timePromise = undefined;

			timePromise = $interval(function() {
				if(second <= 0) {
					$interval.cancel(timePromise);
					timePromise = undefined;

					second = 60;
					$scope.yzmcontent = "重发验证码";
					$scope.yzmclass = "but_null";
					$scope.paraevent = true;

				} else {
					$scope.yzmcontent = second + "秒后可重发";
					$scope.yzmclass = "not but_null";
					second--;

				}
			}, 1000, 100);
	
			
			$http({
				method: 'GET',
				url: baseurl + '/ttuser/sendphonecodeforupdatepwd?phoneno='+phoneno,
				languageColumn: "name_eu",
				}).success(function(data){
		})
	}
		$scope.changePassword=function(){
		
			var yzm=""+$scope.yzm.first+$scope.yzm.seconed+$scope.yzm.third+$scope.yzm.four+$scope.yzm.five+$scope.yzm.six;
			var orgpeople={};
			orgpeople.phonecode=yzm;
				$http({
				method: 'POST',
				url: baseurl + '/qifang/isphonecode',
				languageColumn: "name_eu",
				data:orgpeople
				}).success(function(data){
					if(data.type=="success"){
						$rootScope.mttAlert('恭喜您，手机号验证成功!');
					alertPopup.then(function(res) {
						$state.go("change-password-seconed");
					})
					
			}else{
				$rootScope.mttAlert('验证码不正确，请重新验证!',function(){
					
				});
				
				
				
			}
		})
			
			
		}
		
})
	//邢台修改密码第二步
	.controller('changePasswordSeconedController',function($rootScope,$scope,$http,$state,$ionicPopup){
		$scope.password="";
		var firstname=window.localStorage.getItem("firstname");
		var idno=window.localStorage.getItem("idno");
		$scope.orgpeople.firstname=firstname;
		$scope.orgpeople.idno=idno;
		$scope.changePassword=function(){
		$scope.orgpeople.password=$scope.password;
		
			$http({
				method: 'POST',
				url: baseurl + '/findmima',
				languageColumn: "name_eu",
				data:$scope.orgpeople
				}).success(function(data){
					console.log(data);
			
	/*		$state.go("change-password-third");*/
		})
	}
		
		
		$scope.confirm=function(){
			$http({
				method: 'POST',
				url: baseurl + '/findmima',
				languageColumn: "name_eu",
				data:$scope.people
				}).success(function(data){
					console.log(data);
			
	/*		$state.go("change-password-third");*/
		})
	}

	})
	
	//修改密码控制器
	.controller('updPwdController',function($rootScope,$scope,$http,$state,$ionicPopup){
		
		$scope.appuser={
				phoneno:window.localStorage.getItem("phoneno"),
				password:"",
				newPassword:"",
				newPassword2:"",
		}
		
		$scope.upd = function(){
			console.log($scope.appuser);
			if(g_checkIsNull($scope.appuser.password) || g_checkIsNull($scope.appuser.newPassword) || g_checkIsNull($scope.appuser.newPassword2)){
				$rootScope.mttAlert('旧密码、新密码、重复新密码不能为空！');
				return false;
			}
			
			var checkResult = g_checkPwd($scope.appuser.newPassword, $scope.appuser.newPassword2);
			if(checkResult !== true){
				$rootScope.mttAlert(checkResult);
				return false;
			}
			
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingle?_module=Mobile&_method=updPwd&_model=AppUser',
				languageColumn: "name_eu",
				data: $scope.appuser
			}).success(function(data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(data.content,function() {
						$state.go("xingtai_me");
					});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})		
		}
		
	})
	
	//重置密码控制器
	.controller('updResetPwdController',function($rootScope,$scope,$http,$state,$interval,$ionicPopup,MyFactoryNew){
		
		$scope.yzmcontent = "获取验证码";

		$scope.appuser={
				phoneno:"",
				yzm:"",
				newPassword:"",
				newPassword2:"",
		}
		
		//密码重置验证码
		$scope.getyzm = function(){
			if(g_checkIsNull($scope.appuser.phoneno) || $scope.appuser.phoneno.length != 11){
				$rootScope.mttAlert("请输入11位手机号码！");
				return false;
			}
					
			if($scope.yzmclass == "not but_null") {
				return;
			}
			$scope.yzmclass = "but_null";
			$scope.paraevent = true;
			var second = 60;
			var timePromise = undefined;
			timePromise = $interval(function() {
				if(second <= 0) {
					$interval.cancel(timePromise);
					timePromise = undefined;
					second = 60;
					$scope.yzmcontent = "重发验证码";
					$scope.yzmclass = "but_null";
					$scope.paraevent = true;
				} else {
					$scope.yzmcontent = second + "秒后可重发";
					$scope.yzmclass = "not but_null";
					second--;
				}
			}, 1000, 100);
			$http({
				method: 'POST',
				url: baseurl+'/ttuser/sendphoneyzm',
				languageColumn: "name_eu",
				data: {phoneno:$scope.appuser.phoneno}
			}).success(function(data) {
				if(data.type=="success"){
					$rootScope.mttAlert("验证码发送成功");
				}else{
					$rootScope.mttAlert(data.content);
				}
			})		
		}
		
		$scope.resetPwd = function(){
			if(g_checkIsNull($scope.appuser.phoneno) || g_checkIsNull($scope.appuser.yzm) || g_checkIsNull($scope.appuser.newPassword) || g_checkIsNull($scope.appuser.newPassword2)){
				$rootScope.mttAlert('手机号、新密码、重复新密码、验证码都不能为空！');
				return false;
			}
			
			var checkResult = g_checkPwd($scope.appuser.newPassword, $scope.appuser.newPassword2);
			if(checkResult !== true){
				$rootScope.mttAlert(checkResult);
				return false;
			}
			
			$http({
				method: 'POST',
				url:baseurl +'/ttuser/resetPwd',
				languageColumn: "name_eu",
				data: $scope.appuser
			}).success(function(data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(data.content,function() {
						$state.go("xingtai_me");
					});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})		
		}
		
	})
	
	//邢台我的页面
		.controller('xingtaimeController',function($rootScope,$scope,$http,$state,$ionicPopup){
		if(g_checkLogin()){
			
			document.getElementById("loginid").innerHTML=window.localStorage.getItem("firstname");
			
		}
		$scope.loginperson=function(){
			if(g_checkLogin()){
				
			}else{
				$state.go('login');
			}
		}
		
		$scope.updPwd=function(){
			if(g_checkLogin()){
				$state.go('updPwd');
			}else{
				$rootScope.mttAlert('您还未登录！');
			}
		}		
		
		$scope.loginout=function(){
			
			if(g_checkLogin()){
			var confirmPopup = $ionicPopup.confirm({
				title: '退出登录',
				template: '您确认要退出登录?'
			});
			confirmPopup.then(function(res) {
		if(res) {
			
				$http({
				method: 'POST',
				url: baseurl + '/ttuser/outlogin',
				languageColumn: "name_eu",
				data: null
				}).success(function(data){
					if(data.type=="success"){
						//TODO---------退出登录
						window.localStorage.clear();
						$rootScope._app_orgtypeno = g_getOrgTypeno();
						$rootScope._app_orgno = g_getOrgno();
						$rootScope._app_roleno = g_getRoleno();
						$state.go("index");
					}
				})
					
					

					};
				})
		
			}
		}
		
		$scope.changepassword=function(){
			$rootScope.mttAlert("该项功能正在完善中,请等待...");
			
		}
		//判断用户时候做身份认证
		$scope.myfangwulist=function(){
			if(g_checkLogin()){
				$state.go('myfangwulist');
			}else{
				$state.go('login');
				
				}
		
			}
		
		$scope.identify=function(){
			$state.go("identifyfirst");	
					}		    		
})
		//抵押网签
		.controller('diyawangqianController',function($rootScope,$scope,$state,$http,$ionicPopup){
			//抵押类型
			var dytype="";
			
			$('.cls input').click(function(){
			dytype=$('input[name="diya"]:checked').val();
    			$('.cls').removeClass('active')
    			$(this).parent('.cls').addClass('active')	
    		})
			
			//抵押网签提交
			$scope.confirm=function(){
				orgorganize.idno=window.localStorage.getItem("yinhangidno");
				orgorganize.fullname=window.localStorage.getItem("yinhangfullname");
				if(dytype=="一般抵押"){
				
					dytype=1;
					
				}else{
					dytype=2;
				}
				//抵押类型
				dypeople.firstname=window.localStorage.getItem("firstname");
				dypeople.idno=window.localStorage.getItem("idno");
				var big={};
				big.bldrooms=bldrooms;
				big.orgorganize=orgorganize;
				big.dytype=dytype;
				big.orgpeople=dypeople;   
			$http({
				method: 'POST',
				url: baseurl+'/bitsroad/addSingle?_module=TT&_method=diyaactive&_model=VirtualSalesorder',
				languageColumn: "name_eu",
				data: big
			}).success(function(data) {
				console.log(data);
				if(data.type=="success"){
					$rootScope.mttAlert('恭喜您，您的房源抵押成功！',function(){
						$state.go("index");
					})
			}else{
				$rootScope.mttAlert('房源抵押失败，请完善您的信息！',function(){
					$state.go("index");
				})
			}
				
		})
			.error(function(data){
				$rootScope.mttAlert('此类房源禁止办理业务，需到房管局做房源核验！',function(){
					$state.go("index");
				})
				
				
				
					})
			
				}
		
		
		
		})
		
		
		//房屋抵押
		.controller('housediyaController',function($rootScope,$scope,$state,$http,$ionicPopup){
			
		//抵押网签
		$scope.diyawangqian=function(){
			if(g_checkLogin()){
					$state.go('diyalist');
			}else{
				$state.go('login');
			}
			
		}
		
		})
		
		
		
		
		//邢台银行列表
		.controller('yinhanglistController',function($rootScope,$scope,$state,$http,$ionicPopup){
			$scope.orgorganize={
				fullname:null
			};
			
			$scope.diyayinhang=function(){
				
			$http({
				method: 'POST',
				url: baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findbank&_model=Orgorganize',
				languageColumn: "name_eu",
				data: $scope.orgorganize
			}).success(function(data) {
				console.log(data);
				$scope.houses = data;
				
			})
		}
			$scope.choose=function(idno,fullname){
				document.getElementById(idno).style.backgroundColor="#51C5B4";
				var confirmPopup = $ionicPopup.confirm({
               title: '温馨提示',
               template: '您确定选择该银行做房屋抵押业务吗?'
             });
             confirmPopup.then(function(res) {
               if(res) {
               	window.localStorage.setItem('yinhangidno',idno);
               	window.localStorage.setItem('yinhangfullname',fullname);
               		$state.go('diya_wangqian');
               	
               }else{
               	document.getElementById(idno).style.backgroundColor="";
               	
               }
					
			})
         }
			
			
			
		
		})
		
		
		
			//邢台抵押列表
		.controller('diyaController',function($rootScope,$scope,$state,$http,$ionicPopup){
					//出卖人房源
		$scope.mforgpeople={
			firstname:null,
			idno:null,
			phoneno:null,
		}
		
		$scope.mforgpeople.firstname=window.localStorage.getItem('firstname');
		$scope.mforgpeople.idno=window.localStorage.getItem('idno');
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findmybldroom&_model=Orgpeople',
				languageColumn: "name_eu",
				data: $scope.mforgpeople
			}).success(function(data) {
					for(var i=0;i<data.length;i++){
				if(data[i].district==1){
					data[i].district='桥东区';
				}else if(data[i].district==2){
					data[i].district='桥西区';
				}else if(data[i].district==3){
					data[i].district='开发区';
				}else{
					data[i].district='高开区';
				}
			}
				$scope.houses = data;
			

			})
			
			
			$scope.pushNotificationChange=function(bldroomid){
				
				 $scope.bldroom={
					bldroomid:bldroomid
				}
				
						$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=isenabledy&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.bldroom
			}).success(function(data) {
					if(data.type=="success"){
						$rootScope.mttAlert('该房源可以做抵押业务')
									
					}else{
						$rootScope.mttAlert('该房源为虚拟房，不能进行抵押业务')
						
						
					}
			})
					
				
		}
				
				
			
						
			$scope.confirm=function(){
				var obj=document.getElementsByName('test'); 
				var s=''; 
				//选中的房源
				var rooms= new Array();
			for(var i=0; i<obj.length; i++){ 
			if(obj[i].checked){
			var bldroom={};
			s=obj[i].value; 
			bldroom.bldroomid=s;
			rooms.push(bldroom);
			bldrooms=rooms;
			//如果选中，将value添加到变量s中
			}
							
						}
			
			
			$state.go('yinhanglist');
			
			}
		})

	//登录
	.controller('LoginController', function($rootScope,$scope, $http, $state,$ionicPopup) {
		
		$scope.appuser={
				phoneno:"",
				password:"",
				orgno:"",
				curVersion:$rootScope.show_version,
				deviceInfo:$rootScope.deviceInfo
		}
		
		$scope.selfRoles = PUBLIC_INITORGREG;
		
		$scope.getSelOps = function() {
			if($scope.appuser.phoneno && $scope.appuser.phoneno.length == 11){
				var requestBody = {_module:'TT',_method:'getSelfOrgRoles',phoneno:$scope.appuser.phoneno};
				$http({
					method: 'POST',
					url: baseurl + '/bitsroad/rpcjsonWithRB',
					data: requestBody
				}).success(function(data) {
					if(data && data.length > 0){
						$scope.selfRoles = data;
					}
				}).error(function() {
					$rootScope.mttAlert('请确认您的手机可以访问互联网或者尝试重新打开APP！');
				});
			}
		}
		
		$scope.appuser.phoneno=window.localStorage.getItem("phoneno");
	
		
		$scope.login = function() {
		
			
			if(angular.isUndefined($scope.appuser)) {
				$rootScope.mttAlert('您的信息不完整，请完善个人信息。')
					
				return;
			}
			if(angular.isUndefined($scope.appuser.phoneno) || $scope.appuser.phoneno == "" || $scope.appuser.password == "" || angular.isUndefined($scope.appuser.password)) {
				$rootScope.mttAlert('您的信息不完整，请完善个人信息。')
				
				return;
			}
			
			var orgRole = $("#orgRoles").val();
			$scope.appuser.orgno = orgRole.split("-")[0];
			$scope.appuser.roleno = orgRole.split("-")[1];
			$scope.appuser.orgtypeno = orgRole.split("-")[2];
			
			$http({
				method: 'POST',
				url:  baseurl+'/ttuser/login',
				languageColumn: "name_eu",
				data: $scope.appuser,
			}).success(function(data) {
				if(data.type == "success") {
				//TODO------------------登录成功
				window.localStorage.setItem("firstname",data.content._app_name);
				window.localStorage.setItem("phoneno",data.content._app_phoneno);
				window.localStorage.setItem("idno",data.content._app_idno);
				window.localStorage.setItem("only_see_bitspno",data.content._app_bitspno);
				window.localStorage.setItem("orgno",data.content.orgno);
				window.localStorage.setItem("roleno",data.content.roleno);
				window.localStorage.setItem("orgtypeno",data.content.orgtypeno);
				window.localStorage.setItem("token_nttapp",data.content.token_nttapp);//用于令牌接入NTTAPP
				$rootScope._app_orgtypeno = g_getOrgTypeno();
				$rootScope._app_orgno = g_getOrgno();
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
					$state.go("index");
				}else if(data.type=="warn"){
					renzheng.phoneno=$scope.appuser.phoneno;
					renzheng.password=$scope.appuser.password;
					$rootScope.mttAlert('用户没有实名认证，请先实名认证。',function(){
						$state.go("identifyfirst");
					})
				}else{
					$rootScope.mttAlert(data.content);
				}

			})

		}
		
	})
	
	//我的房源列表
	.controller( 'myfangwulistController',function($rootScope,$scope,$http,$state){
	
		//出卖人房源
		$scope.mforgpeople={
			firstname:null,
			idno:null,
			phoneno:null,
		}
		
		$scope.mforgpeople.firstname=window.localStorage.getItem('firstname');
		$scope.mforgpeople.idno=window.localStorage.getItem('idno');
			$http({
				method: 'POST',
				url:baseurl+ '/bitsroad/addSingleReturnObject?_module=TT&_method=findmybldroom&_model=Orgpeople',
				languageColumn: "name_eu",
				data: $scope.mforgpeople
			}).success(function(data) {
					for(var i=0;i<data.length;i++){
				if(data[i].district==1){
					data[i].district='桥东区';
				}else if(data[i].district==2){
					data[i].district='桥西区';
				}else if(data[i].district==3){
					data[i].district='开发区';
				}else{
					data[i].district='高开区';
				}
			}
				$scope.houses = data;
			

			})
	})

	//买受人网签
	.controller('maishourenwangqianController', function($rootScope,$scope, $http, $state,$ionicPopup,MyFactory) {
		$scope.people = {};

//		$scope.maishouren = $scope.people;
//		$scope.chumairen = {};
//		$scope.fangwu = {};
//		$scope.chumairen.FULLNAME = fangdetail.fullname;
////		$scope.chumairen.IDNo = fangdetail.idno;
////		$scope.chumairen.IDtype = fangdetail.idtype;
//		$scope.chumairen.IDNO = fangdetail.idno;
//		$scope.chumairen.IDTYPE = fangdetail.idtype;
//		$scope.fangwu.doorno = fangdetail.doorno;
//		$scope.fangwu.street = fangdetail.street;
//		$scope.fangwu.usage = fangdetail.usage;
//		$scope.fangwu.type = fangdetail.type;
//		$scope.fangwu.bldroomid = fangdetail.bldroomid;
//		$scope.fangwu.brlocation = fangdetail.brlocation;
//		var VirtualSalesorder = {};
//		VirtualSalesorder.orgorganize = $scope.chumairen;
//		var array = new Array();
//		array.push($scope.fangwu);
//		VirtualSalesorder.bldrooms = array;
//		VirtualSalesorder.orgpeople = $scope.maishouren;
		$scope.spfqianyue = function() {
			if($("#queren").is(':checked')){
				//提交数据到tt
				MyFactory.getHttpRequest( baseurl + '/bitsroad/rpcjson?_module=TT&_method=addVirtualSalesorder&&idno='+$scope.people.idno+'&&firstname='+$scope.people.firstname+'&&bldroomId='+fangdetail.bldroomid, 'POST', null, null).then(function (data) {
					if(data && data.type && data.type=="success"){
						$rootScope.mttAlert('恭喜您，商品房交易成功！',function() {
							$state.go("index");
						});
					}else if(data && data.type && data.type=="error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_OPER_ERROR);
					}
				})
//				$http({
//					method: 'POST',
//					url:baseurl+ '/bitsroad/addSingleReturnObject?_module=TT&_method=addVirtualSalesorder&_model=VirtualSalesorder',
//					languageColumn: "name_eu",
//					data: VirtualSalesorder
//				}).success(function(data) {
//					if(data.type == "success") {
//						$rootScope.mttAlert('恭喜您，商品房交易成功！');
//						$state.go("index");
//					} else {
//						$rootScope.mttAlert('商品房交易失败，请重新填写信息！');
//					}
//				})
			}else{
				$rootScope.mttAlert('请阅读页面确认书信息，并选中！');
			}
		};
		
		$scope.backToHousedetail = function(){
			$state.go('housedetail', {xh: fangdetail.bldroomid})
		}

	})

	//注册
	.controller('RegisterController', function($rootScope,$scope, $http, $state, $interval,$ionicPopup) {
		$scope.count = false;
		$scope.register = {
			
		}; //typeid
		//判断改证件号码是否已注册
		
		$scope.dianji = function(id) {
			//console.info(id);
			if(id == 2) {

				$scope.register.typeid = 1;

			} else {
				$scope.register.typeid = 0;
			}

		}
		
		 $scope.yzmcontent = "获取验证码";
		
		$scope.getyzm=function(){
			if($scope.yzmclass == "not but_null") {
				return;
			}
			
			$scope.yzmclass = "but_null";
			$scope.paraevent = true;

			var second = 60,
				timePromise = undefined;

			timePromise = $interval(function() {
				if(second <= 0) {
					$interval.cancel(timePromise);
					timePromise = undefined;

					second = 60;
					$scope.yzmcontent = "重发验证码";
					$scope.yzmclass = "but_null";
					$scope.paraevent = true;

				} else {
					$scope.yzmcontent = second + "秒后可重发";
					$scope.yzmclass = "not but_null";
					second--;

				}
			}, 1000, 100);
			console.log($scope.register.phoneno);
			$http({
				method: 'POST',
				url: baseurl+'/ttuser/sendphoneyzm',
				languageColumn: "name_eu",
				data: {phoneno:$scope.register.phoneno}
			}).success(function(data) {
				if(data.type=="success"){
					$rootScope.mttAlert("验证码发送成功");
					
					
				}else{
					$rootScope.mttAlert(data.content);
					
				}

			
		})
	}

		$scope.addregister = function() {
			
			if(angular.isUndefined($scope.register)) {
				$rootScope.mttAlert('您的信息不完整，请完善个人信息！');
				
				return;
			}


			if($scope.register.typeid == 1) {

				if(angular.isUndefined($scope.register.fullname) || angular.isUndefined($scope.register.idno_zz)) {
					$rootScope.mttAlert('您的信息不完整，请完善组织信息！');
				
					return;
				}
			}
			if($scope.register.phoneno){
				if($scope.register.phoneno.length!=11){
					$rootScope.mttAlert('您输入的手机号位数不正确，请重新输入！');
			
					return;
					
				}else{
					
				}
				
			}else{
				$rootScope.mttAlert('输入信息不完整，请输入个人手机号！');
				
				return;
				
				
			}
			
			var checkResult = g_checkPwd($scope.register.password, $scope.register.password2);
			if(checkResult !== true){
				$rootScope.mttAlert(checkResult);
				return false;
			}
			
			if($scope.register.yzm==''||$scope.register.yzm==null){
				$rootScope.mttAlert('请输入验证码');
				return false;
			}
			$http({

				method: 'POST',
				url: baseurl+'/ttuser/compareyzm',
				languageColumn: "name_eu",
				data: $scope.register,

			}).success(function(data) {
				if(data.type=="success"){
					$rootScope.mttAlert('恭喜您注册成功!',function() {
						$state.go('login');
					});
				}else{
					$rootScope.mttAlert(data.content);
					
				}
			
			})

		}

	})
	
	//二手房列表
	.controller('ershoufanglistController', function($rootScope,$scope, $ionicHistory, $state, $http, $stateParams) {
		
		//初始化租金
		$scope.mianjis = [{
			typeId: 1,
			typeName: '70平米以下'
		}, {
			typeId: 2,
			typeName: '70到90平米'
		}, {
			typeId: 3,
			typeName: '90到120平米'
		}, {
			typeId: 4,
			typeName: '120到150平米'
		}, {
			typeId: 5,
			typeName: '150到200平米'
		}, {
			typeId: 6,
			typeName: '200平米以上'
		}];

		$scope.zhujings = [{
			typeId: 1,
			typeName: '两室一厅'
		}, {
			typeId: 2,
			typeName: '三室两厅'
		}, {
			typeId: 3,
			typeName: '两室两厅'
		}, {
			typeId: 4,
			typeName: '一室一厅'
		}, {
			typeId: 5,
			typeName: '四室三厅'
		}, {
			typeId: 6,
			typeName: '其它'
		}];
		$scope.data = {};

		//初始化区域
		$scope.cities = [{
				city: "高开区",
				cityId: 4,

			}, {
				city: "开发区",
				cityId: 3
			}, {

				city: "桥西区",
				cityId: 2
			}, {
				city: "桥东区",
				cityId: 1
			},
			
		];

		$scope.Bldroom = {
			rightpeopletype:null,
			price: null,
			page: 1,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: 100,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null
		}

		//页面加载房源
		$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomlist&_model=Bldroom',
			languageColumn: "name_eu",
			data: $scope.Bldroom
		}).success(function(data) {
			if(data.type) {
				alert("查询失败");
				return;
			}
			for(var i=0;i<data.length;i++){
				if(data[i].district==1){
					data[i].district='桥东区';
				}else if(data[i].district==2){
					data[i].district='桥西区';
				}else if(data[i].district==3){
					data[i].district='开发区';
				}else{
					data[i].district='高开区';
				}
			}
			$scope.houses = data;
		

		})

		//按街查询
		$scope.search = function() {
			
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomlist&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				
				$scope.houses = data;
				

			})
		}

		//按照区域查询
		$scope.selectCity = function(city) {
			$scope.Bldroom.district = city;
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomlist&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				
				$scope.houses = data;
				
			

			})
		}
		//按照户型查询
		$scope.selectHX = function(typeid) {

			if(typeid == 1) {
				$scope.Bldroom.type = '两室一厅';
			}
			if(typeid == 2) {
				$scope.Bldroom.type = '三室两厅';
			}
			if(typeid == 3) {
				$scope.Bldroom.type = '两室两厅';
			}
			if(typeid == 4) {
				$scope.Bldroom.type = '一室一厅';
			}
			if(typeid == 5) {
				$scope.Bldroom.type = '四室三厅';
			}
			if(typeid == 6) {
				$scope.Bldroom.type = '其它';
			}
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomlist&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
		
				$scope.houses = data;
				

			})

		}
		//按照租金范围进行查询
		$scope.selectMJ = function(typeid) {
		
			if(typeid == 1) {
				$scope.Bldroom.buildarea_min = 0;
				$scope.Bldroom.buildarea_max = 70;
			}
			if(typeid == 2) {
				$scope.Bldroom.buildarea_min = 70;
				$scope.Bldroom.buildarea_max = 90;
			}
			if(typeid == 3) {
				$scope.Bldroom.buildarea_min = 90;
				$scope.Bldroom.buildarea_max = 120;
			}
			if(typeid == 4) {
				$scope.Bldroom.buildarea_min = 120;
				$scope.Bldroom.buildarea_max = 150;
			}
			if(typeid == 5) {
				$scope.Bldroom.buildarea_min = 150;
				$scope.Bldroom.buildarea_max = 200;

			}
			if(typeid == 6) {
				$scope.Bldroom.buildarea_min = 200;
				$scope.Bldroom.buildarea_max = 23396665;
			}
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomlist&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
			
				$scope.houses = data;
			

			})

		};

		$(".drowp-down").click(function() {
			$(this).siblings().next(".drowp-down-layer").hide();
			$(this).next(".drowp-down-layer").toggle();
		});

		$(".drowp-down-layer span").click(function() {
			var bool;
			if($(this).index() == 0) {
				if(!$(this).hasClass("acitve")) {
					$(this).addClass("acitve").siblings().removeClass("acitve");
				}
			} else {
				$(this).toggleClass("acitve");
				$(this).parent().children().eq(0).removeClass("acitve");
			}
		});

		$scope.ershoufangdetail = function(certno) {
			
			
			$state.go('ershoufangdetail', {
				certno: certno,
				
			})
		}

	})

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	//我要出租
	//var data={};
	.controller('RentOutController', function($cacheFactory, $scope, $state, $http, $stateParams, testFactory, $ionicPopup) {
		$http({
			method: 'POST',
			url: 'http://192.168.43.217:8082/appissroom/getactid',
			languageColumn: 'name_eu'
		}).success(function(data) {
		
			rentOutData.acid = data.acid;
		})

		$scope.building = {

		};
		$scope.issueroom = {

		};

		$scope.bldroom = {

		};

	

		$scope.data = $stateParams.data;

		if(angular.isDefined($stateParams.data.video)) {

			video = $stateParams.data.video;
			rentOutData.video = video;

			//cache.put("video", video);
			if(video.length > 0) {

				var videoo = document.getElementById("vidId");
				videoo.style.display = "block";

				videoo.src = video[0];
				document.getElementById("shipingId").removeAttribute("class");
			}

		}
		//回显示图片
		if(angular.isDefined($stateParams.data.img)) {

			img = $stateParams.data.img;
			rentOutData.img = img;

			//			$scope.$watch('$viewContentLoaded', function() {
			if(img.length > 0) {
				var imgdocument = document.getElementById("imgId");
				imgdocument.src = img[0];
				document.getElementById("tupianId").removeAttribute("class");
			}
			//			})
		}
		//回显个人信息
	

		if(angular.isDefined($stateParams.data.person)) {

			person = $stateParams.data.person;
			rentOutData.person = person;
			if(person != null) {
				document.getElementById("infoId").innerHTML = "";
				$scope.info = "姓名 ：" + rentOutData.person.name;
			}

		}

		//回显出租信息
		if(rentOutData.bldroom != null || rentOutData.building != null || rentOutData.issueroom != null) {
			$scope.bldroom = rentOutData.bldroom;
			$scope.building = rentOutData.building;
			$scope.issueroom = rentOutData.issueroom;
		}

	

		//装修标准	fitmentdesc

		$scope.getDecoration = function() {

			/*alert(window.localStorage.getItem("name"));*/
			var t = document.getElementById("haohua");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("jingzhuang");
			var o = document.getElementById("zhongdeng");
			var p = document.getElementById("jiandan");
			var w = document.getElementById("maopei");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;

		}
		$scope.getDecorationa = function() {
			var t = document.getElementById("jingzhuang");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("haohua");
			var o = document.getElementById("zhongdeng");
			var p = document.getElementById("jiandan");
			var w = document.getElementById("maopei");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;

		}
		$scope.getDecorationb = function() {
			var t = document.getElementById("zhongdeng");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("haohua");
			var o = document.getElementById("jingzhuang");
			var p = document.getElementById("jiandan");
			var w = document.getElementById("maopei");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;
		}
		$scope.getDecorationc = function() {
			var t = document.getElementById("jiandan");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("haohua");
			var o = document.getElementById("jingzhuang");
			var p = document.getElementById("zhongdeng");
			var w = document.getElementById("maopei");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;
		}
		$scope.getDecorationd = function() {
			var t = document.getElementById("maopei");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("haohua");
			var o = document.getElementById("jingzhuang");
			var p = document.getElementById("zhongdeng");
			var w = document.getElementById("jiandan");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;
		}
		$scope.getDecoratione = function() {
			var t = document.getElementById("qita");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("qita");
			q.removeAttribute("class");
			var m = document.getElementById("haohua");
			var o = document.getElementById("jingzhuang");
			var p = document.getElementById("zhongdeng");
			var w = document.getElementById("jiandan");
			var n = document.getElementById("maopei");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			$scope.issueroom.fitmentdesc = t.textContent;

		}

		//配套设施
		$scope.getDeice = function() {
			var t = document.getElementById("chuan");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("kuandai");
			var o = document.getElementById("fridge");
			var p = document.getElementById("tv");
			var w = document.getElementById("clothes");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			var g = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			g.style.backgroundColor = ""
			$scope.issueroom.havebed = t.textContent;

		}
		$scope.getDeicea = function() {
			var t = document.getElementById("kuandai");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("fridge");
			var p = document.getElementById("tv");
			var w = document.getElementById("clothes");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			var g = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			g.style.backgroundColor = ""
			$scope.issueroom.haveinternet = t.textContent;

		}
		$scope.getDeiceb = function() {
			var t = document.getElementById("tv");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("fridge");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("clothes");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			var g = document.getElementById("qitaa");
			g.style.backgroundColor = ""
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			$scope.issueroom.havetv = t.textContent;

		}
		$scope.getDeicec = function() {
			var t = document.getElementById("fridge");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("tv");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("clothes");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			var i = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""
			$scope.issueroom.havefridge = t.textContent;

		}
		$scope.getDeiced = function() {
			var t = document.getElementById("clothes");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("tv");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("fridge");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			var i = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""
			$scope.issueroom.havewashing = t.textContent;

		}
		$scope.getDeicee = function() {
			var t = document.getElementById("kongtiao");
			t.style.backgroundColor = "#59d2d8";
			/*var q = document.getElementById("kongtiao");*/
			t.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("tv");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("fridge");
			var n = document.getElementById("reshuiqi");
			var v = document.getElementById("clothes");
			var i = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			i.style.backgroundColor = ""
			$scope.issueroom.haveair = t.textContent;

		}
		$scope.getDeicef = function() {
			var t = document.getElementById("reshuiqi");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("tv");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("fridge");
			var v = document.getElementById("kongtiao");
			var i = document.getElementById("clothes");
			var n = document.getElementById("qitaa");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""
			$scope.issueroom.haveheater = t.textContent;

		}
		$scope.getDeiceg = function() {

			var t = document.getElementById("qitaa");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("kongtiao");
			q.removeAttribute("class");
			var m = document.getElementById("chuan");
			var o = document.getElementById("tv");
			var p = document.getElementById("kuandai");
			var w = document.getElementById("fridge");
			var v = document.getElementById("kongtiao");
			var n = document.getElementById("reshuiqi");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""

		}

		//公共费用缴纳
		$scope.getFee = function() {

			var t = document.getElementById("shuifei");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("ranqi");
			var o = document.getElementById("dianshi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeea = function() {

			var t = document.getElementById("dianfei");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("ranqi");
			var o = document.getElementById("dianshi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("shuifei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeeb = function() {

			var t = document.getElementById("ranqi");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("dianshi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeeb = function() {
			var t = document.getElementById("ranqi");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("dianshi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeec = function() {

			var t = document.getElementById("dianshi");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("ranqi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeed = function() {

			var t = document.getElementById("kuandaia");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("ranqi");
			var p = document.getElementById("dianshi");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeee = function() {

			var t = document.getElementById("guhua");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			var m = document.getElementById("shuifei");
			var o = document.getElementById("ranqi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("dianshi");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("shizheng");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeef = function() {

			var t = document.getElementById("shizheng");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("ranqi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("guhua");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("dianshi");
			var i = document.getElementById("wuye");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""
			i.style.backgroundColor = ""

		}
		$scope.getFeeg = function() {

			var t = document.getElementById("wuye");
			t.style.backgroundColor = "#59d2d8";
			var q = document.getElementById("guhua");
			q.removeAttribute("class");
			q.style.backgroundColor = "";
			var m = document.getElementById("shuifei");
			var o = document.getElementById("ranqi");
			var p = document.getElementById("kuandaia");
			var w = document.getElementById("shizheng");
			var v = document.getElementById("dianfei");
			var n = document.getElementById("dianshi");
			m.style.backgroundColor = ""
			o.style.backgroundColor = ""
			p.style.backgroundColor = ""
			w.style.backgroundColor = ""
			n.style.backgroundColor = ""
			v.style.backgroundColor = ""
			q.style.backgroundColor = ""

		}
		//户型  roomtype
		$scope.houseStyle = [{
				id: 1,
				name: "三室两厅一卫"
			},
			{
				id: 2,
				name: "两室两厅一卫"
			},
			{
				id: 3,
				name: "四室两厅一卫"
			},
			{
				id: 4,
				name: "一室一厅一卫"
			},
		]
		//房源	issueclass
		$scope.getColor = function() {

			var t = document.getElementById("gongyu");

			/*t.setAttribute(background,"blue");*/
			var d = document.getElementById("zhuzhai");
			var q = document.getElementById("shangpu");
			var w = document.getElementById("bieye");
			var o = document.getElementById("xiezilou");
			q.style.backgroundColor = "";
			w.style.backgroundColor = "";
			o.style.backgroundColor = "";
			d.removeAttribute("class")
			d.style.backgroundColor = ""
			t.style.backgroundColor = "#59d2d8";

			$scope.issueroom.rentuse = t.innerHTML;

			/*	t.removeAttribute("class");*/
			issueclass = t.textContent;
		};
		$scope.getColorb = function() {

			var t = document.getElementById("bieye");

			/*t.setAttribute(background,"blue");*/
			var q = document.getElementById("shangpu");
			var d = document.getElementById("zhuzhai");
			var m = document.getElementById("gongyu");
			var o = document.getElementById("xiezilou");
			o.style.backgroundColor = ""
			q.style.backgroundColor = ""
			m.style.backgroundColor = ""
			d.removeAttribute("class")
			d.style.backgroundColor = ""
			t.style.backgroundColor = "#59d2d8";
			$scope.issueroom.rentuse = t.innerHTML;

			/*	t.removeAttribute("class");*/

		};
		$scope.getColorc = function() {

			/*alert(angular.element($document.getElementById("shangpu")));*/
			/*	alert($scope.t)*/
			/*t.setAttribute(background,"blue");*/
			var x = document.getElementById("shangpu");
			var d = document.getElementById("zhuzhai");
			var m = document.getElementById("gongyu");
			var v = document.getElementById("bieye");
			var o = document.getElementById("xiezilou");
			m.style.backgroundColor = ""
			v.style.backgroundColor = ""
			o.style.backgroundColor = ""
			d.removeAttribute("class")
			d.style.backgroundColor = ""
			x.style.backgroundColor = "#59d2d8";
			$scope.issueroom.rentuse = x.innerHTML;

		};
		$scope.getColord = function() {

			var i = document.getElementById("shangpu");
			/*t.setAttribute(background,"blue");*/
			var d = document.getElementById("zhuzhai");
			var m = document.getElementById("gongyu");
			var v = document.getElementById("bieye");
			var p = document.getElementById("xiezilou");
			p.style.backgroundColor = "#59d2d8";
			m.style.backgroundColor = ""
			v.style.backgroundColor = ""
			d.removeAttribute("class")
			i.style.backgroundColor = ""
			d.style.backgroundColor = ""
			$scope.issueroom.rentuse = p.innerHTML;

			/*	t.removeAttribute("class");*/

		};
		$scope.getColore = function() {

			var t = document.getElementById("shangpu");

			/*t.setAttribute(background,"blue");*/
			var d = document.getElementById("zhuzhai");
			var m = document.getElementById("gongyu");
			var v = document.getElementById("bieye");
			var p = document.getElementById("xiezilou");
			p.style.backgroundColor = "";
			m.style.backgroundColor = ""
			v.style.backgroundColor = ""
			d.style.backgroundColor = "#59d2d8"
			t.style.backgroundColor = "";
			$scope.issueroom.rentuse = d.innerHTML;

			issueclass = t.textContent;
			/*	t.removeAttribute("class");*/

		};

		$scope.cities = [{
				id: "1",
				city: "郑州"
			},
			{
				id: "2",
				city: "洛阳"
			},
			{
				id: "3",
				city: "开封"
			},
			{
				id: "4",
				city: "商丘"
			}
		];

		$scope.districts = [{
				id: "1",
				district: "中原区"
			},
			{
				id: "2",
				district: "二七区"
			},
			{
				id: "3",
				district: "金水区"
			},
			{
				id: "3",
				district: "上街区"
			},
			{
				id: "3",
				district: "惠济区"
			}
		];
		$scope.streets = [{
				id: "1",
				street: "保全街"
			},
			{
				id: "2",
				street: "康复中街"
			},
			{
				id: "3",
				street: "东大街街道"
			},
			{
				id: "3",
				street: "马砦街"
			},
			{
				id: "3",
				street: "建中街"
			},
			{
				id: "3",
				street: "蜜蜂张街道"
			}
		];

		$scope.enddatestr = "2017-04-03";
		$scope.personid = "1";

		/*		$scope.$watch('$viewContentLoaded', function() {
	
				$http({
					method: 'GET',
					url: 'http://192.168.10.251:8082/appissroom/getactid',
					languageColumn: "name_eu",
	
				}).success(function(data) {
					alert(data.acid);
	
				})
			});*/

		//发布房源数据结构

		//发布房源   我要出租

		$scope.getRentHouseInfo = function() {
			/*window.location.href="index.html";
			return;*/

			$http({
				method: 'POST',
				url: 'http://192.168.43.217:8082/issueroom/addissueroom',
				languageColumn: "name_eu",
				data: rentOutData
			}).success(function(data) {
				if(data) {
					$rootScope.mttAlert('房源发布成功',function(){
						window.location.reload();
						$state.go("rentHouse");
					});
					
				}

			}).error(function(data) {
			

			})

		};

		$scope.addPhotos = function() {
			$state.go('rentOut-img');
		};

		$scope.addVideo = function() {
			$state.go('rentOut-video');
		};

		$scope.addInfo = function() {
			rentOutData.issueroom = $scope.issueroom;
			rentOutData.bldroom = $scope.bldroom;
			rentOutData.building = $scope.building;

			$state.go('rentOut-info');
		};

	})

	//日期组件
	.controller('TimeController', function($scope) {

		//这是不可选的日期列表
		var disabledDates = [
			new Date(1437719836326),
			new Date(),
			new Date(2016, 7, 10), //months are 0-based, this is August, 10th!
			new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
			new Date("08-14-2016"), //Short format
			new Date(1439676000000) //UNIX format
		];
		//方便的年月日设置方式，正和我意，可以随便改了。
		var weekDaysList = ["S", "M", "T", "W", "T", "F", "S"];
		//默认值：["S", "M", "T", "W", "T", "F", "S"];
		var monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		//默认值：["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

		//日期选择后的回调函数
		var datePickerCallbacks = function(val) {
			if(typeof(val) === 'undefined') {} else {
				
				$scope.datepickerObject.inputDate = val; //这行官网没有，不设置 的话，选中日期不能回填到页面。
			}
		};
		//主体对象 	datepickerObject
		$scope.datepickerObject = {
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

	

	})

	.controller('lhtimeController', function($scope) {

		var options = {
			date: new Date(),
			mode: 'date', // or 'time'
			minDate: new Date() - 10000,
			allowOldDates: true,
			allowFutureDates: false,
			doneButtonLabel: 'DONE',
			doneButtonColor: '#F2F3F4',
			cancelButtonLabel: 'CANCEL',
			cancelButtonColor: '#000000'
		};

		document.addEventListener("deviceready", function() {

			$cordovaDatePicker.show(options).then(function(date) {

			});

		}, false);

	})

	//图表
	//	.controller('ChartController', function($scope) {
	//		$scope.detailChartConfig = {
	//
	//			//			chart: {
	//			//				renderTo: 'chart_line', //图表放置的容器，DIV 
	//			//				defaultSeriesType: 'line', //图表类型line(折线图), 
	//			//				zoomType: 'x' //x轴方向可以缩放 
	//			//			},
	//			//			credits: {
	//			//				enabled: false //右下角不显示LOGO 
	//			//			},
	//			//			title: {
	//			//				text: '主要城市月平均气温' //图表标题 
	//			//			},
	//			//			subtitle: {
	//			//				text: '2011年' //副标题 
	//			//			},
	//			//			xAxis: { //x轴 
	//			//				categories: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
	//			//					'11月', '12月'
	//			//				], //x轴标签名称 
	//			//				gridLineWidth: 1, //设置网格宽度为1 
	//			//				lineWidth: 2, //基线宽度 
	//			//				labels: {
	//			//					y: 26
	//			//				} //x轴标签位置：距X轴下方26像素 
	//			//			},
	//			//			yAxis: { //y轴 
	//			//				title: {
	//			//					text: '平均气温(°C)'
	//			//				}, //标题 
	//			//				lineWidth: 2 //基线宽度 
	//			//			},
	//			//			plotOptions: { //设置数据点 
	//			//				line: {
	//			//					dataLabels: {
	//			//						enabled: true //在数据点上显示对应的数据值 
	//			//					},
	//			//					enableMouseTracking: false //取消鼠标滑向触发提示框 
	//			//				}
	//			//			},
	//			//			legend: { //图例 
	//			//				layout: 'horizontal', //图例显示的样式：水平（horizontal）/垂直（vertical） 
	//			//				backgroundColor: '#ffc', //图例背景色 
	//			//				align: 'left', //图例水平对齐方式 
	//			//				verticalAlign: 'top', //图例垂直对齐方式 
	//			//				x: 100, //相对X位移 
	//			//				y: 70, //相对Y位移 
	//			//				floating: true, //设置可浮动 
	//			//				shadow: true //设置阴影 
	//			//			},
	//			//			exporting: {
	//			//				enabled: false //设置导出按钮不可用 
	//			//			},
	//			//			series: [{ //数据列 
	//			//					name: '北京',
	//			//					data: [-4.6, -2.2, 4.5, 13.1, 19.8, 24.0, 25.8, 24.4, 19.3, 12.4, 4.1, -2.7]
	//			//				},
	//			//				{
	//			//					name: '广州',
	//			//					data: [13.3, 14.4, 17.7, 21.9, 24.6, 27.2, 30.8, 32.1, 27.2, 23.7, 21.3, 15.6]
	//			//				}
	//			//			]
	//
	//			chart: {
	//				renderTo: 'chart_spline', //图表放置的容器，DIV 
	//				margin: null,
	//				height: 150,
	//				defaultSeriesType: 'spline', //图表类型为曲线图 
	//				events: {
	//					load: function() {
	//						var series = this.series[0];
	//						//每隔5秒钟，图表更新一次，y数据值在0-100之间的随机数 
	//						setInterval(function() {
	//								var x = (new Date()).getTime(), // 当前时间 
	//									y = Math.random() * 500 + 1800;
	//								series.addPoint([x, y], true, true);
	//							},
	//							5000);
	//					}
	//				}
	//			},
	//			title: {
	//				text: '' //图表标题 房屋租金走势
	//			},
	//			xAxis: { //设置X轴 
	//				type: 'datetime', //X轴为日期时间类型 
	//				tickPixelInterval: 150 //X轴标签间隔 
	//			},
	//			yAxis: { //设置Y轴 
	//				title: '',
	//				max: 2300, //Y轴最大值 
	//				min: 1800 //Y轴最小值 
	//			},
	//			tooltip: { //当鼠标悬置数据点时的提示框 
	//				formatter: function() { //格式化提示信息 
	//					return 'CPU使用率' +
	//						Highcharts.dateFormat('%H:%M:%S', this.x) + '' +
	//						Highcharts.numberFormat(this.y, 2) + '%';
	//				}
	//			},
	//			legend: {
	//				enabled: false, //设置图例不可见 
	//
	//			},
	//			exporting: {
	//				enabled: false //设置导出按钮不可用 
	//			},
	//			credits: {
	//				text: 'BIT SERVICE', //设置LOGO区文字 
	//				//url: 'http://www.helloweba.com' //设置LOGO链接地址 
	//			},
	//			//			
	//			series: [{
	//				data: (function() { //设置默认数据， 
	//					var data = [],
	//						time = (new Date()).getTime(),
	//						i;
	//
	//					for(i = -19; i <= 0; i++) {
	//						data.push({
	//							x: time + i * 5000,
	//							y: Math.random() * 500 + 1800,
	//						});
	//					}
	//					return data;
	//				})()
	//			}]
	//
	//		};
	//
	//	})

	//租金页面
	.controller("rentMoneyController", function($rootScope,$scope, ionicDatePicker, ionicTimePicker) {

		//日期
		var ipObj1 = {
			callback: function(val) {

			},
			//			callback: function(val) { //Mandatory  
			//				var mydate = new Date(val);
			//				this.timeStamp = mydate.getFullYear() + "-" + (mydate.getMonth() + 1) + "-" + mydate.getDate();
			//				//需要在控制器中定义设定的函数，用于显示时间显示的位置  
			//				__scope__.setDate();
			//			},

			disabledDates: [
				new Date(1437719836326),
				new Date(2015, 3, 16),
				new Date(2015, 4, 16),
				new Date(),
				new Date('Wednesday, August 12, 2015'),
				new Date("08-16-2016"),
				new Date(1439676000000)
			],
			from: new Date(2012, 1, 1),
			to: new Date(2026, 10, 30),
			inputDate: new Date(),
			//inputDate: new Date(new Date().getTime() + 24 * 2 * 60 * 60 * 1000),

			mondayFirst: false,
			//disableWeekdays: [0],
			closeOnSelect: false,
			templateType: 'popup'
		};
		$scope.openDatePicker = function() {
			ionicDatePicker.openDatePicker(ipObj1);
		};
		var ipOb2 = {
			callback: function(val) {
				if(typeof(val) === 'undefined') {
					console.log('Time not selected');
				} else {
					var selectedTime = new Date(val * 1000);
					console.log('点击事件返回值 : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
				}
			},
			inputTime: 50400,
			format: 12,
			step: 15,
		};
		$scope.openTimePicker = function() {
			ionicTimePicker.openTimePicker(ipOb2);
		};

	})

	.controller("khbjIndexController", function($rootScope,$scope, $state, dateService) {

		//弹出日起对话框  
		$scope.showDateDialog = function() {
			var dateConfig = {
				showTodayButton: false, //true  false  
				inputDate: new Date(new Date().getTime() + 24 * 2 * 60 * 60 * 1000),
				from: new Date(new Date().getTime() + 24 * 2 * 60 * 60 * 1000),
				to: new Date(new Date().getTime() + 24 * 8 * 60 * 60 * 1000)
			};
			dateService.showDialog($scope, dateConfig);
		};
		//需要在控制器中定义设定的函数，用于显示时间显示的位置  
		$scope.setDate = function() {
			$scope.formData.orderDate = dateService.getTimeStamp();
		};

	})

	.controller('RentOut_infoController', function($rootScope,$scope, $http, $state, $cordovaCamera, $interval, testFactory) {

		var person = {};
		//个人照
		$scope.takephoto = function() {
			//$cordovaCamera
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				
				var imaget = document.getElementById('myImage');
				imaget.src = "data:image/jpeg;base64," + imageData;
				person.grimg = "data:image/jpeg;base64," + imageData;
				document.getElementById("liveId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};

		$scope.takeeatingroom = function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var images = document.getElementById('eatingHouse');
				images.src = "data:image/jpeg;base64," + imageData;
				person.zmimg = "data:image/jpeg;base64," + imageData;
				document.getElementById("eatId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};

		$scope.takewcroom = function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var imageo = document.getElementById('wc');
				imageo.src = "data:image/jpeg;base64," + imageData;
				person.fmimg = "data:image/jpeg;base64," + imageData;
				document.getElementById("wcId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};

		//个人介绍  shm  说明
		$scope.GRJS_KY = function() {
			var t = document.getElementById("ky");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};

		$scope.GRJS_WY = function() {
			var t = document.getElementById("wy");
			t.style.backgroundColor = "#59d2d8";
			var ky = document.getElementById("ky");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			ky.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_XN = function() {
			var t = document.getElementById("xn");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var ky = document.getElementById("ky");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_LHC = function() {
			var t = document.getElementById("lhc");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var ky = document.getElementById("ky");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_QLG = function() {
			var t = document.getElementById("qlg");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var ky = document.getElementById("ky");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_JSZ = function() {
			var t = document.getElementById("jsz");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var ky = document.getElementById("ky");
			var ry = document.getElementById("ry");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_RY = function() {
			var t = document.getElementById("ry");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ky = document.getElementById("ky");
			var ds = document.getElementById("ds");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			ds.style.backgroundColor = "";
			person.shm = t.textContent;

		};
		$scope.GRJS_DS = function() {
			var t = document.getElementById("ds");
			t.style.backgroundColor = "#59d2d8";
			var wy = document.getElementById("wy");
			var xn = document.getElementById("xn");
			var lhc = document.getElementById("lhc");
			var qlg = document.getElementById("qlg");
			var jsz = document.getElementById("jsz");
			var ry = document.getElementById("ry");
			var ky = document.getElementById("ky");
			wy.style.backgroundColor = "";
			xn.style.backgroundColor = "";
			lhc.style.backgroundColor = "";
			qlg.style.backgroundColor = "";
			jsz.style.backgroundColor = "";
			ry.style.backgroundColor = "";
			ky.style.backgroundColor = "";
			person.shm = t.textContent;

		};

		//确认提交
		//$scope.data = data;
		//user.grimg="imgdata";
		//var info = {}
		$scope.confirm = function() {

			info = $scope.person;
		
			if(!angular.isDefined(info)) {
				//console.info(angular.isDefined(info.name));
				return;
			}
			if(!angular.isDefined(info.name) || info.name == "姓名不能为空" || info.name == "") {
				//alert(11);
				$scope.person.name = "姓名不能为空";
				return;
			}
			if(!angular.isDefined(info.idcardno) || info.idcardno == "身份证号不能为空" || info.idcardno == "") {

				$scope.person.idcardno = "身份证号不能为空";
				return;
			}
			if(!angular.isDefined(info.phoneno) || info.phoneno == "电话不能为空" || info.phoneno == "") {
				$scope.person.phoneno = "电话不能为空";
				return;
			}

			var data = {};
			//console.info(angular.toJson(person));
			data.person = angular.extend($scope.person, person);
			testFactory.set(data);
			//console.info(angular.toJson(data));
			//return;
			$state.go('rentOut', {
				data: data
			})

		}
	})
	//二手房房源发布
	.controller('saleershoufangController',function($rootScope,$scope,$http,$state,$ionicPopup){
		
		$scope.HouseSource={
			baseactivityid:null,
			certno:null,
			rightpeoplename:null,
			tradeintent:null,
			intentprice:null,
			issuecontent:null,
			description:null,
			decoration:null,
			issuestartdate:null,
			issueenddate:null,
			bitspno:null,
			phoneno:null
		}
		$scope.HouseSource.rightpeoplename=window.localStorage.getItem('firstname');
		$scope.HouseSource.phoneno=window.localStorage.getItem('phoneno');
		$scope.publish = function(){
		
			$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=addbldroom&_model=HouseSource',
			data: $scope.HouseSource,
			languageColumn: "name_eu"
		}).success(function(data) {
		
			if(data.type=="success"){
				$rootScope.mttAlert('恭喜您，二手房源发布成功！',function(){
					$state.go('index');
				});
					
				
			}else{
				$rootScope.mttAlert('房源已发布，不能重复发布！',function(){
					$state.go('index');
				});
				
			
				
			}
		})
		}
	})

	.controller('RentOut-imgController', function($rootScope,$scope, $cordovaCamera, $state, testFactory) {

		var img = new Array();

		$scope.takephoto = function() {
			//$cordovaCamera
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
				img.push(image.src);

				/*imgdata = "data:image/jpeg;base64," + imageData;
				img.push(imgdata);*/
				document.getElementById("liveId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};

		$scope.takeeatingroom = function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('eatingHouse');
				image.src = "data:image/jpeg;base64," + imageData;
				img.push(image.src);
				/*imgdata = "data:image/jpeg;base64," + imageData;
				img.push(imgdata);*/
				document.getElementById("eatId").removeAttribute("class");
			}, function(err) {
				// error 
			});

		};

		$scope.takewcroom = function() {
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 150,
				targetHeight: 150,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('wc');
				image.src = "data:image/jpeg;base64," + imageData;
				

				img.push(image.src);
				/*imgdata = "data:image/jpeg;base64," + imageData;
				img.push(imgdata);*/
				document.getElementById("wcId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};

		$scope.addImg = function() {
			//data.img = angular.add(cfimg, ktimg, wsjimg, osimg);
			//angular.add();
			var data = {};
			data.img = img;

			//data = angular.toJson(data);
			/*testFactory.set(data);*/
			$state.go('rentOut', {
				data: data
			});

		};

	})

	.controller('RentOutVideoController', function($rootScope,$scope, $state, $cordovaCamera, $cordovaBarcodeScanner, $cordovaCapture) {

		var video = new Array();

		$scope.videoCapture = function() {
			var options = {
				limit: 1,
				duration: 10
			};

			$cordovaCapture.captureVideo(options).then(function(audioData) {
				var i, path, len;
				for(i = 0, len = audioData.length; i < len; i += 1) {
				
					path = audioData[i].fullPath;

					video.push(path);
				}
				var b = document.getElementById("videoId");
				b.style.display = "block";

				b.src = path;

				document.getElementById("ktvideo").removeAttribute("class");
				// Success! Audio data is here
			}, function(err) {
				// An error occurred. Show a message to the user
			});
		};
		$scope.videoCapture_cf = function() {
			var options = {
				limit: 1,
				duration: 10
			};
			$cordovaCapture.captureVideo(options).then(function(audioData) {
				var i, path, len;
				for(i = 0, len = audioData.length; i < len; i += 1) {
				
					path = audioData[i].fullPath;
					video.push(path);

				}
				var b = document.getElementById("cfId");
				b.style.display = "block"
				b.src = path;
				document.getElementById("cfvideo").removeAttribute("class");

				// Success! Audio data is here
			}, function(err) {
				// An error occurred. Show a message to the user
			});

		}

		$scope.videoCapture_wsj = function() {
			var options = {
				limit: 1,
				duration: 10
			};

			$cordovaCapture.captureVideo(options).then(function(audioData) {
				var i, path, len;
				for(i = 0, len = audioData.length; i < len; i += 1) {
					
					path = audioData[i].fullPath;
					video.push(path);

				}
				var b = document.getElementById("wsjId");
				b.style.display = "block"
				b.src = path;
				document.getElementById("wsjvideo").removeAttribute("class");

				// Success! Audio data is here
			}, function(err) {
				// An error occurred. Show a message to the user
			});

		}
		var data = {};

		$scope.confirm = function() {
			data.video = video;

			$state.go('rentOut', {
				data: data
			});
		};

	})
	//二手房详情页面
	.controller("ershoufangdetailController", function($ionicPopup, $scope, $state, $http, $stateParams) {

		$scope.Bldroom = {
			rightpeopletype:null,
			price: null,
			page: null,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: null,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null
		}
		$scope.Bldroom.certno = $stateParams.certno;
		
		

		$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=bldroomdetail&_model=Bldroom',
			data: $scope.Bldroom,
			languageColumn: "name_eu"
		}).success(function(data) {
	
			$scope.datas = data;
			
			$scope.telephone = function() {
				if(data.phoneno) {
					$rootScope.mttAlert('请拨打手机号' + data.phoneno + '了解所选房源详情。')
					

				} else {
					$rootScope.mttAlert('对不起,卖售方没有预留手机号！')
					

				}
			}
			$scope.buy = function() {
			var firstname=window.localStorage.getItem("firstname");
			var mfphoneno=window.localStorage.getItem("phoneno");
			var certno=$scope.Bldroom.certno;
			var phoneno=data[0].phoneno;
			
		if(g_checkLogin()){		
		$http({
			method: 'GET',
			url: baseurl + '/ttuser/sendphonecode?firstname='+firstname+'&phoneno='+phoneno+'&certno='+certno+'&mfphoneno='+mfphoneno,
			languageColumn: "name_eu"
		}).success(function(data) {
			
			if(data.type=="success"){
				$rootScope.mttAlert('恭喜您，您已发送个人信息给卖方，等待卖方联系您！',function(){
					$state.go('index');
				})
			
				
			}
			
		})
			
					
				}else{
					$state.go('login');
				}

				
			}

		})
	})


	//商品房详情页面 
	.controller("housedetailController", function($ionicPopup, $scope, $state, $http, $stateParams) {

		$scope.Bldroom = {
			price: null,
			page: null,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: null,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null
		}
		$scope.Bldroom.bldroomid = $stateParams.xh;

		$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findByBldroomId&_model=Bldroom',
			data: $scope.Bldroom,
			languageColumn: "name_eu"
		}).success(function(data) {
	
			$scope.data = data;
			fangdetail = data;
			$scope.telephone = function() {

				if(data.phoneno) {
					$rootScope.mttAlert('请拨打手机号' + data.phoneno + '了解所选房源详情。')
					
				} else {
					$rootScope.mttAlert('对不起开发商没有预留手机号！')
					

				}
			}
			$scope.buy = function() {
			
				if(g_checkLogin()){
					$state.go('maishourenwangqian');
				}else{
					$state.go('login');
				}

				
			}

		})
	})

	//我要租房详情页面
	.controller("rentHouseDetailController", function($rootScope,$scope, $state, $http, $stateParams) {

		$scope.Bldroom = {
			price: null,
			page: null,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: null,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null
		}

		$scope.Bldroom.bldroomid = $stateParams.xh;
		$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findbybldroomid&_model=Bldroom',
			data: $scope.Bldroom,
			languageColumn: "name_eu"
		}).success(function(data) {
			

		})

	})

	//网签页面
	.controller('wangqianController', function($rootScope,$scope, $state) {
	
		
		
		

	})

	//我要租房
	.controller('rentHouseController', function($rootScope,$scope, $ionicHistory, $state, $http, $stateParams) {
		
		//弹出开发中……
		$scope.kfz = function(){
			
				$rootScope.mttAlert('该项功能正在完善中,请等待.....')
			
		}
		
		//初始化租金
		$scope.mianjis = [{
			typeId: 1,
			typeName: '70平米以下'
		}, {
			typeId: 2,
			typeName: '70到90平米'
		}, {
			typeId: 3,
			typeName: '90到120平米'
		}, {
			typeId: 4,
			typeName: '120到150平米'
		}, {
			typeId: 5,
			typeName: '150到200平米'
		}, {
			typeId: 6,
			typeName: '200平米以上'
		}];

		$scope.zhujings = [{
			typeId: 1,
			typeName: '两室一厅'
		}, {
			typeId: 2,
			typeName: '三室两厅'
		}, {
			typeId: 3,
			typeName: '两室两厅'
		}, {
			typeId: 4,
			typeName: '一室一厅'
		}, {
			typeId: 5,
			typeName: '四室三厅'
		}, {
			typeId: 6,
			typeName: '其它'
		}];
		$scope.data = {};

		//初始化区域
		$scope.cities = [{
				city: "高开区",
				cityId: 4,

			}, {
				city: "开发区",
				cityId: 3
			}, {

				city: "桥西区",
				cityId: 2
			}, {
				city: "桥东区",
				cityId: 1
			},
			
		];

		$scope.Bldroom = {
			price: null,
			page: 1,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: 200,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null
		}

		//页面加载房源
		$http({
			method: 'POST',
			url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findBldroom&_model=Bldroom',
			languageColumn: "name_eu",
			data: $scope.Bldroom
		}).success(function(data) {
			$scope.houses = data;
		})
		
		

		//按街查询
		$scope.search = function() {
			
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findBldroom&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				
				$scope.houses = data;
				

			})
		}
	

		//按照区域查询
		$scope.selectCity = function(city) {
			$scope.Bldroom.district = city;
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findBldroom&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
			
				$scope.houses = data;
		
				

			})
		}
		//按照户型查询
		$scope.selectHX = function(typeid) {

			if(typeid == 1) {
				$scope.Bldroom.type = '两室一厅';
			}
			if(typeid == 2) {
				$scope.Bldroom.type = '三室两厅';
			}
			if(typeid == 3) {
				$scope.Bldroom.type = '两室两厅';
			}
			if(typeid == 4) {
				$scope.Bldroom.type = '一室一厅';
			}
			if(typeid == 5) {
				$scope.Bldroom.type = '四室三厅';
			}
			if(typeid == 6) {
				$scope.Bldroom.type = '其它';
			}
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findBldroom&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				
				$scope.houses = data;
				

			})

		}
		//按照租金范围进行查询
		$scope.selectMJ = function(typeid) {
		
			if(typeid == 1) {
				$scope.Bldroom.buildarea_min = 0;
				$scope.Bldroom.buildarea_max = 70;
			}
			if(typeid == 2) {
				$scope.Bldroom.buildarea_min = 70;
				$scope.Bldroom.buildarea_max = 90;
			}
			if(typeid == 3) {
				$scope.Bldroom.buildarea_min = 90;
				$scope.Bldroom.buildarea_max = 120;
			}
			if(typeid == 4) {
				$scope.Bldroom.buildarea_min = 120;
				$scope.Bldroom.buildarea_max = 150;
			}
			if(typeid == 5) {
				$scope.Bldroom.buildarea_min = 150;
				$scope.Bldroom.buildarea_max = 200;

			}
			if(typeid == 6) {
				$scope.Bldroom.buildarea_min = 200;
				$scope.Bldroom.buildarea_max = 23396665;
			}
			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findBldroom&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				
				$scope.houses = data;
				

			})

		};

		

		$(".drowp-down").click(function() {
			$(this).siblings().next(".drowp-down-layer").hide();
			$(this).next(".drowp-down-layer").toggle();
		});

		$(".drowp-down-layer span").click(function() {
			var bool;
			if($(this).index() == 0) {
				if(!$(this).hasClass("acitve")) {
					$(this).addClass("acitve").siblings().removeClass("acitve");
				}
			} else {
				$(this).toggleClass("acitve");
				$(this).parent().children().eq(0).removeClass("acitve");
			}
		});

		$scope.HouseDetail = function(xh) {

			$state.go('housedetail', {
				xh: xh
			})
		}

	})

	//我

	.controller("hccController", function($rootScope,$scope, $http) {
		$scope.saveUser = {
			phone: "121",
			password: "John"
		};
		$scope.getUser = function() {

			$http({
				method: 'POST',
				url: 'http://192.168.43.217:8080/webApp/AngularJS/getUser.do',
				languageColumn: "name_eu",
				headers: {
					'Content-Type': 'application/json'
				},
				data: $scope.saveUser
			}).success(function(data) {

				// handle success
			}).error(function(data) {

			})
		};
	})
	//网签第一步
	.controller('wangqianoneController', function($rootScope,$scope, $state, $stateParams, $cacheFactory, $http, $ionicPopup,testFactory) {

		var BusinessEntryModel = {};
		$scope.confirm = function() {

			chumairen = $scope.BusinessEntryModel;

			$http({
				method: 'GET',
				url:baseurl +'/bitsroad/rpcjson?_module=TT&_method=qfwqControlle?idno=' + chumairen.IDNo + '&fullname=' + chumairen.FULLNAME,
				languageColumn: "name_eu",
			}).success(function(data) {
			
				if(data[0]) {
					var organizeno = data[0].organizeno;
					window.localStorage.setItem("organizeno", organizeno);
					chumaifang = chumairen;
					// 调用Jpush设置别名
					$state.go("yushouxuke");

				}
				//				if(data.type == "error")
				else {
					//$rootScope.$state.reload('login');
					//					alert(data);
					$rootScope.mttAlert('数据验证失败，请重新输入！')
				
			

				}	

			})
		}

	})
	//网签第二步
	.controller('wangqiantwoController', function($rootScope,$scope, $stateParams, $state, $cacheFactory, $ionicPopup,testFactory) {
		//var ayy = new Array();
		var bldroomid = $stateParams.data;

		window.localStorage.setItem("bldroomid", bldroomid);
		$scope.people = {

		};

		

		$scope.firmaseconed = function() {

			maishouren = $scope.people;

			
			var data = {};
			data.maishouren = maishouren;

			$state.go('wangqian-three', {
				data: data
			})

		}

	})
	
	
	//二手房网签第一步
	.controller('ershoufangwangqianoneController', function($rootScope,$scope, $state, $stateParams, $cacheFactory, $http,$ionicPopup, testFactory) {
		var firstname=window.localStorage.getItem('firstname');
		var phoneno=window.localStorage.getItem('phoneno');
		var idno=window.localStorage.getItem("idno");
		document.getElementById('chumai').value=firstname;
		if(phoneno.length>8){
		document.getElementById('telephone').value=phoneno;
		}else{
			
			document.getElementById('telephone').value="";
		}
		document.getElementById('idno').value=idno;
		$scope.BusinessEntryModel={
			address:null,
			IDtype:null,
			firstname:null,
			idno:null,
			phoneno:null,
		}
		$scope.confirm = function() {
			$scope.BusinessEntryModel.firstname=firstname;
			$scope.BusinessEntryModel.phoneno=phoneno;
			$scope.BusinessEntryModel.idno=idno;
			mforgpeople = $scope.BusinessEntryModel;
					// 调用Jpush设置别名
					$state.go("ershoufangyushouxuke");

			}

			})
		
	
	//二手房预售许可
	.controller('ershoufangyushouxukeController', function($rootScope,$scope, $stateParams, $state, $cacheFactory, $http, $ionicPopup,testFactory) {

		$scope.Bldroom = {
			rightpeopletype:1,
			price: null,
			page: null,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: null,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null,
			certno:null,
		}

		$scope.yushoushaxun = function() {

			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findbldroombycertno&_model=Bldroom',
				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				ershoufangwu = data;
				var array = new Array;
				array.push(data[0]);
				$scope.houses=array;
			})

		};

		$scope.demo = function(data) {

			$state.go('ershoufangwangqian-two', {
				data: data
			})
		};

	})
	
	
	
	//二手房网签第三步
	.controller('ershoufangwangqianthreeController', function($cacheFactory, $scope, $state, $http, $stateParams, testFactory) {
		maishouren = $stateParams.data.maishouren;
		orgpeople = maishouren;
		
		
		$scope.active = {};
		
		$scope.firmasethird = function() {
			if($scope.active.price)

			active = $scope.active;

			var data = active;
			$state.go('ershoufangwangqian-four', {
				data: data
			})

		}

	})
	
	
	//二手房网签第四步
	.controller('ershoufangwangqianfourController', function($rootScope,$scope, $stateParams, $state, $http, testFactory) {
		
		
		$scope.active = $stateParams.data;
		$scope.active.contracttype = 164802;
		$scope.fangwu = ershoufangwu[0];
		
		$scope.chumairen = mforgpeople;
		
		$scope.maishouren = orgpeople;
		
		var VirtualSalesorder = {};
		VirtualSalesorder.mforgpeople = mforgpeople;
		VirtualSalesorder.bldrooms = ershoufangwu;
		VirtualSalesorder.active = $scope.active;
		VirtualSalesorder.orgpeople =orgpeople;

		//提交数据到tt
		$scope.firmafour = function() {
		

			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=addesfrealsalesorder&_model=VirtualSalesorder',
				languageColumn: "name_eu",
				data: VirtualSalesorder
			}).success(function(data) {
				if(data.type=="success"){
					$rootScope.mttAlert('恭喜您，房源发布成功！',function(){
						$state.go('index');
					})
			
									
				}else{
					$rootScope.mttAlert('买受人信息不存在，请先实名注册！')
			
			
				}

			})

		};

	})
	

	
	
	
	//二手房网签第二步
		.controller('ershoufangwangqiantwoController', function($rootScope,$scope, $stateParams, $state, $cacheFactory, testFactory) {
		//var ayy = new Array();
		var bldroomid = $stateParams.data;

		window.localStorage.setItem("bldroomid", bldroomid);
		$scope.people = {

		};


		$scope.firmaseconed = function() {

			maishouren = $scope.people;

			
			var data = {};
			data.maishouren = maishouren;

			$state.go('ershoufangwangqian-three', {
				data: data
			})

		}

	})
	
	
	
	
	
	//预售许可
	.controller('yushouxukeController', function($rootScope,$scope, $stateParams, $state, $cacheFactory, $http, testFactory) {

		$scope.Bldroom = {
			price: null,
			page: 1,
			district: null,
			buildarea: null,
			street: null,
			part: null,
			doorNo: null,
			pagecount: 10,
			price_min: null,
			price_max: null,
			buildarea_min: null,
			buildarea_max: null,
			brlocation: null,
			buildID: null,
			bldroomid: null,
		}

		$scope.yushoushaxun = function() {

			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=findbybldroomid&_model=Bldroom',

				languageColumn: "name_eu",
				data: $scope.Bldroom
			}).success(function(data) {
				fangwu = data;
				var array = new Array();
				array.push(data);
				$scope.houses = array;
			})

		};

		$scope.demo = function(data) {

			$state.go('wangqian-two', {
				data: data
			})
		};

	})
	//网签第三步
	.controller('wangqianthreeController', function($cacheFactory, $scope, $state, $http, $stateParams, testFactory) {
		maishouren = $stateParams.data.maishouren;
		maishoufang = maishouren;
		$scope.active = {};

		$scope.firmasethird = function() {

			active = $scope.active;

			var data = active;
			$state.go('wangqian-four', {
				data: data
			})

		}

	})

	//网签第四步
	.controller('wangqianfourController', function($rootScope,$scope, $stateParams, $state, $http, testFactory) {

		$scope.active = $stateParams.data;
		$scope.active.contracttype = 163801;
		
		$scope.fangwu = fangwu;
		$scope.chumairen = chumaifang;
		$scope.maishouren = maishoufang;
		var VirtualSalesorder = {};
		VirtualSalesorder.orgorganize = $scope.chumairen;
		VirtualSalesorder.bldroom = $scope.fangwu;
		VirtualSalesorder.active = $scope.active;
		VirtualSalesorder.orgpeople = $scope.maishouren;

		//提交数据到tt
		$scope.firmafour = function() {

			$http({
				method: 'POST',
				url:baseurl +'/bitsroad/addSingleReturnObject?_module=TT&_method=addVirtualSalesorder&_model=VirtualSalesorder',
				languageColumn: "name_eu",
				data: VirtualSalesorder
			}).success(function(data) {
				

			})

		};

	})

	//出租筛选页面
	.controller('rentHouseShaixuanController', function($scope) {

	})

	//出租详情
	//	.controller('rentHouseDetailController', function($scope) {
	//		$scope.myActiveSlide = 1;
	//	})

	//身份认证
	.controller('identificationController', function($rootScope,$scope, $cordovaCamera, $http,$ionicPopup,$state) {

			//添加身份证照片(头像)
		function readURL(input) {
  			 if (input.files && input.files[0]) {
       			var reader = new FileReader();
       		reader.onload = function (e) {
       		document.getElementById("shenfenzhengid").style.display="none";
       		document.getElementById("shenfenzheng").removeAttribute("class");
       		document.getElementById("myShenfeng").style.width="100%";
       		document.getElementById("myShenfeng").style.margin="0 auto";
       		document.getElementById("myShenfeng").style.height="200px";
       		
           document.getElementById("myShenfeng").src=e.target.result;
            shenfengzheng=e.target.result;
            
       }
       reader.readAsDataURL(input.files[0]);
   }
}
	//添加国徽照片
  function seconedURL(input) {
  	if(input.files && input.files[0]) {
  		var reader = new FileReader();
  		reader.onload = function(e) {
  			/*alert(e.target.result);*/
  			document.getElementById("guohuiid").style.display = "none";
  			document.getElementById("guohui").removeAttribute("class");
  			document.getElementById("myguohui").style.width = "100%";
  			document.getElementById("myguohui").style.margin = "0 auto";
  			document.getElementById("myguohui").style.height = "200px";
  			document.getElementById("myguohui").src = e.target.result;
  			guohui=e.target.result
  			
  		}
  		reader.readAsDataURL(input.files[0]);
  	}
  }
  	//添加个人照片
	function thirdURL(input) {
	if(input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {

			document.getElementById("gerenzhaoid").style.display = "none";
			document.getElementById("gerenzhao").removeAttribute("class");
			document.getElementById("mygerenzhao").style.width = "100%";
			document.getElementById("mygerenzhao").style.margin = "0 auto";
			document.getElementById("mygerenzhao").style.height = "200px";
			document.getElementById("mygerenzhao").src = e.target.result;
			gerenzhao=e.target.result;
		}
		reader.readAsDataURL(input.files[0]);
	}
}
	
$("#shenfenzhengid").change(function() {
	

	readURL(this);
});

$("#guohuiid").change(function() {


	seconedURL(this);
});

$("#gerenzhaoid").change(function() {
	

	thirdURL(this);
});		
//调用face++做身份认证
$scope.confirm = function() {
	var identify={};
	
	if(shenfengzheng.length>10&&gerenzhao.length>10){
		
	identify.personimg=shenfengzheng.substring(22);
	
	identify.ownimg=gerenzhao.substring(22);
	
	$http({
		method: 'POST',
		url: baseurl+'/Identify/identifyPicture',
		languageColumn: "name_eu",
		data: identify
	}).success(function(data) {
			console.log(data);
	if(data.confidence > 80){
			$rootScope.mttAlert('恭喜您，身份认证成功！',function(){
				$state.go("index");
			})
			
	} else{
		$rootScope.mttAlert('身份认证失败，请重新认证！',function(){
			document.getElementById('shenfenzhengid').removeAttribute('style');
			document.getElementById("myShenfeng").src="";
			document.getElementById("myShenfeng").style.display="none";
			document.getElementById('guohuiid').removeAttribute('style');
			document.getElementById("myguohui").src="";
			document.getElementById("myguohui").style.display="none";
			document.getElementById('gerenzhaoid').removeAttribute('style');
			document.getElementById("mygerenzhao").src="";
			document.getElementById("mygerenzhao").style.display="none";
		})
			
		
			
			
		}

	})
	}
}
	})

	//设置
	.controller('logoutController', function($rootScope,$scope, $ionicPopup, $state) {
		$scope.confirm = function() {

			var confirmPopup = $ionicPopup.confirm({
				title: '退出登录',
				template: '您确认要退出登录?'
			});
			confirmPopup.then(function(res) {
				if(res) {
					window.localStorage.clear();
					location.reload();
					$state.go("login");
				} else {

				}
			})

		};
	})

	//合同列表
	.controller('hetongListController', function($rootScope,$scope, $stateParams, $state, $http) {

		var producerId = $stateParams.producerId;

		$scope.queren = function() {
			$state.go('queren');
		}
	})

	//确认合同
	.controller('confirmController', function($rootScope,$scope, $stateParams, $state, $http, $ionicPopup) {
		var producerId = $stateParams.producerId;
		$scope.confirm = function() {
			$rootScope.mttAlert('合同生效，已自动备案',function(){
				$state.go("pay");
			})
			
		}
	})
	//小智推荐详情页面
	.controller('xiaozhidetailController', function($rootScope,$scope, $stateParams, $ionicGesture) {
		//变量写在里面，写在外面无效
		var swipeItemWid = parseFloat($(".swipe-item").css("width"));
		$(".swipe-item").css("height", swipeItemWid * .66 + 120 + "px");
		$(".swipe-item img").css("height", swipeItemWid * .66 + "px");
		$(".buttons").css("top", swipeItemWid * .66 + 260 + "px")
		var swp = $(".swipe-container"); //需要监听的对象
		var index = 0;
		var swipeItemLen = $(".swipe-item").length;
		//监听服务  //弹窗效果
		$ionicGesture.on("swipeleft", function() {
			if(index == swipeItemLen - 1) {
				$(".swipe-item").eq(0).addClass("next");
			} else {
				$(".swipe-item").eq(index + 1).addClass("next");
			}
			$(".swipe-item.index").animate({
				transformOrigin: "bottom center",
				transform: "rotate(-30deg)",
				opacity: 0
			}, function() {
				$(".swipe-item.index").removeClass("index");
				if(index < swipeItemLen - 1) {
					$(this).next().addClass("index");
					$(".swipe-item").eq(index).animate({
						transformOrigin: "bottom center",
						transform: "rotate(0)",
						opacity: 1
					}, 0);
					index += 1;
				} else {
					index = 0;
					$(".swipe-item").eq(0).addClass("index");
					$(".swipe-item").eq(swipeItemLen - 1).animate({
						transformOrigin: "bottom center",
						transform: "rotate(0)",
						opacity: 1
					}, 0);
				}
				$(".swipe-item").removeClass("next");
			});
		}, angular.element(swp));
		$ionicGesture.on("swiperight", function() {
			if(index == 0) {
				$(".swipe-item").eq(swipeItemLen - 1).addClass("next");
			} else {
				$(".swipe-item").eq(index - 1).addClass("next");
			}
			$(".swipe-item.index").animate({
				transformOrigin: "bottom center",
				transform: "rotate(30deg)",
				opacity: 0
			}, function() {
				$(".swipe-item.index").removeClass("index");
				if(index == 0) {
					index = swipeItemLen - 1;
					$(".swipe-item").eq(index).addClass("index");
					$(".swipe-item").eq(0).animate({
						transformOrigin: "bottom center",
						transform: "rotate(0)",
						opacity: 1
					}, 0);
				} else {
					index -= 1;
					$(".swipe-item").eq(index).addClass("index");
					$(".swipe-item").eq(index + 1).animate({
						transformOrigin: "bottom center",
						transform: "rotate(0)",
						opacity: 1
					}, 0);
				}
				$(".swipe-item").removeClass("next");
			})
		}, angular.element(swp));
		//变量写在里面，写在外面无效
		var buttonLike = $(".buttons .button-like"); //需要监听的对象
		var buttonHate = $(".buttons .button-hate"); //需要监听的对象
		//监听服务  //弹窗效果
		$ionicGesture.on("tap", function() {
			$(this).animate({
				boxShadow: "0 5px 15px rgba(0,0,0,.9)"
			}, 100, function() {
				$(this).animate({
					boxShadow: "0 5px 8px rgba(0,0,0,.4)"
				}, 100);
			});
		}, angular.element(buttonLike));
		$ionicGesture.on("tap", function() {
			$(this).animate({
				boxShadow: "0 5px 15px rgba(0,0,0,.9)"
			}, 100, function() {
				$(this).animate({
					boxShadow: "0 5px 8px rgba(0,0,0,.4)"
				}, 100);
			});
		}, angular.element(buttonHate));
	})
	//进度列表
	.controller("scheduleController", function($scope, $ionicActionSheet, $state) {
		$scope.add = function() {
			$state.go("jinduchaxun");

		}
	})
	//我的房屋
	.controller("myhouseController", function($rootScope,$scope, $state) {
		$scope.demo = function() {
			$state.go("myhousedetail");
		}

	})



	//头像上传
	.controller("avatorController", function($rootScope,$scope, $ionicActionSheet, $timeout) {

		$scope.show = function() {
			//显示操作表
			var activeSheet = $ionicActionSheet.show({
				buttons: [{
						text: "相册中选择"
					},
					{
						text: "拍照"
					},

				],
				//                      destructiveText: "Delete",
				//                      titleText: "Modify your album",
				cancelText: "取消",
				//普通按钮点击回调
				buttonClicked: function(index) {
					//alert(0);
					return true;
				},
				//取消按钮点击回调
				cancel: function() {
					//alert("取消")
				},
				//危险按钮点击回调
				destructiveButtonClicked: function() {
					//alert("危险")
				},
				//自定义样式类
				cssClass: "selfCssClassName"
			});
			$timeout(function() {
				activeSheet();
			}, 5000)
		}
	})
	.config(function($httpProvider) {
		var token = window.localStorage.getItem("token");

		window.localStorage.clear();

		$httpProvider.defaults.headers.common = {
			'token': token
		}
	})
	
	
	//公告公示列表
	
	.controller('gonggaogongshiController',function($rootScope,$scope,$http,$state,$ionicPopup,$sce){
		//console.log('公告公示必须含有一张图片')
		$scope.gggsresults = [];
		$scope.gggsInfoUrl = baseurl + '/bitsroad/queryRecordJson?_module=Mobile&_method=getPublicityByMap&id='
		$http({
			method: 'GET',
			url: baseurl + '/bitsroad/queryPageJson?_module=Mobile&_method=getPublicities&type=gsgg&numPerPage=6',
		}).success(function(data) {
			for(var i = 0;i<data._page.results.length;i++){
				var lsData = {}
				var _this = data._page.results[i];
				lsData.id = _this.id;//id
				lsData.pdate = _this.pdate;//时间
				lsData.title = _this.title;//标题
				var arr1 = _this.content.split('/mtt_file/ueditor');
				if(arr1[1]){
					var arr2 = arr1[1].split('"');
					console.log(arr2[0])
					lsData.imgSrc = arr2[0].replace(/\/image/g,baseurl + '/mtt_file/ueditor/image');
				}
				$scope.gggsresults.push(lsData)
			}
			
			
		}).error(function() {
			$rootScope.mttAlert('网络错误！')
			
		});
		
		//跳往公告公示详情页
		$scope.gogggsInfo = function(id){
			$state.go("gonggaogongshi-detail",{id:id});
		}
	
	})
	
	//公告公示详情
	
	.controller('gggsInfoController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$sce){
		//获取id
		////console.log($stateParams.id)
		$http({
			method: 'GET',
			url: baseurl + '/bitsroad/queryRecordJson?_module=Mobile&_method=getPublicityByMap&id='+$stateParams.id,
		}).success(function(data) {
			$scope.infoData = data._result;
			var html = data._result.content.replace(/\/mtt_file\/ueditor\/image\//g, baseurl + '/mtt_file/ueditor/image/');
			$scope.htmlText = function () {
	            return $sce.trustAsHtml(html);
	        };
		}).error(function() {
			$rootScope.mttAlert('网络错误！')
			
		});
	
	})

	
	//档案查询
	
	.controller('dacxController',function($rootScope,$scope,$http,$state,$ionicPopup){
		//验证输入框不为空
		/*$scope.regInput = function(obj){
			for(var key in obj){
				if(obj[key] == ''||obj[key] == null||obj[key] == ' '){
					$rootScope.mttAlert('业务备案编号不能为空！')
					
					return false
				}
			}
			return true
		}*/
		//获取用户姓名和身份证号码
		var yhname = window.localStorage.getItem("firstname");
		var sfzno = window.localStorage.getItem("idno");
		$scope.regStorVal = function(){
			if(yhname == ''||yhname == null||yhname ==' '||sfzno == ''||sfzno == null||sfzno ==' '){
				$rootScope.mttAlert('您还没有登录,现在去登录',function(){
					$state.go('login')
				})
				
				return false
			}else{return true}
		}
		$scope.regStorVal();
		//社会查询
		$scope.shehuichaxun={
				name:yhname,
				sfzNum:sfzno
		}	
		$scope.shehuichaxunFn = function(){
			
			if($scope.regStorVal()){
				$state.go("dacxjg_ssh");
			};
			
		}
		
		//协税查询
		$scope.xieshuichaxun = {
				name:yhname,
				sfzNum:sfzno
		}
		$scope.xieshuichaxunFn = function(){
			if($scope.regStorVal()){
				$state.go("dacxjg_xs");
				/*if($scope.regInput($scope.xieshuichaxun)){
					babh=$scope.xieshuichaxun.baywNum;
						$state.go("dacxjg_xs");
				};*/
				
			}
		}
		
	})

	//档案查询结果
		//社会化查询结果
	.controller('cxjgsshController',function($rootScope,$scope,$http,$state,$ionicPopup){
		$scope.resultData = {}
		$http({
			method: 'POST',
			url: baseurl + '/bitsroad/rpcjson?_module=TT&_method=shhSearch',
		}).success(function(data) {
			if(data.type == "success") {
				$scope.resultData=data.content;
				var idno = window.localStorage.getItem("idno");
				$http({
					method: 'GET',
					url: baseurl + '/filesystemcheck/sshGetTwoWeiMa?idno='+idno,
					languageColumn: "name_eu"
				}).success(function(data) {
					if(data.type=="success"){
						var sshcontent= 'data:img/jpg;base64,'+data.content;
			          	   document.getElementById("ssh").src=sshcontent;
					}else{
						$rootScope.mttAlert(data.content);
						
					}
					 
				})
			}else{
				$rootScope.mttAlert(data.content)
			}
			
		}).error(function() {
			$rootScope.mttAlert('网络错误！')
			
		});
		
	})
	//改为个人房屋信息查询（原协税查询结果）
	.controller('cxjgxsController',function($rootScope,$scope,$http,$state,$ionicLoading,$ionicModal,$ionicPopup,MyFactoryNew){

		$scope.resultData = {}
		var idno = window.localStorage.getItem("idno");
		var name = window.localStorage.getItem("firstname");
		$scope.initGrfwxxcx = function() {
			var requestBody = {_module:'TT',_method:'grfwxxSearch'};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		    	if(data && data.type && data.type=="success"){
		    		$scope.resultData=data.content;
		    		if(data.content.rooms.length == 0){
		    			$scope.isShowNoinfo=true;
		    		}else{
		    			$scope.isShowHaveinfo=true;
		    		}
		    		$http({
		                 method: 'GET',
		                 //url:baseurl+ '/filesystemcheck/sshGetTwoWeiMa?name='+name +'&idno='+idno,
		                 url: baseurl + '/filesystemcheck/sshGetTwoWeiMa?idno='+idno,
		                 languageColumn: "name_eu",
		             }).success(function (data){
		            	 if(data.type=="success"){
		            		var xscontent= 'data:img/jpg;base64,'+data.content;
				          	  document.getElementById("xs").src=xscontent;	
		            	}else{
		            		$rootScope.mttAlert(data.content);
		            	}
		             })
		    	}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
			})
		}
		$scope.initGrfwxxcx();
		
	})
	
	
	//房屋产权
	.controller('houserightController',function($rootScope,$scope,$state,$ionicPopup){
		//跳往档案查询
		$scope.godacx = function(){
			if(g_checkLogin()){
				$state.go('dacx_home')
			}else{
				$rootScope.mttAlert('您还没有登录!')
			}
		}
		//弹出开发中……
		$scope.kfz = function(){
			
				$rootScope.mttAlert('该项功能正在完善中,请等待.....')
			
		}
	})
	
	
	
	
	
	
	
	
	