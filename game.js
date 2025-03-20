import { createAnimations } from "./animations.js"
import { inGameAudio, playAudio } from "./audio.js"
import { killMario } from "./behavior.js"
import { gameControls } from "./controls.js"
import { loadImage } from "./images.js"
import { loadMap } from "./map.js"
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

    loadImage(this)

    loadSpriteSheets(this)

    inGameAudio(this)

    this.load.on('complete', () => {
        createAnimations(this);
    });

}

function create() {
    loadMap(this)
    createAnimations(this)

    this.add.image(0, 0, 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)

    this.mario = this.physics.add.sprite(50, 200, 'mario')
        .setOrigin(0, 0.4)
        .setCollideWorldBounds(true)
        .setGravityY(300)
        .setSize(16, 18)
        .setOffset(0, 0)
    this.mario.setDepth(1)

    this.goomba = this.physics.add.sprite(250, 180, 'goomba')
        .setOrigin(0, 1)
        .setVelocityX(-50)

    this.misteryBlock = this.physics.add.sprite(250, 165, 'mistery-block')
        .setOrigin(0, 1)
        .setImmovable(true)
    this.misteryBlock.body.allowGravity = false;



    this.misteryBlock.anims.play('mistery-block-switch', true)

    this.physics.add.collider(this.mario, this.misteryBlock, (mario, misteryBlock) => {
        if (misteryBlock.body.touching.down && mario.body.touching.up) {
            if (misteryBlock.isCollected) return

            misteryBlock.setDepth(1)
            misteryBlock.isCollected = true

            const mushroom = this.collectibles.create(258, 165, 'mushroom')
            mushroom.body.enable = false
            mushroom.alpha = 0
            this.tweens.add({
                targets: mushroom,
                duration: 500,
                y: mushroom.y - 30,
                alpha: 1,
                onComplete: () => {
                    mushroom.body.enable = true
                    { !mario.flipX ? mushroom.setVelocityX(-60) : mushroom.setVelocityX(60) }
                }
            })
            this.tweens.add({
                targets: misteryBlock,
                duration: 20,
                y: misteryBlock.y - 10,

                onComplete: () => {
                    misteryBlock.anims.play('empty-mistery-block', true)
                    this.tweens.add({
                        targets: misteryBlock,
                        duration: 50,
                        y: misteryBlock.y + 10,

                    })
                }
            })
        }
    })

    this.collectibles = this.physics.add.group()



    this.physics.add.collider(this.mario, this.floor)
    this.physics.add.collider(this.goomba, this.floor)
    this.physics.add.collider(this.collectibles, this.floor)
    this.physics.add.collider(this.collectibles, this.staticBlock, (collectible, block) => {
        if (collectible.x < block.x) {
            collectible.setVelocityX(-50);
        } else {
            collectible.setVelocityX(50);
        }
    })


    this.physics.add.collider(this.goomba, this.staticBlock, (goomba, block) => {
        if (goomba.x < block.x) {
            goomba.setVelocityX(-50);
        } else {
            goomba.setVelocityX(50);
        }
    });

    this.physics.add.overlap(this.mario, this.staticCollectibles, collectItem, null, this)
    this.physics.add.overlap(this.mario, this.collectibles, collectItem, null, this)

    this.physics.add.collider(this.mario, this.goomba, isTouchingEnemy, null, this)


    this.physics.add.collider(this.mario, this.staticBlock)
    this.physics.world.setBounds(0, 0, 2000, 284)

    this.cameras.main.setBounds(0, 0, 2000, 244)
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

        if (enemy.body.touching.up && mario.body.touching.down) {
            enemy.anims.play('goomba-dead', true)
            playAudio('goomba-kill', this)
            mario.setVelocityY(-150)
            enemy.setVelocityX(0)
            enemy.disableBody(true, false)

            setTimeout(() => {
                enemy.destroy()
            }, 500)
            addScore(200, enemy, this)

            return;
        }

        if (mario.isGrown) {

            playAudio('powerdown', this, { volume: 0.2 })
            this.physics.world.pause()
            this.anims.pauseAll()
            mario.isBlocked = true

            let i = 0
            const interval = setInterval(() => {
                mario.anims.play(i % 2 === 0
                    ? 'mario-grown-idle'
                    : 'mario-idle'
                )
                i++
            }, 100)


            setTimeout(() => {
                mario.setDisplaySize(18, 16)
                mario.body.setSize(18, 16)
                mario.setScale(1)
                mario.setOffset(0, 0)
                mario.isGrown = false
                mario.isBlocked = false
                clearInterval(interval)
                this.physics.world.resume()
                this.anims.resumeAll()
            }, 1000)
        }

        if (enemy.body.touching.left
            && mario.body.touching.right
            && !mario.isBlocked
            || enemy.body.touching.right
            && mario.body.touching.left
            && !mario.isBlocked) {
            killMario(this, { mario: this.mario })

        }
    };

    function collectItem(mario, item) {

        const { texture: { key } } = item
        if (item.isCollected) return
        item.destroy()

        if (key === 'coin') {

            item.isCollected = true
            playAudio('coin-collect', this, { volume: 0.1 })
            addScore(100, item, this)
        }

        if (key === 'mushroom') {
            playAudio('powerup', this, { volume: 0.2 })
            mario.y -= 10
            this.physics.world.pause()
            this.anims.pauseAll()
            mario.isBlocked = true

            let i = 0
            const interval = setInterval(() => {
                mario.anims.play(i % 2 === 0
                    ? 'mario-grown-idle'
                    : 'mario-idle'
                )
                i++
            }, 100)

            setTimeout(() => {
                mario.setDisplaySize(18, 32)
                mario.body.setSize(18, 32)
                mario.setScale(1)
                mario.setOffset(0, 0)
                mario.isGrown = true
                mario.isBlocked = false
                clearInterval(interval)
                this.physics.world.resume()
                this.anims.resumeAll()
            }, 1000)

        }
    }
}

function addScore(score, origin, game) {
    const scoreText = game.add.text(
        origin.getBounds().x,
        origin.getBounds().y,
        score,
        {
            fontFamily: 'SMF',
            fontSize: config.width / 25
        }
    )

    game.tweens.add({
        targets: scoreText,
        duration: 500,
        y: scoreText.y - 20,
        onComplete: () => {
            game.tweens.add({
                targets: scoreText,
                duration: 100,
                alpha: 0,
                onComplete: () => {
                    scoreText.destroy()
                }
            })
        }
    })
}


function update() {
    gameControls(this)

    const { mario, sound, scene, goomba } = this

    if (mario.y >= 244 && !mario.isDead) {
        killMario(this, { mario: mario })
    }
}






