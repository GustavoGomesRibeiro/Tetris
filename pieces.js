// Here we start building how to inicialize the pieces
// The pieces has been the names [I,J,L,O,S,T and Z]

class Piece{

    x;
    y;
    color;
    shape;
    context;
    typeId;
    
    constructor(){
        this.context = context;
        this.spwan();
    }

    spwan(){
        const typeId = this.randomizePieces(color.length);
        this.shape = shapes [typeId ];
        this.color = color [typeId];
        this.x = 3;
        this.y = 0;
    }
        


    draw(){
        this.context.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                    this.context.fillRect(this.x + x, this.y + y, 1, 1);    
                }
            });
        });
    }

    move(statePiece) {
        this.x = statePiece.x;
        this.y = statePiece.y;
        this.shape = statePiece.shape;
      }

      randomizePieces(noOfTypes){
          return Math.floor(Math.random() * noOfTypes);
      }

}

