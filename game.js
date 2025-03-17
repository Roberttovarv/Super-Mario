import { createAnimations } from "./animations.js"
import { inGameAudio, playAudio } from "./audio.js"
import { killMario } from "./behavior.js"
import { gameControls } from "./controls.js"
import { loadSpriteSheets } from "./spritesheets.js"

/* global Phaser */
const config = {
    type: Phaser.AUTO,
    width: 256,
    height: 244,
    backgroundColor: '#049cd8',
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            // debug: true
        }
    },
    scene: {
        preload,
        create,
        update
    }
}

new Phaser.Game(config)

function preload() {
    this.load.image(
        'cloud1',
        'assets/scenery/overworld/cloud1.png'
    )

    this.load.image(
        'floorbricks',
        'assets/scenery/overworld/floorbricks.png'
    )

    this.load.image(
        'immovable-block',
        'assets/blocks/overworld/immovableBlock.png'
    )

    loadSpriteSheets(this)

    inGameAudio(this)
}

function create() {
    createAnimations(this)

    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)

    this.staticBlock = this.physics.add.staticGroup()

    this.staticBlock
        .create(180, config.height - 40.5, 'immovable-block')
        .refreshBody()

    this.staticBlock
        .create(360, config.height - 40.5, 'immovable-block')
        .refreshBody()

    this.mario = this.physics.add.sprite(50, 200, 'mario')
        .setOrigin(0, 0.4)
        .setCollideWorldBounds(true)
        .setGravityY(300)
    this.mario.setDepth(1)


    this.floor = this.physics.add.staticGroup()

    this.goomba = this.physics.add.sprite(250, config.height - 64, 'goomba')
        .setOrigin(0, 1)
        .setVelocityX(-50)
        
    this.floor
        .create(0, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(150, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.floor
        .create(278, config.height - 16, 'floorbricks')
        .setOrigin(0, 0.5)
        .refreshBody()

    this.coins = this.physics.add.staticGroup()
    this.coins.create(150, 150, 'coin').anims.play('coin-spin', true)


    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.goomba, this.floor)

    this.physics.add.collider(this.goomba, this.staticBlock, (goomba, block) => {
        if (goomba.x < block.x) {
            goomba.setVelocityX(-50);
        } else {
            goomba.setVelocityX(50); 
        }
    });

    this.physics.add.overlap(this.mario, this.coins, collectCoin, null, this)

    this.physics.add.collider(this.mario, this.goomba, isTouchingEnemy, null, this)
 

    this.physics.add.collider(this.mario, this.staticBlock)
    this.physics.world.setBounds(0, 0, 2000, config.height)

    this.cameras.main.setBounds(0, 0, 2000, config.height)
    this.cameras.main.startFollow(this.mario)

    
    this.goomba.anims.play('goomba-walk', true)


    this.keys = this.input.keyboard.addKeys({
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
        up: Phaser.Input.Keyboard.KeyCodes.W,
        down: Phaser.Input.Keyboard.KeyCodes.S,
        sprint: Phaser.Input.Keyboard.KeyCodes.SHIFT
    })

    function isTouchingEnemy(mario, enemy) {
        if (mario.isDead) return 

        if (enemy.body.touching.left && mario.body.touching.right || enemy.body.touching.right && mario.body.touching.left) {
            killMario(this, { mario: this.mario })
   
        }
        if (enemy.body.touching.up && mario.body.touching.down) {
            enemy.anims.play('goomba-dead', true)
            playAudio('goomba-kill', this)
            mario.setVelocityY(-150)
            enemy.setVelocityX(0)

            setTimeout(() => {
                enemy.destroy()
            }, 500)
        }
    };

    function collectCoin(mario, coin) {
        if (coin.isCollected) return
        
        coin.isCollected = true
        playAudio('coin-collect', this, { volume: 0.1 })

        this.add.text(
            coin.x,
            coin.y,
            100,
            {
                fontFamily: 'SMF',
                fontSize: config.width / 25
            }
        )

        setTimeout(() => {
            coin.destroy()
             coin.isCollected = false
        }, 200)
        
    }
    }


function update() {
    gameControls(this)

    const { mario, sound, scene, goomba } = this

    if (mario.y >= config.height - 10 && !mario.isDead) {
        killMario(this, { mario: mario })
    }
}
