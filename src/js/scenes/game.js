import { Player } from '../Player.js';
import { Weapon } from '../Weapon.js';

var player1;
var player2;

var isPaused = false;

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init(data) {
    this.player1team = data.p1team;
    this.player2team = data.p2team;
    
  }

  preload() {
    this.load.image('sky', '../Resources/TestAssets/sky.png');
    this.load.image('ground', '../Resources/TestAssets/platform.png');
    this.load.image('star', '../Resources/TestAssets/star.png');
    this.load.image('bomb', '../Resources/TestAssets/bomb.png');
    this.load.image('explosion', '../Resources/TestAssets/explosion.png');
    this.load.image('gun', '../Resources/TestAssets/gun.png');
    this.load.image('shotgun', '../Resources/TestAssets/shotgun.png');
    this.load.image('pause_button', '../Resources/Art/UI/BT_pause.png');
    

    this.load.spritesheet('dude', 
        '../Resources/Art/Sprites/N_MariaKarei/SPS_MariaKarei_RUN.png',
        { frameWidth: 182, frameHeight: 249 }
    );
    this.load.spritesheet('bad', 
        '../Resources/Art/Sprites/H_EdwardCullon/spritesheet_edward.png',
        { frameWidth: 182, frameHeight: 249 }
    );
    this.load.spritesheet('heart', 'Resources/TestAssets/heart.png', { frameWidth: 200, frameHeight: 53 });

    this.load.spritesheet('weapons', 
        '../Resources/TestAssets/weapons.png',
        { frameWidth: 600, frameHeight: 600 }
    );
    this.load.image('bullet', '../Resources/TestAssets/bullet.png');
    this.load.image('sprite', '../Resources/TestAssets/sprite.png');

    // stage assets
        // main walls
    this.load.image('rightWall', '../Resources/Art/Scenery/rightWall.png');
    this.load.image('leftWall', '../Resources/Art/Scenery/leftWall.png');
    this.load.image('ground', '../Resources/Art/Scenery/ground.png');
    this.load.image('ceiling', '../Resources/Art/Scenery/ceiling.png');
    this.load.image('central', '../Resources/Art/Scenery/central.png')
    this.load.image('grass', '../Resources/Art/Scenery/grass.png');
        // backgrounds
    this.load.image('bck_mix', '../Resources/Art/Scenery/Backgrounds/bck_mix.png');
    this.load.image('bck_mix', '../Resources/Art/Scenery/Backgrounds/bck_mix.png');
    this.load.image('bck_mix', '../Resources/Art/Scenery/Backgrounds/bck_mix.png');
        // platforms image
    this.load.spritesheet('platforms_spritesheet', 
        '../Resources/Art/Scenery/Platforms/platforms_spritesheet.png',
        { frameWidth: 1280, frameHeight: 680 }
    );
        // basic platforms
    this.load.image('base_bigcandy_platform', '../Resources/Art/Scenery/Platforms/Base/base_bigcandy_platform.png');
    this.load.image('base_hw_platform', '../Resources/Art/Scenery/Platforms/Base/base_hw_platform.png');
    this.load.image('base_ribbon_platform', '../Resources/Art/Scenery/Platforms/Base/base_ribbon_platform.png');
    this.load.image('base_smallcandy_platform', '../Resources/Art/Scenery/Platforms/Base/base_smallcandy_platform.png');
    
  }

  create() {

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
        // background image
    this.add.image(0, 0, 'bck_mix').setOrigin(0,0); // by default elements are positioned based on their center. Change so it matches the origin of the screen
    
        // basic walls
    this.platforms.create(633, 11, 'ceiling');
    this.platforms.create(1262, 301, 'rightWall');
    this.platforms.create(15, 301, 'leftWall');
    this.platforms.create(650, 656, 'ground');
    this.platforms.create(640, 600, 'central');

    // platforms image
    this.add.image(0,0,'platforms_spritesheet').setOrigin(0,0);
    
    var grass = this.add.image(0,0, 'grass').setOrigin(0,0);
    grass.depth = 100;
    
    // Pause button
    this.pause_button = this.add.image(50, 50, 'pause_button');

    this.pause_button.setInteractive().on('pointerdown', () => {
        this.scene.launch('pause');
        this.scene.pause();
        isPaused = true;
    });

    // Creates a group for the players, bullets & weapons
    this.players = this.add.group();
    this.bullets = this.physics.add.group({inmovable: true, allowGravity:false});
    this.bombs = this.physics.add.group();
    this.explosions = this.physics.add.group({inmovable: true, allowGravity:false});
    this.weapons = this.physics.add.group({inmovable:true, allowGravity:false});

    // Player 1 animations
    this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 8 }),
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: 'turn1',
        frames: [ { key: 'dude', frame: 10 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 19 }), //fixed animation
        frameRate: 15,
        repeat: -1
    });

    
    // Player 2 animations
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('bad', { start: 0, end: 10  }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'bad', frame: 11} ],
        frameRate: 20 
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('bad', { start: 12, end: 22 }),
        frameRate: 20,
        repeat: -1
    });
    

    // Initializes the players
    player1 = this.physics.add.existing(new Player(this, 350, 3, 200, 100, "dude", 1)) //scene, speed, lives, x, y, sprite, index
    player1.body.allowGravity = true;
    player2 = this.physics.add.existing(new Player(this, 300, 3, 500, 100, "bad", 2))
    player2.body.allowGravity = true;    

    player1.setScale(0.4); // Increases the scale cause they're tiny uwu
    player2.setScale(0.4);

    // Initialize first weapons
    var weapon1 = this.physics.add.existing(new Weapon(this, 1)); // scene, idx
    var weapon2 = this.physics.add.existing(new Weapon(this, 2)); // scene, idx

    var updateWeaponSeconds = 5;

    setTimeout(function updateWeapon() { // updates the weapons every x seconds
            
        if(isPaused == false)
        {
            weapon1.updateWeapon();
            weapon2.updateWeapon();
        }
        
        setTimeout(updateWeapon, updateWeaponSeconds * 1000); // i don't know if this is the best way to make a loop
    }, updateWeaponSeconds * 1000);


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
    var countdownTime = 300; // 300 seconds are 5 minutes
    var text = this.add.text(320, 50, formatTime(countdownTime)).setScale(3); // create text

        //function to update the text every second
    setTimeout(function updateText() {

        if(isPaused == false)
        {
            countdownTime--;
            text.setText(formatTime(countdownTime));
        }
            setTimeout(updateText, 1000); // loop every second
    }, 1000);

    // after the 5 minutes call outOfTime function
    var secondsToEnd = 300;
    this.time.delayedCall(secondsToEnd * 1000, outOfTime, null, this);  // delay in ms

  }

  update() {
    player1.update();
    player2.update();
  }

  unpause()
  {
      isPaused = false;
  }


}

function outOfTime() // i was playing with this for the 5 minute timeout
{
    console.log("Time over buddy");
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
    weaponBody.x = 1000;
    weaponBody.y = 1000
    player.pickWeapon(weaponBody.texture.key);
}

function formatTime(totalSeconds){
    var minutes = Math.floor(totalSeconds/60); // divide total seconds by 60 to get minutes
    var seconds = totalSeconds%60; // get remainder of seconds divided by 60 to get seconds
    seconds = seconds.toString().padStart(2,'0'); // add left zeros to seconds

    return `${minutes}:${seconds}`;     // return formated time
}