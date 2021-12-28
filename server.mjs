import express from 'express';
import http from 'http';
import { indexRoute } from './index.mjs';
import chokidar from 'chokidar';
import { createRequire } from 'module'

const require = createRequire(import.meta.url);

let server;
const sockets = [];

function startServer() {
  return new Promise((resolve) => {
    const port = 3000;
    const app = express();
    server = http.Server(app);

    app.use(function(req, res, next) {
      indexRoute(req, res, next);
    });

    app.use(express.static('app'))

    server.on('connection', (socket) => {
      sockets.push(socket);
    });

    server.on('listening', function() {
      resolve();
    });

    server.listen(port);
  });
}

function clearCache() {
  // clean the cache
  Object.keys(require.cache).forEach((id) => {
    delete require.cache[id];
  });
}

function stopServer() {
 return new Promise((resolve, reject) => {
    while (sockets.length) {
      const socket = sockets.pop();
      if (socket.destroyed === false) {
        socket.destroy();
      }
    }

    server.close(() => {
      console.log('server closed');
      resolve();
    });
  })
}

function restart() {
  return stopServer().then(clearCache).then(startServer);
}

startServer().then(() => {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log('Listening on ' + bind);
});


const watcher = chokidar.watch(['./app', 'index.html'])

watcher.on('ready', function() {
  watcher.on('all', function() {
    console.log('Rebuilding...');
    restart();
  })
})

