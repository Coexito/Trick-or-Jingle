export class RestartButton {
    constructor(scene, x, y) {
      this.relatedScene = scene;
      this.x = x;
      this.y = y;
    }
  
    // other class methods
    preload() {
        this.relatedScene.load.image('button', '../../Resources/Art/UI/SC_Choose/BT_select_small.png');
    }

    create() {

        this.startButton = this.relatedScene.add.sprite(this.x, this.y, 'button').setInteractive();

        // Used for interaction when hovering
        // this.startButton.on('pointerover', () => {
        //     this.startButton.setFrame(1);
        //   });

        // this.startButton.on('pointerout', () => {
        //   this.startButton.setFrame(0);
        // });
        
        // Starts the game
        this.startButton.on('pointerdown', () => {
          this.relatedScene.scene.start('mainmenu');
        });
    }
    
  }