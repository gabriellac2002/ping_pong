const elemento_canvas = document.querySelector("canvas");
const context_canvas = elemento_canvas.getContext("2d");    

const gap_x = 10;

const field = {
    width : window.innerWidth,
    height: window.innerHeight,
    draw: function(){
        context_canvas.fillStyle = "#286047";
        context_canvas.fillRect(0,0,window.innerWidth,window.innerHeight); 
    }
}

const line = {
    width: 15,
    height: field.height,
    draw: function(){
        const x = field.width/2 - this.width/2;
        const y = 0;
        context_canvas.fillStyle = "#ffffff";
        context_canvas.fillRect(x,y,this.width,this.height);  
    }
}

const leftPaddle = {
    x: gap_x,
    y: 100,
    width: line.width,
    height: 200,
    draw: function(){
        context_canvas.fillRect(this.x,this.y,this.width,this.height); 
    }
}

const rigthPaddle = {
    x: field.width - line.width - gap_x,
    y: 400,
    width: line.width,
    height: 200,
    draw: function(){
        context_canvas.fillRect(this.x,this.y,this.width,this.height); 
    }
}

const score = {
    human: 1,
    computer: 2,
    draw: function(){
        context_canvas.font = "bold 72px Arial";
        context_canvas.textAlign = "center";
        context_canvas.textBaseline = "top";
        context_canvas.fillStyle = "#01341D";
        context_canvas.fillText(
            this.human, 
            field.width / 4,
            50,
        );
        context_canvas.fillText(
            this.computer, 
            field.width / 4 + field.width/2,
            50,
        );
    }
}

const ball = { 
    x: 300,
    y:200,
    raio: 20,
    draw: function(){
        context_canvas.beginPath();
        context_canvas.arc(this.y,this.x,this.raio,0,2*Math.PI,false);
        context_canvas.fill();
    }
}

function setup()
{
    elemento_canvas.width = field.width;
    elemento_canvas.height = field.height;

    context_canvas.width = window.innerWidth;
    context_canvas.height = window.innerHeight;
}

function draw()
{
    field.draw();
    line.draw();
    leftPaddle.draw();
    rigthPaddle.draw();
    ball.draw();
    score.draw();
}

setup();
draw();