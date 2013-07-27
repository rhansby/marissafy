
$(document).ready(function() {
    $('header h1').addClass('slide');
    $('#upload').addClass('slidedown');
    $('#marissafy').addClass('slideup');

    $('#upload').click(function(){
        $('#upload-file').click();
    });

    $('#marissafy').click(function(){
        $('#submit').click();
    });
});
