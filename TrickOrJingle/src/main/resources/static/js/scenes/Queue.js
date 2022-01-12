//QUEUE SCREEN
export class Queue extends Phaser.Scene{
	constructor(){
		super({key: 'Queue'});
	}

	preload(){
		//background
		this.load.image('background_queue', '../../Resources/Art/UI/SC_Queue/BG_Queue.png');
	}

	create(){
		
	    //background
	    this.bg_queue = this.add.image(640, 340, 'background_queue');
		
		let text = this.add.text(475,500, 'OtherPlayerName').setScale(2);
	    /*this.bg_start.setInteractive().on('pointerdown', () => {
	      this.scene.stop();
	      this.scene.start("MainMenu");*/
    //});
	}
}
