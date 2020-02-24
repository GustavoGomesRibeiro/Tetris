class Board {
    contextNext;
    context;
    grid;
    piece;
    next;
    requestId;
    time;

    constructor(context, contextNext){
        this.context = context;
        this.contextNext = contextNext;
        this.init()
    }

    init() {
        // calculate size of canvas
        context.canvas.width = cols * blockSize;
        context.canvas.height =  rows * blockSize;
        // scale blocks, using the scale we can give the size of the block as one
        context.scale(blockSize, blockSize)   
      }

        //  this worked from reset the game when you press the button 'play'
    reset(){
            this.grid = this.getEmptyGrid();
            this.piece = new Piece(this.context);
            this.piece.setStartingPosition();
            this.getNewPiece();
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
    
     draw(){
        this.piece.draw();
        this.drawBoard();
    }

    // function for validation freeze pieces
    drop() {
        let drop = keyPressed[KEY.down](this.piece);
    
        if (this.valid(drop)) {
            this.piece.move(drop)
        } else{
            this.freeze();
            this.clearLines();
          if (this.piece.y === 0) {
              return false;
          }  
          this.piece = this.next;
          this.piece.context = this.context;
          this.piece.setStartingPosition();
          this.getNewPiece();
        }
        return true;
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
        this.piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if( value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value
                }
            });
        });
    }

    
    drawBoard(){
        this.grid.forEach((row, y) => {
           row.forEach((value, x) => {
             if (value > 0) {
               this.context.fillStyle = COLOR[value];
               this.context.fillRect(x, y, 1, 1);
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

    clearLines(){
        let lines = 0;
        this.grid.forEach((row, y ) => {
            if (row.every (value => value > 0)){
                lines++;
                // this method remove one row
                this.grid.splice(y,1);
                //this method add new item at the top.
                this.grid.unshift(Array(cols).fill(0));
            }
        });
        if (lines > 0) {
            account.score += this.getLineClearPoints(lines);
            account.lines += lines;

        if (account.lines >= linesPerLevel) {
            account.level++;

            account.lines -= linesPerLevel;

            time.level = level [account.level];
        }    
        }
    }

    getLineClearPoints(lines){
        const lineClearPoints =
               lines === 1 ? POINTS.SINGLE : 
               lines === 2 ? POINTS.DOUBLE :
               lines === 3 ? POINTS.TRIPLE :
               lines === 4 ? POINTS.TETRIS : 0;

               return (account.level + 1) * lineClearPoints;
    }

    getEmptyGrid() {
        return Array.from({ length: rows }, () => Array(cols).fill(0));
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
        
    // using the method fill, this method changes all the elemtes fot an value static, from start to 0. arr.fill(value[, start[, end]])
    getEmptyBoard() {
        return Array.from(
            {length: rows}, () => Array(cols).fill(0)
        )
    }
}