angular.module('app', [])
    .controller('appCtrl', ($scope) => {
        $scope.caractRest = 180; // Cantidad de caracteres para describir el producto deseado.

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

        // Codigo del mapa.
        const accessToken = 'pk.eyJ1Ijoic29ibzRnYW1lcyIsImEiOiJjazBzNnNlY24wYXZwM25waHc2amp2aGJ1In0.NP_7pR_qpVmjFmU-9UrE6Q';

        const mymap = L.map('mapid').setView([-31.42, -64.19], 14);

        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: accessToken
        }).addTo(mymap);

        let marker = L.marker([51.505, -0.09]).addTo(mymap);

        // Eventos
        const onMapClick = (e) => {
            mymap.removeLayer(marker);
            marker = L.marker(e.latlng).addTo(mymap);
        }

        mymap.on('click', onMapClick);

    });
