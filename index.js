const board = [
    [2,2,2,2,2,2,2,2,2],
    [2,3,0,0,0,0,0,1,2],
    [2,0,0,0,0,0,0,0,2],
    [2,0,0,0,0,0,0,1,2],
    [2,0,0,0,0,0,1,4,2],
    [2,2,2,2,2,2,2,2,2],

];

// 0= empty -- 1 = enemy -- 2 = wall -- 3= player -- 4 = goal



function canMove (array, position) {
    const selected = array[position.x][position.y];
    return selected == 0 || selected == 4;
}

let playerPosition = getPlayerPosition(board, 3);

function getPlayerPosition(array, number) {
    // parcourir le tableau puis return la position du joueur quand trouvé?
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y] == number) {
                return { x: x, y: y };      
                
            }        
        }
    }
}

const boardHtml = document.querySelector("#board");

function teleport(array, playerPosition, desiredPosition ) {
// si la case est vide -> le joueur prend la position sinon ciao bye;
    if (canMove(array, desiredPosition)) { 
        array[playerPosition.x][playerPosition.y] = 0;
        array[desiredPosition.x][desiredPosition.y] = 3;  
        createBoard();
    }    
}


// const boardHtml = document.getElementById("board");
function createBoard() {
    boardHtml.replaceChildren();
    
    const body = document.createElement("tbody");
    for (let x = 0; x < board.length; x++) {
        const tr = document.createElement("tr");
        for (let y = 0; y < board[x].length; y++) {
            const td = document.createElement("td");
            // td.innerHTML = board[x][y]; 
            if (board[x][y] == 0) {
                // td.style.backgroundColor = "antiquewhite"; <-------------- changement du fond en js direct
                td.classList.add("empty");
            }  
            if (board[x][y] == 1) {
                // td.style.backgroundColor = "red";
                td.classList.add("enemy");
            }  
            if (board[x][y] == 2) {
                // td.style.backgroundColor = "maroon";
                td.classList.add("wall");
            }  
            if (board[x][y] == 3) {
                // td.style.backgroundColor = "green";
                td.classList.add("player");

            }  
            if (board[x][y] == 4) {
                // td.style.backgroundColor = "lightblue";
                td.classList.add("goal");
            }  
            

            // td.dataset.x = x;
            // td.dataset.y = y;
            td.addEventListener("click", function (event) {
                // console.log(event.currentTarget);
                teleport(board, getPlayerPosition(board, 3), { x: x, y: y });
            });
            tr.appendChild(td);
        }
        body.appendChild(tr);
    }

    boardHtml.appendChild(body);

}

createBoard();


// let isPlaying = true;
// while (isPlaying) {
//     isPlaying = false;
//     document.getElementById("board").classList.add("hidden")
//     for (let x = 0; x < board.length; x++) {
//         for (let y = 0; y < board[x].length; y++) {
//             if (board[x][y] == 4) {
//                 isPlaying = true;
//                 document.getElementById("board").classList.add("hidden")
//             }        
//         }
//     }
    
// }