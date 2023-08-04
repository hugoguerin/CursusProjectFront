import { Entity, Type } from "../constants/index.js";
import { board } from "./base.js";

const boardHtml = document.querySelector("#board");
let playerPosition = getEntityPosition(board, Entity.Player);

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

function teleport(array, playerPosition, desiredPosition) {
    // si la case est vide -> le joueur prend la position sinon ciao bye
    if (canMove(array, desiredPosition)) { 
        // Player position
        array[playerPosition.x][playerPosition.y].entity = Entity.None;
        
        array[playerPosition.x][playerPosition.y].htmlElement.className = "";
        if (array[playerPosition.x][playerPosition.y].entity == Entity.None) {
            array[playerPosition.x][playerPosition.y].htmlElement.classList.add(array[playerPosition.x][playerPosition.y].type);
        } else {
            array[playerPosition.x][playerPosition.y].htmlElement.classList.add(array[playerPosition.x][playerPosition.y].entity);
        }

        // Desired position
        array[desiredPosition.x][desiredPosition.y].entity = Entity.Player;  
        
        array[desiredPosition.x][desiredPosition.y].htmlElement.className = "";
        if (array[desiredPosition.x][desiredPosition.y].entity == Entity.None) {
            array[desiredPosition.x][desiredPosition.y].htmlElement.classList.add(array[desiredPosition.x][desiredPosition.y].type);
        } else {
            array[desiredPosition.x][desiredPosition.y].htmlElement.classList.add(array[desiredPosition.x][desiredPosition.y].entity);
        }

        return { x: desiredPosition.x, y: desiredPosition.y };
    }
    return { x: playerPosition.x, y: playerPosition.y };
}

function canMove(array, position) {
    const selected = array[position.x][position.y];
    return !(selected.type == Type.Wall) && selected.entity == Entity.None;
}

export function createBoard() {    
    const body = document.createElement("tbody");
    for (let x = 0; x < board.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < board[x].length; y++) {
            const td = document.createElement("td");
            board[x][y].htmlElement = td;
            
            // Pour maintenant
            if (board[x][y].entity == Entity.None) {
                td.classList.add(board[x][y].type);
            } else {
                td.classList.add(board[x][y].entity);
            }

            // Pour après
            // td.classList.add(board[x][y].type);
            // td.classList.add(board[x][y].entity);

            td.addEventListener("click", function (event) {
                // console.log(event.currentTarget);
                playerPosition = teleport(board, playerPosition, { x: x, y: y });
            });
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
}
