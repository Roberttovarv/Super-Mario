function getRamdomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const loadClouds = (scene) => {

    for (let i = 0; i < 15; i++) { 

        if (i == 0) { i = Math.random(0.1, 0.9)}

        scene.add.image(i * (50 + (getRamdomInt(150, 250))), 
        getRamdomInt(10, 50), 'cloud1')
        .setOrigin(0, 0)
        .setScale(0.15)


        if (i == 0) { i = Math.random(0.1, 0.9)}

        scene.add.image(i * (50 + (getRamdomInt(150, 250))), 
        getRamdomInt(10, 50), 'cloud2')
        .setOrigin(0, 0)
        .setScale(0.13)
    }
}