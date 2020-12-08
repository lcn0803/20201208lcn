var rentOutData = {};

angular.module('Controllers', ['ionic', 'highcharts-ng', 'ngCordova', 'factorys'])

	
	.controller('IndexController', function($scope, $state, $http, $ionicSideMenuDelegate, $ionicModal, $cordovaBarcodeScanner, testFactory) {
//		window.location.reload();
		$scope.toggle = function() {
			$ionicSideMenuDelegate.toggleLeft();
		};
		$ionicModal.fromTemplateUrl('templates/modal1.html', {
			scope: $scope
		}).then(function(modal1) {
			$scope.modal1 = modal1;
		});

		//加载图表
		$scope.detailChartConfig = {

			chart: {
				renderTo: 'chart_spline', //图表放置的容器，DIV
				margin: null,
				height: 100,
				width: 300,
				defaultSeriesType: 'spline', //图表类型为曲线图
				//				events: {
				//					load: function() {
				//						var series = this.series[0];
				//						//每隔5秒钟，图表更新一次，y数据值在0-100之间的随机数
				//						setInterval(function() {
				//								var x = (new Date()).getTime(), // 当前时间
				//									y = Math.random() * 500 + 1800;
				//								series.addPoint([x, y], true, true);
				//							},
				//							10000);
				//					}
				//				}
			},
			title: {
				text: '' //图表标题 房屋租金走势
			},
			xAxis: { //设置X轴
				type: 'datetime', //X轴为日期时间类型
				tickPixelInterval: 150 //X轴标签间隔
			},
			yAxis: { //设置Y轴
				title: '',
				max: 2400, //Y轴最大值
				min: 1800 //Y轴最小值
			},
			tooltip: { //当鼠标悬置数据点时的提示框
				formatter: function() { //格式化提示信息
					return '房屋租金价格详情' +
						Highcharts.dateFormat('%H:%M:%S', this.x) + '' +
						Highcharts.numberFormat(this.y, 2) + '%';
				}
			},
			legend: {
				enabled: false, //设置图例不可见

			},
			exporting: {
				enabled: false //设置导出按钮不可用
			},
			credits: {
				text: 'BIT SERVICE', //设置LOGO区文字
				//url: 'http://www.helloweba.com' //设置LOGO链接地址
			},

			series: [{
				data: (function() { //设置默认数据，
					var data = [],
						time = (new Date()).getTime(),
						i;

					for(i = -8; i <= 0; i++) {
						data.push({
							x: time + i * 5000,
							y: Math.random() * 500 + 1800,
						});
					}
					return data;
				})()
			}]

		};

		//二维码
		//		$scope.logtext = "";
		$scope.BarcodeScanner = function() {

			$cordovaBarcodeScanner
				.scan()
				.then(function(barcodeData) {
					//					$scope.logtext = $scope.logtext + "扫描数据：" + barcodeData.text + "\n";
					// Success! Barcode data is here
				}, function(error) {
					// An error occurred
				});

		};

		//我要出租  发布房源  http://47.94.80.177:8080/ui//
		//http://localhost:8082/appissroom/getactid
		$scope.rentOutActive = function() {
//			window.localStorage.clear();
			var token =window.localStorage.getItem("token");
			$state.go('rentOut');
//			if(token){
//				$state.go('rentOut');
//			}else{
//				alert("您需要先登录！");
//				$state.go('login');
//			}

			/*$http({
				method: 'POST',
				url: 'http://47.94.80.177:8080/ui//appissroom/getactid',
				languageColumn: 'name_eu'
			}).success(function(data) {
				console.info(data.acid);*/
			/*	$state.go('rentOut', {
					data: data*/
			/*});*/
			/*})*/
		};

		//我的租金
		$scope.rentMoney=function(){
			var token =window.localStorage.getItem("token");
			if(token){
				$state.go('rentMoney');
			}else{
				alert("您需要先登录！");
				$state.go('login');
			}
		};
		//网签
			$scope.wangqian_one=function(){
			var token =window.localStorage.getItem("token");
			if(token){
				$state.go('wangqian-one');
			}else{
				alert("您需要先登录！");
				$state.go('login');
			}
		};


	})
	//登录
	.controller('LoginController', function($scope, $http, $state,$window) {
		$scope.account = "";
		$scope.password = "";

		$scope.getLogin = function() {
			account = $scope.account;
			password = $scope.password;

//			console.info('http://localhost:8082/applogin/loginsystem1?account=' + account + '&password=' + password);
			if(account == "" || account == "用户名为空") {
				$scope.account = "用户名为空";
				return;
			};
			//alert($scope.account);
			if(password == "" || password == "密码为空") {
				$scope.password = "密码为空";
				return;
			};

			//url: 'http://47.94.80.177:8080/ui/applogin/loginsystem1?account=' + account + '&password=' + password,

			$http({
				method: 'GET',
				url: 'http://192.168.3.176:8082/applogin/loginsystem1?account=' + account + '&password=' + password,
				languageColumn: "name_eu",

			}).success(function(data) {
				console.info(data);
				if(data) {
					alert("登陆成功");
				window.localStorage.setItem("token", data.id);
				// 调用Jpush设置别名
				var token = window.localStorage.getItem("token");
//				 $window.plugins.jPushPlugin.setTagsWithAlias(null,token);wo
				alert(token);
//				
				window.location.href="index.html";
//				window.location.reload();

				}
				//				if(data.type == "error")
				else {
					//$rootScope.$state.reload('login');
					//					alert(data);
					console.log(data);
					alert("登陆失败");
					$state.reload('login')
				}

			})
		};
	})
	
	

	//注册
	.controller('RegisterController', function($scope, $http, $state, $interval) {
		$scope.name = "";
		$scope.idcardno = "";
		$scope.phoneno = "";
		$scope.dxyzm = "";
		$scope.password = "";
//		我要出租
		//$scope.qr_password = "";
		//获取验证码
		$scope.yzmcontent = "获取验证码";
		$scope.getYZM = function() {

			phoneno = $scope.phoneno;
			if(phoneno == "" || phoneno == "手机号不能为空") {
				//手机号不能为空
				$scope.phoneno = "手机号不能为空";
				//alert($scope.phoneno);
				return;
			};

			if($scope.yzmclass == "not but_null") {
				return;
			}
			//alert(1111);
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
			//alert($scope.yzmcontent);

			$http({
				method: 'GET',
				url: 'http://192.168.3.176:8082/applogin/sendPhoneCode?phone=' + phoneno,
				languageColumn: "name_eu",
			}).success(function(data) {
				console.info(data);
				//alert(data.type);
				//alert(data.content);
			})

		};

		$scope.getRegister = function() {
			name = $scope.name;
			idcardno = $scope.idcardno;
			phoneno = $scope.phoneno;
			password = $scope.password;
			dxyzm = $scope.dxyzm;

			console.info('http://47.94.80.177:8080/ui/applogin/register?name=' + name + '&idcardno=' + idcardno + '&phoneno=' + phoneno + '&password=' + password + '&dxyzm=' + dxyzm);

			$http({
				method: 'GET',
				url: 'http://192.168.3.176:8082/applogin/register?name=' + name + '&idcardno=' + idcardno + '&phoneno=' + phoneno + '&password=' + password + '&dxyzm=' + dxyzm,
				languageColumn: "name_eu_lh",

			}).success(function(data) {
				if(data.type == "success") {
					console.info(data);
					$state.go('login');
				}
				if(data.type == "error") {
					alert("注册失败  "+data)
					$state.reload('register');
				}

			})

		};
	})

	//我要出租
	//var data={};
	.controller('RentOutController', function($cacheFactory, $scope, $state, $http, $stateParams, testFactory) {

		$scope.data = $stateParams.data;
		rentOutData.acid = $stateParams.data.acid;
		testFactory.get();
		/*console.info($stateParams.data);*/
		//回显示视频
		if(angular.isDefined($stateParams.data.video)) {

			video = $stateParams.data.video;
			rentOutData.video = video;
			//cache.put("video", video);
			if(video.length > 0) {
				var video = document.getElementById("videoId");
				video.src = video[0];
				//alert(data.video[0]);
				document.getElementById("shipingId").removeAttribute("class");
			}

		}
		//回显示图片
		if(angular.isDefined($stateParams.data.img)) {

			img = $stateParams.data.img;
			rentOutData.img = img;
			//cache.put("img", img)
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
			//console.info(data.info.name);
			person = $stateParams.data.person;
			rentOutData.person = person;
			if(person != null) {
				$scope.info = person.name;
				document.getElementById("infoId").removeAttribute("class");
			}

		}

		$scope.saveRentHouseInfo = {

		};
		//装修标准	fitmentdesc

		$scope.getDecoration = function() {
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
			fitmentdesc = t.textContent;
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
			fitmentdesc = t.textContent;
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
			fitmentdesc = t.textContent;
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
			fitmentdesc = t.textContent;
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
			fitmentdesc = t.textContent;
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
			fitmentdesc = t.textContent;
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

			$scope.saveRentHouseInfo.fangyuan = t.innerHTML;
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
			$scope.saveRentHouseInfo.fangyuan = t.innerHTML;
			/*	t.removeAttribute("class");*/
			issueclass = t.textContent;
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
			$scope.saveRentHouseInfo.fangyuan = x.innerHTML;
			issueclass = t.textContent;
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
			$scope.saveRentHouseInfo.fangyuan = p.innerHTML;

			/*	t.removeAttribute("class");*/
			issueclass = t.textContent;
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
			$scope.saveRentHouseInfo.fangyuan = d.innerHTML;
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

		//		$scope.$watch('$viewContentLoaded', function() {
		//
		//			$http({
		//				method: 'GET',
		//				url: 'http://47.94.80.177:8080/ui//appissroom/getactid',
		//				languageColumn: "name_eu",
		//
		//			}).success(function(data) {
		//
		//			})
		//		});

		//发布房源数据结构

		//发布房源   

		$scope.getRentHouseInfo = function() {
			city = $scope.saveRentHouseInfo.city;
			district = $scope.saveRentHouseInfo.district;
			street = $scope.saveRentHouseInfo.street;
			doorno = $scope.saveRentHouseInfo.doorno;
			roomLocation = city + district + street + doorno;
			//console.info(issueclass + "**" + $scope.houseStyle); //房源
			console.info($scope.saveRentHouseInfo); //位置

			data = {
				"acid": rentOutData.acid,
				"houseclassify": null,
				"bldroom": {
					"id": null,
					"startfloor": $scope.saveRentHouseInfo.startfloor,
					"endfloor": $scope.saveRentHouseInfo.floortotal,
					"location": roomLocation,
					"roomtype": $scope.houseStyle.name,
					"buildarea": $scope.saveRentHouseInfo.buildarea,
					"setarea": $scope.saveRentHouseInfo.usearea,
				},
				"building": {
					"id": null,
					"projectname": "null",
				},
				"issueroom": {
					"id": null,
					"bldroomid": null,
					"monthprice": $scope.saveRentHouseInfo.monthprice,
					"issueclass": $scope.saveRentHouseInfo.fangyuan,
					"description": $scope.saveRentHouseInfo.location,
				},
				"person": rentOutData.person,
			};

			dataobj = {
				"acid": 20170830622,
				"personid": "111",
				"district": 115555,
				"street": "1111",
				"doorno": "1111",
				"buildno": "333",
				"startfloor": 3,
				"location": "er",
				"buildarea": 33333,
				"rentuse": "34",
				"rentpart": "34",
				"monthprice": 2000,
				"enddatestr": "2017-09-13",
			};
			data1 = {
				"acid": 70170819001,
				"houseclassify": null,
				"bldroom": {
					"id": null,
					"buildid": null,
					"djdydm": null,
					"roomcode": null,
					"startfloor": 12,
					"endfloor": null,
					"nominalfloor": null,
					"buildunit": null,
					"part": null,
					"location": "丽都路六号",
					"buildstructure": null,
					"usage": null,
					"bustype": null,
					"roomtype": null,
					"structure": null,
					"buildarea": null,
					"setarea": null,
					"publicarea": null,
					"underarea": null,
					"otherarea": null,
					"type": null,
					"orientations": null,
					"roomnum": null,
					"qiuquanhao": null,
					"description": null,
					"datasource": null,
					"busstatus": null,
					"restatus": null,
					"dpid": null,
					"ipid": null
				},
				"building": {
					"id": null,
					"projectname": "工程",
					"district": null,
					"street": null,
					"doorno": null,
					"buildno": null,
					"location": null,
					"buildarea": null,
					"floors": null,
					"overfloors": null,
					"underfloors": null,
					"overarea": null,
					"underarea": null,
					"buildyear": null,
					"bustype": null,
					"description": null,
					"datasource": null,
					"busstatus": null,
					"restatus": null,
					"dpid": null,
					"ipid": null
				},
				"issueroom": {
					"id": null,
					"bldroomid": null,
					"rentuse": null,
					"rentpart": null,
					"rentarea": null,
					"renttype": null,
					"nearroaddesc": null,
					"fitmentdesc": null,
					"monthprice": 2500.0,
					"caclmethod": null,
					"foregiftamount": null,
					"paytype": null,
					"realownername": null,
					"realowneridtype": null,
					"realowneridno": null,
					"prorightnature": null,
					"prorightname": null,
					"prorightno": null,
					"prorightphono": null,
					"issueclass": null,
					"roomnum": null,
					"enddate": 1504454862547,
					"enddatestr": "2017-09-04",
					"bitspno": null,
					"issuedate": null,
					"checkrightresult": null,
					"roomstatus": null,
					"description": null
				},
				"person": {
					"id": 5,
					"dwxh": null,
					"name": null,
					"sex": null,
					"account": null,
					"password": null,
					"canlogin": null,
					"yshpbh": null,
					"seq": null,
					"createtime": null,
					"createuser": null,
					"code": null,
					"category": null,
					"idcard": null,
					"idcardno": null,
					"registplace": null,
					"address": null,
					"postcode": null,
					"phoneno": null,
					"email": null,
					"qq": null,
					"wx": null,
					"nationality": null,
					"nation": null,
					"education": null,
					"duties": null,
					"positional": null,
					"shm": null,
					"sjy": null,
					"djzt": null,
					"zyzt": null,
					"bzxjl": null,
					"zxjl": null,
					"zyzglx": null,
					"zgzbh": null,
					"sfgly": null
				}
			}

			data2 = angular.fromJson(data1);
			//保存房源
			$http({
				method: 'GET',
				url: 'http://localhost:8082/appissroom/getactid',
				languageColumn: "name_eu",


			}).success(function(data) {
				console.info("成功" + data);
			}).error(function(data) {
				console.info("错误：" + data);
			})

			//保存图片

		};

		$scope.addPhotos = function() {
			//alert(1212);
			$state.go('rentOut-img');
		};

		$scope.addVideo = function() {
			alert("www");
//			var videoId = document.getElementById("videoId");
//			videoId.style.visibility = "visible";

			$http({
					method: 'GET',
					url: 'http://localhost:8082/appissroom/getactid',
					languageColumn: "name_eu",

				}).success(function(data) {
					alert(data.acid);
//					$state.go('rentOut-video');
				})

		};

	})
	//日期组件
	.controller('TimeController', function($scope) {
		alert('888');

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
				console.log('Selected date is : ', val);
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

		console.info($scope.datepickerObject);

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
				alert(date);
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
	.controller("rentMoneyController", function($scope, ionicDatePicker, ionicTimePicker) {

		//日期
		var ipObj1 = {
			callback: function(val) {
				console.log('点击事件返回值 : ' + val, new Date(val));
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

	.controller("khbjIndexController", function($scope, $state, dateService) {

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

	.controller('RentOut_infoController', function($scope, $http, $state, $cordovaCamera, $interval, testFactory) {

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
				targetWidth: 200,
				targetHeight: 200,
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
				targetWidth: 200,
				targetHeight: 200,
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
				targetWidth: 200,
				targetHeight: 200,
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
			console.info(angular.isDefined(info));
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

	.controller('RentOut-imgController', function($scope, $cordovaCamera, $state, testFactory) {

		var img = new Array();

		$scope.takephoto = function() {
			//$cordovaCamera
			var options = {
				quality: 50,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				allowEdit: true,
				encodingType: Camera.EncodingType.JPEG,
				targetWidth: 200,
				targetHeight: 200,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('myImage');
				image.src = "data:image/jpeg;base64," + imageData;
				alert(image.src)
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
				targetWidth: 200,
				targetHeight: 200,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('eatingHouse');
				image.src = "data:image/jpeg;base64," + imageData;
				alert(image.src);
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
				targetWidth: 200,
				targetHeight: 200,
				popoverOptions: CameraPopoverOptions,
				saveToPhotoAlbum: false,
				correctOrientation: true
			};

			$cordovaCamera.getPicture(options).then(function(imageData) {
				var image = document.getElementById('wc');
				image.src = "data:image/jpeg;base64," + imageData;
				/*imgdata = "data:image/jpeg;base64," + imageData;
				img.push(imgdata);*/
				document.getElementById("wcId").removeAttribute("class");
			}, function(err) {
				// error
			});

		};
		img.push("LH");
		img.push("QOP");
		img.push("LH11");

		$scope.addImg = function() {
			//data.img = angular.add(cfimg, ktimg, wsjimg, osimg);
			//angular.add();
			var data = {};
			data.img = img;
			//data = angular.toJson(data);
			testFactory.set(data);
			$state.go('rentOut', {
				data: data
			});

		};

	})

	.controller('RentOutVideoController', function($scope, $state, $cordovaCamera, $cordovaBarcodeScanner, $cordovaCapture) {

		var video = new Array();

		$scope.videoCapture = function() {
			alert(121);
			var options = {
				limit: 1,
				duration: 10
			};

			$cordovaCapture.captureVideo(options).then(function(audioData) {
				var i, path, len;
				for(i = 0, len = audioData.length; i < len; i += 1) {
					console.log(audioData);
					path = audioData[i].fullPath;
					alert("录制成功！\n\n" +
						"文件名：" + audioData[i].name + "\n" +
						"大小：" + audioData[i].size + "\n\n" +
						"localURL地址：" + audioData[i].localURL + "\n\n" +
						"fullPath地址：" + path);
				}
				var b = document.getElementById("videoId");
				b.style.display = "block";

				b.src = path;
				alert(b.src);
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
					console.log(audioData);
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
					console.log(audioData);
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
		video.push("df");
		video.push("kk");
		var data = {};
		data.video = video;
		//data = angular.toJson(data);

		$scope.confirm = function() {

			$state.go('rentOut', {
				data: data
			});
		};

	})

	//我要租房
	.controller('rentHouseController', function($scope, $ionicHistory, $state,$http) {

		$scope.goback = function() {
			console.info($ionicHistory);
			aa = $ionicHistory.backView();
			console.info(aa);
			//$ionicHistory.goback();
			//aa.go();
			$ionicHistory.goBack();
		}

      $scope.$watch('$viewContentLoaded', function() {
      	alert("我要租房");
   	$http({
   		method: 'GET',
   		url: 'http://localhost:8082/gridController/getAllGridData?_code=2017090308',
   		languageColumn: "name_eu"
   	}).success(function(data) {
   		alert("-------放行----");
   		console.log(data);

   	})
   });

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

		$scope.rentHouseDetail = function() {
			$state.go('rentHouse-detail')
		}

	})

	.controller('rentHouseShaixuanController', function($scope) {

	})

	.controller('rentHouseDetailController', function($scope,$state,$http) {
		$scope.myActiveSlide = 1;
		$scope.wanthouse=function(){
			var token =window.localStorage.getItem("token");
			if(token){
				alert("我要租");
				$http({
					method:"GET",
					url:"http://192.168.3.176:8082/Jpush/sendJpushMsg?token="+token
				})
			}else{
				$state.go('login');
			}
		}

	})

	.controller('hetongListController', function($scope, $state) {

		$scope.queren = function() {
			$state.go('queren');
		}
	})
	
	.config(function($httpProvider) {
		var token =window.localStorage.getItem("token");
		alert("token:"+token);
//		window.localStorage.clear();

			$httpProvider.defaults.headers.common = {
        'token': token
      }
	})
	

	

