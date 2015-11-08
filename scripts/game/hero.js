(function(window) {
  function Hero(game) {
    this.Container_constructor();
    this.game = game;
    this.SPEED_MULTIPLIER = 3;

    this.init();
  }

  var p = createjs.extend(Hero, createjs.Container);

  p.init = function() {
    var spriteData = {
      images: [this.game.loader.getResult('hero')],
      frames:[[2, 2, 56, 57, 0, -15, -13],
      [2, 61, 53, 57, 0, -14, -14],
      [57, 61, 54, 55, 0, -9, -29],
      [60, 2, 72, 41, 0, -13, -31],
      [113, 45, 67, 44, 0, -13, -30],
      [134, 2, 68, 41, 0, -8, -9],
      [182, 45, 46, 62, 0, -15, -8],
      [204, 2, 68, 41, 0, -8, -9],
      [230, 45, 68, 41, 0, -8, -9],
      [274, 2, 68, 41, 0, -8, -9],
      [300, 45, 58, 48, 0, -9, -29],
      [344, 2, 67, 41, 0, -9, -9],
      [360, 45, 54, 51, 0, -6, -29],
      [413, 2, 67, 41, 0, -9, -9],
      [416, 45, 54, 51, 0, -3, -29],
      [472, 45, 66, 41, 0, -9, -9],
      [482, 2, 66, 41, 0, -9, -9],
      [540, 45, 67, 40, 0, -9, -9],
      [540, 87, 68, 39, 0, -13, -30],
      [550, 2, 67, 40, 0, -9, -9],
      [609, 44, 67, 40, 0, -9, -9],
      [619, 2, 66, 40, 0, -9, -9],
      [610, 86, 66, 40, 0, -9, -9],
      [678, 44, 41, 65, 0, -16, -4],
      [687, 2, 65, 40, 0, -8, -8],
      [721, 44, 65, 41, 0, -13, -30],
      [754, 2, 65, 40, 0, -8, -8],
      [754, 2, 65, 40, 0, -8, -8],
      [721, 87, 66, 39, 0, -8, -9],
      [788, 44, 65, 40, 0, -13, -29],
      [821, 2, 65, 40, 0, -7, -8],
      [789, 86, 65, 40, 0, -7, -8],
      [789, 86, 65, 40, 0, -7, -8],
      [855, 44, 65, 40, 0, -8, -8],
      [855, 44, 65, 40, 0, -8, -8],
      [888, 2, 65, 40, 0, -8, -8],
      [888, 2, 65, 40, 0, -8, -8],
      [856, 86, 65, 40, 0, -8, -8],
      [856, 86, 65, 40, 0, -8, -8],
      [922, 44, 65, 40, 0, -10, -9],
      [955, 2, 65, 40, 0, -10, -9],
      [923, 86, 65, 40, 0, -10, -9],
      [989, 44, 66, 39, 0, -8, -9],
      [989, 44, 66, 39, 0, -8, -9],
      [1022, 2, 66, 39, 0, -8, -9],
      [1022, 2, 66, 39, 0, -8, -9],
      [990, 85, 66, 39, 0, -8, -9],
      [1057, 43, 66, 39, 0, -8, -9],
      [1057, 43, 66, 39, 0, -8, -9],
      [1090, 2, 66, 39, 0, -8, -9],
      [1090, 2, 66, 39, 0, -8, -9],
      [1058, 84, 66, 39, 0, -10, -9],
      [1125, 43, 66, 39, 0, -10, -9],
      [1158, 2, 66, 39, 0, -10, -9],
      [1126, 84, 66, 39, 0, -10, -9],
      [1193, 43, 66, 39, 0, -8, -9],
      [1226, 2, 65, 39, 0, -8, -9],
      [1226, 2, 65, 39, 0, -8, -9],
      [1194, 84, 61, 42, 0, -12, -29],
      [1257, 84, 64, 40, 0, -8, -8],
      [1257, 84, 64, 40, 0, -8, -8],
      [1261, 43, 65, 39, 0, -8, -9],
      [1261, 43, 65, 39, 0, -8, -9],
      [1323, 84, 64, 40, 0, -8, -8],
      [1323, 84, 64, 40, 0, -8, -8],
      [1293, 2, 65, 39, 0, -8, -9],
      [1293, 2, 65, 39, 0, -8, -9],
      [1328, 43, 65, 39, 0, -8, -9],
      [1328, 43, 65, 39, 0, -8, -9],
      [1389, 84, 65, 39, 0, -8, -9],
      [1389, 84, 65, 39, 0, -8, -9],
      [1360, 2, 65, 39, 0, -8, -9],
      [1360, 2, 65, 39, 0, -8, -9],
      [1395, 43, 65, 39, 0, -14, -29],
      [1456, 84, 65, 39, 0, -8, -9],
      [1456, 84, 65, 39, 0, -8, -9],
      [1427, 2, 64, 39, 0, -8, -9],
      [1462, 43, 64, 39, 0, -8, -9]
      ],
      animations: {
        idle: {
          frames: [28, 42, 45, 72, 70, 68, 66, 62, 57, 27, 24, 26, 56, 61, 65, 67, 69, 71, 44, 43],
        },
        move:  {
          frames: [46, 47, 50, 75, 38, 36, 34, 64, 60, 32, 30, 31, 59, 63, 33, 35, 37, 74, 49, 48],
        },
        attack: {
          frames: [55, 76, 77],
          next: 'player_idle'
        }
      },
    }
    var spriteSheet = new createjs.SpriteSheet(spriteData);

    this.hero =  this.addChild(new createjs.Sprite(spriteSheet));
    this.hero.gotoAndPlay('idle');

    this.regX = this.getBounds().width;
    this.regY = this.getBounds().height + 3;

    this.bindEvents();
  },

  p.move = function(coords) {
    this.hero.gotoAndPlay('move');
    speed = utils.getDistance(this.x, this.y, coords.x, coords.y);

    createjs.Tween.get(this, {override: true}).to(coords, speed * this.SPEED_MULTIPLIER).call(function() {
      this.hero.gotoAndPlay('idle');
    }.bind(this))
  },

  p.rotate = function(evt) {
    var angle = utils.getAngle(evt.stageY, this.y, evt.stageX, this.x);
    if(angle != 0) {
      this.rotation = angle;
    }
  },

  p.attack = function(ev) {
    createjs.Sound.play('gunshot');
    this.hero.gotoAndPlay('attack');
    this.game.bullets.addChild(new Bullet(this));
  },

  p.die = function() {
    this.stage.removeChild(this);
    this.unbindEvents();
  },

  p.bindEvents = function() {
    this.mouseMoveHandler = this.game.stage.on('stagemousemove', this.rotate.bind(this));
    this.mouseClickHandler = this.game.stage.on('click', this.handleClick.bind(this));
  },

  p.unbindEvents = function() {
    this.game.stage.off('stagemousemove', this.mouseMoveHandler);
    this.game.stage.off('click', this.mouseClickHandler);
  },

  p.handleClick = function(evt) {
    var target = {
      x: evt.stageX,
      y: evt.stageY
    }
    if(utils.rightClick()) {
      this.attack(target)
    } else {
      this.move(target)
    }
  }

  window.Hero = createjs.promote(Hero, "Container");
}(window));
