
var config = {
    type: Phaser.AUTO, // Tries to use WebGL, but if the browser doesn't admit it changes to Canvas
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};

var game = new Phaser.Game(config);

var player1;
var player2;

function preload () // load assets
{
    this.load.image('sky', 'Resources/TestAssets/sky.png');
    this.load.image('ground', 'Resources/TestAssets/platform.png');
    this.load.image('star', 'Resources/TestAssets/star.png');
    this.load.image('bomb', 'Resources/TestAssets/bomb.png');
    this.load.image('explosion', 'Resources/TestAssets/explosion.png');
    this.load.image('gun', 'Resources/TestAssets/gun.png');
    this.load.image('shotgun', 'Resources/TestAssets/shotgun.png');
    this.load.spritesheet('dude', 
        '/Resources/Art/Sprites/N_MariaKarei/SPS_MariaKarei_RUN.png',
        { frameWidth: 364, frameHeight: 498 }
    );
    this.load.image('bullet', 'Resources/TestAssets/bullet.png');
    this.load.image('sprite', 'Resources/TestAssets/sprite.png');
}

function create ()
{
    // the timer is just a test for the 5 minute clock
    var secondsToEnd = 60;
    var timer = this.time.delayedCall(secondsToEnd * 1000, outOfTime, null, this);  // delay in ms
    
    // objects in order from farther to nearest on screen
    this.add.image(0, 0, 'sky').setOrigin(0,0); // by default elements are positioned based on their center. Change so it matches the origin of the screen
    
    // create platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400,568, 'ground').setScale(2).refreshBody();
    platforms.create(600,400, 'ground');


    // Creates a group for the players, bullets & weapons
    this.players = this.add.group();
    this.bullets = this.physics.add.group({inmovable: true, allowGravity:false});
    this.bombs = this.physics.add.group();
    this.explosions = this.physics.add.group({inmovable: true, allowGravity:false});
    this.weapons = this.physics.add.group({inmovable:true, allowGravity:false});

    // Player 1 animations

    this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'turn1',
        frames: [ { key: 'dude', frame: 10 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 20 }),
        frameRate: 20,
        repeat: -1
    });

    
    // Player 2 animations
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 9  }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'dude', frame: 10} ],
        frameRate: 20 
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('dude', { start: 11, end: 20 }),
        frameRate: 20,
        repeat: -1
    });
    

    // Initializes the players
    player1 = this.physics.add.existing(new Player(this, 160, 3, 200, 100, "dude", 1)) //scene, speed, lives, x, y, sprite, index
    player2 = this.physics.add.existing(new Player(this, 100, 3, 500, 100, "dude", 2))

    player1.setScale(0.25); // Increases the scale cause they're tiny uwu
    player2.setScale(0.25);

    // Initialize first weapons
    weapon1 = this.physics.add.existing(new Weapon(this, 1)); // scene, idx
    weapon2 = this.physics.add.existing(new Weapon(this, 2)); // scene, idx

    updateWeaponSeconds = 5;

    setTimeout(function updateWeapon() { // updates the weapons every x seconds
        weapon1.updateWeapon();
        weapon2.updateWeapon();

        setTimeout(updateWeapon,updateWeaponSeconds * 1000); // i don't know if this is the best way to make a loop
    }, updateWeaponSeconds * 1000);


    // Adds colliders
        // Characters
    this.physics.add.collider(this.players, this.players); // collider between characters
    this.physics.add.collider(this.players, platforms); // collider between character 1 and platforms
    
        // Bullets
    this.physics.add.collider(this.players, this.bullets, bulletOnPlayer, null, this); // collider between player and bullets
    this.physics.add.collider(platforms, this.bullets, bulletOnWall, null, this); // collider between bullets and platforms

        // Bombs
    this.physics.add.collider(this.players, this.bombs, bombCollision, null, this); // collider between bullets and platforms
    this.physics.add.collider(platforms, this.bombs, bombCollision, null, this); // collider between bullets and platforms
    this.physics.add.overlap(this.players, this.explosions, explosionCollision, null, this); // collider between bullets and platforms
    
        // Weapons
    this.physics.add.collider(this.players, this.weapons, pickUpWeapon, null, this); // collider between player and weapons


    // Player 1 inputs
        // Mooving
    w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    a_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    d_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // Shooting
    space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    q_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);


    // Player 2 inputs
        // Mooving
    cursors = this.input.keyboard.createCursorKeys();

        //Shooting
    numpad_0_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
    numpad_7_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_SEVEN);
    numpad_9_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_NINE);

}


function update ()
{
    player1.update();
    player2.update();
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
