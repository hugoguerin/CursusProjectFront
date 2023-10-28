import { Entity, Type } from "../constants/index.js";

const boardHtml = document.querySelector("#board");
let playerPosition = null;


//! Création variable PM + intégration en html'

let PM = 0;

// let PMHtml = document.createElement('div');
// PMHtml.setAttribute('id','PM');
// PMHtml.innerText = PM;

// document.body.appendChild(PMHtml);

// console.log(board);

// //! BOUTON RETRY

// let initialPM = PM;
// let initialBoard = board;


// let retryButton = document.createElement('button');
// retryButton.setAttribute('type','button');
// retryButton.innerText = 'retry';
// document.body.appendChild(retryButton);

// retryButton.addEventListener('click', () => {
//     PM = initialPM;
//     PMHtml.innerText = PM;
//     boardHtml.innerHTML = '';
//     createBoard()
// })





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

//! ------------ RECUPERER POSITION D'UN TYPE DE CASE ------------

function getTypePosition(array, type) {
    // parcourir le tableau puis return la position du joueur quand trouvé
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y].type == type) {
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

//! ------------ CREATE BOARD ------------

export function createBoard(board) {   
    
    const body = document.createElement("tbody");

    for (let x = 0; x < board.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < board[x].length; y++) {
            const current = board[x][y];
            const td = document.createElement("td");   
            //Rajoute la clé htmlElement aux objets du tableau ET leurs donnent leurs VUE html
            current.htmlElement = td;
        
            

            // td.addEventListener("click", function (event) {
            //     playerPosition = teleport(board, playerPosition, { x: x, y: y }, playerHtml);
            //     playerPosition = walk(board, playerPosition, { x: x, y: y }, PM, playerHtml);
            // });

            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
}


//! ------------UPDATE BOARD ------------

export function updateBoard(board, playerHtml){

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            updateTile(board[x][y], playerHtml);
        }    
    }
}


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

//! ------------ TELEPORTE AVEC CONTRAINTE PM ------------

function walk(array, playerPosition, desiredPosition, maxMovements, playerHtml) {

    const reachableCells = findAllReachableCells(array, maxMovements, playerPosition);
    const reachableCellsArrayofOfObjects = Array.from(reachableCells).map(string => {
        const object = string.split(',');
        return {
            x:object[0],
            y:object[1],
            z:object[2]
        }
    })

    //? Set de strings sans le PM??? Pq j'ai fais ça si j'ai justement besoin du pm?
    // const reachableCellsWithoutPM = new Set(Array.from(reachableCells).map(string => {
    //     let array = string.split(',');
    //     return `${array[0]},${array[1]}`;
    // }))

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


 export function initBoard() {
    
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