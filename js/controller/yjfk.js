angular.module('controller_yjfk', ['ionic', 'highcharts-ng', 'ngCordova', 'services-2.0'])


/**
 * 意见反馈
 */
.controller('yjfkyhController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){

	$scope.goHuiFu = function(id){
		$state.go('yjhf_yh',{id:id});
	}
	
	var listName = "yjfkList";
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'getYjfkListByPage',askAppCzz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'getYjfkListByPage',askAppCzz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh(false);
	
})

/**
 * 意见发表
 */
.controller('fbyjyhController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){

	var yjfk_id = $stateParams.id;
	
	$scope.save = function(){
		var askDesc = $scope.ASKDESC;
		if(!askDesc){
			$rootScope.mttAlert("请输入意见内容！");
			return false;
		}
		var requestBody = {_module:'TT',_method:'saveAppYjfk',askDesc:askDesc,askAppCzz:g_getLoginPhoneno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ASKDATE = data.content.ASKDATE;
				$scope.ASKDESC = data.content.ASKDESC;
				$scope.ID = data.content.ID;
				$rootScope.mttAlert("保存成功！如需图片描述请点击上传图片按钮");
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	$scope.goEdit = function(id){
		$rootScope.if_oper = true;
		$rootScope.titleName = "编辑图片";
		$state.go('yjfk_editPics',{id:id,backURL:'fbyj_yh'});
	}
	$scope.goEditVideo = function(id){
		$rootScope.if_oper = true;
		var if_oper = true;
		$rootScope.titleName = "编辑视频";
		$state.go('yjfk_editVideo',{id:id,if_oper:if_oper,backURL:'fbyj_yh'});
	}
	$scope.goEditVoice = function(id){
		$rootScope.if_oper = true;
		var if_oper = true;
		$rootScope.titleName = "编辑语音";
		$state.go('yjfk_editVoice',{id:id,if_oper:if_oper,backURL:'fbyj_yh'});
	}

	$scope.send = function(id){
		var askDesc = $scope.ASKDESC;
		if(!askDesc){
			$rootScope.mttAlert("意见内容不能为空!");
			return false;
		}
		var requestBody = {_module:'TT',_method:'sendAppYjfk',id:id,askDesc:askDesc};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert(data.content);
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
	}
	
	var getYjfkWithID = function(){
		if(angular.isNumber(yjfk_id)){
			var requestBody = {_module:'TT',_method:'queryAppYjfk',id:yjfk_id};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$scope.ASKDATE = data.content.ASKDATE;
					$scope.ASKDESC = data.content.ASKDESC;
					$scope.ID = data.content.ID;
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
		}
	}
	//当拍照完返回来时查询
	getYjfkWithID();
	
})

/**
 * 上传图片
 */
.controller('yjfkEditPicsController',function($rootScope,$scope,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$ionicPopover,MyFactoryNew){

	var yjfkid = $stateParams.id;
	
	$scope.getAllImgs = function() {
		var requestBody = {_module:'TT',_method:'findAppYjfkImgList',yjfkid:yjfkid+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			$rootScope.imgList = null;
			if(data && data.imgList){
				$rootScope.imgList = data.imgList;
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("查询出错！");
			}
        })
	}
	
	$scope.getAllImgs();
	
	//APP端：意见反馈图片-获取数据
	$scope.yjfkImgUp_APP = function(method) {
		if(method == 1){//拍照
			g_takePhoto($rootScope, $scope, $cordovaCamera, function(){
				if($scope.imageData){//返回有图片数据
					$scope.yjfkImgUp();
				}
			});
		}else{//选择图片
			g_takeAndSelectPhoto($rootScope, $scope, $cordovaCamera, function(){
				if($scope.imageData){//返回有图片数据
					$scope.yjfkImgUp();
				}
			});
		}
	}
	
	//WEB端：意见反馈图片-获取数据
	$scope.yjfkImgUp_WEB = function(curObj) {
		var inputId = curObj.attributes.id.value;
		g_WEB_dealPhoto($rootScope, $scope, function(){
			if($scope.imageData){//拍照功能，返回有数据
				$scope.yjfkImgUp();
                $("#"+inputId).val('');
			}
		});		
	}
	
	/**
	 * 意见反馈图片上传
	 */
	$scope.yjfkImgUp = function() {
		var imageData = $scope.imageData;
		var imgList = new Array();
		var imgObj ={imgData:imageData};
		imgList.push(imgObj);
		//先上传再展示本地
		var requestBody = {imgList:imgList,yjfkid:yjfkid+"",baseImgShowUrlPath:baseurl};
		MyFactoryNew.getHttpRequest( baseurl + '/appimg/upload', 'POST', null, requestBody,"请稍后,上传中……").then(function (data) {
			if(data && data.type && data.type=="success" && data.content && data.content.reducedImgData){
				var imgno = data.content.imgno;
				imageData = data.content.reducedImgData;
				var imgDom = "<div class='pic-item' id='div_"+imgno+"'><img id="+imgno+" src='data:image/jpeg;base64,"+imageData+"' /><i class='icon ion-close-circled' ></i></div>";
				$("#addPhotos").before(imgDom);
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
		var requestBody = {_module:'TT',_method:'delAppYjfkImg',imgno:imgno};
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
/**
 * 上传语音
 */                                            
.controller('yjfkEditVoiceController',function($rootScope,$scope,$sce,$cordovaMedia,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$cordovaCapture,$interval,$timeout,$ionicPopover,MyFactoryNew){
	var yjfkid = $stateParams.id;
	var if_oper = $stateParams.if_oper;
	var mediatype=2;
	//获取语音数据列表
	$scope.getAllaudio = function() {
		var requestBody = {_module:'TT',_method:'findAppYjfkAudioList',yjfkid:yjfkid+"",mediatype:mediatype+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.audioList){
			   var videoList = data.audioList;
               var tbody = "";
               for (var i = 0; i < videoList.length; i++) {
                  var audioListDom = "<div class='pic-item' id='div_"+videoList[i].ID+"'><audio src='"+$sce.trustAsResourceUrl(videoList[i].SRC)+"' class='audio_item' id="+videoList[i].ID+" controls></audio>" +
                  		"<div class='play-item' id="+videoList[i].ID+"> <button class='boFang'>播放</button><button class='stop'>暂停</button>";
                  var delAudio="<button class='tuPianShanCHu'>删除</button></div>";
                  //var delAudio="<div><i class='icon ion-close-circled tuPianShanCHu'></i></div>";
                  if(if_oper){
                	  audioListDom+=delAudio;
                	  audioListDom+="</div>";
				  }else{
					  audioListDom+="</div></div>";
				  }
                  tbody+=audioListDom;
               }
               $("#showAudio").append(tbody);
               if(if_oper){
            	   $(".tuPianShanCHu").off("click").on("click",function(){
						var vediono = $(this).parent().closest('.pic-item').attr("id").substr(4);
						$scope.delVedio(vediono);
					})
				}
                $(".boFang").off("click").on("click",function(){
					var au_dio = $(this).parent().parent().find("audio");
					au_dio.get(0).play();
				})
			    $(".stop").off("click").on("click",function(){
					var au_dio = $(this).parent().parent().find("audio");
					au_dio.get(0).pause();
			    })
			    
	             //校验是否微信客户端：需要优化
	           	if($rootScope.PUBLIC_CLIENT_WECHAT){
	           		$rootScope.WeChat_JSSDK_Init();
	           	}
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("查询出错！");
			}
        })
	}
	$scope.getAllaudio();
	$scope.playaudio=function(){
		var aa=$("#dd");
		aa.get(0).play();
	}
	//录制语音-APP端
	$scope.yjfkAudioUp_APP = function() {
		var options = {
			limit: 1,
			duration: 60
		};
		$cordovaCapture.captureAudio(options).then(function(audioData){
			if(audioData){
				$scope.yjfkAudioUp(audioData);
			}
		}, function(err) {
			console.log("取消拍摄");
		});
	}
	
	/*录音div弹出层*/
    //轮播相关
    var index = [9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var num = index.length;
    var timer = null; //用于清除计时器
    //轮播
    $scope.setTimer=function(){
    	timer=$interval(function () {
    		$timeout(function () {
    			num++;
    			$(".blackBoxSpeak").css("background","url('img/audio/ic_record@2x.png')no-repeat 28px 16px/64px 104px, url('img/audio/ic_record_ripple@2x-" + index[num] + ".png')no-repeat 111.2px 32px/28.8px 88px");
    			$(".blackBoxSpeak").css("backgroundColor"," rgba(0,0,0,.7)");
    		},70);
    		if (num >= index.length - 1) {
                num = 0;
            }
        },70); 
    }
    $scope.clearTimer=function(){
    	$interval.cancel(timer);
    }
    //初始化状态
    $scope.initStatus = function () {
    	$scope.btntext="按住 说话";
        //全部隐藏
    	$(".blackBoxSpeak").css("display","none");
    }
    $scope.initStatus();
    
    //开始录音 显示录音
    $scope.showBlackBoxSpeak=function(){
    	$scope.btntext = '松开 结束';
        $(".blackBoxSpeak").css("display","block");
    	//中间黑色边框和里面的内容（录音状态）
        $(".blackBoxSpeak").css("background", "url('img/audio/ic_record@2x.png')no-repeat 28 16px/65px 104px, url('img/audio/ic_record_ripple@2x-9.png')no-repeat 111.2px 32px/28.8px 88px");
        $(".blackBoxSpeak").css("backgroundColor","rgba(0,0,0,.7)");
        $scope.setTimer();
    }

    //结束录音 隐藏录音 
    $scope.showBlackBoxPause=function(){
    	$scope.clearTimer();
    	$scope.btntext="录音结束 即将上传";
    	$(".blackBoxSpeak").css("display","none");
    }
    
    //调用微信端录音功能
	var voice = {localId: '',serverId: ''};
	//开始录音-微信端
	$scope.start=function(){
		TIMESTART = new Date().getTime();
		$scope.showBlackBoxSpeak();
    	wx.startRecord({
            success: function(){
                localStorage.rainAllowRecord = 'true';
            },
            cancel: function () {
            	$rootScope.mttAlert("用户拒绝授权录音！");
            }
        });
        
	}
	//结束录音-微信端
	$scope.end=function(){
		$scope.showBlackBoxPause();
		wx.stopRecord({
	          success: function (res) {
	            if(res.localId){
	            	voice.localId = res.localId;
	            	wx.playVoice({
	                    localId: res.localId
	                });
	            	var confirmPopup = $ionicPopup.confirm({
	    				title: '温馨提示',
	    				template: '语音录制成功，是否继续上传?'
	    			});
	    			confirmPopup.then(function(res) {
	    				if(res) { 
	    					$scope.uploadVoice(voice.localId);
	    					$scope.btntext="按住 说话";
	    				}else{
	    					$scope.btntext="按住 说话";
	    				};
	    			})
	            }else{
	            	$rootScope.mttAlert("录音失败，未采集到声音，请长按按钮重新录制！");
	            	$scope.btntext="重新录制";
	            }
	          },
	          fail: function (res) {
	        	$rootScope.mttAlert("录音失败："+JSON.stringify(res));
	        	$scope.btntext="重新录制";
	          }
        });
		
	}
	/**
	 * 意见反馈语音微信端上传
	 */
   $scope.uploadVoice=function(localId){
	   wx.uploadVoice({
		   localId: localId, // 需要上传的音频的本地ID，由stopRecord接口获得
		   isShowProgressTips: 1, // 默认为1，显示进度提示
		   success: function (res) {
			   var serverId = res.serverId; // 返回音频的服务器端ID
			   var requestBody = {serverId:serverId,yjfkid:yjfkid+"",baseVideoShowUrlPath:baseurl,mediatype:mediatype+""};
		   		MyFactoryNew.getHttpRequest( baseurl + '/appVideo/uploadAudioWX', 'POST', null, requestBody,"请稍后,上传中……").then(function (data) {
		   			if(data && data.type && data.type=="success" && data.content){
		   				var audiono = data.content.audioNo;
                        var audiourl = data.content.audioUrl;
                        var audioDom = "<div class='pic-item' id='div_"+audiono+"'><audio src='"+audiourl+"' class='audio_item' id="+audiono+" controls></audio><div class='play-item' id="+audiono+"><button class='boFang'>播放</button><button class='stop'>暂停</button><button class='tuPianShanCHu'>删除</button></div></div>";
                        $("#addPhotos").before(audioDom);
                        $(".boFang").off("click").on("click",function(){
        					var au_dio = $(this).parent().parent().find("audio");
        					au_dio.get(0).play();
        				})
        			    $(".stop").off("click").on("click",function(){
        					var au_dio = $(this).parent().parent().find("audio");
        					au_dio.get(0).pause();
        			    })
                        $(".tuPianShanCHu").off("click").on("click",function(){
							var vediono = $(this).parent().closest('.pic-item').attr("id").substr(4);
							$scope.delVedio(vediono);
	    				})
		   			}else if(data && data.type && data.type=="error"){
		   				$rootScope.mttAlert(data.content);
		   			}else{
		   				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		   			}
		   		})
		   }
	   });
   }
    
	/**
	 * 意见反馈语音app端上传
	 */
	$scope.yjfkAudioUp = function(audioData) {
		$rootScope.showLoading("请稍后,上传中……");
		var videoList = new Array();
		var audioObj ={videoData:audioData};
		videoList.push(audioObj);

		var i, path, len;
		for(i = 0, len = audioData.length; i < len; i += 1) {
			path = audioData[i].fullPath;
			var geshi=path.substring(path.lastIndexOf(".")+1);
			console.log("意见反馈语音app端上传格式："+geshi);
			deviceInfo=$rootScope.deviceInfo;
            var localPath;
            if(deviceInfo=='IOS'){
            	console.log("获取IOS路径");
                localPath = 'file://' + path;
            }else{
                console.log("获取Android路径");
                localPath = path;
            }
            
			 var formData = new FormData();
			 window.resolveLocalFileSystemURL(localPath, function(fileEntry) {
		          fileEntry.file(function(file) {
		            var reader = new FileReader();
		            reader.onloadend = function(e) {
	            	  deviceInfo=$rootScope.deviceInfo;
		              var the_file;
		              if(deviceInfo=='IOS'){
		                 the_file = new Blob([e.target.result ], { type: "audio/wav" } );
		                 formData.append("file", the_file,"audio.wav");
		              }else{
		                 the_file = new Blob([e.target.result ], { type: "audio/"+geshi+""} );
		                 formData.append("file", the_file,"audio."+geshi+"");
		              }
                      formData.append("yjfkid", yjfkid);
                      formData.append("baseurlPath", baseurl);
                      formData.append("mediatype", mediatype);
                         //以下是表单参数
                         $.ajax({
                            url: baseurl+ "/appVideo/uploadMediaApp",
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                            $rootScope.hideLoading();
                                if(response.type=="success"){
	                                $rootScope.hideLoading();
	                                var vediono = response.content.videoNo;
	                                var vediourl = response.content.videoUrl;
	                                var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><audio src='"+vediourl+"' class='audio_item' id="+vediono+" controls></audio><div class='play-item' id="+vediono+"><button class='boFang'>播放</button><button class='stop'>暂停</button><button class='tuPianShanCHu'>删除</button></div></div>";
	                                $("#addPhotos").before(vedioDom);
	                                $(".boFang").off("click").on("click",function(){
	                					var au_dio = $(this).parent().parent().find("audio");
	                					au_dio.get(0).play();
	                				})
	                			    $(".stop").off("click").on("click",function(){
	                					var au_dio = $(this).parent().parent().find("audio");
	                					au_dio.get(0).pause();
	                			    })
	                                $(".tuPianShanCHu").off("click").on("click",function(){
										var vediono = $(this).parent().closest('.pic-item').attr("id").substr(4);
										$scope.delVedio(vediono);
				    				})
                                }else{
	                                $rootScope.hideLoading();
	                                $rootScope.mttAlert(response.content);
                                }
                            },error: function (response) {
                                $rootScope.hideLoading();
                                $rootScope.mttAlert(PUBLIC_OPER_ERROR);
                                }
                            });
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

    }	
	
	/**
	 * 意见反馈语音web端上传
	 */	
	$scope.audioCaptu_WEB = function(curObj) {
		console.log("进入web端语音录制");
		var inputId = curObj.attributes.id.value;
	    var files = event.target.files;
	    if (files && files.length > 0) {
	        var fileReader = new FileReader();
	        fileReader.readAsDataURL(files[0]);
	        fileReader.onload = function(e) {
	          var base64Video = e.target.result;
	          var videoList = new Array();
	    	  var videoObj ={base64Data:base64Video};
	    	  videoList.push(videoObj);
	           var requestBody = {videoList:videoList,yjfkid:yjfkid+"",baseVideoShowUrlPath:baseurl,mediatype:mediatype+""};
	    		MyFactoryNew.getHttpRequest( baseurl + '/appVideo/uploadVideoweb', 'POST', null, requestBody,"请稍后,上传中……").then(function (data) {
	    			if(data && data.type && data.type=="success" && data.content){
	    				var vediono = data.content;
	    				var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><audio src='"+base64Video+"' class='audio_item' id="+vediono+" controls ></audio><div class='play-item' id="+vediono+"><button class='boFang'>播放</button><button class='stop'>暂停</button><button class='tuPianShanCHu'>删除</button></div></div>";
	    				$("#addPhotos").before(vedioDom);
	    				$(".boFang").off("click").on("click",function(){
        					var au_dio = $(this).parent().parent().find("audio");
        					au_dio.get(0).play();
        				})
        			    $(".stop").off("click").on("click",function(){
        					var au_dio = $(this).parent().parent().find("audio");
        					au_dio.get(0).pause();
        			    })
	    				$(".tuPianShanCHu").off("click").on("click",function(){
							var vediono = $(this).parent().closest('.pic-item').attr("id").substr(4);
							$scope.delVedio(vediono);
	    				})
	    			}else if(data && data.type && data.type=="error"){
	    				$rootScope.mttAlert(data.content);
	    			}else{
	    				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	    			}
	    		})
	       }
	    } 
	    
	}
	//删除语音文件
	$scope.delVedio = function(vediono) {
		var requestBody = {vediono:vediono};
		MyFactoryNew.getHttpRequest(baseurl + '/appVideo/deleteVideo', 'POST', null, requestBody,"请稍后,删除中……").then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert("删除成功！");
				$("#div_"+vediono).remove();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
    };
})

/**
 * 上传视频
 */
.controller('yjfkEditVideoController',function($rootScope,$scope,$sce,$state,$stateParams,$ionicPopup,$ionicListDelegate, $http, $ionicLoading,$ionicModal,$cordovaCamera,$cordovaCapture,$cordovaFileTransfer,$ionicPopover,MyFactoryNew){

	var yjfkid = $stateParams.id;
	var if_oper = $stateParams.if_oper;
	var mediatype=1;
	//获取视频数据列表
	$scope.getAllvideos = function() {
		var requestBody = {_module:'TT',_method:'findAppYjfkAudioList',yjfkid:yjfkid+"",mediatype:mediatype+""};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.audioList){
			   var videoList = data.audioList;
               var tbody = "";
               for (var i = 0; i < videoList.length; i++) {
                  var vedioListDom = "<div class='pic-item' id='div_"+videoList[i].ID+"'><video src='"+$sce.trustAsResourceUrl(videoList[i].SRC)+"' id="+videoList[i].ID+" width="+320+" height="+240+" controls autobuffer poster></video>";
                  var delVideo="<div><i class='icon ion-close-circled tuPianShanCHu'></i></div>";
                  if(if_oper){
                	  vedioListDom+=delVideo;
					}
                  vedioListDom+="</div>";
                  tbody+=vedioListDom;
               }
               $("#showVideo").append(tbody);
               if(if_oper){
            	   $(".tuPianShanCHu").off("click").on("click",function(){
						var vediono = $(this).parent().parent().attr("id").substr(4);
						$scope.delVedio(vediono);
					})
				}
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert("查询出错！");
			}
        })
	}
	
	$scope.getAllvideos();
	
	//录制视频-APP端
	$scope.yjfkVideoUp_APP = function(method) {
		if(method == 1){//拍视频
			var options = {
					limit: 1,
					duration: 10
			};
			$cordovaCapture.captureVideo(options).then(function(audioData) {
				if(audioData){
					$scope.yjfkVideoUp(audioData);
				}
			}, function(err) {
				console.log("取消拍摄");
			});
		}else{//选择视频
			var options = {
				    quality: 50,
				    destinationType: Camera.DestinationType.FILE_URI,
				    sourceType: 0,
				    mediaType: 1,//为1时允许选择视频文件
				    allowEdit: true,
				    correctOrientation: true  //Corrects Android orientation quirks
				  };
			$cordovaCamera.getPicture(options).then(function(audioData){
				if(audioData){
					deviceInfo=$rootScope.deviceInfo;
		            if(deviceInfo=='IOS'){
		            	$scope.yjfkChooseVideoIOSUp(audioData);
		            }else{
		                $scope.yjfkVideoChooseADUp(audioData);
		            }
					
				}
			}, function(err) {
				console.log("取消拍摄");
			});
		}
	}
	/**
	 * 意见反馈视频选择安卓上传
	 */
	$scope.yjfkVideoChooseADUp = function(audioData) {
		console.log("进入安卓选择视频上传");
		var videoList = new Array();
		var audioObj ={videoData:audioData};
		videoList.push(audioObj);
        var localPath='file://' + audioData;
		var formData = new FormData();
		window.resolveLocalFileSystemURL(localPath, function(fileEntry) {
	         fileEntry.file(function(file) {
	            var reader = new FileReader();
	            reader.onloadend = function(e) {
	              var the_file = new Blob([e.target.result ], { type: "video/mp4" } );
	              formData.append("file", the_file,"video.mp4");
                  //formData.append("videoList", videoList);
                  formData.append("yjfkid", yjfkid);
                  formData.append("baseurlPath", baseurl);
                  formData.append("mediatype", mediatype);
                     $rootScope.showLoading("请稍后,上传中……");
                     //以下是表单参数
                     $.ajax({
                        url: baseurl+ "/appVideo/uploadMediaApp",
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                        $rootScope.hideLoading();
                            if(response.type=="success"){
                                $rootScope.hideLoading();
                                var vediono = response.content.videoNo;
                                var vediourl = response.content.videoUrl;
                                var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><video src='"+vediourl+"' id="+vediono+" width="+320+" height="+240+" controls autobuffer poster></video><i class='icon ion-close-circled' ></i></div>";
                                $("#addPhotos").before(vedioDom);
                                $("#div_"+vediono).find("i").bind("click",function(){
                                   $scope.delVedio(vediono);
                                });
                            }else{
                                $rootScope.hideLoading();
                                $rootScope.mttAlert(response.content);
                            }
                        },error: function (response) {
                            $rootScope.hideLoading();
                            $rootScope.mttAlert(PUBLIC_OPER_ERROR);
                            }
                        });
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
	/**
	 * 意见反馈视频选择ios上传
	 */
	$scope.yjfkChooseVideoIOSUp = function(audioData) {
		var videoList = new Array();
		var audioObj ={videoData:audioData};
		videoList.push(audioObj);
		var formData = new FormData();
		window.resolveLocalFileSystemURL(audioData, function(fileEntry) {
	         fileEntry.file(function(file) {
	            var reader = new FileReader();
	            reader.onloadend = function(e) {
	              var the_file = new Blob([e.target.result ], { type: "video/mp4" } );
	              formData.append("file", the_file,"video.mp4");
                  //formData.append("videoList", videoList);
                  formData.append("yjfkid", yjfkid);
                  formData.append("baseurlPath", baseurl);
                  formData.append("mediatype", mediatype);
                     $rootScope.showLoading("请稍后,上传中……");
                     //以下是表单参数
                     $.ajax({
                        url: baseurl+ "/appVideo/uploadMediaApp",
                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (response) {
                        $rootScope.hideLoading();
                            if(response.type=="success"){
                                $rootScope.hideLoading();
                                var vediono = response.content.videoNo;
                                var vediourl = response.content.videoUrl;
                                var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><video src='"+vediourl+"' id="+vediono+" width="+320+" height="+240+" controls autobuffer poster></video><i class='icon ion-close-circled' ></i></div>";
                                $("#addPhotos").before(vedioDom);
                                $("#div_"+vediono).find("i").bind("click",function(){
                                   $scope.delVedio(vediono);
                                });
                            }else{
                                $rootScope.hideLoading();
                                $rootScope.mttAlert(response.content);
                            }
                        },error: function (response) {
                            $rootScope.hideLoading();
                            $rootScope.mttAlert(PUBLIC_OPER_ERROR);
                            }
                        });
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

	/**
	 * 意见反馈app端视频上传
	 */
	$scope.yjfkVideoUp = function(audioData) {
		$rootScope.showLoading("请稍后,上传中……");
		var videoList = new Array();
		var audioObj ={videoData:audioData};
		videoList.push(audioObj);

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
		              var the_file = new Blob([e.target.result ], { type: "video/mp4" } );
		              formData.append("file", the_file,"video.mp4");
                      //formData.append("videoList", videoList);
                      formData.append("yjfkid", yjfkid);
                      formData.append("baseurlPath", baseurl);
                      formData.append("mediatype", mediatype);
                         //以下是表单参数
                         $.ajax({
                            url: baseurl+ "/appVideo/uploadMediaApp",
                            type: 'POST',
                            data: formData,
                            processData: false,
                            contentType: false,
                            success: function (response) {
                            $rootScope.hideLoading();
                                if(response.type=="success"){
	                                $rootScope.hideLoading();
	                                var vediono = response.content.videoNo;
	                                var vediourl = response.content.videoUrl;
	                                var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><video src='"+vediourl+"' id="+vediono+" width="+320+" height="+240+" controls autobuffer poster></video><i class='icon ion-close-circled' ></i></div>";
	                                $("#addPhotos").before(vedioDom);
	                                $("#div_"+vediono).find("i").bind("click",function(){
                                       $scope.delVedio(vediono);
                                    });
                                }else{
	                                $rootScope.hideLoading();
	                                $rootScope.mttAlert(response.content);
                                }
                            },error: function (response) {
                                $rootScope.hideLoading();
                                $rootScope.mttAlert(PUBLIC_OPER_ERROR);
                                }
                            });
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
	}	

	
   //录制视频-WEB端		
	$scope.videoCaptu_WEB = function(curObj) {
		console.log("进入web端录制视频");
		var inputId = curObj.attributes.id.value;
	    var files = event.target.files;
	    if (files && files.length > 0) {
	        var fileReader = new FileReader();
	        fileReader.readAsDataURL(files[0]);
	        fileReader.onload = function(e) {
	          var base64Video = e.target.result;//后台处理数据data:video/mp4;base64,xxx 
	          var videoList = new Array();
	    	  var videoObj ={base64Data:base64Video};
	    	  videoList.push(videoObj);
	            var requestBody = {videoList:videoList,yjfkid:yjfkid+"",baseVideoShowUrlPath:baseurl,mediatype:mediatype+""};
	    		MyFactoryNew.getHttpRequest( baseurl + '/appVideo/uploadVideoweb', 'POST', null, requestBody,"请稍后,上传中……").then(function (data) {
	    			if(data && data.type && data.type=="success" && data.content){
	    				var vediono = data.content;
	    				var vedioDom = "<div class='pic-item' id='div_"+vediono+"'><video src='"+base64Video+"' id="+vediono+" width="+320+" height="+240+" controls autobuffer poster></video><i class='icon ion-close-circled' ></i></div>";
	    				$("#addPhotos").before(vedioDom);
	    				$("#div_"+vediono).find("i").bind("click",function(){
	    					$scope.delVedio(vediono);
	    				});
	    			}else if(data && data.type && data.type=="error"){
	    				$rootScope.mttAlert(data.content);
	    			}else{
	    				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
	    			}
	    		})
	        }
	    } 
	    
	}
	
	$scope.delVedio = function(vediono) {
		var requestBody = {vediono:vediono};
		MyFactoryNew.getHttpRequest(baseurl + '/appVideo/deleteVideo', 'POST', null, requestBody,"请稍后,删除中……").then(function (data) {
			if(data && data.type && data.type=="success"){
				$rootScope.mttAlert("删除成功！");
				$("#div_"+vediono).remove();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
        })
    };
	
})

/**
 * 意见回复
 */
.controller('yjhfyhController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	
	var id = $stateParams.id;
	
	$scope.goEdit = function(){
		$rootScope.if_oper = false;
		$rootScope.titleName = "查看图片";
		$state.go('yjfk_editPics',{id:id,backURL:'yjhf_yh'});
	}
	$scope.goEditVoice = function(){
		$rootScope.if_oper = false;
		var if_oper = false;
		$rootScope.titleName = "查看语音";
		$state.go('yjfk_editVoice',{id:id,if_oper:if_oper,backURL:'yjhf_yh'});
	}
	$scope.goEditVideo = function(){
		$rootScope.if_oper = false;
		var if_oper = false;
		$rootScope.titleName = "查看视频";
		$state.go('yjfk_editVideo',{id:id,if_oper:if_oper,backURL:'yjhf_yh'});
	}
	
	var getAppYjhf = function(){
		var requestBody = {_module:'TT',_method:'queryAppYjfk',id:id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ASKDATE = data.content.ASKDATE;
				$scope.ASKDESC = data.content.ASKDESC;
				$scope.ISANS = data.content.ISANS;
				$scope.ID = data.content.ID;
				$scope.ANSDATE = data.content.ANSDATE;
				$scope.ANSDESC = data.content.ANSDESC;
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
	getAppYjhf();
	
	
})

/**
 * 管理员-用户意见
 */
.controller('yhyjglyListController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){

	var listName = "yhyjList";
	
	//刷新
 	$scope.doRefresh= function(ifFromPullRefresh) {
 		var requestBody = {_module:'TT',_method:'getYhyjListByPage',askAppCzz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,true,ifFromPullRefresh);
 	}
 	
 	//加载更多
 	$scope.loadMore= function() {
 		var requestBody = {_module:'TT',_method:'getYhyjListByPage',askAppCzz:g_getLoginPhoneno()};
 		MyFactoryNew.loadMore('/bitsroad/queryPageJsonWithRB',requestBody,listName,false);
 	}
     
    $scope.doRefresh(false);
    
    $scope.xx = function(id){
    	$state.go('yhyjjd_gly',{id:id});
    }
	
})

/**
 * 管理员-用户意见解答
 */
.controller('yhyjjdController',function($rootScope,$scope,$http,$state,$stateParams,$ionicPopup,$interval,MyFactoryNew){
	
	var id = $stateParams.id;
	
	var isDisabled = function(){
		if($scope.ISANS == 1){
			$("#gly_ansdesc").attr("disabled","disabled");
		}else{
			$("#gly_ansdesc").removeAttr("disabled");
		}
	}
	
	$scope.goEdit = function(){
		$rootScope.if_oper = false;
		$rootScope.titleName = "查看图片";
		$state.go('yjfk_editPics',{id:id,backURL:'yhyjjd_gly'});
	}
	$scope.goEditVideo = function(){
		$rootScope.if_oper = false;
		var if_oper = false;
		$rootScope.titleName = "查看视频";
		$state.go('yjfk_editVideo',{id:id,if_oper:if_oper,backURL:'yhyjjd_gly'});
	}
	$scope.goEditVoice = function(){
		$rootScope.if_oper = false;
		var if_oper = false;
		$rootScope.titleName = "查看语音";
		$state.go('yjfk_editVoice',{id:id,if_oper:if_oper,backURL:'yhyjjd_gly'});
	}
	var getAppYjhf = function(){
		var requestBody = {_module:'TT',_method:'queryAppYjfk',id:id};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ASKDATE = data.content.ASKDATE;
				$scope.ASKDESC = data.content.ASKDESC;
				$scope.ISANS = data.content.ISANS;
				$scope.ID = data.content.ID;
				$scope.ANSDATE = data.content.ANSDATE;
				$("#gly_ansdesc").val(data.content.ANSDESC);
				isDisabled();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
	getAppYjhf();
	
	$scope.answer = function(){
		var ansDesc = $("#gly_ansdesc").val();
		if(!ansDesc){
			$rootScope.mttAlert("意见解答内容不能为空!");
			return false;
		}
		var requestBody = {_module:'TT',_method:'answerAppYhyj',id:id,ansDesc:ansDesc,ansAppCzz:g_getLoginPhoneno()};
		MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
			if(data && data.type && data.type=="success"){
				$scope.ANSDATE = data.content.ANSDATE;
				$scope.ISANS = data.content.ISANS;
				if(ansDesc == data.content.ANSDESC){
					$rootScope.mttAlert("解答成功！");
				}else{
					$("#gly_ansdesc").val(data.content.ANSDESC);
					$rootScope.mttAlert("已被其他管理员解答，不可重复解答！");
				}
				isDisabled();
			}else if(data && data.type && data.type=="error"){
				$rootScope.mttAlert(data.content);
			}else{
				$rootScope.mttAlert(PUBLIC_OPER_ERROR);
			}
		})
	}
	
})