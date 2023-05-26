import "./style.css";
import { initCanvases } from "./init-canvases";
import { PIXI_STAGE, renderPixi } from "./pixi/app";
import { initSkia, renderTextBySkia } from "./initSkia";
import { Graphics, Texture } from "pixi.js";
import { PixiSkiaText } from "./pixi/pixi-skia-text";

initCanvases();

const graphics = new Graphics();
graphics.beginFill(0x0000ff);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();
graphics.zIndex = 1;

const graphics2 = new Graphics();
graphics2.beginFill(0x00ff00);
graphics2.drawCircle(50, 50, 100);
graphics2.endFill();
graphics2.position.set(150, 100);
graphics2.zIndex = 0;

const skiaPixiText = new PixiSkiaText(Texture.WHITE);
skiaPixiText.width = 75;
skiaPixiText.height = 75;
skiaPixiText.position.set(110, 110);
skiaPixiText.tint = 0xff0000;
skiaPixiText.zIndex = 0.5;

PIXI_STAGE.addChild(graphics);
PIXI_STAGE.addChild(graphics2);
PIXI_STAGE.addChild(skiaPixiText);

renderPixi();

await initSkia();

const str =
  "The quick brown fox 🦊 ate a zesty hamburgerfons 🍔.\nThe 👩‍👩‍👧‍👧 laughed.";
renderTextBySkia(str, true);
