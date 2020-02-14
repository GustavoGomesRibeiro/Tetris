class Board {
    grid;
    piece;
    
    //  this worked from reset the game when you press the button 'play'
    reset(){
        this.grid = this.getEmptyBoard();
    }

floor(y){
    return y <= rows;
}

wall(x){
    return x >= 0 && x < cols;
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


    freeze(){
        this.piece.shape.forEach((row, y)=>{
            row.forEach((value, x) => {
                if( value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value
                }
            });
        });
    }

        
    // using the method fill, this method changes all the elemtes fot an value static, from start to 0. arr.fill(value[, start[, end]])
    getEmptyBoard() {
        return Array.from(
            {length: rows}, () => Array(cols).fill(0)
        )
    }
}