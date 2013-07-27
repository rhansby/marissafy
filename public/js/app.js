var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var upload_image; 

var marissafy = function(coords) {

    var almighty_marissa_face = new Image(),
        marissa_faces = ['img/marissa_1.png', 'img/marissa_3.png', 'img/marissa_4.png','img/marissa_5.png', 'img/marissa_6.png'],
        random_face = Math.floor(Math.random()*6);

    almighty_marissa_face.onload = function() {
        context.drawImage(almighty_marissa_face, coords.x, (coords.y * .9), (coords.width * 1.25), (almighty_marissa_face.height*1.25));
    };

    console.log(random_face);
    almighty_marissa_face.src = marissa_faces[random_face]; //'img/marissa_1.png';
}

$(document).ready(function() {
    $('#upload-form').ajaxForm(function(response) {
        if ( response && response !== '' ) {
            coords_array = JSON.parse(response);
            context.drawImage(upload_image, 0, 0, canvas.width, canvas.height);
            for (var i = 0; i < coords_array.length; i++) {
                marissafy(coords_array[i]);
            }
        }

        if(!$('#canvas').hasClass('shadow')) {
            $('#canvas').addClass('shadow');
        }
    });

    $('#upload-file').bind('change', function() {
        var url = window.URL || window.webkitURL;
        var image_location = url.createObjectURL(this.files[0]);

        var image = new Image();
        image.onload = function() {
            canvas.width = this.width / 2;
            canvas.height = this.height / 2;
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
            upload_image = this; 
        };
        image.src = image_location;
    });
});
