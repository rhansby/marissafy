var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var upload_image; 

var marissafy = function(coords) {

    var almighty_marissa_face = new Image(),
        marissa_faces = ['img/marissa_1.png', 'img/marissa_2.png','img/marissa_3.png', 'img/marissa_4.png','img/marissa_5.png'],
        random_face = Math.floor(Math.random()*5);

    almighty_marissa_face.onload = function() {
        context.drawImage(almighty_marissa_face, coords.x, (coords.y * .85), (coords.width * 1.3), (coords.width *1.3 *1.716));
    };

    console.log(random_face);
    almighty_marissa_face.src = marissa_faces[random_face]; //'img/marissa_1.png';
}

var save_to_imgur = function() {
    var canvas_shot = canvas.toDataURL('image/jpeg').toString()
    canvas_shot = canvas_shot.substr(23, canvas_shot.length - 23); // cut out first 23 characters for imgur to accept it

    $.ajax( {
        url: 'https://api.imgur.com/3/image',
        type: 'post',
        data: {
            image: canvas_shot
        },
        headers: {
            Authorization: 'Client-ID 74e4bd4738704d8'
        },
        dataType: 'json',
        success: function(response) {
            document.getElementById('share').innerHTML = response.data.link;
            $('#share').addClass('link');
        }
    });
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
        $('.show').removeClass('show');
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

    $('#share').on('click', function() {
        save_to_imgur();
        $('#share').off('click');
    });

    $('.btn').on('click', function() {
        if ($(this)[0].id !== 'share') {
            $('#share').removeClass('link');
            document.getElementById('share').innerHTML = 'Share Link';
            $('#share').on('click', function() {
                save_to_imgur();
                $('#share').off('click');
            });
        }
    });
});
