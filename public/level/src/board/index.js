import { Entity, Highlight, Type } from "../constants/index.js";
import { isAligned, isInRange } from "../spells/index.js";
import { findAllReachableCells } from "../spells/pm.js";

//! ------------ CREATE BOARD ------------

export function createBoard(board, updateTargetPos, playerHtml) {   
    
    const boardHtml = document.getElementById("board");

    for (let x = 0; x < board.length; x++) {
        const row = document.createElement("div");
        row.classList.add("row");
        for (let y = 0; y < board[x].length; y++) {
            const current = board[x][y];
            const tile = document.createElement("div");

            //add htmlElement key to the object
            current.htmlElement = tile;
            
            //add highlight key to the object
            current.highlight = Highlight.None;

            updateTile(current, playerHtml);

            tile.addEventListener("click", function(event) {
                updateTargetPos({x,y});
            });
            
            row.appendChild(tile);
        }
        boardHtml.appendChild(row);
    }
}

//TODO MODIFY TO UPDATE ONLY NECESSARY TILES
//! ------------ UPDATE BOARD ------------

export function updateBoard(board, playerHtml){

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            updateTile(board[x][y], playerHtml);
        }    
    }
}

//! ------------ UPDATE TILE ------------

export function updateTile(tile, playerHtml) {

    tile.htmlElement.className = "";
    tile.htmlElement.classList.add("tile", tile.type);

    if (tile.htmlElement.firstChild) {
        tile.htmlElement.removeChild(tile.htmlElement.firstChild);
    }
     
    if (tile.entity == Entity.Player) {
        tile.htmlElement.appendChild(playerHtml);

    } else if (tile.entity == Entity.Enemy) {
        const enemy = document.createElement("div");
        enemy.classList.add(Entity.Enemy);
        tile.htmlElement.appendChild(enemy);  
    }

    if (tile.highlight != Highlight.None) {
        tile.htmlElement.classList.add("highlight-" + tile.highlight);
    }
}

//TODO REWORK ELSE IF ??
export function updateHighlights(board, distance, aligned, playerPos, highlight, playerHtml) {
    
    let reachableCells = [];
    if (highlight == Highlight.Pm) {
        reachableCells = findAllReachableCells(board, distance, playerPos)
            .map(posAsString => {
                const cells = posAsString.split(",");
                cells.pop();
                return cells.join(",");
            });
    }

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const currentTile = board[x][y];
            // reset
            currentTile.highlight = Highlight.None;
            if (highlight == Highlight.Spell) {
                if (currentTile.type != Type.Wall &&
                    isInRange(distance, playerPos, {x,y}) &&
                    !(aligned && !isAligned(playerPos, {x,y}))
                ) {
                    currentTile.highlight = highlight;      
                }
            } else if (highlight == Highlight.Pm) {
                if (currentTile.type != Type.Wall &&
                    currentTile.type != Type.Enemy &&
                    reachableCells.includes(`${x},${y}`)
                ) {
                    currentTile.highlight = highlight;
                }
            }
        }
    }
    updateBoard(board, playerHtml);
}

export function resetHighlights(board, playerHtml) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            board[x][y].highlight = Highlight.None;
        }
    }
    updateBoard(board, playerHtml);
}

export function getEntityPos(board, entity) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y].entity == entity) {
                return { x: x, y: y };
            }
        }
    }
}

function getTypePos(board, type) {
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y].type == type) {
                return { x: x, y: y };
            }
        }
    }
}

export function checkVictory(board) {
    const goalPos = getTypePos(board, Type.Goal);
    
    if (board[goalPos.x][goalPos.y].entity == Entity.Player){
        console.log("GG");        
        const boardHtml = document.getElementById("board"); 
        removeAllEventListeners(boardHtml);
        let spellsHtml = document.getElementById("spells");
        removeAllEventListeners(spellsHtml);
        const victory = document.getElementById("victory");
        victory.classList.remove("hidden");
        victory.classList.add("flex");
        victory.classList.add("zindex");       
    }
}

export function removeAllEventListeners(element) {
    var clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement, element);
}

export function isEmpty(tile) {
    return tile.type == Type.Empty && tile.entity == Entity.None || tile.type == Type.Goal && tile.entity == Entity.None;
}

export function isWithinBounds(board, position) {
    return position.x >= 0 && position.x < board.length &&
           position.y >= 0 && position.y < board[0].length;
}