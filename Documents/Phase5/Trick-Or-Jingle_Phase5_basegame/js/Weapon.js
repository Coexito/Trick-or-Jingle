let weaponTypes =  ['gun', 'shotgun', 'bomb']; // global variable of an array with the diferent types of weapons

// there are two weapons in scene, each one has different valid positions so they don't overlap
let validX_1 = [640, 127, 234]; // global variable of an array with the valid x positions the weapon can be generated in
let validY_1 = [124, 235, 469]; // global variable of an array with the valid y positions the weapon can be generated in

let validX_2 = [640, 1140, 1031]; 
let validY_2 = [400, 235, 469];

export class Weapon extends Phaser.GameObjects.Sprite{
    
    constructor(scene, _idx) {
        super(scene);

        this.type = weaponTypes[Phaser.Math.Between(0,2)]; // choose a random weaponType

        this.sprite = this.type; // the name of the sprite matches the name of the type of the weapon

        this.idx = _idx;

        if (this.idx == 1) // to check if it is weapon 1 or 2
        {
            this.x = validX_1[Phaser.Math.Between(0,2)]; // choose a random x position for weapon 1
            this.y = validY_1[Phaser.Math.Between(0,2)]; // choose a random y position for weapon 1
        } else 
        {
            this.x = validX_2[Phaser.Math.Between(0,2)]; // choose a random x position for weapon 1
            this.y = validY_2[Phaser.Math.Between(0,2)]; // choose a random y position
        }

        // Add to scene
        this.weaponBody = scene.physics.add.image(this.x,this.y, this.sprite);

        // Add to weapons group
        this.scene.weapons.add(this.weaponBody);
    }

    updateWeapon()
    {
        this.type = weaponTypes[Phaser.Math.Between(0,2)]; // choose a random weaponType again

        if (this.idx == 1)
        {
            this.x = validX_1[Phaser.Math.Between(0,2)]; // choose a random x position for weapon 1
            this.y = validY_1[Phaser.Math.Between(0,2)]; // choose a random y position for weapon 1
        } else 
        {
            this.x = validX_2[Phaser.Math.Between(0,2)]; // choose a random x position for weapon 1
            this.y = validY_2[Phaser.Math.Between(0,2)]; // choose a random y position
        }

        this.weaponBody.setPosition(this.x, this.y);
        this.weaponBody.setVelocity(0, 0);
        this.weaponBody.setTexture(this.type);
    }
}