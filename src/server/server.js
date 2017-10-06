import path from 'path';
import express from 'express';
import expressSlash from 'express-slash';

import DiscreteClock from './discrete-clock.js';
import { missileFlightTime } from '../common.js';

function prepareAppWithSlash(app) {
    app.enable('strict routing');
    var router = express.Router({
      caseSensitive: app.get('case sensitive routing'),
      strict       : app.get('strict routing')
    });
    app.use(router);
    app.use(expressSlash());
}

class Server {
  constructor(game, secret) {
    this.game = game;
    this.secret = secret;
    this.app = this.buildApp();
    this.clock = new DiscreteClock();
  }

  buildApp() {
    var app = express();
    prepareAppWithSlash(app);

    app.use(express.static('dist'));

    app.get('/static/app.js', (req, res) => {
      res.sendFile(path.join(process.cwd(), __dirname, 'dist', 'app.js'));
    });

    app.get('/:player/', (req, res) => {
      res.sendFile(path.join(process.cwd(), __dirname, 'index.html'));
    });

    app.get('/:player/authenticate', (req, res) => {
      // TODO: actually implement authentication
      if (/a/.test(req.query.password)) {
        res.status(200).send(JSON.stringify(this.getUpdateObject(req.params.player, 0)));
      } else {
        res.status(403).send();
      }
    });

    app.get('/:player/launch/:enemy', this.launch.bind(this));
    app.get('/:player/update', this.update.bind(this));


    return app;
  }

  ensureValidPlayers(players, res) {
    for (var i=0; i<players.length; i++) {
      var p = players[i];
      if (!this.game.players.has(p)) {
        res.status(404).send(`player ${p} does not exist; valid players are ${Array.from(this.game.players)}`);
        return false;
      }
    }
    return true;
  }

  launch(req, res) {
    var {player, enemy} = req.params
    if (!this.ensureValidPlayers([player, enemy], res)) return;
    this.game.launch(player, enemy, this.clock.currentTime);
    res.status(200).send();
  }

  update(req, res) {
    var {player} = req.params;
    if (!this.ensureValidPlayers([player], res)) return;
    var since = parseInt(req.query.since);
    this.clock.defer(() => {
      res.send(JSON.stringify(this.getUpdateObject(player, since)))
    }, since+1);
  }

  getUpdateObject(player, since) {
    var now = this.clock.currentTime;
    var readingStartTime = Math.max(since+1, now-500);

    var result = {
      discreteTime: this.clock.currentTime,
      alive: this.game.isAlive(player, now),
      enemyInfos: {}
    };

    this.game.enemies(player).forEach((enemy) => {
      var ei = result.enemyInfos[enemy] = {
        alive: this.game.isAlive(enemy, now),
        timeOfDeath: this.game.getPreviousTimeOfDeath(enemy, now),
        timeToImpact: this.game.getTimeToImpact(player, enemy, now),
        readings: {}
      };
      var readingEndTime = Math.min(now, missileFlightTime+this.game.getPreviousTimeOfDeath(enemy, now, Infinity));
      for (var t=readingStartTime; t<=readingEndTime; t++) {
        ei.readings[t] = this.game.readEWS(player, enemy, t);
      }
    })

    return result;
  }

  start() {
    this.clock.start();
    console.log('starting');
    this.app.listen(5000, function() {
      console.log(`cwd = ${process.cwd()}`);
      console.log(`__dirname = ${__dirname}`);
      console.log(`__filename = ${__filename}`);
      console.log('listening on port 5000');
    });
  }
}

export default Server;
