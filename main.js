const canvas = document.getElementById('board');
const context = canvas.getContext('2d');


let board = new Board();
function play(){
    // board = getEmptyBoard();
    // let piece = new Piece(context);
    // piece.draw();
    // board.piece = piece;
    resetGame();
    board.reset();
    console.log(board.grid);
}

function resetGame() {
    score = 0;
    level = 0;
    lines = 0;
    board.reset()
}

moves = {
    [key.left]: statePiece => ({...statePiece, x: statePiece.x - 1}),
    [key.right]: statePiece => ({...statePiece, x: statePiece.x + 1}),
    [key.down]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [key.space]: statePiece => ({...statePiece, y: statePiece.y + 1}),
};

function addEventListener() {
    document.addEventListener("keydown", event => {
        if (moves[event.keyCode]) {
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

