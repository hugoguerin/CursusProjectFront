//!
//! NONE SORTED
//!


//! ------------ TROUVER LES CASES ATTEIGANBLES AVEC X PM ------------


//TODO EMPECHER DE PUSH LES MEMES POSITIONS AVEC COUT EN PM DIFFERENT
/**
 * 
 * @param {*} array 
 * @param {*} maxMovements 
 * @param {*} position 
 * @returns 
 */
function findAllReachableCells(array, maxMovements, position) {
    const rows = array.length;
    const cols = array[0].length;
    const directions = [
        [-1, 0], // Up
        [1, 0],  // Down
        [0, -1], // Left
        [0, 1],  // Right
    ];
  
    const reachableCells = new Set();
    const queue = [[position.x, position.y, 0]];
  
    while (queue.length > 0) {

        const [x, y, movements] = queue.shift();

        
        if (movements > maxMovements) {
            continue; // Skip cells that require more movements than allowed
        }
    
        if (!reachableCells.has(`${x},${y}`)) {
            reachableCells.add(`${x},${y},${movements}`);
           
            for (const [dx, dy] of directions) {

                const newX = x + dx;
                const newY = y + dy;
        
                if (
                    // Si on est dans le board
                    newX >= 0 &&
                    newX < rows &&
                    newY >= 0 &&
                    newY < cols &&
                    // Et que la case est libre
                    array[newX][newY].type !== Type.Wall &&
                    array[newX][newY].entity == Entity.None
                ) {
                    queue.push([newX, newY, movements + 1]);
                }
            }
        }
    }
    return reachableCells;
}


//! ------------ TELEPORTE AVEC CONTRAINTE PM & OBSTACLE------------

export function walk(array, playerPosition, desiredPosition, maxMovements, playerHtml) {

    const reachableCells = findAllReachableCells(array, maxMovements, playerPosition);
    const reachableCellsArrayofOfObjects = Array.from(reachableCells).map(string => {
        const object = string.split(',');
        return {
            x:object[0],
            y:object[1],
            z:object[2]
        }
    })

    let desiredInReachable = false;

    desiredInReachable = reachableCellsArrayofOfObjects.some(object => {
        return object.x == desiredPosition.x && object.y == desiredPosition.y;
    });

    let indexOfTarget = reachableCellsArrayofOfObjects.findIndex((object) => {
        return object.x == desiredPosition.x && object.y == desiredPosition.y;
    });

    let pmCost = reachableCellsArrayofOfObjects[indexOfTarget].z;

    if (desiredInReachable) { 
        // Player position
        const currentPlayer = array[playerPosition.x][playerPosition.y];

        currentPlayer.entity = Entity.None;
        
        updateTile(currentPlayer, playerHtml);

        // Desired position
        const desired = array[desiredPosition.x][desiredPosition.y];

        desired.entity = Entity.Player;  
        
        updateTile(desired, playerHtml);

        PM -= pmCost;
        // PMHtml.innerText = PM;

        return { x: desiredPosition.x, y: desiredPosition.y };

    }
    return { x: playerPosition.x, y: playerPosition.y };
}

//! ------------ AFFICHAGE DES CASES ATTEIGNABLES ------------


export function displayPM() {
    
    let playerClicked = false;
    let deplacementDisplayed = false;
    
    
    playerHtml.addEventListener('click', () => {
        playerClicked = true;
    })
    
    document.addEventListener('click', () => {
       
        if (playerClicked && !deplacementDisplayed) {
            const reachableCells = findAllReachableCells(board, PM, playerPosition);
            const reachablePositions = Array.from(reachableCells).map(posString => {
                const posArray = posString.split(',');
                return {
                    x:posArray[0],
                    y:posArray[1],
                }
            }) 
            for (let i = 0; i < reachablePositions.length; i++) {
                const selected =  board[reachablePositions[i].x][reachablePositions[i].y].htmlElement;
                selected.classList.add('deplacement');
            }
            deplacementDisplayed = true;
        } else {
            
            const alltds = Array.from(document.querySelectorAll('.deplacement'));
            for (let i = 0; i < alltds.length; i++) {
                // if ( alltds[i].classList.contains('deplacement')) {
                alltds[i].classList.remove('deplacement');   
                // }
            }    
            deplacementDisplayed = false; 
                
        }
    
        playerClicked = false;
        
    })
}