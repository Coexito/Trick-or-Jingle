export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'mainmenu' });

  }

  init() {
    this.p1team = "None";
    this.p2team = "None";
  }

  preload() {
    this.load.image('welcome', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('background', '../../Resources/Art/UI/SC_Choose/SC_choose_base.png');

    this.load.image('h_button_small', '../../Resources/Art/UI/SC_Choose/BT_halloween_small.png');
    this.load.image('c_button_small', '../../Resources/Art/UI/SC_Choose/BT_christmas_small.png');
    this.load.image('h_button_big', '../../Resources/Art/UI/SC_Choose/BT_halloween_big.png');
    this.load.image('c_button_big', '../../Resources/Art/UI/SC_Choose/BT_christmas_big.png');

    this.load.image('button', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    this.load.image('button_ready', '../../Resources/Art/UI/SC_Choose/BT_select_big.png');
    
  }
  
  create() {
    this.add.image(640, 340, 'background');

    this.h_button = this.add.image(460, 350, 'h_button_small');

    this.h_button.setInteractive().on('pointerdown', () => {
      this.h_button.setTexture("h_button_big");
      this.c_button.setTexture("c_button_small");

      this.p1team = "halloween";
      this.p2team = "christmas";  // THIS SHOULD ME CHANGED IN PHASE 3

      this.startButton.setTexture("button_ready");

    });

    this.c_button = this.add.image(830, 350, 'c_button_small');
    this.c_button.setInteractive().on('pointerdown', () => {
      this.c_button.setTexture("c_button_big");
      this.h_button.setTexture("h_button_small");

      this.p1team = "christmas";
      this.p2team = "halloween";  // THIS SHOULD ME CHANGED IN PHASE 3
      
      this.startButton.setTexture("button_ready");
    });

    this.startButton = this.add.sprite(650, 600, 'button');

    this.startButton.setInteractive().on('pointerdown', () => {
      if(this.p1team != "None" || this.p2team != "None")
      {
        this.scene.stop();
        this.scene.start('game', { p1team: this.p1team, p2team: this.p2team });
      }
    });
    
  }
}