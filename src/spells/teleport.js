import { updateTile } from "../board/index.js";
import { Entity } from "../constants/index.js";
import { canMove, isInRange } from "./index.js";


//! ------------ TELEPORTE SUR CASE VIDE PEU IMPORTE DISTANCE ------------
/**
 * 
 * @param {*} board 
 * @param {*} playerPosition 
 * @param {*} desiredPosition 
 * @param {*} playerHtml 
 * @param {*} action 
 * @returns nouvelle position du player
 */
export function teleport(board, playerPosition, desiredPosition, playerHtml, action) {

    const inRange = isInRange(action.range, playerPosition, desiredPosition);
    const move = canMove(board, desiredPosition)

    if (!inRange || !move) {
        return { x: playerPosition.x, y: playerPosition.y };
    }

    // Player position
    const currentPlayer = board[playerPosition.x][playerPosition.y];

    currentPlayer.entity = Entity.None;

    updateTile(currentPlayer, playerHtml);

    // Desired position
    const desired = board[desiredPosition.x][desiredPosition.y];

    desired.entity = Entity.Player;  

    updateTile(desired, playerHtml);

    return { x: desiredPosition.x, y: desiredPosition.y };

}