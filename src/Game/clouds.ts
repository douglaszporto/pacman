import Sprite from "../Engine/Sprite.class";
import ObjectElement from "../Engine/ObjectElement.class";
import KeyCodes from "../Engine/KeyCodes";
import Game from "../Engine/Game.class";

const cloudsSprite = new Sprite("cloud1.png", 131, 71, 65, 35);
const clouds: any[] = [];

const updateCallback = (gameState: Game, self: ObjectElement) => {
    self.x -= self.variables.speed;

    if (self.x < -self.sprite.width) {
        self.x = gameState.rooms[gameState.activeRoomIndex].width + self.sprite.width;
    }
};

for (let i = 0; i < 12; i++) {
    const cloud = new ObjectElement(cloudsSprite);
    cloud.variables.speed = 0.5 * Math.random() + 0.01;
    cloud.updateCallback = updateCallback;

    clouds.push({
        obj: cloud,
        x: 5000 * Math.random(),
        y: 200 * Math.random() + 50,
    });

}

export default clouds;
