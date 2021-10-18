import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  Circle,
  clearCanvas,
  drawCircle,
  drawRectangle,
  getCanvasMousePos,
  Rectangle,
  Shape,
} from 'src/app/core/utils/canvas-shapes';

const LETTERS: string[] = Array.from('abcdefghijklmnopqrstuvwxyz');

const NUMBERS: string[] = [...Array(10).keys()].map((num) =>
  (num + 1).toString()
);
class Token extends Circle {
  text: string = '';
  jitterX: number = 0;
  jitterY: number = 0;
}

const SLOT_RADIUS = 60;
const SLOT_GAP = 20;
const TOKEN_RADIUS = 40;
const TOKEN_GAP = 50;
const PADDING = 100;
const Y_OFFSET = SLOT_RADIUS * 2 + SLOT_GAP * 4;
const JITTER_RANGE = Math.floor(TOKEN_GAP / 2);

@Component({
  selector: 'll-pipeline-scenario-page',
  templateUrl: './pipeline-scenario-page.component.html',
  styleUrls: ['./pipeline-scenario-page.component.scss'],
})
export class PipelineScenarioPageComponent implements OnInit, AfterViewInit {
  @ViewChild('pipelineCanvas')
  private canvasRef?: ElementRef<HTMLCanvasElement>;

  private canvas?: HTMLCanvasElement;

  private ctx?: CanvasRenderingContext2D | null;

  private shapes: Shape[] = [];

  private dragging = false;

  private draggingShape?: Shape | null;

  private tokens: any[] = [];

  private slotToken = new Circle();

  private colNum = 0;

  private rowNum = 0;

  constructor(private hostElement: ElementRef<HTMLElement>) {
    this.initTokens();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!this.canvasRef) return;
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.recalculate();
    this.draw();
  }

  initTokens() {
    this.tokens = [...NUMBERS, ...LETTERS].map((token) => ({
      text: token,
      jitterX: this.randomFromInterval(-JITTER_RANGE, JITTER_RANGE),
      jitterY: this.randomFromInterval(-JITTER_RANGE, JITTER_RANGE),
    }));
    this.shuffle(this.tokens);
  }

  shuffle(array: any[]) {
    for (let max = array.length - 1; max > 0; max--) {
      const j = Math.floor(Math.random() * (max + 1));
      [array[max], array[j]] = [array[j], array[max]];
    }
  }

  recalculate() {
    this.calcCanvasSize();
    this.calculateSlot();
    this.createShapes();
  }

  calcCanvasSize() {
    if (!this.canvas) return;
    const canvasWidth = this.hostElement.nativeElement.clientWidth;

    // Set the canvas width
    this.canvas.width = canvasWidth;

    // Calculate the number of possible columns based on token size
    this.colNum = Math.floor(
      (canvasWidth - PADDING) / (TOKEN_RADIUS * 2 + TOKEN_GAP)
    );
    this.rowNum = Math.ceil(this.tokens.length / this.colNum);

    this.canvas.height =
      Y_OFFSET + (TOKEN_RADIUS * 2 + TOKEN_GAP) * this.rowNum;
  }

  createShapes() {
    // Clear shapes
    this.shapes = [];

    for (let i = 0; i < this.tokens.length; i++) {
      const token = this.tokens[i];
      const tok = new Token();
      const row = Math.floor(i / this.colNum);
      const col = i % this.colNum;

      tok.radius = TOKEN_RADIUS;
      tok.fillColor = 'purple';
      tok.draggable = true;
      tok.text = token.text;

      tok.x =
        PADDING +
        col * (TOKEN_RADIUS * 2 + TOKEN_GAP) +
        TOKEN_RADIUS +
        token.jitterX;
      tok.y =
        Y_OFFSET +
        row * (TOKEN_RADIUS * 2 + TOKEN_GAP) +
        TOKEN_RADIUS / 2 +
        token.jitterY;

      this.shapes.push(tok);
    }
  }

  calculateSlot() {
    if (!this.canvas) return;
    this.slotToken.x = this.canvas.width / 2;
    this.slotToken.y = SLOT_GAP + SLOT_RADIUS;
    this.slotToken.radius = SLOT_RADIUS;
  }

  draw() {
    if (!this.ctx) return;

    // clear the canvas
    clearCanvas(this.canvas!);

    drawCircle(this.ctx!, this.slotToken);

    this.shapes.forEach((shape) => {
      if (shape instanceof Rectangle) {
        drawRectangle(this.ctx!, shape);
      }
      if (shape instanceof Circle) {
        drawCircle(this.ctx!, shape);
      }
      if (shape instanceof Token) {
        this.drawToken(this.ctx!, shape);
      }
    });
  }

  randomFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  drawToken(ctx: CanvasRenderingContext2D, token: Token) {
    const fontSize = 32;
    ctx.font = `${fontSize}px sans`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(token.text, token.x, token.y);
    // ctx.fill();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.dragging && this.draggingShape) {
      const mousePos = getCanvasMousePos(this.canvas!, e);

      // Update the position of the shape
      if (this.draggingShape instanceof Rectangle) {
        this.draggingShape.x = mousePos.x - this.draggingShape.width / 2;
        this.draggingShape.y = mousePos.y - this.draggingShape.height / 2;
      } else if (this.draggingShape instanceof Circle) {
        this.draggingShape.x = mousePos.x;
        this.draggingShape.y = mousePos.y;
      }

      // Draw the updated shape
      this.draw();
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    if (!this.dragging) return;
    this.dragging = false;
    this.draggingShape = null;
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(mouseClick: MouseEvent) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      // Get the shape and check if it's draggable
      const shape = this.shapes[i];
      if (!shape.draggable) continue;

      // If it is draggable, udpate it's position according to the mouse and it's type
      const mousePos = getCanvasMousePos(this.canvas!, mouseClick);
      if (shape instanceof Rectangle) {
        if (
          mousePos.x >= shape.x &&
          mousePos.x <= shape.x + shape.width &&
          mousePos.y >= shape.y &&
          mousePos.y <= shape.y + shape.height
        ) {
          this.dragging = true;
          this.draggingShape = shape;
          console.log(`Selected shape ${i}`);
          break;
        }
      } else if (shape instanceof Circle) {
        if (
          mousePos.x >= shape.x - shape.radius &&
          mousePos.x <= shape.x + shape.radius &&
          mousePos.y >= shape.y - shape.radius &&
          mousePos.y <= shape.y + shape.radius
        ) {
          this.dragging = true;
          this.draggingShape = shape;
          console.log(`Selected shape ${i}`);
          break;
        }
      }
    }
  }

  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.recalculate();
    this.draw();
  }
}
