import Room from "./Room.class";

export default class Game {
    public canvas: HTMLCanvasElement;
    public context: any;

    public debugMode: boolean;
    public rooms: Room[];
    public activeRoomIndex: number;

    public keyStates: boolean[];
    public keyStatesReleased: boolean[];
    public keyStatesPressed: boolean[];

    public fps: any;

    constructor(
        private width: number,
        private height: number,
    ) {
        this.canvas =  document.getElementById("canvas") as HTMLCanvasElement;
        this.context = this.canvas.getContext("2d");
        this.rooms = [];
        this.activeRoomIndex = null;
        this.debugMode = true;

        this.fps = {
            lastTime : performance.now(),
            lastCheck: 0,
            frames : 0,
        };

        this.keyStates = (Array(256) as any).fill(false, 0, 256);
        this.keyStatesReleased = (Array(256) as any).fill(false, 0, 256);
        this.keyStatesPressed = (Array(256) as any).fill(false, 0, 256);
    }

    public startMainLoop() {
        document.addEventListener('keydown', (event) => {
            this.keyStates[event.which] = true;
            this.keyStatesPressed[event.which] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keyStates[event.which] = false;
            this.keyStatesReleased[event.which] = true;
        });

        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            return;
        });
    }

    public addRoom(room: Room) {
        this.rooms.push(room);

        if (this.activeRoomIndex === null) {
            this.activeRoomIndex = 0;
        }
    }

    private renderFPS() {
        const now = performance.now();

        if (now - this.fps.lastCheck > 500) {
            const delta = now - this.fps.lastTime;
            this.fps.frames = Math.ceil(1000 / delta);
            this.fps.lastCheck = now;
        }

        this.fps.lastTime = now;

        this.context.font = "15px 'Courier New'";
        this.context.strokeStyle = "#ffff00";
        this.context.strokeText(this.fps.frames, 0, 10);

    }

    private update() {
        if (typeof this.rooms[this.activeRoomIndex] === "undefined") {
            return;
        }

        this.rooms[this.activeRoomIndex].objects.forEach((obj) => {
            obj.update(this);
        });

        this.rooms[this.activeRoomIndex].camera.update();

        this.keyStatesReleased = (Array(256) as any).fill(false, 0, 256);
        this.keyStatesPressed = (Array(256) as any).fill(false, 0, 256);
    }

    private render() {
        this.context.fillStyle = "#000000";
        this.context.fillRect(0, 0, this.width, this.height);

        if (typeof this.rooms[this.activeRoomIndex] !== "undefined") {


            // Render room bound-box
            this.context.strokeStyle = "#00ff00";
            this.context.strokeRect(
                -this.rooms[this.activeRoomIndex].camera.x,
                -this.rooms[this.activeRoomIndex].camera.y,
                this.rooms[this.activeRoomIndex].width,
                this.rooms[this.activeRoomIndex].height,
            );
            this.context.beginPath();
            this.context.moveTo(
                -this.rooms[this.activeRoomIndex].camera.x,
                -this.rooms[this.activeRoomIndex].camera.y);
            this.context.lineTo(
                this.rooms[this.activeRoomIndex].width - this.rooms[this.activeRoomIndex].camera.x,
                this.rooms[this.activeRoomIndex].height - this.rooms[this.activeRoomIndex].camera.y);
            this.context.stroke();

            this.context.moveTo(
                -this.rooms[this.activeRoomIndex].camera.x,
                this.rooms[this.activeRoomIndex].height - this.rooms[this.activeRoomIndex].camera.y);
            this.context.lineTo(
                this.rooms[this.activeRoomIndex].width - this.rooms[this.activeRoomIndex].camera.x,
                -this.rooms[this.activeRoomIndex].camera.y);
            this.context.stroke();




            // Render all tiles
            (Object as any).values(this.rooms[this.activeRoomIndex].tiles).forEach((obj: any) => {
                obj.positions.forEach((pos: any) => {
                    obj.sprite.render(
                        this.context,
                        pos.id,
                        pos.x - this.rooms[this.activeRoomIndex].camera.x,
                        pos.y - this.rooms[this.activeRoomIndex].camera.y,
                    );
                });
            });




            // Render all objects
            this.rooms[this.activeRoomIndex].objects.forEach((obj) => {
                obj.render(this.context, this.rooms[this.activeRoomIndex].camera);
            });
        }

        this.renderFPS();

        window.requestAnimationFrame(() => {
            this.update();
            this.render();
            return;
        });
    }

}
