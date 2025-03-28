export const loadPipes = (scene) => {
    scene.pipe = scene.physics.add.staticGroup()

    scene.pipe
    .create(1325, 188, 'pipe1')
    .refreshBody()
    .setDepth(5)

    scene.pipe
    .create(1290, 196, 'pipe2')
    .refreshBody()
    .setDepth(5)
}