document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('div.dificultad>button').forEach((e) => {
        e.addEventListener("click", ponerDificultad);
    })
});

let intervalo;
let x_ant = "", y_ant = "";
let puntuacion = 0;

function ponerDificultad() {
    let tiempo;

    switch (this.value) {
        case "Fácil":
            añadirFilas(2);
            tiempo = 1500;
            break;
        case "Difícil":
            añadirFilas(3);
            tiempo = 1000;
            break;
        case "Extremo":
            añadirFilas(4);
            tiempo = 500;
            break;
        case "Imposible":
            añadirFilas(6);
            tiempo = 250;
            break;
    }
    if (intervalo) { clearInterval(intervalo); }
    comenzarJuego(tiempo);
}

function añadirFilas(num) {
    const tablero = document.querySelector(".tablero");
    let filas = "";

    tablero.innerHTML = "";
    for (let x = 1; x <= num; x++) {
        let fila = `<div class="fila-${x}"><div class="hueco-1"><img src="assets/img/topo-dentro.png"><img src="assets/img/topo-fuera.png" class="ver"></div><div class="hueco-2"><img src="assets/img/topo-dentro.png"><img src="assets/img/topo-fuera.png" class="ver"></div><div class="hueco-3"><img src="assets/img/topo-dentro.png"><img src="assets/img/topo-fuera.png" class="ver"></div></div>`;
        filas += fila;
    }
    tablero.innerHTML = filas;
    añadirEventos();
}

function añadirEventos() {
    document.querySelectorAll("[class^='hueco-']").forEach((e) => {
        e.addEventListener("click", haMatado);
    });
}

function comenzarJuego(tiempo) {
    intervalo = setInterval(salirTopo, tiempo);
    document.getElementById("puntuacion").innerHTML = "Puntuación: 0";
}

function salirTopo() {
    let filas = document.querySelectorAll("[class^='fila-']").length;

    let x = Math.floor(Math.random() * filas) + 1;
    let y = Math.floor(Math.random() * 3) + 1;

    if (x_ant != "" && y_ant != "") {
        document.querySelector(`[class="fila-${x_ant}"] [class="hueco-${y_ant}"] img[src="assets/img/topo-fuera.png"]`).style.opacity = 0;
    }
    document.querySelector(`[class="fila-${x}"] [class="hueco-${y}"] img[src="assets/img/topo-fuera.png"]`).style.opacity = 1;
    x_ant = x;
    y_ant = y;
}

function haMatado() {
    const img = this.children[1];

    document.querySelector(".tablero").classList.add("puntero2");
    setTimeout(() => {
        document.querySelector(".tablero").classList.remove("puntero2");
    }, 500);

    if (img.src.split("/").slice(-1) == "topo-fuera.png" && img.style.opacity != 0) {
        puntuacion += 1;
    } else {
        puntuacion = 0;
    }
    document.getElementById("puntuacion").innerHTML = "Puntuación: " + puntuacion;
}