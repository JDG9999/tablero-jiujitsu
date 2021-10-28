var bocina = new Audio('recursos/bocina.mp3');
var version = 'Adultos';
var competidor = [
    {
        estado: 'activo',
        kimono: 0,
        puntos: 0,
        ventajas: 0,
        faltas: 0
    },
    {
        estado: 'activo',
        kimono: 0,
        puntos: 0,
        ventajas: 0,
        faltas: 0
    }
];
// variables del cronómetro
var ejecucionCronometro = false;
var decimas = 10;
var segundos = 0;
var minutos = 5;

var teclaPres = [];
document.onkeydown = document.onkeyup = function (e) {
    e = e || event;
    teclaPres[e.keyCode] = e.type == 'keydown';
    // 49 y 97 son los códigos del número 1 en ambos teclados
    var c1Tecla = teclaPres[49] || teclaPres[97];
    // 50 y 98 son los códigos del número 2 en ambos teclados
    var c2Tecla = teclaPres[50] || teclaPres[98];
    // 83 es el código de la tecla 'S' para sumisión
    var sumTecla = teclaPres[83];
    // 68 es el código de la tecla 'D' para descalificación
    var descTecla = teclaPres[68];

    if (c1Tecla && sumTecla) {
        if (competidor[0].estado == 'activo') {
            competidor[0].estado = 'sumision';
        } else if (competidor[0].estado == 'sumision') {
            competidor[0].estado = 'activo';
        }
    } else if (c1Tecla && descTecla) {
        if (competidor[0].estado == 'activo') {
            competidor[0].estado = 'descalificado';
        } else if (competidor[0].estado == 'descalificado') {
            competidor[0].estado = 'activo';
        }
    } else if (c2Tecla && sumTecla) {
        if (competidor[1].estado == 'activo') {
            competidor[1].estado = 'sumision';
        } else if (competidor[1].estado == 'sumision') {
            competidor[1].estado = 'activo';
        }
    } else if (c2Tecla && descTecla) {
        if (competidor[1].estado == 'activo') {
            competidor[1].estado = 'descalificado';
        } else if (competidor[1].estado == 'descalificado') {
            competidor[1].estado = 'activo';
        }
    }
    actualizarEstadoCompetidor(0);
    actualizarEstadoCompetidor(1);
}

function actualizarEstadoCompetidor(comp) {
    var victoria = "VICTORIA POR SUMISIÓN";
    var descalificado = "DESCALI&shy;­FICADO";
    var mensajeCuadro = comp == 0 ? 'mensaje-c1' : 'mensaje-c2'; 
    var mensaje = comp == 0 ? 'mensaje-texto-c1' : 'mensaje-texto-c2'; 
    if (competidor[comp].estado == 'sumision') {
        detenerCronometro();
        mostrarMensaje();
        document.getElementById(mensajeCuadro).style.display = "block";
        document.getElementById(mensajeCuadro).style.border = "10px solid green";
        document.getElementById(mensaje).innerHTML = victoria;
        document.getElementById(mensaje).style.color = "green";
    } else if (competidor[comp].estado == 'descalificado') {
        detenerCronometro();
        mostrarMensaje();
        document.getElementById(mensajeCuadro).style.display = "block";
        document.getElementById(mensajeCuadro).style.border = "10px solid black";
        document.getElementById(mensaje).innerHTML = descalificado;
        document.getElementById(mensaje).style.color = "black";
    } else if (competidor[comp].estado == 'activo') {
        ocultarMensajeComp(comp);
    }
    if (competidor[0].estado == 'activo' && competidor[1].estado == 'activo') {
        ocultarMensaje();
    }
}

// iniciar el cronómetro al pulsar 'enter'
document.onkeypress = function (event) {
    if (event.keyCode == 13) {
        if (!ejecucionCronometro) {
            iniciarCronometro();
        } else {
            detenerCronometro();
        }
    }
}

function cronometro() {
    if (ejecucionCronometro) {
        decimas -= 1;
        // segundos
        if (decimas < 0) {
            decimas = 9;
            segundos -= 1;
        }
        // minutos
        if (segundos < 0) {
            segundos = 59;
            minutos -= 1;
        }
        // mostrar reloj
        escribirReloj();
        // ejecucion reloj
        if (segundos == 0 && minutos == 0) {
            finalizarCronometro();
        } else {
            setTimeout(cronometro, 100);
        }
    }
}

// inicia el cronómetro
function iniciarCronometro() {
    if (segundos == 0 && minutos == 0) {
        finalizarCronometro();
    } else {
        ejecucionCronometro = true;
        cronometro();
    }
}

// detiene el cronómetro
function detenerCronometro() {
    ejecucionCronometro = false;
}

// cuando el cronómetro finaliza
function finalizarCronometro() {
    detenerCronometro();
    bocina.play();
}

function modificarReloj(tiempo, tipo, operacion) {
    if (tiempo == 'segundos') {
        if (tipo == 'decena') {
            if (operacion == 'mas') {
                if (segundos <= 49) { segundos += 10; }
            } else if (operacion == 'menos') {
                if (segundos >= 10) { segundos -= 10; }
            }
        } else if (tipo == 'unidad') {
            if (operacion == 'mas') {
                if (segundos <= 58) { segundos += 1; }
            } else if (operacion == 'menos') {
                if (segundos >= 1) { segundos -= 1; }
            }
        }
    } else if (tiempo == 'minutos') {
        if (tipo == 'decena') {
            if (operacion == 'mas') {
                if (minutos <= 89) { minutos += 10; }
            } else if (operacion == 'menos') {
                if (minutos >= 10) { minutos -= 10; }
            }
        } else if (tipo == 'unidad') {
            if (operacion == 'mas') {
                if (minutos <= 98) { minutos += 1; }
            } else if (operacion == 'menos') {
                if (minutos >= 1) { minutos -= 1; }
            }
        }
    }
    escribirReloj();
}

function escribirReloj() {
    document.getElementById('reloj-minutos').innerHTML = (minutos < 10) ? '0' + minutos : minutos;
    document.getElementById('reloj-segundos').innerHTML = (segundos < 10) ? '0' + segundos : segundos;
}

function obtenerRival(comp) {
    return comp == 0 ? 1 : 0;
}

function cambiarKimono(comp) {
    var kimono;
    competidor[comp].kimono++;
    if (competidor[comp].kimono == 4) {
        competidor[comp].kimono = 0;
    }
    kimono = (comp == 0) ? document.getElementById('kimono1') : document.getElementById('kimono2');
    if (competidor[comp].kimono == 0) { kimono.style.backgroundColor = "white"; }
    else if (competidor[comp].kimono == 1) { kimono.style.backgroundColor = "blue"; }
    else if (competidor[comp].kimono == 2) { kimono.style.backgroundColor = "black"; }
    else if (competidor[comp].kimono == 3) { kimono.style.backgroundColor = "pink"; }
}

function modificarPuntuacion(comp, atributo, valor) {
    competidor[comp][atributo] += valor;
    escribirPuntuacion();
    if (atributo == 'faltas' && valor > 0) {
        verificarFaltas(comp);
    }
}

function escribirPuntuacion() {
    document.getElementById('c1-puntos').innerHTML = competidor[0].puntos;
    document.getElementById('c1-ventajas').innerHTML = competidor[0].ventajas;
    document.getElementById('c1-faltas').innerHTML = competidor[0].faltas;
    document.getElementById('c2-puntos').innerHTML = competidor[1].puntos;
    document.getElementById('c2-ventajas').innerHTML = competidor[1].ventajas;
    document.getElementById('c2-faltas').innerHTML = competidor[1].faltas;
}

function verificarFaltas(comp) {
    if (version == 'Adultos') {
        if (competidor[comp].faltas == 2) {
            modificarPuntuacion(obtenerRival(comp), 'ventajas', 1);
        } else if (competidor[comp].faltas == 3) {
            modificarPuntuacion(obtenerRival(comp), 'puntos', 2);
        } else if (competidor[comp].faltas == 4) {
            competidor[comp].estado = 'descalificado';
            actualizarEstadoCompetidor(comp);
        }
    } else if (version == 'Menores') {
        if (competidor[comp].faltas == 2) {
            modificarPuntuacion(obtenerRival(comp), 'ventajas', 1);
        } else if (competidor[comp].faltas >= 3 && competidor[comp].faltas <= 5) {
            modificarPuntuacion(obtenerRival(comp), 'puntos', 2);
        }
        else if (competidor[comp].faltas == 6) {
            competidor[comp].estado = 'descalificado';
            actualizarEstadoCompetidor(comp);
        }
    }
}

function cambiarVersion() {
    version = (version == 'Adultos') ? 'Menores' : 'Adultos';
    document.getElementById('version-tablero').innerHTML = version;
}

function mostrarMensaje() {
    document.getElementById('mensaje-fondo').style.display = "flex";
}

function ocultarMensajeComp(comp) {
    var mensaje = comp == 0 ? 'mensaje-c1' : 'mensaje-c2'
    document.getElementById(mensaje).style.display = "none";
}

function ocultarMensaje() {
    document.getElementById('mensaje-fondo').style.display = "none";
}