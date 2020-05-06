
function seccionAdmistrarParcelas(idParcela){
    if (parcela == null) {
        var mensaje = confirm("Está seguro de que desea eliminar la parcela?");

        if (mensaje) {
            let jsonObject = {idParcela: idParcela};

            fetch('../api/v1.0/parcela', {
                method: 'DELETE',
                body: JSON.stringify(jsonObject)
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => alert("Parcela eliminada"));
            location.href = 'index.html';
        } else {
            alert("No se a eliminado la parcela");
        }
    }else{
        alert("Estás modificando o creando una parcela")
    }
}

let parcela;
let id;
let vertices;
let color;
let nombre;

function modificarParcela(idParcela) {
    if (parcela == null) {
        id = idParcela;
        parcela = document.getElementById(idParcela).innerHTML.toString();
        document.getElementById(idParcela).innerHTML = `<div class="card-body">
                                                            <div class="d-flex justify-content-between border-bottom mb-4">
                                                                <input type="text" class="card-title col-9" id="tituloCampoModificandose" placeholder="Nombre parcela">
                                                                <input type="color" value="#1fe271" id="colorParcelaModificandose">
                                                            </div>
                                                            <div class="d-flex">
                                                                <button type="button" class="btn btn-outline-success mr-auto" onclick="generarModificacion()">Modificar</button>
                                                                <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                            </div>
                                                        </div>`
    }else{
        alert("Estás modificando o creando una parcela")
    }
}



function anyadirParcela(seccion) {

    if (parcela == null){
        id = seccion;
        parcela = document.getElementById(seccion).innerHTML.toString();
        document.getElementById(seccion).innerHTML += `<div class="card col-md-3 mt-3 border-success" id="anyadir">
                                                        <div class="card-body">
                                                            <div class="d-flex flex-column justify-content-between border-bottom border-success pb-2">
                                                                <div class="d-flex justify-content-between mb-1">
                                                                    <input type="text" class="card-title col-9" id="tituloCampoCreandose" placeholder="Nombre Parcela">
                                                                    <input type="color" id="colorParcelaCreandose" value="#1fe271">
                                                                </div>
                                                                
                                                               <p>Vertices:</p>
                                                               
                                                                <select class="col-12 disenyoSelector" id="selectorVertices">
                                                                    <option>Vertice 1 | lat: 345332 lon: 45323</option>
                                                                    <option>Vertice 2</option>
                                                                    <option>Vertice 3</option>
                                                                    <option>Vertice 4</option>
                                                                </select>
                                                                
                                                                <div class="collapse" id="collapseVertices">
                                                                    <div class="card card-body d-flex flex-column justify-content-center">
                                                                        <input type="text" class="card-title" id="latitud" placeholder="Latitud">
                                                                        <input type="text" class="card-title" id="longitud" placeholder="Longitud">
                                                                        <button type="button" class="btn btn-success" onclick="anyadirVertice()" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Añadir</button>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div class="d-flex pt-2">
                                                                    <button type="button" class="btn btn-success mr-auto" data-toggle="collapse" data-target="#collapseVertices" aria-expanded="false" aria-controls="collapseVertices">Crear</button>
                                                                    <button type="button" class="btn btn-danger" onclick="eliminarVertice()">Eliminar</button>
                                                                </div>
                                                            </div>
                                                            <div class="d-flex pt-2">
                                                                <button type="button" class="btn btn-outline-success mr-auto" onclick="generarCreacion()">Crear</button>
                                                                <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                            </div>
                                                        </div>
                                                    </div>`

        vertices = document.getElementById("selectorVertices");

    }else{
        alert("Estas modificando o creando una parcela")
    }

}

function anyadirVertice() {
    document.getElementById("selectorVertices").innerHTML += `<option>Latitud: ${document.getElementById("latitud").value} | Longitud: ${document.getElementById("longitud").value}`;
    console.log(document.getElementById("latitud").value)
    console.log(document.getElementById("longitud").value)
    document.getElementById("latitud").value = "";
    document.getElementById("longitud").value = "";
}

function eliminarVertice() {
    console.log(document.getElementById("selectorVertices").value)
}


function descartar() {

    //console.log(document.getElementById(parcela))
    document.getElementById(id).innerHTML = parcela;
    id = null;
    parcela = null;

}

function generarCreacion() {

    // PONER UNA ALERTA
    console.log(document.getElementById("tituloCampoCreandose").value)
    console.log(document.getElementById("colorParcelaCreandose").value)
}


function generarModificacion() {

    // PONER UNA ALERTA
    console.log(document.getElementById("tituloCampoModificandose").value)
    console.log(document.getElementById("colorParcelaModificandose").value)
}