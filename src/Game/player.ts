import SpriteSet from "../Engine/SpriteSet.class";
import ObjectElement from "../Engine/ObjectElement.class";
import KeyCodes from "../Engine/KeyCodes";


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

export default playerObject;
