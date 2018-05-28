import Sprite from "./Sprite.class";

export default class ObjectElement{

    public x: number;
    public y: number;

    constructor(
        public sprite: Sprite,
    ) {
    }

    render(context: any) {
        if (this.sprite.file === null) {
            context.fillStyle="#ff0000";
            context.fillRect(
                this.x - this.sprite.originX, 
                this.y - this.sprite.originY, 
                this.sprite.height, 
                this.sprite.width
            );
        } else {
            if (this.sprite.img !== null) {
                context.drawImage(
                    this.sprite.img, 
                    0, 
                    0, 
                    this.sprite.img.clientWidth, 
                    this.sprite.img.clientHeight,
                    this.x - this.sprite.originX, 
                    this.y - this.sprite.originY, 
                    this.sprite.height, 
                    this.sprite.width
                );
            }

            context.fillStyle="#ff0000";
            context.rect(
                this.x - this.sprite.originX, 
                this.y - this.sprite.originY, 
                this.sprite.height, 
                this.sprite.width
            );
        }

        return;
    }
}