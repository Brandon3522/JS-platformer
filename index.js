const canvas = document.getElementById('canvas');

const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.1;

// Track player x position key press
const keys = {
    right: {
        isPressed: false,
    },
    left: {
        isPressed: false,
    },
};

class Player {
    constructor() {
        this.position = {
            x: 100,
            y: 100,
        };
        this.velocity = {
            x: 0,
            y: 0, // May need to be 1
        };
        this.width = 100;
        this.height = 100;
    }

    draw() {
        context.fillStyle = 'red';
        context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }

    update() {
        this.draw();
        this.position.y += this.velocity.y;
        this.position.x += this.velocity.x;
        // Y axis collision detection
        if (this.position.y + this.height + this.velocity.y <= canvas.height) {
            // Check for bottom of canvas
            this.velocity.y += gravity;
        } else {
            // Reaches bottom
            this.velocity.y = 0;
        }
    }
}

class Platform {
    constructor() {
        this.position = {
            x: 500,
            y: 400,
        };
        this.height = 20;
        this.width = 300;
    }

    draw() {
        context.fillStyle = 'blue';
        context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}

const player = new Player();
const platform = new Platform();

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    platform.draw();

    // Track and modify x velocity on key press
    if (keys.right.isPressed) {
        player.velocity.x = 5;
    } else if (keys.left.isPressed) {
        player.velocity.x = -5;
    } else player.velocity.x = 0;

    // Platform collision detection
    if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
            platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
    ) {
        player.velocity.y = 0;
    }
}

animate();

window.addEventListener('keydown', ({ key }) => {
    console.log(key);
    switch (key) {
        case 'a':
            keys.left.isPressed = true;
            break;
        case 'd':
            keys.right.isPressed = true;
            break;
        case 'w':
            player.velocity.y -= 10;
            break;
        case 's':
            break;
        default:
            break;
    }
});

window.addEventListener('keyup', ({ key }) => {
    console.log(key);
    switch (key) {
        case 'a':
            keys.left.isPressed = false;
            break;
        case 'd':
            keys.right.isPressed = false;
            break;
        case 'w':
            player.velocity.y = 0;
            break;
        case 's':
            break;
        default:
            break;
    }
});
