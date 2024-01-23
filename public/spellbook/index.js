import { getAllSpells } from "../level/src/services/api-spell.js";

const container = document.getElementById("container");


let spells = await getAllSpells();

for (let i = 0; i < spells.length; i++) {
    const current = spells[i];

    // Create main elements
    const spell = document.createElement("div");
    const col1 = document.createElement("div");
    const col2 = document.createElement("div");

    // Style spell & col 1
    spell.classList.add("spell");
    spell.style.height = "75px";
    spell.style.width = "350px";
    col1.style.width = "fit-content";
    col1.style.height = "100%";
    col1.style.padding = "5px";

    // Create and style img
    const spellImg = document.createElement("img");
    spellImg.src = `../assets/spells/${current.id}.png`
    spellImg.alt = spell.name;

    // Create and style name
    const spellName = document.createElement("div");
    spellName.innerText = current.name;
    spellName.style.fontWeight = 'bold';
    spellName.style.margin = "5px";

    // Create and style description
    const spellDescription = document.createElement("div");
    spellDescription.style.margin = "5px";
    spellDescription.innerText = current.description;
    
    // Append all elements
    container.appendChild(spell);
    spell.appendChild(col1);
    spell.appendChild(col2);
    col1.appendChild(spellImg);
    col2.appendChild(spellName);
    col2.appendChild(spellDescription);   
}