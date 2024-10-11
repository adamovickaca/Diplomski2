import { WebSocketServer } from 'ws';
import http from 'http';

// Kreiraj HTTP server
const server = http.createServer();
const wss = new WebSocketServer({ server });

const clients = {}; // Objekt za praćenje povezanih klijenata

wss.on('connection', (ws, req) => {
  const userId = req.url.split('/')[1]; // Pretpostavljamo da korisnik šalje svoj ID u URL-u
  clients[userId] = ws; // Čuvamo vezu po ID-u korisnika

  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    const { action, recipientId, data } = parsedMessage;

    if (action === 'sendRequest') {
      // Kada korisnik pošalje zahtev
      if (clients[recipientId]) {
        clients[recipientId].send(JSON.stringify({ type: 'request', data }));
      }
    } else if (action === 'sendResponse') {
      // Kada majstor pošalje odgovor
      if (clients[recipientId]) {
        clients[recipientId].send(JSON.stringify({ type: 'response', data }));
      }
    }
  });

  ws.on('close', () => {
    delete clients[userId]; // Ukloni klijenta kada se isključi
  });
});

// Pokreni server na portu 8080
server.listen(8080, () => {
  console.log('WebSocket server radi na portu 8080');
});
