(function(window) {
  'use strict';
  function Game(id, loader) {
    this.stage  = new createjs.Stage(document.getElementById(id));
    this.loader = loader;

    this.init();
  }

  Game.prototype = {
    init: function() {
      createjs.Ticker.setFPS(30);
      createjs.Ticker.addEventListener('tick', this.tick.bind(this));

      this.gameover = false;
      this.score    = 0;
      this.bullets  = new createjs.Container();
      this.enemies  = new createjs.Container();
      this.draw();
      this.gameStart();
      return this;
    },

    draw: function() {
      // Add background
      this.stage.addChild(new createjs.Bitmap(this.loader.getResult('stage')));
      this.bounds = this.stage.getBounds();
      this.initScoreBoard();
    },

    initScoreBoard: function() {
      this.scoreBoard       = new createjs.Text("Zombies killed: " + this.score, "20px Arial", "#ff7700");
      this.scoreBoard.regX  = this.scoreBoard.getBounds().width;
      this.scoreBoard.regY  = this.scoreBoard.getBounds().height;
      this.scoreBoard.x     = this.bounds.width - 50;
      this.scoreBoard.y     = this.bounds.height - 50;

      this.setScore = function(score) {
        this.score = score;
        this.scoreBoard.text = "Zombies killed: " + score;
      }

      this.stage.addChild(this.scoreBoard);
    },

    addUnits: function() {
      this.stage.addChild(this.bullets);
      this.stage.addChild(this.enemies);
      this.createHero();
    },

    createHero: function() {
      this.hero     = this.hero || new Hero(this);
      this.hero.x   = 100;
      this.hero.y   = 500;
      this.stage.addChild(this.hero);
    },

    removeUnits: function() {
      this.bullets.removeAllChildren();
      this.enemies.removeAllChildren();
      this.stage.removeChild(this.bullets);
      this.stage.removeChild(this.enemies);
      this.stage.removeChild(this.hero);
      this.hero = null;
    },

    tick: function(ev) {
      this.stage.update();
      if (!this.gameover) {
        this.detectCollisions();
      }
    },

    detectCollisions: function() {
      for(var j = 0; j < this.enemies.children.length; j++) {
        var enemy = this.enemies.children[j],
        playerZombieColide = ndgmr.checkRectCollision(this.hero, enemy);

        if (playerZombieColide != null) {
          enemy.attack(this.hero);
          this.hero.die();
          this.gameEnd();
          break;
        }

        for(var k = 0; k < this.bullets.children.length; k++) {
          var bullet = this.bullets.children[k],
          intersection = ndgmr.checkRectCollision(bullet,enemy);

          if (intersection != null) {
            bullet.remove();
            enemy.die();
            this.setScore(++this.score);
          }
        }
      }
    },

    gameStart: function() {
      this.gameover = false;
      this.addUnits();
      this.setScore(0);
      this.invasion = setInterval(this.invade.bind(this), 1000);
    },

    gameEnd: function() {
      this.gameover = true;
      this.removeUnits();
      createjs.Sound.play('gameover');
      clearInterval(this.invasion);
      this.displayEndGameScreen();
    },

    displayEndGameScreen: function() {
      var endGameContainer    = new createjs.Container(),
          endGameButton       = new createjs.Container(),
          endGameButtonBg     = new createjs.Shape(),
          endGameButtonText   = new createjs.Text('Restart', '26px Arial', '#fff'),
          endGameText         = new createjs.Text("The zombies ate you. Click the button to start over.", "26px Arial", "#ff7700"),
          buttonWidth = endGameButtonText.getBounds().width,
          buttonHeight = endGameButtonText.getBounds().height;

      endGameText.regX = endGameText.getBounds().width / 2;
      endGameText.regY = endGameText.getBounds().height / 2;
      endGameText.x = this.bounds.width/2;
      endGameText.y = 300;
      endGameButtonBg.graphics.beginFill("#ff0000").drawRect(this.bounds.width/2, this.bounds.height/2, buttonWidth + 20, buttonHeight + 20);
      endGameButtonBg.regX = buttonWidth / 2;
      endGameButtonBg.regY = buttonHeight / 2;
      endGameButtonText.regX = buttonWidth / 2;
      endGameButtonText.regY = buttonHeight / 2;
      endGameButtonText.x = this.bounds.width/2 + 10;
      endGameButtonText.y = this.bounds.height/2 + 10;
      endGameButton.addChild(endGameButtonBg, endGameButtonText).setBounds(0, 0, buttonWidth, buttonHeight);

      endGameContainer.addChild(endGameText, endGameButton);
      endGameContainer.setBounds(0, 0, this.bounds.width, this.bounds.height)
      endGameContainer.regX = this.bounds.width/2;
      endGameContainer.regY = this.bounds.height/2;

      endGameButton.on('click', function() {
        this.stage.removeChild(endGameContainer);
        this.gameStart();
      }.bind(this));

      this.stage.addChild(endGameContainer);

      endGameContainer.x = this.bounds.width/2;
      endGameContainer.y = this.bounds.height/2;
    },

    invade: function() {
      this.enemies.addChild(new Zombie(this));
    }
  };

  window.Game = Game;
})(window);

