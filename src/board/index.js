import { Entity, Highlight, Type } from "../constants/index.js";
import { isAligned, isInRange } from "../spells/index.js";
import { findAllReachableCells } from "../spells/pm.js";

//! ------------ CREATE BOARD ------------

export function createBoard(board, updateTargetPos) {   
    
    const boardHtml = document.querySelector("#board");
    const body = document.createElement("tbody");

    for (let x = 0; x < board.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < board[x].length; y++) {
            const current = board[x][y];
            const td = document.createElement("td");   
            //Rajoute la clé htmlElement aux objets du tableau ET leurs donnent leurs VUE html
            current.htmlElement = td;
            
            td.addEventListener("click", function(event) {
                updateTargetPos({x,y});
            });
            
            current.highlight = Highlight.None;
             
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
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
    tile.htmlElement.classList.add(tile.type);

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

//TODO RERORWK ELSE IF
export function updateHighlights(board, distance, aligned, playerPos, highlight, playerHtml) {
    
    let reachableCells = [];
    if (highlight == Highlight.Pm) {
        // before "x,y,pm"
        // after "x,y"
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