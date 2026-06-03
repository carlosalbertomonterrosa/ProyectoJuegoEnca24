/* ============================================
   CAMBIOS HECHOS POR CARLOS
   Agrega estas líneas en los puntos indicados
   de funciones.js. No borres el código existente.
   ============================================ */

/* --------------------------------------------------
   1. DONDE YA TIENES el click del botón #empezar:
      Agrega la llamada al modal de bienvenida.
      Busca el evento click de #empezar y añade esto:

      var nombre = $('#nombre').val();
      mostrarBienvenida(nombre);   // CAMBIO HECHO POR CARLOS

   -------------------------------------------------- */

/* --------------------------------------------------
   2. DONDE GENERAS LOS NÚMEROS (cada vez que el
      temporizador avanza o se responde):
      Asegúrate de generar nuevos números aleatorios.
      Si aún no lo tienes, usa esta función:
var tiempo=20;
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

      function generarNumeros() {           // CAMBIO HECHO POR CARLOS
          var n1 = Math.floor(Math.random() * 100) + 1;
          var n2 = Math.floor(Math.random() * 100) + 1;
          $('#numero1').val(n1);
          $('#numero2').val(n2);
      }

      Llámala al inicio del juego Y cada vez que
      el jugador responde (correcto o no).

   -------------------------------------------------- */

/* --------------------------------------------------
   3. DONDE EL JUGADOR RESPONDE CORRECTAMENTE:
      Suma al contador de respuestas correctas.

      window.respuestasCorrectas++;   // CAMBIO HECHO POR CARLOS
      generarNumeros();               // CAMBIO HECHO POR CARLOS — nuevos números

   -------------------------------------------------- */

/* --------------------------------------------------
   4. DONDE EL JUEGO TERMINA (tiempo agotado o
      condición de fin):
      En lugar de mostrar el .mensajeover original,
      llama a la función de resultado final:

      mostrarResultadoFinal(window.respuestasCorrectas); // CAMBIO HECHO POR CARLOS

      Si quieres mantener el .gameover original también,
      déjalo, solo agrega la línea de arriba después.

   -------------------------------------------------- */
// ejecucion boton de responder
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
