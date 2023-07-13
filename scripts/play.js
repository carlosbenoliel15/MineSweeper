/* ------------------------------------------------------------------------------- */
/* Introdução às Tecnologias Web (ITW) - LTI - Departamento de Informática - FCUL. */
/*                              Ano letivo: 2021/2022                              */
/*                   Site realizado pelo Grupo 40 do turno PL23:                   */
/*   Beatriz Pereira nº57579 | Carlos Martins nº57574 | Gonçalo Domingues nº51751  */
/* ------------------------------------------------------------------------------- */

// Impede alguns erros fáceis de cometer.
"use strict";
/* ------------------------------------------------------------------------------ */
// Identificador do modal popup do modo fácil
let modal_facil = document.getElementById("modalFacil");

// Identificador do botão que abre o modal fácil
let btn_facil = document.getElementById("btnFacil");

// Identificador que fecha o modal fácil
let span_facil = document.getElementsByClassName("close")[0];
/* ------------------------------------------------------------------------------ */
// Abre o modal fácil quando o utilizador clica no botão 
btn_facil.onclick = function() {
    modal_facil.style.display = "block";
}

// Fecha o modal fácil quando o utilizador clica no <span> (x)
span_facil.onclick = function() {
    modal_facil.style.display = "none";
}

// Quando o utilizador clica fora do modal -> fecha-se o modal fácil
window.onclick = function(evento) {
    if (evento.target == modal_facil) {
        modal_facil.style.display = "none";
    }
}

/* ------------------------------------------------------------------------------ */
// Identificador do modal popup do modo intermédio
let modal_intermedio = document.getElementById("modalIntermedio");

// Identificador do botão que abre o modal intermédio
let btn_intermedio = document.getElementById("btnIntermedio");

// Identificador que fecha o modal intermédio
let span_intermedio = document.getElementsByClassName("close")[1];


let facilcard=document.getElementById("facilCard")

let intermediocard=document.getElementById("intermedioCard")

let dificilcard=document.getElementById("dificilCard")
/* ------------------------------------------------------------------------------ */
// Abre o modal intermédio quando o utilizador clica no botão 
btn_intermedio.onclick = function() {
    modal_intermedio.style.display = "block";
}

// Fecha o modal intermédio quando o utilizador clica no <span> (x)
span_intermedio.onclick = function() {
    modal_intermedio.style.display = "none";
}

// Quando o utilizador clica fora do modal -> fecha-se o modal intermédio
window.onclick = function(evento) {
    if (evento.target == modal_intermedio) {
        modal_intermedio.style.display = "none";
    }
}

facilcard.onclick=()=>{
    location.href='../templates/jogo_facil_9_9_10.html'
}
intermediocard.onclick=()=>{
    location.href='../templates/./jogo_intermedio_16_16_40.html'
}

dificilcard.onclick=()=>{
    location.href='../templates/jogo_dificil_30_16_99.html'
}


/* ------------------------------------------------------------------------------ */
// Identificador do modal popup do modo díficil
let modal_dificil = document.getElementById("modalDificil");

// Identificador do botão que abre o modal díficil
let btn_dificil = document.getElementById("btnDificil");

// Identificador que fecha o modal díficil
let span_dificil = document.getElementsByClassName("close")[2];
/* ------------------------------------------------------------------------------ */
// Abre o modal díficil quando o utilizador clica no botão
btn_dificil.onclick = function() {
    modal_dificil.style.display = "block";
}

// Fecha o modal díficil quando o utilizador clica no <span> (x)
span_dificil.onclick = function() {
    modal_dificil.style.display = "none";
}

// Quando o utilizador clica fora do modal -> fecha-se o modal díficil
window.onclick = function(evento) {
    if (evento.target == modal_dificil) {
        modal_dificil.style.display = "none";
    }
}


/* ------------------------------------------------------------------------------ */
// Identificador do modal popup do modo personalizado
let modal_personalizado = document.getElementById("modalPersonalizado");

// Identificador do botão que abre o modal personalizado
let btn_personalizado = document.getElementById("btnPersonalizado");

// Identificador que fecha o modal personalizado
let span_personalizado = document.getElementsByClassName("close")[3];
/* ------------------------------------------------------------------------------ */
// Abre o modal personalizado quando o utilizador clica no botão 
btn_personalizado.onclick = function() {
    modal_personalizado.style.display = "block";
}

// Fecha o modal personalizado quando o utilizador clica no <span> (x)
span_personalizado.onclick = function() {
    modal_personalizado.style.display = "none";
}

// Quando o utilizador clica fora do modal -> fecha-se o modal personalizado
window.onclick = function(evento) {
    if (evento.target == modal_personalizado) {
        modal_personalizado.style.display = "none";
    }
}