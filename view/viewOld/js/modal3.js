// 'use strict';
var isOpenModalColors = false;//открывать ли окно при закрытии другого
var isOpenModalCalcOrder = false;//открывать ли окно при закрытии другого
var isSketch = false;//на эскиз
var portret = {
	size: 0,
	size_title: 0,
	max_people: 0,
	count_colors: 0,
	cost: 0
}

$('#myModalOrder').on('show.bs.modal', function (event) {

	// console.log(isShortModalOrder);

	var button = $(event.relatedTarget);
	var content = button.data('content2');
	if (content) { isSketch = true; }
	content = content ? content : 'заказать';
	$(this).find('#btn_mymodal p').text(content);

	isOpenModalColors = false;//обнуление переменной
	isOpenModalCalcOrder = false;//обнуление переменной
	$("#myModalOrder .form_info").text('');
	$("#myModalOrder .page_btn").show();
	var src = $('#myModalOrder #file_upload #foto').attr('src');
	if (!src) {
		$('#myModalOrder #file_upload #foto').attr('src', function () {
			return $(this).data('src');
		});
		$('#myModalColors .color_block img').attr('src', function () {
			return $(this).data('src');
		});
	}

	var where_send = localStorage.getItem('where_send');
	if (where_send) {
		where_send = JSON.parse(where_send);

		$("#myModalOrder .where_send input[name=optradio]").each(function () {
			if (where_send.where_send && where_send.where_send.indexOf($(this).val()) !== -1) {
				$(this).prop('checked', true);
				changeInput(this);
			}

		});
	} else {
		changeInput($("#myModalOrder .where_send input[name=optradio]:checked"));
	}



	/********************* Куда отправлять **********************/
	$("#myModalOrder input[id=mail]").change(function () {
		changeInput(this);
	});
	$("#myModalOrder input[id=viber]").change(function () {
		changeInput(this);
	});
	$("#myModalOrder input[id=whatsapp]").change(function () {
		changeInput(this);
	});
	$("#myModalOrder input[id=vk]").change(function () {
		changeInput(this);
	});

	function changeInput(input) {
		$('#myModalOrder .hidden_input').hide();
		$(input).parent().parent().find(".hidden_input").show();
	}


	/********************* Корректность ввода телефона **********************/
	$('#myModalOrder .phone').keyup(function () {
		$('#myModalOrder .phone').val(correctPhone($(this).val()));
	});


	function correctPhone(value) {
		// alert(value);
		if (value.length > 3) {
			if (value[value.length - 1] < '0' || value[value.length - 1] > '9') {
				return value.substring(0, value.length - 1);
			} else
				var phone = value;
			if ((value.length === 7 && value[value.length - 1] !== ' ') || (value.length === 11 && value[value.length - 1] !== ' ')) {
				phone = value.substring(0, value.length - 1) + ' ' + value[value.length - 1];
			}
			if (value.length > 15) {
				phone = value.substring(0, value.length - 1);
			}
			return phone;
		} else
			return '+7 ';
	}

	/********************* Подстановка сохранённых значений **********************/
	var name = localStorage.getItem('name');
	var phone = localStorage.getItem('phone');

	var portret0 = localStorage.getItem('portret');
	var size;
	if (portret0) {
		portret = JSON.parse(portret0);
		size = portret.size;
	}
	var count_people = localStorage.getItem('count_people');
	var city = localStorage.getItem('city');
	// var city_title = localStorage.getItem('city_title');
	var date = localStorage.getItem('date');

	if (name) $('#myModalOrder #name').val(name);
	if (phone) $('#myModalOrder .phone').val(phone);
	if (size) $('#myModalOrder #size option[value="' + size + '"]').prop('selected', true);
	// if (city) $('#myModalOrder #city option[value="'+city+'"]').prop('selected', true);
	if (city) $('#myModalOrder #city').val(city);
	if (count_people) $('#myModalOrder #count_people').val(count_people);
	if (date) $('#myModalOrder #datetimepicker3').val(date);




	//выбрать размер по кнопке
	var button = $(event.relatedTarget);
	var content = button.data('content') + " см";
	$('#myModalOrder div.form-group select#size option').each(function () {
		if ($(this).text().toLowerCase() == content.toLowerCase()) {
			$(this).prop('selected', 'selected');
			return;
		}
	});



	// 	}
	// });

});


/********************* Кнопка "ЗАКАЗАТЬ" **********************/
$("#myModalOrder").bind('submit', function () {
	// $("#myModalOrder .page_btn").hide();//возможность отправлять письмо
	$('#myModalOrder .form_info').text('');


	portret.size = $('#myModalOrder #size :selected').val();
	portret.size_title = $('#myModalOrder #size :selected').text();
	// var check_data = $('#myModalOrder #check_data').is(':checked');
	var check_terms = $('#myModalOrder #check_terms').is(':checked');
	var count_people = parseInt($('#myModalOrder #count_people').val());
	var name = $('#myModalOrder #name').val();
	var email = $('#myModalOrder #email').val();
	var phone = $('#myModalOrder #phone').val();
	var city = $('#myModalOrder #city').val();
	// var city_title = $('#myModalOrder #city :selected').text();
	var date = $('#myModalOrder .date').val();
	var social_network = $('input[name=optradio]:checked').val();
	var message = $("#myModalOrder #message").val();

	// if (!check_data) {
	// 	$('#myModalOrder .form_info').text('Подтверите согласие на обработку персональных данных.');
	// 	return false;
	// }
	if (!check_terms) {
		$('#myModalOrder .form_info').text('Примите условия пользовательского соглашения.');
		return false;
	}

	if (!count_people || isNaN(count_people) || count_people < 1) {
		$('#myModalOrder .form_info').text('Введите кол-во человек.');
	} else
		if (!name) {
			$('#myModalOrder .form_info').text('Введите имя.');
		}
		else if (!phone) {
			$('#myModalOrder .form_info').text('Введите телефон.');
		}
		else if (!email) {
			$('#myModalOrder .form_info').text('Введите E-mail.');
		}
		else if (!social_network) {
			$('#myModalOrder .form_info').text('Выберете, куда отправить эскиз.');
		}
		else if (!portret.size) {
			$('#myModalOrder .form_info').text('Выбирите размер портрета.');
		}
		else if (!count_people) {
			$('#myModalOrder .form_info').text('Введите количество человек.');
		}
		else if (!city) {
			$('#myModalOrder .form_info').text('Выбирите город доставки.');
		}
		else if (!date) {
			$('#myModalOrder .form_info').text('Введите дату доставки.');
		}

		else {
			localStorage.setItem('name', name);
			localStorage.setItem('city', city);
			localStorage.setItem('email', email);
			localStorage.setItem('message', message);
			// localStorage.setItem('city_title', city_title);

			var value = phone;
			var num = value.replace(/\D+/g, "");
			if (num.length !== 11) {
				$('#myModalOrder .form_info').text('Некорректный ввод телефона (+7 xxx xxx xxxx).');
				return false;
			}

			var value = '+' + num[0] + ' ' + num[1] + num[2] + num[3] + ' ' + num[4] + num[5] + num[6] + ' ' + num[7] + num[8] + num[9] + num[10];
			$('#call_form #phone').val(value);

			if (value.replace(/\+7 \d{3} \d{3} \d{4}/, '').length) {
				$('#myModalOrder .form_info').text('Некорректный ввод телефона (+7 xxx xxx xxxx).');
				return false;
			}

			localStorage.setItem('phone', phone);

			portret.max_people = $('#myModalOrder #size :selected').attr('data-max');



			var $where_send = $("#myModalOrder .where_send input[name=optradio]:checked");
			if (!$where_send) {
				$('#myModalOrder .form_info').text('Укажите куда отправить эскиз.');
			}
			else if (parseInt(portret.max_people) < parseInt(count_people)) {
				$('#myModalOrder .form_info').text('Максимальное кол-во человек для данного размера: ' + portret.max_people + '.');
			} else {

				localStorage.setItem('where_send', JSON.stringify({
					where_send: $($where_send).val(),
					val: $($where_send).val() === 'mail' ? email : phone
				}));

				localStorage.setItem('count_people', count_people);

				localStorage.setItem('date', date);

				$("#myModalOrder .page_btn").hide();


				$("#myModalOrder .form_info").text("Обработка информации....");
				var msg = {
					"size": portret.size
				};
				$.ajax({
					type: 'POST',
					url: 'info.php?info',
					data: msg,
					success: function (data) {
						var info = JSON.parse(data);
						if (info.result) {
							portret.size_title = info.size_title;
							portret.cost = info.cost;
							portret.count_colors = info.count_colors;
							localStorage.setItem('portret', JSON.stringify(portret));
							localStorage.setItem('cost_add_people', info.cost_add_people);
							// localStorage.setItem('cost_post', info.cost_post);


							// 	/*====================== Отправка на сервер =========================*/
							uploadData();

						} else {
							$("#myModalOrder .form_info").text("Неизвестная ошибка. Повторите попытку или свяжитесь с нами.");
							$("#myModalOrder .page_btn").show();
						}
					},
					error: function (xhr, str) {
						$("#myModalOrder .form_info").text("Неизвестная ошибка. Повторите попытку или свяжитесь с нами.");
						$("#myModalOrder .page_btn").show();
					}
				});

			}
		}
	return false;
});





function uploadData() {
	$('#myModalOrder .form_info').text("Обработка данных...");

	var formData = new FormData();
	//загрузка файла
	var i = 1;
	jQuery.each(finalFiles, function (i, file) {
		if (file) {
			formData.append('file' + (i++), file);
		}
	});

	// jQuery.each($('#myModalOrder #file2')[0].files, function(i, file) {
	// 	formData.append('file'+(i++), file);
	// });

	//загрузка полей
	var portret = JSON.parse(localStorage.getItem('portret'));
	formData.append('size', portret.size);
	formData.append('count_people', localStorage.getItem('count_people'));
	formData.append('email', localStorage.getItem('email'));
	// formData.append('additionally', localStorage.getItem('additionally'));
	formData.append('additionally2', localStorage.getItem('additionally2'));
	formData.append('where_send', localStorage.getItem('where_send'));

	// console.log(formData);

	if ($('#myModalOrder #file2')[0].files.length) {
		$.ajax({
			url: "./form.php?upload",
			type: "POST",
			dataType: "json",
			cache: false,
			contentType: false,
			processData: false,
			data: formData,
			xhr: function () {
				var xhr = $.ajaxSettings.xhr(); // получаем объект XMLHttpRequest
				xhr.upload.addEventListener('progress', function (evt) { // добавляем обработчик события progress (onprogress)
					if (evt.lengthComputable) { // если известно количество байт
						var percentComplete = Math.ceil(evt.loaded / evt.total * 100);
						if (percentComplete > 98) {
							$('#myModalOrder .form_info').text('Загружено ' + percentComplete + '%. Обработка информации...');
						} else {
							$('#myModalOrder .form_info').text('Загружено ' + percentComplete + '%');
						}

					}
				}, false);
				return xhr;
			},
			success: function (data) {
				var data0 = data;
				// console.log(data0.result);
				if (data0.result === true) {
					isOpenModalCalcOrder = true;
					localStorage.setItem('additionally_order', data0.additionally_order);

					if (isShortModalOrder) {
						order($("#myModalOrder"));
						isShortModalOrder = false;
					} else if (isSketch) {
						sketch($("#myModalOrder"));
						isSketch = false;
					} else {
						$("#myModalOrder").modal('hide');
					}
				} else {
					$('#myModalOrder .form_info').text("Ошибка загрузки изображения.");
					$("#myModalOrder .page_btn").show();
				}
			},
			error: function () {
				$('#myModalOrder .form_info').text("Ошибка загрузки изображения.");
				$("#myModalOrder .page_btn").show();
			}

		});
	} else {
		$('#myModalOrder .form_info').text("Загрузите файл");
		$("#myModalOrder .page_btn").show();
	}
}


/********************* При закрытии формы заказа **********************/
$("#myModalOrder").on('hidden.bs.modal', function () {
	if (isOpenModalColors) {//форма выбора цветовой гаммы
		$("#myModalColors").modal('show');
		$('#myModalColors').modal('handleUpdate');
	}
	if (isOpenModalCalcOrder) {//форма выбора цветовой гаммы
		$("#myModalCalck2").modal('show');
		$('#myModalCalck2').modal('handleUpdate');
	}
});

