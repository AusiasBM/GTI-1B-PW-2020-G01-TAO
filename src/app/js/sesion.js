fetch('../api/v1.0/sesion').then(function (respuesta) {
    //console.log(respuesta);
    return respuesta.json();
}).then(function (datosJson) {
    //console.log(datosJson);
    let nombre = document.getElementById('idNombre');
    nombre.innerHTML += `${datosJson[0].nombre}`

    let rol = document.getElementById('rol');
    rol.innerHTML += `${datosJson[0].rol}`
});

let ModeloSesion = {
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

let VistaSelectorSesion = {
    selector : {},
    preparar : function(selectId){
        this.selector = document.getElementById(selectId);
        this.selector.innerHTML = '<option value="0">Todas</option>';


    },
    representar : function (parcelas) {
        parcelas.forEach((parcela) => {
            this.selector.innerHTML += `<option>${parcela.nombre}</option>`
        })
    }
};

let ControladorSesion = {
    modelo : ModeloSesion,
    vista : VistaSelectorSesion,
    iniciar : function () {
        ModeloSesion.controlador = this;
        ModeloSesion.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};