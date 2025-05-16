import { InfoManager } from "./../ui-managers/InfoManager";

export class TargetController {
  constructor(scene, index, text) {
    this.index = index;
    this.tname = "Target" + this.index;
    this.cname = "Crystal" + this.index;

    this.scene = scene;
    this.player = scene.getMeshByName("Player");
    this.target = scene.getMeshByName(this.tname);
    this.crystal = scene.getMeshByName(this.cname);

    if (!this.target) console.error(`Mesh ${this.tname} not found!`);
    if (!this.crystal) console.error(`Mesh ${this.cname} not found!`);

    this.isPlayerInside = false;
    this.wasCrystalTaken = false;
    this.infoManager = new InfoManager(text);

    this.scene.registerBeforeRender(() => this.update());
    window.addEventListener("keydown", (e) => this.onKeyDown(e.code));
  }

  update() {
    if (this.player.intersectsMesh(this.target)) {
      this.onTriggerEnter();
    } else {
      this.onTriggerExit();
    }
  }

  onTriggerEnter() {
    if (
      !this.isPlayerInside &&
      !this.wasCrystalTaken &&
      this.crystal.visibility > 0
    ) {
      this.isPlayerInside = true;
      this.infoManager.showInfo();
    }
  }

  onTriggerExit() {
    if (this.isPlayerInside) {
      this.isPlayerInside = false;
      this.infoManager.hideInfo();
    }
  }

  onKeyDown(eventCode) {
    if (eventCode === "KeyE" && this.isPlayerInside && !this.wasCrystalTaken) {
      this.crystal.visibility = 0;
      this.wasCrystalTaken = true;
      this.infoManager.hideInfo();
    }
  }
}
