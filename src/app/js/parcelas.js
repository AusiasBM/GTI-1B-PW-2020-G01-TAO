let ModeloMapa = {
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
    },
    filtros : {
        nombre : 0
    },
    filtrar : function (parametro, valor) {
        this.filtros[parametro] = valor;
        let queryParams = [];
        if(this.filtros.nombre != 0) {
            queryParams.push('nombre='+this.filtros.nombre);
        }
        if(queryParams.length > 0) {
            let query = queryParams.join('&');
            this.cargar(this.url + '?' + encodeURI(query));
        } else {
            this.cargar();
        }
    }
};

let VistaSelectorMapa = {
    selector : {},
    preparar : function cargarParcelas() {

        fetch('../api/v1.0/parcelas').then(function (r) {
            return r.json();
        }).then(function (j) {
            //console.log(j)
            let bounds = new google.maps.LatLngBounds();

            j.forEach(function (parcela) {

                let polygon = new google.maps.Polygon({
                    paths: parcela.vertices,
                    strokeColor: parcela.color, // Color del borde
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: parcela.color, // Color de relleno
                    fillOpacity: 0.35,
                    map: map
                });

                polygon.getPath().getArray().forEach(function (v) {
                    bounds.extend(v);
                })
            });

            map.fitBounds(bounds);

        })
    },
    representar : function (j) {

        initMap();
        //console.log(j);
        let bounds = new google.maps.LatLngBounds();
        j.forEach(function (parcela) {
            let polygon = new google.maps.Polygon({
                paths: parcela.vertices,
                strokeColor: parcela.color, // Color del borde
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: parcela.color, // Color de relleno
                fillOpacity: 0.35,
                map: map
            });

            polygon.getPath().getArray().forEach(function (v) {
                bounds.extend(v);
            })
        });

        map.fitBounds(bounds);
    }

};

let ControladorMapa = {
    modelo : ModeloMapa,
    vista : VistaSelectorMapa,
    iniciar : function () {
        ModeloMapa.controlador = this;
        ModeloMapa.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};