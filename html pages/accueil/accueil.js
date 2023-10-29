let btnJouer = document.getElementById('jouer');
let navBar = document.getElementById('navbar')
let choixMode = document.getElementById('choixmoderetourmenu');
let retourMenu = document.getElementById('retourmenu');
let btnQuitter = document.getElementById('quitter');
let btnClassique = document.getElementById('classique');
let btnCommunauté = document.getElementById('communaute');
let btnEditeur = document.getElementById('editeur');
let btnEncyclopedie = document.getElementById('encyclopedie')


btnJouer.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
    choixMode.classList.toggle('hidden');
  
})

retourMenu.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
    choixMode.classList.toggle('hidden');
    
})

btnClassique.addEventListener('click', () => {
    window.location.href = "../classique/classique.html";
})

btnCommunauté.addEventListener('click', () => {
    window.location.href = "../communaute/communaute.html";
})

btnEditeur.addEventListener('click', () => {
    window.location.href = "../editeur/editeur.html"
})

