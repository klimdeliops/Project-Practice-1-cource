import { Axis, Space } from "@babylonjs/core";

export class PlayerController {
  constructor(scene) {
    // Moving variables
    this.rotateOffset = Math.PI / 80;
    this.translateOffset = 0.15;
    // Player data
    this.playerPivot = scene.getMeshByName("PlayerPivot");
    // Event listener
    window.addEventListener("keydown", (event) => this.onKeyDown(event.code));
  }
  onKeyDown(eventCode) {
    switch (eventCode) {
      case "KeyA": {
        this.playerPivot.rotate(Axis.Y, -this.rotateOffset, Space.LOCAL);
        break;
      }
      case "KeyD": {
        this.playerPivot.rotate(Axis.Y, this.rotateOffset, Space.LOCAL);
        break;
      }
      case "KeyW": {
        this.playerPivot.translate(Axis.X, -this.translateOffset, Space.LOCAL);
        break;
      }
      case "KeyS": {
        this.playerPivot.translate(Axis.X, this.translateOffset, Space.LOCAL);
        break;
      }

      default:
        break;
    }
  }
}
