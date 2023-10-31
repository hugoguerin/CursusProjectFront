import { updateBoard } from "../board/index.js";
import { Entity, Type } from "../constants/index.js";

//TODO RANGE OF SPELL USING action.range && ALLOW TO PUSH ON GOAL TILE? && ADD KEY IN DB FOR THE PUSH DISTANCE
export function pushEnemy(board, playerPos, playerHtml, targetPos, action) {

    if (board[targetPos.x][targetPos.y].entity != Entity.Enemy){
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

    if (isAlignedX) {
        let direction = playerPos.y - targetPos.y;
        console.log(board[targetPos.x][targetPos.y+1].entity);
        if (direction < 0 && board[targetPos.x][targetPos.y+1].entity == Entity.None && board[targetPos.x][targetPos.y+1].type == Type.Empty) {
            console.log("Push to the right");
            board[targetPos.x][targetPos.y].entity = Entity.None;
            board[targetPos.x][targetPos.y+1].entity = Entity.Enemy;
            updateBoard(board, playerHtml);
        } else if (direction > 0 && board[targetPos.x][targetPos.y-1].entity == Entity.None && board[targetPos.x][targetPos.y-1].type == Type.Empty ) {
            console.log("Push to the left");
            board[targetPos.x][targetPos.y].entity = Entity.None;
            board[targetPos.x][targetPos.y-1].entity = Entity.Enemy;
            updateBoard(board, playerHtml);
        }
    } else if (isAlignedY) {
        let direction = playerPos.x - targetPos.x;
        if (direction < 0 && board[targetPos.x+1][targetPos.y].entity == Entity.None && board[targetPos.x+1][targetPos.y].type == Type.Empty) {
            console.log("Push to the bot");
            board[targetPos.x][targetPos.y].entity = Entity.None;
            board[targetPos.x+1][targetPos.y].entity = Entity.Enemy;
            updateBoard(board, playerHtml);
        } else if (direction > 0 && board[targetPos.x-1][targetPos.y].entity == Entity.None && board[targetPos.x-1][targetPos.y].type == Type.Empty ) {
            console.log("Push to the top");
            board[targetPos.x][targetPos.y].entity = Entity.None;
            board[targetPos.x-1][targetPos.y].entity = Entity.Enemy;
            updateBoard(board, playerHtml);
        }
    }
    return;
}