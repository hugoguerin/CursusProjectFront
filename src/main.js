import { createBoard, updateBoard } from "./board/index.js";
import { Entity } from "./constants/index.js";
import { getLevelById } from "./services/api-level.js";
import { getSpellsByIds } from "./services/api-spell.js";


let level = await getLevelById(1);  



if (level == null) {
    throw new Error("Erreur dans la requête de niveau");
}

let spells = await getSpellsByIds(level.spells);

if (spells == null) {
    throw new Error("Erreur dans la requête de sorts");
}

//POPULATE
level.spells = spells;

console.log(level);

createBoard(level.board, level.pm);

const playerHtml = document.createElement("div");
playerHtml.classList.add(Entity.Player);

updateBoard(level.board, playerHtml);

//TODO CREER LES ELEMENTS HTML POUR LES SPELLS