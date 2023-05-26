import { Container, IApplicationOptions, Rectangle, Renderer } from "pixi.js";

export class CustomPixiApp {
  public readonly stage: Container;

  public readonly renderer: Renderer;

  constructor(options?: Partial<IApplicationOptions>) {
    this.renderer = new Renderer(options);

    this.stage = new Container();
  }

  public get view(): HTMLCanvasElement {
    return this.renderer.view as HTMLCanvasElement;
  }

  public get screen(): Rectangle {
    return this.renderer.screen;
  }

  public render(): void {
    this.renderer.render(this.stage);
  }

  public destroy(removeView?: boolean): void {
    this.renderer.destroy(removeView);
  }
}
