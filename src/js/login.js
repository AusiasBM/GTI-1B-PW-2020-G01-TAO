
function enviar(evento) {
    evento.preventDefault();
    fetch('api/v1.0/sesion', {
        method : 'post',
        body : new FormData(document.getElementById('login'))
    }).then(function (respuesta) {
        if (respuesta.status == 200){
            /*return respuesta.text().then(function (t) {
                console.log(t);
            });*/
            location.href = './app';
        }else{
            if (respuesta.status == 400){
                document.getElementById("errorLogin").innerHTML = 'Falta usuario y/o contraseña';
            }else{
                document.getElementById("errorLogin").innerHTML = 'Usuario o contraseña incorrectos';
            }
        }
    })
}
