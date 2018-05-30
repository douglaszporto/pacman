import Camera from "./Camera.class";

export default class Sprite {

    public img: HTMLImageElement;

    constructor(
        public file: string,
        public width: number,
        public height: number,
        public originX: number,
        public originY: number,
    ) {
        this.img = document.createElement("img");
        this.img.src = "sprites/" + this.file;

        document.getElementById("body").appendChild(this.img);
    }

    public render(context: any, x: number, y: number, camera: Camera) {
        context.drawImage(
            this.img,
            0,
            0,
            this.img.width,
            this.img.height,
            (x - this.originX) - camera.x,
            (y - this.originY) - camera.y,
            this.width,
            this.height,
        );
    }

}
