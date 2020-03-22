	// 'use strict';
	var isShortModalOrder = false;//Отправить ли запрос сразу после формы заказа
	$(document).ready(function(){
	var isOpenModalCalck = false;//открывать ли окно при закрытии другого
	var isOpenModalOrder = false;//открывать ли окно при закрытии другого

	$('#myModalCalck').on('show.bs.modal', function (event) {
		isOpenModalCalck = false;//обнуление переменной
		isShortModalOrder = false;

		$("#myModalCalck .form_info").text('');

			var portret = localStorage.getItem('portret');
			var size;
			if (portret){
				portret = JSON.parse(portret);
				size = portret.size;
			}
			var count_people = localStorage.getItem('count_people');
			var city = localStorage.getItem('city');
			var email = localStorage.getItem('email');
			// var city_title = localStorage.getItem('city_title');
			var date = localStorage.getItem('date');

			$('#myModalCalck #size option[value="'+size+'"]').prop('selected', true);
			// $('#myModalCalck #city option[value="'+city+'"]').prop('selected', true);
			$('#myModalCalck #city').val(city);
			$('#myModalCalck #email').val(email);
			$('#myModalCalck #count_people').val(count_people);
			$('#myModalCalck #datetimepicker2').val(date);

		});




	$('#myModalCalck .page_btn').on('click', function (event) {
		$('#myModalCalck .form_info').text('');

		var portret = {
			size: 0,
			size_title: 0,
			max_people: 0,
			count_colors: 0,
			cost: 0
		}
		portret.size = $('#myModalCalck #size :selected').val();
		portret.size_title = $('#myModalCalck #size :selected').text();
		// portret.max_size_tiitle = $('#myModalCalck #size :selected').attr('data-max');
		var count_people = parseInt($('#myModalCalck #count_people').val());
		// var city = $('#myModalCalck #city :selected').val();
		var city = $('#myModalCalck #city').val();
		// var city_title = $('#myModalCalck #city :selected').text();
		var date = $('#myModalCalck #date').val();
		var max_size_title = 0;


		// $('#size option').each(function(){
		// 	console.log("no");
		var n = $('#myModalCalck #size option').length;
		for( var i=0; i<n; i++){
			var attr = $('#myModalCalck #size option').eq(i).attr('data-max');
			attr = +attr;
			if ( attr === +count_people ) {
				max_size_title = $('#myModalCalck #size option').eq(i).text();
			}
		}


		if (!count_people || isNaN(count_people) || count_people < 1){
			$('#myModalCalck .form_info').text('Введите кол-во человек.');
		}else
		if (!portret.size){
			$('#myModalCalck .form_info').text('Выбирите размер потрета.');
		}else
		if (!count_people){
			$('#myModalCalck .form_info').text('Введите количество человек.');
		}else
		// if (!city){
		// 	$('#myModalCalck .form_info').text('Выбирите город доставки.');
		// }else
		// if (!date){
		// 	$('#myModalCalck .form_info').text('Введите желаемую дату доставки.');
		// }else
		{
			// localStorage.setItem('city', city);
			// localStorage.setItem('city_title', city_title);

			localStorage.setItem('email', email);

			portret.max_people = $('#myModalCalck #size :selected').attr('data-max');

			if (parseInt(portret.max_people) < parseInt(count_people)){
				var ansv = 'Максимальное кол-во человек для данного размера: '
				+portret.max_people+'.';
				if (!max_size_title){
					ansv += '<br>Для данного количества человек используются нестандартные холсты. Свяжитесь с нами.';
				}else{
					ansv += ' Наименьший размер холста для ' + count_people + ' человек '
					+ max_size_title;
				}
				$('#myModalCalck .form_info').html(ansv);
			}
			else{

				localStorage.setItem('count_people', count_people);

					isOpenModalCalck = true;

								$("#myModalCalck .form_info").text("Обработка информации....");
								var msg = {
									"size": portret.size
								};
								$.ajax({
									type: 'POST',
									url: 'info.php?info',
									data: msg,
									success: function(data) {
										var info = JSON.parse(data);
										if (info.result){
											portret.size_title = info.size_title;
											portret.cost = info.cost;
											portret.count_colors = info.count_colors;
											localStorage.setItem('portret', JSON.stringify(portret));
											localStorage.setItem('cost_add_people', info.cost_add_people);
											localStorage.setItem('cost_post', info.cost_post);

											var msg = {};
											$.ajax({
												type: 'POST',
												url: 'info.php?additionally',
												data: msg,
												success: function(data) {
													var info = JSON.parse(data);
													localStorage.setItem('additionally_order', info.additionally_order)
													$('#myModalCalck').modal('hide');
												},
												error: function(xhr, str){
													$("#myModalCalck .form_info").text("Ошибка сбора данных. Повторите попытку или свяжитесь с нами.");
												}
											});

										}else{
											$("#myModalCalck .form_info").text("Неизвестная ошибка. Повторите попытку или свяжитесь с нами.");
										}
									},
									error:  function(xhr, str){
										$("#myModalCalck .form_info").text("Неизвестная ошибка. Повторите попытку или свяжитесь с нами.");
									}
								});


			}
		}
	});



	$("#myModalCalck").on('hidden.bs.modal', function(){
		if (isOpenModalCalck){
			$("#myModalCalck2").modal('show');
			$('#myModalCalck2').modal('handleUpdate');
		}
	});

	$('#myModalCalck2').on('show.bs.modal', function (event) {
		$("#myModalCalck2 .page_btn").show();
		$("#myModalCalck2 .upload_info").text('');
		isOpenModalCalck = false;//обнуление переменной
		isOpenModalOrder = false;//обнуление переменной

		var portret = JSON.parse(localStorage.getItem('portret'));




		var additionally2 = localStorage.getItem('additionally2');
		if (additionally2){
			additionally2 = JSON.parse(additionally2);
			if (additionally2.length){
				$("#myModalCalck2 #additionally2 input:checkbox[name='set[]']").each(function(){
					if (additionally2.indexOf($(this).val()) !== -1){
						$(this).prop('checked', true);
					}else{
						$(this).prop('checked', false);
					}
				});
				$('#myModalOrder #additionally_block').collapse("show");
			}else{
				$('#myModalCalck2 #additionally_block').collapse("hide");
			}
		}



		if (isOpenModalCalcOrder){//Расширеная форма для оформлени заказа
			$('#myModalCalck2 .modal-title').text('Оформить заказ');
			var name = localStorage.getItem('name');
			var phone = localStorage.getItem('phone');


			$('#myModalCalck2 #additionally .text').text('');
			// $('#myModalCalck2 #additionally .text').append(additionally_order_text);
			$('#myModalCalck2 #name').text(name);
			$('#myModalCalck2 #phone').text(phone);
			$('#myModalCalck2 .isOrder').show();
		}else{
			$('#myModalCalck2 .isOrder').hide();
		}

		var size = localStorage.getItem('size');
		var size_title = portret.size_title+" см";
		var count_people = localStorage.getItem('count_people');
		var city = localStorage.getItem('city');
		// var city_title = localStorage.getItem('city_title');
		// var date = new Date(localStorage.getItem('date'));
		var date = localStorage.getItem('date');

		var type_post = localStorage.getItem('type_post');

		var post_price = +localStorage.getItem('cost_post');
		var cost_add_people = +localStorage.getItem('cost_add_people');

		var cost_portret = +portret.cost + (+cost_add_people*(count_people-1));


		$('#myModalCalck2 #cost_port').text(cost_portret);

		$('#myModalCalck2 #size').text(size_title);
		$('#myModalCalck2 #count_people').text(count_people);
		$('#myModalCalck2 #city').text(city);
		// $('#myModalCalck2 #date').text(('0' + date.getDate()).slice(-2)+'.'+('0' + (date.getMonth() + 1)).slice(-2)+'.'+date.getFullYear());
		$('#myModalCalck2 #date').text(date);

		$('#myModalCalck2 #cost_add_people span').text((count_people - 1) * cost_add_people);
		$('#myModalCalck2 #cost_add_people .portret-cost').text(portret.cost);
		$('#myModalCalck2 #cost_add_people .size').text(size_title);
		$('#myModalCalck2 #cost_add_people .count').text(count_people - 1);



		if (count_people > 1){
			$('#myModalCalck2 #cost_add_people').show();
		}else{
			$('#myModalCalck2 #cost_add_people').hide();
		}

		$("#myModalCalck2 input[id="+type_post+"]").prop("checked", true);
		updatePortretCost(type_post, cost_portret);
		updatePortretCost(cost_portret);

		//Выбор доставки
		$("#myModalCalck2 #cheaper_block2 input").change(function(e){
			type_post = e.target.value;
			localStorage.setItem('type_post', type_post);
			updatePortretCost(cost_portret);
		});

		//Выбор дополнительного
		$("#myModalCalck2 #additionally_block input").change(function(e){
			updatePortretCost(cost_portret);
		});

	});

	$('#myModalCalck2 #edit_data').on('click', function (event) {
		if (isOpenModalCalcOrder){
			isOpenModalOrder = true;
		}else{
			isOpenModalCalck = true;
		}
		$('#myModalCalck2').modal('hide');
	});

	$('#myModalCalck2 #order_btn').on('click', function (event) {
		if (isOpenModalCalcOrder){
			order($('#myModalCalck2'));
		}else{
			var additionally = [];
			$("#myModalCalck2 #additionally2 input:checkbox[name='set[]']:checked").each(function(){
				additionally.push($(this).val());
			});
			if (additionally){
				localStorage.setItem('additionally2', JSON.stringify(additionally));
			}

			isOpenModalOrder = true;
			isShortModalOrder = true;
			$('#myModalCalck2').modal('hide');
		}
	});


	$("#myModalCalck2").on('hidden.bs.modal', function(){
		if (isOpenModalCalck){
			$("#myModalCalck").modal('show');
			$('#myModalCalck').modal('handleUpdate');
		}else if (isOpenModalOrder || isOpenModalCalcOrder){
			$("#myModalOrder").modal('show');
			$('#myModalOrder').modal('handleUpdate');
		}
	});

	function updatePortretCost(portret_price) {
		const type_post = localStorage.getItem('type_post') || 'fast';
		const cost = getCostPost(type_post);
		$("#myModalCalck2 #cost_delivery").text(cost);
		$("#myModalCalck2 #cost_order").text(cost + portret_price + getCostAdditionally(portret_price));
		localStorage.setItem('cost_post', cost);
	}

	function getCostPost(type_post) {
		switch (type_post){
			case "fast":
				return 600;
			case "courier":
				return 400;
			case "postSdak":
				return 300;
			case "post":
				return 300;
		}
		return 0;
	}



	function getCostAdditionally(portret_price){

		var additionally_order = JSON.parse(localStorage.getItem('additionally_order'));

		var additionally2 = [];
		$("#myModalCalck2 #additionally2 input:checkbox[name='set[]']:checked").each(function(){
			additionally2.push($(this).val());
		});
		if (additionally2){
			localStorage.setItem('additionally2', JSON.stringify(additionally2));
		}

		if (additionally2.length){
			var sum = 0;
			for (var i=0, n=additionally2.length; i<n; i++){
				if (additionally_order[additionally2[i]].type === "rub"){
					sum += +additionally_order[additionally2[i]].price;
				}else{
					sum += +portret_price*(additionally_order[additionally2[i]].price/100);
				}
			}
			return sum;

		}

		return 0;
	}



})








	function order(modal){
		var name = localStorage.getItem('name');
		var phone = localStorage.getItem('phone');
		var portret = localStorage.getItem('portret');
		var size;
		if (portret){
			portret = JSON.parse(portret);
			size = portret.size;
		}
		var count_people = localStorage.getItem('count_people');
		var email = localStorage.getItem('email');
		// var city = localStorage.getItem('city_title');
		var city = localStorage.getItem('city');
		// var date = new Date(localStorage.getItem('date'));
		var date = localStorage.getItem('date');
		var type_post = localStorage.getItem('type_post');
		var cost_post = localStorage.getItem('cost_post');
		// var ems = localStorage.getItem('ems');
		var ems = {
			price: 600,
			term: {
				min: 2,
				max: 5
			}
		}
		var where_send = localStorage.getItem('where_send');
		var message = localStorage.getItem('message');
		//var cost_post;
		// if (ems){
			// ems = JSON.parse(ems);
			//cost_post = ems.price;
		// }
		// var palette = localStorage.getItem('palette');
		var additionally = localStorage.getItem('additionally2');

		if (name && phone && size && email && count_people && city && date && type_post){
			$("#myModalCalck2 .upload_info").text('Отправка письма...');
			var msg = {
				"name": name,
				"phone": phone,
				"city": city,
				"email": email,
				"date": date,
				// "date": ('0' + date.getDate()).slice(-2)+'.'+('0' + (date.getMonth() + 1)).slice(-2)+'.'+date.getFullYear(),
				"size": size,
				"count_people": count_people,
				// "palette": palette,
				"type_post": type_post,
				"cost_post": cost_post,
				"additionally": additionally,
				"where_send": where_send,
				"message": message
			};
			$("#myModalCalck2 .page_btn").hide();
			$.ajax({
				type: 'POST',
				url: 'function.php?add_order',
				data: msg,
				success: function(data) {
					// console.log(data);
					if (data.search('"rezult":"ok"')!=-1){
							// $("#myModalCalck2 .page_btn").show();
							// $("#myModalSend .form_info").text('Письмо отослано');
							$("#myModalSend").modal('show');
							$(modal).modal('hide');
							isOpenModalCalcOrder = false;
						}else{
							$("#myModalCalck2 .page_btn").show();
							$("#myModalCalck2 .upload_info").text('Письмо не отослано. Проверьте данные и повторите попытку или свяжитесь с нами.');
						}
					},
					error:  function(xhr, str){
						$("#myModalCalck2 .page_btn").show();
						$("#myModalCalck2 .upload_info").text("Неизвестная ошибка. Проверьте данные и повторите попытку или свяжитесь с нами.");
					}
				});
		}else{
			$("#myModalCalck2 .upload_info").text('Проверьте введённые данные.');
			$("#myModalCalck2 .page_btn").show();
		}
	}




	function sketch(modal){
		var name = localStorage.getItem('name');
		var phone = localStorage.getItem('phone');
		var portret = localStorage.getItem('portret');
		var size;
		if (portret){
			portret = JSON.parse(portret);
			size = portret.size;
		}
		var count_people = localStorage.getItem('count_people');
		var email = localStorage.getItem('email');
		var city = localStorage.getItem('city');
		// var city = localStorage.getItem('city_title');
		// var date = new Date(localStorage.getItem('date'));
		var date = localStorage.getItem('date');
		var type_post = localStorage.getItem('type_post');
		// var ems = localStorage.getItem('ems');
		var ems = {
			price: 600,
			term: {
				min: 2,
				max: 5
			}
		}
		var where_send = localStorage.getItem('where_send');
		var message = localStorage.getItem('message');


		if (name && phone && size && email && count_people && city && date){
			$("#myModalCalck2 .upload_info").text('Отправка письма...');
			var msg = {
				"name": name,
				"phone": phone,
				"city": city,
				"email": email,
				// "date": ('0' + date.getDate()).slice(-2)+'.'+('0' + (date.getMonth() + 1)).slice(-2)+'.'+date.getFullYear(),
				"date": date,
				"size": size,
				"count_people": count_people,
				"where_send": where_send,
				"message": message
			};
			$("#myModalCalck2 .page_btn").hide();
			$.ajax({
				type: 'POST',
				url: 'function.php?add_sketch',
				data: msg,
				success: function(data) {
					// console.log(data);
					if (data.search('"rezult":"ok"')!=-1){
							// $("#myModalSend .form_info").text('Письмо отослано');
							$("#myModalSend").modal('show');
							$(modal).modal('hide');
							isOpenModalCalcOrder = false;
						}else{
							$(modal).find(".page_btn").show();
							$(modal).find(".form_info").text('Письмо не отослано. Проверьте данные и повторите попытку или свяжитесь с нами.');
							$(modal).find(".upload_info").text('Письмо не отослано. Проверьте данные и повторите попытку или свяжитесь с нами.');
						}
					},
					error:  function(xhr, str){
						$("#myModalCalck2 .page_btn").show();
						$("#myModalCalck2 .upload_info").text("Неизвестная ошибка. Проверьте данные и повторите попытку или свяжитесь с нами.");
					}
				});
		}else{
			$("#myModalCalck2 .upload_info").text('Проверьте введённые данные.');
			$("#myModalCalck2 .page_btn").show();
		}
	}




	var pixel;
	window.vkAsyncInit = function() {
	  pixel = new VK.Pixel('VK-RTRG-405200-43mg1');
	};
	
	// Заказать
	$('#myModalSend').on('show.bs.modal', function (event) {
		pixel.Event('myModalSend');
		fbq('track', 'Purchase', {value: 0, currency: 'USD'});
	});
	
	//Открыть форму заказа
	$('#myModalOrder').on('show.bs.modal', function (event) {
		  pixel.Event('myModalOrder');
		fbq('track', 'InitiateCheckout', {value: 0, currency: 'USD'});
	});
	
	//Рассчитать стоимость
	$('#myModalCalck').on('show.bs.modal', function (event) {
		fbq('track', 'Lead'); 
	});
	
	// Получить скидку
	$('#myModalCalck2 #btn_discount').on('click', function (event) {
		pixel.Event('discount');
		fbq('track', 'Lead'); 
	});