export class Car {
    constructor(color, x, y, speed) {
        this.x = x
        this.y = y
        this.speed = speed

        switch (color) {
            case "green": this.img = "img/car_green.png"
        }
    }
}