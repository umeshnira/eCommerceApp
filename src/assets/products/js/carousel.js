jQuery(document).ready(function ($) {
  $().UItoTop({
    easingType: "easeOutQuart",
  });

  $("#flexiselDemo1").flexisel({
    visibleItems: 3,
    animationSpeed: 1000,
    autoPlay: true,
    autoPlaySpeed: 3000,
    pauseOnHover: true,
    enableResponsiveBreakpoints: true,
    responsiveBreakpoints: {
      portrait: {
        changePoint: 480,
        visibleItems: 1,
      },
      landscape: {
        changePoint: 640,
        visibleItems: 2,
      },
      tablet: {
        changePoint: 768,
        visibleItems: 2,
      },
    },
  });
  $(".flexslider").flexslider({
    animation: "slide",
    controlNav: "thumbnails",
  });

  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 9000,
    values: [50, 6000],
    slide: function (event, ui) {
      $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
    },
  });
  $("#amount").val(
    "$" +
      $("#slider-range").slider("values", 0) +
      " - $" +
      $("#slider-range").slider("values", 1)
  );
  $(".scroll").click(function (event) {
    event.preventDefault();

    $("html,body").animate(
      {
        scrollTop: $(this.hash).offset().top,
      },
      1000
    );
  });
});
