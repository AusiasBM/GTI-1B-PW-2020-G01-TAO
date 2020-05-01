let ModeloMedic = {
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

let VistaSelectorMedic = {
    grafica : {},
    totadas : {},
    datos : {
        labels: [],
        datasets: [
            {
                label: 'humedad',
                data: [],
                fill: false,
                backgroundColor: 'rgb(255,69,34)',
                borderColor: 'rgb(255,110,86)',
            },
            {
                label: 'salinidad',
                data: [],
                fill: false,
                backgroundColor: 'blue',
                borderColor: 'blue',
            },
            {
                label: 'luminosidad',
                data: [],
                fill: false,
                backgroundColor: 'yellow',
                borderColor: 'yellow',
            },
            {
                label: 'temperatura',
                data: [],
                fill: false,
                backgroundColor: 'green',
                borderColor: 'green',
            }
        ],

    },
    opciones : {
        maintainAspectRatio: false, // permite que las proporciones de la gráfica se cambien.
        legend: {
            position: 'bottom',
            align: 'center',
        },
        responsive: true,
        title: {
            display: true,
            text: 'Mediciones'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Fecha'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Porcentaje'
                }
            }]
        },
        // puntos con ventana de la gráfica
        tooltips: {
            backgroundColor: '#fff',
            titleFontColor: '#000',
            titleAlign: 'center',
            bodyFontColor: '#333',
            borderColor: '#666',
            borderWidth: 1,
        },
    },
    preparar : function () {
        this.grafica = document.getElementById("chart");
        this.totadas = document.getElementById("tostadas");
    },
    representar : function (mediciones) {
        //console.log(mediciones);

        this.totadas.innerText = ``;

        // recorrer humedad
        let horas = [];
        let medidasHum = [];
        let medidasSal = [];
        let medidasLum = [];
        let medidasTemp = [];
        let tostadas = [];
        let numMedidas = mediciones.length;

        for (var i = 0; i < mediciones.length; i++){
            //console.log(mediciones[i]);
            numMedidas--;
            //console.log(numMedidas);
            if (ControladorMedic.modelo.filtros.fechaFin == 0 && ControladorMedic.modelo.filtros.fechaIni == 0){
                if (numMedidas < 3){
                    horas.push(mediciones[i].dia + ' - ' + mediciones[i].hora);
                    medidasHum.push(parseFloat(mediciones[i].humedad));
                    medidasSal.push( parseFloat (mediciones[i].salinidad));
                    medidasLum.push( parseFloat (mediciones[i].luminosidad));
                    medidasTemp.push( parseFloat (mediciones[i].temperatura));
                }
            }else {
                horas.push(mediciones[i].dia + ' - ' + mediciones[i].hora);
                medidasHum.push(parseFloat(mediciones[i].humedad));
                medidasSal.push( parseFloat (mediciones[i].salinidad));
                medidasLum.push( parseFloat (mediciones[i].luminosidad));
                medidasTemp.push( parseFloat (mediciones[i].temperatura));
            }

            if (numMedidas < 3){
                if (mediciones[i].humedad <= 15) tostadas.push({titulo : "Humedad - " + mediciones[i].dia + " - " + mediciones[i].hora, descripcion : "La humedad está demasiado baja"});
                if (mediciones[i].salinidad >= 40) tostadas.push({titulo : "Salinidad - " + mediciones[i].dia + " - " + mediciones[i].hora, descripcion : "La salinidad está demasiado alta"});
                if (mediciones[i].luminosidad >= 80) tostadas.push({titulo : "Luminosidad - " + mediciones[i].dia + " - " + mediciones[i].hora, descripcion : "Hace mucho sol, le recomendamos que mire para regar"});
                if (mediciones[i].temperatura >= 30) tostadas.push({titulo : "Temperatura - " + mediciones[i].dia + " - " + mediciones[i].hora, descripcion : "La temperatura es demasiado alta, le recomendamos que mire la humedad"});
            }
        };

        tostadas.forEach(tostada => this.crearTostada(tostada.titulo, tostada.descripcion));

        $(document).ready(function(){
            $('.toast').toast('show');
        });

        this.datos.labels=horas;
        this.datos.datasets[0].data=medidasHum;
        this.datos.datasets[1].data=medidasSal;
        this.datos.datasets[2].data=medidasLum;
        this.datos.datasets[3].data=medidasTemp;

        let miGrafica = new Chart(this.grafica, {
            type: 'line',
            data: this.datos,
            options: this.opciones
        });
    },
    crearTostada : function (tituloElemento, contenidoTostada) {
        this.totadas.innerHTML += `<div role="alert" aria-live="assertive" aria-atomic="true" class="toast mx-1" data-autohide="false">
                                <div class="toast-header">
                                <strong class="mr-auto">${tituloElemento}</strong>
                                <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            </div>
                            <div class="toast-body">
                                ${contenidoTostada}
                            </div>
                            </div>`;
    },
};

let ControladorMedic = {
    modelo : ModeloMedic,
    vista : VistaSelectorMedic,
    iniciar : function () {
        ModeloMedic.controlador = this;
        ModeloMedic.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};