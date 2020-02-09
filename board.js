class Board {
    grid;
    
    //  this worked from reset the game when you press the button 'play'
    reset(){
        this.grid = this.getEmptyBoard();
    }

    // using the method fill, this method changes all the elemtes fot an value static, from start to 0. arr.fill(value[, start[, end]])
    getEmptyBoard() {
        return Array.from(
            {length: rows}, () => Array(cols).fill(0)
        )
    }
}