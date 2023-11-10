// --- DOM ---
const btnGenerarPassword = document.getElementById("generar") as HTMLElement;
const btnSumar = document.getElementById("sumar") as HTMLElement;
const btnRestar = document.getElementById("restar") as HTMLElement;
const texto = document.getElementById("textoGenerado") as HTMLLabelElement;


// Listeners
btnSumar.addEventListener("click", sumar);
btnRestar.addEventListener("click", restar);
btnGenerarPassword.addEventListener("click", generarContraseña);



// --- Funciones ---


/**
 * Boton para sumar el valor
 */
function sumar(){
    let input = document.getElementById("longitud") as HTMLInputElement;
    if(input){
        let valor = parseInt(input.value);
        if(valor >= 50){
            input.value = "50";
        }else {
            valor = valor+1;
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
            console.log(res.toString())
            if(res.length != longitud){
                generarContraseña()
            }
    
            texto.innerHTML = res.toString();
    }
}
