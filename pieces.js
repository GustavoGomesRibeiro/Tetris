// Here we start building how to inicialize the pieces
// The pieces has been the names [I,J,L,O,S,T and Z]

class Piece{
    x;
    y;
    color;
    shape;
    context;
    typeId;
    hardDropped;
    
    constructor(context){
        this.context = context;
        this.spwan();
    }

    spwan(){
        const typeId = this.randomizePieces(COLOR.length - 1);
        this.shape = shapes [typeId ];
        this.color = COLOR [typeId];
        this.x = 0;
        this.y = 0;
        this.hardDropped = false;
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
        if(!this.hardDropped){
            this.x = statePiece.x;
            this.y = statePiece.y;
        }
        this.shape = statePiece.shape;
      }

      randomizePieces(noOfTypes){
          return Math.floor(Math.random() * noOfTypes + 1);
      }

      setStartingPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
      }
      
      hardDrop(){
        this.hardDropped = true;
      }

}

