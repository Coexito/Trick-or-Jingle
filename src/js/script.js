
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
    this.load.spritesheet('dude', 
        'Resources/TestAssets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image('bullet', 'Resources/TestAssets/bullet.png');
    this.load.image('sprite', 'Resources/TestAssets/sprite.png');
}

function create ()
{
    // the timer is just a test for the 5 minute clock
    var timer = this.time.delayedCall(5000, outOfTime, null, this);  // delay in ms
    
    // objects in order from farther to nearest on screen
    this.add.image(0, 0, 'sky').setOrigin(0,0); // by default elements are positioned based on their center. Change so it matches the origin of the screen
    
    // create platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400,568, 'ground').setScale(2).refreshBody();
    platforms.create(600,400, 'ground');


    /* 
        PLAYERS
    */

    // Creates a group for the players
    this.players = this.add.group();

    // Create player 1
    this.anims.create({
        key: 'left1',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn1',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right1',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    
    // Create player 2
    this.anims.create({
        key: 'left2',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right2',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    

    // Creates a group to store the bullets
    bullets = this.physics.add.group({inmovable: true, allowGravity:false});	
	spr = this.physics.add.staticSprite(400,300, 'sprite').setScale(0.25); //directional sprite arrow for bullets

    // Initializes the players
    player1 = new Player(this, 160, 3, 0, 0, 1); //scene, speed, lives, x, y, index
    player2 = new Player(this, 160, 3, 0, 0, 2);


    // Adds colliders
    this.physics.add.collider(player1, player2); // collider between characters
    this.physics.add.collider(player1, platforms); // collider between character 1 and platforms
    this.physics.add.collider(player2, platforms) // collider between character 2 and platforms
    bulletsCollider = this.physics.add.collider(player1, bullets, hitBullets, null, this); // collider between player and bullets
    this.physics.add.collider(platforms, bullets, killBullets, null, this); // collider between bullets and platforms


    // player 1 input
    w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    a_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    d_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // player 2 input
    cursors = this.input.keyboard.createCursorKeys();

    // other inputs ill sort them someday
    space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    q_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

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


function hitBullets(player, bullet) 
{
    if(player.canBeDamaged){ // if the player can be hit
        bullet.disableBody(true,true); // destroy bullet when it hits the player
        player.canBeDamaged = false; // player is now invincible
        
        var timerHurt = this.time.delayedCall(5000, playerHurt, null, this);  // wait 5 seconds and then call function playerHurt
        player.body.alpha = 0.5; // turn down sprite transparency to visually show inmunity
        bulletsCollider.destroy(); // destroy the collider
    }
}

function killBullets(platforms,bullet)
{
    // this will need an explosion sprite to show how the bullet collided with the platform
    bullet.disableBody(true,true); // destroy bullet when it hits a platform
}

function playerHurt(player)
{
    player.canBeDamaged = true; // after 5 seconds the player can be hit again
    player.body.alpha = 1; // turn up sprite transparency to visually show it can be hit again
    bulletsCollider = this.physics.add.collider(player1, bullets, hitBullets, null, this); // restore collider
}