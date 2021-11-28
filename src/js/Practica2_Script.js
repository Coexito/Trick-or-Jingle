
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

    
	// directional arrow for bullets
	spr = this.physics.add.staticSprite(400,300, 'sprite').setScale(0.25);

    // create player 1
    player = this.physics.add.sprite(100, 450, 'dude').setScale(2); // create sprite for player 1
    
    playerOK = true; // to check if the player can be hit or if he is momentanely invincible because he just lost a live

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    // create player 2
    player2 = this.physics.add.sprite(400, 450, 'dude').setScale(2);

    player2.setBounce(0.2);
    player2.setCollideWorldBounds(true);

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

    // add colliders
    this.physics.add.collider(player, player2); // collider between characters
    this.physics.add.collider(player, platforms); // collider between character 1 and platforms
    this.physics.add.collider(player2, platforms) // collider between character 2 and platforms

    // player 2 input
    cursors = this.input.keyboard.createCursorKeys();

    // player 1 input
    w_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    a_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    d_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // other inputs ill sort them someday
    space_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    q_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);
    e_key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);

    // create group to store the bullets
    bullets = this.physics.add.group({inmovable: true, allowGravity:false});
    this.physics.add.collider(player, bullets, hitBullets, null, this); // collider between player and bullets
    this.physics.add.collider(platforms, bullets, killBullets, null, this); // collider between bullets and platforms


}

function update ()
{
    // movement player 1
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left1', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right1', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn1');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }

    // update arrow position
    spr.x = player2.x;
    spr.y = player2.y;

    // rotate arrow
    if (e_key.isDown)
    {
        spr.angle += 2;
    }

    if (q_key.isDown)
    {
        spr.angle -= 2;
    }


    // bullets
    // using vec works like shit i gotta use real math :(
    if (Phaser.Input.Keyboard.JustDown(space_key))
    {
        // create bullet
        var bullet = this.physics.add.image(spr.x, spr.y, 'bullet').setImmovable(true);
        bullet.body.setAllowGravity(false);

        bullets.add(bullet); // add bullet to group

        // set sprite rotation
        bullet.angle = spr.angle;
        //console.log(bullet.angle); // just to see the rotation
        vec = this.physics.velocityFromAngle(bullet.angle, 50); // angle velocity of arrow
        
        // set bullet velocity
        bullet.body.velocity.x = vec.y*10; // the real angle doesn't match what we can see on the sprite (90º is actually 0º)
        bullet.body.velocity.y = -vec.x*10; 

    }

    // movement player 2
    if (a_key.isDown)
    {
        player2.setVelocityX(-160);

        player2.anims.play('left2', true);
    }
    else if (d_key.isDown)
    {
        player2.setVelocityX(160);

        player2.anims.play('right2', true);
    }
    else
    {
        player2.setVelocityX(0);

        player2.anims.play('turn2');
    }

    if (w_key.isDown && player2.body.touching.down)
    {
        player2.setVelocityY(-330);
    }
        
}

function death()
{
    bullet.disableBody(true, true);
    console.log("collide");
}

function outOfTime() // i was playing with this for the 5 minute timeout
{
    console.log("Time over buddy");
}


function hitBullets(player, bullet) 
{
    bullet.disableBody(true,true); // destroy bullet when it hits the player
    if(playerOK){ // if the player can be hit
        console.log("playerhurt"); // debug
        playerOK = false; // player is now invincible
        var timerHurt = this.time.delayedCall(5000, playerHurt, null, this);  // wait 5 seconds and then call function playerHurt
        // we need to change the sprite to red or more translucid or something
    }
}

function killBullets(platforms,bullet)
{
    // this will need an explosion sprite to show how the bullet collided with the platform
    bullet.disableBody(true,true); // destroy bullet when it hits a platform
}

function playerHurt()
{
    playerOK = true; // after 5 seconds the player can be hit again
    console.log("PlayerOk"); // debug
}