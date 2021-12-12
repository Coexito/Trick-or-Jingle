export class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'startmenu' });

  }


  preload() {
    this.load.image('background_startmenu', '../../Resources/Art/UI/SC_start.png');

  }
  
  create() {
    this.bg_start = this.add.image(640, 340, 'background_startmenu');

    this.bg_start.setInteractive().on('pointerdown', () => {
      this.scene.stop();
      this.scene.start("mainmenu");
    });
    
  }
}