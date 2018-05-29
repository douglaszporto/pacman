import Game from "./Engine/Game.class";
import Room from "./Engine/Room.class";
import Camera from "./Engine/Camera.class";
import Sprite from "./Engine/Sprite.class";
import KeyCodes from "./Engine/KeyCodes";
import SpriteSet from "./Engine/SpriteSet.class";
import SpriteTile from "./Engine/SpriteTile.class";
import ObjectElement from "./Engine/ObjectElement.class";

const game = new Game(1366, 768);

const tileSprite = new SpriteTile("tiles.png", 256, 256, 32, 32);

const playerSprite = new SpriteSet("heroes.png", 576, 512, 48, 64, 24, 32);
playerSprite.setAnimation('walkLeft', [60, 61, 62, 61]);
playerSprite.setAnimation('walkRight', [72, 73, 74, 73]);

const playerObject = new ObjectElement(playerSprite);
playerObject.animation.speed = 10;

playerObject.onKeyPress(KeyCodes.KEY_W, () => {
    playerObject.y -= 10;
});
playerObject.onKeyPress(KeyCodes.KEY_A, () => {
    playerObject.x -= 10;
    playerObject.animation.name = 'walkLeft';
    playerObject.animation.increment = 1;
});
playerObject.onKeyUp(KeyCodes.KEY_A, () => {
    playerObject.animation.increment = 0;
    playerObject.animation.frame = 1;
});
playerObject.onKeyPress(KeyCodes.KEY_S, () => {
    playerObject.y += 10;
});
playerObject.onKeyPress(KeyCodes.KEY_D, () => {
    playerObject.x += 10;
    playerObject.animation.name = 'walkRight';
    playerObject.animation.increment = 1;
});
playerObject.onKeyUp(KeyCodes.KEY_D, () => {
    playerObject.animation.increment = 0;
    playerObject.animation.frame = 1;
});

const camera = new Camera(1366, 768);

const arena1 = new Room("arena1", 5000, 1000, camera);
arena1.addObject(playerObject, 683, 384);

camera.onCenter(playerObject);

arena1.addTile(tileSprite, 0, 32, 0);
arena1.addTile(tileSprite, 1, 64, 0);
arena1.addTile(tileSprite, 1, 96, 0);
arena1.addTile(tileSprite, 1, 128, 0);
arena1.addTile(tileSprite, 1, 160, 0);
arena1.addTile(tileSprite, 2, 192, 0);

game.addRoom(arena1);
game.startMainLoop();
