import { Entity } from "../constants/index.js";

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
        
            

            // td.addEventListener("click", function (event) {
            //     playerPosition = teleport(board, playerPosition, { x: x, y: y }, playerHtml);
            //     playerPosition = walk(board, playerPosition, { x: x, y: y }, PM, playerHtml);
            // });

            tr.appendChild(td);
        }
        body.appendChild(tr);
    }
    boardHtml.appendChild(body);
}

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


    if(tile.htmlElement.firstChild){
        tile.htmlElement.removeChild(tile.htmlElement.firstChild);
    }
     
    if(tile.entity == Entity.Player){

        tile.htmlElement.appendChild(playerHtml);

    } else if (tile.entity == Entity.Enemy){
        const enemy = document.createElement("div");
        enemy.classList.add(Entity.Enemy);
        tile.htmlElement.appendChild(enemy);  
    }
}