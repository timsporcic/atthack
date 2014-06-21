

// Variable to store your files
var files;
var canvas;
var imageLoader;
var ctx;

 
// Grab the files and set them to our variable
function prepareUpload(event)
{
  files = event.target.files;


}




function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

//Catch the form submit and upload the files
function uploadFiles(event)
{
  event.stopPropagation(); // Stop stuff happening
    event.preventDefault(); // Totally stop stuff happening
 
    // START A LOADING SPINNER HERE
 
    // Create a formdata object and add the files
	var data = new FormData();
	$.each(files, function(key, value)
	{
		data.append('fileUploaded', value);
	});
    
    $.ajax({
        url: '/hack/upload/',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR)
        {
        	if(typeof data.error === 'undefined')
        	{
        		// Success so call function to process the form
        		//alert(JSON.stringify(data));
        		$("#textarea1").text(data.translatedText);
        	}
        	else
        	{
        		// Handle errors here
        		console.log('ERRORS: ' + data.error);
        	}
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
        	// Handle errors here
        	console.log('ERRORS: ' + textStatus);
        	// STOP LOADING SPINNER
        }
    });
}

$(document).on('pageinit', '#page1', function(){ 

	   // Add events
            $('input[type=file]').on('change', prepareUpload);
     imageLoader = document.getElementById('fileUploaded');        
    imageLoader.addEventListener('change', handleImage, false);
 canvas = document.getElementById('imageCanvas');
ctx = canvas.getContext('2d');

         $(document).on('click', '#wtf', function() { 

				$('form').on('submit', uploadFiles);
			});
     });
 

