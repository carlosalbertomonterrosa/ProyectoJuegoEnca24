// ============================================
// CÓDIGO ORIGINAL DEL EQUIPO — NO MODIFICADO
// Variables y configuración inicial del juego
// ============================================
var tiempo = 20;
var intervalo;
var contesto = 0;

// Genera los dos números aleatorios para la primera suma
var a = parseInt(Math.random() * 10) + 1;
var b = parseInt(Math.random() * 10) + 1;
var respuestacorrecta = a + b;
$("#numero1").val(a);
$("#numero2").val(b);

// Referencias a los elementos de audio
var elementoSonidoGeneral  = $("#audiogeneral")[0];
var elementoSonidoVictoria = $("#audiovictoria")[0];
var elementoSonidoPerdida  = $("#audioperdida")[0];
var elementoSonidoTimeOut  = $("#audiotimeout")[0];
var elementoSonidoBoton    = $("#sonidoboton")[0];

// Código original del equipo — botón reiniciar
$("#reiniciar").on("click", function() {
    location = "index.html";
});

// ============================================
// EDITADO POR CARLOS MONETTROSA
// Función para generar nuevos números aleatorios
// Se llama al inicio y cada vez que el jugador responde
// ============================================
function generarNumeros() {
    a = Math.floor(Math.random() * 100) + 1;
    b = Math.floor(Math.random() * 100) + 1;
    respuestacorrecta = a + b;
    $("#numero1").val(a);
    $("#numero2").val(b);
}
// FIN EDITADO POR CARLOS MONETTROSA

// ============================================
// EDITADO POR CARLOS MONETTROSA
// Permite iniciar el juego con Enter o barra espaciadora
// desde el input del nombre, simula click en empezar
// ============================================
$("#nombre").on("keypress", function(event) {
    if (event.which == 13 || event.which == 32) {
        event.preventDefault();
        $("#empezar").click();
    }
});
// FIN EDITADO POR CARLOS MONETTROSA

// ============================================
// CÓDIGO ORIGINAL DEL EQUIPO
// Click en "Empezar Juego" — arranca el temporizador
// ============================================
$("#empezar").on("click", function() {
    elementoSonidoBoton.play();

    // EDITADO POR CARLOS MONETTROSA
    // Lee el nombre y abre el modal de bienvenida
    var nombre = $('#nombre').val().trim() || 'Jugador';
    mostrarBienvenida(nombre);
    // FIN EDITADO POR CARLOS MONETTROSA

    $(".presentacion").slideUp("fast");
    $("#juego").slideDown("fast");

    // EDITADO POR CARLOS MONETTROSA
    // Reinicia variables para que el contador llegue
    // bien a cero en cada partida nueva
    tiempo = 20;
    contesto = 0;
    window.respuestasCorrectas = 0;
    $("#tiempo").css("color", "white");
    // FIN EDITADO POR CARLOS MONETTROSA

    $("#tiempo").html(tiempo);

    // Código original del equipo — temporizador
    intervalo = setInterval(function() {
        tiempo--;
        $("#tiempo").html(tiempo);

        if (tiempo < 10) {
            $("#tiempo").css("color", "yellow");
        }
        if (tiempo < 5) {
            $("#tiempo").css("color", "red");
            // EDITADO POR CARLOS MONETTROSA: fondo degradado rojo en peligro
            $("body").css("background", "linear-gradient(135deg,#3d0000,#7f0000)");
        }
        if (tiempo == 0) {
            clearInterval(intervalo);
            elementoSonidoGeneral.pause();
            elementoSonidoTimeOut.play();
            elementoSonidoTimeOut.volume = 0.3;

            // EDITADO POR CARLOS MONETTROSA
            // Muestra modal de resultado con niveles al llegar a cero
            mostrarResultadoFinal(window.respuestasCorrectas);
            // FIN EDITADO POR CARLOS MONETTROSA

            // Código original del equipo — mantiene gameover por si otro compañero lo usa
            if (contesto == 0) {
                $(".gameover, .mensajeover").fadeIn("fast");
            }
        }
    }, 1000);
});

// Código original del equipo — click en botón Iniciar
$(".iniciar").on("click", function() {
    elementoSonidoBoton.play();
    elementoSonidoGeneral.volume = 0.25;
    elementoSonidoGeneral.play();
    $(this).fadeOut("fast", function() {
        $(".presentacion").fadeIn("fast");
    });
});

// Código original del equipo — botón Responder llama a evaluar()
$("#responder").on("click", evaluar);

// ============================================
// EDITADO POR CARLOS MONETTROSA
// Función evaluar — modificada para:
// 1. Dar mensaje del Tigre en cada caso
// 2. Sumar al contador de respuestas correctas
// 3. Generar nuevos números después de cada respuesta
// ============================================
function evaluar() {
    var resuser = $("#respuestausuario").val();

    if (resuser == respuestacorrecta) {
        contesto = 1;

        // EDITADO POR CARLOS MONETTROSA: mensaje cuando acierta
        alert("¡Casi te muerde el Tigre! 🐯 ¡Bien hecho!");

        // EDITADO POR CARLOS MONETTROSA: suma al contador global
        window.respuestasCorrectas++;

        elementoSonidoVictoria.play();
        elementoSonidoVictoria.volume = 0.2;

        // EDITADO POR CARLOS MONETTROSA: genera nuevos números para seguir jugando
        generarNumeros();

    } else {
        // EDITADO POR CARLOS MONETTROSA: mensaje cuando falla o tarda
        alert("¡Te mordió el Tigre! 🐯 Eso estuvo mal, repasa las sumas.");

        elementoSonidoPerdida.play();
        elementoSonidoPerdida.volume = 0.3;

        // EDITADO POR CARLOS MONETTROSA: genera nuevos números si falla
        generarNumeros();
    }

    // EDITADO POR CARLOS MONETTROSA: limpia el campo después de cada intento
    $("#respuestausuario").val("");
}
// FIN EDITADO POR CARLOS MONETTROSA

// Código original del equipo — tecla espacio también evalúa
$(document).on("keypress", function(event) {
    if (event.which == 32) {
        evaluar();
    }
});