import { Type } from "../constants/index.js";
import { walk } from "./pm.js";
import {  pushEnemy, pushPlayer } from "./push.js";
import { pullEnemy, pullPlayer } from "./pull.js";
import { teleport } from "./teleport.js";
import { mirrorEnemy, mirrorPlayer } from "./mirror.js";
import { removeAllEventListeners } from "../board/index.js";

function createSpell(spell, updateAction) {

    let spellHtml = document.createElement("div");
    let spellImg = document.createElement("img");
    spellHtml.id = `spell-${spell.id}`;
    spellImg.src = `../assets/spells/${spell.id}.png`
    spellImg.alt = spell.name;
    spellHtml.addEventListener('click', function(event) {
        updateAction(spell)
    });

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
    if (action.aligned && !isAligned(playerPos, targetPos)) return;

    let usedSpell = document.getElementById(`spell-${action.id}`);
    usedSpell.classList.add("used");
    removeAllEventListeners(usedSpell);

    switch (action.id) {
        case 1: 
  
        case 2:

        case 3:
            console.log(action.name);
            pushEnemy(board,playerPos,playerHtml,targetPos,action);      
            break;
        
        case 4:

        case 5:

        case 6:
            console.log(action.name);
            const newPlayerPos = teleport(board, playerPos, targetPos, playerHtml);
            updatePlayerPos(newPlayerPos);   
            break;

        case 7:

        case 8:

        case 9:
            console.log(action.name);
            pullEnemy(board,playerPos,playerHtml,targetPos,action);
            break;

        case 10:

        case 11:

        case 12:
            console.log(action.name);
            mirrorEnemy(board,playerPos,playerHtml,targetPos)
            break;

        case 13:

        case 14:

        case 15:
            console.log(action.name);
            const pushPlayerPos = pushPlayer(board,playerPos,playerHtml,targetPos,action, updatePlayerPos);
            updatePlayerPos(pushPlayerPos);
            break;
        case 16:

        case 17:

        case 18:
            console.log(action.name);
            const pullPlayerPos = pullPlayer(board,playerPos,playerHtml,targetPos,action, updatePlayerPos);
            updatePlayerPos(pullPlayerPos);

            break;
        case 19:

        case 20:

        case 21:
            console.log(action.name);
            const mirrorPlayerPos = mirrorPlayer(board,playerPos,playerHtml,targetPos);
            updatePlayerPos(mirrorPlayerPos);
            break;

        default: 
            throw console.error("No spell asigned");
    }
}

//! ------------ VERIF TARGET ENTITY ------------

function canTarget(board, targetPos, entity) {
    const target = board[targetPos.x][targetPos.y];
    return target.type != Type.Wall && target.entity == entity;
}

//! ------------ VERIF IF IN RANGE ------------

export function isInRange(range, posA, posB){
    const realRange =  Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
    return realRange <= range;
}

//! ------------ VERIF IF ALIGNED ------------


export function isAligned(playerPos, targetPos) {
    const isAlignedX = playerPos.x == targetPos.x;
    const isAlignedY = playerPos.y == targetPos.y;
    return isAlignedX || isAlignedY;  
}