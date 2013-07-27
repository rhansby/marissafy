var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var marissafy = function(coords) {
    var almighty_marissa_face = new Image();
    almighty_marissa_face.onload = function() {
        context.drawImage(almighty_marissa_face, coords.x, coords.y, coords.width, coords.height);
    };
    almighty_marissa_face.src = 'img/marissa_1.png';
}

$(document).ready(function() {
    $('#upload-form').ajaxForm(function(response) {
        if ( response && response !== '' ) {
            marissafy(JSON.parse(response));
        }
    });

    $('#upload-file').bind('change', function() {
        var url = window.URL || window.webkitURL;
        var image_location = url.createObjectURL(this.files[0]);

        var image = new Image();
        image.onload = function() {
            canvas.width = this.width;
            canvas.height = this.height;
            context.drawImage(this, 0, 0, canvas.width, canvas.height);
        };
        image.src = image_location;
    });
});
