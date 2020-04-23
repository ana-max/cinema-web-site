
$(document).on('ready', function() {
    var checkboxes = $("input[type=checkbox]");
  
    $("#form").on('submit', function(e) {
      var checker = false;
      checkboxes.each(function() {
        if ($(this).prop('checked') == true) {
          checker = true;
        }
      });
  
      if (checker == false) {
        e.preventDefault();
        alert('Выберите хотя бы одно место');
      }
    });
  });