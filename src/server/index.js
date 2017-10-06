import Server from './server.js';
import Game from './game.js';

var game = new Game(process.argv.slice(2));
new Server(game, 'foo').start();
