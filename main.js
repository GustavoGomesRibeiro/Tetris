const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
const time = {
    start: 0,
    timeLapseInterval: 0,
    level: 1000
};

let piece = new Piece(context);



//controller of movements 
keyPressed = {
    [KEY.left]: statePiece => ({...statePiece, x: statePiece.x - 1}),
    [KEY.right]: statePiece => ({...statePiece, x: statePiece.x + 1}),
    [KEY.down]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [KEY.space]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [KEY.up]: statePiece => board.rotate(statePiece) 
};


let board = new Board(context);
addEventListener();

// Start the game
function play(){
    piece.spwan();
    animationPieces();
    board.piece = piece;
    board.reset();
    // resetGame();
    // piece.draw();
    // board = getEmptyBoard();

}

// reset the game
function resetGame() {
    score = 0;
    level = 0;
    lines = 0;
    board.reset()
    console.log('the game was reseted')
}

function pause () {
    let pauseGame = true
    if (pauseGame){
        pauseGame = false
        return alert('The game was paused!')
    } else if (pauseGame){
        pauseGame = true
        console.log('The game come back', pause)
    }
}

function addEventListener() {
    document.addEventListener("keydown", event => {
        
        if(event.keyCode === KEY.P){
            pause();
        } if (event.keyCode === KEY.R ) {
            resetGame();
        } else if (keyPressed[event.keyCode]) {
            event.preventDefault();
    
    
            // new state of piece;  example const p = this.moves[event.key](this.piece);
            let statePiece = keyPressed[event.keyCode](board.piece);

            if (board.valid(statePiece)) {
                // verify if the move is valid
                board.piece.move(statePiece);
                context.clearRect (0, 0, context.canvas.width, context.canvas.height);
                board.piece.draw();
                // Hard drop
            } if(event.keyCode === KEY.space){
                while (board.valid(statePiece)){
                    board.piece.move(statePiece);
                    statePiece = keyPressed[KEY.down](board.piece);
                }   
            }
        }
    });
}

//function for creating animation for pieces
function animationPieces(now = 0) {
    time.timeLapseInterval = now - time.start;
    if(time.timeLapseInterval > time.level){

        time.start = now;

        this.drop();  
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    piece.draw();
    window.requestAnimationFrame(animationPieces);
}

function draw(){
    board.draw();
    this.drawBoard();
}

function drawBoard(){
    this.grid.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value > 0) {
            this.ctx.fillStyle = COLORS[value];
            this.ctx.fillRect(x, y, 1, 1);
          }
        });
      });
}

// function for validation freeze pieces
function drop() {
    let drop = keyPressed[KEY.down](board.piece);

    if (board.valid(drop)) {
            board.piece.move(drop)
    } else {
        board.freeze();
        console.log('drop')
    }
}

// calculate size of canvas
context.canvas.width = cols * blockSize;
context.canvas.height =  rows * blockSize;

// scale blocks, using the scale we can give the size of the block as one
context.scale(blockSize, blockSize)

