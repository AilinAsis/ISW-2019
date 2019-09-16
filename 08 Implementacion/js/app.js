angular.module('app', [])
    .controller('appCtrl', ($scope) => {

    // Validaciones de la imagen
    const inputImagen = document.getElementById('inputImagen');

    inputImagen.onclick = () => { this.value = null };
    inputImagen.onchange = () => {
        // Validacion del tipo de extension
        if (inputImagen.files[0].type !== "image/jpeg") {
            if (inputImagen.files[0].type !== "image/png") {
                alert("Archivo icorrecto");
            }
        }

        // Validacion del tamaño
        if (inputImagen.files[0].size > 5000000 ) {
            alert("el archivo es muy grande");
        }
    };
});
