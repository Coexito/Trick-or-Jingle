import { RestartButton } from "../../components/restart-button.js";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainmenu' });
    this.restartButton = new RestartButton(this);
  }

  preload() {
    this.load.image('welcome', '../../Resources/TestAssets/bullet.png');
    this.load.image('background', '../../Resources/TestAssets/bg.png');
    this.restartButton.preload();
  }
  
  create() {
    this.add.image(410, 250, 'background');
    this.restartButton.create();
    this.congratsImage = this.add.image(400, 90, 'welcome');
  }
}