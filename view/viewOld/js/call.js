$('#call_form').bind('submit', function(){
    
    yaCounter45412398.reachGoal('call1');
    console.log('call1');

	var value = $('#call_form #phone').val();
	var num = value.replace(/\D+/g,"");
	if (num.length !== 11){
		$('#call_form button').addClass('err');
		return false;
	}

	var phone = '+'+num[0]+' '+num[1]+num[2]+num[3]+' '+num[4]+num[5]+num[6]+' '+num[7]+num[8]+num[9]+num[10];
	$('#call_form #phone').val(phone);

	if (phone.replace(/\+7 \d{3} \d{3} \d{4}/,'').length){
		$('#call_form button').addClass('err');
		return false;
	}

	var msg   = $('#call_form').serialize();
	$.ajax({
		type: 'POST',
		url: 'function.php?call_form',
		data: msg,
		success: function(data) {
			$('#call_form button').addClass('ok');
			yaCounter45412398.reachGoal('call2');
			console.log('call2');
		},
		error:  function(xhr, str){
		    $('#call_form button').addClass('err');
// 			alert('ааОаЗаНаИаКаЛаА аОбаИаБаКаА: ' + xhr.responseCode);
		}
	});
	return false;
});


$('#call_form #phone').keyup(function(){
	$('#call_form button').removeClass();
	var value = $('#call_form #phone').val();
	if (value.length > 3){
		if (value[value.length-1] < '0' || value[value.length-1] > '9'){
			$('#call_form #phone').val(value.substring(0, value.length - 1));
		}else
		if ((value.length === 7 && value[value.length - 1] !== ' ') || (value.length === 11 && value[value.length - 1] !== ' ')){
			$('#call_form #phone').val(value.substring(0, value.length - 1) + ' ' + value[value.length - 1]);
		}
		if (value.length > 15){
			$('#call_form #phone').val(value.substring(0, value.length - 1));
		}
	}else
	$('#call_form #phone').val('+7 ');
});