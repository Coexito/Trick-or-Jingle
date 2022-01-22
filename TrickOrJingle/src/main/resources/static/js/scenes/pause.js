export class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'pause' });

  }

  init(data)
  {
    this.backgroundMusic = data.backgroundMusic;
  }

  preload() {

    this.load.image('background_pause', '../../Resources/Art/UI/SC_Pause/SC_Pause_base.png');
    this.load.image('bt_pause_continue', '../../Resources/Art/UI/SC_Pause/BT_continue.png');
    this.load.image('bt_pause_controls', '../../Resources/Art/UI/SC_Pause/BT_controls.png');
    this.load.image('bt_pause_credits', '../../Resources/Art/UI/SC_Pause/BT_credits.png');
    this.load.image('bt_pause_restart', '../../Resources/Art/UI/SC_Pause/BT_restart.png');

    this.load.image('bt_pause_vol_down', '../../Resources/Art/UI/SC_Pause/BT_Minus.png');
    this.load.image('bt_pause_base_vol', '../../Resources/Art/UI/SC_Pause/base_volume.png');
    this.load.image('bt_pause_vol_up', '../../Resources/Art/UI/SC_Pause/BT_Plus.png');
  }
  
  create() {
    this.add.image(640, 340, 'background_pause');

    // Continue to the game
    this.bt_continue = this.add.image(640, 160, 'bt_pause_continue');
    this.bt_continue.setInteractive().on('pointerdown', () => {

      this.scene.resume('game');
      this.scene.stop();
    });
    
    this.bt_controls = this.add.image(640, 240, 'bt_pause_controls');
    this.bt_controls.setInteractive().on('pointerdown', () => {
      window.scrollTo(0, 1200); // Scrolls down to the controls image on the page
    });

    this.bt_credits = this.add.image(640, 320, 'bt_pause_credits');
    this.bt_credits.setInteractive().on('pointerdown', () => {
      window.scrollTo(0, 1200); // Scrolls down to the credits image on the page

    });

    this.bt_credits = this.add.image(640, 400, 'bt_pause_restart');
    this.bt_credits.setInteractive().on('pointerdown', () => {
      window.location.reload()
      
    });

    // Volume buttons
    this.vol_icon = this.add.image(1100, 575, 'bt_pause_base_vol');

    this.vol_down_button = this.add.image(1000, 575, 'bt_pause_vol_down');
    this.vol_down_button.setInteractive().on("pointerdown", () => {
      this.backgroundMusic.volume -= 0.05;

    });

    this.vol_up_button = this.add.image(1200, 575, 'bt_pause_vol_up');
    this.vol_up_button.setInteractive().on("pointerdown", () => {
      this.backgroundMusic.volume += 0.05;
    });

  }
}