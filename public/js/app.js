var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var insert_base_image = function() {
    var base_image = new Image();
    base_image.src = 'img/cat.jpg';
    base_image.onload = function() {
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    }
};

var marissafy = function(coords) {
    var almighty_marissa_face = new Image();
    almighty_marissa_face.src = 'img/marissa_1.png';
    almighty_marissa_face.onload = function() {
        context.drawImage(almighty_marissa_face, coords.x, coords.y, coords.width, coords.height);
    };
}

var start = function() {
    insert_base_image();

    // other logic...
}

$(document).ready(function() {
    $('#upload-form').ajaxForm(function(response) {
        if ( response && response !== '' ) {
            marissafy(JSON.parse(response));
        }
    });

    start();
});
