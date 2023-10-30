import { Entity, Type } from "../constants/index.js";
import { walk } from "./pm.js";
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


    switch (action.id) {
        case 1: 
            console.log(action.name);
            break;
    
        case 2:
            console.log(action.name);
            break;

        case 3:
            //TODO RANGE
            console.log(action.name);
            const newPlayerPos = teleport(board, playerPos, targetPos, playerHtml, action);
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

//! ------------ VERIF CASE VIDE ------------

export function canMove(array, position) {
    const selected = array[position.x][position.y];
    return selected.type != Type.Wall && selected.entity == Entity.None;
}

//! ------------ VERIF IF IN RANGE ------------

export function isInRange(range, posA, posB){
    const realRange =  Math.abs(posA.x - posB.x) + Math.abs(posA.y - posB.y);
  
    return realRange <= range;
}




//!
//! NONE SORTED
//!



//! ------------ RECUPERER POSITION D'UN TYPE DE CASE ------------

function getTypePosition(array, type) {
    // parcourir le tableau puis return la position du joueur quand trouvé
    for (let x = 0; x < array.length; x++) {
        for (let y = 0; y < array[x].length; y++) {
            if (array[x][y].type == type) {
                return { x: x, y: y };
            }
        }
    }
}


