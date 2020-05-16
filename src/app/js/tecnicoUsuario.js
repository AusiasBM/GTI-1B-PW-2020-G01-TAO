let ModeloTecnicoUsuario = {
    url : '../api/v1.0/parcelas',
    controlador : {},
    datos : [],
    cargar : function (url = '') {
        if (url == ''){
            url = this.url;
        }

        fetch(url).then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            //console.log(datosJson);
            this.datos = datosJson;
            this.controlador.representar();
        });
    }
};

let VistaSelectorTecnicoUsuario = {
    seccionParcelas : {},
    parcelas : [],
    preparar : function (selectId) {
        this.seccionParcelas = document.getElementById(selectId);
        this.seccionParcelas.innerHTML = '<h3>CARGANDO PARCELAS</h3>';
    },
    representar : async function (j) {
        //console.log(j);

        this.seccionParcelas.innerHTML = '';

        if (j[0] != null) {
            await j.forEach(parcela => this.creadorParcela(parcela.nombre, parcela.color, parcela.idParcela, parcela.vertices));
            await j.forEach(parcela => this.parcelas[parcela.idParcela] = parcela);
        }else{
            this.seccionParcelas.innerHTML = '<h3>NO TIENES PARCELAS</h3>';
        }
    },
    creadorParcela : function (nombreParcela, color, idParcela) {
        this.seccionParcelas.innerHTML += `<div class="card col-md-5 m-3 shadow p-3 mb-5 bg-white rounded" id="${idParcela}">
                                                <div class="card-body d-flex justify-content-between align-items-center">
                                                    <div class="d-flex flex-column justify-content-between">
                                                        <h4 class="card-title">${nombreParcela}</h4>
                                                        <div class="colorParcelas" id="colorParcela" style="background-color: ${color}"></div>
                                                    </div>
                                                    <div class="d-flex justify-content-md-around">
                                                        <a class="mr-2" onclick="modificarParcela(${idParcela})" role="button" title="Añadir usuario"><img src="img/editar.svg" height="35" alt="boton-editar-parcela"></a>
                                                        <a id="${nombreParcela}" onclick="funcionesSeccionTecnicoUsuario(${idParcela})"role="button" title="Añadir usuario"><img src="img/eliminar.svg" height="40" alt="boton-eliminar-parcela"></a>
                                                    </div>
                                                </div>
                                            </div>`;
    },
};

let ControladorTecnicoUsuario = {
    modelo : ModeloTecnicoUsuario,
    vista : VistaSelectorTecnicoUsuario,
    iniciar : function () {
        ModeloTecnicoUsuario.controlador = this;
        ModeloTecnicoUsuario.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};