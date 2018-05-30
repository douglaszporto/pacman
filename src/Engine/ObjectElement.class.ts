import Sprite from "./Sprite.class";
import Camera from "./Camera.class";
import Room from "./Room.class";
import SpriteSet from "./SpriteSet.class";
import Game from "./Game.class";

export default class ObjectElement {

    public x: number;
    public y: number;
    public animation: any;
    public variables: any;
    public updateCallback: (gameState: Game, self: ObjectElement) => void;

    private keyEventsQueue: any;
    private keyEventsReleaseQueue: any;
    private keyEventsPressQueue: any;

    constructor(
        public sprite: Sprite,
    ) {
        this.animation = {
            name: typeof (this.sprite as SpriteSet).animations !== 'undefined' ? Object.keys((this.sprite as SpriteSet).animations)[0] : null,
            frame: 0,
            speed: 30,
            counter: 0,
            increment: 1,
        };

        this.keyEventsQueue = [];
        this.keyEventsReleaseQueue = [];
        this.keyEventsPressQueue = [];

        this.variables = {};

        this.updateCallback = (gameState: Game, self: ObjectElement) => {
            return;
        };
    }

    public onKeyPress(keyValue: number, callback: () => void) {
        this.keyEventsQueue.push({
            code: keyValue,
            callback,
        });
    }

    public onKeyUp(keyValue: number, callback: () => void) {
        this.keyEventsReleaseQueue.push({
            code: keyValue,
            callback,
        });
    }

    public render(context: any, camera: Camera) {
        if (this.sprite.file !== null) {
            if (this.sprite.img !== null) {
                if (this.animation.name === null) {
                    this.sprite.render(context, this.x, this.y, camera);
                } else {
                    (this.sprite as SpriteSet).renderFrame(
                        context,
                        this.x,
                        this.y,
                        camera,
                        (this.sprite as SpriteSet).animations[this.animation.name][this.animation.frame],
                    );

                    this.animation.counter += this.animation.increment;
                    if (this.animation.counter >= this.animation.speed ) {
                        this.animation.counter = 0;
                        this.animation.frame++;

                        if (this.animation.frame >= (this.sprite as SpriteSet).animations[this.animation.name].length ) {
                            this.animation.frame = 0;
                        }
                    }
                }
            }
        }

        context.strokeStyle = "#ff0000";
        context.strokeRect(
            (this.x - this.sprite.originX) - camera.x,
            (this.y - this.sprite.originY) - camera.y,
            this.sprite.width,
            this.sprite.height,
        );

        return;
    }

    public update(gameState: Game) {
        this.keyEventsQueue.forEach((keyEvent: any) => {
            if (gameState.keyStates[keyEvent.code] === true) {
                keyEvent.callback();
            }
        });

        this.keyEventsReleaseQueue.forEach((keyEvent: any) => {
            if (gameState.keyStatesReleased[keyEvent.code] === true) {
                keyEvent.callback();
            }
        });

        this.keyEventsPressQueue.forEach((keyEvent: any) => {
            if (gameState.keyStatesPressed[keyEvent.code] === true) {
                keyEvent.callback();
            }
        });

        if (this.updateCallback !== null) {
            this.updateCallback(gameState, this);
        }
    }
}
