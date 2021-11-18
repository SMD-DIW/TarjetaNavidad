/**
 * @file Controlador principal de la web
 * 
 * @author Sergio Matamoros Delgado <smatamorosdelgado.guadalupe@alumnado.fundacionloyola.net>
 * @license GPL v3 2021
 * @description Controlador principal de la página web.
 */

'use strict';

window.onload = iniciar;

window.addEventListener("scroll",progreso);


function iniciar() {

    //Slider inicial
    let slide = 0;

    //Total de sliders
    let slides = document.querySelectorAll(".home1Text ul li");

    //Muestra el total de elementos que hay.
    let total = slides.length-1;
    
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

    /**
     * Muestra los sliders pasados por parametro.
     * @param {Number} n - Numero del slide del que quieres mostrar.
     */
    function showSlider(n) {
        for (let i = 0; i < slides.length; i++) 
            (i == n) ? slides[n].style.display = "block" : slides[i].style.display = "none";
    }
}


/**
 * Calcula el porcentaje de scroll que has hecho en la página y lo muestra en una barra.
 */
function progreso() {
    let scroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollTop - document.documentElement.scrollHeight;

    let total = Math.abs(scroll/height)*100;

    console.log(total);

    if(total > 0) {
        //document.querySelector("nav").style.opacity = 0.5;
        document.querySelector("nav").style.backgroundColor = "#222";
        navPuntos(1);
    }
    else if(total == 0) {
        document.querySelector("nav").style.backgroundColor = "#4C566A";
        navPuntos(0);
    }
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