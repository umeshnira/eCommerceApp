$(function () {
  $(".example1").dataTable();
  $(".panelClass").click(function (e) {
    debugger
    $(".panelClass").removeClass("panelActive");
    $(this).addClass('panelActive')
  });
  $("#mytable #checkall").click(function () {
    if ($("#mytable #checkall").is(':checked')) {
      $("#mytable input[type=checkbox]").each(function () {
        $(this).prop("checked", true);
      });

    } else {
      $("#mytable input[type=checkbox]").each(function () {
        $(this).prop("checked", false);
      });
    }
  });

  $("[data-toggle=tooltip]").tooltip();
});