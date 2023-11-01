import { Entity, Type } from "../constants/index.js";
import { walk } from "./pm.js";
import { pushEnemy } from "./push.js";
import { teleport } from "./teleport.js";

function createSpell(spell, updateAction) {

    let spellHtml = document.createElement("div");
    let spellImg = document.createElement("img");
    // spellHtml.classList.add("");
    spellImg.src = `public/spells/${spell.id}.jpg`
    spellImg.alt = spell.name;
    spellHtml.addEventListener('click', function(event) {
        updateAction(spell)
    })

    spellHtml.appendChild(spellImg);

    return spellHtml;
};


/**
 * 
 * @param {any[]} spells 
 */
export function createSpells(spells, updateAction) {

    let spellsHtml = document.getElementById("spells");

    let arraySpellsHtml = spells.map(spell => createSpell(spell, updateAction));

    spellsHtml.append(...arraySpellsHtml);
};

export function doAction(
    board,
    playerPos,
    updatePlayerPos,
    playerHtml,
    targetPos,
    action,
    playerPm,
    updatePlayerPm
) {
    if (targetPos == null) return;

    if (action == null) {
        const newPlayerPos = walk(board, playerPos, targetPos, playerPm, updatePlayerPm, playerHtml);
        updatePlayerPos(newPlayerPos);
        return;
    }

    if (!isInRange(action.range, playerPos, targetPos)) return;
    if (!canTarget(board, targetPos, action.entity)) return;
    if (action.aligned && !isAligned(playerPos,targetPos)) return;

    switch (action.id) {
        case 1: 
            console.log(action.name);
            break;
    
        case 2:
            console.log(action.name);
            pushEnemy(board,playerPos,playerHtml,targetPos,action);
            break;

        case 3:
            console.log(action.name);
            const newPlayerPos = teleport(board, playerPos, targetPos, playerHtml);
            updatePlayerPos(newPlayerPos);
            break;

        default: 
            throw console.error("Ce sort n'existe pas");
    }
}



//! ------------ RECUPERER POSITION D'UNE ENTITE ------------

export function getEntityPos(array, entity) {
    // parcourir le tableau puis return la position du joueur quand trouvé
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y].entity == entity) {
                return { x: x, y: y };
            }
        }
    }
}

//! ------------ VERIF TARGET ENTITY ------------

function canTarget(board, targetPos, entity) {
    const target = board[targetPos.x][targetPos.y];
    return target.type != Type.Wall && target.entity == entity;
}

//! ------------ VERIF IF IN RANGE ------------

function isInRange(range, posA, posB){
    const realRange =  Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
  
    return realRange <= range;
}

//! ------------ VERIF IF ALIGNED ------------

function isAligned(playerPos, targetPos) {
    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    return isAlignedX || isAlignedY;  
}