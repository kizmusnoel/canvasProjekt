export class Car {
    constructor(color, x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed
        this.scale = 100
        this.rotation = 3.14

        switch (color) {
            case "green": this.img = "img/car_green.png"
        }
    }
}