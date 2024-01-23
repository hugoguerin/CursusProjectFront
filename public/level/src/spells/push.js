import { isEmpty, updateBoard } from "../board/index.js";
import { Entity } from "../constants/index.js";

//
// NEW VERSION OF PUSH
//

export function pushEnemy(board, playerPos, playerHtml, targetPos, action) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindEnemy = [];

    if (isAlignedX) {
        if (directionY < 0) {
            for (let i = 0; i < action.power; i++) {
                if (targetPos.y + (i + 1) < board[targetPos.x].length) {
                    behindEnemy.push(board[targetPos.x][targetPos.y + (i + 1)]);
                }
            }
            console.log("Push to the right");
        } else {
            for (let i = 0; i < action.power; i++) {
                if (targetPos.y - (i + 1) >= 0) {
                    behindEnemy.push(board[targetPos.x][targetPos.y - (i + 1)]);
                }
            }
            console.log("Push to the left");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            for (let i = 0; i < action.power; i++) {
                if (targetPos.x + (i + 1) < board.length) {
                    behindEnemy.push(board[targetPos.x + (i + 1)][targetPos.y]);
                }
            }   
            console.log("Push to the bottom");
        } else {
             for (let i = 0; i < action.power; i++) {
                if (targetPos.x - (i + 1) >= 0) {
                    behindEnemy.push(board[targetPos.x - (i + 1)][targetPos.y]);
                }
            }  
            console.log("Push to the top");
        }
    }

    let enemyPos = board[targetPos.x][targetPos.y];

    for (let i = 0; i < behindEnemy.length; i++) {
        if (isEmpty(behindEnemy[i])) {
           enemyPos.entity = Entity.None;
           enemyPos = behindEnemy[i];
           behindEnemy[i].entity = Entity.Enemy
        } else {
            break;
        }
    }

    updateBoard(board, playerHtml);
}

export function pushPlayer(board, playerPos, playerHtml, targetPos, action) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindPlayer = [];
    let behindPlayerPosition = [];

    if (isAlignedX) {
        if (directionY < 0) {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.y - (i + 1) >= 0) {
                    behindPlayer.push(board[playerPos.x][playerPos.y - (i + 1)]);
                    behindPlayerPosition.push({x:playerPos.x,y:playerPos.y - (i + 1)});
                }
            }
            console.log("Push player to the left");
        } else {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.y + (i + 1) < board[playerPos.x].length) {
                    behindPlayer.push(board[playerPos.x][playerPos.y + (i + 1)]);
                    behindPlayerPosition.push({x:playerPos.x,y:playerPos.y + (i + 1)});
                }
            }
            console.log("Push player to the right");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            for (let i = 0; i < action.power; i++) {
                if (playerPos.x - (i + 1) >= 0) {
                    behindPlayer.push(board[playerPos.x - (i + 1)][playerPos.y]);
                    behindPlayerPosition.push({x:playerPos.x - (i + 1),y:playerPos.y});
                }
            }   
            console.log("Push player to the top");
        } else {
             for (let i = 0; i < action.power; i++) {
                if (playerPos.x + (i + 1) < board.length) {
                    behindPlayer.push(board[playerPos.x + (i + 1)][playerPos.y]);
                    behindPlayerPosition.push({x:playerPos.x + (i + 1),y:playerPos.y});
                }
            }  
            console.log("Push player to the bottom");
        }
    }

    console.log(behindPlayer);
    console.log(behindPlayerPosition);

    let playerNewPos = board[playerPos.x][playerPos.y];

    for (let i = 0; i < behindPlayer.length; i++) {
        if (isEmpty(behindPlayer[i])) {
           playerNewPos.entity = Entity.None;
           playerNewPos = behindPlayer[i];
           behindPlayer[i].entity = Entity.Player;
           playerPos = behindPlayerPosition[i]
        } else {
            updateBoard(board, playerHtml);
            return playerPos;
        }
    }
    updateBoard(board,playerHtml);
    return playerPos;
}