import { updateTile } from "../board/index.js";
import { Entity, Type } from "../constants/index.js";


//! ------------ TROUVER LES CASES ATTEIGANBLES AVEC X PM ------------

/**
 * 
 * @param {*} board 
 * @param {*} maxMovements 
 * @param {*} position 
 * @returns 
 */
export function findAllReachableCells(board, maxMovements, position) {
    const rows = board.length;
    const cols = board[0].length;
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
    ];
  
    const reachableCells = [];
    const processedCells = [];
    const queue = [[position.x, position.y, 0]];

    while (queue.length > 0) {
       
        const [x, y, movements] = queue.shift();
        
        if (movements > maxMovements) {
            continue; // Skip cells that require more movements than allowed
        }
    
        if (!processedCells.includes(`${x},${y}`)) {
            processedCells.push(`${x},${y}`);
            reachableCells.push(`${x},${y},${movements}`);
    
            for (const [dx, dy] of directions) {

                const newX = x + dx;
                const newY = y + dy;
        
                if (
                    // Si on est dans le board
                    newX >= 0 &&
                    newX < rows &&
                    newY >= 0 &&
                    newY < cols &&

                    // Que la case ne soit pas dans processedCells
                    !processedCells.includes(`${newX},${newY}`) &&
                    
                    // Et que la case est libre
                    board[newX][newY].type !== Type.Wall &&
                    board[newX][newY].entity == Entity.None
                ) {
                    queue.push([newX, newY, movements + 1]);
                }
            }
        }
    }
    return reachableCells;
}


//! ------------ TELEPORTE AVEC CONTRAINTE PM & OBSTACLE------------

/**
 * 
 * @param {*} array 
 * @param {*} playerPosition 
 * @param {*} desiredPosition 
 * @param {*} maxMovements 
 * @param {*} playerHtml 
 * @returns nouvelle position du player
 */
export function walk(array, playerPosition, desiredPosition, maxMovements, updatePlayerPm, playerHtml) {

    const reachableCells = findAllReachableCells(array, maxMovements, playerPosition);

    const reachableCellsArray = reachableCells.map(string => {
        const object = string.split(',');
        return {
            x:object[0],
            y:object[1],
            z:object[2]
        }
    })

    let desiredInReachable = reachableCellsArray.some(object => {
        return object.x == desiredPosition.x && object.y == desiredPosition.y;
    });
    
    if (desiredInReachable) { 

        let indexOfTarget = reachableCellsArray.findIndex((object) => {
            return object.x == desiredPosition.x && object.y == desiredPosition.y;
        });
    
        let pmCost = reachableCellsArray[indexOfTarget].z;

        // Player position
        const currentPlayer = array[playerPosition.x][playerPosition.y];

        currentPlayer.entity = Entity.None;
    
        updateTile(currentPlayer, playerHtml);

        // Desired position
        const desired = array[desiredPosition.x][desiredPosition.y];

        desired.entity = Entity.Player;  
        
        updateTile(desired, playerHtml);

        updatePlayerPm(maxMovements - pmCost);
        
        return { x: desiredPosition.x, y: desiredPosition.y };

    }
    return { x: playerPosition.x, y: playerPosition.y };
}