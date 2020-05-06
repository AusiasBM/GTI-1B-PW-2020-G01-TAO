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
            await j.forEach(parcela => this.creadorParcela(parcela.nombre, parcela.color, parcela.idParcela));
        }else{
            this.seccionParcelas.innerHTML = '<h3>NO TIENES PARCELAS</h3>';
        }
    },
    creadorParcela : function (nombreParcela, color, idParcela) {
        this.seccionParcelas.innerHTML += `<div class="card col-md-3 mt-3" id="${idParcela}">
                                                <div class="card-body">
                                                    <div class="col-12 d-flex justify-content-between border-bottom mb-4">
                                                        <h4 class="card-title">${nombreParcela}</h4>
                                                        <div class="col-2 colorParcelas" style="background-color: ${color}"></div>
                                                    </div>
                                                    <div class="d-flex">
                                                        <button type="button" class="btn btn-outline-info mr-auto" onclick="modificarParcela(${idParcela})">Modificar</button>
                                                        <button type="button" class="btn btn-outline-danger" id="${nombreParcela}" onclick="seccionAdmistrarParcelas(${idParcela})">Eliminar</button>
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