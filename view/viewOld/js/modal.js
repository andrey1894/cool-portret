// var isOpenModal = false;//открывать ли окно при закрытии другого
// // при открытии модального окна
// $('#myModal').on('show.bs.modal', function (event) {
//   isOpenModal = false;//обнуление переменной
//   $("#myModal .page_btn").show();//возможность отправлять письмо



//   //выбрать размер по кнопке
//   var button = $(event.relatedTarget);
//   var content = button.data('content') + " см";
//   $('div.form-group select#size option').each(function () {
//     if ($(this).text().toLowerCase() == content.toLowerCase()) {
//       $(this).prop('selected','selected');
//       return;
//     }
//   });

//   //Получение списка городов
//   $.ajax({
//     url: "http://emspost.ru/api/rest/",
//     dataType : "jsonp",
//     data: ({
//       method:"ems.get.locations",
//       type:"cities",
//       plain:"true"
//     }),
//     success: function (data) {
//       for (i=0;i<data.rsp.locations.length;i++){
//         // console.log(data.rsp.locations[i].value.replace('city--',''));
//         var option = "<option value=\""+data.rsp.locations[i].value+"\">"+data.rsp.locations[i].name+"</option>";
//         $("#city #cities").append(option);
//       }
//     }
//   });

//   //Получение списка регионов
//   $.ajax({
//     url: "http://emspost.ru/api/rest/",
//     dataType : "jsonp",
//     data: ({
//       method:"ems.get.locations",
//       type:"regions",
//       plain:"true"
//     }),
//     success: function (data) {
//       $("#city").prop("disabled", false);
//       $("#city #check-city-option").text("Выбирете город/регион");
//       for (i=0;i<data.rsp.locations.length;i++){
//         // console.log(data.rsp.locations[i].value.replace('city--',''));
//         var option = "<option value=\""+data.rsp.locations[i].value+"\">"+data.rsp.locations[i].name+"</option>";
//         $("#city #regions").append(option);
//       }
//     }
//   });


// });


// $("#myModal").on('hidden.bs.modal', function(){
//   if (isOpenModal){
//     $("#myModal2").modal('show');
//     $('#myModal2').modal('handleUpdate');
//   }
// });



// // при открытии модального окна
// $('#myModal2').on('show.bs.modal', function (event) {
//   isOpenModal = false;//обнуление переменной
//   $("#myModal2 .page_btn").show();//возможность отправлять письмо
//   $("#myModal2 .upload_info").text("");
//   $("#myModal2 #info_post").hide();
//   $("#myModal2 input[id=EMS]").prop('checked', true);

//   $( "#myModal2 #edit_data" ).click(function() {
//     isOpenModal = true;//открыть первое окно
//     $("#myModal2").modal('hide');
//     $("#myModal2").on('hidden.bs.modal', function(){});
//   });
// });

// $("#myModal2").on('hidden.bs.modal', function(){
//   if (isOpenModal){
//     $("#myModal").modal('show');
//     $('#myModal').modal('handleUpdate');
//   }
// });