// ============================================
// EDITADO POR CARLOS MONETTROSA
// Juego del muñeco — lógica completa
// El muñeco se quema parte por parte con cada fallo
// ============================================

var JuegoMuneco = (function() {

    // Piezas del muñeco en orden de quema (8 errores max)
    var partes = ['cabeza','cuerpo','brazo-der','brazo-izq','pierna-der','pierna-izq','ojo-der','ojo-izq'];
    var errores = 0;
    var maxErrores = 8;
    var respuestaCorrecta = 0;
    var tiempoRestante = 30;
    var intervaloMuneco;
    var aciertos = 0;
    var numeroA = 0;
    var numeroB = 0;

    // Genera nueva pregunta
    function nuevaPregunta() {
        numeroA = Math.floor(Math.random() * 50) + 1;
        numeroB = Math.floor(Math.random() * 50) + 1;
        respuestaCorrecta = numeroA + numeroB;
        document.getElementById('m-num1').textContent = numeroA;
        document.getElementById('m-num2').textContent = numeroB;
        document.getElementById('m-respuesta').value = '';
        document.getElementById('m-respuesta').focus();
        // Animación de nueva pregunta
        var pizarra = document.getElementById('muneco-pizarra');
        pizarra.style.transform = 'scale(0.97)';
        setTimeout(function(){ pizarra.style.transform = 'scale(1)'; }, 150);
    }

    // Dibuja el muñeco SVG según errores
    function actualizarMuneco() {
        // Oculta todas las partes primero
        partes.forEach(function(p, i) {
            var el = document.getElementById('parte-' + p);
            if (el) {
                if (i < errores) {
                    el.style.opacity = '1';
                    // Efecto fuego en la última parte añadida
                    if (i === errores - 1) {
                        el.classList.add('ardiendo');
                        setTimeout(function(){ el.classList.remove('ardiendo'); }, 600);
                    }
                } else {
                    el.style.opacity = '0';
                }
            }
        });

        // Actualiza contador de vidas
        var vidas = document.getElementById('muneco-vidas');
        if (vidas) {
            var corazones = '';
            for (var i = 0; i < maxErrores; i++) {
                corazones += i < (maxErrores - errores) ? '❤️' : '🖤';
            }
            vidas.textContent = corazones;
        }

        // Si se quemó todo el muñeco
        if (errores >= maxErrores) {
            terminarJuegoMuneco(false);
        }
    }

    // Evalúa respuesta del jugador
    function evaluarMuneco() {
        var input = document.getElementById('m-respuesta');
        var res = parseInt(input.value);
        if (isNaN(res)) return;

        if (res === respuestaCorrecta) {
            aciertos++;
            document.getElementById('m-aciertos').textContent = aciertos;
            // Efecto correcto en pizarra
            var pizarra = document.getElementById('muneco-pizarra');
            pizarra.style.borderColor = '#66bb6a';
            setTimeout(function(){ pizarra.style.borderColor = '#4a7c4a'; }, 400);
            nuevaPregunta();
        } else {
            errores++;
            actualizarMuneco();
            // Sacude el muñeco
            var svgEl = document.getElementById('muneco-svg');
            if (svgEl) {
                svgEl.style.transform = 'translateX(-8px)';
                setTimeout(function(){ svgEl.style.transform = 'translateX(8px)'; }, 100);
                setTimeout(function(){ svgEl.style.transform = 'translateX(0)'; }, 200);
            }
            document.getElementById('m-respuesta').value = '';
            document.getElementById('m-respuesta').focus();
        }
    }

    // Timer
    function iniciarTimer() {
        tiempoRestante = 30;
        document.getElementById('m-timer').textContent = tiempoRestante;
        document.getElementById('m-timer').style.color = '#ffd200';
        intervaloMuneco = setInterval(function() {
            tiempoRestante--;
            document.getElementById('m-timer').textContent = tiempoRestante;
            if (tiempoRestante < 10) document.getElementById('m-timer').style.color = '#ff6b6b';
            if (tiempoRestante <= 0) {
                clearInterval(intervaloMuneco);
                errores++;
                actualizarMuneco();
                if (errores < maxErrores) {
                    tiempoRestante = 30;
                    document.getElementById('m-timer').style.color = '#ffd200';
                    intervaloMuneco = setInterval(arguments.callee, 1000);
                }
            }
        }, 1000);
    }

    // Fin del juego
    function terminarJuegoMuneco(ganaste) {
        clearInterval(intervaloMuneco);
        var overlay = document.getElementById('muneco-gameover');
        var emoji   = document.getElementById('go-emoji');
        var titulo  = document.getElementById('go-titulo');
        var sub     = document.getElementById('go-sub');
        var puntaje = document.getElementById('go-puntaje');

        if (ganaste) {
            emoji.textContent   = '🏆';
            titulo.textContent  = '¡Salvaste al muñeco!';
            sub.textContent     = 'El Tigre no pudo contigo 🐯';
        } else {
            emoji.textContent   = '🔥';
            titulo.textContent  = '¡El muñeco se quemó!';
            sub.textContent     = '¡Te mordió el Tigre Cepeda! 😂';
        }
        puntaje.textContent = 'Respuestas correctas: ' + aciertos;
        overlay.style.display = 'flex';
    }

    // Inicia el juego del muñeco
    function iniciar() {
        errores = 0;
        aciertos = 0;
        document.getElementById('m-aciertos').textContent = '0';
        actualizarMuneco();
        nuevaPregunta();
        iniciarTimer();
        document.getElementById('muneco-gameover').style.display = 'none';
    }

    // Expone funciones públicas
    return {
        iniciar: iniciar,
        evaluar: evaluarMuneco,
        terminar: terminarJuegoMuneco
    };
})();
