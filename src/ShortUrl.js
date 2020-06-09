/**
 * 长链接 <=> 短链接
 *
 * @author frostbelt
 */

// API 有问题，关注 https://jsboxbbs.com/d/630-http-shorten

// 带多个参数的 url，如
// https://www.baidu.com/s?wd=1&rsv_spt=1&rsv_iqid=0xa1a665160001ffa4&issp=1&f=8&rsv_bp=0&rsv_idx=2&ie=utf-8&rqlang=&tn=baiduhome_pg&ch=&rsv_enter=1&inputT=371
// 生成的短链接是：
// http://t.cn/R4iv0CL
// 还原后是：
// https://www.baidu.com/s?wd=1

// 只剩下一个参数，其它参数都丢了
// 自测换其它的 url 也有同样的问题

$ui.render({
	props: {
		title: '短链接',
	},
	views: [
		{
			type: 'input',
			props: {
				placeholder: 'Type url here...',
			},
			layout: function (make) {
				make.top.left.right.inset(10);
				make.height.equalTo(32);
			},
		},
		{
			type: 'button',
			props: {
				id: 'btn-short',
				title: '生成短链接',
			},
			layout: function (make) {
				make.left.inset(30);
				make.width.equalTo(150);
				make.top.equalTo($('input').bottom).offset(10);
			},
			events: {
				tapped: function () {
					App.makeShort();
				},
			},
		},
		{
			type: 'button',
			props: {
				id: 'btn-long',
				title: '还原长链接',
			},
			layout: function (make) {
				make.right.inset(30);
				make.width.equalTo(150);
				make.top.equalTo($('input').bottom).offset(10);
			},
			events: {
				tapped: function () {
					App.makeLong();
				},
			},
		},
	],
});

var App = {
	makeShort: function () {
		var url = $('input').text;
		if (!url) {
			$ui.toast('请输入链接');
			return;
		}

		$http.shorten({
			url: url,
			handler: function (url) {
				$clipboard.text = url;
				$ui.toast('已复制短链接');
			},
		});
	},
	makeLong: function () {
		var url = $('input').text;
		if (!url) {
			$ui.toast('请输入链接');
			return;
		}

		$http.lengthen({
			url: url,
			handler: function (url) {
				$clipboard.text = url;
				$ui.toast('已复制长链接');
			},
		});
	},
};
