
function roles() {
    fetch('../api/v1.0/roles').then(function (respuesta) {
        return respuesta.json();
    }).then((datosJson) => {
        //console.log(datosJson);

        if (datosJson[0]['numRol-usuario'] != 0){
            document.getElementById('mijas').innerHTML = `<ol class="breadcrumb">
                                                                        <li class="breadcrumb-item active" aria-current="page">Usuario ${datosJson[0]['nombre-usuario']}</li>
                                                                   </ol>`;
        }

        if (datosJson[0]['numRol-cooperativa'] != 0){
            document.getElementById('mijas').innerHTML = `<ol class="breadcrumb">
                                                                        <li class="breadcrumb-item"><a href="vistaTecnicoCooperativa.html">Cooperativa</a></li>
                                                                        <li class="breadcrumb-item active" aria-current="page">Cliente ${datosJson[0]['nombre-usuario']}</li>
                                                                   </ol>`;
        }

        if (datosJson[0]['numRol-tecnico'] != 0){
            document.getElementById('nav-tab').innerHTML += `<a class="nav-item nav-link" id="nav-tecnico-tab" data-toggle="tab" href="#nav-tecnico" role="tab" aria-controls="nav-tecnico" aria-selected="false">Técnico</a>`
            document.getElementById('mijas').innerHTML = `<ol class="breadcrumb">
                                                                        <li class="breadcrumb-item"><a href="vistaTecnicoCooperativa.html">Técnico</a></li>
                                                                        <li class="breadcrumb-item active" aria-current="page">Usuario ${datosJson[0]['nombre-usuario']}</li>
                                                                   </ol>`;
        }

        if (datosJson[0]['numRol-tecnico'] != 0 && datosJson[0]['numRol-cooperativa'] != 0){
            document.getElementById('mijas').innerHTML = `<ol class="breadcrumb">
                                                                        <li class="breadcrumb-item"><a onclick="quitarUsuario(2)" href="vistaTecnicoCooperativa.html">Técnico</a></li>
                                                                        <li class="breadcrumb-item"><a href="vistaTecnicoCooperativa.html">Cooperativa</a></li>
                                                                        <li class="breadcrumb-item active" aria-current="page">Cliente ${datosJson[0]['nombre-usuario']}</li>
                                                                   </ol>`;

        }


    });
}