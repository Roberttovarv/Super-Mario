export const loadCollider = (scene) => {
    if (scene.collectibles || scene.floor || scene.staticBlock) {
            scene.physics.add.collider(this.collectibles, this.floor)
    scene.physics.add.collider(this.collectibles, this.staticBlock)
}
}