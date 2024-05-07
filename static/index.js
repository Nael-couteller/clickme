const socket = io();
const jeuxDiv = document.getElementById('jeu');
const gagneDiv = document.getElementById('gagne');
const joueursTable = document.getElementById('tableau-joueurs');

// Gère le click sur une cible
function clickCible(event){
    const numeroCible = event.target.getAttribute('numeroCible');
    console.log(`click sur la cible ${numeroCible}`);
    socket.emit('click-cible', numeroCible);
}

// Sockets
socket.on('initialise', function(nombreCible){
    // Vide jeuDiv
    jeuxDiv.innerHTML = '';
    // Ajoute les cibles
    for(let i = 0; i< nombreCible; i++){
        const cible = document.createElement('div');
        // Ajout de la classe .cible
        cible.classList.add('cible');
        // Ajoute l'attribut 'numeroCible' à la cible
        cible.setAttribute('numeroCible', i);

        jeuxDiv.append(cible)
        // Ecoute le click sur la cible
        cible.addEventListener('click', clickCible)
    }
});

socket.on('nouvelle-cible', function(numeroCible){
    // Enlève la classe clickme à l'ancienne cible
    const ancienneCible=document.querySelector('.clickme');
    // Attetion, à l'initialisation, ancienneCible n'existe pas!
    if ( ancienneCible ) {
        ancienneCible.classList.remove('clickme');
    }

    // Ajoute la classe clickme à la nouvelle cible
    const cible = document.querySelector(`[numeroCible="${numeroCible}"]`);

    cible.classList.add('clickme');

    // Vide gagneDiv
    gagneDiv.textContent = "";
});

socket.on('gagne', function(){
    gagneDiv.textContent = "Gagné!";
});


socket.on('maj-joueurs',function (joueurs){
    joueursTable.innerHTML = '';
    for(const joueur of joueurs){
        const ligne = joueursTable.insertRow();
        let nomTd = ligne.insertCell();
        nomTd.textContent = joueur.nom;
        let nomTd2 = ligne.insertCell();
        nomTd2.textContent = joueur.score;
    }
});