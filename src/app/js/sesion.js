let ModeloSesion = {
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

let VistaSelectorSesion = {
    nombreUsuario : {},
    rolUsuario : {},
    rol : null,
    preparar : function(){
        this.nombreUsuario = document.getElementById("nombre_usuario");
        this.rolUsuario = document.getElementById("rol_usuario");
    },
    representar : function (datos_perfil) {

        console.log(datos_perfil)

        if (parseInt(datos_perfil[0][0]) != 0){
            this.nombreUsuario.innerHTML = datos_perfil[0][2];
            this.rolUsuario.innerHTML = datos_perfil[0][1];
            this.rol = 1;
        }
        if (parseInt(datos_perfil[0][3]) != 0){
            this.nombreUsuario.innerHTML = datos_perfil[0][5];
            this.rolUsuario.innerHTML = datos_perfil[0][4];
            this.rol = 2;
        }
        if (parseInt(datos_perfil[0][6]) != 0){
            this.nombreUsuario.innerHTML = datos_perfil[0][8];
            this.rolUsuario.innerHTML = datos_perfil[0][7];
            this.rol = 3;
        }
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