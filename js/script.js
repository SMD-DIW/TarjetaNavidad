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

function iniciar() {

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
        window.scrollTo(0,top2);
    }

    if(total < 30 && total > 16)
        window.scrollTo(0,0); 


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


/**
 * Función de clicks del minijuego principal.
 */
function miniGameClicks(event) {

    //Inicio minijuego
    isMGStarted = true;

    //Bloqueo drags
    mapa.addEventListener("dragstart", (event) => event.preventDefault());

    //Vars de bloque
    let div = document.getElementsByClassName("minijuego")[0];
    let medidas = parseFloat(docHeight-winHeight);

    //Primer inicio, poner animación.
    if(isMGStarted){
        console.log("Iniciando minijuego...");
        mapa.src = "recursos/imgs/chrismasTree.jpg";

        let divBolas = document.createElement("div");
        divBolas.classList.add("inputsBolas");
        div.appendChild(divBolas);

        //Creamos las bolas de navidad para el árbol...
        let regalo = document.createElement("img");
        regalo.src = "recursos/imgs/bauble.png";
        regalo.classList.add("regalo");
        div.appendChild(regalo);

        regalo.style.top = `${medidas+512}px`;
        regalo.style.left = `500px`;

        //Checks drags
        regalo.addEventListener("dragstart", function(e) {
            draggedItem = regalo;
            setTimeout(() => {
                regalo.style.display = "none";
            }, 0);
        });

        regalo.addEventListener("dragend", function(e) {
            setTimeout(() => {
                regalo.style.display = "block";
                draggedItem = null;
                e.target.append(regalo);

                console.log(e);
            }, 0);
        });

        regalo.addEventListener("drop", function(e) {
            //Apend del regalo
            e.target.append(regalo);
            console.log("DROP");
        });

    }
    
    //console.log(event.target);
}