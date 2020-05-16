let ModeloTecnicoLlenarUsuario = {
    url : '../api/v1.0/usuarios',
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
        cooperativa : 0,
        usuario : 0,
    },
    filtrar : async function (parametro, valor) {
        this.filtros[parametro] = valor;
        let queryParams = [];
        if((this.filtros.cooperativa == 0 && this.filtros.usuario == 0) || (this.filtros.cooperativa != 0 && this.filtros.usuario != 0)) {
            this.cargar();
        }else{
            if(this.filtros.cooperativa != 0) {
                queryParams.push('cooperativa='+this.filtros.cooperativa);
            }
            if(this.filtros.usuario != 0) {
                queryParams.push('usuario='+this.filtros.usuario);
            }
            if(queryParams.length > 0) {
                let query = queryParams.join('&');
                await this.cargar(this.url + '?' + encodeURI(query));
            } else {
                this.cargar();
            }
        }

    }
};

let VistaSelectorTecnicoLlenarUsuario = {
    seccionParcelas : {},
    usuarios : [],
    cooperativas: [],
    preparar : function (selectId) {
        this.seccionParcelas = document.getElementById(selectId);
        //this.seccionParcelas.innerHTML = '<h3>CARGANDO USUARIOS</h3>';
    },
    representar : async function (j) {
        //console.log(j);

        this.seccionParcelas.innerHTML = '';

        if (j[0] != null) {
            for await (let usuario of j){

                this.creadorUsuario(usuario.nombre, usuario.nombreRol, usuario.id, usuario.numRol);
                this.usuarios[usuario.id] = usuario;
                if(usuario['numRol'] == 2){
                    this.cooperativas.push(usuario)
                }
                if ($esCooperativaTecnico){
                    document.getElementById('btnEliminar'+ usuario.id).style.display = 'none';
                    document.getElementById('btnDesvincular' + usuario.id).style.display = 'block';
                }
                if ($esCooperativa){
                    document.getElementById('btnEliminar'+ usuario.id).style.display = 'none';
                }
            }



        }else{
            this.seccionParcelas.innerHTML = '<h3>NO TIENES CLIENTES</h3>';
        }

    },
    creadorUsuario : function (nombreUsuario, nombreRol, id, numRol) {
        this.seccionParcelas.innerHTML += `<!-- Estilo cuando iniciamos la app -->
                                            <div class="card col-md-5 m-3 shadow p-3 mb-5 bg-white rounded" id="${id}">
                                                <div class="card-body d-flex align-items-center justify-content-between">
                                                    <div class="d-flex flex-column justify-content-between">
                                                        <h4 class="card-title">${nombreUsuario}</h4>
                                                        <h4 class="card-title">Rol: ${nombreRol}</h4>
                                                    </div>
                                                    <div class="d-flex" id="botones-usuarios">
                                                        <a class="mr-2" onclick="pasarAlUsuario('${nombreUsuario}', ${id}, ${numRol})" role="button" title="Añadir usuario"><img src="img/editarUsuario.svg" height="40" alt="boton-editar-usuario"></a>
                                                        <a id="btnEliminar${id}" onclick="funcionesSeccionTecnico(${id})" role="button" title="Añadir usuario"><img src="img/eliminarUsuario.svg" height="40" alt="boton-anyadir-usuario"></a>
                                                        <button type="button" class="btn btn-outline-danger ml-2" style="display: none" id="btnDesvincular${id}" onclick="desvincularUsuarioCooperativa(${id})">Desvincular</button>
                                                    </div>
                                                </div>
                                            </div>`;
    },
};

let ControladorTecnicoLlenarUsuario = {
    modelo : ModeloTecnicoLlenarUsuario,
    vista : VistaSelectorTecnicoLlenarUsuario,
    iniciar : function () {
        ModeloTecnicoLlenarUsuario.controlador = this;
        ModeloTecnicoLlenarUsuario.cargar();
    },
    representar : function () {
        this.vista.representar(this.modelo.datos);
    }
};