// --- DOM ---
const btnGenerarPassword = document.getElementById("generar");
const btnSumar = document.getElementById("sumar");
const btnRestar = document.getElementById("restar");
const btnCopyToClipboard = document.getElementById("btnCopyToClipboard");
const texto = document.getElementById("textoGenerado");
const mensajeCopiedToClipboard = document.getElementById("mensajeCopiedToClipboard");
// Listeners
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnGenerarPassword.addEventListener("click", generarContraseña);
btnCopyToClipboard.addEventListener("click", copyToClipboard);
// --- Funciones ---
/**
 * Boton para sumar el valor
 */
function sumar() {
    let input = document.getElementById("longitud");
    if (input) {
        let valor = parseInt(input.value);
        if (valor >= 50) {
            input.classList.remove("input-vibrar");
            window.requestAnimationFrame(function () {
                input.classList.add('input-vibrar');
            });
            input.value = "50";
        }
        else {
            valor = valor + 1;
            input.value = valor.toString();
        }
    }
}
/**
 * Boton para restar el valor
 */
function restar() {
    let input = document.getElementById("longitud");
    if (input) {
        let valor = parseInt(input.value);
        if (valor <= 1) {
            input.value = "1";
        }
        else {
            valor = valor - 1;
            input.value = valor.toString();
        }
    }
}
/**
 * Genera una contraseña con caracteres aleatorios a partir de la longitud introducida
 */
function generarContraseña() {
    let inputLongitud = document.getElementById("longitud");
    let complejidad = document.querySelector("input[name=complejidad]:checked");
    let longitud = 0;
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789?¿!¡=€$%#&_@|'`/~()[]{}·.:,-_^¨*";
    let res = "";
    if (inputLongitud) {
        longitud = parseInt(inputLongitud.value);
        if (longitud > 50) {
            longitud = 50;
            inputLongitud.value = "50";
        }
        if (complejidad.value == "Baja") {
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789";
        }
        else if (complejidad.value == "Media") {
            characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789?¿!¡=€$%#&_@";
        }
        for (let i = 1; i <= longitud; i++) {
            //res += characters.charAt(Math.floor(Math.random() * characters.length));
            res += characters.charAt(Math.random() * characters.length);
        }
        if (res.length != longitud) {
            generarContraseña();
        }
        texto.innerHTML = res.toString();
    }
}
async function copyToClipboard() {
    let intervalo;
    clearInterval(intervalo);
    var copiado = "";
    if (!navigator.clipboard) {
        throw new Error("Browser don't have support for native clipboard.");
    }
    var nodoCopiar = document.getElementById("textoGenerado");
    if (nodoCopiar) {
        var textoCopiar = nodoCopiar.textContent;
        if (textoCopiar) {
            copiado = textoCopiar;
        }
        await navigator.clipboard.writeText(copiado);
        // Quitar invisibilidad del mensaje de confirmación
        mostrarMensaje();
    }
}
async function mostrarMensaje() {
    mensajeCopiedToClipboard.classList.remove("invisible");
    mensajeCopiedToClipboard.classList.add("duration-200");
    mensajeCopiedToClipboard.classList.add("translate-y-3");
    mensajeCopiedToClipboard.classList.add("ease-in-out");
    //Despues de 5 segundos, volver a ocultar el mensaje
    setInterval(ocultarMensaje, 4000);
}
async function ocultarMensaje() {
    mensajeCopiedToClipboard.classList.add("invisible");
    mensajeCopiedToClipboard.classList.remove("duration-100");
    mensajeCopiedToClipboard.classList.remove("translate-y-4");
    mensajeCopiedToClipboard.classList.remove("ease-in-out");
}
export {};
