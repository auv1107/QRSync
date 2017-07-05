var device_id;
var QRCODE_API = "http://qr.liantu.com/api.php?text=";
var group_item_list = ['list-group-item-success', 'list-group-item-info', 'list-group-item-']

var APP_ID = 'l33Bu9REpWqskyKM9MF7w0cE-gzGzoHsz';
var APP_KEY = 'vw5bONSEWl1d5c2twEPyGqes';

AV.init({
	appId: APP_ID,
	appKey: APP_KEY
});

var ttt;

var app = new Vue({
	el: '#app',
	data: {
		seen: false,
		texts: [],
		cls: [
		'list-group-item-success',
		'list-group-item-info',
		'list-group-item-warning',
		'list-group-item-danger'
		]
	}
})

function loadData() {
	var query = new AV.Query('TextData');
	query.find().then(function (texts) {
		// 查询到商品后，在前端展示到相应的位置中。
		var data = []
		for (var key in texts) {
			var text = texts[key]
			var item = {
				text: text.get('text'),
				device_id: text.get('device_id'),
				update_at: text.get('updatedAt')
			}
			data[data.length] = item
		}
		app.$set('texts', data.reverse())
		app.$set('seen', true)
	}).catch(function(error) {
		alert(JSON.stringify(error));
	});
}

$(document).ready(function(){
	if (!localStorage.QRSync_device_id) {
		var random = (new Date()).getTime() + Math.random();
		device_id  = $.base64.encode(random);
		localStorage.QRSync_device_id = device_id;
	} else {
		device_id = localStorage.QRSync_device_id;
	}

	$('#qrcode').attr('src', QRCODE_API + device_id);

	loadData();
});