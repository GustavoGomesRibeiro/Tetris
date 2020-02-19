class Board {
    grid;
    piece;
    contextNext;
    context;
    next;

    constructor(context, contextNext){
        this.context = context;
        this.contextNext = contextNext;
    }

    getNewPiece(){
        this.next = new Piece (this.contextNext)
        this.contextNext.clearRect(
            0,
            0, 
            this.contextNext.canvas.width, 
            this.contextNext.canvas.height
        );
        this.next.draw();
        // console.log('getNewPiece', getNewPiece)
    }
    
    //  this worked from reset the game when you press the button 'play'
    reset(){
        this.grid = this.getEmptyBoard();
    }




     draw(){
        this.piece = new Piece();
        this.piece.draw();
        this.drawBoard();
    }


    drawBoard(){
         this.grid.forEach((row, y) => {
            row.forEach((value, x) => {
              if (value > 0) {
                this.context.fillStyle = color[value];
                this.context.fillRect(x, y, 1, 1);
              }
            });
          });
    }

    // function for validation freeze pieces
    drop() {
        let drop = keyPressed[KEY.down](this.piece);
    
        if (this.valid(drop)) {
            this.piece.move(drop)
        } else{
            this.freeze();
          if (this.piece.y === 0) {
              return false;
          }  
          this.piece = this.next;
          this.piece.context = this.context;
          this.getNewPiece();
          // this.piece.setStartingPosition();
        }
        return true;
    }
    
    wall(x){
        return x >= 0 && x < cols;
    }

    floor(y){
        return y <= rows;
    }
    
    
    notOccupied(x,y) {
        return this.grid[y] && this.grid[y][x] === 0;
    }


    valid(statePiece){
        return statePiece.shape.every((row, dy) => {
            return row.every((value, dx) => {
                
                let x = statePiece.x + dx;
                let y = statePiece.y + dy;

                return(
                    value === 0  || (this.wall(x) && this.floor(y) && this.notOccupied(x, y))
                );
            });
        });
    }

    freeze(){
        this.piece.shape.forEach((row, y)=>{
            row.forEach((value, x) => {
                if( value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value
                }
            });
        });
    }

    rotate(piece){
        let rotatePiece = JSON.parse(JSON.stringify(piece));
        for (let y = 0; y < rotatePiece.shape.length; y++) {
            for (let x = 0; x < y; x++) {
                [rotatePiece.shape[x][y], rotatePiece.shape[y][x]] = [rotatePiece.shape[y][x], rotatePiece.shape[x][y]]  
            }            
        }
        rotatePiece.shape.forEach(row => row.reverse());
        return rotatePiece;
    }

        
    // using the method fill, this method changes all the elemtes fot an value static, from start to 0. arr.fill(value[, start[, end]])
    getEmptyBoard() {
        return Array.from(
            {length: rows}, () => Array(cols).fill(0)
        )
    }
}