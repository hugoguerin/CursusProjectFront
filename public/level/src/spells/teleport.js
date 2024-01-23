import { updateBoard, updateTile } from "../board/index.js";
import { Entity } from "../constants/index.js";


//! ------------ TELEPORT ------------
/**
 * 
 * @param {*} board 
 * @param {*} playerPosition 
 * @param {*} targetPos 
 * @param {*} playerHtml 
 * @param {*} action 
 * @returns nouvelle position du player
 */
export function teleport(board, playerPosition, targetPos, playerHtml) {

    // Player position
    const currentPlayer = board[playerPosition.x][playerPosition.y];

    currentPlayer.entity = Entity.None;

    // Desired position
    const desired = board[targetPos.x][targetPos.y];

    desired.entity = Entity.Player;  

    updateBoard(board, playerHtml);

    return { x: targetPos.x, y: targetPos.y };
}