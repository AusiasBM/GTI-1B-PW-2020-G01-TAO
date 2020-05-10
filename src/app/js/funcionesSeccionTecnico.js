
function funcionesSeccionTecnico(idUsuario) {

    if (usuario.usuario == null) {

        var mensaje = confirm("Está seguro de que desea eliminar este usuario, en caso de ser una coperativa no se eliminan sus clientes?");

        if (mensaje) {
            /*
            let jsonObject = {idParcela: idParcela};

            fetch('../api/v1.0/parcela', {
                method: 'DELETE',
                body: JSON.stringify(jsonObject)
            }).then(function(res){
                if (res.status == 200){
                    alert("Parcela eliminada")
                    //console.log(res.status)
                    location.href = 'index.html';
                }else{
                    alert("Error Eliminando")
                }
            });*/

        }else {
            alert("No se a eliminado la parcela");
        }
    } else {
        alert("Estás modificando o creando una parcela")
    }
}

let cooperativasOption = [];

var usuario = {
    usuario: null,
    id: "",
    nombre: "",
    contrasenya: "",
    rol: "",
    parcelas: [],
    cooperativa: "",
}

// Botón añadir inicial
function anyadirUsuario(seccion) {

    if (usuario.usuario == null){
        usuario.id = seccion;
        usuario.usuario = document.getElementById(seccion).innerHTML.toString();
        VistaSelectorTecnicoLlenarUsuario.cooperativas.forEach(cooperativa => cooperativasOption += ('<option>' + cooperativa.nombre + '</option>'));
        document.getElementById(usuario.id).innerHTML = `<!-- Estilo cuando creamos una parcela -->
                                                        <div class="card col-md-3 m-3 border-success">
                                                            <div class="card-body">
                                                                <div class="d-flex flex-column justify-content-center border-bottom border-success mb-4">
                                        
                                                                    <input type="text" class="card-title col-12" id="campoDni" placeholder="Nombre completo">
                                        
                                                                    <select class="col-12 my-2 disenyoSelector">
                                                                        <option selected="true" disabled="disabled" value="titulo">Que rol es</option>
                                                                        <option>Usuario</option>
                                                                        <option>Cooperativa</option>
                                                                        <option>Técnico</option>
                                                                    </select>
                                                                    
                                                                    <select class="col-12 my-2 disenyoSelector" >
                                                                        <option selected="true" disabled="disabled" value="titulo">Añadir a cooperativa</option>
                                                                        <option>Ninguna</option>
                                                                        ${cooperativasOption}
                                                                    </select>
                                                                </div>
                                                                <div class="d-flex">
                                                                    <button type="button" class="btn btn-outline-success mr-auto">Crear</button>
                                                                    <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                                </div>
                                                            </div>
                                                        </div>` + document.getElementById(usuario.id).innerHTML;

    }else{
        alert("Estas modificando o creando un usuario")
    }

}

// Botón descartar
function descartar() {

    //console.log(document.getElementById(parcela))
    document.getElementById(usuario.id).innerHTML = usuario.usuario;
    usuario.id = null;
    usuario.usuario = null;

}

// Añadir desplegable de usuarios
function anyadirUsuariosDesplegableCooperativa() {

    fetch('../api/v1.0/usuariosRolUsuario').then(function (respuesta) {
        return respuesta.json();
    }).then((datosJson) => {
        console.log(datosJson);

        if (datosJson[0] != null) {
            for(let usuario of datosJson){
                document.getElementById('select-usuariosParaVincular').innerHTML += `<option value="${usuario.id}">${usuario.nombre}</option>`
            }
        }else{
            document.getElementById('select-usuariosParaVincular').innerHTML += `<option>No hay usuarios</option>`
        }
    });
}