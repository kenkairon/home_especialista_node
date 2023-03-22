document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("calcular").addEventListener('submit', validarFormulario);
});

function validarFormulario(evento) {
    evento.preventDefault();
    var usuario = document.getElementById('name').value;
  if(usuario.length == 0) {
    alert('No has escrito nada en el Usuario');
    return;
  }
  var email = document.getElementById('email').value;
    if(email.length == 0) {
    alert('No has escrito nada en el Email')
    return;
  }
    else if (email.match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i) == null) {
    alert("El email no es correcto");
    return;
  }
  var mensaje = document.getElementById('message').value;
  if(mensaje.length == 0) {
    alert('No has escrito nada en el Mensaje');
    return;
  }
  this.submit();
  document.getElementById('mensaje').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
  <p><i class="bi bi-envelope-check"></i> Su mensaje ha sido enviado correctamente</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
}