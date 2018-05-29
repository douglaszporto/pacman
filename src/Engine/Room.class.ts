import ObjectElement from "./ObjectElement.class";
import SpriteTile from "./SpriteTile.class";
import Camera from "./Camera.class";

export default class Room {

    public objects: ObjectElement[];
    public tiles: any;

    constructor(
        public name: string,
        public width: number,
        public height: number,
        public camera: Camera,
    ) {
        this.objects = [];
        this.tiles = {};

        camera.room = this;
    }

    public addObject(object: ObjectElement, x: number, y: number) {
        object.x = x;
        object.y = y;
        this.objects.push(object);
    }

    public addTile(sprite: SpriteTile, id: number, x: number, y: number) {
        const index = this.tiles[sprite.file];
        if (typeof index === 'undefined') {
            this.tiles[sprite.file] = {
                sprite,
                positions: [{id, x, y}],
            };
        } else {
            this.tiles[sprite.file].positions.push({id, x, y});
        }
    }


}
