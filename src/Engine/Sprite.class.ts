export default class Sprite {

    public img : HTMLImageElement;

    constructor(
        public file: String,
        public width: number,
        public height: number,
        public originX: number,
        public originY: number,
    ) { 
        this.img = document.createElement("img");
        this.img.src = "sprites/" + this.file;

        document.getElementById('body').appendChild(this.img);
    }

}