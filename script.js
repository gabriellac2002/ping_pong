const elemento_canvas = document.querySelector("canvas");
const context_canvas = elemento_canvas.getContext("2d");    

const gap_x = 10;

const mouse = { x: 10, y:10 }

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
    y: 0,
    width: line.width,
    height: 200,
    _move: function(){
        this.y = mouse.y - this.height/2
    },
    draw: function(){
        context_canvas.fillRect(this.x,this.y,this.width,this.height); 

        this._move();
    }
}

const rigthPaddle = {
    x: field.width - line.width - gap_x,
    y: 400,
    width: line.width,
    height: 200,
    _move: function(){
        this.y = ball.y
    },
    draw: function(){
        context_canvas.fillRect(this.x,this.y,this.width,this.height); 

        this._move();
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
    speed: 5,
    _move: function(){
        this.x += 1 * this.speed;
        this.y += 1 * this.speed;
    },
    draw: function(){
        context_canvas.beginPath();
        context_canvas.arc(this.y,this.x,this.raio,0,2*Math.PI,false);
        context_canvas.fill();

        this._move();
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

window.animateFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
        return window.setTimeout(callback, 1000 / 60)
        }
    )
})()

function main() {
    animateFrame(main)
    draw()
}

setup()
main()

elemento_canvas.addEventListener('mousemove', function(e){
    mouse.x = e.pageX;
    mouse.y = e.pageY;
})