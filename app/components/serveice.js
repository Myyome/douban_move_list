(function (angular) {
	'use strict';
	/**
	* jsonpServer Module
	*
	* Description
	*/
	angular.module('serveice', [])
		.service('jsonpServer', ['$document','$window',function($document,$window){
			this.jsonp=function (url,data,callback) {
				//拼接URL和data和callback
				//https://api.douban.com/v2/movie/in_theaters?start=0&count=10&callback=fnc,
				var urldata=url+'?';
				for(var item in data){
					urldata+=item+'='+data[item]+'&';
				}
				var callfncName='my_jsonfnc'+Math.random().toString().replace('.','0');
				urldata+='callback'+'='+callfncName;
				//暴露callback函数
				$window[callfncName]=function(data) {
					callback(data);
					$document[0].body.removeChild(script);
				}
				//创建script节点
				var script=$document[0].createElement('script');
				script.src=urldata;
				$document[0].body.appendChild(script);

				
			}
		}])
})(angular);