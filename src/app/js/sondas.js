let ModeloSoda = {
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
            //console.log(datosJson);
            this.datos = datosJson;
            this.controlador.representar();
        });
    }
};

let VistaSelectorSoda = {
    parcelas : [],
    representar : function (j) {
        //console.log(j)

        let sondas = [];
        let parcelas = [];
        let idParcela = -1;

        j.forEach(function (posicion) {
            var marker = new google.maps.Marker({
                position: {lat: posicion.lat, lng: posicion.lng},
                label: posicion.idSonda + "",
                animation: google.maps.Animation.DROP,
                map: map
            });

            marker.addListener('click', function () {
                $('#nav-tab a[href="#nav-grafica"]').tab('show') // Select tab by name
                ControladorMedic.modelo.filtrar('idSonda', posicion.idSonda + "");
                document.getElementById("sonda_grafica").innerText = "Sonda " + posicion.idSonda;
            });

            if (idParcela == -1){
                idParcela = posicion.idParcela;
                sondas.push(marker);
                //console.log("-1: " + posicion.idParcela)
            }else{
                if (idParcela == posicion.idParcela){
                    sondas.push(marker);
                    //console.log("inicio: " + posicion.idParcela)
                }else{
                    parcelas[idParcela] = sondas;
                    sondas = [];
                    sondas.push(marker);
                    idParcela = posicion.idParcela;
                    //console.log("fin: " + posicion.idParcela)
                }
            }


        });

        parcelas[idParcela] = sondas;
        this.parcelas = parcelas;

        //console.log(this.parcelas);
    },
    visualizarSonda: function (indice){

        //console.log(indice)

        if(indice == -1){

            this.parcelas.forEach(function (parcela, index) {
                for (var j = 0; j < parcela.length; j++){
                    let p = parcela[j];
                    p.setMap(map);
                }
            })

            return;
        }

        this.parcelas.forEach(function (parcela, index) {
            for (var j = 0; j < parcela.length; j++){
                let p = parcela[j];
                if(index == indice){
                    p.setMap(map);
                }else{
                    p.setMap(null);
                }
            }
        })
    }
};

let ControladorSoda = {
    modelo : ModeloSoda,
    vista : VistaSelectorSoda,
    iniciar : function () {
        ModeloSoda.controlador = this;
        ModeloSoda.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};