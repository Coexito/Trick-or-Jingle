import { Player } from '../Player.js';
import { Weapon } from '../Weapon.js';

var player1;
var player2;

var weapon1;
var weapon2;

var text;
var countdownTime;
var timedEventText;
var timedEventWeapon;

var isPaused = false;

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init(data) {
    this.player1team = data.p1team;
    this.player2team = data.p2team;
    this.backgroundMusic = data.backgroundMusic;
    
  }

  preload() {
    // weapons assets
    this.load.image('bomb', './Resources/Art/Weapons/bomb.png');
    this.load.image('explosion', './Resources/Art/Weapons/explosion.png');
    this.load.image('gun', './Resources/Art/Weapons/gun.png');
    this.load.image('shotgun', './Resources/Art/Weapons/shotgun.png');
    this.load.spritesheet('weapons', 
        './Resources/Art/Weapons/weapons.png',
        { frameWidth: 600, frameHeight: 600 }
    );
    this.load.image('bullet', './Resources/Art/Weapons/bullet.png');
    this.load.image('bulletshotgun', './Resources/Art/Weapons/bulletshotgun.png');
    // pause button
    this.load.image('pause_button', './Resources/Art/UI/BT_pause.png');

    // players sprites
    this.load.spritesheet('maria', 
        './Resources/Art/Sprites/N_MariaKarei/SPS_MariaKarei_RUN.png',
        { frameWidth: 182, frameHeight: 249 }
    );
    this.load.spritesheet('edward', 
        './Resources/Art/Sprites/H_EdwardCullon/spritesheet_edward.png',
        { frameWidth: 182, frameHeight: 244 }
    );

    // lives
    this.load.spritesheet('heart', 'Resources/Art/UI/SP_heart.png', { frameWidth: 200, frameHeight: 53 });

    // stage assets
        // main walls
    this.load.image('rightWall', './Resources/Art/Scenery/Platforms/BasicWalls/rightWall.png');
    this.load.image('leftWall', './Resources/Art/Scenery/Platforms/BasicWalls/leftWall.png');
    this.load.image('ground', './Resources/Art/Scenery/Platforms/BasicWalls/ground.png');
    this.load.image('ceiling', './Resources/Art/Scenery/Platforms/BasicWalls/ceiling.png');
    this.load.image('central', './Resources/Art/Scenery/Platforms/BasicWalls/central.png')
    this.load.image('grass', './Resources/Art/Scenery/Platforms/BasicWalls/grass.png');
        // backgrounds & platforms spritesheet
    this.load.spritesheet('stage_spritesheet', 
        './Resources/Art/Scenery/stage_spritesheet.png',
        { frameWidth: 1280, frameHeight: 680 }
    );
        // basic platforms
    this.load.image('base_bigcandy_platform', './Resources/Art/Scenery/Platforms/Base/base_bigcandy_platform.png');
    this.load.image('base_hw_platform', './Resources/Art/Scenery/Platforms/Base/base_hw_platform.png');
    this.load.image('base_ribbon_platform', './Resources/Art/Scenery/Platforms/Base/base_ribbon_platform.png');
    this.load.image('base_smallcandy_platform', './Resources/Art/Scenery/Platforms/Base/base_smallcandy_platform.png');
    
    // preload sounds
    this.load.audio('Bomb_impact', 'Resources/Sounds/sounds/Bomb_impact.wav');
    this.load.audio('Fire_shotgun','Resources/Sounds/sounds/Fire_shotgun.wav');
    this.load.audio('Fire_gun','Resources/Sounds/sounds/Fire_gun.mp3');

  }

  create() {

    // add audio to scene
    this.bombSound = this.sound.add('Bomb_impact');
    this.shotgunSound = this.sound.add('Fire_shotgun');
    this.gunSound = this.sound.add('Fire_gun');

    // Handling phaser3 events
    this.events.on("resume", this.unpause);

    // create variable to store players sprites depending on what the first player choose on the previous menu
    var spriteP1;
    var spriteP2;

    if (this.player1team == 'halloween') // player 1 is edward cullon and player 2 maria karei
    {
        spriteP1 = 'edward';
        spriteP2 = 'maria';
    } else // player 2 is edward cullon and player 1 maria karei
    {
        spriteP1 = 'maria';
        spriteP2 = 'edward';
    }

    this.events.on('resume', this.unpause);

    // objects in order from farther to nearest on screen
    this.add.image(0, 0, 'sky').setOrigin(0,0); // by default elements are positioned based on their center. Change so it matches the origin of the screen
    
    // create platforms
    this.platforms = this.physics.add.staticGroup();
        // basic platforms (they are not to be shown on screen, that's why they are under the background image)
    this.platforms.create(637, 400, 'base_hw_platform');
    this.platforms.create(1040, 540, 'base_hw_platform');
    this.platforms.create(236, 540, 'base_hw_platform');
    this.platforms.create(649, 191, 'base_bigcandy_platform');
    this.platforms.create(910, 375, 'base_ribbon_platform');
    this.platforms.create(369, 375, 'base_ribbon_platform');
    this.platforms.create(967, 166, 'base_smallcandy_platform');
    this.platforms.create(312, 166, 'base_smallcandy_platform');
    this.platforms.create(10, 307, 'base_bigcandy_platform');
    this.platforms.create(1260, 307, 'base_bigcandy_platform');
        // stage spritesheet
    this.stage = this.add.image(0,0,'stage_spritesheet').setOrigin(0,0);
    this.stage.setFrame(1);
        // basic walls
    this.platforms.create(633, 11, 'ceiling');
    this.platforms.create(1262, 301, 'rightWall');
    this.platforms.create(15, 301, 'leftWall');
    this.platforms.create(650, 656, 'ground');
    this.platforms.create(640, 600, 'central');
        // grass image
    var grass = this.add.image(0,0, 'grass').setOrigin(0,0);
    grass.depth = 100;
    
    // Pause button
    this.pause_button = this.add.image(50, 50, 'pause_button');

    this.pause_button.setInteractive().on("pointerdown", () => {
      this.scene.launch("pause", { backgroundMusic: this.backgroundMusic });
      this.scene.pause();
      isPaused = true;
    });

    // Creates a group for the players, bullets & weapons
    this.players = this.add.group();
    this.bullets = this.physics.add.group({inmovable: true, allowGravity:false});
    this.bombs = this.physics.add.group();
    this.explosions = this.physics.add.group({inmovable: true, allowGravity:false});
    this.weapons = this.physics.add.group({inmovable:true, allowGravity:false});

    // Edward animations
    this.anims.create({
        key: 'edwardLeft',
        frames: this.anims.generateFrameNumbers('edward', { start: 0, end: 10 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'edwardTurn',
        frames: [ { key: 'edward', frame: 11 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'edwardRight',
        frames: this.anims.generateFrameNumbers('edward', { start: 12, end: 22 }), //fixed animation
        frameRate: 15,
        repeat: -1
    });

    
    // Maria animations
    this.anims.create({
        key: 'mariaLeft',
        frames: this.anims.generateFrameNumbers('maria', { start: 0, end: 8  }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'mariaTurn',
        frames: [ { key: 'maria', frame: 10} ],
        frameRate: 20 
    });

    this.anims.create({
        key: 'mariaRight',
        frames: this.anims.generateFrameNumbers('maria', { start: 11, end: 19 }),
        frameRate: 15,
        repeat: -1
    });
    

    // Initializes the players
    player1 = this.physics.add.existing(new Player(this, 350, 3, 200, 100, spriteP1, 1)) //scene, speed, lives, x, y, sprite, index
    player2 = this.physics.add.existing(new Player(this, 300, 3, 500, 100, spriteP2, 2))   
       
    

    player1.setScale(0.4); // Increases the scale cause they're tiny uwu
    player2.setScale(0.4);

    // Initialize first weapons
    weapon1 = this.physics.add.existing(new Weapon(this, 1)); // scene, idx
    weapon2 = this.physics.add.existing(new Weapon(this, 2)); // scene, idx

    var updateWeaponSeconds = 20;
    timedEventWeapon = this.time.addEvent( { delay: updateWeaponSeconds * 1000, callback: updateWeapon, callbackScope: this, loop: true} );


    // Adds colliders
        // Characters
    this.physics.add.collider(this.players, this.players); // collider between characters
    this.physics.add.collider(this.players, this.platforms); // collider between character 1 and platforms
    
        // Bullets
    this.physics.add.collider(this.players, this.bullets, bulletOnPlayer, null, this); // collider between player and bullets
    this.physics.add.collider(this.platforms, this.bullets, bulletOnWall, null, this); // collider between bullets and platforms

        // Bombs
    this.physics.add.collider(this.players, this.bombs, bombCollision, null, this); // collider between bullets and platforms
    this.physics.add.collider(this.platforms, this.bombs, bombCollision, null, this); // collider between bullets and platforms
    this.physics.add.overlap(this.players, this.explosions, explosionCollision, null, this); // collider between bullets and platforms
    
        // Weapons
    this.physics.add.collider(this.players, this.weapons, pickUpWeapon, null, this); // collider between player and weapons


    // Player 1 inputs
        // Mooving
    this.w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.a_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Shooting
    this.space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.q_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    this.e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


    // Player 2 inputs
        // Mooving
    this.cursors = this.input.keyboard.createCursorKeys();

        //Shooting
    this.numpad_0_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
    this.numpad_7_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN);
    this.numpad_9_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);

     // Countdown text
     countdownTime = 300; // 300 seconds are 5 minutes
     text = this.add.text(600, 50, formatTime(countdownTime)).setScale(3); // create text
 
     //function to update the text every second
     timedEventText = this.time.addEvent( { delay: 1000, callback: updateText, callbackScope: this, loop: true});

    // after the 5 minutes call outOfTime function
    var secondsToEnd = 300;
    this.time.delayedCall(secondsToEnd * 1000, outOfTime, null, this);  // delay in ms

  }

  update() {
    player1.update();
    player2.update();

    this.checkWinners();
  }

  changeStage()
  {
        if (player1.getLives() == player2.getLives()) // if the players have the same lives
            this.stage.setFrame(1); // mixed stage
        else if (player1.getLives() > player2.getLives()) // if player1 has more lives
        {
            if (this.player1team == 'halloween'){ // if player1 is on the halloween team
                this.stage.setFrame(0); // halloween stage
            }
            else
                this.stage.setFrame(2); // christams stage
        } else if (player1.getLives() < player2.getLives()) // if player2 has more lives
        {
            if (this.player2team == 'halloween') // if player2 is on the halloween team
                this.stage.setFrame(0); // halloween stage
            else
                this.stage.setFrame(2); // christams stage
        }
  }

  unpause()
  {
      isPaused = false;
  }

  checkWinners() {
    if (player1.getLives() == 0) {
        this.scene.stop();
        this.scene.start("gameover", { winnerteam: this.player2team });
      
    }
    if (player2.getLives() == 0) {
        this.scene.stop();
        this.scene.start("gameover", { winnerteam: this.player1team });
    }
  }

}


function updateText() {
    if (isPaused == false) {
      countdownTime--;
      text.setText(formatTime(countdownTime));
    }
}

function updateWeapon() {
    // updates the weapons every x seconds

    if (isPaused == false) {
      weapon1.updateWeapon();
      weapon2.updateWeapon();
    }
}

function outOfTime() {    
    // Checks who's with most lives
    if (player1.getLives() < player2.getLives()) {
        this.scene.stop();
        this.scene.start("gameover", { winnerteam: this.player2team });  
    }
    else if(player2.getLives() < player1.getLives())
    {
        this.scene.stop();
        this.scene.start("gameover", { winnerteam: this.player1team });
    }
    else // if draw, player 1 wins because i want to 
    {
        this.scene.stop();
        this.scene.start("gameover", { winnerteam: "draw" });
    }
    
}

// -- Bullet collisions --
function bulletOnWall(platforms, bullet)
{
    // this will need an explosion sprite to show how the bullet collided with the platform
    bullet.disableBody(true, true); // destroy bullet when it hits a platform
}

function bulletOnPlayer(player, bullet)
{
    bullet.disableBody(true, true); // destroy bullet when it hits a player

    if(player.canBeDamaged) // If the player can be damaged...
    {
        if(player.takeDamage()) // If the player takes the damage and doesn't die...
        {
            player.alpha = 0.5;

            setTimeout(function () {
                player.makeVulnerable();
                player.alpha = 1;
            }, 5000);
        }
    }
}

// -- Bomb collisions --
function bombCollision(first, bomb)
{
    // play bomb impact sound
    this.bombSound.play();

    // create an explosion object so it can collide with the player
    var explosion = this.explosions.create(bomb.x, bomb.y, 'explosion').setScale(1.3);
    explosion.setVelocity(0, 0);

    bomb.disableBody(true, true); // delete the bomb body

    // fade effect for the explosion
    this.tweens.add({
        targets: [explosion],
        ease: 'Sine.easeInOut',
        duration: 500, // time doing the fading effect
        delay: 0, // time since it is called till it does the effect
        alpha: {
          getStart: () => 1,
          getEnd: () => 0
        },
        onComplete: () => {
            explosion.disableBody(true, true); 
        }
    });

}

function explosionCollision(player, bomb)
{
    if(player.canBeDamaged) // If the player can be damaged...
    {
        if(player.takeDamage()) // If the player takes the damage and doesn't die...
        {
            player.alpha = 0.5;

            setTimeout(function () {
                player.makeVulnerable();
                player.alpha = 1;
            }, 5000);
        }
    }
}

function pickUpWeapon(player, weaponBody)
{
    // move out of the canvas so the player can't interact with it anymore but
    // the object still exits for the next call
    weaponBody.x = 3000;
    weaponBody.y = 3000;
    weaponBody.setVelocity(0, 0);
    player.pickWeapon(weaponBody.texture.key);
}

function formatTime(totalSeconds){
    var minutes = Math.floor(totalSeconds/60); // divide total seconds by 60 to get minutes
    var seconds = totalSeconds%60; // get remainder of seconds divided by 60 to get seconds
    seconds = seconds.toString().padStart(2,'0'); // add left zeros to seconds

    return `${minutes}:${seconds}`;     // return formated time
}