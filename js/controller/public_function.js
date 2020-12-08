var PUBLIC_ERROR_NETWORK = "网络异常请稍后重试！";
var PUBLIC_ERROR_NOTENOUGHPICS = "证件照片未上传或上传数量不足！";
var PUBLIC_ERROR_NOTENOUGH_QIANZI_1 = "操作失败：您还未签字！";
var PUBLIC_ERROR_NOTENOUGH_QIANZI_2 = "操作失败：您还未签字或签字数量不足！";
var PUBLIC_ERROR_QUERYPICS = "查询证照信息错误！";
//首页才能使用这个提示语【PUBLIC_ERROR_NO_NETWORK】
var PUBLIC_ERROR_NO_NETWORK = "请确认您的手机可以访问互联网，并在获得网络连接后关闭并重新打开APP！";
var PUBLIC_ERROR_UPDATING = "服务器已关闭访问，正在更新升级服务，请稍后再试！";

var PUBLIC_OPER_SUCCESS = "操作成功！";
var PUBLIC_OPER_SUCCESS_AND_REFRESH = "操作成功，准备刷新！";
var PUBLIC_OPER_ERROR = "操作失败！";

var PUBLIC_CHECHERROR_IDCARD = "校验不通过：身份证号码不符合规范！";

//新加APP角色号时请不要使用990300至990400之间的号段,这些号段空余出来给业务审批的角色使用

var PUBLIC_PARAMS_NUMPERPAGE = 10;
var PUBLIC_JS_GLY = "101";
var PUBLIC_JS_XFZ = "109";
var PUBLIC_JS_SQWTR = "4101";
var PUBLIC_JS_42_YBCZY = "4101";
var PUBLIC_JS_44_YBCZY = "4101";
var PUBLIC_JS_BZX_YSXKXJYWY = "990201";
var PUBLIC_JS_BZX_XSBAYWY = "990202";
var PUBLIC_JS_BZX_YJFKYWY = "990203";
var PUBLIC_JS_BZX_DWZCYWY = "990204";
var PUBLIC_JS_BZX_FYHYYWY = "990205";
var PUBLIC_JS_BZX_RGSMRZY = "990206";
var PUBLIC_JS_BZX_DACXYWY = "990207";
var PUBLIC_JS_BZX_BBXXCXY = "990208";
var PUBLIC_JS_BZX_YJSPY = "990301";
var PUBLIC_JS_BZX_EJSPY = "990302";
var PUBLIC_JS_BZX_SJSPY = "990303";

var PUBLIC_ORGTYPENO_QTZZ = "46";

var PUBLIC_INITORGREG = [{1: 1, SJZDBCZ: "46-"+PUBLIC_JS_XFZ+"-"+PUBLIC_ORGTYPENO_QTZZ, SJZDXSZ: "消费者"}];

function g_init_params(obj){
	obj.PUBLIC_JS_GLY = "101";
	obj.PUBLIC_JS_XFZ = "109";
	obj.PUBLIC_JS_SQWTR = "4101";
	obj.PUBLIC_JS_42_YBCZY = "4101";
	obj.PUBLIC_JS_44_YBCZY = "4101";
	obj.PUBLIC_JS_BZX_YSXKXJYWY = "990201";
	obj.PUBLIC_JS_BZX_XSBAYWY = "990202";
	obj.PUBLIC_JS_BZX_YJFKYWY = "990203";
	obj.PUBLIC_JS_BZX_DWZCYWY = "990204";
	obj.PUBLIC_JS_BZX_FYHYYWY = "990205";
	obj.PUBLIC_JS_BZX_RGSMRZY = "990206";
	obj.PUBLIC_JS_BZX_DACXYWY = "990207";
	obj.PUBLIC_JS_BZX_BBXXCXY = "990208";
	obj.PUBLIC_JS_BZX_YJSPY = "990301";
	obj.PUBLIC_JS_BZX_EJSPY = "990302";
	obj.PUBLIC_JS_BZX_SJSPY = "990303";
}

/**
 * 公共校验是否登录
 * @returns {Boolean}
 */
function g_checkLogin(){
	if(window.localStorage.getItem("firstname")){
		return true;
	}else{
		return false;
	}
}

/**
 * 校验是否json对象
 * @param obj
 * @returns {Boolean}
 */
function g_checkIsJson(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length; 
	return isjson;
}

function g_getRBObj_tjht(id,flowid,businessID,stanID,realTypeID,svalue){
	var requestBody = new Object();
	requestBody = {_module:'TT',_method:'elevatorFlowNextOrBack',id:id+"",flowid:flowid+"",businessID:businessID+"",stanID:stanID+"",realTypeID:realTypeID+"",svalue:svalue+""};
	return requestBody;
}

function g_getRBObj_savePeopleAddPhone(id,rightpeopletype,rightpeopleid,address,phoneno,stanid){
	var requestBody = new Object();
	requestBody = {_module:'TT',_method:'savePeopleAddPhone',id:id+"",rightpeopletype:rightpeopletype+"",rightpeopleid:rightpeopleid+"",address:address+"",phoneno:phoneno+"",stanid:stanid+""};
	return requestBody;
}

function g_getLoginName(){
	return window.localStorage.getItem("firstname");
}

function g_getLoginIdno(){
	return window.localStorage.getItem("idno");
}

function g_getLoginPhoneno(){
	return window.localStorage.getItem("phoneno");
}

function g_getOrgno(){
	return window.localStorage.getItem("orgno");
}

function g_getOrgTypeno(){
	return window.localStorage.getItem("orgtypeno");
}

function g_getRoleno(){
	return window.localStorage.getItem("roleno");
}

function g_getTokenNTTAPP(){
	return window.localStorage.getItem("token_nttapp");
}

function g_getSYS_NTTAPP_backURL(routerName){
	return window.localStorage.getItem("SYS_NTTAPP_backURL_"+routerName);
}

function g_params_NumPerPage(){
	return PUBLIC_PARAMS_NUMPERPAGE;
}

function g_set_params_NumPerPage(inNum){
	PUBLIC_PARAMS_NUMPERPAGE = inNum;
}

/*删除数组中的某一个对象
_arr:数组
_obj:需删除的对象
*/
function g_clfwq_removeArray(_arr, _obj) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].RN == _obj.RN) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}
//通过身份证号码计算年龄
function GetAge(identityCard) {
    var len = (identityCard + "").length;
    if (len == 0) {
        return 0;
    } else {
        if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
        {
            return 0;
        }
    }
    var strBirthday = "";
    if (len == 18){//处理18位的身份证号码从号码中得到生日和性别代码
        strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
    }
    if (len == 15){
        strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
    }
    //时间字符串里，必须是“/”
    var birthDate = new Date(strBirthday);
    var nowDateTime = new Date();
    var age = nowDateTime.getFullYear() - birthDate.getFullYear();
    //再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
    if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

/*删除ng-repeat所关联的数组中的某一个对象
_arr:数组
_hashKey:需删除的对象的hashKey
*/
function g_ngrepeat_removeArray(_arr, _hashKey) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].$$hashKey == _hashKey) {
            if (i == 0) {
                _arr.shift(); //删除并返回数组的第一个元素
                return _arr;
            }
            else if (i == length - 1) {
                _arr.pop();  //删除并返回数组的最后一个元素
                return _arr;
            }
            else {
                _arr.splice(i, 1); //删除下标为i的元素
                return _arr;
            }
        }
    }
}

/*获取ng-repeat所关联的数组中的某一个对象
_arr:数组
_hashKey:需获取的对象的hashKey
*/
function g_ngrepeat_get(_arr, _hashKey) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].$$hashKey == _hashKey) {
            return _arr[i];
        }
    }
    return null;
}

/*设置ng-repeat所关联的数组中的某一个对象某一属性特有其，其他对象该属性为相同otherValue
_arr:数组
_hashKey:某对象hashKey
colName:字段名
curValue:唯一特有值
otherValue:其他相同值
*/
function g_ngrepeat_setOnlyValue(_arr, _hashKey, colName, curValue, otherValue) {
    var length = _arr.length;
    for (var i = 0; i < length; i++) {
        if (_arr[i].$$hashKey == _hashKey) {
            _arr[i][colName] = curValue;
        } else {
        	_arr[i][colName] = otherValue;
        }
    }
    return null;
}

Date.prototype.format = function(format)
{
 var o = {
 "M+" : this.getMonth()+1, //month
 "d+" : this.getDate(),    //day
 "h+" : this.getHours(),   //hour
 "m+" : this.getMinutes(), //minute
 "s+" : this.getSeconds(), //second
 "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
 "S" : this.getMilliseconds() //millisecond
 }
 if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
 (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 for(var k in o)if(new RegExp("("+ k +")").test(format))
 format = format.replace(RegExp.$1,
 RegExp.$1.length==1 ? o[k] :
 ("00"+ o[k]).substr((""+ o[k]).length));
 return format;
}


/**
 * 时间转为秒
 * @param time 时间(00:00:00)
 * @returns {string} 时间戳（单位：秒）
 */
function time_to_sec (time) {
    var s = '';

    var hour = time.split(':')[0];
    var min = time.split(':')[1];
    var sec = time.split(':')[2];

    s = Number(hour*3600) + Number(min*60) + Number(sec);

    return s;
};

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
var sec_to_time = function(s) {
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        if(hour < 10) {
            t = '0'+ hour + ":";
        } else {
            t = hour + ":";
        }

        if(min < 10){t += "0";}
        t += min + ":";
        if(sec < 10){t += "0";}
        t += sec.toFixed(0);
    }
    return t;
}

/**【g_】开头为公共用到的方法
 * 日期组件
 * @param selector 选择器
 * @param minDate 【可选】限定最近日期，0：当天开始；1：下一天开始
 * @param maxDate 【可选】限定最远日期，0：当天开始；1：下一天开始
 */
function g_dateSelect(selector, minDate, maxDate){
	if(null == minDate){
		laydate.render({
		    elem: selector
		  });
	}else if(null == maxDate){
		laydate.render({
		    elem: selector
		    ,min: minDate
		  });
	}else{
		laydate.render({
			elem: selector
			,min: minDate
			,max: maxDate
		});
	}
}

/**【g_】开头为公共用到的方法
 * 日期的其他显示格式组件，默认年月显示
 * @param selector 选择器
 * @param _type 显示类型【年选择器:'year';年月选择器:'month';时间选择器:'time',日期时间选择器:'datetime'】
 */
function g_dateSelectType(selector, _type){
	if(!_type){
		_type = "month";
	}
	laydate.render({
	    elem: selector,
	    type: _type
	});
}

/**【g_】开头为公共用到的方法
 * 时间组件
 * @param selector 选择器
 * @param minTime 限定最小时间
 * @param maxTime 限定最大时间
 */
function g_timeSelect(selector, minTime, maxTime){
	//限定可选时间
    laydate.render({
      elem: selector
      ,type: 'time'
      ,min: minTime
      ,max: maxTime
      ,btns: ['clear', 'confirm']
    });
}

/**
 * 左右去空格判断是否为空
 */
function g_checkIsNull(value,domName){
	if(domName && domName == "select"){
		if(value == "?"){//包含ng-options的select元素未选中时，值为【?】
			return true;
		}
	}
	if(value){
		var val = $.trim(value);
		if(val == ""){
			return true
		}else{
			return false;
		}
	}else{
		return true;
	}
}

/**
 * 某ID区域下包含某样式_className的输入型元素(input、select)不能为空校验(备注：若是还包含canBeNull样式，则可以为空，跳过该元素)
 * @param obj：传入$rootScope
 * @param domId：dom元素的ID
 * @param _className：样式名
 * @returns {Boolean}
 */
function g_checkNullByClass(obj,domId,_className){
	var have_null_flag = false;
	var className = "checkNull";
	if(_className){
		className = _className;
	}
	$("[id='" + domId + "'] ." + className).each(function(i,item){
		if($(item).hasClass("canBeNull")){
			return true;//进入下次循环
		}
		var value = $(item).val();
		var null_flag = false;
		if($(item)[0].tagName == "INPUT"){
			null_flag = g_checkIsNull(value);
		}else if($(item)[0].tagName == "SELECT"){
			if(!value || "?" == value){
				null_flag = true;
			}
		}
		if(null_flag){
			var alertDesc = $(item).attr("alert_null");
			if(alertDesc){
				obj.mttAlert(alertDesc);
			}else{
				var labelDom = $(item).siblings("label");
				var labelText = labelDom.text();
				labelText = labelText.replace(":","");
				labelText = labelText.replace("：","");
				if(labelText){
					labelText = labelText + "不能为空！";
					obj.mttAlert(labelText);
				}else{
					obj.mttAlert("校验为空异常：未找到元素标签label名称！");
				}
			}
			have_null_flag = true;
			return false;//退出循环
		}
	});
	return have_null_flag;
}

//检查号码是否符合规范，包括长度，类型  
function g_isCardNo(card)  {
    if(g_checkIsNull(card)){
    	return false;
    }
	//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/; 
    console.log("身份证校验="+reg.test(card));
    card = card.toUpperCase();
    if(reg.test(card) === false){  
        return false;  
    }
	//验证前2位，城市符合
	var aCity = {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江 ",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	};
	if (aCity[parseInt(card.substr(0, 2))] == null) {
		return false;
	}

	//下面分别分析出生日期和校验位
	var len, re;
	len = card.length;
	if (len == 15) {
		re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
		var arrSplit = card.match(re); //检查生日日期是否正确
		var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			return false;
		} else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。       
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
			for (i = 0; i < 17; i++) {
				nTemp += card.substr(i, 1) * arrInt[i];
			}
			card += arrCh[nTemp % 11];
			return true;
		}
	}
	if (len == 18) {
		re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
		var arrSplit = card.match(re); //检查生日日期是否正确
		var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
		var bGoodDay;
		bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2]))
				&& ((dtmBirth.getMonth() + 1) == Number(arrSplit[3]))
				&& (dtmBirth.getDate() == Number(arrSplit[4]));
		if (!bGoodDay) {
			//alert(dtmBirth.getYear());
			//alert(arrSplit[2]);
			return false;
		} else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
			var valnum;
			var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			var nTemp = 0, i;
			for (i = 0; i < 17; i++) {
				nTemp += card.substr(i, 1) * arrInt[i];
			}
			valnum = arrCh[nTemp % 11];
			if (valnum != card.substr(17, 1)) {
				return false;
			}
			return true;
		}
	}    
    
    return true;  
};

/**【g_】开头为公共用到的方法
 * 拍摄一张照片并将返回base64照片数据存储到$scope.imageData中
 * @param $rootScope
 * @param $scope
 * @param $cordovaCamera
 * @param callback 后续操作函数
 */
function g_takePhoto($rootScope, $scope, $cordovaCamera, callback){
	if(callback === undefined || typeof callback != 'function'){
		$rootScope.mttAlert('调用takePhoto拍照函数错误：必须有回调函数!');
		return false;
	}
	if ("undefined" != typeof Camera) {
		console.log("手机端，调用拍照功能");
		var options = {
				quality: 80,
				destinationType: Camera.DestinationType.DATA_URL,
				sourceType: Camera.PictureSourceType.CAMERA,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: CameraPopoverOptions,
				targetWidth: 768,                                        //照片宽度
		        targetHeight: 1024,                                       //照片高度				
				saveToPhotoAlbum: false,
				correctOrientation: true
		};
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.imageData = imageData;
			if(callback !== undefined && typeof callback == 'function'){
				callback();
			}
		}, function(err) {
			console.log("取消拍照");
		});
	} else {
		console.log("非手机端，不再使用本方法");
	}
}


/**【g_】开头为公共用到的方法
 * 相册选择照片并将返回base64照片数据存储到$scope.imageData中
 * @param $rootScope
 * @param $scope
 * @param $cordovaCamera
 * @param callback 后续操作函数
 */
function g_takeAndSelectPhoto($rootScope, $scope, $cordovaCamera, callback){
	if(callback === undefined || typeof callback != 'function'){
		$rootScope.mttAlert('调用g_takeAndSelectPhoto拍照函数错误：必须有回调函数!');
		return false;
	}
	if ("undefined" != typeof Camera) {
		console.log("手机端，调用拍照功能");
		var options = {
				quality: 80,
				destinationType: Camera.DestinationType.DATA_URL,
				//重点说一下 sourceType，这个参数设置为 PHOTOLIBRARY 就会从相册取图，设置为 CAMERA 会拍照，设置为 SAVEDPHOTOALBUM 会保存图片。
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
				encodingType: Camera.EncodingType.JPEG,
				popoverOptions: CameraPopoverOptions,
				targetWidth: 768,                                        //照片宽度
		        targetHeight: 1024,                                       //照片高度				
				saveToPhotoAlbum: false,
				correctOrientation: true
		};
		$cordovaCamera.getPicture(options).then(function(imageData) {
			$scope.imageData = imageData;
			if(callback !== undefined && typeof callback == 'function'){
				callback();
			}
		}, function(err) {
			console.log("取消拍照");
		});
	} else {
		console.log("非手机端，不再使用本方法");
	}
}

//获取图片旋转的角度
function g_getOrientation(file, callback) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = function(e) {
        var view = new DataView(e.target.result);
        if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
        var length = view.byteLength, offset = 2;
        while (offset < length) {
            var marker = view.getUint16(offset, false);
            offset += 2;
            if (marker == 0xFFE1) {
                if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
                var little = view.getUint16(offset += 6, false) == 0x4949;
                offset += view.getUint32(offset + 4, little);
                var tags = view.getUint16(offset, little);
                offset += 2;
                for (var i = 0; i < tags; i++)
                    if (view.getUint16(offset + (i * 12), little) == 0x0112)
                        return callback(view.getUint16(offset + (i * 12) + 8, little));
            }
            else if ((marker & 0xFF00) != 0xFF00) break;
            else offset += view.getUint16(offset, false);
        }
        return callback(-1);
    };
}

//将图片旋转到正确的角度
function g_resetOrientation(srcBase64, srcOrientation, callback) {
    if (srcOrientation == 1){//没旋转，直接压缩并返回
		var imgCompress = new Image;
		imgCompress.src = srcBase64;
		imgCompress.onload = function () {
			var cvs = document.createElement('canvas'),
			ctx = cvs.getContext('2d');
//	        console.log("没旋转，压缩前width="+imgCompress.width);
//	        console.log("没旋转，压缩前height="+imgCompress.height);			
			imgCompress.width  = 768;
			imgCompress.height = 1024;
			cvs.width = imgCompress.width;
			cvs.height = imgCompress.height;
			ctx.clearRect(0, 0, cvs.width, cvs.height);
			ctx.drawImage(imgCompress, 0, 0, imgCompress.width, imgCompress.height);
	        // export base64
	        callback(cvs.toDataURL('image/jpeg', 0.6));
	    };    	
    } else {//处理旋转再压缩返回
    	var img = new Image();
    	img.src = srcBase64;
    	img.onload = function() {
    		var width = img.width,
    		height = img.height,
    		canvas = document.createElement('canvas'),
    		ctx = canvas.getContext("2d");
//    		console.log("旋转前width="+width);
//    		console.log("旋转前height="+height);
    		// set proper canvas dimensions before transform & export
    		canvas.width = width;
    		canvas.height = height;
    		if ([5,6,7,8].indexOf(srcOrientation) > -1) {
    			canvas.width = height;
    			canvas.height = width;
    		} else {
    			canvas.width = width;
    			canvas.height = height;
    		}
    		// transform context before drawing image
    		switch (srcOrientation) {
    		case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
    		case 3: ctx.transform(-1, 0, 0, -1, width, height ); break;
    		case 4: ctx.transform(1, 0, 0, -1, 0, height ); break;
    		case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
    		case 6: ctx.transform(0, 1, -1, 0, height , 0); break;
    		case 7: ctx.transform(0, -1, -1, 0, height , width); break;
    		case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
    		default: ctx.transform(1, 0, 0, 1, 0, 0);
    		}
    		// draw image
    		ctx.drawImage(img, 0, 0);
    		// transformed base64
    		var resultBase64 = canvas.toDataURL('image/jpeg');
    		//compress image
    		var imgCompress = new Image;
    		imgCompress.src = resultBase64;
    		imgCompress.onload = function () {
    			var cvs = document.createElement('canvas'),
    			ctx = cvs.getContext('2d');
//    			console.log("压缩前width="+imgCompress.width);
//    			console.log("压缩前height="+imgCompress.height);			
    			imgCompress.width  = 768;
    			imgCompress.height = 1024;
    			cvs.width = imgCompress.width;
    			cvs.height = imgCompress.height;
    			ctx.clearRect(0, 0, cvs.width, cvs.height);
    			ctx.drawImage(imgCompress, 0, 0, imgCompress.width, imgCompress.height);
    			// export base64
    			callback(cvs.toDataURL('image/jpeg', 0.6));
    		};
    	};
    }
};

/**【g_】开头为公共用到的方法
 * 处理一张WEB端拍摄或选择的照片，并将返回base64照片数据存储到$scope.imageData中
 * @param $rootScope
 * @param $scope
 * @param callback 后续操作函数
 */
function g_WEB_dealPhoto($rootScope, $scope, callback){
	
	$rootScope.showLoading("请稍后,图像处理中……");
	
	if(callback === undefined || typeof callback != 'function'){
		$rootScope.mttAlert('调用g_WEB_dealPhoto拍照函数错误：必须有回调函数!');
		return false;
	}
    var files = event.target.files,file;
    if (files && files.length > 0) {
        file = files[0];
        // 获取图片旋转角度
        g_getOrientation(file, function (orientation) {
//        	console.log("【旋转值orientation】="+orientation);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(evt){
                var base64 = evt.target.result;
                var base64Image = base64.substring(base64.indexOf(',') + 1);
                // 将图片旋转到正确的角度，并压缩。
                g_resetOrientation(base64, orientation, function (resultBase64) {
    	            $scope.imageData = resultBase64.substring(resultBase64.indexOf(',') + 1);
      	           
    	            $rootScope.hideLoading();
      				
    	            if(callback !== undefined && typeof callback == 'function'){
      					callback();
      				} 
                });
            }
        });        
    }
}

/**
 * 判断是否只是数字
 */
function g_checkIsNum(value){
	var reg = /^[0-9]+$/;
	if(reg.test(value)){
		return true;
	}else{
		return false;
	}
}

/**
 * 校验密码是否满足要求
 */
function g_checkPwd(value,value2){
	if(value){
		var val = $.trim(value);
		if(val == ""){
			return "密码不能为空！";
		}else{
			if(value.length < 8 || value.length > 15 ){
				return "密码长度应该为8-15位！";
			}
			var reg = /^[0-9a-zA-Z]+$/
			if(!reg.test(value)){
				return "密码只能是英文字母和数字的组合，不要使用其它特殊字符！";
			}
			var reg1 = /^(?=.*\d)(?=.*[a-zA-Z]).{8,15}$/;
			if(!reg1.test(value)){
				return "密码至少包含一个英文字母、一个数字！";
			}
			//验证两次输入的密码是否一致且不能为空
			if(!value2 || value !== value2){
				return "两次输入的密码不一致!";
			}
			return true;
		}
	}else{
		return "密码不能为空！";
	}
}

/**
 * 数字保留两位小数
 */
function returnFloat(value){
	 var value=Math.round(parseFloat(value)*100)/100;
	 var xsd=value.toString().split(".");
	 if(xsd.length==1){
		 value=value.toString()+".00";
		 return value;
	 }
	 if(xsd.length>1){
		 if(xsd[1].length<2){
			 value=value.toString()+"0";
		 }
		 return value;
	 }
}