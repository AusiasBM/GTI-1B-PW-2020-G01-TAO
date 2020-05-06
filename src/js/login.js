
function enviar(evento) {
    evento.preventDefault();
    fetch('api/v1.0/sesion', {
        method : 'post',
        body : new FormData(document.getElementById('login'))
    }).then(function (respuesta) {
        if (respuesta.status == 200){
            respuesta.json().then(function (rol) {
                //console.log(rol)
                if (rol == 3) {
                    //console.log("es 3");
                    location.href = './app';
                }else{
                    //console.log("no es 3");
                    location.href = './app/vistaTecnicoCooperativa.html';
                }
            });
        }else{
            if (respuesta.status == 400){
                document.getElementById("errorLogin").innerHTML = 'Falta usuario y/o contraseña';
            }else{
                document.getElementById("errorLogin").innerHTML = 'Usuario o contraseña incorrectos';
            }
        }
        return respuesta.json();
    })
}
