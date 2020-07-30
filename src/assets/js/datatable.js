$(function () {
  $(".example1").dataTable();
  $(".panelClass").click(function (e) {
    debugger
    $(".panelClass").removeClass("panelActive");
    $(this).addClass('panelActive')
  });
});