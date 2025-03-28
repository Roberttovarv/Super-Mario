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
    },
    {
        key: 'bush1',
        path: 'assets/scenery/overworld/bush1.png'
    },
    {
        key: 'bush2',
        path: 'assets/scenery/overworld/bush2.png'
    },
    {
        key: 'mountain1',
        path: 'assets/scenery/overworld/mountain1.png'
    },
    {
        key: 'mountain2',
        path: 'assets/scenery/overworld/mountain2.png'
    },
    {
        key: 'pipe1',
        path: 'assets/scenery/pipe1.png'
    },
    {
        key: 'pipe2',
        path: 'assets/scenery/pipe2.png'
    },

]

export const loadImage = ({ load }) => {
    IMAGE_DB.forEach(({ key, path }) => {
        load.image(key, path)
    })

}

