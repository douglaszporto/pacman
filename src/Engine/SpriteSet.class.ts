import Sprite from "./Sprite.class";
import Camera from "./Camera.class";

export default class SpriteSet extends Sprite {

    public img: HTMLImageElement;
    public animations: any;

    private spritesByWidth: number;


    constructor(
        public file: string,
        public imgWidth: number,
        public imgHeight: number,
        spriteWidth: number,
        spriteHeight: number,
        spriteOriginX: number,
        spriteOriginY: number,
    ) {
        super(file, spriteWidth, spriteHeight, spriteOriginX, spriteOriginY);

        this.spritesByWidth = Math.ceil(this.imgWidth / spriteWidth);
        this.animations = {};
    }

    public setAnimation(name: string, frames: number[]) {
        this.animations[name] = frames;
    }

    public renderFrame(context: any, x: number, y: number, camera: Camera, frame: number) {

        const posX = frame % this.spritesByWidth;
        const posY = Math.floor(frame / this.spritesByWidth);

        context.drawImage(
            this.img,
            this.width * posX,
            this.height * posY,
            this.width,
            this.height,
            (x - this.originX) - camera.x,
            (y - this.originY) - camera.y,
            this.height,
            this.width,
        );
    }
}
