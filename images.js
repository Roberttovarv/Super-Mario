const IMAGE_DB = [
    {
        key: 'immovable-block',
        path: 'assets/blocks/overworld/immovableBlock.png'
    },
    {
        key: 'floorbricks',
        path: 'assets/scenery/overworld/floorbricks.png'
    },
    {
        key: 'cloud1',
        path: 'assets/scenery/overworld/cloud1.png'
    },
    {
        key: 'cloud2',
        path: 'assets/scenery/overworld/cloud2.png'
    },
    {
        key: 'mushroom',
        path: 'assets/collectibles/super-mushroom.png'
    }
]

export const loadImage = ({ load }) => {
    IMAGE_DB.forEach(({ key, path }) => {
        load.image(key, path)
    })

}

