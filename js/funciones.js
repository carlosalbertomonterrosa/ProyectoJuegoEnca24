var tiempo=0;
var intervalo;
var contesto=0;
// configuración de variables
var a=parseInt(Math.random()*10)+1;
var b=parseInt(Math.random()*10)+1;
var respuestacorrecta=a+b;
$("#numero1").val(a);
$("#numero2").val(b);
var elementoSonidoGeneral=$("#audiogeneral")[0];
var elementoSonidoVictoria=$("#audiovictoria")[0];
var elementoSonidoPerdida=$("#audioperdida")[0];
var elementoSonidoTimeOut=$("#audiotimeout")[0];
var elementoSonidoBoton=$("#sonidoboton")[0];
var confirinijuego= 0;

// referencia al btn iniciar  esperando evento click  ejecuta 
$(".iniciar").on("click",function(){
    // sonido de click al oprimir un boton
    elementoSonidoBoton.play();
    //sonido de fondo general
    elementoSonidoGeneral.volume=0.25;
    elementoSonidoGeneral.play(); 
    // animacion al boton de desvanecer en fast segundios
    // cuando termina la animacion  ejecuta funcion anonima
    $(this).fadeOut("fast",function(){
        //   muestra la presentacion  
        $(".presentacion").fadeIn("fast");
        $("#empezar").css("display","none");
    });
});

// ejecucion botones de dificultad:
$("#facil").on("click",function(){
    tiempo=20;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#facil").css("box-shadow","0 0 36px rgba(32, 250, 4, 0.55)");
    $("#medio,#dificil").css("box-shadow","none");
});
$("#medio").on("click",function(){
    tiempo=14;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#medio").css("box-shadow","0 0 36px rgba(255, 255, 4, 0.54)");
    $("#facil,#dificil").css("box-shadow","none");
});
$("#dificil").on("click",function(){
    tiempo=8;
    elementoSonidoBoton.play();
    $("#empezar").css("display","inline");
    $("#dificil").css("box-shadow","0 0 36px rgba(255, 4, 4, 0.59)");
    $("#medio,#facil").css("box-shadow","none");
});

// ejecucion boton "empezar juego" a jugar luego de la presentacion:
$("#empezar").on("click",function(){
    confirinijuego= 1;
    elementoSonidoBoton.play();
    $(".presentacion").slideUp("fast");
    $("#juego").slideDown("fast");
    $("#tiempo").html(tiempo);
    intervalo=setInterval(function(){
        tiempo--;
        $("#tiempo").html(tiempo);
        if(tiempo<10){
            $("#tiempo").css("color","yellow"); 
        }
        if(tiempo<5){
            $("#tiempo").css("color","red");
            $("body").css("background","salmon");
        }
        if(tiempo==0){            
            clearInterval(intervalo);
            elementoSonidoGeneral.pause();
            elementoSonidoTimeOut.play();
            elementoSonidoTimeOut.volume=0.3;
        
            if(contesto==0){
                $(".gameover,.mensajeover").fadeIn("fast");
            } 
        }
    },1000);
});

//    ------ejecucion boton de responder----------
$("#responder").on("click",evaluar);

function evaluar(){
    var resuser=$("#respuestausuario").val();
    if (resuser==respuestacorrecta){
        contesto=1;
        elementoSonidoVictoria.play();
        elementoSonidoVictoria.volume=0.2;
        alert("Saber Sumar 😃");}
    else { elementoSonidoPerdida.play();
        elementoSonidoPerdida.volume=0.3;
        alert("Repasar sumas de primaria mucha calcu IA 😢");}
}
$(document).on("keypress",function(event){
    if(event.which==13 && confirinijuego==1){
        evaluar();
    }
});

// boton reiniciar
$("#reiniciar").on("click",function(){
    location="index.html";
});


// ===================================================================================================================================
// === CAMBIOS HECHOS POR CARLOS ===
        // Variables para contar respuestas correctas
        window.respuestasCorrectas = 0;

        function generarNumeros() {           // CAMBIO HECHO POR CARLOS
          var n1 = Math.floor(Math.random() * 100) + 1;
          var n2 = Math.floor(Math.random() * 100) + 1;
          $('#numero1').val(n1);
          $('#numero2').val(n2);
      }

        // Función que muestra el modal de bienvenida con el nombre
        window.mostrarBienvenida = function(nombre) {
            $('#modal-texto').text('¡Bienvenido, ' + nombre + '!');
            $('#modal-bienvenida').fadeIn(300);
        };

        // Cierra modal de bienvenida y arranca el juego
        $('#modal-cerrar').on('click', function() {
            $('#modal-bienvenida').fadeOut(200);
            // El juego ya fue iniciado antes de abrir el modal
        });

        // Función que muestra el resultado final con nivel
        window.mostrarResultadoFinal = function(correctas) {
            let emoji, titulo, nivel;

            if (correctas >= 5) {
                emoji  = '🍄';
                titulo = '¡Eres nivel Mario!';
                nivel  = 'Maestro de las sumas. ¡Impresionante!';
            } else if (correctas >= 3) {
                emoji  = '🧠';
                titulo = '¡Eres nivel Einstein!';
                nivel  = 'Muy bien, casi genio.';
            } else {
                emoji  = '🤖';
                titulo = '¡Eres nivel IA!';
                nivel  = 'Tranquilo, la máquina también falla a veces.';
            }

            $('#resultado-emoji').text(emoji);
            $('#resultado-titulo').text(titulo);
            $('#resultado-nivel').text(nivel);
            $('#resultado-puntaje').text('Respuestas correctas: ' + correctas + ' / 5');
            $('#modal-resultado').fadeIn(300);
        };

        // Botón volver a jugar del modal de resultado
        $('#btn-volver-jugar').on('click', function() {
            $('#modal-resultado').fadeOut(200);
            window.respuestasCorrectas = 0;
            // Muestra el botón iniciar como al principio
            $('.iniciar').fadeIn(200);
        });

        // Botón salir: cierra resultado y muestra mensaje del tigre
        $('#btn-salir').on('click', function() {
            $('#modal-resultado').fadeOut(200);
            setTimeout(function() {
                $('#modal-salida').fadeIn(300);
            }, 250);
        });

        // Cierra el mensaje del tigre
        $('#btn-cerrar-salida').on('click', function() {
            $('#modal-salida').fadeOut(200);
        });

            //   Llámala al inicio del juego Y cada vez que
    //   el jugador responde (correcto o no).

//  --------------------------------------------------
//    3. DONDE EL JUGADOR RESPONDE CORRECTAMENTE:
//       Suma al contador de respuestas correctas.

      window.respuestasCorrectas++;   // CAMBIO HECHO POR CARLOS
      generarNumeros();               // CAMBIO HECHO POR CARLOS — nuevos números

//  --------------------------------------------------
//    4. DONDE EL JUEGO TERMINA (tiempo agotado o
//       condición de fin):
//       En lugar de mostrar el .mensajeover original,
//       llama a la función de resultado final:

      mostrarResultadoFinal(window.respuestasCorrectas); // CAMBIO HECHO POR CARLOS

    //   Si quieres mantener el .gameover original también,
    //   déjalo, solo agrega la línea de arriba después.


        // === FIN CAMBIOS HECHOS POR CARLOS ===