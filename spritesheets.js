const SPRITES_BD = [
    {   key: 'mario',
        path: 'assets/entities/mario.png',
        frameWidth: 18, 
        frameHeight: 16
    },
    {        
        key: 'goomba',
        path: 'assets/entities/overworld/goomba.png',
        frameWidth: 16, 
        frameHeight: 16 
    },
    {
        key: 'coin',
        path: 'assets/collectibles/coin.png'
    }
]

export const loadSpriteSheets = ({ load }) => {
    SPRITES_BD.forEach(({ key, path, frameWidth, frameHeight}) => {
        load.spriteSheet(key, path, { frameWidth, frameHeight })
    })

}