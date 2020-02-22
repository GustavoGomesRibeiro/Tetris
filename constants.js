const cols = 10;
const rows =  20;
const blockSize = 30;
const linesPerLevel = 10;
const KEY = {
    left: 37,
    right: 39,
    down: 40,
    up: 38,
    space: 32,
    P: 80,
    R: 82
}
Object.freeze(KEY); //this method freezes an object.

const points = {
    single: 100,
    double: 300,
    triple: 500,
    tetris: 800,
    soft_drop: 1,
    hard_drop: 2
}
Object.freeze(points);

const level = {
    0: 800,
    1: 720,
    2: 630,
    3: 550,
    4: 470,
    5: 380,
    6: 300,
    7: 220,
    8: 130,
    9: 100,
    10: 80,
    11: 80,
    12: 80,
    13: 70,
    14: 70,
    15: 70,
    16: 50,
    17: 50,
    18: 50,
    19: 30,
    20: 30,

}
Object.freeze(level);

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
Object.freeze(shapes);