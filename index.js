const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0], 
    [0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 3, 0],
];

// 0= case vide -- 1 = case occupée -- 2 = mur -- 3= joueur



function canMove (array, position) {
    const selected = array[position.x][position.y];
    return selected == 0;
}

let playerPosition = getPlayerPosition(board, 3);
function getPlayerPosition(array, number) {
    // parcourir le tableau puis return la position du joueur quand trouvé?
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y] == number) {
                return { x: x, y: y };      
                
            }        
        }
    }
}


function teleport(array, playerPosition, desiredPosition ) {
// si la case est vide -> le joueur prend la position sinon ciao bye
    let valueOfdesiredPosition = array[desiredPosition.x][desiredPosition.y];
    canMove(array, desiredPosition)
    let holdPosition = playerPosition;
    playerPosition = desiredPosition;
 




}
canMove(board, 4, 2);
getPlayerPosition(board, 3);
console.log(board[0]);
console.log(board[1]);
console.log(board[2]);
console.log(board[3]);
console.log(board[4]);
let desiredPosition = { x: 0, y: 0 };
teleport(board, playerPosition, desiredPosition);
console.log(board[0]);
console.log(board[1]);
console.log(board[2]);
console.log(board[3]);
console.log(board[4]);

console.log(playerPosition);

