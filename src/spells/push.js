import { updateBoard } from "../board/index.js";
import { Entity, Type } from "../constants/index.js";

export function pushEnemy1(board, playerPos, playerHtml, targetPos, action) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindEnemy;

    if (isAlignedX) {
        if (directionY < 0) {
           behindEnemy = board[targetPos.x][targetPos.y + 1];
           console.log("Push to the right");
        } else {
           behindEnemy = board[targetPos.x][targetPos.y - 1];
           console.log("Push to the left");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            behindEnemy = board[targetPos.x + 1][targetPos.y];     
            console.log("Push to the bottom");
        } else {
            behindEnemy = board[targetPos.x - 1][targetPos.y];
            console.log("Push to the top");
        }
    }

    if (behindEnemy.entity == Entity.None &&
        behindEnemy.type != Type.Goal &&
        behindEnemy.type != Type.Wall
    ) {
        const enemyPos = board[targetPos.x][targetPos.y];
        enemyPos.entity = Entity.None;
        behindEnemy.entity = Entity.Enemy;
        updateBoard(board, playerHtml);
    }
}

//TODO TRY CATCH?
export function pushEnemy2(board, playerPos, playerHtml, targetPos) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindEnemy;
    let behindEnemy2;

    if (isAlignedX) {
        if (directionY < 0) {
           behindEnemy = board[targetPos.x][targetPos.y + 1];
           behindEnemy2 = board[targetPos.x][targetPos.y + 2];
           console.log("Push to the right");
        } else {
           behindEnemy = board[targetPos.x][targetPos.y - 1];
           behindEnemy2 = board[targetPos.x][targetPos.y - 2];
           console.log("Push to the left");
        }
    } else if (isAlignedY) {
        if (directionX < 0) {
            behindEnemy = board[targetPos.x + 1][targetPos.y];     
            behindEnemy2 = board[targetPos.x + 2][targetPos.y];     
            console.log("Push to the bottom");
        } else {
            behindEnemy = board[targetPos.x - 1][targetPos.y];
            behindEnemy2 = board[targetPos.x - 2][targetPos.y];
            console.log("Push to the top");
        }
    }

    if (behindEnemy.entity == Entity.None &&
        behindEnemy.type != Type.Goal &&
        behindEnemy.type != Type.Wall &&
        (behindEnemy2.type != Type.Empty ||
        behindEnemy2.entity != Entity.None)
    ) {
        const enemyPos = board[targetPos.x][targetPos.y];
        enemyPos.entity = Entity.None;
        behindEnemy.entity = Entity.Enemy;
        updateBoard(board, playerHtml);

    } else if (behindEnemy.entity == Entity.None &&
        behindEnemy.type != Type.Goal &&
        behindEnemy.type != Type.Wall &&
        behindEnemy2.entity == Entity.None &&
        behindEnemy2.type != Type.Wall &&
        behindEnemy2.type != Type.Goal
    ) {
        const enemyPos = board[targetPos.x][targetPos.y];
        enemyPos.entity = Entity.None;
        behindEnemy2.entity = Entity.Enemy;
        updateBoard(board, playerHtml);
    } 
}