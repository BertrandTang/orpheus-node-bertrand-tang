// Importation directe de la méthode createServer via la déstructuration
const { createServer } = require('node:http');
// Définition de l'adresse IP sur laquelle le serveur va s'exécuter (localhost)
const hostname = '127.0.0.1';
// Définition du port sur lequel le serveur va écouter
const port = 3000;
// Création du serveur HTTP
const server = createServer((req, res) => {
// Définition de la réponse à renvoyer au client
res.statusCode = 200; // Code de statut HTTP (200 = OK)
res.setHeader('Content-Type', 'text/plain'); // Type de contenu (texte brut)
res.end('Hello World'); // Envoi de la réponse et fermeture de la connexion
});
// Demande au serveur d'écouter les connexions entrantes
server.listen(port, hostname, () => {
// Affichage du message de confirmation avec le lien d'accès
console.log(`Server running at http://${hostname}:${port}/`);
});