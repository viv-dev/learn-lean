export class Shape {
  x: number = 0;
  y: number = 0;
  fill: boolean = true;
  fillColor: string = 'black';
  stroke: boolean = false;
  strokeColor: string = 'black';
  strokeWidth: number = 1;
  draggable: boolean = false;
}

export class Circle extends Shape {
  radius: number = 1;
}

export function drawCircle(ctx: CanvasRenderingContext2D, circle: Circle) {
  if (!circle.fill && !circle.stroke) return;

  if (circle.fill) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.fillColor;
    ctx.fill();
  }

  if (circle.stroke) {
    ctx.lineWidth = circle.strokeWidth > 0 ? circle.strokeWidth : 1;
    ctx.strokeStyle = circle.strokeColor;
    ctx.stroke();
  }
}

export class Rectangle extends Shape {
  width: number = 1;
  height: number = 1;
}

export function drawRectangle(
  ctx: CanvasRenderingContext2D,
  rectangle: Rectangle
) {
  // We can't draw a shape if there's no stroke or fill set
  if (!rectangle.fill && !rectangle.stroke) return;

  // Draw the fill if required
  if (rectangle.fill) {
    ctx.fillStyle = rectangle.fillColor;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }

  // Draw the stroke if required
  if (rectangle.stroke) {
    ctx.lineWidth = rectangle.strokeWidth > 0 ? rectangle.strokeWidth : 1;
    ctx.strokeStyle = rectangle.strokeColor;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }
}

export function getCanvasMousePos(
  canvas: HTMLCanvasElement,
  mouseClick: MouseEvent
) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: mouseClick.clientX - rect.left,
    y: mouseClick.clientY - rect.top,
  };
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
