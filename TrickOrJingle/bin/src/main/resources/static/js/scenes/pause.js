export class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'pause' });

  }

  preload() {

    this.load.image('background_pause', '../../Resources/Art/UI/SC_Pause/SC_Pause_base.png');
    this.load.image('bt_pause_continue', '../../Resources/Art/UI/SC_Pause/BT_continue.png');
    this.load.image('bt_pause_controls', '../../Resources/Art/UI/SC_Pause/BT_controls.png');
    this.load.image('bt_pause_credits', '../../Resources/Art/UI/SC_Pause/BT_credits.png');
  }
  
  create() {
    this.add.image(640, 340, 'background_pause');

    // Continue to the game
    this.bt_continue = this.add.image(640, 175, 'bt_pause_continue');
    this.bt_continue.setInteractive().on('pointerdown', () => {

      this.scene.resume('game');
      this.scene.stop();
    });
    

    this.bt_controls = this.add.image(640, 275, 'bt_pause_controls');
    this.bt_controls.setInteractive().on('pointerdown', () => {
      window.scrollTo(0, 1000); // Scrolls down to the controls image on the page
    });

    this.bt_credits = this.add.image(640, 375, 'bt_pause_credits');
    this.bt_credits.setInteractive().on('pointerdown', () => {
      window.scrollTo(0, 1000); // Scrolls down to the credits image on the page

    });

  }
}