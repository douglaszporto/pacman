export default class SpriteTile {

    public img: HTMLImageElement;

    private tilesByWidth: number;

    constructor(
        public file: string,
        public imgWidth: number,
        public imgHeight: number,
        public tileWidth: number,
        public tileHeight: number,
    ) {
        this.img = document.createElement("img");
        this.img.src = "sprites/" + this.file;

        document.getElementById("body").appendChild(this.img);

        this.tilesByWidth = Math.ceil(this.imgWidth / this.tileWidth);
    }

    public render(context: any, id: number, x: number, y: number) {

        const posX = id % this.tilesByWidth;
        const posY = Math.floor(id / this.tilesByWidth);

        if (this.img !== null) {
            context.drawImage(
                this.img,
                this.tileWidth * posX,
                this.tileHeight * posY,
                this.tileWidth,
                this.tileHeight,
                x,
                y,
                this.tileWidth,
                this.tileHeight,
            );
        }
    }

}
