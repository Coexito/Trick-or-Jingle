import { Game } from './src/scenes/game.js';
import { MainMenu } from './src/scenes/mainmenu.js';
import { Gameover } from './src/scenes/gameover.js';

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 680,
  scene: [MainMenu, Game, Gameover],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300},
      debug: false
    }
  }
}

var game = new Phaser.Game(config);