export const pixiCanvasElem = document.querySelector<HTMLCanvasElement>(
  "#pixi-canvas"
)! as HTMLCanvasElement;
export const skiaCanvasElem = document.querySelector<HTMLCanvasElement>(
  "#skia-canvas"
)! as HTMLCanvasElement;

export function initCanvases(): void {
  initPixiCanvas();
  initSkiaCanvas();
}

export function initPixiCanvas(): void {
  const canvasElem = pixiCanvasElem;

  const WIDTH = document.body.offsetWidth;
  const HEIGHT = document.body.offsetHeight / 2;

  canvasElem.style.width = WIDTH + "px";
  canvasElem.style.height = HEIGHT + "px";

  canvasElem.width = WIDTH;
  canvasElem.height = HEIGHT;
}

export function initSkiaCanvas(): void {
  const canvasElem = skiaCanvasElem;

  const WIDTH = document.body.offsetWidth;
  const HEIGHT = document.body.offsetHeight / 2;

  canvasElem.style.width = WIDTH + "px";
  canvasElem.style.height = HEIGHT + "px";

  canvasElem.width = WIDTH;
  canvasElem.height = HEIGHT;
}
