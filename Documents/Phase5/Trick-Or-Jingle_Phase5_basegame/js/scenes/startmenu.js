export class StartMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'startmenu' });

  }


  preload() {
    this.load.image('background_startmenu', './Resources/Art/UI/SC_start.png');

    // music
    this.load.audio('Halloween_lofi','./Resources/Sounds/Music/halloween_lofi.wav');

  }
  
  create() {
    // music
    var backgroundMusic = this.sound.add('Halloween_lofi');
    backgroundMusic.loop = true;

    backgroundMusic.play();
    backgroundMusic.volume = 0.1; // Sets the volume to a minimun so it doesn't bother the player

    this.bg_start = this.add.image(640, 340, 'background_startmenu');

    this.bg_start.setInteractive().on('pointerdown', () => {
      this.scene.stop();
      this.scene.start("mainmenu", { backgroundMusic: backgroundMusic });
    });
    
  }
}