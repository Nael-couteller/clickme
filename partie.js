/**
 * Classe représentant une partie de clickme.
 * ┌──────────────────┐
 * │    Partie        │
 * ├──────────────────┤
 * │ - nombreCible    │
 * │ - numeroCible    │
 * │ - joueurs        │
 * ├──────────────────┤
 * │ + nouvelleCible  │
 * │ + nouveauJoueur  │
 * │ + supprimeJoueur │
 * │ + getJoueurById  │
 * └──────────────────┘
 */

export class Partie {
    constructor(){
        this.nombreCibles = 16;
        this.numeroCible;
        this.joueurs = [];
        this.nouvelleCible();
    }

    /**
     * Choisit une nouvelle cible au hasard.
     * Modifie this.numeroCible.
     */
    nouvelleCible(){
        this.numeroCible = Math.floor(Math.random() * this.nombreCibles);
    }

    /**
    * Ajoute un joueur à la partie.
    * Le nom du joueur est 'joueur-n' ou n est le nombre de joueurs.
    * @param {string} socketId - socketId du nouveau joueur.
    */
    nouveauJoueur(socketId){
        const joueur = new Joueur(socketId, `joueur-${this.joueurs.length}`);
        this.joueurs.push(joueur);
    }

    /**
     * Supprime un joueur de la partie.
     * @param {string} socketId - socketId du joueur à supprimer
     */
    supprimeJoueur(socketId){
        this.joueurs = this.joueurs.filter(joueur => joueur.socketId != socketId);
    }

    /**
     * Retourne le joueur dont le socketId correspond à l'argument.
     * @param {string} socketId - socketId du joueur à trouver.
     * @returns {Joueur} - le joueur ayant le socketId correspondant.
     */
    getJoueurById(socketId){
        return this.joueurs.find((joueur) => joueur.socketId == socketId);
    }
    changeNomJoueur(socketId, nouveauNom){
        let joueur = this.getJoueurById(socketId);
        joueur.changeNom(nouveauNom);
    }
}



/**
 * Classe représentant un joueur.
 * ┌──────────────────┐
 * │    Partie        │
 * ├──────────────────┤
 * │ - nom            │
 * │ - socketId       │
 * ├──────────────────┤
 * └──────────────────┘
 */
class Joueur {
    constructor(socketId, nom){
        this.nom = nom;
        this.socketId = socketId;
    }
    changeNom(nouveauNom){
        this.nom = nouveauNom;
    }
}

