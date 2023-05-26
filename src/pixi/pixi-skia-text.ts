import { Renderer, Sprite } from "pixi.js";

export class PixiSkiaText extends Sprite {
  private text: string = "";

  // Хотим чтобы эта штука рендерила текст из skia
  render(renderer: Renderer) {
    super.render(renderer);
  }

  setText(text: string): void {
    this.text = text;
  }
}
