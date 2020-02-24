const canvas = document.getElementById('board');
const context = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const contextNext = canvasNext.getContext('2d');


let accountValues = {
    score: 0,
    lines: 0,
    level: 0
}

let piece = new Piece(context);
let board = new Board(context, contextNext);
let requestId;



//controller of movements 
keyPressed = {
    [KEY.left]: statePiece => ({...statePiece, x: statePiece.x - 1}),
    [KEY.right]: statePiece => ({...statePiece, x: statePiece.x + 1}),
    [KEY.down]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [KEY.space]: statePiece => ({...statePiece, y: statePiece.y + 1}),
    [KEY.up]: statePiece => board.rotate(statePiece) 
};


initNext();

function initNext(){
contextNext.canvas.width = 4 * blockSize;
contextNext.canvas.height = 4 * blockSize;
contextNext.scale(blockSize, blockSize);
}

function updateAccount (key, value ) {
    let element = document.getElementById(key);
    if(element){
        element.textecontext = value;
    }
 }   
  let account = new Proxy (accountValues, {
      set: (target, key, value) => {
          target[key] = value;
          updateAccount (key, value);
          return true
      }
  })



// Start the game
function play(){
    addEventListener();
    resetGame();
    time.start = performance.now();
 if (requestId){
    cancelAnimationFrame(requestId);
 } 
    animationPieces();
}

// reset the game
function resetGame() {
    account.score = 0;
    account.level = 0;
    account.lines = 0;
    board.reset();
    time = { start: 0, timeLapseInterval: 0, level: level[account.level] };
    console.log('the game was reseted')
    // time = {start: 0, timeLapseInterval: 0, level: 1000 };
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

function gameOver() {
    cancelAnimationFrame(requestId);
    // this.context.fillStyle  = 'black';
    // this.context.fillRect(1, 3, 8, 1.2);
    // this.context.font = '1px Arial';
    // this.context.fillStyle = 'red';
    // this.context.fillText('GAME OVER', 1.8, 4);
    console.log('GameOver')
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
                    account.score += POINTS.HARD_DROP;
                    board.piece.move(statePiece);
                    statePiece = keyPressed[KEY.down](board.piece);
                }   
            } else if (board.valid(statePiece)){
                board.piece.move(statePiece);
                if (event.keyCode === KEY.down) {
                    account.score += POINTS.SOFT_DROP;
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
        if(!board.drop()){
            gameOver();
            return;              
        }
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    board.draw();
    requestId = requestAnimationFrame(animationPieces);
}






