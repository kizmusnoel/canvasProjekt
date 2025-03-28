import { Car } from "./car.js";
import { ParkingSpot } from "./parkingSpot.js";


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let car = new Car("green", 100, 100, 4)
let parkingSpot = new ParkingSpot(500, 500, 50, 70)

let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Car movement logic
function moveCar() {
    if (keys.up && car.y > 0) car.y -= car.speed;
    if (keys.down) car.y += car.speed;
    if (keys.left && car.x > 0) car.x -= car.speed;
    if (keys.right) car.x += car.speed;
}

// Detect collision with parking spot
function checkCollisionWithParking() {
    if (
        car.x + car.width > parkingSpot.x &&
        car.x < parkingSpot.x + parkingSpot.width &&
        car.y + car.height > parkingSpot.y &&
        car.y < parkingSpot.y + parkingSpot.height
    ) {
        return true;
    }
    return false;
}

// Draw the car
function drawCar() {
    const img = document.createElement("img")
    img.src = car.img
    ctx.drawImage(img, car.x, car.y)
}

// Draw the parking spot
function drawParkingSpot() {
    ctx.fillStyle = "green";
    ctx.fillRect(parkingSpot.x, parkingSpot.y, parkingSpot.width, parkingSpot.height);
}

// Draw everything
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw parking spot
    drawParkingSpot();

    // Draw the car
    drawCar();

    // Check if the car is parked
    if (checkCollisionWithParking()) {
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText("Parked! Press [Space] to Continue", canvas.width / 2 - 150, canvas.height / 2 - 150);
    }
}

// Keydown event listener to handle car movement
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") keys.up = true;
    if (event.key === "ArrowDown") keys.down = true;
    if (event.key === "ArrowLeft") keys.left = true;
    if (event.key === "ArrowRight") keys.right = true;
    if (event.key === "w") keys.up = true;
    if (event.key === "s") keys.down = true;
    if (event.key === "a") keys.left = true;
    if (event.key === "d") keys.right = true;
});

// Keyup event listener to stop car movement
window.addEventListener("keyup", (event) => {
    if (event.key === "ArrowUp") keys.up = false;
    if (event.key === "ArrowDown") keys.down = false;
    if (event.key === "ArrowLeft") keys.left = false;
    if (event.key === "ArrowRight") keys.right = false;
    if (event.key === "w") keys.up = false;
    if (event.key === "s") keys.down = false;
    if (event.key === "a") keys.left = false;
    if (event.key === "d") keys.right = false;
    if (event.key === "r" || event.key === "R") NextLevel();
});

// Reset the game when the car is parked
function NextLevel() {
    car.x = 100;
    car.y = 100;
}

// Main game loop
function gameLoop() {
    moveCar();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();