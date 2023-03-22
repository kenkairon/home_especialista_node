const btn = document.getElementById('button');

document.querySelector('form')
 .addEventListener('submit', function(event) {
  event.preventDefault();
  const alerta = document.getElementById('mensaje');
  alerta.classList.add("alert","alert-danger","h6");
 
  var usuario = document.getElementById('name').value;
    if(usuario.length == 0) {
      alerta.textContent = 'No a ingresado nombre de usuario';
      return;
    }
  var email = document.getElementById('email').value;
    if(email.length == 0) {
      alerta.textContent = 'No a escrito nada en el email';
      return;
    }
    else if (email.match(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i) == null) {
      alerta.textContent = 'El Email no es Correcto';
      return;
    }
  var mensaje = document.getElementById('message').value;
    if(mensaje.length == 0) {
      alerta.textContent = 'No a escrito ningún mensaje';
      return;
    }

  btn.value = 'Enviando...';

  const serviceID = 'default_service';
  const templateID = 'template_pgzdyds';

  emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Send Email';
      alert.hidden
      document.getElementById('mensaje').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
      <p><i class="bi bi-envelope-check"></i> Su mensaje ha sido enviado correctamente</p>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
      this.submit();
    }, (err) => {
      btn.value = 'Send Email';
      alert(JSON.stringify(err));
    });
});
