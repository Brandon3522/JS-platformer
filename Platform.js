

export class Platform {
    constructor(context, x, y) {
        this.position = {
            x: x,
            y: y,
        };
        this.height = 20;
        this.width = 300;
		this.context = context;
    }

    draw(context) {
        this.context.fillStyle = 'blue';
        this.context.fillRect(
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
    }
}