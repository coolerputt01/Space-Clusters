const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.imageSmoothingEnabled = false; 
class Star {
  constructor(){
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.dx = (Math.random() * 3) - 1.5;
  this.dy = (Math.random() * 3) - 1.5;
  this.speed = Math.random() *5;
  this.radius = Math.random() *5.5;
  }
  update(){
    this.x += this.dx;
    this.y += this.dy;
    if(this.x <= 0 || this.x >= canvas.width){
      this.dx = -this.dx;
    }
    if (this.y <= 0 || this.y >= canvas.width) {
      this.dy = -this.dy;
    }
    this.draw();
  }
  draw(){
    context.beginPath();
    context.arc(this.x,this.y,this.radius,2*Math.PI, false);
    context.shadowBlur = 15;
    context.shadowColor = "red"
    context.fillStyle = "#c1cbe6";
    context.fill();
    context.closePath();
  }
}
const stars = [];
for(let i = 0;i< 51;i++){
  stars.push(new Star());
}

function animateStar(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animateStar);
  stars.forEach(star => star.update());
}
animateStar();

//Typed.js
var typed = new Typed('#hero-text', {
  strings: ['Discover the secrets of your cosmos...'],
  showCursor:false,
  typeSpeed: 30,
});
