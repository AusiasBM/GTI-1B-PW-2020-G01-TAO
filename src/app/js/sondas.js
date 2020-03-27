let ModeloSonda = {
    url : '../api/v1.0/sondas',
    controlador : {},
    datos : [],
    cargar : function (url = '') {
        if (url == ''){
            url = this.url;
        }

        fetch(url).then(function (respuesta) {
            return respuesta.json();
        }).then((datosJson) => {
            console.log(datosJson);
            this.datos = datosJson;
            this.controlador.representar();
        });
    }
};

let VistaSelectorSonda = {
    selector : {},
    preparar : function cargarSondas() {

        fetch('../api/v1.0/sondas').then(function (r) {
            return r.json();
        }).then(function (j) {
            j.forEach(function (posicion) {
                var marker = new google.maps.Marker({
                    position: {lat: posicion.lat, lng: posicion.lng},
                    label: posicion.idSonda + "",
                    animation: google.maps.Animation.DROP,
                    map: map
                });
            })
        })
    },
    representar : function (j) {
        j.forEach(function (posicion) {
            var marker = new google.maps.Marker({
                position: {lat: posicion.lat, lng: posicion.lng},
                label: posicion.idSonda + "",
                animation: google.maps.Animation.DROP,
                map: map
            });
        })
    }
};

let ControladorSonda = {
    modelo : ModeloSonda,
    vista : VistaSelectorSonda,
    iniciar : function () {
        ModeloSonda.controlador = this;
        ModeloSonda.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};