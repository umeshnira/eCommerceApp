jQuery(document).ready(function ($) {
  $("#grid").hide();
  $("#list").show();
  $("[data-toggle=popover]").popover({
    container: "body",
  });
  $().UItoTop({
    easingType: "easeOutQuart",
  });

  // $("#flexiselDemo1").flexisel({
  //   visibleItems: 3,
  //   animationSpeed: 1000,
  //   autoPlay: true,
  //   autoPlaySpeed: 3000,
  //   pauseOnHover: true,
  //   enableResponsiveBreakpoints: true,
  //   responsiveBreakpoints: {
  //     portrait: {
  //       changePoint: 480,
  //       visibleItems: 1,
  //     },
  //     landscape: {
  //       changePoint: 640,
  //       visibleItems: 2,
  //     },
  //     tablet: {
  //       changePoint: 768,
  //       visibleItems: 2,
  //     },
  //   },
  // });
  // $(".flexslider").flexslider({
  //   animation: "slide",
  //   controlNav: "thumbnails",
  // });
  $("#parentHorizontalTab").easyResponsiveTabs({
    type: "default", //Types: default, vertical, accordion
    width: "auto", //auto or any width like 600px
    fit: true, // 100% fit in a container
    tabidentify: "hor_1", // The tab groups identifier
    activate: function (event) {
      // Callback function if tab is switched
      var $tab = $(this);
      var $info = $("#nested-tabInfo");
      var $name = $("span", $info);
      $name.text($tab.text());
      $info.show();
    },
  });
  $("#slider-range").slider({
    range: true,
    min: 0,
    max: 9000,
    values: [50, 6000],
    slide: function (event, ui) {
      $("#amount").val(ui.values[0] + " - " + ui.values[1]);
    },
  });
  $("#amount").val(

    $("#slider-range").slider("values", 0) +
    " - " +
    $("#slider-range").slider("values", 1) + " Orders"
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
  $(".grid-class").on("click", function (e) {
    $("#grid").show();
    $("#list").hide();
    $(".list-class").removeClass("grid-active");
    $(this).addClass("grid-active");
  });
  $(".list-class").on("click", function (e) {
    $("#grid").hide();
    $("#list").show();
    $(".grid-class").removeClass("grid-active");
    $(this).addClass("grid-active");
  });
});
