
function funcionesSeccionTecnico(idUsuario) {

    if (usuario.usuario == null) {

        var mensaje = confirm("Está seguro de que desea eliminar este usuario, en caso de ser una coperativa no se eliminan sus clientes?");

        if (mensaje) {

            let jsonObject = {idUsuario: idUsuario};

            fetch('../api/v1.0/usuario', {
                method: 'DELETE',
                body: JSON.stringify(jsonObject)
            }).then(function(res){
                if (res.status == 200){
                    alert("Usuario eliminado")
                    //console.log(res.status)
                    location.href = 'vistaTecnicoCooperativa.html';

                }else{
                    alert("Error Eliminando")
                }
            });

        }else {
            alert("No se a eliminado el usuario");
        }
    } else {
        alert("Estás modificando o creando un usuario")
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
        cooperativasOption = [];
        VistaSelectorTecnicoLlenarUsuario.cooperativas.forEach(cooperativa => cooperativasOption += ('<option value="' + cooperativa.id + '">' + cooperativa.nombre + '</option>'));
        document.getElementById(usuario.id).innerHTML = `<!-- Estilo cuando creamos una parcela -->
                                                        <div class="card col-md-3 m-3 border-success">
                                                            <div class="card-body">
                                                                <div class="d-flex flex-column justify-content-center border-bottom border-success mb-4">
                                        
                                                                    <input type="text" class="card-title col-12" id="nombreUsuario" placeholder="Nombre completo">
                                        
                                                                    <select class="col-12 my-2 disenyoSelector" id="selector-rol">
                                                                        <option selected="true" disabled="disabled" value="-1">Tipo de usuario</option>
                                                                        <option value="3">Usuario</option>
                                                                        <option value="2">Cooperativa</option>
                                                                        <option value="1">Técnico</option>
                                                                    </select>
                                                                    
                                                                    <select class="col-12 my-2 disenyoSelector" id="selector-cooperativa">
                                                                        <option selected="true" disabled="disabled" value="-1">Añadir a cooperativa</option>
                                                                        <option value="-1">Ninguna</option>
                                                                        ${cooperativasOption}
                                                                    </select>
                                                                </div>
                                                                <div class="d-flex">
                                                                    <button type="button" class="btn btn-outline-success mr-auto" onclick="generarCreacion()">Crear</button>
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

// Botón que genera la nueva parcela
function generarCreacion() {

    if (document.getElementById("selector-rol").value != -1  && document.getElementById("nombreUsuario").value != ""){

        usuario.nombre = document.getElementById("nombreUsuario").value;
        usuario.rol = document.getElementById("selector-rol").value;
        usuario.cooperativa = document.getElementById("selector-cooperativa").value;

        fetch('../api/v1.0/crearUsuario', {
            method: 'post',
            body: JSON.stringify(usuario)
        }).then(function (res) {
            if (res.status == 200){
                location.href = 'vistaTecnicoCooperativa.html';
                usuario.usuario = null;
            }else{
                alert("No se ha añadido correctamente")
            }
            return res.json();
        }).then(res => console.log(res));

    }else{
        alert("Falta el nombre o tipo de usuario");
    }

}

// Añadir desplegable de usuarios
function anyadirUsuariosDesplegableCooperativa() {

    fetch('../api/v1.0/usuariosRolUsuario').then(function (respuesta) {
        return respuesta.json();
    }).then((datosJson) => {
        //console.log(datosJson);

        if (datosJson[0] != null) {
            for(let usuario of datosJson){
                document.getElementById('select-usuariosParaVincular').innerHTML += `<option value="${usuario.id}">${usuario.nombre}</option>`
            }
        }else{
            document.getElementById('select-usuariosParaVincular').innerHTML += `<option value="-1">No hay usuarios</option>`
        }
    });
}

function vincularUsuarioCooperativa() {

    if (document.getElementById("select-usuariosParaVincular").value != -1){

        let jsonObject = {idUsuario: document.getElementById("select-usuariosParaVincular").value};

        fetch('../api/v1.0/vincularUsuarioCooperativa', {
            method: 'post',
            body: JSON.stringify(jsonObject)
        }).then(function (res) {
            if (res.status == 200){
               location.href = 'vistaTecnicoCooperativa.html';
            }else{
                if (res.status == 400) {
                    alert("Ya esta añadido")
                }else{
                    alert("No se ha añadido correctamente")
                }
            }
            //return res.json()
        });

    }else{
        alert("No hay usuarios para vincular");
    }


}

function desvincularUsuarioCooperativa(idUsuario){

    let jsonObject = {idUsuario: idUsuario};

    fetch('../api/v1.0/desvincularUsuarioCooperativa', {
        method: 'post',
        body: JSON.stringify(jsonObject)
    }).then(function (res) {
        if (res.status == 200){
            location.href = 'vistaTecnicoCooperativa.html';
        }else{
            if (res.status == 400) {
                alert("Ya esta añadido")
            }else{
                alert("No se ha añadido correctamente")
            }
        }
        //return res.json()
    });


}