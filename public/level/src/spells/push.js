import { isEmpty, updateBoard } from "../board/index.js";
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

    if (isEmpty(behindEnemy)) {
        const enemyPos = board[targetPos.x][targetPos.y];
        enemyPos.entity = Entity.None;
        behindEnemy.entity = Entity.Enemy;
        updateBoard(board, playerHtml);
    }
}

//TODO TRY CATCH? VERTICAL OUT OF BOUND
export function pushEnemy2(board, playerPos, playerHtml, targetPos) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindEnemy;
    let behindEnemy2;
    try {
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
    } catch (error) {
        console.log("out of bound");
    }
    

    if (isEmpty(behindEnemy)) {
        const enemyPos = board[targetPos.x][targetPos.y];
        if (isEmpty(behindEnemy2)) {
            enemyPos.entity = Entity.None;
            behindEnemy2.entity = Entity.Enemy;
            updateBoard(board, playerHtml);       
        } else {
            enemyPos.entity = Entity.None;
            behindEnemy.entity = Entity.Enemy;
            updateBoard(board, playerHtml);
        }      
    }
} 

export function pushEnemy3(board, playerPos, playerHtml, targetPos) {

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const directionX = playerPos.x - targetPos.x;
    const directionY = playerPos.y - targetPos.y;
    
    let behindEnemy;
    let behindEnemy2;
    let behindEnemy3;
    
    try {
        if (isAlignedX) {
            if (directionY < 0) {
               behindEnemy = board[targetPos.x][targetPos.y + 1];
               behindEnemy2 = board[targetPos.x][targetPos.y + 2];
               behindEnemy3 = board[targetPos.x][targetPos.y + 3];
               console.log("Push to the right");
            } else {
               behindEnemy = board[targetPos.x][targetPos.y - 1];
               behindEnemy2 = board[targetPos.x][targetPos.y - 2];
               behindEnemy3 = board[targetPos.x][targetPos.y - 3];
               console.log("Push to the left");
            }
        } else if (isAlignedY) {
            if (directionX < 0) {
                behindEnemy = board[targetPos.x + 1][targetPos.y];     
                behindEnemy2 = board[targetPos.x + 2][targetPos.y];     
                behindEnemy3 = board[targetPos.x + 3][targetPos.y];     
                console.log("Push to the bottom");
            } else {
                behindEnemy = board[targetPos.x - 1][targetPos.y];
                behindEnemy2 = board[targetPos.x - 2][targetPos.y];
                behindEnemy3 = board[targetPos.x - 3][targetPos.y];
                console.log("Push to the top");
            }
        }
    } catch (error) {
        console.log("out of bound");
    }
    
    if (isEmpty(behindEnemy)) {
        const enemyPos = board[targetPos.x][targetPos.y];
        if (isEmpty(behindEnemy2)) {
            if (isEmpty(behindEnemy3)) {
                enemyPos.entity = Entity.None;
                behindEnemy3.entity = Entity.Enemy; 
            } else {
                enemyPos.entity = Entity.None;
                behindEnemy2.entity = Entity.Enemy;
            }  
        } else {
            enemyPos.entity = Entity.None;
            behindEnemy.entity = Entity.Enemy;
        }      
    }
    updateBoard(board, playerHtml);
} 