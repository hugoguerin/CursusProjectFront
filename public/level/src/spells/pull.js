import { isEmpty, updateBoard } from "../board/index.js";
import { Entity } from "../constants/index.js";

export function pullEnemy (board, playerPos, playerHtml, targetPos, action){

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;

    let inbetween = [];

    if (isAlignedX) {
        if (directionY < 0) {
            for (let i = 0; i < action.power; i++) {
                if (board[targetPos.x][targetPos.y - (i + 1)].entity == Entity.Player){
                    break;
                }
                inbetween.push(board[targetPos.x][targetPos.y - (i + 1)]);
            }
            console.log("Pull to the left");
        } else {
            for (let i = 0; i < action.power; i++) {
                if (board[targetPos.x][targetPos.y + (i + 1)].entity == Entity.Player){
                    break;
                }
                inbetween.push(board[targetPos.x][targetPos.y + (i + 1)]);
            }
            console.log("Pull to the right");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            for (let i = 0; i < action.power; i++) {
                if (board[targetPos.x - (i + 1)][targetPos.y].entity == Entity.Player){
                    break;
                }
                inbetween.push(board[targetPos.x - (i + 1)][targetPos.y]);
            }   
            console.log("Pull to the top");
        } else {
             for (let i = 0; i < action.power; i++) {
                if (board[targetPos.x + (i + 1)][targetPos.y].entity == Entity.Player){
                    break;
                }
                inbetween.push(board[targetPos.x + (i + 1)][targetPos.y]);
            }  
            console.log("Pull to the botom");
        }
    }
    let enemyPos = board[targetPos.x][targetPos.y];

    for (let i = 0; i < inbetween.length; i++) {
        if (isEmpty(inbetween[i])) {
           enemyPos.entity = Entity.None;
           enemyPos = inbetween[i];
           inbetween[i].entity = Entity.Enemy
        } else {
            break;
        }
    }
    updateBoard(board, playerHtml);
}


export function pullPlayer(board, playerPos, playerHtml, enemyPos, action) {
    const isAlignedX = playerPos.x === enemyPos.x;
    const isAlignedY = playerPos.y === enemyPos.y;
    const directionX = enemyPos.x - playerPos.x;
    const directionY = enemyPos.y - playerPos.y;
    
    let inbetween = [];
    let inbetweenPosition = [];

    if (isAlignedX) {
        if (directionY < 0) {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.y - (i + 1) < board[playerPos.x].length) {
                    inbetween.push(board[playerPos.x][playerPos.y - (i + 1)]);
                    inbetweenPosition.push({ x: playerPos.x, y: playerPos.y - (i + 1) });
                }
            }
            console.log("Pull player to the left");
        } else {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.y + (i + 1) >= 0) {
                    inbetween.push(board[playerPos.x][playerPos.y + (i + 1)]);
                    inbetweenPosition.push({ x: playerPos.x, y: playerPos.y + (i + 1) });
                }
            }
            console.log("Pull player to the right");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.x - (i + 1) < board.length) {
                    inbetween.push(board[playerPos.x - (i + 1)][playerPos.y]);
                    inbetweenPosition.push({ x: playerPos.x - (i + 1), y: playerPos.y });
                }
            }   
            console.log("Pull player to the top");
        } else {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.x + (i + 1) >= 0) {
                    inbetween.push(board[playerPos.x + (i + 1)][playerPos.y]);
                    inbetweenPosition.push({ x: playerPos.x + (i + 1), y: playerPos.y });
                }
            }  
            console.log("Pull player to the bottom");
        }
    }
    let playerNewPos = board[playerPos.x][playerPos.y];

    for (let i = 0; i < inbetween.length; i++) {
        if (isEmpty(inbetween[i])) {
            playerNewPos.entity = Entity.None;
            playerNewPos = inbetween[i];
            inbetween[i].entity = Entity.Player;
            playerPos = inbetweenPosition[i];
        } else {
            updateBoard(board, playerHtml);
            return playerPos;
        }
    }
    updateBoard(board, playerHtml);
    return playerPos;
}
