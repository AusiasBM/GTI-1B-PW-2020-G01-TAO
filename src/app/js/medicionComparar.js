let ModeloMedicionesComparar = {
    url : '../api/v1.0/mediciones',
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
        idSonda : 0,
        fechaIni : 0,
        fechaFin : 0,
    },
    filtrar : async function (parametro, valor) {
        this.filtros[parametro] = valor;
        let queryParams = [];
        if(this.filtros.idSonda != 0) {
            queryParams.push('idSonda='+this.filtros.idSonda);
        }
        if(this.filtros.fechaIni != 0) {
            queryParams.push('fechaIni='+this.filtros.fechaIni);
        }
        if(this.filtros.fechaFin != 0) {
            queryParams.push('fechaFin='+this.filtros.fechaFin);
        }
        if(queryParams.length > 0) {
            let query = queryParams.join('&');
           await this.cargar(this.url + '?' + encodeURI(query));
        } else {
            this.cargar();
        }
    }
};

let VistaSelectorMedicionesComparar = {
    selectorSonda : {},
    grafica : {},
    contenidoAnterior : [],
    preparar : function () {
        this.grafica = VistaSelectorMedic.graficaTotal;
        this.selectorSonda = document.getElementById( "selectorSonda" );
        VistaSelectorSoda.todasSondas.forEach(posicion => this.selectorSonda.innerHTML += `<option value="${posicion.idSonda}">Sonda ${posicion.idSonda}</option>`);
    },
    representar : function (mediciones) {
        //console.log(mediciones);

        if (this.contenidoAnterior > 0){
            this.grafica.data.datasets.splice(this.grafica.data.datasets.length-4, 4)
        }

        // recorrer humedad
        let horas = [];
        let medidasHum = [];
        let medidasSal = [];
        let medidasLum = [];
        let medidasTemp = [];
        let numMedidas = mediciones.length;

        for (var i = 0; i < mediciones.length; i++){
            //console.log(mediciones[i]);
            numMedidas--;
            //console.log(numMedidas);
            if (ControladorMedic.modelo.filtros.fechaFin == 0 && ControladorMedic.modelo.filtros.fechaIni == 0){
                if (numMedidas < 3){
                    horas.push(mediciones[i].dia);
                    medidasHum.push(parseFloat(mediciones[i].humedad));
                    medidasSal.push(parseFloat(mediciones[i].salinidad));
                    medidasLum.push(parseFloat(mediciones[i].luminosidad));
                    medidasTemp.push(parseFloat(mediciones[i].temperatura));
                }
            }else{
                horas.push(mediciones[i].dia);
                medidasHum.push(parseFloat(mediciones[i].humedad));
                medidasSal.push(parseFloat(mediciones[i].salinidad));
                medidasLum.push(parseFloat(mediciones[i].luminosidad));
                medidasTemp.push(parseFloat(mediciones[i].temperatura));
            }
        };

        this.contenidoAnterior = medidasHum.length;

        this.grafica.data.datasets.push({
            label: '2 | Humedad',
            data: medidasHum,
            fill: false,
            backgroundColor: 'Green',
            borderColor: 'Green',
        });
        this.grafica.data.datasets.push({
            label: '2 | Salinidad',
            data: medidasSal,
            fill: false,
            backgroundColor: 'black',
            borderColor: 'black',
        });
        this.grafica.data.datasets.push({
            label: '2 | Luminosidad',
            data: medidasLum,
            fill: false,
            backgroundColor: 'pink',
            borderColor: 'pink',
        });
        this.grafica.data.datasets.push({
            label: '2 | Temperatura',
            data: medidasTemp,
            fill: false,
            backgroundColor: 'gray',
            borderColor: 'gray',
        });

        this.grafica.update();
    },
    anyadirContenido : function addData(chart, label, data) {
        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.update();
    }
};

let ControladorMedicionesComparar = {
    modelo : ModeloMedicionesComparar,
    vista : VistaSelectorMedicionesComparar,
    iniciar : function () {
        ModeloMedicionesComparar.controlador = this;
        //ModeloMedicionesComparar.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};