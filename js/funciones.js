// ============================================
// CÓDIGO ORIGINAL DEL EQUIPO — NO MODIFICADO
// Variables y configuración inicial del juego
// ============================================
var tiempo = 20;
var intervalo;
var contesto = 0;

var a = parseInt(Math.random() * 10) + 1;
var b = parseInt(Math.random() * 10) + 1;
var respuestacorrecta = a + b;
$("#numero1").val(a);
$("#numero2").val(b);

var elementoSonidoGeneral  = $("#audiogeneral")[0];
var elementoSonidoVictoria = $("#audiovictoria")[0];
var elementoSonidoPerdida  = $("#audioperdida")[0];
var elementoSonidoTimeOut  = $("#audiotimeout")[0];
var elementoSonidoBoton    = $("#sonidoboton")[0];

$("#reiniciar").on("click", function() {
    location = "index.html";
});

// ============================================
// EDITADO POR CARLOS MONETTROSA
// Genera nuevos números aleatorios cada vez que se responde
// ============================================
function generarNumeros() {
    a = Math.floor(Math.random() * 100) + 1;
    b = Math.floor(Math.random() * 100) + 1;
    respuestacorrecta = a + b;
    $("#numero1").val(a);
    $("#numero2").val(b);
}

// EDITADO POR CARLOS MONETTROSA
// Enter o barra espaciadora en el input del nombre arranca el juego
$("#nombre").on("keypress", function(event) {
    if (event.which == 13 || event.which == 32) {
        event.preventDefault();
        $("#empezar").click();
    }
});

// ============================================
// CÓDIGO ORIGINAL DEL EQUIPO
// Click en Empezar Juego
// ============================================
$("#empezar").on("click", function() {
    elementoSonidoBoton.play();

    // EDITADO POR CARLOS MONETTROSA: modal de bienvenida con nombre
    var nombre = $('#nombre').val().trim() || 'Jugador';
    mostrarBienvenida(nombre);

    $(".presentacion").slideUp("fast");
    $("#juego").slideDown("fast");

    // EDITADO POR CARLOS MONETTROSA
    // Reinicia variables para que el contador llegue bien a 0
    tiempo = 20;
    contesto = 0;
    window.respuestasCorrectas = 0;
    $("#tiempo").css("color", "white");

    $("#tiempo").html(tiempo);

    // Código original — temporizador
    intervalo = setInterval(function() {
        tiempo--;
        $("#tiempo").html(tiempo);

        if (tiempo < 10) {
            $("#tiempo").css("color", "yellow");
        }
        if (tiempo < 5) {
            $("#tiempo").css("color", "red");
            // EDITADO POR CARLOS MONETTROSA: fondo rojo de peligro
            $("body").css("background", "linear-gradient(135deg,#3d0000,#7f0000)");
        }
        if (tiempo == 0) {
            clearInterval(intervalo);
            elementoSonidoGeneral.pause();
            elementoSonidoTimeOut.play();
            elementoSonidoTimeOut.volume = 0.3;

            // EDITADO POR CARLOS MONETTROSA: modal de resultado final
            mostrarResultadoFinal(window.respuestasCorrectas);

            // Código original — mantiene gameover por si otro compañero lo usa
            if (contesto == 0) {
                $(".gameover, .mensajeover").fadeIn("fast");
            }
        }
    }, 1000);
});

// Código original — botón Iniciar
$(".iniciar").on("click", function() {
    elementoSonidoBoton.play();
    elementoSonidoGeneral.volume = 0.25;
    elementoSonidoGeneral.play();
    $(this).fadeOut("fast", function() {
        $(".presentacion").fadeIn("fast");
    });
});

// Código original — botón Responder
$("#responder").on("click", evaluar);

// ============================================
// EDITADO POR CARLOS MONETTROSA
// Evaluar respuesta con mensajes del Tigre
// ============================================
function evaluar() {
    var resuser = $("#respuestausuario").val();

    if (resuser == respuestacorrecta) {
        contesto = 1;
        alert("¡Casi te muerde el Tigre! 🐯 ¡Bien hecho!");
        window.respuestasCorrectas++;
        elementoSonidoVictoria.play();
        elementoSonidoVictoria.volume = 0.2;
        generarNumeros();
    } else {
        alert("¡Te mordió el Tigre! 🐯 Eso estuvo mal, repasa las sumas.");
        elementoSonidoPerdida.play();
        elementoSonidoPerdida.volume = 0.3;
        generarNumeros();
    }

    $("#respuestausuario").val("");
}

// Código original — espacio también evalúa
$(document).on("keypress", function(event) {
    if (event.which == 32) {
        evaluar();
    }
});
