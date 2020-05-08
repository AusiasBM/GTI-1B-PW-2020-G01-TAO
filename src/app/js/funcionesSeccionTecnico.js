
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

var usuario = {
    usuario: null,
    id: "",
    parcelas: [],
    color: "",
    nombre: "",
}