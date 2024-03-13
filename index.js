import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import { join, dirname } from 'node:path';
import { Partie } from './partie.js';

// Mise en place du serveur
const app = express();
const server = createServer(app);
const io = new Server(server);
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static('static/'));

// Crée une partie
const partie = new Partie();

// On sert le fichier index.html à la racine /
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'index.html'));
})

// Gestion des scockets
io.on("connection", (socket) => {
  // Un client s'est connecté.
  socket.emit('initialise', partie.nombreCibles);
  socket.emit('nouvelle-cible', partie.numeroCible);

  // Ajoute une joueur à la partie
  partie.nouveauJoueur(socket.id);
  // Informe les clients
  io.emit('maj-joueurs', partie.joueurs);

  // On écoute des évènements sur le socket
  socket.on('click-cible',  (numeroCible) => {
    if (numeroCible == partie.numeroCible){
      partie.nouvelleCible();
      // Envoie le message 'nouvelle-cible à tous les sockets.
      io.emit('nouvelle-cible', partie.numeroCible);
      // Envoie le message 'gagne' seulement à ce socket.
      socket.emit('gagne');
    }
  });

  socket.on('disconnect', () => {
    console.log(`le joueur ${socket.id} s'est déconnecté`);
    partie.supprimeJoueur(socket.id);
    io.emit('maj-joueurs', partie.joueurs);
  });

});

// Lance le serveur.
console.log('Lance le serveur sur http://localhost:3000');
server.listen(3000);



