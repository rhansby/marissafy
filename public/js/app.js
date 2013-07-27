var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var marissafy = function(coords) {
    var almighty_marissa_face = new Image();
    almighty_marissa_face.onload = function() {
        context.drawImage(almighty_marissa_face, coords.x, coords.y, coords.width, coords.height);
    };
    almighty_marissa_face.src = 'img/marissa_1.png';
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
            console.log(response.data.link);
            // TODO: Write response.data.link to box
            document.getElementById('share').innerHTML = response.data.link;
        }
    });
}

$(document).ready(function() {
    $('#upload-form').ajaxForm(function(response) {
        if ( response && response !== '' ) {
            coords_array = JSON.parse(response);
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
        };
        image.src = image_location;
    });

    $('#share').on('click', function() {
        save_to_imgur();
    });
});
