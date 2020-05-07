
function funcionesSeccionTecnico(idParcela){
    if (parcela.parcela == null) {

        var mensaje = confirm("Está seguro de que desea eliminar la parcela?");

        if (mensaje) {
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
            });

        }else {
            alert("No se a eliminado la parcela");
        }
    }else{
        alert("Estás modificando o creando una parcela")
    }
}

var parcela = {
    parcela: null,
    id: "",
    vertices: [],
    color: "",
    nombre: "",
}

//Botón modifica inicial
function modificarParcela(idParcela) {
    if (parcela.parcela == null) {
        parcela.id = idParcela;
        parcela.nombre = VistaSelectorTecnicoUsuario.parcelas[parcela.id].nombre;
        parcela.color = VistaSelectorTecnicoUsuario.parcelas[parcela.id].color;
        parcela.parcela = document.getElementById(idParcela).innerHTML.toString();
        parcela.vertices = VistaSelectorTecnicoUsuario.parcelas[parcela.id].vertices;
        let opciones = "";
        parcela.vertices.forEach(vertice => opciones += ('<option>Latitud: ' + vertice.lat + ' | Longitud: ' + vertice.lng + '</option>'));
        //console.log(parcela.vertices )
        document.getElementById(parcela.id).innerHTML = `<div class="card-body">
                                                            <div class="d-flex flex-column justify-content-between border-bottom border-success pb-2">
                                                                <div class="d-flex justify-content-between mb-1">
                                                                    <input type="text" class="card-title col-9" id="tituloCampoModificandose" placeholder="Nombre Parcela" value="${parcela.nombre}">
                                                                    <input type="color" id="colorParcelaModificandose" value="${parcela.color}">
                                                                </div>
                                                                
                                                                <select class="col-12 disenyoSelector" id="selectorVertices">
                                                                    <option selected="true" disabled="disabled" value="titulo">Vertices</option>
                                                                    ${opciones}
                                                                </select>
                                                                
                                                                <div class="collapse" id="collapseVertices">
                                                                    <div class="card card-body d-flex flex-column justify-content-center">
                                                                        <input type="text" class="card-title" id="latitud" placeholder="Latitud">
                                                                        <input type="text" class="card-title" id="longitud" placeholder="Longitud">
                                                                        <button type="button" class="btn btn-success" onclick="anyadirVertice()" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Añadir vertice</button>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="d-flex pt-2">
                                                                    <button type="button" class="btn btn-success mr-auto" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Crear vertice</button>
                                                                    <button type="button" class="btn btn-danger" onclick="eliminarVertice()">Eliminar vertice</button>
                                                                </div>
                                                            </div>
                                                            
                                                            <div class="d-flex pt-2">
                                                                <button type="button" class="btn btn-outline-success mr-auto" onclick="generarModificacion()">Guardar</button>
                                                                <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                            </div>
                                                        </div>`
    }else{
        alert("Estás modificando o creando una parcela")
    }
}

// Botón añadir inicial
function anyadirParcela(seccion) {

    if (parcela.parcela == null){
        parcela.id = seccion;
        parcela.parcela = document.getElementById(seccion).innerHTML.toString();
        document.getElementById(parcela.id).innerHTML = `<div class="card col-md-3 mt-3 border-success" id="anyadir">
                                                            <div class="card-body">
                                                                <div class="d-flex flex-column justify-content-between border-bottom border-success pb-2">
                                                                    <div class="d-flex justify-content-between mb-1">
                                                                        <input type="text" class="card-title col-9" id="tituloCampoCreandose" placeholder="Nombre Parcela">
                                                                        <input type="color" id="colorParcelaCreandose" value="#1fe271">
                                                                    </div>
                                                                    
                                                                    <div class="border">
                                                                        <select class="col-12 disenyoSelector" id="selectorVertices">
                                                                            <option selected="true" disabled="disabled" value="titulo">Vertices</option>
                                                                        </select>
                                                                        
                                                                        <div class="collapse" id="collapseVertices">
                                                                            <div class="card card-body border-0 d-flex flex-column justify-content-center">
                                                                                <input type="text" class="card-title" id="latitud" placeholder="Latitud">
                                                                                <input type="text" class="card-title" id="longitud" placeholder="Longitud">
                                                                                <button type="button" class="btn btn-success" onclick="anyadirVertice()" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Añadir vertice</button>
                                                                            </div>
                                                                        </div>
                                                                        
                                                                        <div class="d-flex pt-2">
                                                                            <button type="button" class="btn btn-success mr-auto" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Crear vertice</button>
                                                                            <button type="button" class="btn btn-danger" onclick="eliminarVertice()">Eliminar vertice</button>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    
                                                                </div>
                                                                <div class="d-flex pt-2">
                                                                    <button type="button" class="btn btn-outline-success mr-auto" onclick="generarCreacion()">Crear</button>
                                                                    <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                                </div>
                                                            </div>
                                                        </div>` + document.getElementById(parcela.id).innerHTML;

    }else{
        alert("Estas modificando o creando una parcela")
    }

}

// Boton añadir vertice
function anyadirVertice() {
    document.getElementById("selectorVertices").innerHTML += `<option>Latitud: ${document.getElementById("latitud").value} | Longitud: ${document.getElementById("longitud").value}`;
    //console.log(document.getElementById("latitud").value)
    //console.log(document.getElementById("longitud").value)
    document.getElementById("latitud").value = "";
    document.getElementById("longitud").value = "";
}

// Botón que elimina vertices en el select de la vista, pero no en la base de datos
function eliminarVertice() {
    console.log(document.getElementById("selectorVertices").selectedIndex)
    if(document.getElementById("selectorVertices").selectedIndex != 0){
        var mensajeVertice = confirm("Está seguro de que desea eliminar el vertice?");

        if (mensajeVertice){
            document.getElementById("selectorVertices").remove(document.getElementById("selectorVertices").selectedIndex)
            alert("Vertice eliminado correctamente")
        }else{
            alert("No se ha eliminado el vertice")
        }

    }
}

// Botón que genera la nueva parcela
function generarCreacion() {

    if (document.getElementById("selectorVertices").innerText.split("\n").length >= 4 && document.getElementById("tituloCampoCreandose").value != ""){
        parcela.nombre = document.getElementById("tituloCampoCreandose").value;
        parcela.color = document.getElementById("colorParcelaCreandose").value;
        parcela.vertices = document.getElementById("selectorVertices").innerText.split("\n");

        fetch('../api/v1.0/crearParcela', {
            method: 'post',
            body: JSON.stringify(parcela)
        }).then(function (res) {
            if (res.status == 200){
                location.href = 'index.html';
                parcela.parcela = null;
            }else{
                alert("No se ha añadido correctamente")
            }
        });

    }else{
        alert("Falta el nombre o tienes menos de 3 vertices");
    }

    /*
    // PONER UNA ALERTA
    console.log(document.getElementById("tituloCampoCreandose").value)
    console.log(document.getElementById("colorParcelaCreandose").value)
    console.log(document.getElementById("selectorVertices").innerText.split("\n"))
    */
}

// Botón que modifica la parcela
function generarModificacion() {

    if (document.getElementById("selectorVertices").innerText.split("\n").length >= 4 && document.getElementById("tituloCampoModificandose").value != ""){
        parcela.nombre = document.getElementById("tituloCampoModificandose").value;
        parcela.color = document.getElementById("colorParcelaModificandose").value;
        parcela.vertices = document.getElementById("selectorVertices").innerText.split("\n");

        console.log(document.getElementById("selectorVertices").innerText.split("\n"))
        console.log(parcela.id)

        fetch('../api/v1.0/editarParcela', {
            method: 'post',
            body: JSON.stringify(parcela)
        }).then(function (res) {
            if (res.status == 200){
                location.href = 'index.html';
                parcela.parcela = null;
            }else{
                alert("No se ha modificado correctamente")
            }
        });

    }else{
        alert("Falta el nombre o tienes menos de 3 vertices");
    }

}

// Botón descartar
function descartar() {

    //console.log(document.getElementById(parcela))
    document.getElementById(parcela.id).innerHTML = parcela.parcela;
    parcela.id = null;
    parcela.parcela = null;

}
