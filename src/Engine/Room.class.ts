import ObjectElement from "./ObjectElement.class";

export default class Room {

    public objects: ObjectElement[];

    constructor(
        public name: String
    ) {
        this.objects = [];
    }

    addObject(object: ObjectElement, x: number, y: number) {
        object.x = x;
        object.y = y;
        this.objects.push(object);
    }

}