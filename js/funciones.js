
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
var dificultad="facil";

$("#reiniciar").on("click",function(){
    location="index.html";
});

// para empezar a jugar 
$("#empezar").on("click",function(){
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


// referencia al btn iniciar  esperando evento click  ejecuta 
$(".iniciar").on("click",function(){
    elementoSonidoBoton.play();
    //sonido
    elementoSonidoGeneral.volume=0.25;
    elementoSonidoGeneral.play(); 
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
        elementoSonidoVictoria.play();
        elementoSonidoVictoria.volume=0.2;
    }else{
        alert("Repasar sumas de primara mucha calcu IA 😢");
        elementoSonidoPerdida.play();
        elementoSonidoPerdida.volume=0.3;
    }
}
$(document).on("keypress",function(event){
    if(event.which==13){
        evaluar();
    }
});