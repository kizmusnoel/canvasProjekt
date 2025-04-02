export class Car {
    constructor(color, x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
        this.width = 100
        this.height = 100
        this.rotation = 0

        switch (color) {
            case "green": this.img = "img/car_green.png"
        }
    }
}