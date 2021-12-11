import { RestartButton } from "../../components/restart-button.js";

export class Gameover extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('gameover', '../../Resources/TestAssets/game_over.png');
    this.load.image('background', '../../Resources/TestAssets/bg.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'background');
    this.restartButton.create();
    this.gameoverImage = this.add.image(400, 90, 'gameover');
  }
}