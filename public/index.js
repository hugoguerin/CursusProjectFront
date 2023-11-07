let btnPlay = document.getElementById('play');
let btnBack = document.getElementById('back');
let navBar = document.getElementById('navbar')
let typeSelection = document.getElementById('typeSelection');



btnPlay.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
    typeSelection.classList.toggle('hidden');
})

btnBack.addEventListener('click', () => {
    navBar.classList.toggle('hidden');
    typeSelection.classList.toggle('hidden'); 
})