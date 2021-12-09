/**
 * @file Controlador principal de la web
 * 
 * @author Sergio Matamoros Delgado <smatamorosdelgado.guadalupe@alumnado.fundacionloyola.net>
 * @license GPL v3 2021
 * @description Controlador principal de la página web.
 */

'use strict';

//Constantes:
const INICIO = 0;
const PRIMSECCION = 0;

let scrollDoc;
let docHeight;
let winHeight;

let mapa = document.querySelector(".minijuego img");
let isMGStarted = false;

let sumaBombilla = 0;

let draggedItem = null;


let tSlider = undefined; //Total de sliders



window.onload = iniciar;


window.addEventListener("scroll",progreso);
document.getElementsByClassName("light-bulbs")[0].onmouseover = function(e) {
    let bulb = new Audio('recursos/bombillaRota.mp3');
    
    //console.log(e.target.className);
    if(e.target.className.startsWith("light-bulb theme")) {
        let bombilla = e.target.classList;
        document.querySelector("."+ bombilla.toString().replace(" ", ".")).remove();

        //AUDIO
        bulb.play();
        //audio.loop =true;
        //bulb.playbackRate = 1.8;
    }
    
};

function iniciar() {

    //Mute del video
    let video = document.querySelector("video")
    //video.controls = "autoplay muted";
    video.autoplay = true;
    video.muted = false;
    console.log(video);

    //SCROLL, relleno el constructor con datos básicos
    const sr = ScrollReveal({
        origin: "top",
        distance: "90px",
        duration: 1500,
        delay: 300,
        reset: true
    });
    
    //Establezco las animaciones.
    sr.reveal(".home2Text", { origin: "left" });
    sr.reveal(".home3Text", { origin: "top"} );
    sr.reveal("footer", { origin: "bottom", delay: 100} );
    sr.reveal("#fInfo", { origin: "bottom", delay: 600} );
    sr.reveal("#copy", { origin: "bottom", delay: 600} );
    

    //Inicio minijuego
    mapa.onclick = miniGameClicks;

    //Slider inicial
    let slide = 0;

    //Total de sliders
    tSlider = document.querySelectorAll(".home1Text ul li");

    //Muestra el total de elementos que hay.
    let total = tSlider.length-1;

    //Calculo cuantas secciones hay y creo puntos.
    let seccionesTotal = document.querySelectorAll("main > div").length;
    for(let i=0;i<seccionesTotal;i++) {
        let puntos = document.createElement("a");
        puntos.classList.add("puntos");
        document.getElementById("enlaces").appendChild(puntos);
    }
     

    // Muestra el primer slider y el primer punto
    showSlider(slide);
    document.querySelectorAll("nav .puntos")[0].style.backgroundColor = "black";


    //Pasa al siguiente slider continuamente con una pausa de entre 5 y 10 segundos.
    setInterval(() => {
        slide++;

        //Comprobaciones.
        if (slide > total) slide = 0;

        showSlider(slide);

        //Si estamos en el slider 2 esperamos un tiempo antes de mostrar el siguiente slider
        if(slide==0) setTimeout(() => showSlider(slide),40000);
        //console.log(slide + " y sale");

    }, Math.floor(Math.random()*10000)+5400);

    //Botones siguiente y atrás
    let next = document.querySelector(".next");
    let prev = document.querySelector(".prev");

    /**
     * Botón siguiente.
     */
    next.addEventListener('click', (evt) => {
        evt.preventDefault();
        slide++;
        //Comprobación para volver al primero
        if (slide > total) slide = 0;
        showSlider(slide);
    })

    /** 
     * Botón atrás.
     */
    prev.addEventListener("click", (evt) => {
        evt.preventDefault();
        slide--;
        if (slide < 0) slide = total; //Ponemos el slider en la última posición.
        showSlider(slide);
    })
}


/**
    * Muestra los sliders pasados por parametro.
    * @param {Number} n - Numero del slide del que quieres mostrar.
*/
function showSlider(n) {
    for (let i = 0; i < tSlider.length; i++) 
        (i == n) ? tSlider[n].style.display = "block" : tSlider[i].style.display = "none";
}


/**
 * Calcula el porcentaje de scroll que has hecho en la página y lo muestra en una barra.
 */
function progreso() {
    scrollDoc = document.documentElement.scrollTop;
    docHeight = document.documentElement.scrollHeight;
    winHeight = window.innerHeight;

    let porcentaje = (scrollDoc) / (docHeight-winHeight);

    let total = Math.round(porcentaje*100);

    console.log("total:" + total);

    //Selecciona el top total en pixeles del div requerido.
    let top2 = document.getElementsByClassName("home2Text")[0].offsetTop;

    //CAMBIAR
    
    if(total > 0 && total <= 14) {
        setTimeout(window.scrollTo(0,top2),500);
    }

    if(total < 30 && total > 16)
        setTimeout(window.scrollTo(0,0),500); 

    if(total == INICIO) {
        document.querySelector("nav").style.backgroundColor = "#4C566A";

        navPuntos(0);
    }
    else if(total >= 35 && total < 65) {
        document.querySelector("nav").style.backgroundColor = "#222";

        navPuntos(1);
    }
    else if(total >= 66 && total < 96) {
        navPuntos(2);
        document.getElementById("santaImg").style.display= "none";
    }
    else if(total >= 96) {
        document.getElementById("santaImg").style.display= "block";
        navPuntos(3);
    }
    /*else if(total > 37) { 
        window.scrollTo(45,0);
    }*/

    //Secciones -> 37, 74, 96 (minijuego), 100 (footer)

    //Luces de navidad:
    if(total>=16) document.getElementsByClassName("light-bulb")[0].style.display = "block";
    else if(total<16) document.getElementsByClassName("light-bulb")[0].style.display = "none";

    if(total>=28) document.getElementsByClassName("light-bulb")[1].style.display = "block";
    else if(total<28) document.getElementsByClassName("light-bulb")[1].style.display = "none";

    if(total>=40) document.getElementsByClassName("light-bulb")[2].style.display = "block";
    else if(total<40) document.getElementsByClassName("light-bulb")[2].style.display = "none";

    if(total>=53) document.getElementsByClassName("light-bulb")[3].style.display = "block";
    else if(total<53) document.getElementsByClassName("light-bulb")[3].style.display = "none";

    if(total>=65) document.getElementsByClassName("light-bulb")[4].style.display = "block";
    else if(total<65) document.getElementsByClassName("light-bulb")[4].style.display = "none";

    if(total>=77) document.getElementsByClassName("light-bulb")[5].style.display = "block";
    else if(total<77) document.getElementsByClassName("light-bulb")[5].style.display = "none";

    document.getElementById("barra").style.width = total+"%";
    
}

/**
 * Función que establece el color del punto en el que estás y resetea los demás
 * @param {Number} n -> Número del punto a rellenar.
 */
function navPuntos(n) {
    
    //Reseteamos los colores de los puntos
    for(let i=0;i<document.querySelectorAll("nav .puntos").length;i++)
        document.querySelectorAll("nav .puntos")[i].style.backgroundColor = "inherit";

    //Ponemos el color de nuestro punto
    document.querySelectorAll("nav .puntos")[n].style.backgroundColor = "black";
}

let timer = 0;
let intervalo = undefined;
/**
 * Función de clicks del minijuego principal.
 * El minijuego consiste en que saldrán distintas decoraciones
 * en las que serán correctas o incorrectas
 */
function miniGameClicks(event) {

    //Inicio minijuego
    isMGStarted = true;

    //Bloqueo drags
    //mapa.addEventListener("dragstart", (event) => event.preventDefault());

    //Vars de bloque
    let div = document.getElementsByClassName("minijuego")[0];
    let medidas = parseFloat(docHeight-winHeight);

    let rnd = rndItem();


    //precarga elementos
    previewItem(rnd);

    //Primer inicio, poner animación.
    if(isMGStarted){
        console.log("Iniciando minijuego...");
        mapa.src = "imgs/chrismasTree.jpg";

        //Comprobamos si has puesto una decoración no valida para el árbol


        //Una vez iniciado el minijuego, activamos el tiempo.
        minigameChecks();

        

        //Se crea el elemento en la posición especificada por el usuario
        let regalo = document.createElement("img");
        regalo.src = rnd;
        regalo.classList.add("regalo");
        regalo.style.height = "20px";
        div.appendChild(regalo);

        regalo.style.top = `${medidas+event.clientY}px`;
        regalo.style.left = `${event.clientX}px`;

        

        //audio para el minijuego cada vez que se le de click.
        /*let audio = document.createElement("audio");
        audio.src = "recursos/clickMiniGame.mp3";
        audio.controls = "controls";
        audio.type = 'audio/mp3';*/

        let audio = new Audio('recursos/clickMiniGame.mp3');
        audio.play();
        //audio.loop =true;
        audio.playbackRate = 1.8;
        //audio.pause();

        //document.getElementsByClassName("minijuego")[0].appendChild(audio);

  
        console.log(regalo);
    }
}

function minigameChecks() {
    //Comprobaciones minijuego
    timer = 0;
    let h3 = undefined;
    intervalo = setInterval(function() {
        //Poner todas las decoraciones que se pueda en X tiempo
        timer++;
        if(timer > 5) {
            clearInterval(intervalo); //No funciona si es una función tipo flecha el intervalo.
            console.log(intervalo);
        }
    }, 1000);

    setTimeout(() => {
        if(timer > 5 ) {
            clearInterval(intervalo);
            console.error("¡Se acabó el tiempo! y " + timer);

            //Eliminamos todos los regalos
            for(let i=0;i<document.querySelectorAll(".regalo").length;i++)
                document.querySelectorAll(".regalo")[i].remove();

            //Mensaje perdido en pantalla 
            if(!document.getElementById("h3Looser")) {
                h3 = document.createElement("h3");
                h3.id = "h3Looser";
                h3.textContent = "¡Has perdido!";

                document.getElementsByClassName("minijuego")[0].appendChild(h3);
            }
        }
    }, 6000);
}

/**
 * Selecciona un item aleatoriamente
 * @returns rutaImagen
 */
function rndItem() {
    
    let arrayDecoraciones = ["imgs/minigame/ig.png","imgs/minigame/bauble.png","imgs/minigame/bolaNieve.png"];

    return arrayDecoraciones[Math.floor(Math.random()*arrayDecoraciones.length)];
}

/**
 * Función que previsualiza el siguiente item del minijuego
 */
function previewItem(rnd) {

    //Eliminamos la preview si la hubiera
    if(document.getElementById("preview")) document.getElementById("preview").remove();   


    let divItem = document.querySelector(".rndItem");

    //let item = rndItem();

    let previewItem = document.createElement("img");
    previewItem.src = rnd;
    previewItem.id = "preview";
    previewItem.classList.add("regaloPr");
    previewItem.style.height = "20px";
    divItem.appendChild(previewItem);

}