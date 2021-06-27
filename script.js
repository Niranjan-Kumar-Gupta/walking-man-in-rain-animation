const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let rain = [];

class Rain{
    constructor(){
        this.x  = Math.random()*(canvas.width+200)+50;
        this.y  = -Math.random()*100-20;
        this.len = Math.random()*60+2;
        this.speedY = Math.random()*4+2;
        this.speedX = 0.5;
        this.speedCantrol = 3;
    }
    draw(){
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 1;
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x-this.len/16,this.y+this.len);
        ctx.stroke();
        ctx.closePath();
    }
    update(){
        if (this.len > 60) {
            this.y += this.speedY*1.5*this.speedCantrol;
            this.x -= this.speedX;
        }else if(this.len > 40){
            this.y += this.speedY*1.2*this.speedCantrol;
            this.x -= this.speedX;
        }else if(this.len > 20){
            this.y += this.speedY*0.8*this.speedCantrol;
            this.x -= this.speedX;
        }else if(this.len > 5){
            this.y += this.speedY*0.6*this.speedCantrol;
            this.x -= this.speedX;
        }
        else
        {
            this.y += this.speedY*0.3*this.speedCantrol;
            this.x -= this.speedX;
        }
    }
}
function initRain() {
    for (let i = 0; i < 800; i++) {
       rain.push(new Rain());
    }
}
initRain();

function handelRain() {
    rain.forEach((object,index)=>{
        object.draw();
        object.update();
        if(object.y > canvas.height + object.len || object.x < 0){
            rain.splice(index,1);
            rain.push(new Rain());
        }
    })
}

let cloudImg = new Image();
cloudImg.src = 'darkcloud2.png';
class Cloud{
    constructor(offsetX){
        this.x = Math.random()*canvas.width+offsetX;
        this.y = Math.random()-60;
        this.size = Math.random()*20*10;
        this.img = cloudImg;
        this.speedx = Math.random()*5+2;
    }
    draw(){
        ctx.drawImage(this.img,this.x,this.y,this.size,this.size*0.8);
    }
    update(){
        this.x -= this.speedx*0.5;
    }
}

let cloud = [];
function initCloud(){
    for (let i = 0; i < 1000; i++) {
        cloud.push(new Cloud(0)); 
    }
}
initCloud();
function addCloud() {
        cloud.push(new Cloud(canvas.width));
}

function handelCloud() {
    cloud.forEach((object,index)=>{
        object.draw();
        object.update();
        if(object.x < -object.size){
            cloud.splice(index,1);
            addCloud(); 
        }
    })
}



function clear() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

let girlspeed = 1;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'mountain5.png'
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'ground.jpg'
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'backgrass.png'
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'frontgrass.png'
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'field1.png';




class Layer{
    constructor(image,x,y,speedModifier,width,height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = girlspeed*this*speedModifier;
    }
    update(){
        this.speed = girlspeed*this.speedModifier;
        if (this.x <= -this.width) {
           this.x = 0;
        }
         this.x = Math.floor(this.x - this.speed); 
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
        ctx.drawImage(this.image,this.x + this.width,this.y,this.width,this.height);
    }
}

const layer1 = new Layer(backgroundLayer1,0,400,0.10,canvas.width,canvas.height/5);
const layer3 = new Layer(backgroundLayer3,0,655,6.5,canvas.width,backgroundLayer3.height/3.5);
const layer2 = new Layer(backgroundLayer2,0,780,4,canvas.width,backgroundLayer2.height);
//const layer4 = new Layer(backgroundLayer4,0,50,0.2,canvas.width,backgroundLayer4.height/8);
const layer5 = new Layer(backgroundLayer5,0,440,3.5,canvas.width,backgroundLayer5.height/2.5);

let layer = [layer1,layer2,layer3,layer5];
function handelLayer(){
    layer.forEach((object)=>{
        object.draw();
        object.update();
    })
}

let personImg = new Image();
personImg.src = 'person.png';
let personWidth = 372;
let personHeight = 750;
let framex = 0;
let gameframe = 0;

class Person{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    draw(){
        ctx.drawImage(personImg,personWidth*framex,0,personWidth,personHeight,this.x,this.y,200,400);
    }
   
}
let person = [];
person.push(new Person(400,420));
function handelPerson() {
    person[0].draw();
    if (gameframe % 4 == 0) {
        if (framex < 7) {
            framex++;
        }else{
            framex = 0;
        }
    }
    gameframe++;
}

class Flower{
    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.image = img
    }
    draw(){
        ctx.drawImage(this.image,this.x,this.y,200,200);
    }
    update(){
        this.x -= 4*girlspeed;
    }
}
let flower = [];
let flowerImg = new Image();
flowerImg.src = 'flower.png';
function addFlower() {
    flower.push(new Flower(canvas.width+100,550,flowerImg))
}
addFlower();
function handelflower() {
    flower.forEach((object,index)=>{
        object.draw();
        object.update();
        if (object.x < -150) {
            flower.splice(index,1);
            addFlower();
        }
    })
}
setInterval(()=>{
    clear();
    handelLayer();
   handelRain();
   handelCloud();
   handelflower();
   handelPerson();
  
},1000/60)