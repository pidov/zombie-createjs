$(document).on('ready', function() {
  window.utils = Utils.getInstance();

  var manifest = [{
    id: 'hero',
    src: 'sprites/player.png'
  }, {
    id: 'zombie',
    src: 'sprites/zombie.png'
  }, {
    id: 'stage',
    src: 'images/background.png'
  }, {
    id: 'bullet',
    src: 'images/bullet.png'
  }, {
    id: 'gunshot',
    src: 'sounds/shot.wav'
  }, {
    id: 'gameover',
    src: 'sounds/sad.wav'
  }, {
    id: 'zombieAttack',
    src: 'sounds/zombie-attack.wav'
  }, {
    id: 'zombieGrunts',
    src: 'sounds/zombie-grunts.wav'
  }],

  loadQueue = new createjs.LoadQueue(true, 'assets/');
  loadQueue.installPlugin(createjs.Sound);
  loadQueue.loadManifest(manifest);

  loadQueue.addEventListener('progress', function(ev) {
    // Update loader
    $('.loader-progress').outerWidth((loadQueue.progress * 100) + '%').text((loadQueue.progress * 100) + '%');
  });

  loadQueue.addEventListener('complete', function(ev){
    // Hide the laoder and start the game
    $('.loader').fadeOut(500, function() {
      $('.loader').remove();
      // Initialize the game and pass loader instance
      new Game('game', ev.target);
    });
  });

  $('body').on('contextmenu', '#game', function(e){ return false; });
});
