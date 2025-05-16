import { PlayerController } from "./PlayerController";
import { TargetController } from "./TargetController";
import { TimeManager } from "../ui-managers/TimeManager";

export class GameManager {
  // В GameManager.js
  setupLOD() {
    const highPolyMesh = this.scene.getMeshByName("Crystal1");
    const lowPolyMesh = highPolyMesh.clone("Crystal1_Low");
    lowPolyMesh.simplify([{ distance: 30, quality: 0.5 }]);
    highPolyMesh.lodLevels = [
      { distance: 0, mesh: highPolyMesh },
      { distance: 20, mesh: lowPolyMesh },
    ];
  }
  constructor(scene) {
    new PlayerController(scene);
    this.timeManager = new TimeManager(scene);
    this.targetObjects = [];
    [1, 2, 3].map((index) => {
      this.targetObjects.push(
        new TargetController(
          scene,
          index,
          `Поздравляю! Ты нашел кристалл ${index}. Нажми \"E\" чтобы его забрать.`
        )
      );
    });

    this.player = scene.getMeshByName("Player");
    this.door = scene.getMeshByName("DoorPivot");

    scene.registerBeforeRender(() => this.update());
  }
  // В GameManager.js
  setupLOD() {
    const highPolyMesh = this.scene.getMeshByName("Crystal1");
    const lowPolyMesh = highPolyMesh.clone("Crystal1_Low");
    lowPolyMesh.simplify([{ distance: 30, quality: 0.5 }]);
    highPolyMesh.lodLevels = [
      { distance: 0, mesh: highPolyMesh },
      { distance: 20, mesh: lowPolyMesh },
    ];
  }
  update() {
    const areTargetsTaken = this.targetObjects.every(
      (target) => target.wasCrystalTaken
    );

    if (this.timeManager.time <= 0) {
      this.showTimeInfo("ИГРА ОКОНЧЕНА!");
    }

    if (this.timeManager.time > 0 && areTargetsTaken) {
      if (this.player.intersectsMesh(this.door)) {
        this.showTimeInfo("ПОБЕДА!");
      } else {
        this.showTimeInfo(
          "Отлично, теперь найди арку и пройди сквозь нее, чтобы победить."
        );
      }
    }
  }
  showTimeInfo(text) {
    this.timeManager.isTimeActive = false;
    this.timeManager.timeInfo.innerText = text;
  }
}
