var birds=[];
var pipes=[];

var canvas;
var height=400;
var width=360;
var ctx;
var counter=0;
var population=50;
var start=true;
var trainSpeed=0;
var generation=1;
var score=0;
var best_score=0;
var dead=0;
var alive=0;
var clouds=[];
var grounds=[];

var slider=document.getElementById("slider");

window.onload=function(){
  
  initWindow();
  getPipe();
  setupBirds();
  setupClouds();
  setupGround();
  
  setInterval(function(){
    if(start){
    draw();
    var co=0;
    while(co<=trainSpeed){
      AI();
      co++;
      update();
      checkBirds();
      
    }
    co=0;
    }
  },1000/60);

}
function initWindow(){
  canvas=document.getElementById("canvas");
  ctx=canvas.getContext("2d");
  canvas.width=width;
  canvas.height=550;
  
 
}
function setupClouds(){
      console.log("init clouds");
      var sky=new Background();
      sky.load();
      clouds.push(sky);
      var sky1=new Background();
      sky1.load();
      sky1.x=sky.x+sky.width;
      clouds.push(sky1);
      var sky2=new Background ();
      sky2.load();
      sky2.x=sky1.x+sky1.width;
      clouds.push(sky2);
        
      }
  function setupGround() {
    var ground = new Ground();
    ground.load();
    grounds.push(ground);
     var ground1 = new Ground();
     ground1.load();
    ground1.x = ground.x + ground.width;
    grounds.push(ground1);
     var ground2 = new Ground();
     ground2.load();
    ground2.x = ground1.x + ground1.width;
    grounds.push(ground2);
  
  }
      
function draw(){
  ctx.clearRect(0,0,width,height);
  for(i=0;i<clouds.length;i++){
    clouds[i].draw(ctx);
  }
  for (br of birds) {
    br.draw(ctx);
  }
 
  for (i = 0; i < pipes.length; i++) {
    pipes[i].draw(ctx);
  }
  for(ground of grounds){
    ground.draw(ctx)
  }
  ctx.fillStyle = "rgba(5,5,5,.5)";
  ctx.fillRect(10, 5, 300, 80);
  ctx.fillStyle="#fef43e";
  ctx.font="13px Courier New";
  ctx.fillText("Score: "+score,20,30);
  ctx.fillText("Best Score: "+best_score,150,30);
  ctx.fillText("Generation: "+generation,20,50);
  ctx.fillText("Population : "+population,150,50);
  ctx.fillText("Alive : "+alive,20,70);
}
function update(){
  counter++;
  //updatting birds;
  for(i=0;i<birds.length;i++){
    birds[i].update();
  }
  
  // updating pipes
  for (i=0;i<pipes.length;i++){
     pipes[i].update();
  }
  
  checkPipes();
  
  if(counter>(Math.random()*500)+200){
    getPipe();
    counter=0;
  }
  if(pipes.length==0){
    getPipe();
    counter=0;
  }
  score++;
  if(score>best_score){
    best_score=score;
  }
  for(i=0;i<clouds.length;i++){
    clouds[i].update();
  }

for (i=0;i<grounds.length;i++) {
  grounds[i].update();
}
}
function getPipe(){
  if(pipes.length==0){
    var pipe=new Pipe();
    pipe.x=width;
    pipes.push(pipe);
  }else{
    var pipe = new Pipe();
    pipes.push(pipe);
  }
  
}
function checkPipes(){
  for (i = 0; i < pipes.length; i++) {
    if(pipes[i].x+pipes[i].wide<0){
      pipes.splice(0,1);
     
    }
  }
}
function checkBirds(){
  for(i=0;i<birds.length;i++){
    birds[i].isAlive(pipes);
  }
}
function setupBirds(){
  for(i=0;i<population;i++){
    var bird=new Bird();
    birds.push(bird);
  }
}
function calcFit(){
  // Algorithm for calculating the performance of the birds 
  var total=0;
  for(i=0;i<birds.length;i++){
    total+=birds[i].score;
  }
  for(i=0;i<birds.length;i++){
    birds[i].fitness=birds[i].score/total;
  }
  return total;
}
function pick(){
  // Picking the bird that performed well to used for making new generation
  var picked;
  var max_fit=0;
  for(i=0;i<birds.length;i++){
    if(birds[i].fitness>max_fit){
      max_fit=birds[i].fitness;
      picked=birds[i];
    }
  }
  return picked;
}
function nextGeneration(){
  //This is the algorithm for creating new generation
  dead=0;
  generation++;
  score=0;
  calcFit();
  var parent=pick();
  birds=[];
  for(i=0;i<population;i++){
    var child=new Bird(parent.brain);
    child.mutate();
    birds.push(child);
  }
}

class Background{
  constructor(){
    this.sky;
    this.ground;
    this.y=300;
    this.x=0;
    this.width=400;
    this.height=500;
    this.speed=.1;
  }
  load(){
    this.sky = new Image();
    this.sky.src = "sky.png";
    
  }
  draw(ctx){
    ctx.drawImage(this.sky,this.x,0);
    }
  update(){
    this.x-=this.speed;
    if(this.x+this.width<0){
      this.x=this.width;
    }
}
}
class Ground{
  constructor(){
    this.ground;
    this.y=400;
    this.x=0
    this.width=600;
    this.height=500;
    this.speed=1;
  }
  load(){
    this.ground=new Image();
    this.ground.src="ground.png";
  
  }
  draw(ctx){
    ctx.drawImage(this.ground,this.x,this.y);  }
  update(){
    this.x-=this.speed;
    if(this.x+this.width<=0){
      this.x=this.width;
    }
  }
}

/*****
============The brain of birds
******/
function AI(){
  alive=0;
  for(b of birds){
    if(b.alive){
      alive++;
    }
  }
  dead=population-alive;
  if(dead<population){
    for (brd of birds) {
      brd.decide(pipes);
    }
  }else{
    // Generate new generation if all birds have dies
  nextGeneration();
  pipes = [];
    
  }
}
slider.oninput=function(){
  trainSpeed=slider.value;
}