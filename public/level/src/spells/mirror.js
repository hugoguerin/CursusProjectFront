import { isEmpty, isWithinBounds, updateBoard } from "../board/index.js";
import { Entity } from "../constants/index.js";

export function mirrorEnemy(board, playerPos, playerHtml, targetPos) {

    const mirrorX = (2 * playerPos.x) - targetPos.x;
    const mirrorY = (2 * playerPos.y) - targetPos.y;
    const mirrorPos = {x: mirrorX, y: mirrorY}

    let enemyPos = board[targetPos.x][targetPos.y];

    if (isWithinBounds(board, mirrorPos) && isEmpty(board[mirrorPos.x][mirrorPos.y])) {
        enemyPos.entity = Entity.None;
        board[mirrorPos.x][mirrorPos.y].entity = Entity.Enemy;
    }

    updateBoard(board, playerHtml);
}

export function mirrorPlayer(board, playerPos, playerHtml, targetPos) {

    const mirrorX = (2 * targetPos.x) - playerPos.x;
    const mirrorY = (2 * targetPos.y) - playerPos.y;
    const mirrorPos = {x: mirrorX, y: mirrorY}

    if (isWithinBounds(board, mirrorPos) && isEmpty(board[mirrorPos.x][mirrorPos.y])) {
        board[playerPos.x][playerPos.y].entity = Entity.None;
        board[mirrorPos.x][mirrorPos.y].entity = Entity.Player;
        updateBoard(board, playerHtml);
        return mirrorPos;
    }

    return playerPos;
}