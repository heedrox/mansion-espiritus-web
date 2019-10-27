var aClue = function(id, clue) {
  return { id: id, clue: clue };
};

var CLUES = [
  aClue(100, 'Mira con atención la anomalía del laboratorio, e interactúa con ella.'),
  aClue(200, 'Busca un código de 4 cifras. Quizás es ese código que está al revés. Y sí, son números, no letras.'),
  aClue(300, 'Escucha la conversación del ordenador y el resto del código lo localizarás leyendo algo en el otro lado.'),
  aClue(400, 'Intenta ver a qué te evocan los números y los colores rojo, verde y naranja... Una pista: ¿has jugado al master mind alguna vez?'),
  aClue(500, 'El color verde refleja el número de dígitos que están en posición correcta. En naranja son dígitos correctos, pero en posición incorrecta. Los rojos son dígitos no correctos.'),
  aClue(600, 'La combinación es 269. ¡Sigue jugando!'),
  aClue(700, 'Mira el color de la linterna, recuerda lo que dice el ordenador... ¿dónde hay más cosas de los colores a los que se hace mención?.'),
  aClue(800, 'La anomalía es verde, el láser rojo y la linterna azul. Intenta que todos esos colores converjan en un punto... El láser ya está apuntando a la anomalía. ¿A dónde puedes apuntar la linterna? Usa linterna con...'),
];

function findClue(id) {
  return CLUES.find(function(clue) { return clue.id === id; }).clue;
}

function adStatusCallback(clue) {
  // This can contain whatever code you like. The err parameter will return the
  // following values (please DO NOT block callback thread or ad will fail):
  //	'ad-blocker' = an ad blocker was detected
  //	'network-error' = network connection not available
  //  'cors-error' = cross-origin error (try clearing browser cache)
  //  'no-zoneId' = the required zoneId value is missing
  //  'ad-started' = an ad has been loaded and is starting
  //  'fb-started' = a fallback has been started by fallback mode
  //	'ad-watched' = an ad was presented and ran successfully
  //  'fb-watched' = a fallback ad was presented and ran successfully
  //	'ad-interrupted' = ad was ended prior to 5 seconds (abnormal end)
  //	'ads-unavailable' = no ads were returned to the player
  //  'sys-closing' = the process has completed and the player is closing.

  return function(status) {
    console.log('Applixir status: ' + status);

    if (status==='ad-blocker') {
      alert('Se detectó un bloqueador de Ads. No puedo presentar el vídeo, y no te puedo dar la pista :( ');
    }
    if (status === 'ad-watched' || status === 'fb-watched') {
      $('#video-clue').hide();
      alert(clue);
    }
    if (status === 'ads-unavailable') {
      $('#video-clue').hide();
      alert(clue);
    }
  }
}


function revealClue(id) {
  var clue = findClue(id);

  var options = {
    zoneId: 2362, // the zone ID from the "Games" page
    devId: 3228, // optional: your developer ID if using s2s callback
    gameId: 4425, // optional: the ID for this game from the "Games" page for s2s callback
    // custom1: nnnn, // optional: custom1 value for s2s callback
    // custom2: nnnn, // optional: custom2 value for s2s callback
    dMode: 0, // 0 for no MD5 checksum, 1 for MD5 checksum (recommended)
    fallback: 1, // 0 for no fallbacks, 1 will show fallback ads when ads-unavailable
    adStatusCb: adStatusCallback(clue), // optional: function to provide helpful user messages
  };

  $('#video-clue').show();
  $("html, body").animate({ scrollTop: 0 }, 'fast');

  invokeApplixirVideoUnit(options);
  return false;
}