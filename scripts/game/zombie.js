(function(window) {
  function Zombie(game) {
    this.Container_constructor();
    this.game = game;
    this.SPEED_MULTIPLIER = 13;

    this.init();
  }

  var p = createjs.extend(Zombie, createjs.Container);
  p.init = function() {
    // We get the location of the hero to asure that we will not spawn
    // the zombie directly on top of it. Some reasonable offset is set.
    var heroBounds  = this.game.hero.getBounds(),
    xOffsetMin      = heroBounds.x - 2 * heroBounds.width,
    xOffsetMax      = heroBounds.x + 2 * heroBounds.width,
    yOffsetMin      = heroBounds.y + 2 * heroBounds.height,
    yOffsetMax      = heroBounds.y + 2 * heroBounds.height,
    spawnLocation   = utils.getRandomSpawn(this.game.bounds.width, this.game.bounds.height, xOffsetMin, xOffsetMax, yOffsetMin, yOffsetMax),
    spriteData            = {
      images: [this.game.loader.getResult('zombie')],
      frames:[[2, 2, 45, 59, 0, -13, -8],
      [49, 2, 43, 59, 0, -14, -7],
      [94, 2, 40, 59, 0, -12, -7],
      [136, 2, 47, 53, 0, -10, -18],
      [185, 2, 50, 52, 0, -12, -10],
      [237, 2, 48, 52, 0, -12, -8],
      [287, 2, 48, 52, 0, -12, -12],
      [337, 2, 47, 52, 0, -12, -9],
      [386, 2, 47, 52, 0, -11, -11],
      [435, 2, 46, 52, 0, -11, -13],
      [483, 2, 46, 52, 0, -11, -17],
      [531, 2, 53, 51, 0, -10, -8],
      [586, 2, 52, 51, 0, -11, -9],
      [640, 2, 51, 51, 0, -11, -8],
      [693, 2, 50, 51, 0, -8, -19],
      [745, 2, 48, 51, 0, -10, -16],
      [795, 2, 46, 51, 0, -11, -15],
      [843, 2, 53, 50, 0, -6, -19],
      [843, 2, 53, 50, 0, -6, -19],
      [898, 2, 51, 50, 0, -8, -18],
      [951, 2, 49, 50, 0, -13, -14],
      [1002, 2, 49, 45, 0, -4, -6],
      [1053, 2, 50, 44, 0, -15, -17],
      [1105, 2, 50, 44, 0, -4, -8],
      [1157, 2, 50, 44, 0, -4, -8],
      [1209, 2, 50, 44, 0, -4, -7],
      [1261, 2, 50, 44, 0, -4, -6],
      [1313, 2, 50, 44, 0, -4, -6],
      [1365, 2, 49, 44, 0, -14, -17],
      [1365, 2, 49, 44, 0, -14, -17],
      [1416, 2, 49, 44, 0, -4, -8],
      [1467, 2, 49, 44, 0, -4, -6],
      [1518, 2, 49, 44, 0, -4, -6],
      [1569, 2, 49, 44, 0, -4, -7],
      [1620, 2, 49, 44, 0, -4, -8],
      [1671, 2, 49, 44, 0, -4, -8],
      [1722, 2, 49, 44, 0, -4, -8],
      [1773, 2, 48, 44, 0, -5, -8],
      [1773, 2, 48, 44, 0, -5, -8],
      [1823, 2, 50, 43, 0, -4, -8],
      [1875, 2, 50, 43, 0, -4, -7],
      [1927, 2, 51, 40, 0, -18, -18],
      [1980, 2, 51, 37, 0, -20, -18]
      ],
      animations: {
        move:  {
          frames: [17, 14, 3, 10, 16, 6, 4, 12, 11, 13, 5, 7, 8, 9, 15, 19, 18],
          speed: 0.5
        },
        attack: {
          frames: [28, 20, 0, 2, 1, 42, 41, 22, 29],
          next: 'move',
          speed: 0.5
        }
      },
    },
    spriteSheet     = new createjs.SpriteSheet(spriteData);

    // Spawn location is with some reasonable offset away from the hero.
    this.x = spawnLocation.x;
    this.y = spawnLocation.y;
    this.zombie = this.addChild(new createjs.Sprite(spriteSheet));
    this.regX = this.zombie.getBounds().width / 2;
    this.regY = this.zombie.getBounds().height / 2;
    this.soundInstance = createjs.Sound.play('zombieGrunts', 'none', 0.3, 0, 0, 0.2);

    this.updateDestination();

    this.on('removed', function() {
      this.die();
    });
  },

  p.move = function(coords, cb) {
    var cb = cb || $.noop,
    speed = utils.getDistance(this.x, this.y, coords.x, coords.y);

    this.zombie.gotoAndPlay('move');
    this.rotate(coords);

    createjs.Tween.get(this, {override: true}).to(coords, speed * this.SPEED_MULTIPLIER).call(cb)
  },

  p.rotate = function(target) {
    var angle = utils.getAngle(target.y, this.y, target.x, this.x);
    if (angle != 0) {
      this.rotation = angle;
    }
  },

  p.updateDestination = function() {
    var coords = utils.getRandomDestination(this.game.bounds.width, this.game.bounds.height);
    this.move(coords, this.updateDestination)
  },

  p.attack = function(target) {
    this.rotate(target);
    this.zombie.gotoAndPlay('attack');
    createjs.Sound.play('zombieAttack');
  },

  p.die = function() {
    this.game.enemies.removeChild(this);
    this.soundInstance.stop();
  }

  window.Zombie = createjs.promote(Zombie, "Container");
}(window));
