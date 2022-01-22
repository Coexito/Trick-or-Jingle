let weaponTypes =  ['gun', 'shotgun', 'bomb']; // global variable of an array with the diferent types of weapons

// 4 valid positions for the weapons to be in
let validX = [640, 127, 1140, 234];
let validY = [124, 235, 235, 469];

export class Weapon extends Phaser.GameObjects.Sprite{
    
    constructor(scene, _idx) {
        super(scene);

        this.iter = 0;
        this.idx = _idx;

        this.type = weaponTypes[this.iter + this.idx]; // choose a random weaponType

        this.sprite = this.type; // the name of the sprite matches the name of the type of the weapon

        // assign a position to weapon
        this.x = validX[this.iter + this.idx];
        this.y = validY[this.iter + this.idx];

        // Add to scene
        this.weaponBody = scene.physics.add.image(this.x,this.y, this.sprite);

        // Add to weapons group
        this.scene.weapons.add(this.weaponBody);
    }

    updateWeapon()
    {
        if (this.iter == 0) {
            this.iter = 1;
        } else if (this.iter == 5) {
            this.iter = 0;
        }
            
        this.type = weaponTypes[this.iter + this.idx]; // choose a random weaponType again

        // assign a position to weapon
        this.x = validX[this.iter + this.idx];
        this.y = validY[this.iter + this.idx];


        this.weaponBody.setPosition(this.x, this.y);
        this.weaponBody.setVelocity(0, 0);
        this.weaponBody.setTexture(this.type);
        this.iter ++;
    }
}