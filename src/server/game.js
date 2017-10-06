import Missile from './missile.js';
import EarlyWarningSystem from './early-warning-system.js';

class Game {
  constructor(players, missileFlightTime=180) {
    this.missileFlightTime = missileFlightTime;
    this.missiles = [];

    this.ewss = new Map();
    players.forEach((player) => {
      players.forEach((enemy) => {
        if (player !== enemy) {
          this.ewss.set(Game.ewsKey(player, enemy), new EarlyWarningSystem(player, enemy, [player, enemy]));
        }
      });
    });
  }

  static ewsKey(player, enemy) {
    return `${player} <- ${enemy}`;
  }

  get players() {
    var result = new Set();
    new Set(this.ewss.keys()).forEach(([p, e]) => result.add(p));
    return result;
  }

  enemies(player) {
    var result = new Set(this.players);
    result.delete(player);
    return result;
  }

  launch(aggressor, victim, departureTime) {
    this.missiles.push(new Missile(aggressor, victim, departureTime, departureTime+this.missileFlightTime));
  }

  readEWS(location, target, time) {
    return this.ewss.get(Game.ewsKey(location, target)).getReading(this.missiles.filter((m) => (m.departureTime < time && time < m.eta)), time);
  }

  isAlive(player, time) {
    return this.missiles.every((m) => (m.destination !== player || m.eta > time));
  }

  getTimeToImpact(aggressor, victim, time) {
    for (var i=0; i<this.missiles.length; i++) {
      var m = this.missiles[i];
      if (m.origin === aggressor && m.destination === victim) {
        return m.eta - time;
      }
    }
    return null;
  }

  getPreviousTimeOfDeath(victim, before) {
    var etas = this.missiles.filter((m) => (m.destination===victim && m.eta <= before)).map((m) => m.eta);
    if (etas.length === 0) {
      return null;
    }
    return Math.min.apply(null, etas);
  }
}

export default Game;
