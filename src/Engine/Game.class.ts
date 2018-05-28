import Room from "./Room.class";

export default class Game{
    canvas: HTMLCanvasElement;
    context: any;

    rooms: Room[];
    activeRoomIndex: number;

    constructor(
        private width: number, 
        private height: number
    ){
        this.canvas =  <HTMLCanvasElement> document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.rooms = [];
        this.activeRoomIndex = null;
    }

    startMainLoop() {
        window.requestAnimationFrame(() => {this.render(); return;});
    }

    render() {
        this.context.fillStyle="#000000";
        this.context.fillRect(0, 0, this.width, this.height);

        if (typeof this.rooms[this.activeRoomIndex] !== 'undefined') {
            this.rooms[this.activeRoomIndex].objects.forEach((obj) => {
                obj.render(this.context);
            });
        }
    }

    addRoom(room: Room) {
        this.rooms.push(room);

        if (this.activeRoomIndex === null) {
            this.activeRoomIndex = 0;
        }
    }
}