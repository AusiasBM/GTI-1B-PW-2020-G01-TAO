let ModeloAdministrador = {
    url : '../api/v1.0/sesion',
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

let VistaSelectorAdministrador = {
    pestanyas : {},
    contenido : {},
    select : {},
    preparar : function(){
        this.pestanyas = document.getElementById("nav-tab");
        this.contenido = document.getElementById("nav-administrador");
        this.select = document.getElementById("select-parcelas-admin");
    },
    representar : function (datos_user) {

        //console.log(datos_user)

        if (datos_user[0][2] == "Administrador"){
            this.pestanyas.innerHTML += `<a class="nav-item nav-link" id="nav-administrador-tab" data-toggle="tab" href="#nav-administrador" role="tab" aria-controls="nav-administrador" aria-selected="false">Administrador</a>`;

            this.contenido.innerHTML += ``

            console.log(document.getElementById("select-parcelas")[1]);
            console.log(document.getElementById("select-parcelas")[2]);
            console.log(document.getElementById("select-parcelas")[3]);


            this.select.textContent = document.getElementById("select-parcelas")[0];
            console.log(document.getElementById("select-parcelas-admin"));
            /*
            let opcion = '<option value = "'+ parcela.idParcela +'" >' + parcela.nombre + '</option>';
            this.select.innerHTML += opcion;
            */
        }
    }
};

let ControladorAdministrador = {
    modelo : ModeloAdministrador,
    vista : VistaSelectorAdministrador,
    iniciar : function () {
        ModeloAdministrador.controlador = this;
        ModeloAdministrador.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};