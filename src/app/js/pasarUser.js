
function pasarAlUsuario(nombreUsuario, idUsuario, tipoRol) {

    if(usuario.usuario == null){
        let usuario = {idUsuario: idUsuario, tipoRol: tipoRol, nombreUsuario: nombreUsuario};

        fetch('../api/v1.0/anyadirRol', {
            method: 'post',
            body: JSON.stringify(usuario)
        }).then(function(res){
            res.json().then((res) => console.log(res))
            if (res.status == 200){
                if (tipoRol == 3) location.href = 'index.html';
                if (tipoRol != 3) location.href = 'vistaTecnicoCooperativa.html';
            }
        });
    }else{
        alert("Estas modificando o creando un usuario")
    }



}

function quitarUsuario(tipoRol) {
    let usuario = {tipoRol: tipoRol};

    fetch('../api/v1.0/jerarquiaUsuario', {
        method: 'delete',
        body: JSON.stringify(usuario)
    }).then(function(res){
        return res.json();
    }).then(
        //res => console.log(res)
    );
}