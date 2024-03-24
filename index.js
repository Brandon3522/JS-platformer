import { Platform } from "./Platform.js";
import { Player } from "./player.js";

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

const player = new Player(context, gravity);
const platforms = [
	new Platform(context, 500, 400),
	new Platform(context, 200, 300)
];

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
	for (const platform of platforms) {
		platform.draw();
	}

    // Track and modify x velocity on key press
	// Scroll background
    if (keys.right.isPressed) {
        player.velocity.x = 5;
		for (const platform of platforms) {
			platform.position.x -= 5;
		}
		
    } else if (keys.left.isPressed) {
        player.velocity.x = -5;
		for (const platform of platforms) {
			platform.position.x += 5;
		}
    } else player.velocity.x = 0;

    // Platform collision detection
	platforms.forEach( (platform) => {
		if (
			// Top of platform
			player.position.y + player.height <= platform.position.y &&
			player.position.y + player.height + player.velocity.y >= platform.position.y &&
			
			// Platform sides
			player.position.x + player.width >= platform.position.x &&
			player.position.x <= platform.position.x + platform.width
		) {
			console.log(`Player y: ${player.position.y}, Player x: ${player.position.x}`);
			console.log(`Platform y: ${platform.position.y}`);
			player.velocity.y = 0;
		}
	 });

	// Wall collision
	// if (
	// 	// Left wall
	// 	player.position.x < 0 ||
	// 	player.position.x + player.width > canvas.innerWidth
	// ) {
	// 	player.velocity.x = 0;
	// }
   

	// if (
	// 	// Bottom of platform
	// 	// player.position.y + player.width >= platform.position.y &&
	// 	// player.position.y + player.width + player.velocity.y <= platform.position.y + platform.width
	// 	// player.position.y <= platform.position.y + platform.height &&
	// 	// player.position.y + player.velocity.y > platform.position.y + platform.height &&
	// 	// player.position.x + player.width > platform.position.x &&
	// 	// player.position.x < platform.position.x + platform.width
	// ) {
	// 	player.velocity.y = 0;
	// }
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
