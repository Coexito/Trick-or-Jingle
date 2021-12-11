export class RestartButton {
    constructor(scene) {
      this.relatedScene = scene;
    }
  
    // other class methods
    preload() {
        this.relatedScene.load.spritesheet('button', '../Resources/TestAssets/star.png', { frameWidth: 190, frameHeight: 49 });
    }

    create() {
        this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();

        // Used for interaction when hovering
        // this.startButton.on('pointerover', () => {
        //     this.startButton.setFrame(1);
        //   });

        // this.startButton.on('pointerout', () => {
        //   this.startButton.setFrame(0);
        // });
        
        // Starts the game
        this.startButton.on('pointerdown', () => {
          this.relatedScene.scene.start('game');
        });
    }
    
  }