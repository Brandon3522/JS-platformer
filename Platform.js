

export class Platform {
    constructor(context, xPosition, yPosition) {
        this.position = {
            x: xPosition,
            y: yPosition,
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