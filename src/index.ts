import Game from './Engine/Game.class';
import Sprite from './Engine/Sprite.class';
import ObjectElement from './Engine/ObjectElement.class';
import Room from './Engine/Room.class';

let game = new Game(1366, 768);

let pacmanSprite = new Sprite('sprites.png', 32, 32, 16, 16);
let pacmanObject = new ObjectElement(pacmanSprite);

let level1 = new Room('level1');
level1.addObject(pacmanObject, 0, 0);

game.addRoom(level1);
game.startMainLoop();