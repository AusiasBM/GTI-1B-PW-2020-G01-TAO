
function eliminarParcela(idParcela){

    let jsonObject = {idParcela:idParcela};

    fetch('../api/v1.0/parcela',{
        method: 'DELETE',
        body: JSON.stringify(jsonObject)
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));

}

