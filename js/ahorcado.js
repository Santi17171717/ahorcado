// *** JUEGO AHORCADO ***

// *** VARIABLES ***

var palabras = ["universidad","ordenador","laurel","videojuego","rueda","motocicleta","albañil","cartagena","invierno",
				"septiembre","verano","veneno","almohada","bicicleta","geranio","amapola","ventilador","restaurante","montaña",
/*60palabras*/	"laguna","calamar","mosaico","piedra","refugio","senador","varicela","ciervo","rotulador","suelo","submarino",
				"niñero","muñeca","calabaza","armario","tarjeta","empresa","ingrediente","ametralladora","adivino","escritorio",
				"horizonte","tostadora","carnicero","zafiro","ambulancia","nublado","enfermero","carambola","migraña","hormiga",
				"sonrisa","radiador","combustible","peldaño","trastero","bombero","vestidor","esqueleto","cerbatana","soldado"];
							
var palabra = ""; // Palabra a averiguar
var rand;  // nº aleatorio
var oculta = [];  // Palabra oculta. Array vacío
var cont = 6;  //Contador
var hueco = document.getElementById("palabra");  
var buttons = document.getElementsByClassName('letra');  // Botones de letras
var btnInicio = document.getElementById("reset");  // Boton de reset
var rightAudio = new Audio("sfx/right.wav");
var wrongAudio = new Audio("sfx/wrong.wav");
var completeAudio = new Audio("sfx/victory.wav");
var gameOver = new Audio("sfx/gameOver.wav");

const coche = document.getElementById("coche");


/* MODAL */
let modal = document.getElementById("modalInstrucciones");
let btn = document.getElementById("btnAbrirModal");
let span = document.getElementById("btnCerrarModal");

btn.onclick = function () {
	modal.style.display = "block";
}

span.onclick = function () {
	modal.style.display = "none";
}

// SI SE HACE CLICK FUERA DEL MODAL
window.onclick = function(event) {
	if(event.target == modal){
		modal.style.display = "none";
	}
}


/* FIN MODAL */

// *** FUNCIONES ***

function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a","z");
  document.getElementById("intentos").innerHTML = cont;  
}


function generaPalabra(){
  rand = Math.round(Math.random() * palabras.length); //nº aleatorio entre 0 y 60 
  palabra = palabras[rand].toUpperCase();
}

function pintarGuiones(num){
  for (var i = 0; i < num; i++){
    oculta[i] = "_";
  }
  hueco.innerHTML = oculta.join("");
}

//Generar abecedario (teclado)
function generaABC(a,z){
	document.getElementById("abcdario").innerHTML = "";
	var i = a.charCodeAt(0);
	var j = z.charCodeAt(0);
	var letra = "";
	for(i,j ; i<=j ; i++){
		letra = String.fromCharCode(i).toUpperCase();
		document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='"+letra+"'>" + letra + "</button>";
		if(i==110){
		document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='"+'Ñ'+"'>Ñ</button>";
		}
	}	
}

// Chequear intento
function intento(letra){
  document.getElementById(letra).disabled = true;
  if(palabra.indexOf(letra) != -1){
    for(var i=0; i<palabra.length; i++){
      if(palabra[i]==letra){
		  oculta[i] = letra;
	  } 
    }
    hueco.innerHTML = oculta.join("");
    document.getElementById("acierto").innerHTML = "¡Bien!";
    document.getElementById("acierto").className += "acierto verde";
	rightAudio.play();
  }else{

	if(cont > 1){
		
		const posicionActual = coche.style.left;
		const nuevaPosicion = (parseFloat(posicionActual) || 0) + 8;
		coche.style.left = nuevaPosicion + '%';
	} else {
		console.log("EL COCHE ACANTILADO")
		coche.style.animation = "cocheAcantilado 1s forwards"

		setTimeout(function(){
			const boom = document.getElementById("boom");
			boom.style.display = "block";
			const mensajePerder = document.getElementById("mensajePerder");
			mensajePerder.style.display = "block";
		}, 1000)


		const botones = document.getElementById("abcdario").getElementsByTagName("button");
		for(var i =0; i < botones.length; i++){
			botones[i].disabled = true;
		}

		

	}



    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "Fallaste :(";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image"+cont).className += "fade-in";
	wrongAudio.play();
  }
  compruebaFin();
  setTimeout(function (){ 
    document.getElementById("acierto").className = ""; 
  }, 800);
}

// Compruba si ha finalizado
function compruebaFin() {
	if(oculta.indexOf("_") == -1){
		document.getElementById("msg-final").innerHTML = "¡¡¡Enhorabuena!!! Sobreviviste ;)";
		document.getElementById("msg-final").className += "zoom-in";
		document.getElementById("palabra").className += " encuadre";
		for (var i = 0; i < buttons.length; i++){
			buttons[i].disabled = true;
		}
		completeAudio.play();
    }else if(cont == 0) {
		document.getElementById("msg-final").innerHTML = "Game Over :(";
		document.getElementById("msg-final").className += "zoom-in";
		for (var i = 0; i < buttons.length; i++){
			buttons[i].disabled = true;
		}
		gameOver.play(); 
	}		
	btnInicio.innerHTML = "Empezar";   
}

btnInicio.onclick = function(){location.reload()}; /*carga de nuevo la URL actual, como el refresh del navegador*/

