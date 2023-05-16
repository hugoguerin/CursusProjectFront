const map = [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0], 
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0],
];



function canMove (x, y) {
const selected = map[x][y];
    console.log(selected);
    if (selected == 0) {
        return true;
    } else {
        return false
    }
}

if (canMove(4, 2)) {
    
} else {
    
}
canMove(4, 2);
 

