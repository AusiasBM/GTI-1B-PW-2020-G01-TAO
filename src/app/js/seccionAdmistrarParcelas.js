
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

function modificarParcela(idParcela) {
    if (parcela == null) {
        id = idParcela;
        parcela = document.getElementById(idParcela).innerHTML.toString();
        document.getElementById(idParcela).innerHTML = `<div class="card-body">
                                <div class="d-flex justify-content-between border-bottom mb-4">
                                    <input type="text" class="card-title col-9" id="tituloCampo" placeholder="Nombre parcela">
                                    <input type="color" value="#1fe271">
                                </div>
                                <div class="d-flex">
                                    <button type="button" class="btn btn-outline-success m-auto">Modificar</button>
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
                                                            <div class="d-flex justify-content-between border-bottom border-success mb-4">
                                                                <input type="text" class="card-title col-9" id="tituloCampo" placeholder="Nombre Parcela">
                                                                <input type="color" value="#1fe271">
                                                            </div>
                                                            <div class="d-flex">
                                                                <button type="button" class="btn btn-outline-success mr-auto">Crear</button>
                                                                <button type="button" class="btn btn-outline-danger" onclick="descartar()">Descartar</button>
                                                            </div>
                                                        </div>
                                                    </div>`
    }else{
        alert("Estas modificando o creando una parcela")
    }


}


function descartar() {

    console.log(document.getElementById(parcela))
    document.getElementById(id).innerHTML = parcela;
    id = null;
    parcela = null;

}
