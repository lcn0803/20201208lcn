//Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ionic-datepicker', 'ionic-timepicker', 'oc.lazyLoad', 'Controllers', 'factorys', 'services', 'controller_spfjyba',
                           'controller_ygspfdyba', 'controller_publicModules', 'controller_wdyy', 'controller_clfjyba','controller_ybdyba','controller_zgedyba','controller_yshtba',
                           'backKey','services-2.0','controller_org','controller_clfwq','controller_yjfk','controller_ysxjxj',
                           'controller_ygspfdywq','controller_ybdywq','controller_zgedywq','controller_xsba','controller_lpgl',
                           'controller_dwzc','controller_zxgl','controller_zjgcdywq','controller_zjgcdyba','controller_htmbgl','controller_fyhy','controller_spqfmmwq',
                           'controller_spxfmmwq','controller_lpbcx','controller_ywwh','controller_jtdacx','controller_bbcx',
                           'controller_yhsk','controller_yhfk','controller_lwbgdw','controller_ywsp','WeChat_JSSDK',
                           'controller_pzspqx'])

	.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ocLazyLoadProvider, ionicDatePickerProvider) {

		$ionicConfigProvider.views.maxCache(0);
		//配置android平台的缓存
		$ionicConfigProvider.platform.android.views.maxCache(0);
		//		$ionicConfigProvider.views.maxCache(0);
		//		//配置android平台的缓存
		//		$ionicConfigProvider.platform.android.views.maxCache(0);
		//
		//		// note that you can also chain configs
		//		$ionicConfigProvider.backButton.text('返回').icon("ion-chevron-left");
		//
		//		$ionicConfigProvider.navBar.alignTitle("center");
		//		$ionicConfigProvider.tabs.position("bottom");
		//		$ionicConfigProvider.tabs.style("standard");
		//		$ionicConfigProvider.form.toggle("large");

		$urlRouterProvider.otherwise('/index');

		$stateProvider
			.state('index', {

				url: '/index',
				templateUrl: 'htm/indexlh.html',
				controller: 'IndexController',
			

			})

			//TODO===================================================公共
			
			//其他系统URL接入
			.state('otherSystemAccess', {
				url: '/otherSystemAccess',
				controller:'otherSystemAccessController',
			})	
			
			//冀时办URL接入
			.state('jsbSystemAccess', {
				url: '/jsbSystemAccess',
				controller:'jsbSystemAccessController',
			})
			
			//在线咨询
			.state('zxzx',{
				backKey_fixed: 'index',
				url:'/zxzx',
				templateUrl:'htm/zxzx/zxzx.html',
				controller:'zxzxController',
			})
			
			//二维码展示
			.state('showQRCode', {
				backKey_complicated: 'true',
				url: '/showQRCode',
				templateUrl: 'htm/public/showQRCode.html'
			})
			
			//业务详细maps展示、保存
			.state('ywDetailMaps', {
				backKey_complicated: 'true',
				url: '/ywDetailMaps',
				templateUrl: 'htm/public/ywDetailMaps.html',
				controller:'ywDetailMapsController',
				params:{
					'id':{},
					'backURL':{},
					'sortid':{}
				}
			})
			
			//手机端收缴证件编辑/查看
			.state('editPics', {
				backKey_complicated: 'true',
				url: '/editPics',
				templateUrl: 'htm/public/editPics.html',
				controller:'publicEditPicsController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//楼盘表;入口1.业务编号为数据源；入口2.楼栋编号为数据源。
			.state('lpb', {
				backKey_complicated: 'true',
				url: '/lpb',
				templateUrl: 'htm/public/loupanbiao.html',
				controller:'publicLpbController',
				params:{
					'id':"",
					'ldid':"",
					'backURL':{},
					'if_oper_room':{},
					'init_show_qfxf':{}
				}
			})
			
			//人工实名认证
			.state('rgsmrz',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/rgsmrz',
				templateUrl:'htm/rgsmrz/rgsmrz.html',
				controller:'rgsmrzController',
			})
			
			//扫一扫
			.state('scanEWM',{
				backKey_fixed: 'index',
				url:'/scanEWM',
				templateUrl:'htm/scanEWM/scanEWM.html',
				controller:'scanEWMController',
			})
			
			//隐私政策
			.state('yinsizhengce',{
				backKey_fixed: 'index',
				url:'/yinsizhengce',
				templateUrl:'htm/yinsizhengce/yinsizhengce.html',
			})
			
			//签名
			.state('qianMing', {
				backKey_complicated: 'true',
				url: '/qianMing',
				templateUrl: 'htm/public/qianMing.html',
				controller:'qianMingController',
				params:{
					'baseactivityid':{},
					'realtypeid':{},
					'bastatus':{},
					'ywbh':{},
					'if_qianzi':{},
					'flbhs':{}
				}
			})			
			
			//微信跳转外部的中间界面
			.state('WeChatToOutTemp',{
				url:'/WeChatToOutTemp',
				templateUrl:'htm/public/WeChatToOutTemp.html',
				controller:'WeChatToOutTempController',
				params:{
					'outUrl':{}
				}
			})
			
			//债务人详细信息
			.state('pubZwrxx', {
				backKey_complicated: 'true',
				url: '/pubZwrxx',
				templateUrl: 'htm/public/pubZwrxx.html',
				controller: 'pubZwrxxListController',
				params:{
					'id':'',
					'qlrxh':'',
					'dwgr':'',
					'backURL':'',
					'if_cz':''
				}
			})
			//TODO===================================================公共

			//TODO===================================================业务维护-模块区域
			
			//业务维护-业务列表
			.state('ywwh_list',{
				backKey_fixed:'house_jiaoyi',
				url:'/ywwh_list',
				templateUrl:'htm/ywwh/ywwh_list.html',
				controller:'ywwhListController'
			})
			
			//TODO===================================================业务审批-模块区域
			
			//业务审批
			.state('ywsp_list',{
				backKey_complicated: 'true',
				url:'/ywsp_list',
				templateUrl:'htm/ywsp/ywsp_list.html',
				controller:'ywspListController',
				params:{
					'baseactivityid':''
				}
			})
			
			//TODO===================================================配置审批权限-模块区域
			
			//业务审批员
			.state('ywspy',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/ywspy',
				templateUrl:'htm/pzspqx/ywspy.html',
				controller:'ywspyController'
			})
			
			//审批员与业务信息
			.state('spyhyw',{
				backKey_fixed: 'ywspy',
				url:'/spyhyw',
				templateUrl:'htm/pzspqx/spyhyw.html',
				controller:'spyhywController'
			})
			
			//审批员,业务信息与步骤
			.state('spyhywhbz',{
				backKey_fixed: 'spyhyw',
				url:'/spyhywhbz',
				templateUrl:'htm/pzspqx/spyhywhbz.html',
				controller:'spyhywhbzController'
			})
			
			//TODO===================================================报表查询			
			
			//报表查询
			.state('bbcx',{
				backKey_fixed:'index',
				url:'/bbcx',
				templateUrl:'htm/bbcx/bbcx.html',
			})
			
			//住建部日报报表
			.state('zjbrbbb',{
				backKey_fixed:'bbcx',
				url:'/zjbrbbb',
				templateUrl:'htm/bbcx/list_zjbrbbb.html',
				controller:'bbcxZjbrbbbController'
			})
			
			//住建部月报报表
			.state('zjbybbb',{
				backKey_fixed:'bbcx',
				url:'/zjbybbb',
				templateUrl:'htm/bbcx/list_zjbybbb.html',
				controller:'bbcxZjbybbbController'
			})
			
			//住建部日报月表
			.state('zjbrbyb',{
				backKey_fixed:'bbcx',
				url:'/zjbrbyb',
				templateUrl:'htm/bbcx/list_zjbrbyb.html',
				controller:'bbcxZjbrbybController'
			})
			
			//住建部日报各区县月表
			.state('zjbrbgqxyb',{
				backKey_fixed:'bbcx',
				url:'/zjbrbgqxyb',
				templateUrl:'htm/bbcx/list_zjbrbgqxyb.html',
				controller:'bbcxZjbrbgqxybController'
			})			
			
			//住建部月报年表
			.state('zjbybnb',{
				backKey_fixed:'bbcx',
				url:'/zjbybnb',
				templateUrl:'htm/bbcx/list_zjbybnb.html',
				controller:'bbcxZjbybnbController'
			})
			
			//区县日报报表
			.state('qxrbbb',{
				backKey_fixed:'bbcx',
				url:'/qxrbbb',
				templateUrl:'htm/bbcx/list_qxrbbb.html',
				controller:'bbcxQxrbbbController'
			})			
			
			//区县月报报表
			.state('qxybbb',{
				backKey_fixed:'bbcx',
				url:'/qxybbb',
				templateUrl:'htm/bbcx/list_qxybbb.html',
				controller:'bbcxQxybbbController'
			})
			
			//主城区及区县日报月表
			.state('zcqjqxrbyb',{
				backKey_fixed:'bbcx',
				url:'/zcqjqxrbyb',
				templateUrl:'htm/bbcx/list_zcqjqxrbyb.html',
				controller:'bbcxZcqjqxrbybController'
			})
			
			//主城区及区县日报报表
			.state('zcqjqxrbbb',{
				backKey_fixed:'bbcx',
				url:'/zcqjqxrbbb',
				templateUrl:'htm/bbcx/list_zcqjqxrbbb.html',
				controller:'bbcxZcqjqxrbbbController'
			})
			
			//TODO===================================================新单位注册-模块区域
			
			//模块菜单
			.state('dwzc',{
				backKey_fixed:'house_bangongdanwei',
				url:'/dwzc',
				templateUrl:'htm/dwzc/dwzc.html',
				controller:'dwzcmkcdController'
			})
			
			//业务新建
			.state('dwzc_ywxj_detail',{
				backKey_fixed: 'dwzc',
				url:'/dwzc',
				templateUrl:'htm/dwzc/ywxj_detail.html',
				controller:'dwzxYwxjDetailController',
			})
			
			//单位注册-列表
			.state('dwzc_dwzc_list',{
				backKey_fixed:'dwzc',
				url:'/dwzc_dwzc_list',
				templateUrl:'htm/dwzc/dwzc_list.html',
				controller:'dwzcDwzcListController'
			})
			
			//单位注册-详细
			.state('dwzc_dwzc_detail',{
				backKey_fixed:'dwzc_dwzc_list',
				url:'/dwzc_dwzc_detail',
				templateUrl:'htm/dwzc/dwzc_detail.html',
				controller:'dwzcDwzcDetailController',
				params:{
					'id':{}
				}
			})	
			
			//TODO===================================================新单位注册-模块区域			
			
			//TODO===================================================现售备案-模块区域
			
			//模块菜单
			.state('xsba',{
				backKey_fixed:'house_shangpinfang',
				url:'/xsba',
				templateUrl:'htm/xsba/xsba.html',
			})
			
			//待选楼栋-列表
			.state('xsba_dxld_list',{
				backKey_complicated: 'true',
				backKey_when_fixed: 'xsba',
				url:'/xsba_dxld_list',
				templateUrl:'htm/xsba/dxld_list.html',
				controller:'xsbaDxldListController',
				params:{
					'id':{},
					'backURL':{},
					'if_glqf':{}
				}
			})
			
			//现售备案-列表
			.state('xsba_xsba_list',{
				backKey_fixed:'xsba',
				url:'/xsba_xsba_list',
				templateUrl:'htm/xsba/xsba_list.html',
				controller:'xsbaXsbaListController'
			})
			
			//现售备案-详细
			.state('xsba_xsba_detail',{
				backKey_fixed:'xsba_xsba_list',
				url:'/xsba_xsba_detail',
				templateUrl:'htm/xsba/xsba_detail.html',
				controller:'xsbaXsbaDetailController',
				params:{
					'id':{}
				}
			})	
			
			//TODO===================================================现售备案-模块区域				

			//TODO===================================================合同模板管理-模块区域
			
			//模块菜单
			.state('htmbgl',{
				backKey_fixed:'house_shangpinfang',
				url:'/htmbgl',
				templateUrl:'htm/htmbgl/htmbgl.html',
			})
			
			//待选楼栋-列表
			.state('htmbgl_dxld_list',{
				backKey_complicated: 'true',
				backKey_when_fixed: 'htmbgl',
				url:'/htmbgl_dxld_list',
				templateUrl:'htm/htmbgl/dxld_list.html',
				controller:'htmbglDxldListController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//合同模板管理-列表
			.state('htmbgl_mbgl_list',{
				backKey_fixed:'htmbgl',
				url:'/htmbgl_mbgl_list',
				templateUrl:'htm/htmbgl/mbgl_list.html',
				controller:'htmbglMbglListController'
			})
			
			//合同模板管理-详细
			.state('htmbgl_mbgl_detail',{
				backKey_fixed:'htmbgl_mbgl_list',
				url:'/htmbgl_mbgl_detail',
				templateUrl:'htm/htmbgl/mbgl_detail.html',
				controller:'htmbglMbglDetailController',
				params:{
					'id':{}
				}
			})	
			
			//TODO===================================================合同模板管理-模块区域			
			
			//TODO===================================================在建工程抵押网签-模块区域
			
			//模块菜单
			.state('zjgcdywq',{
				backKey_fixed:'house_diya',
				url:'/zjgcdywq',
				templateUrl:'htm/zjgcdywq/zjgcdywq.html',
			})
			
			//待选楼栋-列表
			.state('zjgcdywq_dxld_list',{
				backKey_complicated: 'true',
				backKey_when_fixed: 'zjgcdywq',
				url:'/zjgcdywq_dxld_list',
				templateUrl:'htm/zjgcdywq/dxld_list.html',
				controller:'zjgcdywqDxldListController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//在建工程抵押网签-列表
			.state('zjgcdywq_dywq_list',{
				backKey_fixed:'zjgcdywq',
				url:'/zjgcdywq_dywq_list',
				templateUrl:'htm/zjgcdywq/dywq_list.html',
				controller:'zjgcdywqDywqListController'
			})
			
			//在建工程抵押网签-详细
			.state('zjgcdywq_dywq_detail',{
				backKey_fixed:'zjgcdywq_dywq_list',
				url:'/zjgcdywq_dywq_detail',
				templateUrl:'htm/zjgcdywq/dywq_detail.html',
				controller:'zjgcdywqDywqDetailController',
				params:{
					'id':{}
				}
			})	
			
			//TODO===================================================在建工程抵押网签-模块区域				
			
			//TODO===================================================预售许可新建-模块区域
			
			//模块菜单
			.state('ysxkxj',{
				backKey_fixed:'house_shangpinfang',
				url:'/ysxkxj',
				templateUrl:'htm/ysxkxj/ysxkxj.html',
			})
			
			//待选楼栋-列表
			.state('ysxkxj_dxld_list',{
				backKey_complicated: 'true',
				backKey_when_fixed: 'ysxkxj',
				url:'/ysxkxj_dxld_list',
				templateUrl:'htm/ysxkxj/dxld_list.html',
				controller:'ysxkxjDxldListController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//预售许可新建-列表
			.state('ysxkxj_ysxk_list',{
				backKey_fixed:'ysxkxj',
				url:'/ysxkxj_ysxk_list',
				templateUrl:'htm/ysxkxj/ysxk_list.html',
				controller:'ysxkxjYsxkListController'
			})
			
			//预售许可-详细
			.state('ysxkxj_ysxk_detail',{
				backKey_fixed:'ysxkxj_ysxk_list',
				url:'/ysxkxj_ysxk_detail',
				templateUrl:'htm/ysxkxj/ysxk_detail.html',
				controller:'ysxkxjYsxkDetailController',
				params:{
					'id':{}
				}
			})	
			
			
			//TODO===================================================预售许可新建-模块区域	
			
			//TODO===================================================商品房交易备案-模块区域
			//商品房交易备案-菜单列表
			.state('spfjyba',{
				backKey_fixed:'house_shangpinfang',
				url:'/spfjyba',
				templateUrl:'htm/spfjyba/spfjyba.html'
			})
			
			//商品房交易备案-待办案列-详细信息
			.state('spfjyba_dbal_detail',{
				backKey_checkListNum:'spfjyba_dbalList',
				listRoute:'spfjyba_dbal_list',
				menuRoute:'spfjyba',
				url:'/spfjyba_dbal_detail',
				templateUrl:'htm/spfjyba/dbal_detail.html',
				controller:'spfJybaDbalDetailController',
				params:{
					'id':{}
				}				
			})

			//商品房交易备案-待办案列-列表
			.state('spfjyba_dbal_list',{
				backKey_fixed:'spfjyba',
				url:'/spfjyba_dbal_list',
				templateUrl:'htm/spfjyba/dbal_list.html',
				controller:'spfJybaDbalListController'
			})			
			
			//商品房交易备案-交易备案-列表
			.state('spfjyba_jyba_list',{
				backKey_fixed:'spfjyba',
				url:'/spfjyba_jyba_list',
				templateUrl:'htm/spfjyba/jyba_list.html',
				controller:'spfJybaJybaListController'
			})
			
			//TODO===================================================商品房交易备案-模块区域
			
			//TODO===================================================预售合同备案-模块区域
			//菜单列表
			.state('yshtba',{
				backKey_fixed:'house_shangpinfang',
				url:'/yshtba',
				templateUrl:'htm/yshtba/yshtba.html'
			})
			
			//待办案列-详细信息
			.state('yshtba_dbal_detail',{
				backKey_checkListNum:'yshtba_dbalList',
				listRoute:'yshtba_dbal_list',
				menuRoute:'yshtba',
				url:'/yshtba_dbal_detail',
				templateUrl:'htm/yshtba/dbal_detail.html',
				controller:'yshtbaDbalDetailController',
				params:{
					'id':{}
				}				
			})

			//待办案列-列表
			.state('yshtba_dbal_list',{
				backKey_fixed:'yshtba',
				url:'/yshtba_dbal_list',
				templateUrl:'htm/yshtba/dbal_list.html',
				controller:'yshtbaDbalListController',
			})			
			
			//交易备案-列表
			.state('yshtba_jyba_list',{
				backKey_fixed:'yshtba',
				url:'/yshtba_jyba_list',
				templateUrl:'htm/yshtba/jyba_list.html',
				controller:'yshtbaJybaListController'
			})

			//TODO===================================================预售合同备案-模块区域				
			
			//TODO===================================================预购商品房抵押备案-模块区域
			//预购商品房抵押备案-菜单列表
			.state('ygspfdyba',{
				backKey_fixed:'house_diya',
				url:'/ygspfdyba',
				templateUrl:'htm/ygspfdyba/ygspfdyba.html',
			})
			//预购商品房抵押备案-待办案列-列表
			.state('ygspfdyba_dbal_list',{
				backKey_fixed:'ygspfdyba',
				url:'/ygspfdyba_dbal_list',
				templateUrl:'htm/ygspfdyba/dbal_list.html',
				controller:'ygspfdybaDbalListController',		
			})	
			//预购商品房抵押备案-待办案列-详细信息
			.state('ygspfdyba_dbal_detail',{
				backKey_checkListNum:'ygspfdyba_dbalList',
				listRoute:'ygspfdyba_dbal_list',
				menuRoute:'ygspfdyba',
				url:'/ygspfdyba_dbal_detail',
				templateUrl:'htm/ygspfdyba/dbal_detail.html',
				controller:'ygspfdybaDbalDetailController',
				params:{
					'id':{}
				}				
			})
			//预购商品房抵押备案-交易备案-列表
			.state('ygspfdyba_jyba_list',{
				backKey_fixed:'ygspfdyba',
				url:'/ygspfdyba_jyba_list',
				templateUrl:'htm/ygspfdyba/jyba_list.html',
				controller:'ygspfdyJybaListController',
			})
			
			//预购商品房抵押备案-交易备案-详细
			.state('ygspfdyba_jyba_detail',{
				backKey_fixed:'ygspfdyba_jyba_list',
				url:'/ygspfdyba_jyba_detail',
				templateUrl:'htm/ygspfdyba/jyba_detail.html',
				controller:'ygspfdyJybaDetailController',
				params:{
					'id':{},
					'mastatus':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================预购商品房抵押备案-模块区域			

			//TODO===================================================一般抵押备案-模块区域
			//菜单列表
			.state('ybdyba',{
				backKey_fixed:'house_diya',
				url:'/ybdyba',
				templateUrl:'htm/ybdyba/ybdyba.html'
			})
			//一般抵押备案待办案列-详细信息
			.state('ybdyba_dbal_detail',{
				backKey_checkListNum:'ybdyba_dbalList',
				listRoute:'ybdyba_dbal_list',
				menuRoute:'ybdyba',
				url:'/ybdyba_dbal_detail',
				templateUrl:'htm/ybdyba/dbal_detail.html',
				controller:'ybdybaDbalDetailController',
				params:{
					'id':{}
				}				
			})

			//一般抵押备案待办案列-列表
			.state('ybdyba_dbal_list',{
				backKey_fixed:'ybdyba',
				url:'/ybdyba_dbal_list',
				templateUrl:'htm/ybdyba/dbal_list.html',
				controller:'ybdybaDbalListController',
			})			
			
			//一般抵押备案-交易备案-列表
			.state('ybdyba_jyba_list',{
				backKey_fixed:'ybdyba',
				url:'/ybdyba_jyba_list',
				templateUrl:'htm/ybdyba/jyba_list.html',
				controller:'ybdybaJybaListController',
			})
			
			//一般抵押备案-交易备案-详细
			.state('ybdyba_jyba_detail',{
				backKey_fixed:'ybdyba_jyba_list',
				url:'/ybdyba_jyba_detail',
				templateUrl:'htm/ybdyba/jyba_detail.html',
				controller:'ybdybaJybaDetailController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================一般抵押备案-模块区域
			
			
			//TODO===================================================最高额抵押备案-模块区域
			//菜单列表
			.state('zgedyba',{
				backKey_fixed:'house_diya',
				url:'/zgedyba',
				templateUrl:'htm/zgedyba/zgedyba.html'
			})
			
			//待办案列-详细信息
			.state('zgedyba_dbal_detail',{
				backKey_checkListNum:'zgedyba_dbalList',
				listRoute:'zgedyba_dbal_list',
				menuRoute:'zgedyba',
				url:'/zgedyba_dbal_detail',
				templateUrl:'htm/zgedyba/dbal_detail.html',
				controller:'zgedybaDbalDetailController',
				params:{
					'id':{}
				}				
			})
		
			//待办案列-列表
			.state('zgedyba_dbal_list',{
				backKey_fixed:'zgedyba',
				url:'/zgedyba_dbal_list',
				templateUrl:'htm/zgedyba/dbal_list.html',
				controller:'zgedybaDbalListController',
			})			
			
			//交易备案-列表
			.state('zgedyba_jyba_list',{
				backKey_fixed:'zgedyba',
				url:'/zgedyba_jyba_list',
				templateUrl:'htm/zgedyba/jyba_list.html',
				controller:'zgedybaJybaListController'
			})
		
			//交易备案-详细
			.state('zgedyba_jyba_detail',{
				backKey_fixed:'zgedyba_jyba_list',
				url:'/zgedyba_jyba_detail',
				templateUrl:'htm/zgedyba/jyba_detail.html',
				controller:'zgedybaJybaDetailController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
	       //TODO===================================================最高额抵押备案-模块区域
			//TODO===================================================我的预约
			//我的预约
			.state('wdyy',{
				backKey_fixed:'index',
				url:'/wdyy',
				templateUrl:'htm/wdyy/wdyy.html',
				controller:'wdyyController'
			})
			//我的预约-列表
			.state('wdyy_list',{
				backKey_fixed:'wdyy',
				url:'/wdyy_list',
				templateUrl:'htm/wdyy/wdyy_list.html',
				controller:'wdyyListController'
			})
			//我的预约-详细页面
			.state('wdyy_detail',{
				backKey_dynamic:'backUrl',
				url:'/wdyy_detail',
				templateUrl:'htm/wdyy/wdyy_detail.html',
				controller:'wdyyDetailController',
				params:{
					id:{},
					backUrl:{}
				}
			})
			//TODO===================================================我的预约
			
			//TODO===================================================单位注册和审核
			
			.state('orgReg',{
				backKey_fixed:'house_bangongdanwei',
				url:'/orgReg',
				templateUrl:'htm/org/main.html'
			})
			
			.state('orgReg_detail',{
				backKey_dynamic:'backUrl',
				url:'/orgReg_detail',
				templateUrl:'htm/org/detail.html',
				controller:'orgRegDetailController',
				params:{
					id:{},
					backUrl:{}
				}
			})
			//本中心人员角色直接维护
			.state('orgReg_bzx_oper',{
				backKey_fixed:'house_bangongdanwei',
				url:'/orgReg_bzx_oper',
				templateUrl:'htm/org/bzx_oper.html',
				controller:'orgRegBzxOperController'
			})			
			//审核
			.state('orgReg_list_apr',{
				backKey_fixed:'house_bangongdanwei',
				url:'/orgReg_list_apr',
				templateUrl:'htm/org/list_apr.html',
				controller:'orgRegListController'
			})
			//申请注册历史
			.state('orgReg_list_self',{
				backKey_fixed:'orgReg',
				url:'/orgReg_list_self',
				templateUrl:'htm/org/list_self.html',
				controller:'orgRegListController'
			})
			//TODO===================================================单位注册和审核
			
			//TODO===================================================存量房交易备案-模块区域
			//存量房交易备案-菜单列表
			.state('clfjyba', {
				backKey_fixed:'house_ershou',
				url: '/clfjyba',
				templateUrl: 'htm/clfjyba/clfjyba.html'
			})
			
			//存量房交易备案-待办案列-详细信息
			.state('clfjyba_dbal_detail', {
				backKey_checkListNum:'clfjyba_dbalList',
				listRoute:'clfjyba_dbal_list',
				menuRoute:'clfjyba',
				url: '/clfjyba_dbal_detail',
				templateUrl: 'htm/clfjyba/dbal_detail.html',
				controller: 'clfjybaDbalDetailController'
			})			
			
			//存量房交易备案-待办案列-列表
			.state('clfjyba_dbal_list', {
				backKey_fixed:'clfjyba',
				url: '/clfjyba_dbal_list',
				templateUrl: 'htm/clfjyba/dbal_list.html',
				controller: 'clfjybaDbalListController'
			})
			
			//存量房交易备案-交易备案-列表
			.state('clfjyba_jyba_list', {
				backKey_fixed:'clfjyba',
				url: '/clfjyba_jyba_list',
				templateUrl: 'htm/clfjyba/jyba_list.html',
				controller: 'clfjybaJybaListController'
			})
			
			//TODO===================================================存量房交易备案-模块区域
			//TODO===================================================存量房网签
			//存量房网签菜单
			.state('clfwq', {
				backKey_fixed:'house_ershou',
				url: '/clfwq',
				templateUrl: 'htm/clfwq/clfwq.html'
			})
			//待签房屋查询
			.state('dqfw_cx', {
				backKey_fixed:'clfwq',
				url: '/dqfw_cx',
				templateUrl: 'htm/clfwq/dqfw_cx.html',
				controller: 'clfwqDqfwCxController'
			})
			//待签房屋列表
			.state('dqfw_list', {
				backKey_fixed:'dqfw_cx',
				url: '/dqfw_list',
				templateUrl: 'htm/clfwq/dqfw_list.html',
				controller: 'clfwqDqfwListController',
			})
			//待签房屋详细信息
			.state('dqfw_detail',{
				backKey_checkListNum:'clfwq_dqfwList',
				listRoute:'dqfw_list',
				menuRoute:'dqfw_cx',
				url:'/dqfw_detail',
				templateUrl:'htm/clfwq/dqfw_detail.html',
				controller:'clfwqDqfwDetailController',
				params:{
					'syqrmc':{},
					'bdcqzh':{}
				}
			})
			//存量房网签列表
			.state('clfwq_list', {
				backKey_fixed:'clfwq',
				url: '/clfwq_list',
				templateUrl: 'htm/clfwq/clfwq_list.html',
				controller: 'clfwqListController'
			})
			//存量房网签详细信息
			.state('clfwq_detail',{
				backKey_fixed:'clfwq_list',
				url:'/clfwq_detail',
				templateUrl:'htm/clfwq/clfwq_detail.html',
				controller:'clfwqDetailController',
				params:{
					'id':{},
					'sortid':{}
				}
			})
			//TODO===================================================存量房网签
			
			//TODO===================================================意见反馈
			.state('fbyj_yh',{
				backKey_fixed:'yjfk_yh',
				url:'/fbyj_yh',
				templateUrl:'htm/yjfk/fbyj_yh.html',
				controller:'fbyjyhController',
				params:{
					'id':{}
				}
			})
			.state('yjfk_yh',{
				backKey_fixed:'xingtai_me',
				url:'/yjfk_yh',
				templateUrl:'htm/yjfk/yjfk_yh.html',
				controller:'yjfkyhController'
			})
			.state('yjhf_yh',{
				backKey_fixed:'yjfk_yh',
				url:'/yjhf_yh',
				templateUrl:'htm/yjfk/yjhf_yh.html',
				controller:'yjhfyhController',
				params:{
					'id':{}
				}
			})
			.state('yhyj_gly',{
				backKey_fixed:'xingtai_me',
				url:'/yhyj_gly',
				templateUrl:'htm/yjfk/yhyj_gly.html',
				controller:'yhyjglyListController'
			})
			
			.state('yhyjjd_gly',{
				backKey_fixed:'yhyj_gly',
				url:'/yhyjjd_gly',
				templateUrl:'htm/yjfk/yhyjjd_gly.html',
				controller:'yhyjjdController',
				params:{
					'id':{}
				}
			})
			
			.state('yjfk_editPics',{
				backKey_complicated: 'true',
				url:'/yjfk_editPics',
				templateUrl:'htm/yjfk/yjfk_editPics.html',
				controller:'yjfkEditPicsController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			.state('yjfk_editVoice',{
				backKey_complicated: 'true',
				url:'/yjfk_editVoice',
				templateUrl:'htm/yjfk/yjfk_editVoice.html',
				controller:'yjfkEditVoiceController',
				params:{
					'id':{},
					'if_oper':{},
					'backURL':{}
				}
			})
			.state('yjfk_editVideo',{
				backKey_complicated: 'true',
				url:'/yjfk_editVideo',
				templateUrl:'htm/yjfk/yjfk_editVideo.html',
				controller:'yjfkEditVideoController',
				params:{
					'id':{},
					'if_oper':{},
					'backURL':{}
				}
			})
			//TODO===================================================意见反馈
			
			//TODO===================================================预购商品房抵押网签-模块区域
			//预购商品房抵押网签-菜单列表
			.state('ygspfdywq',{
				backKey_fixed:'house_diya',
				url:'/ygspfdywq',
				templateUrl:'htm/ygspfdywq/ygspfdywq.html',
			})
			//预购商品房抵押网签-待签案列-列表
			.state('ygspfdywq_dq_list',{
				backKey_fixed:'ygspfdywq',
				url:'/ygspfdywq_dq_list',
				templateUrl:'htm/ygspfdywq/dq_list.html',
				controller:'ygspfdywqdqListController',		
			})	
			//预购商品房抵押网签-待签案列-详细信息
			.state('ygspfdywq_dq_detail',{
				backKey_checkListNum:'ygspfdywq_dqList',
				listRoute:'ygspfdywq_dq_list',
				menuRoute:'ygspfdywq',
				url:'/ygspfdywq_dq_detail',
				templateUrl:'htm/ygspfdywq/dq_detail.html',
				controller:'ygspfdywqDqDetailController',
				params:{
					'id':{}
				}				
			})
			//预购商品房抵押签约-抵押网签-列表
			.state('ygspfdywq_wq_list',{
				backKey_fixed:'ygspfdywq',
				url:'/ygspfdywq_wq_list',
				templateUrl:'htm/ygspfdywq/ygdywq_list.html',
				controller:'ygspfdyWqListController',
			})
			
			//预购商品房抵押网签-抵押网签-详细
			.state('ygspfdywq_wq_detail',{
				backKey_fixed:'ygspfdywq_wq_list',
				url:'/ygspfdywq_wq_detail',
				templateUrl:'htm/ygspfdywq/ygdywq_detail.html',
				controller:'ygspfdyWqDetailController',
				params:{
					'id':{},
					'mastatus':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================预购商品房抵押网签-模块区域	
			
			//TODO===================================================一般抵押网签-模块区域
			//菜单列表
			.state('ybdywq',{
				backKey_fixed:'house_diya',
				url:'/ybdywq',
				templateUrl:'htm/ybdywq/ybdywq.html'
			})
			//待签案例查询
			.state('ybdqal_cx', {
				backKey_fixed:'ybdywq',
				url: '/ybdqal_cx',
				templateUrl: 'htm/ybdywq/ybdqal_cx.html',
				controller: 'ybdywqDqalCxController'
			})
			
			//一般抵押网签待签案列表-详细信息
			.state('ybdywq_dqal_detail',{
				backKey_checkListNum:'ybdywq_dqalList',
				listRoute:'ybdywq_dqal_list',
				menuRoute:'ybdqal_cx',
				url:'/ybdywq_dqal_detail',
				templateUrl:'htm/ybdywq/dqal_detail.html',
				controller:'ybdyWqDqalDetailController',
				params:{
					'syqrmc':{},
					'bdcqzh':{} 
				}				
			})

			//一般抵押网签待签约案列-列表
			.state('ybdywq_dqal_list',{
				backKey_fixed:'ybdqal_cx',
				url:'/ybdywq_dqal_list',
				templateUrl:'htm/ybdywq/dqal_list.html',
				controller:'ybdyWqDqalListController',
			})			
			
			//一般抵押网签-抵押网签-列表
			.state('ybdywq_dywq_list',{
				backKey_fixed:'ybdywq',
				url:'/ybdywq_dywq_list',
				templateUrl:'htm/ybdywq/ybdywq_list.html',
				controller:'ybdyWqDywqListController',
			})
			
			//一般抵押网签-抵押网签-详细
			.state('ybdywq_dywq_detail',{
				backKey_fixed:'ybdywq_dywq_list',
				url:'/ybdywq_dywq_detail',
				templateUrl:'htm/ybdywq/ybdywq_detail.html',
				controller:'ybdyWqDywqDetailController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================一般抵押网签-模块区域

			
			//TODO===================================================最高额抵押网签-模块区域
			//菜单列表
			.state('zgedywq',{
				backKey_fixed:'house_diya',
				url:'/zgedywq',
				templateUrl:'htm/zgedywq/zgedywq.html'
			})
			//待签案例查询
			.state('zgdqal_cx', {
				backKey_fixed:'zgedywq',
				url: '/zgdqal_cx',
				templateUrl: 'htm/zgedywq/zgdqal_cx.html',
				controller: 'zgedywqDqalCxController'
			})
			
			//最高额抵押网签待签案列表-详细信息
			.state('zgedywq_dqal_detail',{
				backKey_checkListNum:'zgedywq_dqalList',
				listRoute:'zgedywq_dqal_list',
				menuRoute:'zgdqal_cx',
				url:'/zgedywq_dqal_detail',
				templateUrl:'htm/zgedywq/dqal_detail.html',
				controller:'zgedyWqDqalDetailController',
				params:{
					'syqrmc':{},
					'bdcqzh':{}
				}				
			})

			//最高额抵押网签待签约案列-列表
			.state('zgedywq_dqal_list',{
				backKey_fixed:'zgdqal_cx',
				url:'/zgedywq_dqal_list',
				templateUrl:'htm/zgedywq/dqal_list.html',
				controller:'zgedyWqDqalListController',
			})			
			
			//最高额抵押网签-抵押网签-列表
			.state('zgedywq_dywq_list',{
				backKey_fixed:'zgedywq',
				url:'/zgedywq_dywq_list',
				templateUrl:'htm/zgedywq/zgedywq_list.html',
				controller:'zgedyWqDywqListController',
			})
			
			//最高额抵押网签-抵押网签-详细
			.state('zgedywq_dywq_detail',{
				backKey_fixed:'zgedywq_dywq_list',
				url:'/zgedywq_dywq_detail',
				templateUrl:'htm/zgedywq/zgedywq_detail.html',
				controller:'zgedyWqDywqDetailController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================最高额抵押网签-模块区域
			//TODO===================================================征信管理
			//征信管理
			.state('zxgl',{
				backKey_fixed:'index',
				url:'/zxgl',
				templateUrl:'htm/zxgl/zxgl.html',
				controller:'zxglController'
			})
			
			.state('qyblxw_list',{
				backKey_fixed:'zxgl',
				url:'/qyblxw_list',
				templateUrl:'htm/zxgl/qyblxw_list.html',
				controller:'qyblxwListController',
				params:{
					'id':{},
					backUrl:{}
				}
			})
			.state('zj_qyblxx',{
				backKey_fixed:'qyblxw_list',
				url:'/zj_qyblxx',
				templateUrl:'htm/zxgl/zj_qyblxx.html',
				controller:'bjqyBLxxController',
				params:{
					'id':{}
				}
			})
			//企业获奖情况页面
			.state('qyhjqk_list',{
				backKey_fixed:'zxgl',
				url:'/qyhjqk_list',
				templateUrl:'htm/zxgl/qyhjqk_list.html',
				controller:'qyhjqkListController',
				params:{
					'id':{},
					backUrl:{}
				}
			})
			.state('zj_qyhjxx',{
				backKey_fixed:'qyhjqk_list',
				url:'/zj_qyhjxx',
				templateUrl:'htm/zxgl/zj_qyhjxx.html',
				controller:'bjqyHJxxController',
				params:{
					'id':{}
				}
			})
			//TODO===================================================征信管理
			
			//TODO===================================================楼盘管理-模块区域
			
			//房屋面积查询
			.state('house_right_area',{
				backKey_fixed: 'house_right',
				url:'/house_right_area',
				templateUrl:'htm/house_right_area.html',
				controller:'fangWuMianJiController'
			})
			
			.state('lpgl', {
				backKey_fixed:'house_right_area',
				url: '/lpgl',
				templateUrl: 'htm/lpgl/lpgl.html'
			})
			.state('lpls_list', {
				backKey_fixed:'lpgl',
				url: '/lpls_list',
				templateUrl: 'htm/lpgl/lpls_list.html',
				controller: 'lplsListController'
			})
			.state('lpxj_detail', {
				backKey_checkListNum:'lpxj_lpywList',
				listRoute:'lpls_list',
				menuRoute:'lpgl',
				url: '/lpxj_detail',
				templateUrl: 'htm/lpgl/lpxj_detail.html',
				controller: 'lpxjDetailController',
				params: {
					id: {}
				}
			})
			.state('fw_list', {
				backKey_fixed:'lpxj_detail',
				url: '/fw_list',
				templateUrl: 'htm/lpgl/fw_list.html',
				controller: 'fwListController',
				params: {
					ywbh:{},
					ldxh:{}
				}
			})
			.state('fw_detail', {
				backKey_fixed:'fw_list',
				url: '/fw_detail',
				templateUrl: 'htm/lpgl/fw_detail.html',
				controller: 'fwDetailController',
				params: {
					ywbh:{},
					ldxh:{},
					bldroomid:{}
				}
			})
			//TODO===================================================楼盘管理-模块区域
			
			//TODO===================================================商品期房买卖网签-模块区域
			//菜单
			.state('spfwq',{
				backKey_fixed:'house_shangpinfang',
				url:'/spfwq',
				templateUrl:'htm/spqfmmwq/spfwq.html'
			})
			//楼群
			.state('ld_list', {
				backKey_complicated: 'true',
				backKey_when_fixed:'spfwq',
				url: '/ld_list',
				templateUrl: 'htm/spqfmmwq/ld_list.html',
				controller: 'spfwqLdListController',
				params:{
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//单个楼的楼盘表
			.state('lpb_one', {
				backKey_complicated: 'true',
				url: '/lpb_one',
				templateUrl: 'htm/spqfmmwq/lpb_one.html',
				controller:'lpbOneController',
				params:{
					'id':"",
					'buildId':"",
					'init_show_qfxf':{},
					'backURL':{},
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//商品期房买卖网签列表
			.state('spfwq_list', {
				backKey_fixed:'spfwq',
				url: '/spfwq_list',
				templateUrl: 'htm/spqfmmwq/spfwq_list.html',
				controller: 'spfwqListController'
			})
			//商品期房买卖网签详细
			.state('spfwq_detail',{
				backKey_fixed:'spfwq_list',
				url:'/spfwq_detail',
				templateUrl:'htm/spqfmmwq/spfwq_detail.html',
				controller:'spfwqDetailController',
				params:{
					'id':{}
				}
			})
			
			//商品期房买卖网签合同
			.state('spqfwqHT', {
				backKey_fixed:'spfwq_list',
				url: '/spqfwqHT',
				templateUrl: 'htm/spqfmmwq/spqfwqHT.html',
				controller:'spfwqHTController',
				params:{
					'id':{},
					'mastatus':{}
				}
			})
			
			//TODO===================================================商品期房买卖网签-模块区域
			
			//TODO===================================================商品现房买卖网签-模块区域
			//菜单
			.state('spxfwq',{
				backKey_fixed:'house_shangpinfang',
				url:'/spxfwq',
				templateUrl:'htm/spxfmmwq/spxfwq.html'
			})
			//楼群
			.state('xf_ld_list', {
				backKey_complicated: 'true',
				backKey_when_fixed:'spxfwq',
				url: '/xf_ld_list',
				templateUrl: 'htm/spxfmmwq/xf_ld_list.html',
				controller: 'spxfwqLdListController',
				params:{
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//单个楼的楼盘表
			.state('xf_lpb_one', {
				backKey_complicated: 'true',
				url: '/xf_lpb_one',
				templateUrl: 'htm/spxfmmwq/xf_lpb_one.html',
				controller:'xfLpbOneController',
				params:{
					'id':"",
					'buildId':"",
					'init_show_qfxf':{},
					'backURL':{},
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//商品现房买卖网签列表
			.state('spxfwq_list', {
				backKey_fixed:'spxfwq',
				url: '/spxfwq_list',
				templateUrl: 'htm/spxfmmwq/spxfwq_list.html',
				controller: 'spxfwqListController'
			})
			//商品现房买卖网签详细
			.state('spxfwq_detail',{
				backKey_fixed:'spxfwq_list',
				url:'/spxfwq_detail',
				templateUrl:'htm/spxfmmwq/spxfwq_detail.html',
				controller:'spxfwqDetailController',
				params:{
					'id':{}
				}
			})
			
			//商品现房买卖网签合同
			.state('spxfwqHT', {
				backKey_fixed:'spxfwq_list',
				url: '/spxfwqHT',
				templateUrl: 'htm/spxfmmwq/spxfwqHT.html',
				controller:'spxfwqHTController',
				params:{
					'id':{},
					'mastatus':{}
				}
			})
			
			//TODO===================================================商品现房买卖网签-模块区域
			
			//TODO===================================================在建工程抵押备案-模块区域
			//在建工程抵押备案-菜单列表
			.state('zjgcdyba',{
				backKey_fixed:'house_diya',
				url:'/zjgcdyba',
				templateUrl:'htm/zjgcdyba/zjgcdyba.html',
			})
			//在建工程抵押备案-待办案列-列表
			.state('zjgcdyba_dbal_list',{
				backKey_fixed:'zjgcdyba',
				url:'/zjgcdyba_dbal_list',
				templateUrl:'htm/zjgcdyba/dbal_list.html',
				controller:'zjgcdybaDbalListController',		
			})	
			//在建工程抵押备案-待办案列-详细信息
			.state('zjgcdyba_dbal_detail',{
				backKey_checkListNum:'zjgcdyba_dbalList',
				listRoute:'zjgcdyba_dbal_list',
				menuRoute:'zjgcdyba',
				url:'/zjgcdyba_dbal_detail',
				templateUrl:'htm/zjgcdyba/dbal_detail.html',
				controller:'zjgcdybaDbalDetailController',
				params:{
					'id':{}
				}				
			})
			//在建工程抵押备案-交易备案-列表
			.state('zjgcdyba_jyba_list',{
				backKey_fixed:'zjgcdyba',
				url:'/zjgcdyba_jyba_list',
				templateUrl:'htm/zjgcdyba/jyba_list.html',
				controller:'zjgcdybaJybaListController',
			})
			
			//在建工程抵押备案-交易备案-详细
			.state('zjgcdyba_jyba_detail',{
				backKey_fixed:'zjgcdyba_jyba_list',
				url:'/zjgcdyba_jyba_detail',
				templateUrl:'htm/zjgcdyba/jyba_detail.html',
				controller:'zjgcdybaJybaDetailController',
				params:{
					'id':{},
					'mastatus':{},
					'backURL':{}
				}
			})
			
			//TODO===================================================在建工程抵押备案-模块区域
			//TODO===================================================房源核验
			//房源核验菜单
			.state('fyhy', {
				backKey_fixed:'house_right',
				url: '/fyhy',
				templateUrl: 'htm/fyhy/fyhy.html'
			})
			//待签房屋查询
			.state('fyhydq_cx', {
				backKey_fixed:'fyhy',
				url: '/fyhydq_cx',
				templateUrl: 'htm/fyhy/fyhydq_cx.html',
				controller: 'fyhyDqfwCxController'
			})
			//待签房屋列表
			.state('dqfy_list', {
				backKey_fixed:'fyhydq_cx',
				url: '/dqfy_list',
				templateUrl: 'htm/fyhy/dqfy_list.html',
				controller: 'fyhyDqfwListController',
			})
			//待签房屋详细信息
			.state('dqfy_detail',{
				backKey_checkListNum:'fyhy_dqfwList',
				listRoute:'dqfy_list',
				menuRoute:'fyhydq_cx',
				url:'/dqfy_detail',
				templateUrl:'htm/fyhy/dqfy_detail.html',
				controller:'fyhyDqfwDetailController',
				params:{
					'syqrmc':{},
					'bdcqzh':{}
				}
			})
			//房源核验信息列表
			.state('fyhy_list', {
				backKey_fixed:'fyhy',
				url: '/fyhy_list',
				templateUrl: 'htm/fyhy/fyhy_list.html',
				controller: 'fyhyListController'
			})
			//房源核验详细信息
			.state('fyhy_detail',{
				backKey_fixed:'fyhy_list',
				url:'/fyhy_detail',
				templateUrl:'htm/fyhy/fyhy_detail.html',
				controller:'fyhyDetailController',
				params:{
					'id':{},
					'backURL':{}
				}
			})
			//TODO===================================================房源核验
			
			//TODO===================================================楼盘表查询
			//楼盘表查询
			.state('lpbcx', {
				backKey_fixed:'house_right',
				url: '/lpbcx',
				templateUrl: 'htm/lpbcx/lpbcx.html',
				controller: 'lpbcxController'
			})
			//楼群
			.state('ldxx_list', {
				backKey_fixed: 'lpbcx',
				url: '/ldxx_list',
				templateUrl: 'htm/lpbcx/ldxx_list.html',
				controller: 'lpbcxListController',
				params:{
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//单个楼的楼盘表
			.state('lpbxx_one', {
				backKey_fixed: 'ldxx_list',
				url: '/lpbxx_one',
				templateUrl: 'htm/lpbcx/lpbxx_one.html',
				controller:'lpbxxOneController',
				params:{
					'id':"",
					'buildId':"",
					'init_show_qfxf':{},
					'backURL':{},
					'ywID':"",
					'ywBackURL':{}
				}
			})
			//TODO===================================================楼盘表查询
			
			//TODO===================================================家庭档案查询-模块区域
			
			//模块菜单
			.state('jtdacx',{
				backKey_fixed:'house_right',
				url:'/jtdacx',
				templateUrl:'htm/jtdacx/jtdacx.html',
				controller:'jtdacxIndexController',
			})
			
			//家庭档案查询-列表
			.state('jtdacx_list',{
				backKey_fixed:'jtdacx',
				url:'/jtdacx_list',
				templateUrl:'htm/jtdacx/jtdacx_list.html',
				controller:'jtdacxListController'
			})
			
			//家庭档案查询-详细
			.state('jtdacx_detail',{
				backKey_fixed:'jtdacx_list',
				url:'/jtdacx_detail',
				templateUrl:'htm/jtdacx/jtdacx_detail.html',
				controller:'jtdacxDetailController',
				params:{
					'id':{}
				}
			})	
			
			//TODO===================================================银行收款
			
			//银行收款菜单
			.state('yhskcd', {
				backKey_fixed:'house_ershou',
				url: '/yhskcd',
				templateUrl: 'htm/yhsk/yhskcd.html'
			})
			//我要付款查询
			.state('wyfk_cx', {
				backKey_fixed:'yhskcd',
				url: '/wyfk_cx',
				templateUrl: 'htm/yhsk/wyfk_cx.html',
				controller: 'wyfkCxController'
			})
			//资金托管协议
			.state('zjtgxy', {
				backKey_fixed:'wyfk_cx',
				url: '/zjtgxy',
				templateUrl: 'htm/yhsk/zjtgxy.html',
				controller: 'zjtgxyController'
			})
			//银行收款
			.state('yhsk', {
				backKey_fixed:'yhskcd',
				url: '/yhsk',
				templateUrl: 'htm/yhsk/yhsk.html',
				controller: 'yhskController'
			})
			//支付信息
			.state('zfym', {
				backKey_fixed:'yhsk',
				url: '/zfym',
				templateUrl: 'htm/yhsk/zfym.html',
				controller: 'zfymController',
				params:{
					'yhsk':{}
				}
			})
			//测试监听
//			.state('testJT', {
//				backKey_fixed:'yhskcd',
//				url: '/testJT',
//				templateUrl: 'htm/yhsk/test.html',
//				controller: 'testJTController'
//			})
			//TODO===================================================银行收款
			
			//TODO===================================================银行付款
			
			//银行付款菜单
			.state('yhfkcd', {
				backKey_fixed:'house_ershou',
				url: '/yhfkcd',
				templateUrl: 'htm/yhfk/yhfkcd.html'
			})
			//申请付款查询
			.state('sqfk_cx', {
				backKey_fixed:'yhfkcd',
				url: '/sqfk_cx',
				templateUrl: 'htm/yhfk/sqfk_cx.html',
				controller: 'sqfkCxController'
			})
			//资金托管协议
			.state('fkzjtgxy', {
				backKey_fixed:'sqfk_cx',
				url: '/fkzjtgxy',
				templateUrl: 'htm/yhfk/fkzjtgxy.html',
				controller: 'fkzjtgxyController'
			})
			//银行收款
			.state('yhfk', {
				backKey_fixed:'yhfkcd',
				url: '/yhfk',
				templateUrl: 'htm/yhfk/yhfk.html',
				controller: 'yhfkController'
			})
			
			//TODO===================================================银行付款
			
			.state('login', {
				backKey_fixed:'xingtai_me',
				url: '/login',
				templateUrl: 'htm/login.html',
				controller: 'LoginController'
			})
			.state('register', {
				backKey_fixed:'login',
				url: '/register',
				templateUrl: 'htm/register.html',
				controller: 'RegisterController',

			})
			.state('xingtai_me',{
				backKey_fixed:'index',
				url:'/xingtai_me',
				templateUrl:'htm/xingtai_me.html',
				controller:'xingtaimeController',
			})
			
			//修改密码
			.state('updPwd',{
				backKey_fixed: 'xingtai_me',
				url:'/updPwd',
				templateUrl:'htm/updPwd.html',
				controller:'updPwdController',
			})
			
			//重置密码
			.state('updResetPwd',{
				backKey_fixed: 'xingtai_me',
				url:'/updResetPwd',
				templateUrl:'htm/updResetPwd.html',
				controller:'updResetPwdController',
			})
			
			//版本更新
			.state('version',{
				url:'/version',
				templateUrl:'htm/version.html'
			})
			
			//更新日志
			.state('version_list',{
				backKey_fixed: 'xingtai_me',
				url:'/version_list',
				templateUrl:'htm/indexSub/version_list.html',
				controller:'version_listController',
			})			
			
			//中心简介
			.state('introduction',{
				backKey_fixed: 'xingtai_me',
				url:'/introduction',
				templateUrl:'htm/introduction.html'
			})
			
			//关于
			.state('guanyu',{
				backKey_fixed: 'xingtai_me',
				url:'/guanyu',
				templateUrl:'htm/guanyu.html'
			})
			
			//我的房源列表
			.state('myfangwulist',{
				backKey_fixed: 'xingtai_me',
				url:'/myfangwulist',
				templateUrl:'htm/myfangwulist.html',
				controller:'myfangwulistController',
			})
			//公告公示
			.state('gonggaogongshi',{
				backKey_fixed: 'index',
				url:'/gonggaogongshi',
				templateUrl:'htm/dongtaixinxi/dongtaixinxi-gonggaogongshi.html',
				controller:'gonggaogongshiController',
			})
			
			//公告公示详情
			.state('gonggaogongshi-detail',{
				backKey_fixed: 'gonggaogongshi',
				url:'/gonggaogongshi-detail',
				templateUrl:'htm/dongtaixinxi/dongtaixinxi-gonggaogongshi-detail.html',
				controller:'gggsInfoController',
				params:{
					'id':{}
				}
				
			})
			
			//商品房
			.state('shangpingfang',{
				url:'/shangpingfang',
				templateUrl:'htm/shangpingfang.html',
				
			})
			//房屋交易
			.state('house_jiaoyi',{
				backKey_fixed: 'index',
				url:'/house_jiaoyi',
				templateUrl:'htm/house_jiaoyi.html',
			})
			
			//二手房交易
			.state('house_ershou',{
				backKey_fixed: 'house_jiaoyi',
				url:'/house_ershou',
				templateUrl:'htm/house_ershou.html',
				controller:'houseershouController',
			})
			
		
			
			
			
			//身份认证首页
				.state('identifyfirst',{
				url:'/identifyfirst',
				templateUrl:'htm/identifyfirst.html',
				controller:'identifyfirstController',
			})
			
			
			//身份证正面照片认证
				.state('idcardPerson',{
				url:'/idcardPerson',
				templateUrl:'htm/idcardPerson.html',
				controller:'idcardPersonController',
			})
			
			
				//身份正面照验证结果
				.state('identifyPersonResult',{
				url:'/identifyPersonResult',
				templateUrl:'htm/identifyPersonResult.html',
				controller:'identifyPersonResultController',
			})
			
				//身份证反面认证
				.state('idcardCountry',{
				url:'/idcardCountry',
				templateUrl:'htm/idcardCountry.html',
				controller:'idcardCountryController',
			})
			
			
		
			//身份证反面认证结果
			.state('idcardCountryResult',{
			url:'/idcardCountryResult',
			templateUrl:'htm/idcardCountryResult.html',
			controller:'idcardCountryResultController',
		})
		
		
			//视频认证
				.state('videoIdentify',{
				url:'/videoIdentify',
				templateUrl:'htm/videoIdentify.html',
				controller:'videoIdentifyController',
			})
			
			//验证成功
			.state('yanzhengchengong',{
			url:'/yanzhengchengong',
			templateUrl:'htm/yanzhengchengong.html',
			
			
		})
			
			//注册协议
			.state('zcxy_m',{
				backKey_fixed: 'register',
				url:'/zcxy_m',
				templateUrl:'htm/zcxy_m.html',
			})
			
			//抵押交易
			.state('house_diya',{
				backKey_fixed: 'house_jiaoyi',
				url:'/house_diya',
				templateUrl:'htm/house_diya.html',
				controller:'housediyaController',
			})
			
			//预约须知
			.state('house_yuyuexuzhi',{
				url:'/house_yuyuexuzhi',
				templateUrl:'htm/house_yuyuexuzhi.html',
			})
			
			
			//连网办公
			.state('house_bangongdanwei',{
				backKey_fixed: 'index',
				url:'/house_bangongdanwei',
				templateUrl:'htm/house_bangongdanwei.html',
			})
			

			
			//开发商
			.state('house_bangongdanwei_kaifaqiye',{
				url:'/house_bangongdanwei_kaifaqiye',
				templateUrl:'htm/house_bangongdanwei_kaifaqiye.html',
			})
			//开发企业
			.state('kfqy',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/kfqy',
				templateUrl:'htm/lwbgdw/kfqy.html',
				controller:'kfqy_listController'
			})
			
			//中介机构
			.state('house_banggongdanwei_zhongjiejigou',{
				url:'/house_banggongdanwei_zhongjiejigou',
				templateUrl:'htm/house_banggongdanwei_zhongjiejigou.html',
			})
			.state('zjjg',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/zjjg',
				templateUrl:'htm/lwbgdw/zjjg.html',
				controller:'zjjg_listController'
			})
			
			//不动产登记中心
			.state('budongchandengjizhongxin',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/budongchandengjizhongxin',
				templateUrl:'htm/budongchandengjizhongxin.html',
			})
			
			
			//金融机构
			.state('house_banggongdanwei_jirongjigou',{
				url:'/house_banggongdanwei_jirongjigou',
				templateUrl:'htm/house_banggongdanwei_jirongjigou.html',
			})
			.state('jrjg',{
				backKey_fixed: 'house_bangongdanwei',
				url:'/jrjg',
				templateUrl:'htm/lwbgdw/jrjg.html',
				controller:'jrjg_listController'
			})
			
			//房屋产权
			.state('house_right',{
				backKey_fixed: 'index',
				url:'/house_right',
				templateUrl:'htm/house_right.html',
				controller:'houserightController',
			})
			
			//档案查询
			.state('dacx_home',{
				backKey_fixed: 'house_right',
				url:'/dacx/home',
				templateUrl:'htm/dacx.html',
				controller:'dacxController',
			})
			.state('dacx_about',{
				backKey_fixed: 'house_right',
				url:'/dacx/about',
				templateUrl:'htm/dacx.html',
				controller:'dacxController',
			})
			
			//档案查询结果
			.state('dacxjg_ssh',{
				backKey_fixed: 'dacx_home',
				url:'/dacxjg_ssh',
				templateUrl:'htm/cxjg_m_ssh.html',
				controller:'cxjgsshController',
			})
			.state('dacxjg_xs',{
				backKey_fixed: 'dacx_about',
				url:'/dacxjg_xs',
				templateUrl:'htm/cxjg_m_xs.html',
				controller:'cxjgxsController',
			})

			
			
			//房屋信息
//			.state('house_right_msg',{
//				url:'/house_right_msg',
//				templateUrl:'htm/house_right_msg.html',
//			})
			
			//商品房转让预约
			.state('house_shangpinfangzhuanrangyuyue',{
				url:'/house_shangpinfangzhuanrangyuyue',
				templateUrl:'htm/house_shangpinfangzhuanrangyuyue.html',
			})
			//二手房转让预约   
			.state('house_ershoufangyuyue',{
				url:'/house_ershoufangyuyue',
				templateUrl:'htm/house_ershoufangyuyue.html',
			})
			//房源核验预约
				.state('house_heyanyuyue',{
				url:'/house_heyanyuyue',
				templateUrl:'htm/house_heyanyuyue.html',
			})
			//抵押业务预约
				.state('house_diyayuyue',{
				url:'/house_diyayuyue',
				templateUrl:'htm/house_diyayuyue.html',
			})
			//周六预约
				.state('house_zhouliuyuyue',{
				url:'/house_zhouliuyuyue',
				templateUrl:'htm/house_zhouliuyuyue.html',
			})
				
		
			//中心简介
			
			//政策法规
			.state('zhengcaifagui',{
				url:'/zhengcaifagui',
				templateUrl:'htm/zhengcaifagui.html',
			})
			
			//制度完善
			.state('zhengcaifagui-zhidu',{
				url:'/zhengcaifagui-zhidu',
				templateUrl:'htm/zhengcaifagui-zhidu.html',
			})
			
			//工作动态三则
			.state('zhengcaifagui-sanze',{
				url:'/zhengcaifagui-sanze',
				templateUrl:'htm/zhengcaifagui-sanze.html',
			})
			
			//整顿
			.state('zhengcaifagui-zhengdun',{
				url:'/zhengcaifagui-zhengdun',
				templateUrl:'htm/zhengcaifagui-zhengdun.html',
			})
			
			//工作动态二则
			.state('zhengcaifagui-erze',{
				url:'/zhengcaifagui-erze',
				templateUrl:'htm/zhengcaifagui-erze.html',
			})
			
			//交易指南
			.state('dongtaixinxi-jiaoyizhinan',{
				backKey_fixed: 'index',
				url:'/dongtaixinxi-jiaoyizhinan',
				templateUrl:'htm/jiaoyizhijia/dongtaixinxi-jiaoyizhinan.html',
			})
			
			//房屋预测绘成果
			.state('dongtaixinxi-jiaoyizhinan-detail',{
				backKey_fixed: 'dongtaixinxi-jiaoyizhinan',
				url:'/dongtaixinxi-jiaoyizhinan-detail',
				templateUrl:'htm/jiaoyizhijia/dongtaixinxi-jiaoyizhinan-detail.html',
			})
				//房屋实测绘成果
			.state('shicehui',{
				backKey_fixed: 'dongtaixinxi-jiaoyizhinan',
				url:'/shicehui',
				templateUrl:'htm/jiaoyizhijia/shicehui.html',
			})
			
			//开发企业资格
			.state('kaifaqiyezige',{
				backKey_fixed: 'dongtaixinxi-jiaoyizhinan',
				url:'/kaifaqiyezige',
				templateUrl:'htm/jiaoyizhijia/kaifaqiyezige.html',
			})
			
			//商品房现售
			.state('shangpingfangxianshou',{
				backKey_fixed: 'dongtaixinxi-jiaoyizhinan',
				url:'/shangpingfangxianshou',
				templateUrl:'htm/jiaoyizhijia/shangpingfangxianshou.html',
			})
			
			//测绘资格
			.state('cehuizege',{
				backKey_fixed: 'dongtaixinxi-jiaoyizhinan',
				url:'/cehuizege',
				templateUrl:'htm/jiaoyizhijia/cehuizege.html',
			})
			
			//洛阳访问
			.state('zhengcaifagui-luoyang',{
				url:'/zhengcaifagui-luoyang',
				templateUrl:'htm/zhengcaifagui-luoyang.html',
			})
			
			//政策法规详情
			.state('zhengce_info',{
				backKey_fixed: 'index',
				url:'/zhengce_info',
				templateUrl:'htm/zhengce_info.html',
				controller:'zhengceInfoController',
				params:{
					'id':{}
				}
			})
			//商品房
			.state('house_shangpinfang',{
				backKey_fixed: 'house_jiaoyi',
				url:'/house_shangpinfang',
				templateUrl:'htm/house_shangpinfang.html',
				controller:'houseshangpingController',
			})

			//商品房-预售许可查询
			.state('spf_ysxkcx',{
				backKey_fixed: 'house_shangpinfang',
				url:'/spf_ysxkcx',
				templateUrl:'htm/spf_ysxkcx_list.html',
				controller:'spfYsxkcxController',
			})
			
			//商品房-未售房屋查询
			.state('spf_wsfwcx',{
				backKey_fixed: 'house_shangpinfang',
				url:'/spf_wsfwcx',
				templateUrl:'htm/spf_wsfwcx_list.html',
				controller:'spfWsfwcxController',
			})				
			
			//我的预约
			.state('house_yuyue',{
				url:'/house_yuyue',
				templateUrl:'htm/house_yuyue.html',
				
			})
			
			
			
			
			//网签页面
			.state('wangqianshouye',{
				url:'/wangqianshouye',
				templateUrl:'htm/wangqianshouye.html',
				controller:'wangqianController',
			})
			//在线选房
			.state('zaixianxuanfang',{
				url:'/zaixianxuanfang',
				templateUrl:'htm/zaixianxuanfang.html',
				
			})
			//抵押网签
			.state('diya_wangqian',{
				url:'/diya_wangqian',
				templateUrl:'htm/diya_wangqian.html',
				controller:'diyawangqianController',
			})
			
			//修改密码第一步
			.state('change-password-first',{
				url:'/change-password-first',
				templateUrl:'htm/change-password-first.html',
				controller:'changePasswordFirstController',
			})
			//修改密码第二步
			.state('change-password-seconed',{
				url:'/change-password-seconed',
				templateUrl:'htm/change-password-seconed.html',
				controller:'changePasswordSeconedController',
				
			})
			//修改密码第三步 
			.state('change-password-third',{
				url:'/change-password-third',
				templateUrl:'htm/change-password-third.html',
				controller:'changePasswordThirdController',
				
			})
			
			//二手房列表
			.state('ershoufanglist',{
				url:'/ershoufanglist',
				templateUrl:'htm/ershoufang_list.html',
				controller:'ershoufanglistController',
			})
			
			//二手房详情
			.state('ershoufangdetail',{
				url:'/ershoufangdetail',
				templateUrl:'htm/ershoufangdetail.html',
				controller:'ershoufangdetailController',
				params:{
				'certno':{}
			}
				
			})
			.state('yinhanglist',{
				url:'/yinhanglist',
				templateUrl:'htm/yinhanglist.html',
				controller:'yinhanglistController',
			})
			//二手发布房源
			.state('saleershoufang',{
				url:'/saleershoufang',
				templateUrl:'htm/Saleershoufang.html',
				controller:'saleershoufangController',	
			})
			//买受人网签
			.state('maishourenwangqian',{
				url:'/maishourenwangqian',
				templateUrl:'htm/wangqian-maishouren.html',
				controller:'maishourenwangqianController',
			})
	
			//二手房预售许可
			.state('ershoufangyushouxuke',{
				url:'/ershoufangyushouxuke',
				templateUrl:'htm/ershoufangyushouxuke.html',
				controller:'ershoufangyushouxukeController',
				
				
			})
			
		
			.state('rentHouse1', {

				url: '/rentHouse1',
				templateUrl: 'htm/rentHouse1.html',
				controller: 'rentHouseController',
			})
			
		
		
		.state('housedetail',{
			url:'/housedetail',
			templateUrl:'htm/house_detail.html',
			controller:'housedetailController',
			params:{
				'xh':{}
			}
			
		})
		
				
			.state('wangqian-four', {
				cache: true,
				url: '/wangqian-four',
				templateUrl: 'htm/wangqian-four.html',
				controller: 'wangqianfourController',
				params: {
					'data': {}
				}

			})
			
			
			//抵押网签列表
			.state('diyalist',{
				url:'/diyalist',
				templateUrl:'htm/diyalist.html',
				controller:'diyaController',
			})
	
			.state('yushouxuke', {
				url: '/yushouxuke',
				templateUrl: 'htm/yushouxuke.html',
				controller: 'yushouxukeController',

			})
			//二手房网签第四步
			.state('ershoufangwangqian-four',{
				url:'ershoufangwangqian-four',
				templateUrl:'htm/ershoufangwangqian_four.html',
				controller:'ershoufangwangqianfourController',
				params: {
					'data': {}
				}
			})
			
			//二手房网签第三步
			.state('ershoufangwangqian-three',{
				url:'ershoufangwangqian-three',
				templateUrl:'htm/ershoufangwangqian_three.html',
				controller:'ershoufangwangqianthreeController',
				params: {
					'data': {}
				}
			})
			//二手房网签第二步
			.state('ershoufangwangqian-two',{
				url:'/ershoufangwangqian-two',
				templateUrl:'htm/ershoufangwangqian_two.html',
				controller:'ershoufangwangqiantwoController',
				params: {
					'data': {}
				}
			})
			//二手房网签第一步
				.state('ershoufangwangqian-one', {
				url: '/ershoufangwangqian-one',
				templateUrl: 'htm/ershoufangwangqian_one.html',
				controller: 'ershoufangwangqianoneController',

			})
			//网签第一步
			
			.state('wangqian-one',{
				url:'/wangqian-one',
				templateUrl:'htm/wangqian-one.html',
				controller:'wangqianoneController',
			})
			//网签第三步
			
			.state('wangqian-three', {
				cache: true,
				url: '/wangqian-three',
				templateUrl: 'htm/wangqian-three.html',
				controller: 'wangqianthreeController',
				params: {
					'data': {}
				}
			})
			//网签第二步
			.state('wangqian-two', {

				url: '/wangqian-two',
				templateUrl: 'htm/wangqian-two.html',
				controller: 'wangqiantwoController',
				params: {
					'data': {}
				}

			})
			
		.state('identification', {
				url: '/identification',
				templateUrl: 'htm/identification.html',
				controller: 'identificationController',
			})

			.state('logout', {
				url: '/logout',
				templateUrl: 'htm/logout.html',
				controller: 'logoutController'
			})

			//静态List列表-模板示例功能
			.state('mb_jcxtbb', {
				backKey_fixed:'index',
				url: '/mb_jcxtbb',
				templateUrl: 'htm/test/list_jcxtbb.html',
			})			
	})

	//日期配置
	.config(['ionicTimePickerProvider', 'ionicDatePickerProvider', function(ionicTimePickerProvider, ionicDatePickerProvider) {

		var timePickerObj = {
			inputTime: (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60)),
			format: 12,
			step: 15,
			setLabel: '选择',
			closeLabel: '关闭'
		};
		var datePickerObj = {
			inputDate: new Date(),
			setLabel: '选择',
			todayLabel: '今天',
			closeLabel: '关闭',
			mondayFirst: false,
			weeksList: ["日", "一", "二", "三", "四", "五", "六"], //["S", "M", "T", "W", "T", "F", "S"],
			monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], //["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

			templateType: 'popup',
			from: new Date(1950, 1, 1),
			to: new Date(2020, 1, 1),
			showTodayButton: true,
			dateFormat: 'yyyy-MM-dd',
			closeOnSelect: false
			//disableWeekdays: [0]
		};
		ionicDatePickerProvider.configDatePicker(datePickerObj);
		ionicTimePickerProvider.configTimePicker(timePickerObj);
	}])

	.run(function($ionicPlatform,$rootScope,$http,MyFactoryNew) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
			
			//获取政策法规列表
			$rootScope.getZcfg = function(){
				$http({
					method: 'GET',
					url: baseurl + '/bitsroad/queryPageJson?_module=Mobile&_method=getPublicities&type=zcfg&numPerPage=6',
				}).success(function(data) {
					if(data && data._page && data._page.results){
						$rootScope.zhengceresults=data._page.results;
					}else if(data && data.type && data.type == "error"){
						$rootScope.mttAlert(data.content);
					}else{
						$rootScope.mttAlert(PUBLIC_ERROR_NO_NETWORK);
					}
				}).error(function() {
					$rootScope.mttAlert(PUBLIC_ERROR_NO_NETWORK);
				});	
			}
			
			//TODO===================================================APP全局初始化
			/**
			 * APP全局初始化
			 */
			$rootScope.app_init = function(){
				//判断是否已经初始化成功，获得基本参数
				if(!$rootScope._init_success){
					if(!$rootScope.ifTokenLogin){//非单点登录则清除本地存储，使得每次初始化后，都手动登录
						window.localStorage.clear();
					}
					//先获取配置文件信息
					$http.get('manifest.json').success(function(data){
						$rootScope.show_version = data.show_version;
						//采用原始HTTP请求，否则页面一上来就加载，不够友好
						console.log("准备获取初始化参数");
						if ("undefined" != typeof Camera) {
							$rootScope.PUBLIC_CLIENT_APP = true;
						}else{
							//判断是否为微信端操作
							var ua = window.navigator.userAgent.toLowerCase();
							if(ua.match(/MicroMessenger/i) == 'micromessenger'){
								$rootScope.PUBLIC_CLIENT_WECHAT = true;
							}else{
								$rootScope.PUBLIC_CLIENT_WEB = true;
							}
						}
						var requestBody = {_module:'TT',_method:'getAppInitParams'};
						$http({
							method: 'POST',
							url: baseurl + '/bitsroad/rpcjsonWithRB',
							data: requestBody
						}).success(function(data) {
							//判断是安卓系统还是ios系统
							var u = navigator.userAgent;
							var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
							var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
							
							console.log("开始初始化参数");
							if(isAndroid){
								$rootScope.deviceInfo = "Android";
								console.log("Android");
							}else if(isiOS){
								$rootScope.deviceInfo = "IOS";
								console.log("iOS");
							}else{
								$rootScope.deviceInfo = "WEB";
								console.log("windows");
							}
							if(data && data.length > 0){
								for(var i = 0; i < data.length; i++){
									if(data[i].VALUE){
										$rootScope[data[i].CODE] = data[i].VALUE;
									}else{
										$rootScope._selectList = data[i];
										if(data[i].appjsmc_1){
											var arr = new Array(); 
											var index = 0;
											for(var j=0; j<data[i].appjsmc_1.length;j++){
												if(data[i].appjsmc_1[j].SJZDBCZ>990300 && data[i].appjsmc_1[j].SJZDBCZ<990400){
													var obj = {};
													obj.SJZDXSZ=data[i].appjsmc_1[j].SJZDXSZ;
													obj.SJZDBCZ=data[i].appjsmc_1[j].SJZDBCZ;
													arr[index]=obj;
													index++;
												}
											}
											$rootScope.ywspjsjList = arr;
										}
									}
								}
								if($rootScope._params_numperpage && $rootScope._param_baseUrlPathIn){
									g_set_params_NumPerPage($rootScope._params_numperpage);
									//内网基础地址
									window.baseurl_in = $rootScope._param_baseUrlPathIn;
								}else{
									$rootScope.mttAlert('请联系管理员初始化配置参数！');
									return false;
								}	        			
								if($rootScope._param_new_versno && $rootScope._param_ifalert_updapk
										&& $rootScope._param_ifalert_updapk == "1" && $rootScope.show_version != $rootScope._param_new_versno && isAndroid && $rootScope.PUBLIC_CLIENT_APP){
									MyFactoryNew.showUpdateConfirm($rootScope._param_new_versno_desc);
								}
								$rootScope._init_success = true;
								g_init_params($rootScope);
								console.log($rootScope);
							}else if(data && data.length == 0){
								$rootScope.mttAlert('请联系管理员初始化配置参数！');
							}else{
								if(data && data.type && data.type=="error"){
									if(data.content){
										$rootScope.mttAlert(data.content);
									}else{
										$rootScope.mttAlert(PUBLIC_ERROR_NO_NETWORK);
									}
								}
							}
							console.log("完成初始化参数");
							if($rootScope._init_success){
								$rootScope.getZcfg();
							}
						}).error(function() {
							$rootScope.mttAlert(PUBLIC_ERROR_NO_NETWORK);
						});
					})	
				}
			}
			
			//调用全局初始化
			$rootScope.app_init();
			
		});
	})
	
	//日历配置
	.config(function($stateProvider, $ionicConfigProvider, ionicDatePickerProvider) {
		//禁用所有缓存  
		//$ionicConfigProvider.views.maxCache(0);

		/**********************日期控件的配置文件 *****************************/
		//这个步骤相当于是全局配置，默认配置，可以在实际应用中覆盖相关的配置，该配置不是必须的  
		var datePickerObj = {
			setLabel: '确定',
			todayLabel: '今天',
			closeLabel: '关闭',
			mondayFirst: false,
			inputDate: new Date(),
			weeksList: ["日", "一", "二", "三", "四", "五", "六"],
			monthsList: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			templateType: 'popup',
			showTodayButton: true, //true  false  
			dateFormat: 'dd MMM yyyy',
			closeOnSelect: false,
			//disableWeekdays: [],
			from: new Date(2008, 8, 1),
			to: new Date(2028, 8, 1),
			closeOnSelect: false,
			//disableWeekdays: [6],
		};
		ionicDatePickerProvider.configDatePicker(datePickerObj);
		$ionicConfigProvider.tabs.position('bottom');

	})

	.run(function($rootScope, $ionicPlatform, $state, $stateParams, $ionicHistory, $ionicPopup, $cordovaKeyboard, $timeout, $ionicPopover, $cordovaInAppBrowser,MyFactoryNew) {
		
		window.addEventListener('native.keyboardhide', function(e) {
			cordova.plugins.Keyboard.isVisible = true;
			$timeout(function() {
				cordova.plugins.Keyboard.isVisible = false;
			}, 100);

		});
		
		//公用的弹出狂封装
		$rootScope.mttAlert = function(optss,callback) {
			/* ****
			 * optss 为obj 或string
			 * 主要是为了该样式
			 * 
			 *  title:'', // String. 弹窗的标题。默认： 温馨提示
				subTitle:'', // String (可选)。弹窗的子标题。
				template:'', // String (可选)。放在弹窗body内的html模板。
				templateUrl:'', // String (可选)。 放在弹窗body内的html模板的URL。
				okText:' ', // String (默认: 'OK')。OK按钮的文字。默认：知道了
				popupContainer:'', //String全屏样式 如'color:red;border:1px solid red'
				popup:'', //String弹出框样式 如'color:red;border:1px solid red'
				popupHead:'', //String title样式 如'color:red;border:1px solid red'
				popupBody:'', //String body全屏样式 如'color:red;border:1px solid red'
				popupButtons:'', //String botton全屏样式 如'color:red;border:1px solid red'
			 * 
			 * ****/
			var opts = {};
			
			if(typeof optss == 'string'||typeof optss == 'number') {
				opts.template = optss;
			} else if(typeof optss == 'object' && ! optss instanceof Array) {
				opts = optss;
			}else{
				return;
			}

			for(var key in opts) {
				if(opts[key] == undefined || opts[key] == '' || opts[key] == null || opts[key] == ' ') {
					opts[key] = '';
				}
			}
			
			//是否传入了相应的参数
			function ishasKey(key) {
				if(opts[key] == undefined || opts[key] == null) {
					return false;
				}
				return true;
			}

			//默认样式
			var opt = {
				title: ishasKey('title') ? opts['title'] : '温馨提示',
				subTitle: ishasKey('subTitle') ? opts['subTitle'] : '',
				template: ishasKey('template') ? opts['template'] : '',
				templateUrl: ishasKey('templateUrl') ? opts['templateUrl'] : '',
				okText: ishasKey('okText') ? opts['okText'] : '知道了',
				popupContainer: ishasKey('popupContainer') ? opts['popupContainer'] : '',
				popup: ishasKey('popup') ? opts['popup'] : 'border:1px solid #f0eaea;box-shadow:1px 1px 1px #a99c9c',
				popupHead: ishasKey('popupHead') ? opts['popupHead'] : '',
				popupBody: ishasKey('popupBody') ? 'text-align:center;' + opts['popupBody'] : 'text-align:center',
				popupButtons: ishasKey('popupButtons') ? opts['popupButtons'] : '',
			}
			var alertPopup = $ionicPopup.alert({
				title: opt.title,
				subTitle: opt.subTitle,
				template: opt.template,
				templateUrl: opt.templateUrl,
				okText: opt.okText,
			});
			//popupContainer 弹出框的全屏背景
			var popupContainer = document.getElementsByClassName('popup-container');
			//popup 弹出框的中间框
			var popup = document.getElementsByClassName('popup');
			//popupHead 弹出框的title
			var popupHead = document.getElementsByClassName('popup-head');
			//popupBody 弹出框的body
			var popupBody = document.getElementsByClassName('popup-body');

			setTimeout(function() {
				//popupButtons 弹出框的button setTimeout动态获取button
				var popupButtons = document.getElementsByClassName('popup-buttons')[0].getElementsByClassName('button');
				
				//设置样式的fn
				function setCss(sel, cssStr) {
					sel.setAttribute('style', cssStr);
				}
				
				setCss(popupContainer[0], opt.popupContainer);
				setCss(popup[0], opt.popup);
				setCss(popupHead[0], opt.popupHead);
				setCss(popupBody[0], opt.popupBody);
				setCss(popupButtons[0], opt.popupButtons);
				if(callback !== undefined && typeof callback == 'function')
				alertPopup.then(function(res){
					callback();
				})
			}, 0)

		}
		
		//公用的内容查看弹出框
		$rootScope.g_showContent = function(_text,_title,_okText,callback) {
			var alertPopup = $ionicPopup.alert({
				title: _title?_title:"内容查看",
				subTitle: "",
				template: _text,
				templateUrl: "",
				okText: _okText?_okText:"知道了",
			});
			
			alertPopup.then(function(res){
				if(callback !== undefined && typeof callback == 'function'){
					callback();
				}
			})

		}		
		
		//加载动作pop页面初始化及显示
		$rootScope.initLoadingWindow = function (ifShowImmediately){
			$ionicPopover.fromTemplateUrl("loading.html", {
				scope: $rootScope,
				animation: "fade-in",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.poploading = model;
				if(ifShowImmediately){
					$rootScope.poploading.show();
				}
			});
		}
		
		$rootScope.initLoadingWindow();
	    
		/**
		 * 【传入字符为"OFF"时，则不显示加载框】
		 */
		$rootScope.showLoading = function(load_text){
        	if(load_text == "OFF"){
        		$rootScope.load_text = "OFF";
        		return false;
        	}else if(load_text){
				$rootScope.load_text = load_text;
			}else{
				$rootScope.load_text = null;
			}
			$rootScope.initLoadingWindow(true);
	    };
	    
	    $rootScope.hideLoading = function(){
	    	if($rootScope.load_text == "OFF"){
	    		$rootScope.load_text = null;
        		return false;
        	}else if($rootScope.load_text){
				$rootScope.load_text = null;
			}
	    	if($rootScope.poploading){
	    		$rootScope.poploading.hide();
	    	}
	    };
	    
		//全屏展示图片pop页面初始化及显示
		$rootScope.initShowImgWindow = function (ifShowImmediately){
			$ionicPopover.fromTemplateUrl("p_showImg.html", {
				scope: $rootScope,
				animation: "slide-in-up",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.popShowImgWindow = model;
				if(ifShowImmediately){
					$rootScope.popShowImgWindow.show();
				}
			});
		}
		
		$rootScope.initShowImgWindow();
	    
		$rootScope.p_showImgWindow = function(imgObj){
			if(imgObj && imgObj.CONTENT){
				$rootScope.p_showImg_data = "data:image/jpeg;base64,"+imgObj.CONTENT;
			}else if(imgObj && imgObj.SRC){
				$rootScope.p_showImg_data = imgObj.SRC+"?t="+Math.random(); 
			}else{
				$rootScope.mttAlert("展示错误：没有要展示的图片对象数据");
				return false;
			}
			$rootScope.initShowImgWindow(true);
	    };
	    
	    $rootScope.p_hideImgWindow = function(){
	    	$rootScope.popShowImgWindow.hide();
	    };
	    
		//全屏展示房屋各种页签Map信息，pop类型的页面初始化及显示
		$rootScope.initShowRoomMapsWindow = function (ifShowImmediately){
			$ionicPopover.fromTemplateUrl("p_showRoomMaps.html", {
				scope: $rootScope,
				animation: "slide-in-up",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.popShowRoomMapsWindow = model;
				if(ifShowImmediately){
					$rootScope.popShowRoomMapsWindow.show();
				}
			});
		}
		
		$rootScope.p_showRoomMapsWindow = function(roomid){
			if(roomid && typeof roomid == "number"){
				var requestBody = {_module:'TT',_method:'lpb_getFwMaps',bldroomid:roomid};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data){
						if(!data.jbsxMap){
							$rootScope.mttAlert('获取初始化房屋数据失败！');
							return false;
						}
						$rootScope.roomDataObj = data;
						$rootScope.initShowRoomMapsWindow(true);
					}else{
						$rootScope.mttAlert('获取初始化房屋数据失败！');
					}
		        })
			}else{
				$rootScope.mttAlert("展示错误：房屋序号错误，没有可以展示的房屋数据");
				return false;
			}
			
	    };
	    
	    $rootScope.p_showRoomMapsWindow_change= function(index){
	    	var clickYqObj = $(".popover-backdrop.active .tab .tab-item").eq(index);
	    	$(clickYqObj).addClass("actived").siblings().removeClass("actived");
	    	var clickYqCardsObj = $(".popover-backdrop.active .tab-cont").css("display", "none").eq(index);
	    	$(clickYqCardsObj).css("display", "block");
	    };
	    
		
	    $rootScope.p_hideRoomMapsWindow = function(){
	    	$rootScope.popShowRoomMapsWindow.hide();
	    };
	    
		//区块链详情界面，pop类型的页面初始化及显示
		$rootScope.initShow_qkl_clfwqht = function (ifShowImmediately){
			$ionicPopover.fromTemplateUrl("p_show_qkl_clfwqht.html", {
				scope: $rootScope,
				animation: "slide-in-up",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.popShow_qkl_clfwqht = model;
				if(ifShowImmediately){
					$rootScope.popShow_qkl_clfwqht.show();
				}
			});
		}
		
		$rootScope.p_show_qkl_clfwqhtByData = function(dataMap){
			var requestBody = {jym:dataMap.TxId};
			MyFactoryNew.getHttpRequest( baseurl + '/qklWithRB/getInfoByJYM', 'POST', null, requestBody).then(function (data) {
				if(data && data.dataHash){
					$rootScope.qkl_clfwqht_data = dataMap;
					$rootScope.qkl_clfwqht_data.dataHash = data.dataHash;
					$rootScope.qkl_clfwqht_data.previousHash = data.previousHash;
					$rootScope.initShow_qkl_clfwqht(true);
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert('获取区块链数据失败！');
				}
	        })			
			
			
	    };
		
	    $rootScope.p_hide_qkl_clfwqht = function(){
	    	$rootScope.popShow_qkl_clfwqht.hide();
	    };
	    
	    //区块链历史信息查询
		$rootScope.p_getQklHistoryListByMap = function(htbh){
			var requestBody = {htbh:htbh};
			$rootScope.qklhtlsList = [];
			MyFactoryNew.getHttpRequest( baseurl + '/qklWithRB/getHistoryListByMap', 'POST', null, requestBody).then(function (data) {
				if(data && data.htbh){
					$rootScope.qklhtlsList = data.qklhtlsList;
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert('获取区块链合同历史信息数据失败！');
				}
	        })
			
	    };
	   //TODO===================================================楼盘表查询 

		$rootScope.init_lpbcxShowRoomMapsWindow = function (ifShowImmediately){
			$ionicPopover.fromTemplateUrl("lpbcx_fwxx.html", {
				scope: $rootScope,
				animation: "slide-in-up",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.popShowRoomMapsWindow = model;
				if(ifShowImmediately){
					$rootScope.popShowRoomMapsWindow.show();
				}
			});
		}
		
		$rootScope.lpbcx_fwxx = function(roomid,buildid){
			if(roomid && typeof roomid == "number"){
				var requestBody = {_module:'TT',_method:'lpbcx_getFwMaps',bldroomid:roomid,buildid:buildid,roleno:g_getRoleno(),orgno:g_getOrgno(),orgtypeno:g_getOrgTypeno()};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data){
						if(!data.jbsxMap){
							$rootScope.mttAlert('获取初始化房屋数据失败！');
							return false;
						}
						$rootScope.roomDataObj = data;
						$rootScope.init_lpbcxShowRoomMapsWindow(true);
					}else{
						$rootScope.mttAlert('获取初始化房屋数据失败！');
					}
		        })
			}else{
				$rootScope.mttAlert("展示错误：房屋序号错误，没有可以展示的房屋数据");
				return false;
			}
			
	    };
	    
	    $rootScope.lpcx_showRoomMapsWindow_change= function(index){
	    	var clickYqObj = $(".popover-backdrop.active .tab .tab-item").eq(index);
	    	$(clickYqObj).addClass("actived").siblings().removeClass("actived");
	    	var clickYqCardsObj = $(".popover-backdrop.active .tab-cont").css("display", "none").eq(index);
	    	$(clickYqCardsObj).css("display", "block");
	    };
	    
		
	    $rootScope.lpcx_hideRoomMapsWindow = function(){
	    	$rootScope.popShowRoomMapsWindow.hide();
	    };
	    
	  //全屏展示合同模板Map信息，pop类型的页面初始化及显示
		$rootScope.initShowHTMBWindow = function (ifShowImmediately,businesstype){
			var tempHtml;
			if(businesstype == 1){
				tempHtml = "p_showHTMB1.html";
			}else{
				tempHtml = "p_showHTMB3.html";
			}
			$ionicPopover.fromTemplateUrl(tempHtml, {
				scope: $rootScope,
				animation: "slide-in-up",
				backdropClickToClose: true
			}).then(function(model) {
				$rootScope.popShowHTMBWindow = model;
				if(ifShowImmediately){
					$rootScope.popShowHTMBWindow.show();
				}
			});
		}
		
		$rootScope.p_showHTMBWindow = function(ctid,if_show_baocunButton){
			if(ctid && typeof ctid == "number"){
				var requestBody = {_module:'TT',_method:'htmb_getHtmbDetailMap',ctid:ctid};
				MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
					if(data){
						if(!data.BUILDID){
							$rootScope.mttAlert('获取初始化模板数据失败！');
							return false;
						}
						$rootScope.HTMBOBJ = data;
						$rootScope.HTMBOBJ.if_show_baocunButton = if_show_baocunButton;
						if(!$rootScope.HTMBOBJ.SURROGATE){
							$rootScope.HTMBOBJ.SURROGATE = "人民币";
						}
						if(!$rootScope.HTMBOBJ.GOVERNMENT){
							$rootScope.HTMBOBJ.GOVERNMENT = "人民币";
						}
						$rootScope.initShowHTMBWindow(true,$rootScope.HTMBOBJ.BUSINESSTYPE);
					}else{
						$rootScope.mttAlert('获取初始化模板数据失败！');
					}
		        })
			}else{
				$rootScope.mttAlert("展示错误：模板序号错误！");
				return false;
			}
	    };
	    
		$rootScope.p_showHTMBWindow_updDetail = function(){
			var requestBody = {_module:'TT',_method:'htmb_updHtmbDetail',ywObj:$rootScope.HTMBOBJ};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.mttAlert(PUBLIC_OPER_SUCCESS,function(){
						$rootScope.popShowHTMBWindow.hide();
					});
				}else if(data && data.type && data.type=="error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
				}
	        })
	    };
	    
	    //获取当前登录人信息
	    $rootScope.p_getLoginerInfo = function(){
			var requestBody = {_module:'TT',_method:'get_loginerInfo',roleno:g_getRoleno(),orgno:g_getOrgno(),phoneno:g_getLoginPhoneno(),loginname:g_getLoginName()};
			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
				if(data && data.type && data.type=="success"){
					$rootScope.JS_CURLOGINERINFO =data.content;
					$rootScope.JS_LOGINNAME =g_getLoginName();
				}else if(data && data.type && data.type == "error"){
					$rootScope.mttAlert(data.content);
				}else{
					$rootScope.mttAlert(PUBLIC_ERROR_NO_NETWORK);
				}
	        })
	    };
	   
	    $rootScope.p_hideHTMBWindow = function(){
	    	$rootScope.popShowHTMBWindow.hide();
	    };
	    
		//首页公共跳转路由，跳转时必须登录
		$rootScope.goRouteMustLogin = function(routeName){
			if(g_checkLogin()){
				$state.go(routeName);
			}else{
				$state.go("login");
			}
		}
		
		//公共跳转-意见反馈
		$rootScope.goyhfkMustLogin = function(){
			if(g_checkLogin()){
				if($rootScope._app_roleno == PUBLIC_JS_BZX_YJFKYWY || $rootScope._app_roleno == PUBLIC_JS_GLY){
					$state.go('yhyj_gly');
				}else{
					$state.go('yjfk_yh');
				}
			}else{
				$state.go("login");
			}
		}
		
		//公共跳转-业务审批
		$rootScope.goywsplistMustLogin = function(baseactivityid){
			$rootScope.queryObject = {id:"",ywbz:""};
			//注意清空业务大类名称以及步骤
			if(baseactivityid && typeof baseactivityid == "number" && baseactivityid > 0){
				if(g_checkLogin()){
					//判断是否具备操作此业务的权限,并且判断是否具有操作此业务流程步骤的权限,并初始化业务大类名称以及可以操作的流程步骤及步骤名称
		 			var requestBody = {_module:'TT',_method:'ywsp_initYwdlYwbz',role:$rootScope._app_roleno,baseactivityid:baseactivityid};
		 			MyFactoryNew.getHttpRequest( baseurl + '/bitsroad/rpcjsonWithRB', 'POST', null, requestBody).then(function (data) {
		 				if(data && data.type && data.type=="success"){
		 					$rootScope.ywspywbzList = data.content.ywbz;
		 					$rootScope.ywspywdlxs = data.content.ywdl.BASEACTIVITYNAME;
		 					$rootScope.ywsptsxx = data.content.tsxx;
		 					$rootScope.goRouteForBack('ywsp_list',{baseactivityid:baseactivityid},null)
		 				}else if(data && data.type && data.type=="error"){
		 					$rootScope.mttAlert(data.content);
		 				}else{
		 					$rootScope.mttAlert(PUBLIC_OPER_ERROR);
		 				}
		 	        })
				}else{
					$state.go("login");
				}				
			}else{
				$rootScope.mttAlert("此业务配置的业务大类不合法！");
			}
		}
		
		/**
		 * 公共签名跳转
		 */
		$rootScope.p_saveQianMing = function(bastatus,baseactivityid,realtypeid,ywbh,if_qianzi,flbhs){
			if("164802" == baseactivityid){//存量房网签-跳转前预处理
				if((!flbhs || "null" == flbhs) && realtypeid == 1648022 && $rootScope._app_roleno == PUBLIC_JS_44_YBCZY){
					flbhs = 99;
				}
			}
			$rootScope.goRouteForBack("qianMing",{'bastatus':bastatus,'baseactivityid':baseactivityid,'realtypeid':realtypeid,'ywbh':ywbh,'if_qianzi':if_qianzi,'flbhs':flbhs},null);
		}
		
		//浏览器访问，禁用返回键
        history.pushState(null, null, "");
        window.addEventListener('popstate', function () {
            history.pushState(null, null, "");
        });
		
	})
	
.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
})

.directive('myBlur', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('blur', function () {
                scope.$apply(attr.myBlur);
            });
        }
    };
})