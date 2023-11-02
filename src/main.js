import { createBoard, resetHighlights, updateBoard, updateHighlights } from "./board/index.js";
import { Entity, Highlight } from "./constants/index.js";
import { getLevelById } from "./services/api-level.js";
import { getSpellsByIds } from "./services/api-spell.js";
import { createSpells, doAction, getEntityPos } from "./spells/index.js";

// REQUETE

let level = await getLevelById(2);  

if (level == null) {
    throw new Error("Erreur dans la requête de niveau");
}

let spells = await getSpellsByIds(level.spells);

if (spells == null) {
    throw new Error("Erreur dans la requête de sorts");
}

// populate
level.spells = spells;

// INIT GAME

//? ----------- PLAYER POS -----------
function updatePlayerPos(pos) {
    playerPos = pos;  
    playerPosHtml.innerText = `player position: ${playerPos ? `${playerPos.x}, ${playerPos.y}` : "-"}`;
}

let playerPos = null;
const playerPosHtml = document.getElementById("playerPos");
updatePlayerPos(getEntityPos(level.board, Entity.Player));

const playerHtml = document.createElement("div");
// playerHtml.addEventListener('click', function(event) {
//     updateAction(null, true);
//     console.log("test x2");
// });
playerHtml.classList.add(Entity.Player);

//? ----------- PM -----------
function updatePlayerPm(pm) {
    playerPm = pm;
    playerPmHtml.innerText = `pm: ${playerPm}`;
}

let playerPm = level.pm;
const playerPmHtml = document.getElementById("playerPm");
updatePlayerPm(playerPm);

//? ----------- ACTION -----------
function updateAction(spell, fromPlayerHtml = false) {
    action = spell;
    actionHtml.innerText = `action: ${action ? `id: ${action.id}, name: ${action.name}, range: ${action.range}` : "-"}`;
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
const actionHtml = document.getElementById("action");
// updateAction(action);

//? ----------- TARGET POS -----------
function updateTargetPos(pos) {
    targetPos = pos;  
    targetPosHtml.innerText = `target position: ${targetPos ? `${targetPos.x}, ${targetPos.y}` : "-"}`;

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
    }
}

let targetPos = null;
const targetPosHtml = document.getElementById("targetPos");
// updateTargetPos(targetPos);

// CREATE HTML

createBoard(level.board, updateTargetPos);

updateBoard(level.board, playerHtml);

createSpells(level.spells, updateAction);