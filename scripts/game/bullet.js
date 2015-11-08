(function(window) {
  function Bullet(shooter) {
    this.Container_constructor();
    this.SPEED_MULTIPLIER = 0.9;

    this.shooter  = shooter;
    this.rotation = shooter.rotation;
    this.target   = {
      x: shooter.stage.mouseX,
      y: shooter.stage.mouseY
    };

    this.setup();
  }

  var p = createjs.extend(Bullet, createjs.Container);

  p.setup = function() {
    var spriteData = {
      images:['assets/images/bullet.png'],
      frames: {
        x: 0,
        y: 0,
        width: 30,
        height: 20
      },
      animations: {
        idle: {
          frames: [0],
        }
      },
    };
    var spriteSheet = new createjs.SpriteSheet(spriteData);
    this.bullet = this.addChild(new createjs.Sprite(spriteSheet));
    this.regX = 0;
    this.regY =  15;
    this.x = this.shooter.x;
    this.y = this.shooter.y;

    this.bullet.gotoAndPlay('idle');
    this.move(this.target);
  },

  p.move = function(coords) {
    this.bullet.gotoAndPlay('idle');
    speed = utils.getDistance(this.x, this.y, coords.x, coords.y)

    createjs.Tween.get(this, {override: true}).to(coords, speed * this.SPEED_MULTIPLIER).call(function() {
      this.remove(this);
    }.bind(this));
  },

  p.remove = function(bullet) {
    this.shooter.game.bullets.removeChild(this);
  }

  window.Bullet = createjs.promote(Bullet, "Container");
}(window));
