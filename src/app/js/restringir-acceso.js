
fetch('../api/v1.0/sesion').then(function (respuesta) {
    if (respuesta.status != 200){
        alert("No tienes acceso");
        location.href = '..';
    }else{
        document.body.style.display = 'block';
    }
});
