// Agregamos la clase aparecer y que el scroll baje rapidamente
$(function(){
    $('#contacto_boton').click(function () {
      $("#section_contacto").addClass('aparecer');
      $('html').animate({
         scrollTop: $(document).height()
      }, 'fast');
      return false;
    });
  });

