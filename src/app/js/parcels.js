let ModeloParcels = {
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

let VistaSelectorParcels = {
    selector : {},
    parcelas : [],
    preparar : function (selectId) {
        this.selector = document.getElementById(selectId);
        this.selector.innerHTML = '<option value="-1">Todas</option>';
    },
    representar : async function (j) {
        //console.log(j);

        let selector = this.selector;

        let bounds = new google.maps.LatLngBounds();
        let parcelas = [];

        await j.forEach(function (parcela) {
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
            });

            parcelas[parcela.idParcela] = polygon;
            let opcion = '<option value = "'+ parcela.idParcela +'" >' + parcela.nombre + '</option>';
            selector.innerHTML += opcion;

        });

        map.fitBounds(bounds);

        this.parcelas = parcelas;
    },
    visualizarParcela: function (indice){

        //console.log(indice)

        let bounds = new google.maps.LatLngBounds();

        if(indice == -1){
            this.parcelas.forEach(function (parcela) {
                let p = parcela;
                p.setMap(map);
                p.getPath().getArray().forEach(function (v) {
                    bounds.extend(v);
                })
            })

            map.fitBounds(bounds);
            return;
        }

        this.parcelas.forEach(function (parcela, index) {
            let p = parcela;
            if(index == indice){
                p.setMap(map);
                p.getPath().getArray().forEach(function (v) {
                    bounds.extend(v);
                })
            }else{
                p.setMap(null);
            }
        })

        map.fitBounds(bounds);
    },
};

let ControladorParcels = {
    modelo : ModeloParcels,
    vista : VistaSelectorParcels,
    iniciar : function () {
        ModeloParcels.controlador = this;
        ModeloParcels.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};