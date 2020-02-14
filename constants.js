const cols = 10;
const rows =  20;
const blockSize = 30;
const KEY = {
    left: 37,
    right: 39,
    down: 40,
    up: 38,
    space: 32,
    P: 80,
    R: 82
}
const color = [
    'blue',
    'yellow',
    'red',
    'black',
    'grey',
    'orange',
    'rose'
];
// The pieces has been the names [I,J,L,O,S,T and Z]
const shapes = [
    [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0]
    ],
    [
        [2,0,0],
        [2,2,2],
        [0,0,0],
    ],
    [
        [0,0,3],
        [3,3,3],
        [0,0,0]
    ],
    [
        [4,4,4],
        [4,4,4]
   
    ],   
    [
        [0,5,5],
        [5,5,0],
        [0,0,0]
    ],
    [
        [0,6,0],
        [6,6,6],
        [0,0,0]
    ],
    [
        [7,7,0],
        [0,7,7],
        [0,0,0]
    ],
]
Object.freeze(KEY); //this method freezes an object.