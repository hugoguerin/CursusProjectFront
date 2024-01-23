import { checkVictory, createBoard, getEntityPos, resetHighlights, updateBoard, updateHighlights } from "./src/board/index.js";
import { Entity, Highlight } from "./src/constants/index.js";
import { getLevelById } from "./src/services/api-level.js";
import { createSpells, doAction } from "./src/spells/index.js";

const path = window.location.pathname;
// Regex chatgpt to get level id: 
const match = path.match(/\/level\/(\d+)/);

let levelId = 1;

if (match) {
    levelId = match[1];
}

// REQUETE

let level = await getLevelById(levelId);  

if (level == null) {
    throw new Error("Erreur dans la requête de level");
}

// INIT GAME

//? ----------- PLAYER POS -----------
function updatePlayerPos(pos) {
    playerPos = pos;  
}

let playerPos = null;
updatePlayerPos(getEntityPos(level.board, Entity.Player));

const playerHtml = document.createElement("div");
playerHtml.classList.add(Entity.Player);

//? ----------- PM -----------
function updatePlayerPm(pm) {
    playerPm = pm;
    playerPmHtml.innerText = `Movement Points: ${playerPm}`;
}

let playerPm = level.pm;
const playerPmHtml = document.getElementById("playerPm");
updatePlayerPm(playerPm);

//? ----------- ACTION -----------
function updateAction(spell, fromPlayerHtml = false) {
    action = spell;
    spellNameHtml.innerText = `${action ? `${action.name}` : "-"}`;
    spellDescriptionHtml.innerText = `${action ? `${action.description}` : "-"}`;
    if (action != null) {  
        updateHighlights(level.board, action.range, action.aligned, playerPos, Highlight.Spell, playerHtml);
    } else {
        if (fromPlayerHtml) {
            updateHighlights(level.board, playerPm, null, playerPos, Highlight.Pm, playerHtml);
        } else {
            resetHighlights(level.board, playerHtml);
        }
    }
}

let action = null;
const spellNameHtml = document.getElementById("spellName");
const spellDescriptionHtml = document.getElementById("spellDescription")

//? ----------- TARGET POS -----------
function updateTargetPos(pos) {
    targetPos = pos;  
    // if on player
    if (playerPos.x == targetPos.x && playerPos.y == targetPos.y) {
        updateAction(null, true);
    } else {
        doAction(
            level.board,
            playerPos,
            updatePlayerPos,
            playerHtml,
            targetPos,
            action,
            playerPm,
            updatePlayerPm
        );
        updateAction(null);

        checkVictory(level.board)  
    }
}

let targetPos = null;

const retryHtml = document.getElementById("retry");
retryHtml.addEventListener("click", function(event) {
    window.location.reload();
});

const victoryHtml= document.getElementById("victory");
victoryHtml.href = `/level/${level.id+1}`


const levelNameHtml = document.getElementById("levelName");
levelNameHtml.innerText= level.name;

createBoard(level.board, updateTargetPos, playerHtml);

createSpells(level.spells, updateAction);
