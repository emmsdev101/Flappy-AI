class Bird{
  
  /* @param {brain} passing a copy of NeuralNetwork
  */
  constructor(brain){
    this.x=80;
    this.y=width/2;
    this.width=45;
    this.height=35;
    this.color="#b35a24";
    this.brain;
    this.gravity=.3;
    this.y_velocity=0;
    this.alive=true;
    this.score=0;
    this.fitness;
    this.image=new Image();
    this.image.src="bird.png";
    this.bird_up=new Image();
    this.bird_up.src="bird_up.png";
    this.bird_down=new Image();
    this.bird_down.src="bird_down.png";
    this.offset=0;
    
    if(brain){
      /* 
      Checks if 'brain' is passed in this class. If so then make a copy of it otherwise make a new one.
      */
      this.brain=brain.copy();
    }else{
      /* @param {false} not passing a copy of NeuralNetwork */
      this.brain=new NeuralNetwork(false,4,5,1);
    }
    
  }
  draw(bctx){
    if(this.alive){
      
      bctx.save();
      bctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      bctx.rotate(Math.PI / 2 * this.y_velocity / 20);
      bctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
      bctx.restore();
    }
  }
  update(){
    if(this.alive){
      this.score++;
      this.y_velocity+=this.gravity;
      this.y+=this.y_velocity;
      
      if(this.y_velocity>7){
        this.y_velocity=7;
      }
      if (this.y<0) {
        this.alive=false;
      }
      if(this.y+this.height-5>=height){
        this.alive=false;
      }
   }
  }
  
  fly(){
    if(this.alive){
      this.y_velocity=-5;
  }
  }
  isAlive(pipes){
     var p = pipes[0];
     if (p.x + p.wide >= this.x) {
       p = pipes[0];
     } else {
       p = pipes[1];
     }
    if (this.x + this.width-5 >= p.x) {
      if (this.y-this.height+38<= p.y_top || this.y + this.height-5 >= p.y_bottom) {
        this.alive=false;
      }
    }
  }
 
  decide(pipes){
    if(this.alive){
      this.score++;
      var cPipe=pipes[0];
      var pipe_clst=pipes[0];
      if(pipe_clst.x+pipe_clst.wide>=this.x){
        pipe_clst=pipes[0];
      }else{
        pipe_clst=pipes[1];
      }
    
      var inputs = [];
      inputs[0]=pipe_clst.x/width;
      inputs[1]=(pipe_clst.y_top+(pipe_clst.space/2))/height;
      inputs[2]=this.y_velocity/height;
      inputs[3]=this.y/height;
      var decision=this.brain.gues(inputs)[0];
      if(decision>=.5){
        this.fly();
      }
      
      if(this.y>pipe_clst.y_top && this.y+this.height<pipe_clst.y_bottom){
        this.score+=3;
      }
    }  
  }
  mutate(){
    /* Mutating a neural network of this instance*/
    this.brain.mutate(0.1);
  }

}