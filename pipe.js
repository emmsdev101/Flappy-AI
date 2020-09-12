class Pipe {
  constructor() {
    this.x = width;
    this.space = 100;
    this.bound = this.randPos();
    this.y_top = this.bound;
    this.y_bottom = this.bound + this.space;
    this.wide = 82;
    this.speed = 1;
    this.pipe_top=new Image();
    this.pipe_bottom=new Image();
    this.pipe_top.src="pipe_top.png";
    this.pipe_bottom.src="pipe_bottom.png";
  }
  draw(pctx) {
    
    pctx.drawImage(this.pipe_top,this.x,this.y_top-568);
    pctx.drawImage(this.pipe_bottom,this.x,this.y_bottom);
  }
  update() {
    this.x -= this.speed;
  }
  randPos() {
    var space = Math.random() * (height - 150);
    if (space < 50) {
      space = 50;
    }
    return space;
  }
}