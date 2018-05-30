import Game from "./Engine/Game.class";
import Room from "./Engine/Room.class";
import Camera from "./Engine/Camera.class";
import Sprite from "./Engine/Sprite.class";
import KeyCodes from "./Engine/KeyCodes";
import SpriteSet from "./Engine/SpriteSet.class";
import SpriteTile from "./Engine/SpriteTile.class";
import ObjectElement from "./Engine/ObjectElement.class";

import playerObject from "./Game/player";
import cloudObject from "./Game/clouds";

const game = new Game(1366, 768);
const camera = new Camera(1366, 768);
const tileSprite = new SpriteTile("tiles.png", 256, 256, 32, 32);

const arena1 = new Room("arena1", 5000, 1000, camera);
arena1.addObject(playerObject, 683, 384);

cloudObject.forEach((cloud) => {
    arena1.addObject(cloud.obj, cloud.x, cloud.y);
});

camera.onCenter(playerObject);

arena1.addTile(tileSprite, 0, 32, 0);
arena1.addTile(tileSprite, 1, 64, 0);
arena1.addTile(tileSprite, 1, 96, 0);
arena1.addTile(tileSprite, 1, 128, 0);
arena1.addTile(tileSprite, 1, 160, 0);
arena1.addTile(tileSprite, 2, 192, 0);

game.addRoom(arena1);
game.startMainLoop();
