// @ts-ignore
import CanvasKitInit from "canvaskit-wasm/bin/profiling/canvaskit.js";
import CanvasKitWasm from "canvaskit-wasm/bin/profiling/canvaskit.wasm?url";
import { Canvas, CanvasKit, Paint, Surface } from "canvaskit-wasm";
import { skiaCanvasElem } from "./init-canvases";

export let SKIA_SURFACE: Surface = null!;
export let SKIA_PAINT: Paint = null!;
export let SKIA_CANVAS: Canvas = null!;
export let CANVAS_KIT: CanvasKit = null!;
let robotoData: ArrayBuffer | null = null;
let emojiData: ArrayBuffer | null = null;

const fontPromise = fetch(
  "https://storage.googleapis.com/skia-cdn/google-web-fonts/Roboto-Regular.ttf"
).then((resp) => {
  resp.arrayBuffer().then((buffer) => {
    robotoData = buffer;
  });
});

const emojiPromise = fetch(
  "https://storage.googleapis.com/skia-cdn/misc/NotoColorEmoji.ttf"
).then((resp) => {
  resp.arrayBuffer().then((buffer) => {
    emojiData = buffer;
  });
});

export async function initSkia(): Promise<void> {
  const canvasElem = skiaCanvasElem;

  await fontPromise;

  await emojiPromise;

  await CanvasKitInit({ locateFile: () => CanvasKitWasm }).then(
    (CanvasKit: CanvasKit) => {
      const surface = CanvasKit.MakeWebGLCanvasSurface(canvasElem, undefined, {
        antialias: 1,
      })!;
      const paint = new CanvasKit.Paint();

      paint.setColor(CanvasKit.Color4f(0.9, 0, 0, 1.0));
      paint.setStyle(CanvasKit.PaintStyle.Fill);
      paint.setAntiAlias(true);

      CANVAS_KIT = CanvasKit;
      SKIA_SURFACE = surface;
      SKIA_PAINT = paint;
      SKIA_CANVAS = surface.getCanvas()!;
      SKIA_CANVAS.clear(CanvasKit.WHITE);
    }
  );
}

export function renderTextBySkia(text: string, clearCanvas: boolean): void {
  // @ts-ignore
  const fontMgr = CANVAS_KIT.FontMgr.FromData([robotoData, emojiData])!;

  const paraStyle = new CANVAS_KIT.ParagraphStyle({
    textStyle: {
      color: CANVAS_KIT.RED,
      fontFamilies: ["Roboto", "Noto Color Emoji"],
      fontSize: 16,
    },
    textAlign: CANVAS_KIT.TextAlign.Left,
    maxLines: 7,
    ellipsis: "...",
  });

  const builder = CANVAS_KIT.ParagraphBuilder.Make(paraStyle, fontMgr);
  builder.addText(text);

  const paragraph = builder.build();

  paragraph.layout(350);

  if (clearCanvas) {
    SKIA_CANVAS.clear(CANVAS_KIT.WHITE);
  }

  SKIA_CANVAS.drawParagraph(paragraph, 10, 10);

  // Нужно чтобы реально отрендерить на канвас, без этого все рендеры просто ставятся в очередь
  SKIA_SURFACE.flush();
}
