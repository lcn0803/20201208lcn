angular.module('factorys', ['ionic', 'highcharts-ng', 'ngCordova'])

	.factory('testFactory', function() {
		//定义factory返回对象
		var myServices = {};
		//定义参数对象
		var myObject = {};

		/**
		 * 定义传递数据的set函数
		 * @param {type} xxx
		 * @returns {*}
		 * @private
		 */
		var _set = function(data) {
			myObject = data;
		};

		/**
		 * 定义获取数据的get函数
		 * @param {type} xxx
		 * @returns {*}
		 * @private
		 */
		var _get = function() {
			return myObject;
		};

		// Public APIs
		myServices.set = _set;
		myServices.get = _get;

		// 在controller中通过调set()和get()方法可实现提交或获取参数的功能
		return myServices;
	})