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
