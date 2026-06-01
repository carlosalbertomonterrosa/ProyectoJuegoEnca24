var tiempo=20;
var intervalo;
var contesto=0;
// configuración de variables
var a=parseInt(Math.random()*10)+1;
var b=parseInt(Math.random()*10)+1;
var respuestacorrecta=a+b;
$("#numero1").val(a);
$("#numero2").val(b);
$("#reiniciar").on("click",function(){
    location="index.html";
});

// para empezar a jugar 
$("#empezar").on("click",function(){

    // Desde aquí inicié el "up grade" por Carlos Monterrosa
    // Leer el nombre ingresado por el usuario y mostrar mensaje de bienvenida + mensaje del tigre
    var nombreJugador = $("#nombre").val().trim();
    if(nombreJugador === ""){
        nombreJugador = "Jugador"; // nombre por defecto si no escribe nada
    }

    // Escribir el texto de bienvenida con el nombre en el párrafo
    $("#textoBienvenida").text("¡Bienvenido " + nombreJugador + "! 👋");

    // Mostrar el bloque de bienvenida con animación
    $("#bienvenida").fadeIn("fast");

    // Esperar 2.5 segundos, ocultar la bienvenida y arrancar el juego
    setTimeout(function(){
        $("#bienvenida").fadeOut("fast", function(){
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
                    if(contesto==0){
                        $(".gameover,.mensajeover").fadeIn("fast");
                    } 
                }
            },1000);
        });
    }, 2500);
    // Finaliza aquí

    $(".presentacion").slideUp("fast");
});

// referencia al btn iniciar  esperando evento click  ejecuta 
$(".iniciar").on("click",function(){
    // animacion al boton de desvanecer en fast segundios
    // cuando termina la animacion  ejecuta funcion anonima
    $(this).fadeOut("fast",function(){
        //   muestra la presentacion  
        $(".presentacion").fadeIn("fast");
    });
});
$("#responder").on("click",evaluar);
function evaluar(){
    var resuser=$("#respuestausuario").val();
    if(resuser==respuestacorrecta){
        contesto=1;
        alert("Saber Sumar 😃");
    }else{
        alert("Repasar sumas de primara mucha calcu IA 😢");
    }
}
$(document).on("keypress",function(event){
    if(event.which==32){
        evaluar();
    }
});
