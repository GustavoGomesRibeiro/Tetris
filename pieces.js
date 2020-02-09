// Here we start building how to inicialize the pieces
// The pieces has been the names [I,J,L,O,S,T and Z]

class Piece{

    x;
    y;
    color;
    shape;
    context;
    
    constructor(){
        this.context = context;
        this.spwan();
    }

    spwan(){
        this.color = 'yellow'
        this.shape = [
            [2,0,0],
            [2,2,2],
            [0,0,0]
        ];
        this.x = 3;
        this.y = 0;
    }

    draw(){
        this.context.fillStyle = this.color;
        this.shape.forEach(row ,y => {
            
            if (value > 0) {
                this.context.fillRect(this.x + x, this.y + y, 1, 1);    
            }
            
        });
    }

    move(statePiece) {
        this.x = statePiece.x;
        this.y = statePiece.y;
        this.shape = statePiece.shape;
      }
}