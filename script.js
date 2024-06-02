const elemento_canvas = document.querySelector("canvas");
const context_canvas = elemento_canvas.getContext("2d");

const gap_x = 10;

const mouse = { x: 10, y: 10 };

const field = {
    width: window.innerWidth,
    height: window.innerHeight,
    draw: function() {
        context_canvas.fillStyle = "#286047";
        context_canvas.fillRect(0, 0, this.width, this.height);
    }
};

const line = {
    width: 15,
    height: field.height,
    draw: function() {
        const x = field.width / 2 - this.width / 2;
        const y = 0;
        context_canvas.fillStyle = "#ffffff";
        context_canvas.fillRect(x, y, this.width, this.height);
    }
};

const leftPaddle = {
    x: gap_x,
    y: 0,
    width: line.width,
    height: 200,
    _move: function() {
        this.y = mouse.y - this.height / 2;
    },
    draw: function() {
        context_canvas.fillRect(this.x, this.y, this.width, this.height);
        this._move();
    }
};

const rightPaddle = {
    x: field.width - line.width - gap_x,
    y: 400,
    width: line.width,
    height: 200,
    _move: function() {
        const paddleCenter = this.y + this.height / 2;
        if (paddleCenter < ball.y) {
            this.y += 5;
        } else if (paddleCenter > ball.y) {
            this.y -= 5;
        }
    },
    draw: function() {
        context_canvas.fillRect(this.x, this.y, this.width, this.height);
        this._move();
    }
};

const score = {
    human: 0,
    computer: 0,
    draw: function() {
        context_canvas.font = "bold 72px Arial";
        context_canvas.textAlign = "center";
        context_canvas.textBaseline = "top";
        context_canvas.fillStyle = "#01341D";
        context_canvas.fillText(this.human, field.width / 4, 50);
        context_canvas.fillText(this.computer, field.width / 4 + field.width / 2, 50);
    },
    increaseScore: function(player) {
        if (player === 'human') {
            this.human++;
        } else if (player === 'computer') {
            this.computer++;
        }
    }
};

const ball = {
    x: 300,
    y: 200,
    radius: 20,
    speed: 5,
    directionY: 1,
    directionX: 1,
    _calcPosition: function() {
        if (this.y + this.radius > field.height || this.y - this.radius < 0) {
            this._reverseY();
        }

        if (this.x + this.radius > field.width) {
            score.increaseScore('human');
            this._reset();
        } else if (this.x - this.radius < 0) {
            score.increaseScore('computer');
            this._reset();
        }

        if (this.x - this.radius < leftPaddle.x + leftPaddle.width &&
            this.y > leftPaddle.y && this.y < leftPaddle.y + leftPaddle.height) {
            this._reverseX();
        }

        if (this.x + this.radius > rightPaddle.x &&
            this.y > rightPaddle.y && this.y < rightPaddle.y + rightPaddle.height) {
            this._reverseX();
        }
    },
    _reverseX: function() {
        this.directionX *= -1;
    },
    _reverseY: function() {
        this.directionY *= -1;
    },
    _move: function() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;
    },
    _reset: function() {
        this.x = field.width / 2;
        this.y = field.height / 2;
        this.directionX *= -1;
    },
    draw: function() {
        context_canvas.beginPath();
        context_canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        context_canvas.fill();

        this._calcPosition();
        this._move();
    }
};

function setup() {
    elemento_canvas.width = field.width;
    elemento_canvas.height = field.height;
}

function draw() {
    field.draw();
    line.draw();
    leftPaddle.draw();
    rightPaddle.draw();
    ball.draw();
    score.draw();
}

window.animateFrame = (function() {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        }
    );
})();

function main() {
    animateFrame(main);
    draw();
}

setup();
main();

elemento_canvas.addEventListener('mousemove', function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
});
