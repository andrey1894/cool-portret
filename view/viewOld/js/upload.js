function isValidDate(y, m, d){
	var dt = new Date(y, m-1, d);
	return ((y == dt.getFullYear()) && ((m-1) == dt.getMonth()) && (d == dt.getDate()));
}



$("#myform").bind('submit', function(){
	$("#myModal .page_btn").hide();//возможность отправлять письмо
	var formData = new FormData();
	//загрузка файла
	jQuery.each($('#file')[0].files, function(i, file) {
		formData.append('file', file);
	});
	//загрузка полей
	formData.append('name', $('input#name').val());
	formData.append('phone', $('input#phone').val());
	formData.append('size', $('select#size').val());
	formData.append('size_title', $('select#size option:selected').text());
	formData.append('count_people', $('input#count_people').val());
	formData.append('city', $('select#city').val());
	formData.append('city_title', $('select#city option:selected').text());
	formData.append('date', $('input#date').val());
	formData.append('bla', 'sdf');


//валидация даты
var date = $('input#date').val()
if (date.length !== 10){
	$("#myModal .upload_info").text("Некорректная дата (день.месяц.год - 00.00.0000).");
	$("#myModal .page_btn").show();//возможность отправлять письмо
	return false;
}
var day = date[0] + "" + date[1];
var mount = date[3] + "" + date[4];
var year = date[6] + "" + date[7] + date[8] + date[9];

if (!isValidDate(year, mount, day)){
	$("#myModal .upload_info").text("Некорректная дата (день.месяц.год).");
	$("#myModal .page_btn").show();//возможность отправлять письмо
	return false;
}else{
	var dt = new Date(year, mount-1, day);
	var now = new Date();
	if (now > dt){
		$("#myModal .upload_info").text("Некорректная дата (день.месяц.год). В прошлое не доставляем.");
		$("#myModal .page_btn").show();//возможность отправлять письмо
		return false;
	}
}

	//валидация полей
	$.ajax({
		url: "./form.php",
		type: "POST",
		dataType : "json",
		cache: false,
		contentType: false,
		processData: false,
		data: formData,
		xhr: function(){
        var xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
        xhr.upload.addEventListener('progress', function(evt){ // добавляем обработчик события progress (onprogress)
          if(evt.lengthComputable) { // если известно количество байт
            // высчитываем процент загруженного
            var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
            // устанавливаем значение в атрибут value тега <progress>
            // и это же значение альтернативным текстом для браузеров, не поддерживающих <progress>
            // progressBar.val(percentComplete).text('Загружено ' + percentComplete + '%');
            if (percentComplete === 100){
            	$("#myModal2 .upload_info").text("Обработка информации....");
            }else{
            	$("#myModal .upload_info").text('Загружено ' + percentComplete + '%');
            }
          }
        }, false);
        return xhr;
      },
      success: function(data){
      	$("#myModal .page_btn").show();//возможность отправлять письмо
      	var data0 = data;
			//всё хорошо
			if (data0.rezult === true){

							//расчёт цены доставки EMS
							$.ajax({
								url: "http://emspost.ru/api/rest/",
								jsonp: "callback",
								dataType: "jsonp",
								// async: false,
								data: ({
									method:"ems.calculate",
									from: "city--saratov",
									to: $('select#city option:selected').val(),
									weight: "1.5",
									format: "json"
								}),
								success: function(data){
									if (data.rsp.stat == "ok"){

										var cost_ems = data.rsp.price;

										//Открытие второй формы. Заполнение полей
										isOpenModal = true;//открыть второе окно
										$("#myModal .upload_info").text("");
										$("#myModal").modal('hide');

										$("#myModal2 #cost_port").text(data0.cost);
										$("#myModal2 #name").text(data0.name);
										$("#myModal2 #phone").text(data0.phone);
										$("#myModal2 #size").text(data0.size_title);
										$("#myModal2 #count_people").text(data0.count_people);
										$("#myModal2 #city").text(data0.city_title);
										$("#myModal2 #date").text(data0.date);
										if (+data0.count_people === 1){
											$("#myModal2 #cost_add_people").hide();
										}else{
											$("#myModal2 #cost_add_people").show();
										}
										$("#myModal2 #cost_delivery").text(cost_ems);
										$("#myModal2 #cost_delivery_ems").text(cost_ems);
										$("#myModal2 #cost_delivery_post").text(data0.cost_post);

										$("#myModal2 #cost_order").text(+cost_ems+data0.cost);


										//Выбор доставки
										$("#myModal2 input[id=EMS]").change(function(){
											$("#myModal2 #cost_delivery").text(cost_ems);
											$("#myModal2 #info_post").hide();
											$("#myModal2 #cost_order").text(+cost_ems+data0.cost);
										});
										$("#myModal2 input[id=pickup]").change(function(){
											$("#myModal2 #cost_delivery").text("0");
											$("#myModal2 #info_post").hide();
											$("#myModal2 #cost_order").text(data0.cost);
										});
										$("#myModal2 input[id=post]").change(function(){
											$("#myModal2 #cost_delivery").text(data0.cost_post);
											$("#myModal2 #cost_order").text(+data0.cost_post+data0.cost);

											var dt = new Date(year, mount-1, day);
											dt.setDate(dt.getDate()-21);
											var now = new Date();
											if (now > dt){
												$("#myModal2 #info_post").show();
											}else{
												$("#myModal2 #info_post").hide();
											}
										});

									}else{
										$("#myModal .upload_info").text("Ошибка расчёта цены. Проверьте данные");
									}
								},
								error: function(){
									$("#myModal .upload_info").text("Неизвестная ошибка. Пожалуйста, повторите попытку или свяжитесь с нами.");
								}
							});


							$("#myModal .upload_info").text("Расчёт цены доставки....");

			//Некорректный ввод
		}else{
			$("#myModal .upload_info").text(data.message);
		}

	},
	error: function(){
		$("#myModal .page_btn").show();//возможность отправлять письмо
		$("#myModal .upload_info").text("Неизвестная ошибка! Пожалуйста, повторите попытку или свяжитесь с нами.");
	}

});

$("#myModal .upload_info").text("Загрузка изображения. Обработка информации....");
return false;
});






$("#myform2").bind('submit', function(){
	// var formData2 = new FormData();
	// //загрузка полей
	// formData2.append('delivery', $('input[name=delivery]:checked').val());
	// formData2.append('add_order', 'add');
	var msg = {
		"delivery": $('input[name=delivery]:checked').val(),
		"delivery_text": $('input[name=delivery]:checked').parent().text().split(' ')[0],
		'add_order': 'add'};
		// msg.append('delivery', $('input[name=delivery]:checked').val());
		$.ajax({
			type: 'POST',
			url: 'function.php',
			data: msg,
			success: function(data) {
				if (data.search('"rezult":"ok"')!=-1){
					$("#myModal2 .upload_info").text('Письмо отослано');
					$("#myModal2 .page_btn").hide();
				}else{
					$("#myModal2 .upload_info").text('Письмо не отослано. Повторите попытку или свяжитесь с нами.');
				}
			},
			error:  function(xhr, str){
			// alert('Возникла ошибка: ' + xhr.responseCode);
			$("#myModal2 .upload_info").text("Неизвестная ошибка. Повторите попытку или свяжитесь с нами.");
		}
	});

		$("#myModal2 .upload_info").text("Обработка информации....");
		return false;
	});


