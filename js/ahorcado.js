//----------------------------------------------------//
//Variables y declaraciones para la ejecucion del juego
//----------------------------------------------------//

//Declaro el listado con la Letras
let listadoLetras=[];

//Declaro la cantidad de Intentos disponibles y el array que contiene todas las imagenes para intercalar
let intentosVidas=6;
let auxiliarArrayIntentos=0;
const arrayIntentosImagenes=["intentos6.jpg","intentos5.jpg","intentos4.jpg","intentos3.jpg","intentos2.jpg","intentos1.jpg","intentos0.jpg"];

//Declaro la longitud de la palabra ingresada para jugar
let longitudPalabra=0; //asume el valor cuando ingresa
let cantidadAciertos=0;

//----------------------------------------------------//
//Funciones para permiten el funcionamiento del juego
//----------------------------------------------------//

//vidas es el ID donde esta la imagen con el ahorcado

//Funcion que cambia la imagen para notificar la perdida de vidas
function descontarVida(){
intentosVidas=parseInt(intentosVidas)-parseInt(1); //descuento una vida
auxiliarArrayIntentos++;
let linkImagenVida="image/"+arrayIntentosImagenes[auxiliarArrayIntentos];
let elementoVida=document.getElementById("vidas").src=linkImagenVida; //updateo la imagen con los errores
document.getElementById("cantidadVidas").innerHTML=intentosVidas; //actualizo la cantidad de vidas
}

//Funcion para finalizar el juego
function finalizarJuego(mensaje){
    if (mensaje =="gano") {
     document.getElementById("mensajeFinal").innerHTML="Felicitaciones , descubriste la palabra y ganaste el juego";
    }
    if (mensaje=="perdio") {
     document.getElementById("mensajeFinal").innerHTML="Perdiste! , volve a intentarlo...";
    }
}



//Funcion que obtiene la letra ingresada por el usuario y valida que sea correcta
function obtenerLetra(){
 let letraObjetivo=document.getElementById("letraObjetivo").value; //obtengo la letra del formulario
 letraObjetivo.toLowerCase(); //convierto todo a mayusculas
    if(validarLetra(letraObjetivo,listadoLetras)==true) {   
 	 reemplazarLetra(letraObjetivo); //la mando a reemplazar
    }
    else {   
        if (intentosVidas==0){
     	 finalizarJuego('perdio');//invoco a la funcion para terminar
        }
        else {
         descontarVida(); //descuento una vida
        }
    }
}

//Funcion que reemplaza la letra en todos los lugares donde corresponda
function reemplazarLetra(letra) {
 letra.toLowerCase(); //pongo la Letra en mayusculas
 let arrayIDsReemplazar=[]; //voy a almacenar los IDS que van a cambiar su contenido para mostrar la letra correcta

    //Determino la posicion donde hay esa letra es correcta para reemplazar despues
    for (let index= 0;index < listadoLetras.length ; index++) {
        if (letra==listadoLetras[index]) {
         arrayIDsReemplazar.push(index+1); //almaceno la posicion a reemplazar(se suma 1,porque esta desplazado arranca en 0)
        }
    }

    //Comienzo a hacer el reemplazo
    for (let index= 0;index < arrayIDsReemplazar.length ; index++) {   
     cantidadAciertos++; //aumento la cantidad de aciertos	
     document.getElementById(arrayIDsReemplazar[index]).innerHTML=letra; //inserto la Letra en el lugar que corresponde
     document.getElementById(arrayIDsReemplazar[index]).className="letraCorrecta"; //le asigno un estilo para esa letra en particular     
    }
 
    //Si los aciertos alcanzaron la longitud de la palabra , el juego termino
    if (cantidadAciertos==longitudPalabra) {
      finalizarJuego('gano');//invoco a la funcion para terminar
    }
}

//Funcion que verifica si la letra ingresada , se encuentra en la palabra
function validarLetra(letra,listadoLetras){
    if(listadoLetras.includes(letra)) {
  	 return true;
    }
    else {
  	 return false;
    }
}

//Funcion que me genera los espacios para completar entre las palabras
function generarEspaciosPalabras(longitudPalabra){
 let contenedorPalabra=document.getElementById("palabraCompletar");
 document.getElementById("palabraCompletar").innerHTML=""; //se vacia el contenedor para que no haya nada
    for (let index= 0;index < longitudPalabra ; index++) { 
     let letra=document.createElement("span");
     letra.setAttribute("class","letra");
     let contenidoLetra=document.createTextNode("_");
     letra.appendChild(contenidoLetra);
     letra.setAttribute("id",parseInt(index+1));
     contenedorPalabra.appendChild(letra);
    }
}

//Funcion para iniciar la ejecucion del juego
function iniciarJuego(){
 let palabraObjetivo=document.getElementById("palabraObjetivo").value; //obtengo el valor del formulario
 
    if(palabraObjetivo=="") {
     alert("Debes insertar una palabra antes , no hagas trampa :P");
    }
    else {
     palabraObjetivo.toLowerCase(); //convierto la palabra a mayusculas
     document.getElementById("palabraObjetivo").value=""; //por las dudas no muestro mas la palabra ingresada
     let arrayPalabra = palabraObjetivo.split(''); //Retorna en un array todas las letras separadas
     longitudPalabra= arrayPalabra.length; //obtengo la longitud de la palabra ingresada
     listadoLetras=arrayPalabra; //quiero guardar el listado de letras en otro array
     document.getElementById("vidas").src="image/"+arrayIntentosImagenes[0]; //vuelvlo a default la imagen
     document.getElementById("cantidadVidas").innerHTML=6; //actualizo la cantidad de vidas
     generarEspaciosPalabras(longitudPalabra); //genero los espacios para completar
    }


 
}

