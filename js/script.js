/**
 * @file Controlador principal de la web
 * 
 * @author Sergio Matamoros Delgado <smatamorosdelgado.guadalupe@alumnado.fundacionloyola.net>
 * @license GPL v3 2021
 * @description Controlador principal de la página web.
 */

'use strict';

window.addEventListener("scroll",progreso);

/**
 * Calcula el porcentaje de scroll que has hecho en la página y lo muestra en una barra.
 */
function progreso() {
    let scroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollTop - document.documentElement.scrollHeight;

    let total = Math.abs(scroll/height)*100;

    //console.log(total);
    
    document.getElementById("barra").style.width = total+"%";
}