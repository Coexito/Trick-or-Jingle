import { Game } from './scenes/game.js';
import { MainMenu } from './scenes/mainmenu.js';
import { Gameover } from './scenes/gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 680,
  scene: [MainMenu, Game, Gameover],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 700},
      debug: false
    }
  }
}

var game = new Phaser.Game(config);