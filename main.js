const canvas = document.getElementById('board');
const context = canvas.getContext('2d');


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
    // board = getEmptyBoard();
    piece.draw();
    board.piece = piece;
    
    // resetGame();
    board.reset();
    // console.log(board.grid);
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
    let pauseGame = false
    if (!pauseGame){
        pauseGame = true
        return alert('The game was paused!')
    } else if (pauseGame){
        pauseGame = false
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


// calculate size of canvas
context.canvas.width = cols * blockSize;
context.canvas.height =  rows * blockSize;

// scale blocks, using the scale we can give the size of the block as one
context.scale(blockSize, blockSize)

