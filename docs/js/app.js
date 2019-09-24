angular.module('app', [])
    .controller('appCtrl', ($scope) => {
        $scope.caractRest = 180; // Cantidad de caracteres para describir el producto deseado.
        $scope.descripcion = '';
        $scope.calle1 = '';
        $scope.calleNro1 = '';
        $scope.calle2 = '';
        $scope.calleNro2 = '';

        /*
        Indica si la alerta de una imagen incorrecta debe ser mostrada o no.
        N - No
        E - Extension incorrecta
        G - Imagen muy grande.
        */
        $scope.mostrarAlertaImagen = 'N';

        // Validaciones de la imagen ==================================================================================
        const inputImagen = document.getElementById('inputImagen');

        // Evento: clickear boton de imagen.
        inputImagen.onclick = () => {
            this.value = null;
            $scope.mostrarAlertaImagen = 'N';
            $scope.$apply(); // https://stackoverflow.com/questions/12304728/how-can-i-tell-angularjs-to-refresh
        };
        // Evento: elegir una imagen.
        inputImagen.onchange = () => {
            // Validacion del tipo de extension
            if (inputImagen.files[0].type !== 'image/jpeg') {
                if (inputImagen.files[0].type !== 'image/png') {
                    $scope.mostrarAlertaImagen = 'E';
                    $scope.$apply();
                }
            }

            // Validacion del tamaño
            if (inputImagen.files[0].size > 5000000) {
                $scope.mostrarAlertaImagen = 'G';
                $scope.$apply();
            }
        };

        // Visualizacion del mapa o direccion ========================================================================

        $scope.estadoDondeConseguir = 'D'; // D = Direccion, M = Mapa
        $scope.radioDireccion = true;
        $scope.radioMapa = false;

        $scope.setRadioDireccion = () => {
            $scope.estadoDondeConseguir = 'D';
            $scope.radioDireccion = true;
            $scope.radioMapa = false;
        }

        $scope.setRadioMapa = () => {
            $scope.estadoDondeConseguir = 'M';
            $scope.radioDireccion = false;
            $scope.radioMapa = true;
        }


        // Visualizacion de las formas de pago ========================================================================
        $scope.estadoFormaPago = 'N'; // N = Ninguna, E = Efectivo, T = Tarjeta
        $scope.radioEfectivo = false;
        $scope.radioTarjeta = false;

        $scope.setRadioEfectivo = () => {
            $scope.estadoFormaPago = 'E';
            $scope.radioEfectivo = true;
            $scope.radioTarjeta = false;
        }

        $scope.setRadioTarjeta = () => {
            $scope.estadoFormaPago = 'T';
            $scope.radioEfectivo = false;
            $scope.radioTarjeta = true;
        }

        $scope.estadoCuandoRecibir = 'A'; // A = Lo antes posible, S = Seleccionar fecha y hora
        $scope.radioAntesPosible = false;
        $scope.radioSelecFechaHora = false;

        $scope.setRadioAntesPosible = () => {
            $scope.estadoCuandoRecibir = 'A';
            $scope.radioAntesPosible = true;
            $scope.radioSelecFechaHora = false;
        }

        $scope.setRadioSelecFechaHora = () => {
            $scope.estadoCuandoRecibir = 'S';
            $scope.radioAntesPosible = false;
            $scope.radioSelecFechaHora = true;
        }

        // Codigo del mapa ===========================================================================
        const accessToken = 'pk.eyJ1Ijoic29ibzRnYW1lcyIsImEiOiJjazBzNnNlY24wYXZwM25waHc2amp2aGJ1In0.NP_7pR_qpVmjFmU-9UrE6Q';

        const mymap = L.map('mapid').setView([-31.42, -64.19], 14);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: accessToken
        }).addTo(mymap);

        // let marker = L.marker([51.505, -0.09]).addTo(mymap);
        let marker = null;

        // Eventos
        const onMapClick = (e) => {
            if (marker !== null) {
                mymap.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(mymap);
        }

        mymap.on('click', onMapClick);


        // Logica de realizar el pedido ============================================================
        $scope.realizarPedido = () => {
            let pasa = true; // Variable auxiliar para saber si pasa o no las validaciones

            // Validar descripcion del producto
            if ($scope.descripcion === '') {
                alert('Debe ingresar una descripcion de lo que desea');
                pasa = false;
            }

            // Validar donde conseguirlo
            if ($scope.radioDireccion) {
                if ($scope.calle1 === '' || $scope.calleNro1 === '') {
                    alert('Debe ingresar la direccion donde conseguir el producto')
                    pasa = false;
                }
            } else {
                // Validar mapa
                if (marker === null) {
                    alert('Debe seleccionar un lugar en el mapa')
                    pasa = false;
                }
            }

            // Validar donde llevarlo
            if ($scope.calle2 === '' || $scope.calleNro2 === '') {
                alert('Debe ingresar la direccion donde llevar el producto')
                pasa = false;
            }
            // Validar forma de pago
            // Validar cuando recibirlo

            if (pasa) {
                window.location = '/successful.html'
            }
        };

    });

// Funcion que restringe algun input a ciertos caracteres
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

// Solo permitir numeros en el input de la calle
setInputFilter(document.getElementById("nroCalle1"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("nroCalle2"), function (value) {
    return /^\d*$/.test(value);
});