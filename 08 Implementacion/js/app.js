angular.module('app', [])
    .controller('appCtrl', ($scope) => {
        $scope.caractRest = 180;

        // Validaciones de la imagen
        const inputImagen = document.getElementById('inputImagen');

        inputImagen.onclick = () => { this.value = null };
        inputImagen.onchange = () => {
            // Validacion del tipo de extension
            if (inputImagen.files[0].type !== 'image/jpeg') {
                if (inputImagen.files[0].type !== 'image/png') {
                    alert('Archivo icorrecto');
                }
            }

            // Validacion del tamaño
            if (inputImagen.files[0].size > 5000000) {
                alert('el archivo es muy grande');
            }
        };

        // Visualizacion de las formas de pago
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

        

       
    });
