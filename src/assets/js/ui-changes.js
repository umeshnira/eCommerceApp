var init_ExZoom_Container = function () {
    $('.exzoom-container').imagesLoaded(function () {
        $('#exzoom').exzoom({
            autoPlay: false,
        });
        $('#exzoom').removeClass('hidden');
    });
}