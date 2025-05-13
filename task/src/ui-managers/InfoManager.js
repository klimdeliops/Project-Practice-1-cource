export class InfoManager {
  constructor(text) {
    this.text = text;
    this.isActive = true;
    this.timeoutId = null;
  }

  showInfo() {
    const infoBlock = document.getElementById("info-block");
    const infoMessage = document.getElementById("info-message");

    if (infoBlock && infoMessage) {
      console.log(`Showing message: ${this.text}`);

      infoMessage.textContent = this.text;
      infoBlock.style.display = "block";

      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.hideInfo();
      }, 5000);
    } else {
      console.error("InfoBlock elements not found!");
    }
  }

  hideInfo() {
    const infoBlock = document.getElementById("info-block");
    if (infoBlock) {
      infoBlock.style.display = "none";
    }
  }

  disable() {
    this.hideInfo();
    this.isActive = false;
  }
}
