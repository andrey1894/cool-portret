 var finalFiles = [];
 var id=0;
 $(document).ready(function() {
  if (window.File && window.FileList && window.FileReader) {
    $("#file2").on("change", function(e) {


      var files = this.files;
      var i = 0,
      len = files.length;
      (function readFile(n) {
        var reader = new FileReader();
        var f = files[n];
        reader.onload = function(e) {
          $("#myModalOrder #file_info #foto").css("display", "none");
          $("#myModalOrder #file_info #files").css("display", "flex");
          $("#myModalOrder #file_info #files").prepend( "<div class=\"img\" data-id='"+(id)+"'>" + "<img class=\"imageThumb\" src=\"" + e.target.result + "\" title=\"" + f.name + "\"/>" +
            "<span class=\"remove\">Удалить</span>" +"</span>"+"</div>");
          $(".remove").click(function(){
            finalFiles[$(this).parent(".img").data("id")] = null;
            $(this).parent(".img").remove();
          });
          finalFiles[id++] = f;
        // if `n` is less than `len` ,
        // call `readFile` with incremented `n` as parameter
        if (n < len -1) readFile(++n)
      };
      reader.readAsDataURL(f); // `f` : current `File` object
    }(i)); // `i` : `n` within immediately invoked function expression


    });
  } else {
    alert("Your browser doesn't support to File API")
  }
});



// function dataURItoBlob(dataURI) {
//   // convert base64/URLEncoded data component to raw binary data held in a string
//   var byteString;
//   if (dataURI.split(',')[0].indexOf('base64') >= 0)
//     byteString = atob(dataURI.split(',')[1]);
//   else
//     byteString = unescape(dataURI.split(',')[1]);

//   // separate out the mime component
//   var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//   // write the bytes of the string to a typed array
//   var ia = new Uint8Array(byteString.length);
//   for (var i = 0; i < byteString.length; i++) {
//     ia[i] = byteString.charCodeAt(i);
//   }

//   return new Blob([ia], {type:mimeString});
// }

function dataURItoBlob(dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type:mime});
}

// var src_img = "img/modal/preview-foto.png";
// // $('#myModalOrder').on('shown.bs.modal', function () {
// //   $("#myModalOrder #file2").prop('value', null);
// //   $("#myModalOrder #foto").attr("src",src_img);
// // });

// function handleFileSelect(evt) {
//     var file = evt.target.files; // FileList object
//     $("#myModalOrder #file_info #files").text('');
//     $("#myModalOrder #file_info #files").show();
//     $("#myModalOrder #file_info #count_foto").show();
//     $("#myModalOrder #file_info #count_foto span").text(file.length);
//     for (let i=0, n=file.length; i<n; i++){
//         var f = file[i];
//         // Only process image files.
//         // if (!f.type.match('image.*')) {
//         // 	alert("Только фото...");
//         // }
//         var reader = new FileReader();
//         // Closure to capture the file information.
//         reader.onload = (function(theFile) {
//         	return function(e) {
//                 $("#myModalOrder #foto").hide();
//                 if (i != n-1){
//                     let width = (100/(n-1))+'%';
//                     $("#myModalOrder #file_info #files").prepend("<img style='width:"+width+";' src='"+e.target.result+"'>");
//                 }else{
//                     $("#myModalOrder #file_info #files").prepend("<img src='"+e.target.result+"'>");
//                 }
//             };
//         })(f);
//         // Read in the image file as a data URL.
//         reader.readAsDataURL(f);
//     }
// }

// document.getElementById('file2').addEventListener('change', handleFileSelect, false);