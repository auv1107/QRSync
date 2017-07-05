var device_id;
var QRCODE_API = "http://qr.liantu.com/api.php?text=";

$(document).ready(function(){
	if (!localStorage.QRSync_device_id) {
		var random = (new Date()).getTime() + Math.random();
		device_id  = $.base64.encode(random);
		localStorage.QRSync_device_id = device_id;
	} else {
		device_id = localStorage.QRSync_device_id;
	}
	

	$('#qrcode').attr('src', QRCODE_API + device_id);
});