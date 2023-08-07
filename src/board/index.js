import { Entity, Type } from "../constants/index.js";
import { board } from "./base.js";

const boardHtml = document.querySelector("#board");
let playerPosition = getEntityPosition(board, Entity.Player);
const playerHtml = document.createElement("div");
playerHtml.classList.add(Entity.Player);

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

/**
 * 
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

function canMove(array, position) {
    const selected = array[position.x][position.y];
    return selected.type != Type.Wall && selected.entity == Entity.None;
}

function updateTile (tile, playerHtml) {

    tile.htmlElement.className = "";
    tile.htmlElement.classList.add(tile.type);

    if(tile.htmlElement.firstChild){
        tile.htmlElement.removeChild(tile.htmlElement.firstChild);
    }
     
    if(tile.entity == Entity.Player){
        tile.htmlElement.appendChild(playerHtml);     
    } else if (tile.entity == Entity.Enemy){
        const enemy = document.createElement("div");
        enemy.classList.add(Entity.Enemy);
        tile.htmlElement.appendChild(enemy);  
    }
}

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
                playerPosition = teleport(board, playerPosition, { x: x, y: y }, playerHtml);
            });
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
}