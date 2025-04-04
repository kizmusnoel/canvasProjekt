export class Obstacle {
    constructor(x, y, texture, scale = 1, collision = true) {
        this.x = x
        this.y = y
        this.texture = texture
        this.scale = scale*200
        this.collision = collision
    }
}