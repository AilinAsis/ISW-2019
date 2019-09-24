angular.module("app", [])
    .controller("appCtrl", ($scope) => {
        $scope.caractRest = 180; // Cantidad de caracteres para describir el producto deseado.
        $scope.descripcion = "";
        $scope.calle1 = "";
        $scope.calleNro1 = "";
        $scope.calle2 = "";
        $scope.calleNro2 = "";
        $scope.TarjetasVISA = ["4213231421146235", "4112112589562185", "4898754821599231"];
        $scope.TarjetasMastercard = ["5523342523142142", "5123216975847194", "5125982452815428"];

        /*
        Indica si la alerta de una imagen incorrecta debe ser mostrada o no.
        N - No
        E - Extension incorrecta
        G - Imagen muy grande.
        */
        $scope.mostrarAlertaImagen = "N";

        // Validaciones de la imagen
        const inputImagen = document.getElementById("inputImagen");

        // Evento: clickear boton de imagen.
        inputImagen.onclick = () => {
            this.value = null;
            $scope.mostrarAlertaImagen = "N";
            $scope.$apply(); // https://stackoverflow.com/questions/12304728/how-can-i-tell-angularjs-to-refresh
        };
        // Evento: elegir una imagen.
        inputImagen.onchange = () => {
            // Validacion del tipo de extension
            if (inputImagen.files[0].type !== "image/jpeg") {
                if (inputImagen.files[0].type !== "image/png") {
                    $scope.mostrarAlertaImagen = "E";
                    $scope.$apply();
                }
            }

            // Validacion del tamaño
            if (inputImagen.files[0].size > 5000000) {
                $scope.mostrarAlertaImagen = "G";
                $scope.$apply();
            }
        };

        // Visualizacion del mapa o direccion

        $scope.estadoDondeConseguir = "D"; // D = Direccion, M = Mapa
        $scope.radioDireccion = true;
        $scope.radioMapa = false;

        $scope.setRadioDireccion = () => {
            $scope.estadoDondeConseguir = "D";
            $scope.radioDireccion = true;
            $scope.radioMapa = false;
        }

        $scope.setRadioMapa = () => {
            $scope.estadoDondeConseguir = "M";
            $scope.radioDireccion = false;
            $scope.radioMapa = true;
        }

        //Validador de fechas de vencimiento

        function validarFormatoFecha(campo) {
            var RegExPattern = /^\d{1,2}\/\d{2,4}$/;
            if ((campo.match(RegExPattern)) && (campo != "")) {
                var campos = campo.split("/")
                var mes = campos[0];
                var año = campos[1];
                if ((mes > 0) && (mes < 13) && (año > 1994) && (año < 2041)) {

                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        /*Validar Fecha Entera
         * Toma una fecha con el formato DD/MM/AAAA y valida que los campos no excedan
         * de del año 2040 y que sean valores despues de la fecha actual
        */
        function validarFormatoFechaEntera(campo) {
            var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
            if ((campo.match(RegExPattern)) && (campo != "")) {
                var campos = campo.split("/")
                var dia = campos[0]
                var mes = campos[1];
                var año = campos[2];
                var hoy = new Date();
                if ((dia < 32) && (dia > 0) && (mes < 13) && (mes > 0) && (año < 2040) && (año > 0)) {
                    if (año > hoy.getFullYear() - 1) {
                        if ((año == hoy.getFullYear()) && (mes > hoy.getMonth())) {
                            if ((mes == hoy.getMonth()+1) && (dia > hoy.getDate() - 1)) {
                                return true;
                            } else
                                if (mes > hoy.getMonth()+1) {
                                    return true;
                                }
                        } else {
                            if (año > hoy.getFullYear()) {
                                return true;
                            }
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }


        // Visualizacion de las formas de pago
        $scope.estadoFormaPago = "N"; // N = Ninguna, E = Efectivo, T = Tarjeta
        $scope.radioEfectivo = false;
        $scope.radioTarjeta = false;

        $scope.setRadioEfectivo = () => {
            $scope.estadoFormaPago = "E";
            $scope.radioEfectivo = true;
            $scope.radioTarjeta = false;
        }

        $scope.setRadioTarjeta = () => {
            $scope.estadoFormaPago = "T";
            $scope.radioEfectivo = false;
            $scope.radioTarjeta = true;
        }

        $scope.estadoCuandoRecibir = "A"; // A = Lo antes posible, S = Seleccionar fecha y hora
        $scope.radioAntesPosible = false;
        $scope.radioSelecFechaHora = false;

        $scope.setRadioAntesPosible = () => {
            $scope.estadoCuandoRecibir = "A";
            $scope.radioAntesPosible = true;
            $scope.radioSelecFechaHora = false;
        }

        $scope.setRadioSelecFechaHora = () => {
            $scope.estadoCuandoRecibir = "S";
            $scope.radioAntesPosible = false;
            $scope.radioSelecFechaHora = true;
        }

        // Codigo del mapa
        const accessToken = "pk.eyJ1Ijoic29ibzRnYW1lcyIsImEiOiJjazBzNnNlY24wYXZwM25waHc2amp2aGJ1In0.NP_7pR_qpVmjFmU-9UrE6Q";

        const mymap = L.map("mapid").setView([-31.42, -64.19], 14);

        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: "mapbox.streets",
            accessToken: accessToken
        }).addTo(mymap);

        // let marker = L.marker([51.505, -0.09]).addTo(mymap);
        let marker = null;

        // Eventos
        const onMapClick = (e) => {
            if (marker != null) {
                mymap.removeLayer(marker);
            }
            marker = L.marker(e.latlng).addTo(mymap);
        }

        mymap.on("click", onMapClick);


        // Logica de realizar el pedido
        $scope.realizarPedido = () => {
            let pasa = true; // Variable auxiliar para saber si pasa o no las validaciones

            // Validar descripcion del producto
            if ($scope.descripcion === "") {
                alert("Debe ingresar una descripcion de lo que desea");
                pasa = false;
            }

            // Validar donde conseguirlo
            if ($scope.radioDireccion) {
                if ($scope.calle1 === "" || $scope.calleNro1 === "") {
                    alert("Debe ingresar la direccion donde conseguir el producto");
                    pasa = false;
                }
            } else {
                // Validar mapa
                if (marker == null) {
                    alert("Debe seleccionar un lugar en el mapa");
                    pasa = false;
                }
            }

            // Validar donde llevarlo verificando que se ingreso la calle y el numero
            if ($scope.calle2 === "" || $scope.calleNro2 === "") {
                alert("Debe ingresar la direccion donde llevar el producto");
                pasa = false;
            }

            // Validar forma de pago verificando si se selecciono una forma de pago
            var isCheckedEfectivo = document.getElementById("RadioEfectivo").checked;
            var isCheckedTarjeta = document.getElementById("RadioTarjeta").checked;
            if (!isCheckedEfectivo && !isCheckedTarjeta) {
                alert("Debe seleccionar un metodo de pago");
                pasa = false;
            }
            //Validar campo de monto en caso que seleccione efectivo
            if (isCheckedEfectivo) {
                var valueTextEfectivo = document.getElementById("textMontoEfectivo").value;
                if ((valueTextEfectivo === "") || ((valueTextEfectivo < 1) || (valueTextEfectivo > 100001))) {
                    alert("Debe ingresar un monto valido");
                    pasa = false;
                }
            }

            //Validar campos de tarjeta en caso que seleccione pago con tarjeta
            if (isCheckedTarjeta) {
                var valueTextNumTarjeta = document.getElementById("textNumTarjeta").value;
                var valueTextCVC = document.getElementById("textCVC").value;
                var valueTextNombreApellido = document.getElementById("textNombreApellido").value;
                var valueTextFechaVencimiento = document.getElementById("textFechaVencimiento").value;
                if (!(valueTextNumTarjeta && valueTextCVC && valueTextNombreApellido && valueTextFechaVencimiento)) {
                    alert("Debe completar todos los campos de la tarjeta");
                    pasa = false;
                } else
                    if (!((($scope.TarjetasVISA.includes(valueTextNumTarjeta.toString())) || ($scope.TarjetasMastercard.includes(valueTextNumTarjeta.toString()))))) {
                        alert("El numero de tarjeta ingresado no es valido");
                        pasa = false;
                    } else {
                        if ($scope.TarjetasMastercard.includes(valueTextNumTarjeta.toString())) {
                            alert("No esta permitido ingresar tarjetas MasterCard");
                            pasa = false;
                        }
                    }
                //Validar fechaVencimiento verificando si se ingreso un formato de fecha valido (MM/AAAA)
                if (!validarFormatoFecha(valueTextFechaVencimiento)) {
                    alert("Debe colocar un formato de fecha de vencimiento correcto (MM/AAAA)");
                    pasa = false;
                }
            }

            // Validar cuando recibirlo determinando si fue seleccionada una opcion
            var isCheckedAntesPosible = document.getElementById("RadioAntesPosible").checked;
            var isCheckedSelectFecha = document.getElementById("RadioSelecFecha").checked;
            if (!isCheckedAntesPosible && !isCheckedSelectFecha) {
                alert("Debe seleccionar cuando desea recibirlo");
                pasa = false;
            }

            // Validar Fecha de envio
            if (isCheckedSelectFecha) {
                var hoy = new Date();
                var valueTextFecha = document.getElementById("textFecha").value;
                var valueTextHora = document.getElementById("textHora").value;
                if ((valueTextFecha === "") || (valueTextHora === "")) {
                    alert("Ingrese la fecha y hora de envio");
                    pasa = false;
                } else {
                    if (!(validarFormatoFechaEntera(valueTextFecha))) {
                        alert("Debe ingresar una fecha valida (DD/MM/AAAA)");
                        pasa = false;
                    }

                    if (valueTextFecha.substr(0, 2) === hoy.getDate().toString() && (valueTextHora < hoy.getHours() + 1)) {
                        alert("Debe ingresar un pedido con una hora de diferencia o mas");
                        pasa = false;
                    }
                }
            }

            if (pasa) {
                window.location += "/successful.html";
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
// Solo permitir valores numericos no negativos en el input de monto y hora de entrega
setInputFilter(document.getElementById("textMontoEfectivo"), function (value) {
    return /^\d*$/.test(value);
});
setInputFilter(document.getElementById("textHora"), function (value) {
    return /^\d*$/.test(value);
});
