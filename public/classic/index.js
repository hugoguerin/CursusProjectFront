import { getAllLevels } from "../level/src/services/api-level.js";

const container = document.getElementById("container");

let levels = await getAllLevels();

console.log(levels);

for (let i = 0; i < levels.length; i++) {
    let level = document.createElement("a");
    level.innerText = levels[i].id;
    level.classList.add("level")
    level.href = (`/level/${levels[i].id}`)
    container.appendChild(level) 
}

