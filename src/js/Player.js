class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, _speed, _lives, x, y, sprite, _idx) {
        super(scene, x, y, sprite);

        this.speed = _speed;
        this.lives = _lives;
        this.idx = _idx;
        
        this.alive = true;
        this.canBeDamaged = true;

        this.hasWeapon = false;
        this.weaponType;

        // Pointer sprite for bullets arrow marker
        this.arrow = scene.physics.add.staticSprite(1000,1000, 'sprite').setScale(0.15); // create out of frame because it has no weapon when created

        // Add to scene
        this.scene.add.existing(this);

        // Add to players group
        this.scene.players.add(this);        
    }

    movement1()
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

        if (w_key.isDown && this.body.touching.down)
        {
            this.body.setVelocityY(-330);
        }
    }
    movement2()
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

    shooting1()
    {
        if (this.hasWeapon){
            // update arrow position
            this.arrow.x = this.x;
            this.arrow.y = this.y;

            // rotate arrow
            if (e_key.isDown)
            {
                this.arrow.angle += 2;
            }

            if (q_key.isDown)
            {
                this.arrow.angle -= 2;
            }

            // shooting method depends on weaponType
            switch(this.weaponType)
            {
                case 'shotgun': // if the weapon type is a shotgun
                    // gotta do, change arrow sprite to shotgun
                    this.shootShotGun();
                    break;
                case 'gun': // if the weapon type is a gun
                    this.shootGun();
                    break;
                case 'bomb':
                    this.throwBomb();
                    break;
            }
        }
    }

    shooting2()
    {
        if (this.hasWeapon)
        {
            // update arrow position
            this.arrow.x = this.x;
            this.arrow.y = this.y;

            // rotate arrow
            if (numpad_9_key.isDown)
            {
                this.arrow.angle += 2;
            }

            if (numpad_7_key.isDown)
            {
                this.arrow.angle -= 2;
            }

            // shooting method depends on weaponType
            switch(this.weaponType)
            {
                case 'shotgun': // if the weapon type is a shotgun
                    // gotta do, change arrow sprite to shotgun
                    this.shootShotGun();
                    break;
                case 'gun': // if the weapon type is a gun
                    this.shootGun();
                    break;
                case 'bomb':
                    this.throwBomb();
                    break;
            }
        }
    }

    shootGun()
    {
        // shoot gun bullets (the collide box is tinier, but they reload faster and scroll the entire screen)
        if (Phaser.Input.Keyboard.JustDown(space_key))
        {
            // create bullet
            var bullet = this.scene.physics.add.image(this.arrow.x, this.arrow.y, 'bullet').setImmovable(true).setScale(0.5); // Creates a bullet on the scene
            bullet.body.setAllowGravity(false);

            this.scene.bullets.add(bullet); // adds bullet to scene group

            // set bullet's sprite rotation to match the arrow rotation
            bullet.angle = this.arrow.angle;

            var bulletSpeed = 500;
            var vec = this.scene.physics.velocityFromAngle(bullet.angle, bulletSpeed); // angle velocity of arrow

            // Sets bullet velocity
            bullet.body.velocity.x = vec.y;
            bullet.body.velocity.y = -vec.x;
        }
    }

    shootShotGun()
    {
        // shoot shotgun bullets (the collide box is bigger, but they take longer to load and dissapear after a few pixels)
        if (Phaser.Input.Keyboard.JustDown(space_key))
        {
            // create bullet
            var bullet = this.scene.physics.add.image(this.arrow.x, this.arrow.y, 'bullet').setImmovable(true); // Creates a bullet on the scene
            bullet.body.setAllowGravity(false);

            this.scene.bullets.add(bullet); // adds bullet to scene group

            // set bullet's sprite rotation to match the arrow rotation
            bullet.angle = this.arrow.angle;

            var bulletSpeed = 500;
            var vec = this.scene.physics.velocityFromAngle(bullet.angle, bulletSpeed); // angle velocity of arrow

            // Sets bullet velocity
            bullet.body.velocity.x = vec.y;
            bullet.body.velocity.y = -vec.x;

            // Bullet dissapears after a few miliseconds to give the impresion that it can't reach far
            this.scene.tweens.add({
                targets: [bullet],
                ease: 'Sine.easeInOut',
                duration: 200, // time doing the fading effect
                delay: 300, // time since it is called till it does the effect
                alpha: {
                  getStart: () => 1,
                  getEnd: () => 0
                },
                onComplete: () => {
                    bullet.disableBody(true, true); 
                }
            });
        }
    }

    throwBomb()
    {
        if (Phaser.Input.Keyboard.JustDown(space_key)) {
            var bomb = this.scene.physics.add.image(this.arrow.x, this.arrow.y, 'bomb').setImmovable(true);

            this.scene.bombs.add(bomb); // adds bullet to scene group

            var bombSpeed = 400;
            
            var vec = this.scene.physics.velocityFromAngle(this.arrow.angle, bombSpeed); // angle velocity of arrow

            // Sets bullet velocity
            bomb.body.velocity.x = vec.y;
            bomb.body.velocity.y = -vec.x;
        }
        
    }

    takeDamage()
    {
        this.lives--;

        if(this.lives > 0) // If has enough lives to survive, takes damage
        {
            this.canBeDamaged = false;
            console.log("Damaged player" + this.idx + ", " + this.lives + " lives left");
            return true;
        }
        else // If not, dies :-(
        {
            this.alive = false;
            console.log("Player" + this.idx + " dies");

            this.arrow.destroy();   // Destroys the pointer
            this.destroy();         // Destroys the player itself
            return false;
        }
        
    }

    makeVulnerable()
    {
        this.canBeDamaged = true;
        console.log("Player" + this.idx + " vulnerable again");
    }

    pickWeapon(texture)
    {
        this.hasWeapon = true;
        this.weaponType = texture;
        console.log(this.weaponType);
    }

    update(){

        if(this.alive) // If the player is alive
        {
            // Checks for the controls of each player based on the index
            if(this.idx == 1)
            {
                this.movement1();
                this.shooting1();
            }  
            else if(this.idx == 2)
            {
                this.movement2();
                this.shooting2()
            }
        }
        

    }

}