import { updateBoard } from "../board/index.js";
import { Entity, Type } from "../constants/index.js";

//TODO RANGE OF SPELL USING action.range && ALLOW TO PUSH ON GOAL TILE? && ADD KEY IN DB FOR THE PUSH DISTANCE
export function pushEnemy(board, playerPos, playerHtml, targetPos, action) {

    const enemyPos = board[targetPos.x][targetPos.y];

    if (enemyPos.entity != Entity.Enemy) {
        console.log("Not an enemy");
        return;
    }

    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    const isAligned = isAlignedX || isAlignedY;

    if (!isAligned) {
        console.log("Not aligned");
        return;
    }

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
    } else {
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
        enemyPos.entity = Entity.None;
        behindEnemy.entity = Entity.Enemy;
        updateBoard(board, playerHtml);
    }
}