const canvas = document.getElementById('board');
const context = canvas.getContext('2d');


let piece = new Piece(context);



//controller of moviments 
moves = {
    [key.left]: statePiece => ({...statePiece, x: statePiece.x - 1}),
    [key.right]: statePiece => ({...statePiece, x: statePiece.x + 1}),
    [key.down]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [key.space]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [key.up]: statePiece => board.rotate(statePiece) 
};


let board = new Board(context);
addEventListener();

// Start the game
function play(){
    // board = getEmptyBoard();
    piece.draw();
    board.piece = piece;
    
    resetGame();
    board.reset();
    // console.log(board.grid);
}

// reset the game
function resetGame() {
    score = 0;
    level = 0;
    lines = 0;
    board.reset()
}

function pause () {
    
}

function addEventListener() {
    document.addEventListener("keydown", event => {
        
        if(event.keyCode === key.P){
            pause()
        } if (event.keyCode === key.R ) {
            resetGame()
        }else if (moves[event.keyCode]) {
            event.preventDefault();
    
    
            // new state of piece;
            let statePiece = moves[event.keyCode](board.piece);
           
            if (board.valid(statePiece)) {
                // verify if the move is valid
                board.piece.move(statePiece);
    
                context.clearRect (0, 0, context.canvas.width, context.canvas.height);
    
                board.piece.draw();
            }
        }
    });
}


// move(){
//     this.x = p.x;
//     this.y = p.y;
// }
// calculate size of canvas
context.canvas.width = cols * blockSize;
context.canvas.height =  rows * blockSize;

// scale blocks, using the scale we can give the size of the block as one
context.scale(blockSize, blockSize)

