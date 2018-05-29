import ObjectElement from "./ObjectElement.class";
import SpriteTile from "./SpriteTile.class";
import Room from "./Room.class";

export default class Camera {

    public x: number;
    public y: number;

    public room: Room;
    public followingObj: ObjectElement;

    constructor(
        public viewportWidth: number,
        public viewportHeight: number,
    ) {

    }

    public onCenter(obj: ObjectElement) {
        this.followingObj = obj;

        this.follow();
    }

    public update() {
        this.follow();
    }



    private follow() {
        this.x = Math.min(
            Math.max(0, this.followingObj.x - this.viewportWidth / 2),
            this.room.width - this.viewportWidth,
        );

        this.y = Math.min(
            Math.max(0, this.followingObj.y - this.viewportHeight / 2),
            this.room.height - this.viewportHeight,
        );
    }

}
