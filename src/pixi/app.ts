import { CustomPixiApp } from "./custom-pixi-app";
import { pixiCanvasElem } from "../init-canvases";

export const PIXI_APP = new CustomPixiApp({
  view: pixiCanvasElem,
  // resolution: devicePixelRatio,
  // autoDensity: true,
  width: document.body.offsetWidth,
  height: document.body.offsetHeight,
  antialias: true,
  background: 0xffffff,
  backgroundColor: 0xffffff,
  clearBeforeRender: true,
});

export const PIXI_STAGE = PIXI_APP.stage;
PIXI_STAGE.sortableChildren = true;

export function renderPixi(): void {
  PIXI_APP.render();
}
