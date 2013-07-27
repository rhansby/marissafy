var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var insert_base_image = function() {
    var base_image = new Image();
    base_image.src = 'img/cat.jpg';
    base_image.onload = function() {
        context.drawImage(base_image, 0, 0, canvas.width, canvas.height);
    }
};

var overlay_image = function(image, x, y, width, height) {
    context.drawImage(image, x, y, width, height);
}

insert_base_image();

// temporary:
var face = new Image();
face.src = 'img/marissa_1.png';
face.onload = function() {
    overlay_image(face, 350, 140, 300, 300);
}
