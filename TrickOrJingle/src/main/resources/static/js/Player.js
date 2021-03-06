// weapons cooldown as global variables
// player 1
let shotgunCooldown1 = false; // at the start it hasn't used any weapons so they don't need to cooldown
let gunCooldown1 = false;
let bombCooldown1 = false;
let currentAnimation = "turn";

// player 2
let shotgunCooldown2 = false;
let gunCooldown2 = false;
let bombCooldown2 = false;

let shooting = false;


export class Player extends Phaser.GameObjects.Sprite
{
    constructor(scene, _speed, _lives, x, y, _sprite, _idx) {
        super(scene, x, y, _sprite);

        this.speed = _speed;
        this.lives = _lives;
        this.idx = _idx;
        
        this.alive = true;
        this.canBeDamaged = true;

        this.hasWeapon = false;
        this.weaponType;

        this.sprite = _sprite;
        
        this.isShooting = false;

        // Pointer sprite for bullets arrow marker
        this.arrow = scene.physics.add.staticSprite(1000,1000, 'weapons'); // create out of frame because it has no weapon when created
        this.arrow.depth = 100; // put on front of the player
        this.arrow.angle = 45;

        // Create hearts image to represent the player lives
        if (this.idx == 1) // the position of the lives on scene in the x axis depends on the player (player 1 to the left, player 2 to the right)
            var posHeartsX = 150;
        else
            var posHeartsX = 1140;

        this.hearts = scene.add.image(posHeartsX, 65, 'heart').setScale(0.5);
        this.hearts.setFrame(this.lives); // change the frame of the spriteSheet to match the player lives (frame 3 has 3 hearts etc.)

        // Add to scene
        this.scene.add.existing(this);

        // Add to players group
        this.scene.players.add(this);        


    }

    movement()  
    {
        if (this.scene.a_key.isDown) //left
        {
            this.body.setVelocityX(-this.speed);
            this.anims.play(this.sprite+'Left', true);
            currentAnimation = "Left";
            
        }
        else if (this.scene.d_key.isDown)
        {
            this.body.setVelocityX(this.speed);
            this.anims.play(this.sprite+'Right', true);
            currentAnimation = "Right";
        }
        else
        {
            this.body.setVelocityX(0);
            this.anims.play(this.sprite+'Turn');
            currentAnimation = "Turn";
        }

        if ((Phaser.Input.Keyboard.JustDown(this.scene.w_key) && this.body.touching.down)) //jump
        {
            this.body.setVelocityY(-470);
        }
        
        

    }
    
    movementWebsocket()
    {
		if (this.previousX < this.x)
		{
			//this.body.setVelocityX(-this.speed);
			this.anims.play(this.sprite+'Right', true);
		}
        else if (this.previousX > this.x)
        {
			//this.body.setVelocityX(this.speed);
			this.anims.play(this.sprite+'Left', true);
		}
        else
        {
			 this.anims.play(this.sprite+'Turn');
		}
           

        this.previousX = this.x;
        //this.previousY = this.y;
    }

    shooting() //host
    {
        if (this.hasWeapon){
            // update arrow position
            this.arrow.x = this.x;
            this.arrow.y = this.y;
            
            // Flips the weapon when fully rotated
            if(this.arrow.angle < 0)
                this.arrow.flipX = true;
            else
                this.arrow.flipX = false;

            // rotate arrow
            if (this.scene.e_key.isDown)
            {
                this.arrow.angle += 3;
            }

            if (this.scene.q_key.isDown)
            {
                this.arrow.angle -= 3;
            }

            // shooting method depends on weaponType
            switch(this.weaponType)
            {
                case 'shotgun': // if the weapon type is a shotgun
                    if (Phaser.Input.Keyboard.JustDown(this.scene.space_key) && (shotgunCooldown1 == false)) // it only works if the player has cooled down
                    {
						shooting = true;
                        this.shootShotGun(); 
                        shotgunCooldown1 = true; // the weapon needs to cooldown to be used again
                        setTimeout( function(){ // after some time sets boolean to false so it can be shot again
                            shotgunCooldown1 = false;
                            shooting = false;
                        }, 1000);
                    }
                    break;
                case 'gun': // if the weapon type is a gun
                    if (Phaser.Input.Keyboard.JustDown(this.scene.space_key) && (gunCooldown1 == false))
                    {
						shooting = true;
                        this.shootGun();

                        gunCooldown1 = true;
                        setTimeout( function(){
                            gunCooldown1 = false;
                            shooting = false;
                        }, 1000);
                    }
                    break;

                case 'bomb':
                    if (Phaser.Input.Keyboard.JustDown(this.scene.space_key) && (bombCooldown1 == false))
                    {
						shooting = true;
                        this.throwBomb();

                        bombCooldown1 = true;
                        setTimeout( function(){
                            bombCooldown1 = false;
                            shooting = false;
                        }, 1000);
                    }
                    break;
            }
        }
    }
	
    showWeaponWebsocket()
    {
        if (this.hasWeapon)
        {
            // update arrow position
            this.arrow.x = this.x;
            this.arrow.y = this.y;
            
            // Flips the weapon when fully rotated
            if(this.arrow.angle < 0)
                this.arrow.flipX = true;
            else
                this.arrow.flipX = false;

            switch(this.weaponType)
	        {
	            case 'gun':
	                this.arrow.setFrame(0);
	                break;
	            case 'shotgun':
	                this.arrow.setFrame(1);
	                break;
	            case 'bomb':
	                this.arrow.setFrame(2);
	                break;
	        }
        }
    }
    
    shootWebsocket()
    {
	    switch(this.weaponType)
	    {
		    case 'gun':
				this.shootGun();
			    
			    break;
		    case 'shotgun':
				this.shootShotGun();
			    
			    break;
		    case 'bomb':
				this.throwBomb();
				
			    break;
	    }
	}
    
    

    shootGun()
    {
        // shoot gun bullets (the collide box is tinier, but they reload faster and scroll the entire screen)
        // play sound
        this.scene.gunSound.play();

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

    shootShotGun()
    {
        // shoot shotgun bullets (the collide box is bigger, but they take longer to load and dissapear after a few pixels)
        // play sound
        this.scene.shotgunSound.play();

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

    throwBomb()
    {
        var bomb = this.scene.physics.add.image(this.arrow.x, this.arrow.y, 'bomb').setImmovable(true);

        this.scene.bombs.add(bomb); // adds bullet to scene group

        var bombSpeed = 400;
        
        var vec = this.scene.physics.velocityFromAngle(this.arrow.angle, bombSpeed); // angle velocity of arrow

        // Sets bullet velocity
        bomb.body.velocity.x = vec.y;
        bomb.body.velocity.y = -vec.x;
        
    }

    takeDamage()
    {
        this.lives--;
        this.hearts.setFrame(this.lives); // change the frame of the spriteSheet to match the player lives (frame 3 has 3 hearts etc.)

        // the situation between players lives has changed, so we got to update the stage
        this.scene.changeStage();

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

    getLives()
    {
        return this.lives;
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
        switch(this.weaponType)
        {
            case 'gun':
                this.arrow.setFrame(0);
                break;
            case 'shotgun':
                this.arrow.setFrame(1);
                break;
            case 'bomb':
                this.arrow.setFrame(2);
                break;
        }
    }

	update() {

		if (this.alive) // If the player is alive
		{
			// Checks for the controls of each player based on the index
			this.isShooting = shooting;
			this.movement();
			this.shooting();
		}

	}

	updateWebsocket() 
	{
		if(this.alive) // If the player is alive
        {
            // Checks for the controls of each player based on the index
            this.movementWebsocket();
            this.showWeaponWebsocket();
        } 
	}

}