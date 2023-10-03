import { Entity, Type } from "../constants/index.js";
import { board } from "./base.js";

const boardHtml = document.querySelector("#board");
let playerPosition = getEntityPosition(board, Entity.Player);
const playerHtml = document.createElement("div");
playerHtml.classList.add(Entity.Player);


//! ------------ RECUPERER POSITION D'UNE ENTITE ------------

function getEntityPosition(array, entity) {
    // parcourir le tableau puis return la position du joueur quand trouvé
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y].entity == entity) {
                return { x: x, y: y };
            }
        }
    }
}



//! ------------ TELEPORTE SUR CASE VIDE PEU IMPORTE DISTANCE ------------
/**
 * @param {*} array 
 * @param {*} playerPosition 
 * @param {*} desiredPosition 
 * @returns nouvelle position du player
 */
function teleport(array, playerPosition, desiredPosition, playerHtml) {
    // si la case est vide -> le joueur prend la position sinon ciao bye
    if (canMove(array, desiredPosition)) { 
        // Player position
        const currentPlayer = array[playerPosition.x][playerPosition.y];

        currentPlayer.entity = Entity.None;
        
        updateTile(currentPlayer, playerHtml);

        // Desired position
        const desired = array[desiredPosition.x][desiredPosition.y];

        desired.entity = Entity.Player;  
        
        updateTile(desired, playerHtml);

        return { x: desiredPosition.x, y: desiredPosition.y };
    }
    return { x: playerPosition.x, y: playerPosition.y };
}

//! ------------ VERIF CASE VIDE ------------

function canMove(array, position) {
    const selected = array[position.x][position.y];
    return selected.type != Type.Wall && selected.entity == Entity.None;
}

//! ------------ MAJ CASE ------------

function updateTile (tile, playerHtml) {

    tile.htmlElement.className = "";
    tile.htmlElement.classList.add(tile.type);

    if(tile.htmlElement.firstChild){
        tile.htmlElement.removeChild(tile.htmlElement.firstChild);
        // if (tile.entity != Entity.Player) {
        //     removeEventPlayer(tile.htmlElement);
        // }
    }
     
    if(tile.entity == Entity.Player){

        tile.htmlElement.appendChild(playerHtml);
        // addEventPlayer(tile.htmlElement);

    } else if (tile.entity == Entity.Enemy){
        const enemy = document.createElement("div");
        enemy.classList.add(Entity.Enemy);
        tile.htmlElement.appendChild(enemy);  
    }
}

//! ------------ ?????????? ------------

// function handleMovements (e) {
//     const reachableCells = findAllReachableCells(board, 3, playerPosition);
//     const reachablePositions = Array.from(reachableCells).map(posString => {
//         const posArray = posString.split(',');
//         return {
//             x:posArray[0],
//             y:posArray[1]
//         }
//     })        
//     console.log(reachablePositions);
// }

// function addEventPlayer (element) {
//     element.addEventListener('mouseover', handleMovements);
// }

// function removeEventPlayer (element) {
//     element.removeEventListener('mouseover', handleMovements);
// }

//! ------------ CREATION ET MAJ DU BOARD ------------

export function createBoard() {    
    const body = document.createElement("tbody");

    for (let x = 0; x < board.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < board[x].length; y++) {
            const current = board[x][y];
            const td = document.createElement("td");   
            current.htmlElement = td;
        
            updateTile(current, playerHtml);

            td.addEventListener("click", function (event) {
                // playerPosition = teleport(board, playerPosition, { x: x, y: y }, playerHtml);
                playerPosition = walk(board, playerPosition, { x: x, y: y }, 3, playerHtml);
            });

            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
}


//! ------------ TROUVER LES CASES ATTEIGANBLES AVEC X PM ------------

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
            reachableCells.add(`${x},${y}`);

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

//! ------------ TELEPORTE AVEC CONTRAINTE PM ------------

function walk(array, playerPosition, desiredPosition, maxMovements, playerHtml) {

    const reachableCells = findAllReachableCells(array, maxMovements, playerPosition);
    const desiredPositionString = `${desiredPosition.x},${desiredPosition.y}`;
    

    if (reachableCells.has(desiredPositionString)) { 
        // Player position
        const currentPlayer = array[playerPosition.x][playerPosition.y];

        currentPlayer.entity = Entity.None;
        
        updateTile(currentPlayer, playerHtml);

        // Desired position
        const desired = array[desiredPosition.x][desiredPosition.y];

        desired.entity = Entity.Player;  
        
        updateTile(desired, playerHtml);

        return { x: desiredPosition.x, y: desiredPosition.y };
    }
    return { x: playerPosition.x, y: playerPosition.y };
}

//! ------------ AFFICHAGE DES CASES ATTEIGNABLES ------------

let playerClicked = false;
let deplacementDisplayed = false;


playerHtml.addEventListener('click', () => {
    playerClicked = true;
})

document.addEventListener('click', () => {

    console.log('playerClicked',playerClicked);
    console.log('deplacementDisplayed',deplacementDisplayed);
    console.log('if',playerClicked && !deplacementDisplayed);
    console.log('---------');
      
    if (playerClicked && !deplacementDisplayed) {
        const reachableCells = findAllReachableCells(board, 3, playerPosition);
        const reachablePositions = Array.from(reachableCells).map(posString => {
            const posArray = posString.split(',');
            return {
                x:posArray[0],
                y:posArray[1]
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