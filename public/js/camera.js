$(document).ready(() => {
    let htmlBuilder = '';
    $.ajax({url: '/camera/list', success: (images) => {
        $.each(images, function(id, image) {
            htmlBuilder += '<div class="col-md-3 text-center">' +
                '                    <div class="row">' +
                '                        <div class="col-md-12">' +
                '                            <img class="camera-image" src="/camera/show/'+ id +'" alt="">' +
                '                        </div>' +
                '                    </div>' +
                '                    <div class="row">' +
                '                        <div class="col-md-12">' +
                '                            <p class="camera-date-time">'+ image.uploadDate +'</p>' +
                '                        </div>' +
                '                    </div>' +
                '                </div>'
        });

        $('#images-container').html(htmlBuilder);
    }});


});
