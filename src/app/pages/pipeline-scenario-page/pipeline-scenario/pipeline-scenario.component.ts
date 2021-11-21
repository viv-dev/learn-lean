import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import {
  Circle,
  clearCanvas,
  drawCircle,
  drawRectangle,
  getCanvasMousePos,
  notValidShape,
  Rectangle,
  Shape,
} from 'src/app/core/utils/canvas-shapes';

import { shuffle } from 'src/app/core/utils/arrays';

const LETTERS: string[] = Array.from('abcdefghijklmnopqrstuvwxyz');

const NUMBERS: string[] = [...Array(10).keys()].map((num) =>
  (num + 1).toString()
);

class Token extends Circle {
  text: string = '';
}

interface TokenData {
  text: string;
  jitterX: number;
  jitterY: number;
}

// Token Config
const SLOT_RADIUS = 60;
const SLOT_GAP = 30;
const TOKEN_RADIUS = 40;
const TOKEN_GAP = 50;
const PADDING = 10;
const MAX_WIDTH = 1000;
const Y_OFFSET = SLOT_RADIUS * 2 + SLOT_GAP * 4;
const JITTER_RANGE = Math.floor(TOKEN_GAP / 2);

@Component({
  selector: 'll-pipeline-scenario',
  templateUrl: './pipeline-scenario.component.html',
  styleUrls: ['./pipeline-scenario.component.scss'],
})
export class PipelineScenarioComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input()
  set isActive(active: boolean) {
    if (active) {
      this.recalculate();
      this.draw();
    } else {
      if (this.canvas) clearCanvas(this.canvas);
    }
  }

  /**
   * View child of pipeline scenario component
   */
  @ViewChild('pipelineCanvas')
  private canvasRef?: ElementRef<HTMLCanvasElement>;

  /**
   * Canvas  of pipeline scenario component
   */
  private canvas?: HTMLCanvasElement;

  /**
   * Canvas context of pipeline scenario component
   */
  private ctx?: CanvasRenderingContext2D | null = null;

  /**
   * Shapes  of pipeline scenario component
   */
  private shapes: Shape[] = [];

  /**
   * Dragging  of pipeline scenario component
   */
  private dragging = false;

  /**
   * Dragging shape of pipeline scenario component
   */
  private draggingShape?: Shape | null = null;

  /**
   * Dragging original pos of pipeline scenario component
   */
  private draggingOriginalPos?: { x: number; y: number } | null = null;

  /**
   * Token datum of pipeline scenario component
   */
  private tokenDatum: TokenData[] = [];

  /**
   * Token order of pipeline scenario component
   */
  private tokenOrder: string[] = [];

  /**
   * Token slot of pipeline scenario component
   */
  private tokenSlot = new Circle();

  /**
   * Number of columns of tokens based on screen width
   */
  private colNum = 0;

  /**
   * Number of rows of tokens - determined by the
   * number of columns
   */
  private rowNum = 0;

  /**
   * X offset of pipeline scenario component
   */
  private xOffset = 0;

  /**
   * Creates an instance of pipeline scenario component.
   * @param hostElement
   */
  constructor(private hostElement: ElementRef<HTMLElement>) {
    this.initTokens();
  }

  /**
   * on init
   */
  ngOnInit(): void {}

  /**
   * after view init
   */
  ngAfterViewInit(): void {
    if (!this.canvasRef) return;
    this.canvas = this.canvasRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.recalculate();
    this.draw();
  }

  /**
   * on destroy
   */
  ngOnDestroy(): void {
    if (this.canvas) clearCanvas(this.canvas);
  }

  /**
   * Inits tokens
   */
  initTokens() {
    this.tokenDatum = [...NUMBERS, ...LETTERS].map((token) => ({
      text: token,
      jitterX: this.randomFromInterval(-JITTER_RANGE, JITTER_RANGE),
      jitterY: this.randomFromInterval(-JITTER_RANGE, JITTER_RANGE),
    }));
    this.tokenOrder = [...NUMBERS, ...LETTERS];
    shuffle(this.tokenDatum); // shuffle the order to draw the tokens
    shuffle(this.tokenOrder);
  }

  /**
   * Recalculates pipeline scenario component
   */
  recalculate() {
    this.calcCanvasSize();
    this.calculateSlot();
    this.createShapes();
  }

  /**
   * Calcs canvas size
   * @returns
   */
  calcCanvasSize() {
    if (!this.canvas) return;
    // Set the canvas width
    this.canvas.width = this.hostElement.nativeElement.clientWidth;

    // Make the canvas width match that of the host element
    const drawWidth =
      (this.canvas.width >= MAX_WIDTH ? MAX_WIDTH : this.canvas.width) -
      PADDING * 2;

    this.xOffset = (this.canvas.width - drawWidth) / 2 + TOKEN_RADIUS;

    // Calculate the number of possible columns based on token size
    this.colNum = Math.floor(drawWidth / (TOKEN_RADIUS * 2 + TOKEN_GAP));

    // Calculate the number of rows based on the number of columnts and tokens
    this.rowNum = Math.ceil(this.tokenDatum.length / this.colNum);

    // Determine the height of the canvas required to fit everything
    this.canvas.height =
      Y_OFFSET + (TOKEN_RADIUS * 2 + TOKEN_GAP) * this.rowNum;
  }

  /**
   * Creates shapes
   */
  createShapes() {
    // Clear shapes
    this.shapes = [];

    for (let i = 0; i < this.tokenDatum.length; i++) {
      const tokenData = this.tokenDatum[i];
      const token = new Token();
      const row = Math.floor(i / this.colNum);
      const col = i % this.colNum;

      token.radius = TOKEN_RADIUS;
      token.fillColor = '#455A64';
      token.strokeWidth = 8;
      token.strokeColor = '#37474F';

      token.draggable = true;
      token.text = tokenData.text;

      token.x =
        this.xOffset +
        col * (TOKEN_RADIUS * 2 + TOKEN_GAP) +
        TOKEN_RADIUS +
        tokenData.jitterX;
      token.y =
        Y_OFFSET +
        row * (TOKEN_RADIUS * 2 + TOKEN_GAP) +
        TOKEN_RADIUS / 2 +
        tokenData.jitterY;

      this.shapes.push(token);
    }
  }

  /**
   * Calculates slot
   * @returns
   */
  calculateSlot() {
    if (!this.canvas) return;
    this.tokenSlot.x = this.canvas.width / 2;
    this.tokenSlot.y = SLOT_GAP + SLOT_RADIUS;
    this.tokenSlot.radius = SLOT_RADIUS;
  }

  /**
   * Draws pipeline scenario component
   * @returns
   */
  draw() {
    if (!this.ctx) return;

    // clear the canvas
    clearCanvas(this.canvas!);

    drawCircle(this.ctx!, this.tokenSlot);

    this.shapes.forEach((shape) => {
      if (shape instanceof Rectangle) {
        drawRectangle(this.ctx!, shape);
      }
      if (shape instanceof Circle && !(shape instanceof Token)) {
        drawCircle(this.ctx!, shape);
      } else if (shape instanceof Token) {
        this.drawToken(this.ctx!, shape);
      }
    });
  }

  /**
   * Randoms from interval
   * @param min
   * @param max
   * @returns
   */
  randomFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Draws token
   * @param ctx
   * @param token
   * @returns
   */
  drawToken(ctx: CanvasRenderingContext2D, token: Token) {
    if (notValidShape(token)) return;

    if (token.fill) {
      ctx.beginPath();
      ctx.arc(token.x, token.y, token.radius, 0, Math.PI * 2);
      if (this.tokenOrder[0] === token.text) {
        ctx.fillStyle = 'green';
      } else {
        ctx.fillStyle = token.fillColor;
      }
      ctx.fill();
    }

    if (token.strokeWidth > 0) {
      ctx.lineWidth = token.strokeWidth > 0 ? token.strokeWidth : 1;
      ctx.strokeStyle = token.strokeColor;
      ctx.stroke();
    }

    const fontSize = 32;
    ctx.font = `${fontSize}px sans`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(token.text, token.x, token.y);
  }

  /**
   * Circles overlap
   * @param a
   * @param b
   * @returns
   */
  circlesOverlap(a: Circle, b: Circle) {
    const dX = a.x - b.x;
    const dY = a.y - b.y;
    const distance = Math.sqrt(dX * dX + dY * dY);
    const minDistance = a.radius + b.radius;
    if (distance < minDistance) return true;
    return false;
  }

  /**
   * Hosts listener
   * @param e
   */
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

  /**
   * Hosts listener
   * @param e
   * @returns
   */
  @HostListener('document:mouseup', ['$event'])
  onMouseUp(e: MouseEvent) {
    if (!this.dragging) return;

    let correctTokenSlotted = false;
    if (
      this.draggingShape instanceof Token &&
      this.draggingShape.text === this.tokenOrder[0]
    ) {
      if (this.circlesOverlap(this.tokenSlot, this.draggingShape)) {
        correctTokenSlotted = true;
        this.draggingShape.disabled = true;
        this.tokenOrder.shift();
      }
    }

    if (!correctTokenSlotted) {
      this.draggingShape!.x = this.draggingOriginalPos!.x;
      this.draggingShape!.y = this.draggingOriginalPos!.y;
    }
    this.dragging = false;
    this.draggingShape = null;
    this.draggingOriginalPos = null;
    this.draw();
  }

  /**
   * Hosts listener
   * @param mouseClick
   */
  @HostListener('document:mousedown', ['$event'])
  onMouseDown(mouseClick: MouseEvent) {
    for (let i = this.shapes.length - 1; i >= 0; i--) {
      // Get the shape and check if it's draggable
      const shape = this.shapes[i];
      if (!shape.draggable) continue;

      let selectable = false;

      // If it is draggable, udpate it's position according to the mouse and it's type
      const mousePos = getCanvasMousePos(this.canvas!, mouseClick);
      if (shape instanceof Rectangle) {
        if (
          mousePos.x >= shape.x &&
          mousePos.x <= shape.x + shape.width &&
          mousePos.y >= shape.y &&
          mousePos.y <= shape.y + shape.height
        ) {
          selectable = true;
        }
      } else if (shape instanceof Circle) {
        if (
          mousePos.x >= shape.x - shape.radius &&
          mousePos.x <= shape.x + shape.radius &&
          mousePos.y >= shape.y - shape.radius &&
          mousePos.y <= shape.y + shape.radius
        ) {
          selectable = true;
        }
      }

      if (selectable) {
        this.dragging = true;
        this.draggingShape = shape;
        this.draggingOriginalPos = { x: shape.x, y: shape.y };
        console.log(`Selected shape ${i}`);
      }
    }
  }

  /**
   * Hosts listener
   */
  @HostListener('window:resize', ['$event.target'])
  onResize() {
    this.recalculate();
    this.draw();
  }
}
