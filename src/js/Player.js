class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, _speed, _lives, x, y, idx) {
        super(scene, x, y, "dude");

        this.speed = _speed;
        this.lives = _lives;
        this.idx = idx;
        
        this.canBeDamaged = true;

        // Add to scene
        scene.add.existing(this);

        scene.physics.world.enableBody(this);

        //this.body.bo

        // Add to players group
        scene.players.add(this);        
    }

    movement1()
    {
        // Movement
        if (cursors.left.isDown)
        {
            this.body.setVelocityX(-this.speed);
            this.anims.play('left1', true);
        }
        else if (cursors.right.isDown)
        {
            this.body.setVelocityX(this.speed);
            this.anims.play('right1', true);
        }
        else
        {
            this.body.setVelocityX(0);
            this.anims.play('turn1');
        }

        // Jumping
        if (cursors.up.isDown && this.body.touching.down)
        {
            this.body.setVelocityY(-330);
        }

        return this;
    }

    movement2()
    {
        if (a_key.isDown)
        {
            this.body.setVelocityX(-this.speed);
            this.anims.play('left2', true);
        }
        else if (d_key.isDown)
        {
            this.body.setVelocityX(this.speed);
            this.anims.play('right2', true);
        }
        else
        {
            this.body.setVelocityX(0);
            this.anims.play('turn2');
        }

        if (w_key.isDown && player2.body.touching.down)
        {
            this.body.setVelocityY(-330);
        }
    }

    shooting()
    {
        // update arrow position
        spr.x = this.x;
        spr.y = this.y;

        // rotate arrow
        if (e_key.isDown)
        {
            spr.angle += 2;
        }

        if (q_key.isDown)
        {
            spr.angle -= 2;
        }

        // shoot bullets
        if (Phaser.Input.Keyboard.JustDown(space_key))
        {
            // create bullet
            var bullet = this.scene.physics.add.image(spr.x, spr.y, 'bullet').setImmovable(true);
            bullet.body.setAllowGravity(false);

            this.scene.bullets.add(bullet); // add bullet to group

            // set sprite rotation
            bullet.angle = spr.angle;
            //console.log(bullet.angle); // just to see the rotation

            var bulletSpeed = 500;
            var vec = this.scene.physics.velocityFromAngle(bullet.angle, bulletSpeed); // angle velocity of arrow

            // set bullet velocity
            bullet.body.velocity.x = vec.y; // the real angle doesn't match what we can see on the sprite (90º is actually 0º)
            bullet.body.velocity.y = -vec.x;
        }
    }

    update(){

        // Checks for the controls
        if(this.idx == 1)
            this.movement1();
        else if(this.idx == 2)
            this.movement2();
        
        
        this.shooting();


    }

}