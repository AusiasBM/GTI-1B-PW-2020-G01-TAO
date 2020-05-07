
function pasarAlUsuario(nombreUsuario, idUsuario, tipoRol) {

    let usuario = {idUsuario: idUsuario, tipoRol: tipoRol, nombreUsuario: nombreUsuario};

    fetch('../api/v1.0/anyadirRol', {
        method: 'post',
        body: JSON.stringify(usuario)
    }).then(function(res){
        if (res.status == 200){
            location.href = 'index.html';
        }
    });
}

function quitarUsuario(tipoRol) {
    let usuario = {tipoRol: tipoRol};

    fetch('../api/v1.0/usuario', {
        method: 'delete',
        body: JSON.stringify(usuario)
    }).then(function(res){
        return res.json();
    }).then(
        //res => console.log(res)
    );
}