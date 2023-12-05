// --- DOM ---
const btnGenerarPassword = document.getElementById("generar") as HTMLElement;
const btnSumar = document.getElementById("sumar") as HTMLElement;
const btnRestar = document.getElementById("restar") as HTMLElement;
const btnCopyToClipboard = document.getElementById("btnCopyToClipboard") as HTMLElement;
const btnGuardarPassword = document.getElementById("btnGuardarPassword") as HTMLElement;
const texto = document.getElementById("textoGenerado") as HTMLLabelElement;
const mensajeCopiedToClipboard = document.getElementById("mensajeCopiedToClipboard") as HTMLDivElement;
const listaContraseñas = document.getElementById("listaContraseñas") as HTMLDivElement;



// Listeners
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnGenerarPassword.addEventListener("click", generarContraseña);
btnGuardarPassword.addEventListener("click", guardarPassword);
btnCopyToClipboard.addEventListener("click", copyToClipboard);


// --- Funciones ---

/**
 * Boton para sumar el valor
 */

function sumar(){
    let input = document.getElementById("longitud") as HTMLInputElement;

    if(input){
        let valor = parseInt(input.value);
        if(valor >= 50){
            input.classList.remove("input-vibrar")
            window.requestAnimationFrame(function() {
                input.classList.add('input-vibrar');
              });
            input.value = "50";
        }else {
            valor = valor + 1;
            input.value = valor.toString();
        }
    }
}


/**
 * Boton para restar el valor
 */
function restar(){
    let input = document.getElementById("longitud") as HTMLInputElement;
    if(input){
        let valor = parseInt(input.value);
        if(valor <= 1){
            input.value = "1";
        }else {
            valor = valor-1;
            input.value = valor.toString();
        }
    }
}


/**
 * Genera una contraseña con caracteres aleatorios a partir de la longitud introducida
 */
function generarContraseña () {

    let inputLongitud = document.getElementById("longitud") as HTMLInputElement;
    let complejidad = document.querySelector("input[name=complejidad]:checked") as HTMLInputElement;
    let longitud = 0;
    let characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789?¿!¡=€$%#&_@|'`/~()[]{}·.:,-_^¨*";
    let res = "";

    if(inputLongitud){
         longitud = parseInt(inputLongitud.value);
        if(longitud>50){
            longitud=50
            inputLongitud.value ="50";
        }
            if(complejidad.value == "Baja"){
                characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789";
            }
            else if(complejidad.value == "Media"){
                characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÑÇabcdefghijklmnopqrstuvwxyzñç0123456789?¿!¡=€$%#&_@";
            }

            for (let i = 1; i <= longitud; i++) {
                //res += characters.charAt(Math.floor(Math.random() * characters.length));
                res += characters.charAt(Math.random() * characters.length);
            }
            if(res.length != longitud){
                generarContraseña()
            }
            texto.innerHTML = res.toString();
    }
}


function guardarPassword () {
    var copiado:string = "";
    var listaPasswords:string[] = [];

    const storedPasswords = localStorage.getItem("Pass");
    if(storedPasswords){
        listaPasswords = JSON.parse(storedPasswords);
    }

    var nodoCopiar = document.getElementById("textoGenerado");
    if(nodoCopiar){
        var textoCopiar = nodoCopiar.textContent;
        if(textoCopiar){
            copiado = textoCopiar;
            listaPasswords.push(copiado)
            localStorage.setItem("Pass", JSON.stringify(listaPasswords))
            listaContraseñas.innerHTML += "<p class='text-lg'>"+copiado+"</p>";
        }
    }
}

function copyToClipboard () {

    var copiado:string = "";

    if (!navigator.clipboard) {
        throw new Error("Browser don't have support for native clipboard.");
    }

    var nodoCopiar = document.getElementById("textoGenerado");

    if(nodoCopiar){
        var textoCopiar = nodoCopiar.textContent;
        if(textoCopiar){
            copiado = textoCopiar;
        }

    navigator.clipboard.writeText(copiado);

    // Quitar invisibilidad del mensaje de confirmación
    mostrarMensaje();
    }
}

function mostrarMensaje () {
    mensajeCopiedToClipboard.classList.remove("invisible")
    mensajeCopiedToClipboard.classList.remove("translate-y-4")
    mensajeCopiedToClipboard.classList.remove("duration-100")

    window.requestAnimationFrame(function() {
        mensajeCopiedToClipboard.classList.add("translate-y-4")
        mensajeCopiedToClipboard.classList.add("duration-100")

        //Despues de 4 segundos, volver a ocultar el mensaje
        setTimeout(ocultarMensaje, 4000)
    });
}


function ocultarMensaje () {
    mensajeCopiedToClipboard.classList.add("invisible")
}
