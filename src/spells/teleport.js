import { updateTile } from "../board/index.js";
import { Entity } from "../constants/index.js";
import { canMove } from "./index.js";


//! ------------ TELEPORTE SUR CASE VIDE PEU IMPORTE DISTANCE ------------
/**
 * 
 * @param {*} array 
 * @param {*} playerPosition 
 * @param {*} desiredPosition 
 * @param {*} playerHtml 
 * @returns nouvelle position du player
 */
export function teleport(array, playerPosition, desiredPosition, playerHtml) {
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
